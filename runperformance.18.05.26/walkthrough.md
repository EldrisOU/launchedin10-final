# RunPerformance Audit — launchedin10.co.uk

**Run 14 | 18.05.26 | Protocol: DeepRank v3.0**
**Previous Audit**: Run 13, 11.05.26

---

## Honest Assessment

LaunchedIn10 is in a holding pattern. 108 published posts, 700+ GSC impressions, zero clicks in 90 days, zero conversions, and the content pipeline has been completely stalled for 59 days. The site needs TIME and content velocity more than technical intervention.

The FAQPage WRS bug (ACT-LI10-023) is the only genuine code fix warranting deployment — open for 5 consecutive audits with zero code changes. Beyond that, the site is doing what a young site does: slowly building Google's trust through consistent impressions.

Positive signals: GSC impressions up 27% (550 to 700+). First multi-page AI citation (Perplexity on /website-translation/). Homepage crawled yesterday. /seo-automation/ and /website-translation/ freshly crawled by Google after months of staleness.

---

## Key Metrics Table

| Metric | Run 13 (11.05) | Run 14 (18.05) | Delta |
|--------|---------------|----------------|-------|
| GSC Impressions (90d) | ~550 | ~700 | +27% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| Tier A Sessions | ~70 | 83 | +18% |
| Bot Inflation | 63% | 66% | +3% |
| Google Organic Sessions | — | 13 | — |
| Bing Organic Sessions | — | 3 | — |
| AI Referral Sessions | 1 | 2 | +1 (Perplexity) |
| Published Posts | 108 | 108 | Flat (59 days stale) |
| orbit_3_flow Queued | 0 | 0 | Flat |
| Conversions | 0 | 0 | Flat |
| Position 1 Queries | 3 | 2 | -1 |
| Sitemap URLs | ~113 | 113 | Flat |

---

## Data Acquisition Summary

| Source | Status | Notes |
|--------|--------|-------|
| GSC Search Analytics (90d) | Complete | ~120 unique queries, 0 clicks, ~700 impressions |
| GA4 Page Engagement (90d) | Complete | 230 on-domain sessions, 25 pages |
| GA4 Traffic Sources (90d) | Complete | Hostname-filtered. Perplexity 2 sessions. |
| GA4 Campaigns | Complete | CPC residual: 6 sessions, 0 engagement |
| GSC URL Inspections | Complete | 6 pages inspected, all PASS (except /case-studies/ FAQ) |
| Sitemaps | Complete | 113 URLs, last downloaded 17.04.26 |
| Bing WMT (li-10-bing-aeo-protocol) | Complete | Blocks A-D on 7 URLs |
| PageSpeed | Rate-limited (429) | Skipped this run |

---

## P1 Findings

### 1. FAQPage WRS Duplicate — 5 Audits Open (ACT-LI10-023)

GSC Rich Results Test on `/case-studies/` returns ERROR: 'Duplicate field FAQPage' (3 instances). Home.jsx injects FAQPage during SPA hydration, conflicting with SSG-injected FAQPage from generate-static.js. This is the highest-engagement commercial page (0.636 engagement rate). FAQ rich results are blocked. **This has been open since Run 10 (06.04.26) with zero code fix deployed.** Fix: remove FAQPage from Home.jsx React component entirely.

### 2. /blog/ 57 Days Stale (ACT-LI10-024)

Google last crawled `/blog/` on 22.03.26 — now 57 days stale. The re-crawl request sent at Run 13 (11.05.26) was NOT effective. This is the gateway page to 108 blog posts. A second re-crawl via Indexing API is needed, plus investigation into whether the page content has actually changed since March.

---

## P2 Finding

### 3. Bing Stale-Empty-Crawl — 5 Subpages (ACT-LI10-027)

Five URLs have DocumentSize=0 with IsPage=true in Bing: /seo-automation/, /website-translation/, /case-studies/, and 2 blog posts. The Run 13 SubmitUrlBatch worked for /blog/ (recovered to 55KB) but the other 5 remain empty. A second targeted SubmitUrlBatch is needed. Root cause is likely SPA architecture — Bingbot may not execute client-side JS.

---

## P3 Finding

### 4. IndexNow Key Not Deployed (ACT-LI10-028)

The `submit-bing-indexnow.js` script exists with key `40b3efc5ab8e4c0e9ca6163daca5d29e` but the key verification file is not deployed at the expected URL. IndexNow pings will fail with HTTP 422 until the key file is deployed.

---

## Bing vs Google Crawl Comparison

| Page | Google Crawled | Bing Crawled | Bing Size | Status |
|------|--------------|-------------|-----------|--------|
| / | 17.05.26 | 07.05.26 | 24,769 | Both healthy |
| /blog/ | 22.03.26 | 17.05.26 | 55,968 | **Bing leads** (recovered) |
| /seo-automation/ | 15.05.26 | 05.04.26 | 0 | Bing stale-empty |
| /website-translation/ | 15.05.26 | 08.05.26 | 0 | Bing stale-empty |
| /case-studies/ | 16.05.26 | 19.04.26 | 0 | Bing stale-empty |

Bing sitemaps: Both accepted (Success), 133 URLs discovered. Zero crawl issues. Zero impressions site-wide (authority problem).

---

## AI Citation Analysis

**Total AI citations: 2 sessions (+100% vs Run 13's 1)**

| AI System | Sessions | Landing Pages |
|-----------|----------|--------------|
| Perplexity | 2 | / (1), /website-translation/ (1) |
| ChatGPT | 0 | — |
| Copilot | 0 | — |
| Claude | 0 | — |
| Gemini | 0 | — |

**FIRST CITATION**: /website-translation/ received its first-ever Perplexity referral. Too early for aggressive action at 1 session — monitor.

**Citation Matrix (10 queries tested)**: AI Overview trigger rate 0/10. No AI citations on any tested query. The AEO battleground has not opened for LI10's target queries.

---

## Traffic Breakdown (Hostname-Filtered)

| Source | Sessions | Notes |
|--------|----------|-------|
| Direct | 153 | Primary channel |
| Google Organic | 13 | Slowly growing |
| Portal Referral | 9 | launchedin10-portal.pages.dev |
| Google CPC | 6 | Residual, 0 engagement |
| Bing Organic | 3 | Emerging |
| Facebook | 3 | Social |
| type19specialists.com | 3 | Cross-portfolio |
| Perplexity | 2 | AI referral — growing |
| spyhost.site | 1 | Spam (Tier C) |

---

## Bot Filtering

| Tier | Sessions | % |
|------|----------|---|
| A (Verified Human) | 83 | 34% |
| B (Grey Zone) | 30 | 12% |
| C (Bot/Spam) | 131 | 54% |
| **Total** | **244** | **100%** |

Bot inflation: 66% (prior: 63%). Stable within noise.

---

## Content Integrity

- **Body Fingerprint**: ALL PASS — unique titles/H1s on every page
- **Canonical**: ALL PASS — self-referencing
- **Brand Markers**: Present on all pages
- **Language**: EN-only, all pages lang="en", no contamination
- **Speakable DOM**: `.speakable-summary` class present on all pages (SSG-injected)
- **Price Snapshot**: Captured (first run with this data). Homepage JSON-LD: 6 prices. /seo-automation/ and /website-translation/ have HTML prices but no JSON-LD Offer schema.

---

## Schema Coverage

| Type | Coverage | Notes |
|------|----------|-------|
| Organization | 100% | Every page |
| WebSite+SearchAction | 100% | Every page |
| WebPage+Speakable | 100% | Every page, DOM class present |
| Article+BreadcrumbList | Blog posts | Correct |
| VideoObject | YouTube posts | Correct |
| Service+Offer | Homepage only | Missing on /seo-automation/, /website-translation/ |
| FAQPage | Homepage (PASS), /case-studies/ (BROKEN) | ACT-LI10-023 |
| data-ai-summary | 0% | Not implemented |
| HowTo | 0% | Not implemented |

---

## Pipeline Status

- **li10_posts**: 108 rows, latest 2026-03-20 (59 days stale)
- **orbit_3_flow**: 95 total, ALL processed, 0 queued
- **Content velocity**: ZERO for 59 days
- Pipeline is completely stalled — business decision required

---

## Ghost Index Report

| Query | Position | Impressions | Page |
|-------|---------|------------|------|
| managed server oder shared hosting | 1 | 12 | /dedicated-server-managed-hosting-vs-shared/ |
| google ads for solicitors | 2.4 | 5 | law.launchedin10.co.uk |
| solicitors google ads | 2 | 7 | law.launchedin10.co.uk |
| best affordable website design company | 4 | 1 | /affordable-website-designers-trusted-uk/ |
| cost to build small business website 2026 | 5 | 1 | /web-design-cost-2026-breakdown-small/ |
| website builders accessibility compliance | 5 | 3 | /accessibility-checker-website-essential/ |
| website design cost uk small business 2026 | 7.7 | 5 | /web-design-cost-2026-breakdown-small/ |

Queries at positions 1-10 with zero clicks. The law subdomain queries have Featured Snippet potential. The German query at pos 1 is a language mismatch — English page ranking for German query.

---

## Cross-Portfolio Equity

- **Existing**: type19specialists.com sending 3 referral sessions
- **Drafted**: LI10 /website-translation/ to cosmetics.eldris.ai, LI10 /seo-automation/ to responsible.eldris.ai
- No intent boundary violations

---

## Resolved Items

| ID | Description | Evidence |
|----|------------|---------|
| ACT-LI10-016 | /seo-automation/ Google re-crawl | Crawled 15.05.26 |
| ACT-LI10-018 | /website-translation/ regression | Crawled 15.05.26 |
| ACT-LI10-025 | Bing /blog/ recovery | Size=55,968, crawled 17.05.26 |
| ACT-LI10-026 | dateModified JSON-LD fix | Executed Run 13 |

---

## Action Items Summary

| ID | Priority | Description | Status |
|----|----------|-------------|--------|
| ACT-LI10-023 | P1 | FAQPage WRS duplicate on /case-studies/ — 5 audits open | OPEN |
| ACT-LI10-024 | P1 | /blog/ 57 days stale — re-crawl not effective | OPEN |
| ACT-LI10-027 | P2 | Bing SubmitUrlBatch for 5 stale-empty-crawl pages | NEW |
| ACT-LI10-028 | P3 | Deploy IndexNow key verification file | NEW |

---

## Observations (Not Action Items)

1. **Content pipeline stalled 59 days** — business decision, not technical fix
2. **First multi-page AI citation** — Perplexity on /website-translation/, monitor
3. **data-ai-summary at 0%** — worth implementing when content velocity resumes
4. **Blog post title "-interactive" suffix** — cosmetic artefact from Supabase field
5. **SPA architecture vs Bing** — root cause of stale-empty-crawl, structural investigation needed

---

## Next Audit

**Recommended**: 2026-06-01 (14 days)
**Verify**: ACT-LI10-023 code fix, /blog/ re-crawl, Bing cache population, content pipeline status
