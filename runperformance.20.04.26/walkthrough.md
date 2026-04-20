# LI10 DeepRank Audit #10 — 2026-04-20

## Verdict: PATIENCE PHASE — FIRST AI CITATION DETECTED, ALL PRIOR P2s RESOLVED

LaunchedIn10 continues in the patience phase, but this audit brings a significant milestone: **the first-ever AI citation**. A Perplexity referral session landed on the homepage — 1 session, 135.7s duration, engagement rate 1.0. This was zero across all engines in every prior audit.

The two surgical interventions from audit #9 (13.04.26) have both worked:
- **/website-translation/** has gone from "URL is unknown to Google" to **"Submitted and indexed"** (crawled 14.04.26). The in-content internal link fix (ACT-LI10-018, deployed 14.04.26) resolved this within 24 hours.
- **/seo-automation/** has been re-crawled by Google (14.04.26, was 21.02.26 — 52-day stale). Google now has the current SSR version with Service schema.

One persistent issue: /case-studies/ still shows **FAQPage duplicate ERROR** in GSC rich results, even after re-crawl on 17.04.26. Render_compare confirms SSR is clean (no FAQPage). This is a React SPA client-side routing issue — the homepage FAQPage schema persists in the DOM during SPA navigation.

### Key Metrics

| Metric | 13.04.26 | 20.04.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~300 | ~350 | +17% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GSC Unique Queries | ~80 | ~90 | +12.5% |
| GA4 On-Domain Sessions (90d) | ~230 | ~209 | -9% (within variance) |
| Tier A Human Sessions (90d) | ~120 | ~99 | -17% (within variance) |
| Bot Inflation | ~52% | ~53% | Stable |
| Published Posts (li10_posts) | 108 | 108 | Flat |
| AI Referral Sessions | 0 | **1 (Perplexity)** | **FIRST EVER** |
| AI Overview Triggers (10 queries) | 0/5 | 0/10 | Flat |
| Bing Homepage Size | 9,373 | 9,373 | Maintained |
| Bing Pages Discovered | 3 | 4 (+/case-studies/) | +1 |
| Schema Coverage (overall) | >90% | >90% | Maintained |
| Orbit3Flow Pending | 0 | 0 | Clear |
| Sitemap lastDownloaded | 03.04.26 | **17.04.26** | **REFRESHED** |
| Best GSC Position | 1 | 1 | Maintained |
| Position 1 Queries | 2 | 3 (+German query) | +1 |
| Homepage FAQ Rich Results | PASS | PASS | Maintained |
| /website-translation/ Index Status | UNKNOWN to Google | **INDEXED** | **RESOLVED** |
| /seo-automation/ Last Crawled | 21.02.26 (52d stale) | **14.04.26** | **RESOLVED** |

### Honest Assessment

This site needs one minor code fix and then patience:

1. **/case-studies/ FAQPage SPA leak** — the homepage FAQPage schema leaks to /case-studies/ (and likely all routes) via React SPA client-side navigation. GSC still reports "Duplicate field FAQPage" error on /case-studies/ even after 17.04.26 re-crawl. SSR is clean but Google's JavaScript renderer sees the leaked schema. This is an SPA architectural issue that requires ensuring JSON-LD script tags are removed from the DOM on route change, or scoping them to the specific route component.

2. **/website-translation/ not in Bing** — despite submissions on 08.04 and 14.04, Bing has never discovered this page. Resubmit. Bing index = ChatGPT retrieval pool.

Everything else is monitoring. The first Perplexity citation is a milestone but at 1 session it's noise-level. The AEO infrastructure is deployed and ready. 108 posts, 0 clicks, ~350 impressions, ~90 unique queries — pre-authority patience phase continues. Leading indicators positive: query count up 80% since audit #7 (50 to 90), 3 position-1 hits, sitemap now regularly downloaded.

### Technical Health

| Page | Index Status | Last Crawled | Rich Results | Bing Status | vs Prior |
|------|-------------|-------------|--------------|-------------|---------|
| / | Indexed | 17.04.26 | FAQ PASS | size=9,373 | Crawled 3 days ago |
| /blog/ | Indexed | 22.03.26 | — | discovered 12.04, size=0 | 29 days stale |
| /seo-automation/ | Indexed | **14.04.26** | — | discovered 05.04, size=0 | **RESOLVED** |
| /case-studies/ | Indexed | 17.04.26 | FAQ ERROR (SPA leak) | **NEW** discovered 19.04, size=0 | Bing +1 |
| /website-translation/ | **INDEXED** | **14.04.26** | — | never discovered | **RESOLVED** |

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Crawled | Bing Discovered | Bing Crawled | Bing Size | Winner |
|------|-------------|---------------|-----------------|-------------|-----------|--------|
| / | Indexed | 17.04.26 | 27.03.26 | 31.03.26 | 9,373 | Google (fresher) |
| /blog/ | Indexed | 22.03.26 | 12.04.26 | 12.04.26 | 0 | Google (indexed) |
| /seo-automation/ | Indexed | 14.04.26 | 05.04.26 | 05.04.26 | 0 | Google (indexed) |
| /case-studies/ | Indexed | 17.04.26 | 19.04.26 | 19.04.26 | 0 | Google (indexed) |
| /website-translation/ | Indexed | 14.04.26 | never | never | 0 | Google only |

### Sitemap Status

| Sitemap | URLs | Last Submitted | Last Downloaded | Indexed | Status |
|---------|------|---------------|-----------------|---------|--------|
| sitemap.xml | 117 web + 74 video | 14.04.26 | **17.04.26** | 0 | **REFRESHED** |
| sitemap-redirectfix.xml | 16 | 21.03.26 | 14.04.26 | 0 | Active |

### Schema Coverage

| Type | Prior (13.04) | Current (20.04) | Status |
|------|--------------|-----------------|--------|
| Organization | 100% (SSR) | 100% (SSR) | Maintained |
| WebSite+SearchAction | 100% (SSR) | 100% (SSR) | Maintained |
| WebPage+Speakable | 100% | 100% | Maintained |
| Article | 100% blog | 100% blog | Maintained |
| BreadcrumbList | 100% blog | 100% blog | Maintained |
| VideoObject | 74 posts | 74 posts | Maintained |
| FAQPage | Homepage PASS | Homepage PASS | Maintained |
| Service | /seo-automation/ + /website-translation/ | Same | Maintained |
| data-ai-summary | Hero.jsx | Hero.jsx | Maintained |

### AEO Status

- **AI Referral Sessions (90d): 1 (Perplexity) — FIRST EVER CITATION**
  - Source: perplexity.ai / referral
  - Landing page: /
  - Engagement: 1.0 rate, 135.7s duration (genuine human visit)
  - ChatGPT: 0 | Copilot: 0 | Gemini: 0 | Claude: 0
- AI Overview Triggers: 0/10 queries tested (UK web design queries do NOT trigger AI Overviews)
- Citation Matrix: No Google AI Overviews trigger for target queries. Perplexity citation confirms homepage is in Perplexity's retrieval pool.
- Bing/ChatGPT pathway: Homepage in Bing index (size=9,373). Other pages discovered but size=0.
- AEO Infrastructure: Fully deployed and maintained.

### Content Integrity (Step 5.05)

| Page | Title Unique | H1 Unique | Canonical Correct | Brand Present | Prices |
|------|-------------|-----------|-------------------|---------------|--------|
| / | Yes | Yes | Yes | Yes | GBP 2, 5, 5000 |
| /seo-automation/ | Yes | Yes | Yes | Yes | GBP 50, 100, 99.95, 149.95, 195.00 |
| /website-translation/ | Yes | Yes | Yes | Yes | GBP 29.95, 49.95, 79.95, 129.95 |
| /case-studies/ | Yes | Yes | Yes | Yes | None (correct) |
| /blog/ | Yes | Yes | Yes | Yes | None (correct) |

No 200-with-homepage-content issues. No JSON-LD price mismatches (Service schema, no Offer/Product). Price snapshot captured as baseline.

### GSC Near-Ranking Queries

| Query | Imp | Position | Page | Country | vs Prior |
|-------|-----|----------|------|---------|----------|
| managed server oder shared hosting (DE) | 8 | **1.0** | /dedicated-server-managed-hosting-vs-shared/ | DEU | **NEW pos 1** |
| where can i get a website accessibility scan | 1 | 1.0 | /accessibility-checker-website-essential/ | GBR | Maintained |
| which website accessibility checkers WCAG compliant | 1 | 1.0 | /accessibility-checker-website-essential/ | USA | Maintained |
| is managed dedicated server worth it | 2 | 4.0 | /dedicated-server-managed-hosting-worth/ | USA | Maintained |
| cost to build small business website 2026 | 1 | 5.0 | /web-design-cost-2026-breakdown-small/ | GBR | Maintained |
| what should i look for choosing inbound marketing firms | 1 | 5.0 | /business-web-design-agency-selection-2026 | GBR | Maintained |
| website design cost uk small business 2026 | 4 | 7.7 | /web-design-cost-2026-breakdown-small/ | USA+GBR | Stable |
| construction company website design trends 2026 | 7 | 7-10 | /why-website-design-for-construction | Multi | Maintained |
| digital agency pricing models 2026 | 4 | 8.25 | /business-web-design-pricing-transparent-cost/ | GBR | Maintained |
| website construction cost | 4 | 10.75 | /website-construction-cost-2026-uk-breakdown/ | GBR | Maintained |

### Reconciliation

GSC clicks (90d): 0 | GA4 organic sessions (on-domain): 24 | Delta: 24 (acceptable at zero-click volumes)

### Bot Filtering

| Tier | Sessions | % |
|------|----------|---|
| Total (all hostnames) | ~234 | 100% |
| On-domain | ~209 | 89.3% |
| Tier A (human, engaged) | ~99 | 42.3% |
| Tier B (grey) | ~85 | 36.3% |
| Tier C (bot/spam) | ~25 | 10.7% |
| Off-domain | ~25 | 10.7% |

Bot inflation: ~53% (stable)

### Pipeline

| Table | Count | Delta |
|-------|-------|-------|
| li10_posts | 108 | Flat |
| orbit_3_flow (processed) | 95 | Flat |
| orbit_3_flow (pending) | 0 | Clear |
| orbit_3_flow (stalled >14d) | 0 | Clear |

### CRO

N/A — no page meets >100 Tier A sessions threshold.

### Prior Audit Actions — Resolution Status

| ID | Description | Prior Status | Current Status | Evidence |
|----|------------|-------------|----------------|----------|
| ACT-LI10-018 | /website-translation/ internal link fix | completed (14.04) | **CONFIRMED** | GSC: indexed, crawled 14.04.26 |
| ACT-LI10-016 | /seo-automation/ re-crawl | completed (14.04) | **CONFIRMED** | GSC: crawled 14.04.26 (was 21.02.26) |
| ACT-LI10-019 | Sitemap + Bing resubmissions | completed (14.04) | **CONFIRMED** | lastDownloaded 17.04.26, Bing /case-studies/ discovered |
| ACT-LI10-015 | FAQPage duplicate fix | completed (08.04) | **PARTIALLY RESOLVED** | Homepage PASS. /case-studies/ still shows error (SPA leak). |
| ACT-LI10-013 | Monitor near-ranking queries | open (P3) | POSITIVE | 3 pos 1, 90 queries |
| ACT-LI10-014 | Monitor GA4 conversions | open (P3) | Carry forward | 23 days, 0 conversions |

### Cross-Portfolio Equity

Intent boundary: LI10 = web design + SEO automation + translation. No overlap.

Draft deep-links (carried forward):
1. Blog post on e-commerce -> responsible.eldris.ai (EU RP for sellers)
2. Blog post on GDPR/privacy -> epr.eldris.ai (EPR/WEEE for electronics)

### Next Audit

2026-04-27 — verify /case-studies/ FAQPage fix, /website-translation/ Bing discovery, Perplexity citation trend, /blog/ crawl freshness, conversion events baseline (30 days on 28.04).
