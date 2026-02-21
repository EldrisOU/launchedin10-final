# LaunchedIn10.co.uk — Implementation Plan (20.02.26)

## Root Cause — Verified via Live Crawl

> [!CAUTION]
> **86 out of 87 sitemap URLs return redirect errors.** The sitemap emits URLs without trailing slashes, but Cloudflare Pages enforces trailing slashes via 308 redirects. Google discovers all 87 URLs, attempts to crawl them, hits a redirect wall, and deprioritises the domain. This is why the site won't index despite manual submissions.

Additionally:

> [!WARNING]
> **Every page has an identical `<title>` tag:** `LaunchedIn10 | Professional Websites in 10 Days`. Google sees 87 pages that all look like the same page. This is a Vite SPA with pre-rendered body content but a **static, unchanging `<head>` section** — the per-page title is only set client-side via React, which Googlebot may not always execute.

### GSC Status (from user, 20.02.26)
- **5 URLs indexed** (manually submitted)
- **17 pages with redirect errors** (crawled Feb 17th)
- Sitemap shows 87 URLs discovered

### Verified Redirect Breakdown (curl tested all 87 URLs)

| Type | Count | Cause |
|---|---|---|
| **308 redirects** | 81 | Blog posts + static pages without trailing slash |
| **301 redirects** | 5 | Category index pages (`/blog/website-design` → `/blog/website-design/`) |
| **200 OK** | 1 | Homepage only |

### Comparison with Indexed Sites

| Site | Framework | Robots.txt | Indexed | Age |
|---|---|---|---|---|
| `launchedin10.co.uk` | Vite + React SPA | Cloudflare managed (47 lines) | 5 | ~7.5 weeks |
| `responsible.eldris.ai` | Astro SSG | Clean (10 lines) | ✓ | Younger |
| `thesellerindex.com` | Astro SSG | Cloudflare managed | 19 | ~3.5 weeks |

**Key difference:** Astro SSG produces trailing-slash URLs natively. Vite does not.

---

## Proposed Changes (Priority Order)

### 🔴 P0: Fix Sitemap — Add Trailing Slashes to All URLs

#### [MODIFY] generate-sitemap.js (or equivalent sitemap generation)

Every URL in `sitemap.xml` must match the canonical URL that Cloudflare Pages serves. Currently:

```diff
- <loc>https://launchedin10.co.uk/blog</loc>
+ <loc>https://launchedin10.co.uk/blog/</loc>

- <loc>https://launchedin10.co.uk/blog/website-design/website-design-cost-uk-2026-breakdown-no</loc>
+ <loc>https://launchedin10.co.uk/blog/website-design/website-design-cost-uk-2026-breakdown-no/</loc>
```

**All 86 non-homepage URLs need trailing slashes added.**

---

### 🔴 P0: Fix Duplicate `<title>` Tags

#### [MODIFY] index.html (Vite entry point) + SSG pre-render config

Currently the `<title>` is hardcoded in `index.html`:
```html
<title>LaunchedIn10 | Professional Websites in 10 Days</title>
```

This is the **only `<title>`** that exists in the server-rendered HTML. The per-page title is only applied client-side by React after JavaScript execution.

**Fix options:**
1. **If using `vite-plugin-ssr` / `vite-ssg`**: Configure the pre-render to inject per-page `<title>` and `<meta description>` into the static HTML
2. **If custom pre-render**: Update the pre-render script to replace the `<title>` tag per-route
3. **Minimum viable**: The pre-render already outputs body content — extend it to also replace `<head>` metadata

---

### 🟡 P1: Fix Navigation Internal Links

The hidden SEO nav and visible nav both link without trailing slashes:
```html
<a href="/blog">Blog</a>        <!-- triggers 308 -->
<a href="/blog/">Blog</a>       <!-- should be this -->
```

---
---

### 🔴 P0: Fix Internal Links in li10_posts (Supabase — 254 URL corrections)

**3 columns across 74 rows contain internal URLs missing trailing slashes:**

| Column | Links | Missing `/` | Fix |
|---|---|---|---|
| `post_content` (embedded `<a href>`) | 171 | 145 | Regex UPDATE |
| `internal_link_1` | 74 | 48 | Concat UPDATE |
| `canonical` | 74 | 61 | Concat UPDATE |

**Execution (per Execution Safety Protocol):**

**Step 1: `post_content`** — append `/` to all internal hrefs missing trailing slash:
```sql
-- PRE-FLIGHT: count links without trailing slash
-- EXECUTE:
UPDATE li10_posts
SET post_content = regexp_replace(
  post_content,
  'href="(https://launchedin10\.co\.uk/[^"]*[^/])"',
  'href="\1/"',
  'g'
)
WHERE post_content ~ 'href="https://launchedin10\.co\.uk/[^"]*[^/]"';
-- POST-FLIGHT: re-count, confirm 0 remain without trailing slash
```

**Step 2: `internal_link_1`** — append `/` where missing:
```sql
UPDATE li10_posts
SET internal_link_1 = internal_link_1 || '/'
WHERE internal_link_1 IS NOT NULL
  AND internal_link_1 NOT LIKE '%/';
```

**Step 3: `canonical`** — append `/` where missing:
```sql
UPDATE li10_posts
SET canonical = canonical || '/'
WHERE canonical IS NOT NULL
  AND canonical NOT LIKE '%/';
```

> [!NOTE]
> The `canonical` column also stores flat paths (e.g. `/slug` not `/blog/category/slug/`). The trailing-slash fix is correct regardless — the site code constructs the actual URL from `slug` + `primary_category`. The `canonical` column inconsistency is a separate, lower-priority cleanup.

---

### 🟡 P1: Clean Up robots.txt

The Cloudflare "AI Scrapers and Crawlers" managed block adds complexity. While TSI has the same block and indexes fine (so this isn't the primary blocker), cleaning it up is good hygiene:

**Action:** Cloudflare Dashboard → Security → Bots → Disable "AI Scrapers and Crawlers" toggle.

---

### 🟢 P2: Fix orbit_3_flow Category Casing

```sql
UPDATE orbit_3_flow
SET category = 'SEO Fundamentals'
WHERE category = 'Seo Fundamentals'
  AND website_url ILIKE '%launchedin10%';
```

---

### 🟢 P2: Block `.pages.dev` Subdomains

Add `_headers` file to `public/`:
```
https://*.pages.dev/*
  X-Robots-Tag: noindex
```

---

## Execution Safety Protocol

> [!IMPORTANT]
> Every modification follows a **Pre-flight → Execute → Validate → Gate** cycle. No step proceeds until the prior gate passes. No assumptions, no batch-and-hope.

### Rule 1: Per-Row Verification (Supabase changes)

For every SQL `UPDATE`:
1. **Pre-flight snapshot**: `SELECT` the exact rows that will be affected, save count and sample values
2. **Execute**: Run the `UPDATE` with a `WHERE` clause scoped to exactly those rows
3. **Post-flight check**: Re-run the same `SELECT` — confirm (a) count matches, (b) values are correct, (c) no unintended rows changed
4. **Gate**: If post-flight count ≠ pre-flight count → **HALT and report**

### Rule 2: Drift Prevention (Scope Lock)

Before each action, state:
- **WHAT** is being modified (table/file, column/line)
- **WHY** (link back to specific finding in Bot_Cleaned_Action_Plan)
- **EXPECTED OUTCOME** (exact before → after for 1 sample row)

If any modification touches a file, table, or column NOT listed in this plan → **HALT and get user approval**.

### Rule 3: Zero Broken Links (Internal Link Integrity)

**Before deploying any URL change:**
1. Build the site locally (`npm run build`)
2. Extract every `<a href>` and `<loc>` from the built output
3. Curl-test **every unique internal URL** for a 200 response (not 301/308)
4. Cross-reference: every `internal_link_1` value in `li10_posts` must resolve to 200
5. **Gate**: If ANY internal URL returns non-200 → **HALT, do not deploy**

### Rule 6: Per-Row Link Resolution (Supabase post_content)

**After `post_content` regex UPDATE:**
1. Extract all unique internal hrefs from `post_content` across all 74 rows via SQL
2. Curl-test **every unique link target** — must return 200
3. **Gate**: If ANY embedded link returns non-200 → **HALT and report** (the regex produced a malformed URL)

### Rule 4: Zero Redirect Regression (Sitemap Integrity)

**After sitemap generator modification:**
1. Parse new `sitemap.xml` — extract all `<loc>` values
2. Curl-test **100% of sitemap URLs** (not a sample) with `curl -s -o /dev/null -w "%{http_code}"`
3. Every URL must return `200`
4. **Gate**: If ANY sitemap URL returns 301/308/404 → **HALT, do not deploy**

### Rule 5: Title Tag Uniqueness

**After `<title>` fix:**
1. Curl 5 different page types (homepage, blog post, category page, service page, legal page)
2. Extract `<title>` from each
3. **Gate**: If any two pages share the same `<title>` → **HALT, fix failed**

### Verification Sequence

| Phase | Action | Gate Condition |
|---|---|---|
| **P0a: Supabase links** | Pre-flight → regex UPDATE `post_content` → post-flight | 0 internal hrefs without `/` |
| **P0a verify** | Extract all unique link targets from `post_content` → curl-test | All return 200 |
| **P0b: internal_link_1** | Pre-flight → concat UPDATE → post-flight | 0 rows without trailing `/` |
| **P0c: canonical** | Pre-flight → concat UPDATE → post-flight | 0 rows without trailing `/` |
| P0d: Sitemap | Modify generator → build → curl-test 100% of URLs | All return 200 |
| P0e: Titles | Modify pre-render → build → curl 5 page types | All `<title>` unique |
| P1a: Nav links | Modify components → build → extract all `<a href>` | All internal hrefs end `/` |
| P1b: Robots | Disable Cloudflare toggle → curl robots.txt | No managed block present |
| P2a: orbit_3_flow | Pre-flight SELECT → UPDATE → post-flight SELECT | 11 rows, `SEO Fundamentals` |
| P2b: .pages.dev | Add `_headers` → curl preview domain | `X-Robots-Tag: noindex` |
| **FINAL** | Curl-test 100% sitemap URLs + all `internal_link_1` values + 10 random `post_content` links | **Zero non-200 responses** |
