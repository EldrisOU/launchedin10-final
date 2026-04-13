# LI10 DeepRank Audit #9 — 2026-04-13

## Verdict: PATIENCE PHASE CONTINUES — FAQPage FIX CONFIRMED, /WEBSITE-TRANSLATION/ REGRESSED

LaunchedIn10 remains in the patience phase. The headline from this audit is twofold:

**Good news**: The P1 FAQPage duplicate fix (ACT-LI10-015) is confirmed working. GSC URL Inspection on the homepage shows FAQ rich results: **PASS** (crawled 08.04.26). render_compare on /case-studies/ confirms SSR has NO FAQPage — the stale duplicate errors in GSC are cached from the prior crawl evaluation and will age out.

**Bad news**: /website-translation/ has **regressed** from "Discovered - currently not indexed" (06.04.26) to "URL is unknown to Google" (13.04.26). Google has lost track of this page entirely. render_compare confirms the SSR is correct (15KB, Service schema, canonical, H1). The cause is likely insufficient internal link signals — the only referring URL was a 301 redirect page. The nav link alone isn't enough for a low-authority domain.

### Key Metrics

| Metric | 06.04.26 | 13.04.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~200 | ~300 | +50% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GSC Unique Queries | ~50 | ~80 | +60% |
| GA4 On-Domain Sessions (90d) | 241 | ~230 | Stable |
| Tier A Human Sessions (90d) | ~120 | ~120 | Stable |
| Bot Inflation | ~54.5% | ~52% | Stable |
| Published Posts (li10_posts) | 108 | 108 | Flat |
| AI Referral Sessions | 0 | 0 | Flat |
| AI Overview Triggers (5 queries) | 0/5 | 0/5 | Flat |
| Bing Homepage Size | 9,373 | 9,373 | Maintained |
| Bing Pages Discovered | 2 | 3 (+/blog/) | +1 |
| Schema Coverage (overall) | >90% | >90% | Maintained |
| Orbit3Flow Pending | 0 | 0 | Clear |
| Sitemap lastDownloaded | 03.04.26 | 03.04.26 | Stale (10 days) |
| Best GSC Position | 1 | 1 | Maintained |
| Position 1 Queries | 1 | 2 | +1 NEW |
| Homepage FAQ Rich Results | FAIL (duplicate) | PASS | **FIXED** |

### Honest Assessment

This site needs two surgical interventions and then patience:

1. **/website-translation/ has regressed to "Unknown to Google"** — add an in-content internal link from the homepage body to strengthen crawl signals. This is the only commercial page with zero Google awareness.

2. **/seo-automation/ is 52 days stale** — Google last crawled it on 21.02.26. The SSR deployment with Service schema happened on 28.03.26. Google is evaluating a version that's 6 weeks outdated. Manual re-crawl request via GSC web UI.

Everything else is monitoring. The FAQPage fix worked. AI Overviews do not trigger for UK web design queries (tested 5 queries, confirmed 0 triggers). The AEO infrastructure is deployed and waiting. 108 posts, 0 clicks, ~300 impressions — this is pre-authority. Time is the intervention.

### Technical Health

| Page | Index Status | Last Crawled | Rich Results | Bing Status | Notes |
|------|-------------|-------------|--------------|-------------|-------|
| / | Indexed | 08.04.26 | FAQ PASS | size=9,373 | FAQPage fix confirmed working |
| /blog/ | Indexed | 22.03.26 | — | discovered 12.04, size=0 | NEW Bing discovery |
| /seo-automation/ | Indexed | 21.02.26 | — | discovered 05.04, size=0 | P2: 52-day stale crawl |
| /case-studies/ | Indexed | 12.04.26 | FAQPage ERROR (stale cache) | never discovered | SSR clean (no FAQPage) |
| /website-translation/ | UNKNOWN to Google | never | — | never discovered | P2: REGRESSED from "Discovered" |

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Crawled | Bing Discovered | Bing Crawled | Bing Size | Winner |
|------|-------------|---------------|-----------------|-------------|-----------|--------|
| / | Indexed | 08.04.26 | 27.03.26 | 31.03.26 | 9,373 | Google |
| /blog/ | Indexed | 22.03.26 | 12.04.26 | 12.04.26 | 0 | Google (indexed) / Bing (discovered only) |
| /seo-automation/ | Indexed | 21.02.26 | 05.04.26 | 05.04.26 | 0 | Google (indexed) / Bing (discovered only) |
| /case-studies/ | Indexed | 12.04.26 | never | never | 0 | Google |
| /website-translation/ | UNKNOWN | never | never | never | 0 | Neither |

**Bing progress**: /blog/ newly discovered since last audit (12.04.26). The 08.04.26 Bing SubmitUrlBatch resulted in /blog/ being discovered. /case-studies/ and /website-translation/ still undiscovered by Bing despite submission — resubmit.

### Sitemap Status

| Sitemap | URLs | Last Submitted | Last Downloaded | Indexed | Status |
|---------|------|---------------|-----------------|---------|--------|
| sitemap.xml | 117 web + 74 video | 31.03.26 | 03.04.26 | 0 | Last downloaded pre-code-change |
| sitemap-redirectfix.xml | 16 | 21.03.26 | 05.04.26 | 0 | Active |

### Schema Coverage

| Type | Prior (06.04) | Current (13.04) | Status |
|------|--------------|-----------------|--------|
| Organization | 100% (SSR) | 100% (SSR) | Maintained |
| WebSite+SearchAction | 100% (SSR) | 100% (SSR) | Maintained |
| WebPage+Speakable | 100% | 100% | Maintained |
| Article | 100% blog | 100% blog | Maintained |
| BreadcrumbList | 100% blog | 100% blog | Maintained |
| VideoObject | 74 posts | 74 posts | Maintained |
| FAQPage | Homepage (SSG) — DUPLICATE | Homepage (SSG) — FIXED | **RESOLVED** |
| Service | /seo-automation/ + /website-translation/ | Same | Maintained |
| data-ai-summary | Hero.jsx | Hero.jsx | Maintained |

### AEO Status

- AI Referral Sessions (90d): 0 (all engines — zero)
- AI Overview Triggers: 0/5 queries tested (UK web design queries do NOT trigger AI Overviews)
- Citation Matrix: Not applicable — zero AI citations, zero AI Overview triggers
- Bing/ChatGPT pathway: Homepage in Bing index. /blog/ newly discovered but size=0.
- AEO Infrastructure: Fully deployed and maintained. Ready for citations once authority builds.

### GSC Near-Ranking Queries (Improving)

| Query | Imp | Position | Page | Country | vs Prior |
|-------|-----|----------|------|---------|----------|
| where can i get a website accessibility scan | 1 | 1.0 | /accessibility-checker-website-essential/ | GBR | **NEW pos 1** |
| which website accessibility checkers WCAG compliant | 1 | 1.0 | /accessibility-checker-website-essential/ | USA | Maintained |
| is managed dedicated server worth it | 2 | 4.0 | /dedicated-server-managed-hosting-worth/ | USA | Maintained |
| cost to build small business website 2026 | 1 | 5.0 | /web-design-cost-2026-breakdown-small/ | GBR | **NEW top 5** |
| what should i look for choosing inbound marketing firms | 1 | 5.0 | /business-web-design-agency-selection-2026 | GBR | Maintained |
| website design cost uk small business 2026 | 2 | 6.5 | /web-design-cost-2026-breakdown-small/ | USA | **NEW near top 10** |
| construction company website design trends 2026 | 6 | 7-10 | /why-website-design-for-construction | Multi | Maintained |
| digital agency pricing models 2026 | 4 | 8.25 | /business-web-design-pricing-transparent-cost/ | GBR | Maintained |
| website construction cost | 4 | 10.75 | /website-construction-cost-2026-uk-breakdown/ | GBR | Maintained |
| cost of web development | 1 | 11.0 | /web-development-cost-small-businesses-2026/ | GBR | **NEW** |

**Positive trajectory**: 2 position 1 hits (one new), 3 new near-top-10 entries. Query count up 60%.

### Ghost Equity (pos 50+)

| Query | Imp | Position | Risk |
|-------|-----|----------|------|
| affordable website designers (cluster) | 30+ | 85-97 | Low — too deep, no movement |
| managed dedicated hosting (cluster) | 20+ | 36-67 | Medium — building slowly |
| seo foundations | 35 | 73 | Low — category page, high impressions |
| construction websites 2026 | 19 | 19-31 | Medium — approaching strike range |

### Reconciliation

GSC clicks (90d): 0 | GA4 organic sessions (on-domain): 29 | Delta: 29 (acceptable at zero-click volumes)

### Bot Filtering

| Tier | Sessions | % |
|------|----------|---|
| Total (all hostnames) | ~252 | 100% |
| On-domain | ~230 | 91.3% |
| Tier A (human, engaged) | ~120 | 47.6% |
| Tier B (grey — non-engaged direct/CPC) | ~85 | 33.7% |
| Tier C (bot/spam — pages.dev, localhost, spyhost) | ~47 | 18.7% |

Bot inflation: ~52% (stable from 54.5%)

### Pipeline

| Table | Count | Delta |
|-------|-------|-------|
| li10_posts | 108 | Flat |
| orbit_3_flow (processed) | 95 | Flat |
| orbit_3_flow (pending) | 0 | Clear |
| orbit_3_flow (stalled >14d) | 0 | Clear |

### CRO

N/A — no page meets >100 Tier A sessions threshold. Conversion events deployed 28.03.26 — 16 days of data, 0 conversions.

### Prior Audit Actions — Resolution Status

| ID | Description | Prior Status | Current Status | Evidence |
|----|------------|-------------|----------------|----------|
| ACT-LI10-015 | FAQPage duplicate fix | completed (08.04) | **CONFIRMED** | GSC 13.04.26: homepage FAQ PASS. render_compare: /case-studies/ 0x FAQPage in SSR. |
| ACT-LI10-017 | Bing URL submissions | completed (08.04) | **PARTIALLY CONFIRMED** | /blog/ discovered 12.04.26. /case-studies/ + /website-translation/ still undiscovered. |
| ACT-LI10-016 | /seo-automation/ re-crawl | open (P2) | **STILL OPEN** | GSC inspect: last crawled 21.02.26 (52 days). Requires manual GSC UI action. |
| ACT-LI10-009 | /website-translation/ indexing | open (P2) | **REGRESSED** | GSC: "URL is unknown to Google" (was "Discovered" on 06.04.26). |
| ACT-LI10-013 | Monitor near-ranking queries | open (P3) | **POSITIVE** | 2 pos 1 hits, 3 new near-top-10 entries. |
| ACT-LI10-014 | Monitor GA4 conversions | open (P3) | Carry forward | 16 days, 0 conversions. Need 30 days baseline. |

### Cross-Portfolio Equity

Intent boundary: LI10 = web design + SEO automation + translation. No overlap with EURP/COS/EPR/TSI.

Draft deep-links (carried forward):
1. Blog post on e-commerce websites -> responsible.eldris.ai (EU RP for sellers expanding to EU)
2. Blog post on GDPR/privacy compliance -> epr.eldris.ai (EPR/WEEE for electronics retailers)

### Next Audit

2026-04-20 (7 days) — verify /website-translation/ indexing progress after internal link addition, /seo-automation/ re-crawl status, Bing /blog/ size>0 progress.
