# RunPerformance Audit — launchedin10.co.uk

**Run 15 | 25.05.26 | Protocol: DeepRank v3.0**
**Previous Audit**: Run 14, 18.05.26

---

## Honest Assessment

LaunchedIn10 continues its slow, steady growth trajectory without intervention. GSC impressions up 22% (700 to 852), queries at position 1-10 nearly tripled (15 to 41), and Google is now crawling all commercial pages within days rather than weeks. The /blog/ stale-crawl crisis from Run 14 is resolved (re-crawled 22.05.26). Bing /case-studies/ recovered from stale-empty to healthy (DocSize=15,539).

The FAQPage duplicate bug (ACT-LI10-023) is now open across **7 consecutive audits (49 days)** with zero code fix deployed. This remains the only genuine technical issue warranting a code change. Everything else is time and content velocity -- neither of which this audit can provide.

Content pipeline: 66 days stalled. Zero new posts since 20.03.26. The site is growing on the strength of existing content alone.

---

## Key Metrics Table

| Metric | Run 14 (18.05) | Run 15 (25.05) | Delta |
|--------|---------------|----------------|-------|
| GSC Impressions (90d) | ~700 | 852 | +22% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| Queries at Position 1-10 | 15 | 41 | +173% |
| Unique Queries | ~120 | 155 | +29% |
| Tier A Sessions | 83 | ~80 | -4% (noise) |
| Bot Inflation | 66% | ~66% | Flat |
| Google Organic Sessions | 13 | 12 | -1 (noise) |
| Bing Organic Sessions | 3 | 4 | +1 |
| AI Referral Sessions | 2 (Perplexity) | 1 (Perplexity) | -1 (window shift) |
| Published Posts | 108 | 108 | Flat (66 days stale) |
| orbit_3_flow Queued | 0 | 0 | Flat |
| Conversions | 0 | 0 | Flat |
| Sitemap URLs | 113 | 113 | Flat |

---

## Data Acquisition Summary

| Source | Status | Notes |
|--------|--------|-------|
| GSC Search Analytics (90d) | Complete | 233 rows, 155 unique queries, 852 impressions, 0 clicks |
| GA4 Page Engagement (90d) | Complete | ~233 on-domain sessions across 26 pages |
| GA4 Traffic Sources (90d) | Complete | Hostname-filtered. 1 Perplexity session. |
| GA4 Campaigns | Complete | CPC residual: 6 sessions, 0 engagement |
| GSC URL Inspections | Complete | 6 pages inspected, all indexed |
| Sitemaps | Complete | 113 URLs. Main sitemap last downloaded 17.04.26 by Google. |
| Bing WMT (li-10-bing-aeo-protocol) | Complete | Blocks A-D on 7 URLs |
| PageSpeed | Rate-limited (429) | Quota exhausted -- skipped this run |

---

## P1 Finding

### 1. FAQPage WRS Duplicate -- 7 Audits Open (ACT-LI10-023)

GSC Rich Results on `/case-studies/` still returns ERROR: 'Duplicate field FAQPage' (3 instances). Home.jsx injects FAQPage during SPA hydration, conflicting with SSG-injected FAQPage from generate-static.js. This has been open since Run 10 (06.04.26) -- **49 days, 7 audits, zero code fix deployed.** FAQ rich results blocked on the highest-engagement commercial page (0.636 engagement rate). Fix: remove FAQPage from Home.jsx.

---

## P2 Finding

### 2. Bing Stale-Empty-Crawl -- 3 Subpages Remaining (ACT-LI10-027, updated)

/case-studies/ has RECOVERED (DocSize=15,539, crawled 24.05.26). Reduced from 5 to 3 stale-empty:
- `/seo-automation/` -- DocSize=0, last crawled 05.04.26 (50 days stale)
- `/website-translation/` -- DocSize=0, last crawled 08.05.26 (17 days stale)
- `/blog/.../accessibility-checker-website-essential/` -- DocSize=0, last crawled 01.05.26 (24 days stale)
- `/blog/.../web-content-accessibility-guidelines-11-key/` -- Never discovered by Bing

Practical impact limited: Bing has zero impressions/clicks site-wide. But DocSize=0 means pages are unavailable to ChatGPT/Copilot.

---

## Resolved Items (Since Run 14)

| ID | Resolution | Evidence |
|----|-----------|---------|
| ACT-LI10-024 | /blog/ Google re-crawl -- RESOLVED | lastCrawlTime now 22.05.26 (was 22.03.26, 57 days stale) |
| ACT-LI10-028 | IndexNow key deployment -- RESOLVED | Key file returns HTTP 200 at live URL. Prior audit incorrect. |
| ACT-LI10-027 (partial) | /case-studies/ Bing recovery | DocSize=15,539, crawled 24.05.26 (was DocSize=0) |

---

## Google URL Inspections

| Page | Verdict | Last Crawled | Rich Results | Delta vs Run 14 |
|------|---------|-------------|-------------|-----------------|
| `/` | PASS | 21.05.26 | FAQ: PASS | +4 days fresher |
| `/blog/` | PASS | **22.05.26** | N/A | **RESOLVED -- was 22.03.26 (57d stale)** |
| `/case-studies/` | PASS | 23.05.26 | **FAQ: FAIL (3x duplicate)** | +7 days fresher, bug persists |
| `/seo-automation/` | PASS | 15.05.26 | N/A | Same |
| `/website-translation/` | PASS | 18.05.26 | N/A | +3 days fresher |

---

## Bing vs Google Crawl Comparison

| Page | Google Crawled | Bing Crawled | Bing Size | Status | Delta |
|------|--------------|-------------|-----------|--------|-------|
| `/` | 21.05.26 | 25.05.26 | 24,882 | Both healthy | Bing crawled today |
| `/blog/` | 22.05.26 | 17.05.26 | 55,968 | Both healthy | Google RECOVERED |
| `/seo-automation/` | 15.05.26 | 05.04.26 | 0 | Bing stale-empty | Unchanged |
| `/website-translation/` | 18.05.26 | 08.05.26 | 0 | Bing stale-empty | Unchanged |
| `/case-studies/` | 23.05.26 | 24.05.26 | 15,539 | Both healthy | **Bing RECOVERED** |

Bing three-metric model:
- Index status: All 7 URLs IsPage=true
- Search performance: Zero impressions/clicks site-wide (authority problem)
- Sitemap processing: Both feeds Status=Success, 133 URLs discovered

---

## AI Citation Analysis

**Total AI citations: 1 session (Perplexity on homepage)**

Citation Matrix (10 queries tested): AI Overview trigger rate 0/10. No competitor AI citations. One SERP ranking: "bespoke web design 10 days" at position 7.

---

## Traffic Breakdown (Hostname-Filtered)

| Source | Sessions | Notes |
|--------|----------|-------|
| Direct | ~162 | Primary channel |
| Google Organic | 12 | Steady |
| Portal Referral | 9 | launchedin10-portal.pages.dev |
| Google CPC | 6 | Residual, 0 engagement (Tier C) |
| Bing Organic | 4 | +1 vs prior |
| Facebook | 3 | Social |
| type19specialists.com | 3 | Cross-portfolio |
| Perplexity | 1 | AI referral |
| spyhost.site | 1 | Spam (Tier C) |

---

## Content Integrity (Step 5.05)

- Body Fingerprint: ALL PASS -- unique title/H1/canonical per page
- Price Snapshot: Unchanged from Run 14. /seo-automation/ and /website-translation/ still missing JSON-LD pricing.
- Speakable DOM: Present on all 4 commercial pages
- Language: EN-only, all pages lang="en", zero contamination

---

## Pipeline Status (Step 7)

- li10_posts: 108 rows, latest 2026-03-20 (66 days stale)
- orbit_3_flow: 95 total, ALL processed, 0 queued
- Pipeline completely stalled -- business decision required

---

## GSC Highlight: Law Subdomain

law.launchedin10.co.uk is accumulating serious impression mass: 147 impressions across solicitor/Google Ads queries at positions 4-7. Queries include "solicitors google ads" (pos 4.9, 21 impr), "google ads management tow law" (pos 4.2, 17 impr), "google ads for solicitors" (pos 6.0, 17 impr). First click is within reach.

---

## Action Items Summary

| ID | Priority | Description | Status |
|----|----------|-------------|--------|
| ACT-LI10-023 | P1 | FAQPage WRS duplicate on /case-studies/ -- 7 audits open | OPEN |
| ACT-LI10-027 | P2 | Bing SubmitUrlBatch for 3+1 remaining stale-empty pages | OPEN (updated) |

---

## Next Audit

**Recommended**: 2026-06-08 (14 days)
**Verify**: ACT-LI10-023 code fix, Bing stale-empty status, content pipeline, law subdomain first click
