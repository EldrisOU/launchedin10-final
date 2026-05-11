# LI10 DeepRank Audit #13 — 2026-05-11

## Verdict: PATIENCE PHASE CONTINUES — TWO P1s UNCHANGED, BING DISCOVERY BREAKTHROUGH

LaunchedIn10 remains in the pre-authority patience phase. The two P1 issues from Run 12 remain unfixed — no code changes were deployed in the 7-day interval. Positive signals continue to strengthen: GSC impressions grew ~62%, Bing made a significant breakthrough by discovering /website-translation/ for the first time, and Google crawl frequency remains strong on 4/5 pages.

**UNCHANGED: /case-studies/ FAQPage WRS injection (ACT-LI10-023).** Google re-crawled /case-studies/ on 09.05.26 — the FAQPage 4x duplicate ERROR persists. No code change has been committed since the prior audit (last commit 04.05.26 was audit artifacts only). The useEffect cleanup approach is confirmed non-functional against WRS. This needs the architectural fix: remove FAQPage from any React component, keep SSG-only.

**ESCALATING: /blog/ now 50 days stale (ACT-LI10-024).** Last crawled 22.03.26. Was 43 days at Run 12. The re-crawl request flagged in Run 12 was not executed. Now overdue.

**BREAKTHROUGH: /website-translation/ discovered by Bing (08.05.26).** After 4 consecutive audits showing "never discovered", Bing has finally picked up this URL. DocumentSize=0 (stale-empty-crawl — indexed but cache empty). Needs SubmitUrl recrawl to populate. ACT-LI10-021 partially resolved.

### Key Metrics

| Metric | 04.05.26 (Run 12) | 11.05.26 (Run 13) | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~340 | ~550 | **+62%** |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GA4 On-Domain Sessions (90d) | ~355 | ~191 | Window shift (note below) |
| Tier A Human Sessions (90d) | ~120 | ~70 | Lower (note below) |
| Bot Inflation | ~66% | ~63% | Stable |
| Published Posts | 108 | 108 | Flat |
| AI Referral Sessions | 1 (Perplexity) | 1 (Perplexity) | Same session rolling |
| Homepage Last Crawled | 30.04 | 30.04 | Same |
| /case-studies/ Last Crawled | 30.04 | **09.05** | Fresher |
| /case-studies/ FAQPage | 4x ERROR | **4x ERROR** | **UNCHANGED** |
| /blog/ Last Crawled | 22.03 | **22.03** | **50 DAYS STALE** |
| /seo-automation/ Last Crawled | 30.04 | 30.04 | Same |
| /website-translation/ Last Crawled | 29.04 | **09.05** | Fresher |
| /website-translation/ Bing | Never | **08.05** | **DISCOVERED** |
| Bing Homepage Size | 21,248 | **24,769** | **+17%** |
| Bing Homepage Crawled | 03.05 | **07.05** | Fresher |
| Conversions | 0 | 0 | 44+ days |

**GA4 methodology note:** Session count difference (355 vs 191) is due to GA4 dimension cardinality — the current audit used `landingPagePlusQueryString` dimension which splits sessions differently from `pagePath`. Tier A proportions remain consistent (~34-37%). Relative metrics are comparable.

### Honest Assessment

Two fixes needed, then continued patience:

1. **FAQPage WRS fix** — This has been open across 3 audits with no code change deployed. The architectural fix is clear: remove FAQPage from Home.jsx, keep it SSG-only in generate-static.js. Needs execution.

2. **/blog/ re-crawl** — Simple GSC URL Inspection request. 50 days is past concern threshold. Needs execution immediately.

Everything else is trajectory monitoring. GSC impressions growing strongly (+62%). Bing fully indexing homepage and expanding discovery. Position-1 queries maintained. The site needs time to build authority, not more content or intervention.

### Technical Health

| Page | Google Index | Google Crawled | Rich Results | Bing Discovered | Bing Size | vs Prior |
|------|-------------|---------------|-------------|-----------------|-----------|---------|
| / | PASS | 30.04 | FAQ PASS | 27.03 | 24,769 | Size +17% |
| /blog/ | PASS | **22.03** | — | 12.04 | 0 | **50d STALE** |
| /seo-automation/ | PASS | 30.04 | — | 05.04 | 0 | Same |
| /case-studies/ | PASS | **09.05** | **FAQ 4x ERR** | 19.04 | 0 | Crawled, error persists |
| /website-translation/ | PASS | **09.05** | — | **08.05** | 0 | **BING DISCOVERED** |

### Bing vs Google Crawl Comparison

| Page | Google Crawled | Bing Crawled | Bing Size | Winner |
|------|---------------|-------------|-----------|--------|
| / | 30.04 | **07.05** | **24,769** | **Bing fresher** |
| /blog/ | 22.03 | 12.04 | 0 | Bing newer but empty cache |
| /seo-automation/ | 30.04 | 05.04 | 0 | Google |
| /case-studies/ | **09.05** | 19.04 | 0 | Google |
| /website-translation/ | **09.05** | **08.05** | 0 | Near-simultaneous |

### Bing Three-Metric Assessment

| Metric | Status | Detail |
|--------|--------|--------|
| Index Status (Block A) | Mixed | Homepage IsPage=true, Size=24,769. All 4 subpages IsPage=true, Size=0 (stale-empty-crawl). |
| Search Performance (Block B) | Zero | 0 impressions, 0 clicks site-wide. Authority/ranking weakness, not indexation. |
| Sitemap Processing (Block C) | Success | Both sitemaps accepted. Last processed 29.03 (6 weeks, slightly stale). |
| Crawl Issues (Block D) | Clean | Zero crawl issues reported. |

### Sitemaps

| Sitemap | URLs | Last Downloaded | Status |
|---------|------|----------------|--------|
| sitemap.xml | 113w + 74v | 17.04 | Stable (GSC reports 0 indexed — known lag) |
| sitemap-redirectfix.xml | 16 | 06.05 | Stable |
| law sitemap.xml | 10 | 11.05 | Active |

### Content Integrity (5.05)

All 5 commercial pages: unique titles, unique H1s, brand present, canonicals correct. Prices unchanged from prior audit (homepage: £2/£5/£5,000; SEO: £50-£195; translation: £29.95-£129.95). No 200-with-homepage-content. No price drift.

### Language Integrity (5.06)

Single-language EN property. All pages confirmed English content. No foreign language contamination. PASS.

### Content Freshness (5.1)

**Structural gap**: No `dateModified` or `datePublished` in JSON-LD on any commercial page. No visible "Last updated" dates in DOM. Sitemap lastmod uniform (2026-05-04) — bulk rebuild, not per-page tracking. No page exceeds 90-day staleness by sitemap lastmod, but absence of schema freshness signals is a ranking signal loss.

### Schema Coverage (5.2)

| Schema Type | Coverage | vs Prior |
|-------------|---------|---------|
| Organization+subOrganization | 100% | Same |
| WebSite+SearchAction | 100% | Same |
| WebPage+Speakable | 80% (orphaned cssSelector) | Same |
| Article | 100% blog | Same |
| BreadcrumbList | 100% blog | Same |
| VideoObject | ~65% blog | Same |
| FAQPage | 20% (homepage only) | Same |
| Service | 40% (both have empty OfferCatalog) | Same |
| data-ai-summary | 0% | Same |
| dateModified | 0% | Same |

### AEO Status

AI Referral: 1 session (Perplexity, same rolling 90d window). ChatGPT/Copilot/Gemini/Claude: 0. Citation matrix: 0/10 queries trigger AI Overviews in UK — consistent across 13 audits. No AEO citation opportunity for these query types at present. Bing homepage at 24,769 bytes — strongest Bing position ever.

### GSC Top Movers (vs Run 12)

| Query | Imp (Run 12) | Imp (Run 13) | Pos | Delta |
|-------|-------------|-------------|-----|-------|
| construction websites 2026 | 55 | 55 | 19-35 | Stable |
| seo foundations | — | 39 | 73 | Deep |
| wordpress site maintenance services | — | 23 | 13 | **NEW — near page 1** |
| dedicated server hosting vs shared | 15 | 21 | 25-29 | +40% |
| inexpensive web design companies | 18 | 21 | 24-25 | +17% |
| managed server oder shared hosting (DE) | 12 | 12 | 1.0 | **Pos 1 held** |
| transparent web design pricing | 8 | 10 | 13 | +25% |

### Bot Filtering

Tier A: ~70 (37%) | Tier B: ~101 (53%) | Tier C: ~20 (10%). Bot inflation ~63% (stable vs 66% prior).

### Reconciliation

GSC clicks: 0 | GA4 organic: 17 (Google 14 + Bing 3) | Delta: 17 (acceptable at zero-click volumes).

### Pipeline

li10_posts: 108 | orbit3 processed: 95 | pending: 0 | stalled: 0. Clear.

### CRO

N/A — no page meets >100 Tier A threshold.

### Next Audit

2026-05-18 — verify: FAQPage fix deployed and WRS error cleared, /blog/ re-crawled, Bing subpage cache populated after SubmitUrl, conversion tracking test.
