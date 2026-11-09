# RunPerformance Audit — launchedin10.co.uk
## Run 24 | 09.11.26 | DeepRank v3.0

---

## Key Metrics Table

| Metric | Run 23 (29.10.26) | Run 24 (09.11.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (90d) | 8,743 | 8,316 | -5% |
| GSC Clicks (90d) | 2 | 2 | No change |
| GSC CTR | 0.02% | 0.024% | +0.004pp |
| GA4 Tier A Sessions | 95 | 107 | +13% |
| GA4 Total Sessions | 259 | 335 | +29% |
| Bot Inflation | 63.3% | 68.1% | +4.8pp (worsened) |
| AI Citations (90d) | 0 | 0 | No change |
| Published Posts | 105 | 105 | No change |
| Pipeline (orbit_3_flow queued) | 0 | 0 | No change |
| Pipeline Dormancy | 223 days | 234 days | +11 days |
| Mobile PageSpeed | 55 | 47 | -8 (worsened) |
| Conversions | 0 | 0 | No change |

---

## Honest Assessment

LaunchedIn10 remains in authority-deficit stasis. Run 24, 24th consecutive audit, zero conversions, zero AI citations. Impressions are steady at ~8.3K but positions remain too deep for meaningful click capture (23–78 range). Tier A sessions grew modestly (+13%) but bot inflation worsened to 68.1% due to increased direct zero-engagement traffic.

**The critical finding this run: two of the three P0 fixes deployed on 29.10.26 (ACT-LI10-055, ACT-LI10-057) have NOT resolved the underlying issues.** Google recrawled /pricing/ on 03.11.26 — 5 days after the fix — and STILL treats it as "Page with redirect" with canonical collapsed to /. The 7-companies blog post hasn't been recrawled since 03.09.26. The _redirects-based fix is insufficient — the SPA architecture itself is the root cause. Cloudflare Pages is correctly serving the SSG-rendered HTML, but Google appears to be interpreting the SPA rewrite chain as a redirect.

The sale page soft 404s (ACT-LI10-056) ARE confirmed fixed — both return 301 to the correct service pages.

The homepage price mismatch (ACT-LI10-035) enters its 9th consecutive audit unresolved. It requires an operator decision that has never been made.

Mobile PageSpeed dropped from 55 to 47 — React SPA hydration continues to bottleneck rendering. LCP = 8.0s on homepage (3.2x the good threshold). This is unfixable without framework migration.

**This site needs sustained investment (content velocity + authority building), not more technical ACTs. The SPA redirect issue needs a deeper architectural fix, but the honest question is whether it's worth fixing on a site with 0 conversions and 0 active investment. Fix the redirect issue because it's destroying existing impressions, then leave it alone.**

---

## Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Mode: ARCHITECT + AEO SPECIALIST**

### Architecture
- **Stack**: React 19 SPA (Vite build) with SSG post-processing via `generate-static.js` — NOT Astro
- **Deployment**: Cloudflare Pages. `_redirects` updated 29.10.26 to add explicit rewrite rules above the SPA catch-all
- **Content source**: Supabase `li10_posts` (project `acheexsffdcuzidpiwbh`)
- **Repo**: `EldrisOU/launchedin10-final`

### _redirects file (current state, post ACT-LI10-055/056/057 deployment):
```
/blog/* /blog/:splat 200
/seo-automation-sale/ /seo-automation/ 301
/website-translation-sale/ /website-translation/ 301
/pricing/ /pricing/index.html 200
/* /index.html 200
```

### RE-LOOP GATE Answers

- **data-ai-summary blocks?** YES — Homepage: 3, /pricing/: 1, /case-studies/: 3, /seo-automation/: 3, /website-translation/: 3, 7-companies blog: 8. Blog posts have per-post data-ai-summary blocks.
- **RS-5 pre-flight**: **FINDING PERSISTS — Unscoped global hiding rule in `src/index.css`:**
  ```css
  [data-ai-summary] { position: absolute !important; width: 1px !important; ... }
  ```
  Selector: `[data-ai-summary]` — UNSCOPED with `!important`. Same pattern as torxup ACT-TORX-038. Currently benign because all data-ai-summary elements are purpose-built summary elements. ACT-LI10-054 (P2) from Run 23 remains open.
- **Speakable schema?** YES — via `generate-static.js`, every page gets `SpeakableSpecification` with `cssSelector: [".speakable-summary"]`.
- **llms.txt?** YES — exists at `/llms.txt`, returns 200. Lists core services, key pages, blog categories. Does NOT list individual blog post URLs. Reflects current site state.
- **Schema markup?** Organization, WebSite, WebPage (all pages); FAQPage (homepage, case studies); Service (seo-automation, website-translation, pricing); Article (blog posts); BreadcrumbList (most pages); SpeakableSpecification (all pages); VideoObject (blog posts with YouTube).
- **Last 7 days?** Zero code commits. Last commit: 29.10.26 (ACT fixes). Site codebase unchanged since.
- **Publishing automation?** `generate-sitemap.js` pulls from Supabase; `submit-bing-indexnow.js` batch-submits to IndexNow (key: `40b3efc5ab8e4c0e9ca6163daca5d29e`). IndexNow key file exists at `public/40b3efc5ab8e4c0e9ca6163daca5d29e.txt`. No n8n webhook triggers in repo.

---

## Step 0 — Service Account Access Gate [ARCHITECT]

**Mode: ARCHITECT**

| Check | Result |
|-------|--------|
| GSC Property | `sc-domain:launchedin10.co.uk` (Domain property, siteOwner) |
| gsc_inspect_url (homepage) | PASS — Submitted and indexed, last crawled 03.11.26, canonical aligned |
| GA4 Property | `properties/517814343` confirmed |

---

## Step 1 — Historical Lookback [SENTINEL]

**Mode: SENTINEL**

- **Previous audit**: Run 23, 29.10.26 (11 days ago)
- **25 audit directories** in repo spanning 20.02.26 to 29.10.26

### Run 23 Key Findings and Resolution Status

| ID | Priority | Description | Run 23 Status | Current Status |
|----|----------|-------------|---------------|----------------|
| ACT-LI10-055 | P0 | Top impression page (7-companies) redirect collapse | Completed (29.10.26) | **NOT RESOLVED** — Google hasn't recrawled since 03.09.26. Fix deployed but not verified. |
| ACT-LI10-056 | P0 | Soft 404 sale pages (/seo-automation-sale/, /website-translation-sale/) | Completed (29.10.26) | **CONFIRMED RESOLVED** — Both return 301 to correct service pages |
| ACT-LI10-057 | P0 | /pricing/ redirect treatment | Completed (29.10.26) | **NOT RESOLVED** — Google recrawled 03.11.26, STILL "Page with redirect" |
| ACT-LI10-035 | P0 | Homepage price mismatch (HTML vs JSON-LD) | Open (8th audit) | Still open (9th audit) |
| ACT-LI10-054 | P2 | RS-5 unscoped global hiding rule | Open | Still open |
| ACT-LI10-042 | P3 | Speakable ghost selector | Monitor | Still monitoring (7th audit) |
| ACT-LI10-047 | P3 | dateModified uses build timestamp | Monitor | Still monitoring (6th audit) |
| ACT-LI10-049 | P3 | 29% blog posts missing BreadcrumbList | Monitor | Still monitoring (6th audit) |

### CRITICAL: ACT-LI10-055 and ACT-LI10-057 marked "completed" in Run 23 but NOT resolved

The _redirects changes were deployed on 29.10.26. However:
- **/pricing/**: Google recrawled on 03.11.26 (5 days post-fix) and STILL reports "Page with redirect" with canonical collapsed to /. The fix is provably insufficient.
- **7-companies blog**: Google hasn't recrawled since 03.09.26 (67 days). Fix deployed but unverified because Google hasn't returned.

These items are RE-ESCALATED as new P0 findings with deeper root cause analysis required.

---

## Step 1.5 — Shared Ledger Context [SENTINEL]

**Mode: SENTINEL**

- `swarm_audit_ledger.json`: Not present at workspace root. N/A.
- `master_portfolio_registry.json`: Not present. N/A.

---

## Step 2 — Data Acquisition [SENTINEL]

**Mode: SENTINEL**

### Source Summary

| # | Source | Status | Key Data |
|---|--------|--------|----------|
| 1 | GSC Search Analytics (90d) | ACQUIRED | 1,196 rows, 8,316 impressions, 2 clicks |
| 2 | GA4 Page Engagement (90d) | ACQUIRED | via traffic sources call |
| 3 | GA4 Traffic Sources (90d) | ACQUIRED | 335 sessions (hostname-filtered) |
| 4 | GA4 Campaigns | N/A | No active campaigns |
| 5 | GSC URL Inspections | ACQUIRED | 7 URLs inspected |
| 6 | Sitemaps | ACQUIRED | 118 URLs in sitemap.xml |
| 7 | Bing WMT | ACQUIRED | Blocks A, B, C, D completed per li-10-bing-aeo-protocol |
| 8 | GA4 Behaviour Events | N/A — not instrumented | launchedin10.co.uk has no row in GA4 Behaviour Event Registry |

### GSC Top 10 Queries (90d: 12.08.26 — 09.11.26)

| Query | Impressions | Clicks | Position | Note |
|-------|------------|--------|----------|------|
| google ads for solicitors | 423 | 1 | 12.9 | law.launchedin10.co.uk content |
| solicitor google ads | 343 | 0 | 10.1 | law.launchedin10.co.uk content |
| website designers for small business | 263 | 0 | 32.6 | |
| web design services for small business | 243 | 0 | 30.3 | |
| solicitors google ads | 173 | 0 | 12.6 | law.launchedin10.co.uk content |
| local business web design | 141 | 0 | 78.1 | |
| small business web design company | 137 | 0 | 22.8 | |
| seo baseline | 132 | 0 | 34.5 | |
| distilled seo | 128 | 0 | 49.9 | |
| small business web design uk | 123 | 0 | 46.0 | |

Note: "solicitor" and "google ads for solicitors" queries surface from `law.launchedin10.co.uk` via the domain property. These are NOT LI10 main site content.

### GA4 Traffic Sources (hostname=launchedin10.co.uk, 90d)

| Source / Medium | Sessions |
|----------------|----------|
| (direct) / (none) | 305 |
| type19specialists.com / referral | 15 |
| google / organic | 10 |
| bing / organic | 3 |
| (not set) / (not set) | 2 |

### AEO Citation Breakdown

| AI Source | Sessions |
|-----------|----------|
| chatgpt.com / referral | 0 |
| perplexity.ai / referral | 0 |
| claude.ai / referral | 0 |
| gemini.google.com / referral | 0 |
| bing.com / referral (Copilot) | 0 |
| **Total AI citations** | **0** |

Zero AI citation sessions. Unchanged from Run 23.

### Bing WMT Data (per li-10-bing-aeo-protocol)

#### Block A — GetUrlInfo (Index Status)

| URL | Discovered | Last Crawled | Doc Size | IsPage |
|-----|-----------|-------------|----------|--------|
| / | 27.03.26 | 04.11.26 | 26,714 | true |
| /pricing/ | 11.05.26 | 07.11.26 | 26,341 | true |
| /case-studies/ | 19.04.26 | 17.10.26 | 20,862 | true |
| /blog/ | 12.04.26 | 09.10.26 | 58,529 | true |
| /seo-automation/ | 05.04.26 | 15.09.26 | 19,511 | true |
| /blog/.../7-companies.../ | 16.04.26 | 15.10.26 | 29,331 | true |

All sampled URLs indexed in Bing with non-zero document sizes. Bing is crawling more recently than last run — homepage crawled 04.11.26, /pricing/ crawled 07.11.26 (2 days ago).

#### Block B — GetUrlTrafficInfo (Homepage)
Homepage: IsPage=true, Clicks=0, Impressions=0. Indexed but zero visibility. Authority/ranking weakness, NOT indexation issue.

#### Block C — GetFeeds
| Sitemap | Status | URLs |
|---------|--------|------|
| sitemap.xml | Success | 118 |
| sitemap-redirectfix.xml | Success | 16 |

Both sitemaps accepted by Bing. No errors.

#### Block D — GetCrawlIssues
Empty. No crawl issues flagged by Bing.

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Last Crawled | Bing Last Crawled | Bing Size | Winner |
|------|-------------|-------------------|------------------|-----------|--------|
| / | Indexed | 03.11.26 | 04.11.26 | 26,714 | Bing (1 day fresher) |
| /pricing/ | **Page with redirect** | 03.11.26 | 07.11.26 | 26,341 | Bing (4 days fresher, AND indexed) |
| /case-studies/ | Indexed | 09.11.26 | 17.10.26 | 20,862 | Google (23 days fresher) |
| /blog/ | Indexed | 25.10.26 | 09.10.26 | 58,529 | Google (16 days fresher) |
| /seo-automation/ | Not inspected | — | 15.09.26 | 19,511 | — |
| 7-companies blog | **Page with redirect** | 03.09.26 | 15.10.26 | 29,331 | Bing (crawled since; Google 67 days stale) |

**Notable**: Bing indexes /pricing/ correctly (26KB, crawled 07.11.26) while Google treats it as "Page with redirect". Bing also crawled the 7-companies blog on 15.10.26 while Google hasn't returned since 03.09.26.

---

## Step 3 — Data Reconciliation [SENTINEL]

**Mode: SENTINEL**

- GSC organic clicks (90d): 2
- GA4 organic sessions (hostname-filtered): 13 (Google 10 + Bing 3)
- **Delta: 550%** — GA4 shows 6.5x more organic sessions than GSC clicks
- At micro volumes (single digits), this delta is expected noise. GA4 counts sessions, GSC counts clicks (a session without a SERP click counts in GA4 if attributed to organic). Not actionable.

**Reconciliation delta: 550% (expected at micro volumes, not actionable)**

---

## Step 4 — Bot Filtering [SENTINEL]

**Mode: SENTINEL**

### Classification

| Tier | Sessions | % | Criteria |
|------|----------|---|----------|
| **Tier A (Human)** | 107 | 31.9% | Organic (13), engaged referral (15), engaged direct (~79) |
| **Tier B (Grey)** | 38 | 11.3% | Direct with partial engagement, ambiguous |
| **Tier C (Bot/Spam)** | 190 | 56.7% | Zero-engagement direct, (not set) |
| **Total** | 335 | 100% | |

**Bot inflation formula**: bot_inflation_pct = (total_sessions − tier_a_sessions) / total_sessions × 100
= (335 − 107) / 335 × 100 = **68.1%**

### Comparison to prior audit
- Run 23: Tier A = 95, total = 259, bot inflation = (259 − 95) / 259 × 100 = 63.3%
- Run 24: Tier A = 107, total = 335, bot inflation = 68.1%
- Tier A grew +12.6%, but total sessions grew faster (+29.3%) — bot inflation worsened by +4.8pp. The increase in total sessions is predominantly zero-engagement direct traffic (bots/crawlers).

### Per-language: EN = 107 Tier A (single-language property, all Tier A is EN)

---

## Step 4.5 — Behaviour & User-Type Indicators

Step 4.5 N/A — not instrumented. launchedin10.co.uk has no row in CONTEXT.md → GA4 Behaviour Event Registry.

---

## Step 5 — Technical Audit [ARCHITECT+AEO]

**Mode: ARCHITECT + AEO SPECIALIST**

### Sitemap Analysis

| Sitemap | URLs | lastmod Range | GSC Status | Bing Status |
|---------|------|--------------|------------|-------------|
| sitemap.xml | 118 | 2026-01-01 to 2026-10-29 | Submitted, 118 web + 74 video, 0 indexed (reporting anomaly) | Success |
| sitemap-redirectfix.xml | 16 | Legacy | Submitted, 16 web, 0 indexed | Success |

GSC "0 indexed" is a known reporting anomaly for domain properties — URL inspections confirm multiple pages ARE individually indexed. Sitemaps are error-free.

Static page lastmods updated to 2026-10-29 (the ACT deployment date). Blog post lastmods range from 2026-01-01 to 2026-06-01.

### PageSpeed Scores

| Page | Mobile Score | LCP | FCP | TBT | CLS |
|------|-------------|-----|-----|-----|-----|
| Homepage | 47 | 8.0s | 8.0s | 430ms | 0 |
| 7-companies blog | 56 | 16.0s | 8.5s | 70ms | 0 |
| Case Studies | 56 | 9.8s | 9.8s | 60ms | 0 |

Mobile performance is catastrophic. All pages fail Core Web Vitals on mobile. LCP ranges 8.0s to 16.0s (good threshold: 2.5s). TTFB is 0ms (Cloudflare edge), so the bottleneck is the React SPA — JavaScript must download, parse, hydrate, and render before any content appears. This is an architectural limitation unfixable without framework migration.

Homepage PageSpeed dropped from 55 (Run 23) to 47 — further degradation. LCP improved slightly (8.0s vs 12.1s) but TBT worsened (430ms vs unknown).

### URL Inspection Results

| URL | Status | Last Crawled | Canonical | Notes |
|-----|--------|-------------|-----------|-------|
| / | Submitted and indexed | 03.11.26 | Self | Healthy |
| /pricing/ | **Page with redirect** | 03.11.26 | / | **P0 — PERSISTS POST-FIX (recrawled 5 days after fix)** |
| /case-studies/ | Submitted and indexed | 09.11.26 | Self | Healthy. Rich results: Breadcrumbs, Image, Video |
| /blog/ | Submitted and indexed | 25.10.26 | Self | Healthy |
| /blog/.../7-companies.../ | **Page with redirect** | 03.09.26 | /blog/ | **P0 — 67 days since last crawl, fix unverified** |
| /seo-automation-sale/ | URL is unknown to Google | Never | N/A | Expected — 301 redirect deployed 29.10.26 |

### P0 CRITICAL — /pricing/ Redirect Treatment PERSISTS POST-FIX

The _redirects rule `/pricing/ /pricing/index.html 200` was added on 29.10.26. Google recrawled /pricing/ on **03.11.26** — 5 days later — and STILL reports "Page with redirect" with canonical collapsed to `/`. The fix is provably insufficient.

The page serves correct, unique content: title "Web Design & SEO Pricing | LaunchedIn10", canonical `https://launchedin10.co.uk/pricing/`, 17KB HTML, 1 data-ai-summary block. Bing indexes it correctly (26,341 bytes, last crawled 07.11.26).

**Root cause hypothesis**: The SPA architecture is the problem, not the _redirects rules. Even with the explicit rewrite, Cloudflare Pages may be serving the page via a server-side rewrite chain that Google interprets as a redirect. The SSG pre-renders the HTML, but the Vite build system + CF Pages deployment may not be placing the static HTML at the expected path for CF Pages to serve directly. Alternative: the trailing-slash behaviour (`/pricing` vs `/pricing/`) may trigger a CF redirect before the _redirects rule applies.

### P0 CRITICAL — 7-Companies Blog Redirect (67-Day Stale Crawl)

Google hasn't recrawled `/blog/website-design/7-companies-that-design-websites-for-small/` since 03.09.26. The `/blog/* /blog/:splat 200` rule was deployed 29.10.26 but is UNVERIFIED because Google hasn't returned. This page generates 49%+ of all GSC impressions but is losing position while Google treats it as a redirect.

The page serves correct SSG content: title "7 Companies That Design Websites for Small Businesses Falling Behind | LaunchedIn10", self-referencing canonical, 30KB HTML, 8 data-ai-summary blocks.

### RS-5 Finding — Unscoped Global Hiding Rule (carried forward)

`src/index.css` contains `[data-ai-summary] { ... !important }` — unscoped. ACT-LI10-054 from Run 23 remains open.

---

## Step 5.05 — Content Integrity Assertions [ARCHITECT+SENTINEL]

**Mode: ARCHITECT + SENTINEL**

### 5.05.A — Body Fingerprint Assertion

Homepage baseline: Title = "High-Performance Web Design in 10 Days | LaunchedIn10"

| URL | Title | Canonical | Homepage Content? | Result |
|-----|-------|-----------|-------------------|--------|
| / | High-Performance Web Design... | / | BASELINE | — |
| /pricing/ | Web Design & SEO Pricing... | /pricing/ | NO | PASS |
| /case-studies/ | Real Websites. Live in 10 Days... | /case-studies/ | NO | PASS |
| /seo-automation/ | Daily SEO Content Automation... | /seo-automation/ | NO | PASS |
| /website-translation/ | Expand to Europe... | /website-translation/ | NO | PASS |
| /blog/.../7-companies.../ | 7 Companies That Design... | self | NO | PASS |

All commercial pages serve unique content with correct self-referencing canonicals. No 200-with-homepage-content issues.

**ACT-LI10-056 (sale page soft 404s) CONFIRMED RESOLVED**: Both /seo-automation-sale/ and /website-translation-sale/ now return HTTP 301 redirecting to /seo-automation/ and /website-translation/ respectively.

### 5.05.B — Price/Currency Drift

| Page | HTML Prices | JSON-LD Prices | Match? |
|------|------------|---------------|--------|
| / | £99.95, £149.95, £195.00, £195, £2, £5, £5,000 | £497, £997, £1,997, £99, £149, £249 (GBP) | **NO — P0 (9th audit)** |
| /pricing/ | £497, £997, £1,997, £99, £149, £249 | Same as HTML | YES |
| /seo-automation/ | £99.95, £149.95, £195.00, £195, £50, £100 | £99.95, £149.95, £195.00 (GBP, duplicated) | YES |
| /website-translation/ | £29.95, £49.95, £79.95, £129.95 | Same as HTML (duplicated) | YES |

Homepage price mismatch persists for the 9th consecutive audit. HTML prominently displays SEO automation prices; JSON-LD declares web design activation prices. All other pages are correctly aligned.

Prior audit price_snapshot comparison: No price changes detected. All values identical to Run 23.

### 5.05.C — Required Content Markers

All pages contain "LaunchedIn10" brand marker. PASS.

### Price Snapshot

Identical to Run 23. No drift detected.

---

## Step 5.06 — Language Integrity [SENTINEL+AEO]

N/A — single-language property (EN only). Confirmed no non-English content on any page.

---

## Step 5.07 — Per-Language Meta + AEO Signal Parity [AEO SPECIALIST]

N/A — single-language property.

---

## STEP 5.5 PRE-FLIGHT ASSERTION — launchedin10.co.uk

parity criteria 32-36 skipped: single-language property

---

## Step 5.1 — Content Freshness Gate [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

| Commercial Page | Sitemap lastmod | Days Since Update | Status |
|----------------|----------------|-------------------|--------|
| / | 2026-10-29 | 11 | OK (updated by ACT deploy) |
| /pricing/ | 2026-10-29 | 11 | OK |
| /case-studies/ | 2026-10-29 | 11 | OK |
| /seo-automation/ | 2026-10-29 | 11 | OK |
| /website-translation/ | 2026-10-29 | 11 | OK |

Static page lastmods were updated to 2026-10-29 by the ACT-LI10-055/056/057 deployment. These pages are now within the 90-day window.

Blog post lastmods: range from 2026-01-01 to 2026-06-01. All blog posts exceed 90 days since last content update (oldest: 313 days). This is expected for a maintenance-only site with zero content velocity.

dateModified in JSON-LD uses build timestamp (ACT-LI10-047, 6th audit — monitor only).

---

## Step 5.2 — Structured Data Coverage Score [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

| Schema Type | Commercial Pages (5) | Blog Posts (105) | Overall (118) |
|-------------|---------------------|-----------------|---------------|
| BreadcrumbList | 100% | ~71% | ~74% |
| WebPage | 100% | 100% | 100% |
| Organization | 100% | 100% | 100% |
| FAQPage | 40% (homepage, case studies) | 0% | ~3% |
| Service | 60% (seo-auto, translation, pricing) | 0% | ~3% |
| Article | 0% | 100% | ~89% |
| Speakable | 100% | 100% | 100% |
| data-ai-summary | 100% (13+ blocks) | variable (7-companies has 8) | ~10% |
| VideoObject | 0% | Variable (posts with YouTube) | ~15% |

No change from Run 23. No new structured data deployed.

---

## Step 6 — Gap Analysis [STRATEGIST+AEO]

**Mode: STRATEGIST + AEO SPECIALIST**

### Ghost Data Analysis
8,316 impressions, 2 clicks. Virtually all content is ghost-indexed — visible in SERPs but too deep for clicks. Ghost rate: 99.98%.

### Intent Clusters

| Cluster | Queries | Impressions | Best Position | Verdict |
|---------|---------|-------------|---------------|---------|
| "web design small business" (8 variants) | 8 | ~1,500 | 22.8 | B — consolidate on homepage/blog post |
| "solicitor/google ads" (law subdomain) | 3 | ~939 | 10.1 | C — law.launchedin10.co.uk content |
| "seo baseline/fundamentals" | 3 | ~314 | 34.5 | B — blog content exists |
| Misc SEO/web terms | 10+ | ~2,000 | 30+ | Ghost — too scattered |

No Verdict A actions proposed. All addressable gaps have existing content.

### Cross-Language Cannibalisation
N/A — single-language property.

---

## Step 6.1 — Citation Matrix [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

### SERP and AEO Check Results

| Query | AI Overview? | LI10 in SERP? | Our Position | Top Competitor |
|-------|-------------|---------------|-------------|----------------|
| web design services for small business uk | NO | Not in top 10 | ~30 (GSC) | indigoross.co.uk (pos 1) |
| website designers for small business | NO | Not in top 10 | ~33 (GSC) | indigoross.co.uk (pos 1), threegirlsmedia.co.uk (pos 2) |

No AI Overview triggers on tested queries. LI10 is not ranking in the visible SERP (top 10) for any commercial query. The head term "website designers for small business" is dominated by specialist agencies and Reddit.

GA4 AI citation data: 0 sessions from any AI source in the 90-day window.

**Citation tier classification**: Not Cited across all tested queries and all AI systems. No tier movement. No first-ever citations to trigger the compounding response.

---

## Step 6.2 — Competitor AEO Benchmarking [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

For "website designers for small business" (head term):
- Position 1: indigoross.co.uk — specialist small business web design agency
- Position 2: threegirlsmedia.co.uk — Surrey/South London focused
- Position 3: Reddit — community discussion
- Positions 4-10: Various UK web design agencies

No competitor is being cited by AI on this query (no AI Overview triggered). LI10 is not within striking distance of the visible SERP (position ~33). Competitive gap is authority-driven, not structural.

---

## Step 6b — Cross-Portfolio Equity [STRATEGIST]

**Mode: STRATEGIST**

LI10 is an independent brand — per intent boundaries, it does NOT cross-link with Eldris-branded properties or other non-Eldris brands.

Observed cross-portfolio referral traffic:
- type19specialists.com → LI10: 15 sessions (intent boundary note: non-Eldris brands should not cross-link with each other)
- No Eldris → LI10 referrals this period (the epr.eldris.ai referral from Run 23 no longer appears)

Deep-link drafts: N/A — LI10 is independent and should not receive cross-portfolio links.

---

## Step 7 — Pipeline Audit [ARCHITECT]

**Mode: ARCHITECT**

| Metric | Value |
|--------|-------|
| Published posts (li10_posts) | 105 |
| Last publish date | 2026-03-20 (234 days ago) |
| orbit_3_flow processed | 95 |
| orbit_3_flow queued (processed=false) | 0 |
| Stalled items | None |
| Pipeline status | **DRY — completely dormant for 234 days** |

No change from Run 23. Pipeline remains empty. Content velocity = 0.

---

## Step 7.5 — CRO Audit [CONVERTER]

**Mode: CONVERTER**

N/A — no page meets the >100 Tier A sessions threshold. Homepage has 91 total sessions but only ~33 Tier A (engaged). Zero conversions site-wide across 24 audit runs.

Behaviour data: N/A — not instrumented.

---

## Step 8 — Action Plan [ALL MODES]

See `Bot_Cleaned_Action_Plan_li10.json` for the full action plan.

### Self-Challenge Results

**8A — Honesty Gate**: Would I spend my own money on these? YES for the two P0 redirect issues — they are actively destroying the only impressions this site earns. The price mismatch (ACT-LI10-035) requires an operator decision that has been deferred for 9 audits — flag it but don't expect action. The RS-5 fix and monitors are correctly prioritised.

**8B — Codebase Cross-Check**: Verified all recommendations against codebase. The _redirects file was read from GitHub. The /pricing/ redirect treatment persists despite the deployed fix — this is confirmed by GSC data, not assumed.

**8C — Data Integrity Check**: All data points trace to tool calls in this session. No fabricated metrics. Behaviour data marked N/A — not instrumented.

**8D — Schema Compliance**: All actions have `description` (2+ sentences) and `prompt` (executable). No forbidden fields used.

**8E — Cannibalisation Check**: No Verdict A actions proposed.

**8F — Priority Sanity Check**: 3 P0s (redirect issues destroying impressions + price mismatch requiring operator decision), 0 P1s, 1 P2 (RS-5), 3 P3s (monitors). Defensible — the P0s are genuine and the lack of P1s reflects the maintenance-only reality.

**8G — Render Safety Check**: ACT-LI10-054 (RS-5 remediation) is carried forward unchanged from Run 23. No new actions touch hiding attributes. PASS.

---

## Step 8.5 — Ghost Indexing [INCUBATOR]

**Mode: INCUBATOR**

All LI10 content is ghost-indexed. 8,316 impressions with 2 clicks across 1,196 query/page combinations.

| Page | Best Position | Impressions | Equity Risk |
|------|-------------|-------------|-------------|
| /blog/.../7-companies.../ | ~33 | ~4,000+ | HIGH — redirect treatment, 67-day stale crawl |
| /blog/.../dedicated-server.../ | ~20 | ~649 | MEDIUM — indexed and healthy |
| /blog/seo-fundamentals/ | ~35 | ~437 | LOW — category page |

**Expiry timeline**: The 7-companies blog post is the only asset with material impressions and it's being treated as a redirect. Without recrawl and resolution, it will continue to degrade. Estimated position loss: ~5 positions per month at current trajectory.

---

## Step 9 — Archive

### Naming Contract Verification
- Directory: `runperformance.09.11.26` — matches CONTEXT.md (no suffix for LI10)
- SITE_CODE: `li10` — matches CONTEXT.md
- Files:
  1. `walkthrough.md` — correct
  2. `Gap_Analysis_li10_09.11.26.json` — correct (DD.MM.YY format)
  3. `Bot_Cleaned_Action_Plan_li10.json` — correct (no date)

### Pre-Push Parity Validator Output

PASS: parity criteria 32-36 N/A (single-language property)

---

## Challenge Loop

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Step -1: Action recommending something codebase already has? | PASS — no duplicate recommendations |
| 2 | Step 0: Any GSC call failed due to wrong format? | PASS — sc-domain:launchedin10.co.uk used throughout |
| 3 | Step 1: Any action re-proposing completed prior work? | PASS — ACT-LI10-055/057 are RE-ESCALATED with new evidence (not re-proposed) |
| 4 | Step 2: Any analysis on non-hostname-filtered data? | PASS — all GA4 data hostname-filtered |
| 5 | Step 3: Any traffic claim without reconciliation? | PASS — reconciliation stated (550% delta at micro volumes) |
| 6 | Step 4: Any metric based on unfiltered Tier B/C data? | PASS — all metrics use Tier A |
| 7 | Step 5: Any sitemap reported as "?" or "unknown"? | PASS — all definitive |
| 8 | Step 5 (Bing protocol loaded): | PASS — li-10-bing-aeo-protocol, Blocks A/B/C/D completed |
| 9 | Step 5 (Bing three-metric model): | PASS — index status (Block A IsPage), search performance (Block B), sitemap (Block C) treated independently. No conflation. |
| 10 | Step 5.05 (200-with-homepage-content): | PASS — all commercial pages verified with unique titles and canonicals |
| 11 | Step 5.05 (price drift): | PASS — price_snapshot written, prior audit compared, homepage mismatch flagged (9th audit) |
| 12 | Step 5.05 (status-only regression): | PASS — body content verified via curl on all pages, not just HTTP status |
| 13 | Step 5.06 (language integrity): | N/A — single-language property |
| 14 | Step 5.06 (slug cross-leakage): | N/A — single-language property |
| 15 | Step 5.06 (single-lang contamination): | PASS — confirmed no non-English content in body |
| 16 | Step 5.1: Stale commercial pages missed? | PASS — all blog staleness noted; commercial pages updated to 29.10.26 |
| 17 | Step 5.2: Schema coverage in report? | PASS — coverage table included |
| 18 | Step 6: Verdict A cannibalises? | PASS — no Verdict A proposed |
| 19 | Step 6.1: Citation matrix present? | PASS — tested 2 queries via ai_overview_check + serp_check |
| 20 | Step 6.2: Competitor Tier 1 missed? | PASS — no AI Overview triggers; no competitor Tier 1 to miss |
| 21 | Step 6b: Intent boundary violation? | PASS — no cross-portfolio links recommended |
| 22 | Step 7: status used instead of processed? | PASS — processed boolean used |
| 23 | Step 8: Action recommending existing work? | PASS — all verified against codebase |
| 24 | Step 9 (files local): | PASS — 3 files written |
| 25 | Step 9 (naming contract): | PASS — li10, no dots, no date in Bot_Cleaned, DD.MM.YY in Gap_Analysis |
| 26 | Step 9 (GitHub push): | PENDING — after challenge loop |
| 27 | Step 9 (orbit_3_flow): | PASS — no Verdict A, no UPSERTs |
| 28 | Honesty: | PASS — redirect P0s are genuine; no busywork |
| 29 | llms.txt: | PASS — exists, reflects current state |
| 30 | Legacy sitemap: | N/A — no 301s deployed this run |
| 31 | Dashboard ingestion: | PENDING — after push |
| 32-36 | parity criteria 32-36 skipped: single-language property |
| 37 | Plan-side render safety (RS-1/2/3/5): | PASS — ACT-LI10-054 is RS-5 remediation. No action adds hiding to content elements. |
| 38 | RS-4 N/A: no source commit this run |
| 39 | Step 4.5 (behaviour): | Step 4.5 N/A — not instrumented |
| 40-44 | locale criteria 40-44 skipped: single-language property |

**RESULT: PASS — all applicable criteria passed. Challenge loop complete.**

The 3 files pushed to GitHub for launchedin10.co.uk are: `walkthrough.md`, `Gap_Analysis_li10_09.11.26.json`, `Bot_Cleaned_Action_Plan_li10.json`. These match the CONTEXT.md naming contract: YES.

---

## scrollHeight Baselines (for RS-4 future runs)

No source commits this run. No RS-4 checks required.
