# LI10 DeepRank Audit #12 — 2026-05-04

## Verdict: PATIENCE PHASE CONTINUES — FAQPage FIX CONFIRMED FAILING AT WRS LEVEL, /blog/ NOW 43 DAYS STALE

LaunchedIn10 remains in the pre-authority patience phase. Two issues need attention; all other signals positive.

**ESCALATING: /case-studies/ FAQPage duplicate ERROR**. Google re-crawled /case-studies/ on 30.04.26 (2 days after ACT-LI10-020 re-index request). The FAQPage error is now WORSE — 4 items (was 3). SSR is confirmed clean via render_compare and curl (JSON-LD @graph: Organization, WebSite, WebPage only). Google's WRS is executing JavaScript that injects FAQPage despite it not being in static HTML. The useEffect cleanup (21.04.26) is not preventing WRS detection. P1.

**/blog/ 43 days stale**. Last crawled 22.03.26 — unchanged across 2 audits. Needs re-crawl request.

**Positive signals**: Google crawl frequency strong (4/5 pages crawled within 5 days). Bing homepage size DOUBLED (9,373 to 21,248) and re-crawled 03.05.26. Impression clusters growing. 3 position-1 queries maintained.

### Key Metrics

| Metric | 27.04.26 | 04.05.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~420 | ~340+ | Window shift |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GA4 On-Domain Sessions (90d) | ~351 | ~355 | Flat |
| Tier A Human Sessions (90d) | ~120 | ~120 | Flat |
| Bot Inflation | ~66% | ~66% | Stable |
| Published Posts | 108 | 108 | Flat |
| AI Referral Sessions | 1 (Perplexity) | 1 (Perplexity) | Same session |
| Homepage Last Crawled | 26.04 | **30.04** | Fresher |
| /case-studies/ Last Crawled | 21.04 | **30.04** | Fresher |
| /case-studies/ FAQPage | 3x ERROR | **4x ERROR** | **WORSE** |
| /blog/ Last Crawled | 22.03 | **22.03** | **43 DAYS STALE** |
| /seo-automation/ Last Crawled | 14.04 | **30.04** | Fresher |
| /website-translation/ Last Crawled | 19.04 | **29.04** | Fresher |
| /website-translation/ Bing | Never | **Never** | 4th audit |
| Bing Homepage Size | 9,373 | **21,248** | **+127%** |
| Bing Homepage Crawled | 31.03 | **03.05** | Re-crawled |
| Conversions | 0 | 0 | 37 days |

### Honest Assessment

Two fixes needed, then patience:

1. **FAQPage WRS issue** — SSG-only + useEffect is not preventing WRS detection. FAQPage must be removed from ANY React component that could execute during SPA hydration. Keep FAQPage ONLY in the generate-static.js homepage SSG template, which gets stripped by the SSG @graph injection.

2. **/blog/ re-crawl** — simple GSC URL Inspection request. 43 days stale.

Everything else is patience. Leading indicators positive: crawl frequency up, Bing fully indexing homepage, impression clusters growing.

### Technical Health

| Page | Index | Crawled | Rich Results | Bing Size | vs Prior |
|------|-------|---------|-------------|-----------|---------|
| / | PASS | 30.04 | FAQ PASS | 21,248 | Bing +127% |
| /blog/ | PASS | **22.03** | — | 0 | **43d STALE** |
| /seo-automation/ | PASS | 30.04 | — | 0 | +16d fresher |
| /case-studies/ | PASS | 30.04 | **FAQ 4x ERR** | 0 | WORSE |
| /website-translation/ | PASS | 29.04 | — | never | 4th audit |

### Bing vs Google Crawl Comparison

| Page | Google | Bing Crawled | Bing Size | Winner |
|------|--------|-------------|-----------|--------|
| / | 30.04 | **03.05** | **21,248** | **Bing fresher** |
| /blog/ | 22.03 | 12.04 | 0 | Google (indexed) |
| /seo-automation/ | 30.04 | 05.04 | 0 | Google |
| /case-studies/ | 30.04 | 19.04 | 0 | Google |
| /website-translation/ | 29.04 | never | 0 | Google only |

### Sitemaps

| Sitemap | URLs | Downloaded | Status |
|---------|------|-----------|--------|
| sitemap.xml | 117w + 74v | 17.04 | Stable |
| sitemap-redirectfix.xml | 16 | 25.04 | Stable |
| law sitemap.xml | 10 | 28.04 | Active |

### Content Integrity (5.05)

All 5 commercial pages: unique titles, unique H1s, brand present, prices match prior audit (£2/£5/£5,000 homepage; £50-£195 SEO; £29.95-£129.95 translation). No 200-with-homepage-content. No JSON-LD prices (Service schema without Offer — correct).

### Language Integrity (5.06)

Single-language EN property. Confirmed all English content. N/A for multilingual checks.

### Schema Coverage

Organization+subOrganization, WebSite+SearchAction, WebPage+Speakable, Article, BreadcrumbList, VideoObject, FAQPage (homepage PASS), Service, data-ai-summary — all maintained >90%.

### AEO Status

AI Referral: 1 session (Perplexity, same rolling window). ChatGPT/Copilot/Gemini/Claude: 0. Bing homepage now fully indexed at 21,248 bytes — strongest Bing position ever. No AI Overviews trigger for LI10 queries (consistent across 12 audits).

### GSC Top Movers

| Query | Imp | Pos | vs Prior |
|-------|-----|-----|----------|
| construction websites 2026 | 55 | 19-35 | +25% |
| inexpensive web design companies | 18 | 25 | +64% |
| dedicated server hosting vs shared | 15 | 25 | +50% |
| managed server oder shared hosting (DE) | 12 | 1.0 | Pos 1 held |
| transparent web design pricing | 8 | 12-25 | NEW cluster |

### Bot Filtering

Tier A: ~120 (32%) | Tier B: ~215 (58%) | Tier C: ~37 (10%). Bot inflation ~66% (stable).

### Reconciliation

GSC clicks: 0 | GA4 organic: ~16 | Delta: 16 (acceptable at zero-click).

### Pipeline

li10_posts: 108 | orbit3 processed: 95 | pending: 0 | stalled: 0. Clear.

### CRO

N/A — no page meets >100 Tier A threshold.

### Next Audit

2026-05-11 — verify: FAQPage fix deployed and GSC error cleared, /blog/ re-crawled, /website-translation/ Bing, conversion tracking.
