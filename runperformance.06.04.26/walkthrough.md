# LI10 DeepRank Audit #8 — 2026-04-06

## Verdict: PATIENCE PHASE CONTINUES — ONE CODE FIX REQUIRED, BING BREAKTHROUGH

LaunchedIn10 is in the same patience phase as the prior audit, with one important difference: the Bing homepage is now fully crawled (size=9,373) — the SSR deployment on 28.03.26 resolved the cross-portfolio Bing rendering issue for this property's homepage. This unlocks the ChatGPT/Copilot citation pathway for the homepage for the first time.

However, a systemic duplicate FAQPage schema error affects EVERY page on the site. Root cause identified: `Home.jsx` renders FAQPage via React Helmet, AND `generate-static.js` injects FAQPage via SSG. During JavaScript hydration, Google's renderer sees both — producing a "Duplicate field FAQPage" ERROR. This leaks beyond the homepage: `/case-studies/` (re-crawled 04.04.26) now shows 3 duplicate FAQPage items. The Home component's schema briefly loads during SPA initialisation before React Router resolves to the correct route.

The fix is surgical: remove the FAQPage entry from `homeSchema` in `Home.jsx`. The SSG already handles it correctly.

### Key Metrics

| Metric | 30.03.26 | 06.04.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~140 | ~200 | +43% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GSC Unique Queries | ~40 | ~50 | +25% |
| GA4 On-Domain Sessions (90d) | 732* | 241 | See note |
| Tier A Human Sessions (90d) | ~155 | ~120 | -23% |
| Bot Inflation | 82.1% | ~50% | Methodology note |
| Published Posts (li10_posts) | 108 | 108 | Flat |
| AI Referral Sessions | 0 | 0 | Flat |
| Bing Homepage Size | 0 | 9,373 | **BREAKTHROUGH** |
| Bing Pages Discovered | 1 (HP only) | 2 (HP + /seo-automation/) | +1 |
| Schema Coverage (overall) | >90% | >90% | Maintained |
| Orbit3Flow Pending | 0 | 0 | Clear |
| Sitemap lastDownloaded | 21.03.26 | 03.04.26 | **RESOLVED** |
| Best GSC Position | 4 | 1 | **FIRST P1 HIT** |

*Prior audit session count included page-level overcounting. This audit uses landing-page-level unique sessions from traffic sources data.

### Honest Assessment

This site needs ONE code fix (remove FAQPage from Home.jsx) and then patience. Everything else is monitoring.

The duplicate FAQPage schema error is the most impactful item because it blocks FAQ rich results on the homepage (the only page that should have them) and creates schema errors on every other page. Google explicitly penalises structured data trust when errors are sitewide. The fix is a 2-line code change.

Beyond that fix, the trajectory is positive: GSC impressions up 43%, unique query count up 25%, first position 1 hit ("accessibility checkers WCAG"), Bing homepage now fully crawled with SSR content. 108 posts, 0 clicks, 0 AI citations — this is pre-authority. The content library is large enough. The AEO infrastructure is comprehensive. Time is the intervention.

### Technical Health

| Page | Index Status | Last Crawled | Rich Results | Bing Status | Notes |
|------|-------------|-------------|--------------|-------------|-------|
| / | Indexed | 02.04.26 | FAQ ERROR (duplicate) | size=9,373 (crawled 31.03) | P1: Dual FAQPage (SSG + React Helmet) |
| /blog/ | Indexed | — | — | never discovered | — |
| /seo-automation/ | Indexed | 21.02.26 | — | discovered 05.04, size=0 | P2: 44-day stale crawl |
| /case-studies/ | Indexed | 04.04.26 | FAQ ERROR (3 duplicates) | never discovered | FAQPage leaking from Home.jsx |
| /website-translation/ | Discovered, not indexed | — | — | never discovered | P2: progressing, needs time |

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Crawled | Bing Discovered | Bing Crawled | Bing Size | Winner |
|------|-------------|---------------|-----------------|-------------|-----------|--------|
| / | Indexed | 02.04.26 | 27.03.26 | 31.03.26 | 9,373 | Google (indexed first) |
| /blog/ | Indexed | recent | never | never | 0 | Google |
| /seo-automation/ | Indexed | 21.02.26 | 05.04.26 | 05.04.26 | 0 | Google (indexed) / Bing (discovered) |
| /case-studies/ | Indexed | 04.04.26 | never | never | 0 | Google |
| /website-translation/ | Discovered | never | never | never | 0 | Neither |

### Sitemap Status

| Sitemap | URLs | Last Submitted | Last Downloaded | Indexed | Status |
|---------|------|---------------|-----------------|---------|--------|
| sitemap.xml | 117 web + 74 video | 31.03.26 | 03.04.26 | 0 | RESOLVED — was stale at 21.03.26 |
| sitemap-redirectfix.xml | 16 | 21.03.26 | 05.04.26 | 0 | Active, legacy redirects |

### Schema Coverage

| Type | Prior (30.03) | Current (06.04) | Status |
|------|--------------|-----------------|--------|
| Organization | 100% (SSR) | 100% (SSR) | Maintained |
| WebSite+SearchAction | 100% (SSR) | 100% (SSR) | Maintained |
| WebPage+Speakable | 100% | 100% | Maintained |
| Article | 100% blog | 100% blog | Maintained |
| BreadcrumbList | 100% blog | 100% blog | Maintained |
| VideoObject | 74 posts | 74 posts | Maintained |
| FAQPage | Homepage (SSG) | Homepage (SSG) — DUPLICATE via Helmet | REGRESSION |
| Service | Home + commercial (SSR) | Home + commercial (SSR) | Maintained |
| data-ai-summary | Hero.jsx | Hero.jsx | Maintained |

### AEO Status

- AI Referral Sessions (90d): 0 (all engines — zero)
- AI Overview Triggers: 0/5 queries tested — UK web design commercial queries consistently do NOT trigger AI Overviews
- Citation Matrix: Not applicable — zero citations, zero AI Overview triggers
- Bing/ChatGPT pathway: Homepage now in Bing index (size=9,373). First time ChatGPT retrieval is theoretically possible for LI10 homepage content.
- AEO Infrastructure: Fully deployed and maintained. Ready for citations once domain authority builds and Bing indexes more pages.

### GSC Near-Ranking Queries

| Query | Imp | Position | Page | Country |
|-------|-----|----------|------|---------|
| which website accessibility checkers WCAG compliant | 1 | 1.0 | /accessibility-checker-website-essential/ | USA |
| is managed dedicated server worth it | 2 | 4.0 | /dedicated-server-managed-hosting-worth/ | USA |
| what should i look for choosing inbound marketing firms | 1 | 5.0 | /business-web-design-agency-selection-2026 | GBR |
| launched in | 1 | 7.0 | / | GBR |
| digital agency pricing models 2026 | 4 | 8.25 | /business-web-design-pricing-transparent-cost/ | GBR |
| construction company website design trends 2026 | 4 | 7-10 | /why-website-design-for-construction | BRA/ESP/USA |
| aws database services overview 2026 | 1 | 10.0 | /aws-database-migration-service-2026/ | ESP |
| website construction cost | 4 | 10.75 | /website-construction-cost-2026-uk-breakdown/ | GBR |
| cost of web development | 1 | 11.0 | /web-development-cost-small-businesses-2026/ | GBR |

First-ever position 1 hit for "which website accessibility checkers can make my website wcag compliant" (USA, 1 impression).

### Ghost Equity (pos 50+)

| Query | Imp | Position | Risk |
|-------|-----|----------|------|
| affordable website designers (cluster) | 26+ | 85-97 | Low — too deep, no movement |
| managed dedicated hosting (variants) | 33+ | 36-67 | Medium — building slowly |
| seo foundations | 22 | 74 | Low — category page |
| lead generation website design uk | 5 | 49.6 | Low — new appearance |

### Reconciliation

GSC clicks (90d): 0 | GA4 organic sessions (on-domain): 40 | Delta: 40 (acceptable at low volumes)

### Bot Filtering

| Tier | Sessions | % |
|------|----------|---|
| Total (all hostnames) | ~264 | 100% |
| On-domain | 241 | 91.3% |
| Tier A (human, engaged) | ~120 | 45.5% |
| Tier B (grey — non-engaged direct/CPC) | ~89 | 33.7% |
| Tier C (bot/spam/dev — localhost, pages.dev, spyhost) | ~55 | 20.8% |

Bot inflation: ~54.5% (Tier B+C / Total)

### Pipeline

| Table | Count | Delta |
|-------|-------|-------|
| li10_posts | 108 | Flat |
| orbit_3_flow (processed) | 95 | Flat |
| orbit_3_flow (pending) | 0 | Clear |
| orbit_3_flow (stalled >14d) | 0 | Clear |

### CRO

N/A — no page meets >100 Tier A sessions threshold. GA4 conversion events deployed 28.03.26 — 9 days of data, 0 conversions.

### Prior Audit Actions — Resolution Status

| ID | Description | Prior Status | Current Status | Evidence |
|----|------------|-------------|----------------|----------|
| ACT-LI10-009 | /website-translation/ indexing | completed (31.03) | RE-OPENED P2 | GSC: "Discovered - currently not indexed" |
| ACT-LI10-010 | Sitemap resubmission | completed (31.03) | CONFIRMED RESOLVED | lastDownloaded 03.04.26 |
| ACT-LI10-011 | /case-studies/ FAQPage error | completed (31.03) | SUPERSEDED by ACT-LI10-015 | Root cause is React Helmet leak, not SSG |
| ACT-LI10-012 | Bing size=0 | completed (31.03) | PARTIALLY RESOLVED | Homepage size=9,373 (resolved). Others still 0. |
| ACT-LI10-013 | Monitor near-ranking queries | open (P3) | Carry forward | Position 1 hit on accessibility query |
| ACT-LI10-014 | Monitor GA4 conversion events | open (P3) | Carry forward | 9 days, 0 conversions |

### Cross-Portfolio Equity

Intent boundary: LI10 = web design + SEO automation + translation. No overlap with EURP/COS/EPR/TSI.

Draft deep-links:
1. Blog post on e-commerce websites -> responsible.eldris.ai (EU RP for sellers expanding to EU)
2. Blog post on GDPR/privacy compliance -> epr.eldris.ai (EPR/WEEE for electronics retailers)

### Next Audit

2026-04-13 (7 days) — verify ACT-LI10-015 deployed, /website-translation/ indexing progress, Bing discovery progress, /seo-automation/ re-crawl.
