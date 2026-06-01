# RunPerformance Walkthrough — launchedin10.co.uk
## Run 15 | 01.06.26 | DeepRank v3.0

---

## Key Metrics (90-day window)

| Metric | Run 14 (18.05.26) | Run 15 (01.06.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions | 700 | 1,075 | **+53.6%** |
| GSC Clicks | 0 | 0 | — |
| Tier A Sessions | 83 | 89 | +7.2% |
| Bot Inflation | 66% | 57.2% | -8.8pp |
| AI Citations | 2 (Perplexity) | 1 (Perplexity) | -1 |
| Conversions | 0 | 0 | — |
| Posts Published | 108 | 108 | Stalled (73d) |
| Bing Pages w/ Content | 2 | 4 | +2 |

**Note**: GSC property `sc-domain:launchedin10.co.uk` includes law.launchedin10.co.uk. ~15% of impressions (~160) are solicitor/barrister queries from the law subdomain. LI10-specific impressions estimated ~915 (still +31% from prior).

---

## Honest Assessment

The site is on a healthy incubation trajectory but is nowhere near traction. GSC impressions are growing steadily (+53.6%) and bot inflation is improving, but zero clicks in 90 days tells the real story — no query has reached a clickable position for LI10-specific content. The law subdomain is the best performer in this GSC property, with "solicitors google ads" at position 6.1.

**What the site needs**: Fix the FAQPage duplicate that's been open for 6 audits. Submit the 2 Bing stale-empty pages. Deploy IndexNow. Then wait. The content pipeline has been stalled 73 days with zero items queued — there is nothing to publish. The 108 blog posts are all that exist. New content is NOT recommended until the existing pages start generating clicks.

**What the site does NOT need**: More content, AEO optimisation (1 AI session in 90 days), CRO work (0 conversions with 0 conversion events configured), or design changes.

---

## Step-by-Step Audit Narrative

### Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Repo**: EldrisOU/launchedin10-final (public). React SPA with Vite + Node.js SSG layer (`generate-static.js`). Content from Supabase `li10_posts` (108 rows). Cloudflare Pages via `wrangler.toml`.

- **data-ai-summary**: Present on blog posts (8-9 per post). **Absent on all 5 commercial pages.** Blog template has it; commercial template does not.
- **Speakable**: SpeakableSpecification in WebPage schema targeting `.speakable-summary` CSS selector. DOM element exists on homepage hero and blog excerpts. Commercial page coverage uncertain (cssSelector may not resolve on /seo-automation/, /website-translation/).
- **llms.txt**: Exists. Lists homepage, blog, case studies, SEO automation, website translation, 4 blog categories, and law division. Well-structured. No individual blog posts (acceptable).
- **Schema**: Comprehensive via `generate-static.js` — Organization, WebSite, WebPage+Speakable, FAQPage (homepage SSG), Service+Offer (homepage), Article (blog), BreadcrumbList (blog), VideoObject (blog with YouTube).
- **Last 7 days**: Only audit artefact commits (25.05.26). No code changes.
- **Automation**: Supabase → SSG → Cloudflare Pages rebuild. `generate-sitemap.js` dynamic. `submit-bing-indexnow.js` for Bing batch.

### Step 0 — GSC Access [ARCHITECT]

- Format: `sc-domain:launchedin10.co.uk` (Domain, siteOwner) ✅
- Homepage inspection: PASS — Submitted and indexed, crawled 26.05.26, FAQ rich results PASS ✅
- GA4: properties/517814343 ✅

### Step 1 — Historical Lookback [SENTINEL]

No `runperformance/` directories in the GitHub repo. Prior audit data from shared ledger only (Run 14, 18.05.26).

**Prior P1 issues**:
- ACT-LI10-023: FAQPage WRS duplicate → **STILL OPEN** (6th audit)
- ACT-LI10-024: /blog/ 57 days stale → **RESOLVED** (crawled 22.05.26, now 10 days)

**Prior P2/P3**:
- ACT-LI10-027: Bing 5 stale-empty subpages → **PARTIAL** (3 resolved, 2 remain)
- ACT-LI10-028: IndexNow key → **STILL OPEN**

### Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired:
1. ✅ GSC Search Analytics (90d): 0 clicks, 1,075 impressions, 268 queries
2. ✅ GA4 Page Engagement: 208 sessions across 28 pages
3. ✅ GA4 Traffic Sources: 14 google/organic, 4 bing/organic, 1 perplexity/referral
4. ✅ GA4 Campaigns: N/A (no ads)
5. ✅ GSC URL Inspections: 5 commercial pages inspected
6. ✅ Sitemap: 117 URLs, last downloaded by Google 17.04.26 (45 days ago)
7. ✅ Bing WMT: Block A (6 URLs), Block B (homepage), Block C (2 feeds), Block D (no issues)

**Bing data acquired per li-10-bing-aeo-protocol**: Boot Sequence + Blocks A, B, C, D all completed.

### Step 3 — Data Reconciliation [SENTINEL]

- GSC organic clicks: 0
- GA4 google/organic sessions: 14
- Delta: +14 (likely Google Discover/Images/non-web-search surfaces)
- Reconciliation: moderate discrepancy, explained by non-search Google surfaces

### Step 4 — Bot Filtering [SENTINEL]

| Tier | Sessions | % |
|------|----------|---|
| A (Verified Human) | 89 | 42.8% |
| B (Grey Zone) | 90 | 43.3% |
| C (Bot/Spam) | 29 | 13.9% |

Bot inflation: **57.2%** (improved from 66% at Run 14).

### Step 5 — Technical Audit [ARCHITECT+AEO]

**Sitemap**: 117 URLs in sitemap.xml. Last downloaded by Google: 17.04.26 (45 days ago — concerning but not actionable; Google controls download frequency). 16 URLs in sitemap-redirectfix.xml. Both GSC-submitted, 0 errors.

**URL Inspections**:
| URL | Indexed | Last Crawl | Rich Results |
|-----|---------|-----------|-------------|
| / | ✅ | 26.05.26 | FAQ PASS |
| /blog/ | ✅ | 22.05.26 | — |
| /seo-automation/ | ✅ | 15.05.26 | — |
| /website-translation/ | ✅ | 18.05.26 | — |
| /case-studies/ | ✅ | 26.05.26 | **FAQ FAIL — Duplicate FAQPage** |

**Bing vs Google Crawl**:
| Page | Google | Bing | Bing Size | Winner |
|------|--------|------|-----------|--------|
| / | 26.05 | 29.05 | 24,882 | Google (3d) |
| /seo-automation/ | 15.05 | 27.05 | 14,586 | Google (12d) |
| /website-translation/ | 18.05 | 08.05 | **0** | **STALE-EMPTY** |
| /case-studies/ | 26.05 | 24.05 | 15,539 | Bing (2d) |
| /blog/ | 22.05 | 17.05 | 55,968 | Bing (5d) |
| /blog/.../accessibility/ | N/A | 01.05 | **0** | **STALE-EMPTY** |

Bing Block B: 0 impressions, 0 clicks (authority problem, not indexation).
Bing Block C: Both sitemaps Status=Success.
Bing Block D: No crawl issues.

### Step 5.05 — Content Integrity [SENTINEL]

- **Body fingerprint**: PASS — all pages serve unique content
- **Price drift**: Homepage JSON-LD prices (£497/£997/£1,997) NOT visible on page (P2). /seo-automation/ and /website-translation/ have visible prices but no JSON-LD (P2).
- **Brand markers**: PASS — all pages contain "LaunchedIn10"
- **data-ai-summary**: 0 on all 5 commercial pages. 8-9 on blog posts.
- **Canonical**: Homepage canonical missing trailing slash (minor P2)

### Step 5.1 — Content Freshness [AEO SPECIALIST]

Commercial pages: 2-way alignment only (sitemap + schema at 2026-05-25). No visible dates on any page — 3-way alignment impossible.

Stale blog posts:
- `/blog/.../web-design-cost-2026-breakdown-small/`: **132 days** (P1 — breaches 90-day threshold)
- `/blog/.../mobile-app-development-company-uk/`: 85 days (watch — 5 days from threshold)

Systemic: All commercial pages share identical dateModified `2026-05-25T06:31:29.839Z` — build-time stamp, not genuine edit date.

### Step 5.2 — Structured Data Coverage [AEO SPECIALIST]

| Schema | Commercial (5 pages) | Blog (3 sampled) | Overall |
|--------|---------------------|-------------------|---------|
| FAQPage | 100% | 100% | **100%** |
| Organization | 100% | 100% | **100%** |
| Speakable | 100% | 100% | **100%** |
| Service | 60% | 0% | 37.5% |
| Article | 0% | 100% | 37.5% |
| BreadcrumbList | **0%** | 100% | 37.5% |
| VideoObject | 0% | 100% | 37.5% |
| data-ai-summary | **0%** | 100% | 37.5% |
| HowTo | 0% | 0% | **0%** |

Baseline audit — no prior comparison.

### Step 6 — Gap Analysis [STRATEGIST+AEO]

**Ghost queries (impressions, 0 clicks)**:
- "google ads audit" (60 imp, pos 26.4) — too deep
- "inexpensive web design companies" (29 imp, pos 21.7) — page 2 edge
- "wordpress site maintenance services" (25 imp, pos 21.9) — page 2 edge

No Verdict A (new content) actions — pipeline stalled, no cannibalisation risk, site needs authority not content.

### Step 6.1 — Citation Matrix [AEO SPECIALIST]

0/5 queries trigger AI Overview in UK. AEO desert for web design/SME verticals. No competitor citations to analyse. GA4: 1 Perplexity session (homepage, 135.7s engaged).

### Step 6.2 — Competitor AEO Benchmarking [AEO SPECIALIST]

No AI Overviews = no competitor Tier 1 citations. N/A for this vertical currently.

### Step 7 — Pipeline Audit [ARCHITECT]

- li10_posts: 108 published (unchanged since 20.03.26 — 73 days)
- orbit_3_flow: 95 processed, 0 queued
- Pipeline fully drained. No content velocity.

### Step 7.5 — CRO Audit [CONVERTER]

Homepage qualifies (147 sessions > 100 threshold, 0 conversions). However, GA4 shows 0 conversions across ALL pages — conversion events appear not configured. This is a systemic measurement gap, not a CRO issue. Cannot assess conversion performance without conversion tracking.

### Step 8.5 — Ghost Indexing [INCUBATOR]

No queries with position <20 and meaningful equity for LI10-specific content. The law subdomain queries (solicitors google ads cluster, pos 6-9) have the strongest ghost equity but belong to law.launchedin10.co.uk.

---

## Action Summary

| ID | Priority | Description |
|----|----------|-------------|
| ACT-LI10-023 | P1 | FAQPage WRS duplicate on /case-studies/ — **6th audit** |
| ACT-LI10-029 | P1 | Bing stale-empty-crawl: /website-translation/ + accessibility-checker |
| ACT-LI10-030 | P2 | Homepage JSON-LD prices not visible; service pages missing JSON-LD |
| ACT-LI10-031 | P2 | data-ai-summary on 5 commercial pages |
| ACT-LI10-028 | P2 | Deploy IndexNow key (carried from Run 14) |
| ACT-LI10-032 | P2 | Refresh web-design-cost-2026 blog post (132d stale) |
| ACT-LI10-033 | P3 | BreadcrumbList on commercial pages |
| ACT-LI10-034 | P3 | PageSpeed (API quota exhausted — deferred) |
| ACT-LI10-035 | P3 | Monitor — Run 16 checkpoint |

**Resolved since Run 14**:
- ACT-LI10-024: /blog/ stale crawl → RESOLVED (crawled 22.05.26)
- ACT-LI10-016: /seo-automation/ indexing → RESOLVED
- ACT-LI10-018: /website-translation/ Google indexing → RESOLVED
- ACT-LI10-025: Bing /blog/ DocumentSize → RESOLVED (55,968 bytes)
