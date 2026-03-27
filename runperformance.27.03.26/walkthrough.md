# LI10 DeepRank Audit #6 — 2026-03-27

## Verdict: PRE-AUTHORITY PHASE — STRUCTURAL FIX REQUIRED

LaunchedIn10 is in a pre-authority growth phase. Content library is solid (108 posts), impressions are building (~86 across ~30 queries), and the trailing-slash fixes from the last audit are holding. However, the site has a fundamental structural problem: it is a client-side rendered React SPA, and all JSON-LD schema is injected via React Helmet — invisible to server-side rendering. This blocks AI crawler access to structured data entirely.

### Key Metrics

| Metric | 21.03.26 | 27.03.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | 294 | ~86 (sampled) | Different methodology |
| GSC Clicks (90d) | 7 | 0 | Flat/declining |
| GA4 On-Domain Sessions (90d) | — | 774 | Baseline |
| Tier A Human Sessions (90d) | 346 (7d) | ~142 (90d) | Different period |
| Bot Inflation | 45.3% | 31.9% | -13.4pp |
| Published Posts | 105 | 108 | +3 |
| AI Referral Sessions | 0 | 0 | Flat |
| Bing Pages Crawled | — | 0 (homepage discovered, size=0) | New metric |
| Orbit3Flow Pending | 0 | 0 | Clear |

### Honest Assessment

This site needs time and one structural fix — not a blitz of action items. The 108 blog posts are indexing slowly but steadily. The biggest blocker to AI citation potential is that JSON-LD schema is client-side only (confirmed by render_compare: `ssrHasJsonLd: false`) and Bing has zero content indexed (homepage discovered today with size=0). Fix these two things, then wait. The content pipeline is clear (0 items pending in orbit_3_flow), and the 90-day freshness gate passes for all commercial pages.

### Technical Health

- **Homepage**: Indexed, last crawled 23.03.26. FAQ rich results detected. Canonical aligned.
- **/blog/**: Indexed, last crawled 22.03.26.
- **/seo-automation/**: Indexed, last crawled 21.02.26 (stale — 34 days since crawl).
- **/case-studies/**: Indexed, last crawled 21.03.26. **Duplicate FAQPage schema ERROR**. Also has Review snippets.
- **/website-translation/**: **NOT INDEXED** — "Discovered - currently not indexed". P1.
- **Sitemap**: 117 URLs submitted. 16 legacy redirect URLs in sitemap-redirectfix.xml.
- **llms.txt**: Live, valid, lists core pages and blog categories.
- **robots.txt**: Basic — no AI crawler-specific Allow rules.
- **render_compare**: `ssrHasJsonLd: false` — all schema is client-side only. P1.

### Schema Coverage

| Type | Coverage | Status |
|------|----------|--------|
| Organization | Home only (client-side) | Partial |
| WebSite + SearchAction | Home only (client-side) | Partial |
| Service | Home only (client-side) | Partial |
| FAQPage | Home + case-studies (duplicate error) | Broken |
| Article | 0 pages | Missing |
| BreadcrumbList | case-studies only | Minimal |
| Speakable | 0 pages | Missing |
| data-ai-summary | 0 pages | Missing |

### AEO Status

- **AI Referral Sessions**: 0 (ChatGPT, Perplexity, Claude, Copilot, Gemini — all zero)
- **AI Overview Triggers**: 0/6 target queries tested — no AI Overviews firing
- **Bing Crawl Status**: Homepage discovered 27.03.26, size=0. All other pages undiscovered.
- **Citation Matrix**: Not applicable — zero citations across all engines.

### Ghost Indexing

Near-ranking queries (equity building):
- pos 4.0: "is managed dedicated server worth it" (2 imp)
- pos 10.7: "digital agency pricing models 2026" (3 imp)
- pos 10.8: "website construction cost" (4 imp)
- pos 11.0: "cost of web development" (1 imp)
- pos 19.0: "construction websites 2026" (15 imp)

Ghost equity (pos >50, at risk):
- pos 85.9: "affordable website designers" (26 imp)
- pos 97.8: "affordable website design company" (4 imp)
- pos 75.5: "seo foundations" (2 imp)

### Pipeline

- li10_posts: 108 published (up from 105)
- orbit_3_flow: 95 processed, 0 pending
- Publishing velocity: ~0.5 posts/day

### Cross-Portfolio Deep Links (drafted)

1. /blog/business-growth/website-lead-generation-visitors-customers-uk-businesses/ → responsible.eldris.ai
2. /blog/website-design/ecommerce-websites-uk-online-retailers/ → epr.eldris.ai

### Next Audit

2026-04-03 (7 days)
