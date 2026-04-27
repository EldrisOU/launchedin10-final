# LI10 DeepRank Audit #11 — 2026-04-27

## Verdict: PATIENCE PHASE CONTINUES — FAQPage FIX DEPLOYED BUT NOT YET REFLECTED IN GSC

LaunchedIn10 remains in the pre-authority patience phase. The most significant development since audit #10 (20.04.26): the homepage was crawled **26.04.26** — the freshest crawl ever recorded, indicating Google is now actively monitoring this domain.

The FAQPage SSG-only fix (deployed 20-21.04.26) is **confirmed working in SSR** — render_compare shows /case-studies/ static HTML contains only Organization, WebSite, WebPage (no FAQPage). However, GSC rich results still report "Duplicate field FAQPage" from the 21.04.26 crawl. This is a Google WRS (Web Rendering Service) cache lag — Google fetched the updated HTML but hasn't re-rendered via JavaScript yet. The fix is live; we need to wait for WRS refresh or request re-indexing to accelerate.

The Hub↔Law bidirectional entity link was deployed 22.04.26, adding subOrganization schema and visible footer links to law.launchedin10.co.uk. This strengthens the Organisation entity graph.

Bing /website-translation/ remains undiscovered despite a third submission attempt on 22.04.26. This is now a persistent 3-audit issue. All other Bing-discovered pages remain at size=0 (discovered but not fully crawled).

### Key Metrics

| Metric | 20.04.26 | 27.04.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~350 | ~420 | +20% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GSC Unique Queries | ~90 | ~105 | +17% |
| GA4 On-Domain Sessions (90d) | ~209 | ~351 | +68% |
| Tier A Human Sessions (90d) | ~99 | ~120 | +21% |
| Bot Inflation | ~53% | ~66% | Worsening (more direct bounces) |
| Published Posts (li10_posts) | 108 | 108 | Flat |
| AI Referral Sessions | 1 (Perplexity) | 1 (Perplexity) | Flat |
| AI Overview Triggers (5 queries) | 0/10 | 0/5 | Flat |
| Homepage Last Crawled | 17.04.26 | **26.04.26** | **9 DAYS FRESHER** |
| /case-studies/ Last Crawled | 17.04.26 | 21.04.26 | 4 days fresher |
| /website-translation/ Last Crawled | 14.04.26 | 19.04.26 | 5 days fresher |
| /blog/ Last Crawled | 22.03.26 | 22.03.26 | **36 DAYS STALE** |
| /seo-automation/ Last Crawled | 14.04.26 | 14.04.26 | 13 days |
| /case-studies/ FAQPage Error | Yes | **Yes (WRS cache)** | SSR fixed, awaiting re-render |
| /website-translation/ Bing | Never | **Never (3rd attempt)** | Persistent issue |
| Bing Homepage Size | 9,373 | 9,373 | Maintained |
| Schema Coverage | >90% | >90% | Maintained |
| Orbit3Flow Pending | 0 | 0 | Clear |
| Position 1 Queries | 3 | 3 | Maintained |
| Sitemap lastDownloaded | 17.04.26 | 17.04.26 | Stable |
| sitemap-redirectfix Downloaded | 14.04.26 | **25.04.26** | **REFRESHED** |
| law.launchedin10.co.uk sitemap | N/A | **10 URLs, downloaded 24.04.26** | **NEW** |

### Honest Assessment

This site needs patience, not intervention. The leading indicators are all positive:
- Query count up 17% week-on-week (90→105), up ~110% since audit #7 (50→105)
- Homepage crawled yesterday (26.04.26) — Google is paying attention
- 3 position-1 queries maintained
- First AI citation (Perplexity) holding at 1 session (noise-level but present)
- AEO infrastructure fully deployed and maintained
- Hub↔Law entity link strengthens Organisation graph
- Pipeline clear (0 pending)

The session jump (209→351) is largely driven by increased direct/unengaged traffic on the homepage — bot inflation rose from 53% to 66%. Tier A human traffic is ~120 sessions (up from ~99), a genuine 21% improvement.

Two persistent issues need monitoring:
1. **/case-studies/ FAQPage** — fix IS deployed (SSR confirmed). Awaiting Google WRS re-render. If not resolved by next audit, request re-indexing.
2. **Bing /website-translation/** — 3 submissions, never discovered. May need alternative approach (adding prominent internal links from Bing-indexed pages, or direct Bing WMT submission of the full sitemap).

One item approaching concern: **/blog/ 36 days stale** — hasn't been crawled since 22.03.26. This is the blog index page (not individual posts). If it passes 45 days, submit for re-crawl.

### Technical Health

| Page | Index Status | Last Crawled | Rich Results | Bing Status | vs Prior |
|------|-------------|-------------|--------------|-------------|---------|
| / | Indexed | **26.04.26** | FAQ PASS | size=9,373 | **Crawled yesterday** |
| /blog/ | Indexed | 22.03.26 | — | discovered 12.04, size=0 | **36 days stale** |
| /seo-automation/ | Indexed | 14.04.26 | — | discovered 05.04, size=0 | 13 days |
| /case-studies/ | Indexed | 21.04.26 | FAQ ERROR (WRS cache) | discovered 19.04, size=0 | SSR fixed |
| /website-translation/ | Indexed | 19.04.26 | — | **never discovered** | **Persistent** |

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Crawled | Bing Discovered | Bing Crawled | Bing Size | Winner |
|------|-------------|---------------|-----------------|-------------|-----------|--------|
| / | Indexed | 26.04.26 | 27.03.26 | 31.03.26 | 9,373 | Google (fresher) |
| /blog/ | Indexed | 22.03.26 | 12.04.26 | 12.04.26 | 0 | Google (indexed) |
| /seo-automation/ | Indexed | 14.04.26 | 05.04.26 | 05.04.26 | 0 | Google (indexed) |
| /case-studies/ | Indexed | 21.04.26 | 19.04.26 | 19.04.26 | 0 | Google (indexed) |
| /website-translation/ | Indexed | 19.04.26 | never | never | 0 | Google only |

### Sitemap Status

| Sitemap | URLs | Last Submitted | Last Downloaded | Indexed | Status |
|---------|------|---------------|-----------------|---------|--------|
| sitemap.xml | 117 web + 74 video | 14.04.26 | 17.04.26 | 0 | Stable |
| sitemap-redirectfix.xml | 16 | 21.03.26 | **25.04.26** | 0 | **REFRESHED** |
| law.launchedin10.co.uk/sitemap.xml | 10 | 22.04.26 | **24.04.26** | 0 | **NEW — submitted+downloaded** |

### Schema Coverage

| Type | Prior (20.04) | Current (27.04) | Status |
|------|--------------|-----------------|--------|
| Organization (+subOrganization) | 100% (SSR) | 100% (SSR) | **+subOrganization for Law** |
| WebSite+SearchAction | 100% (SSR) | 100% (SSR) | Maintained |
| WebPage+Speakable | 100% | 100% | Maintained |
| Article | 100% blog | 100% blog | Maintained |
| BreadcrumbList | 100% blog | 100% blog | Maintained |
| VideoObject | 74 posts | 74 posts | Maintained |
| FAQPage | Homepage PASS | Homepage PASS | Maintained |
| Service | seo-automation + website-translation | Same | Maintained |
| data-ai-summary | Hero.jsx (speakable-summary) | Same | Maintained |

### AEO Status

- **AI Referral Sessions (90d): 1 (Perplexity) — unchanged from audit #10**
  - Source: perplexity.ai / referral → / (homepage)
  - Engagement: 1.0 rate, 135.7s (same session — within the rolling 90d window)
  - ChatGPT: 0 | Copilot: 0 | Gemini: 0 | Claude: 0
- **AI Overview Triggers: 0/5** — UK web design queries do NOT trigger AI Overviews (consistent across all 11 audits)
- **Citation Matrix**: No citations to check — AI Overviews don't trigger. Perplexity citation from prior window still in rolling data.
- **Bing/ChatGPT pathway**: Homepage indexed (size=9,373). 4 pages discovered, all size=0. /website-translation/ never discovered.

### Content Integrity (Step 5.05)

| Page | Title Unique | H1 Unique | Canonical Correct | Brand Present | Prices |
|------|-------------|-----------|-------------------|---------------|--------|
| / | Yes | Yes | Yes | Yes | £2, £5, £5,000 |
| /seo-automation/ | Yes | Yes | Yes | Yes | £50, £100, £99.95, £149.95, £195.00 |
| /website-translation/ | Yes | Yes | Yes | Yes | £29.95, £49.95, £79.95, £129.95 |
| /case-studies/ | Yes | Yes | Yes | Yes | None (correct) |
| /blog/ | Yes | Yes | Yes | Yes | None (correct) |

All prices match prior audit baseline. No 200-with-homepage-content issues. No JSON-LD price fields (Service schema without Offer/Product — correct for this site).

### Language Integrity (Step 5.06)

Single-language (EN only) property. All pages confirmed English content. German GSC query ("managed server oder shared hosting") is a German user finding English content — not language contamination.

### GSC Near-Ranking Queries

| Query | Imp | Position | Page | Country | vs Prior |
|-------|-----|----------|------|---------|----------|
| managed server oder shared hosting (DE) | **12** | **1.0** | /dedicated-server-managed-hosting-vs-shared/ | DEU | **+4 imp (was 8)** |
| where can i get a website accessibility scan | 1 | 1.0 | /accessibility-checker-website-essential/ | GBR | Maintained |
| which website accessibility checkers WCAG compliant | 1 | 1.0 | /accessibility-checker-website-essential/ | USA | Maintained |
| is managed dedicated server worth it | 2 | 4.0 | /dedicated-server-managed-hosting-worth/ | USA | Maintained |
| cost to build small business website 2026 | 1 | 5.0 | /web-design-cost-2026-breakdown-small/ | GBR | Maintained |
| what should i look for choosing inbound marketing firms | 1 | 5.0 | /business-web-design-agency-selection-2026 | GBR | Maintained |
| website builders accessibility compliance evaluation | 3 | 6.3 | /accessibility-checker-website-essential/ | USA | **NEW** |
| website design cost uk small business 2026 | 5 | 8.0 | /web-design-cost-2026-breakdown-small/ | Multi | Maintained |
| construction company website design trends 2026 | 8 | 7-10 | /why-website-design-for-construction/ | Multi | Maintained |
| digital agency pricing models 2026 | 4 | 8.25 | /business-web-design-pricing-transparent-cost/ | GBR | Maintained |
| website construction cost | 4 | 10.75 | /website-construction-cost-2026-uk-breakdown/ | GBR | Maintained |
| construction websites 2026 | **44** | 19-37 | /why-website-design-for-construction/ | GBR | **+13 imp (was 31)** |
| affordable website designers | 15 | 85-97 | /affordable-website-designers-trusted-uk/ | GBR | Stable deep |

Notable: "construction websites 2026" cluster grew from 31 to 44 impressions — this is the highest-volume query group but positions remain deep (19-37). The German hosting query continues growing (8→12 impressions at pos 1). New query: "website builders accessibility compliance evaluation" (3 imp, pos 6.3, USA).

### Reconciliation

GSC clicks (90d): 0 | GA4 organic sessions (on-domain): ~20 | Delta: 20 (acceptable at zero-click volumes)

### Bot Filtering

| Tier | Sessions | % | vs Prior |
|------|----------|---|----------|
| Total (all hostnames) | ~369 | 100% | +57% |
| On-domain | ~351 | 95.1% | +68% |
| Tier A (human, engaged) | ~120 | 32.5% | +21% |
| Tier B (grey/direct bounce) | ~210 | 56.9% | +47% |
| Tier C (bot/spam/off-domain) | ~39 | 10.6% | +56% |
| Off-domain | ~18 | 4.9% | -28% |

Bot inflation: ~66% (up from 53%). The increase is driven by more direct/unengaged homepage visits — typical of pre-authority sites as they gain visibility. Tier A genuine growth is +21%.

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
| ACT-LI10-020 | /case-studies/ FAQPage SPA leak | open (P2) | **SSR FIXED, AWAITING WRS** | render_compare: SSR clean. GSC still shows error from 21.04 crawl. |
| ACT-LI10-021 | /website-translation/ Bing discovery | open (P2) | **STILL UNDISCOVERED** | 3rd submission 22.04. Bing GetUrlInfo: never discovered. |
| ACT-LI10-013 | Monitor near-ranking queries | open (P3) | **POSITIVE** | 3 pos 1 maintained, queries up 90→105 |
| ACT-LI10-014 | Monitor GA4 conversions | open (P3) | **30-DAY BASELINE TOMORROW** | 0 conversions, 30 days on 28.04.26 |
| ACT-LI10-022 | AI citation tracking | open (P3) | **Perplexity 1, unchanged** | Still noise-level |

### Cross-Portfolio Equity

Intent boundary: LI10 = web design + SEO automation + translation. No overlap with sister properties.
Deep-links carried forward:
1. Blog post on e-commerce → responsible.eldris.ai (EU RP for sellers)
2. Blog post on GDPR/privacy → epr.eldris.ai (EPR/WEEE for electronics)

Hub↔Law entity link deployed 22.04.26 (subOrganization schema + footer links).

### Next Audit

2026-05-04 — verify /case-studies/ FAQPage WRS refresh, /website-translation/ Bing discovery, /blog/ crawl freshness (approaching 43 days), conversion events baseline (30+ days), AI citation trend.
