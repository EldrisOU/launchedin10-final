# LI10 DeepRank Audit #5 — 2026-03-21

## Verdict: HUMAN QUALITY SURGE

| Metric | Mar 13 | Mar 21 | Δ |
|--------|--------|--------|---|
| GSC Impressions | 234 | **294** | +26% |
| GSC Clicks | 7 | **7** | Flat |
| Tier A Human | 182 | **346** | **+90%** |
| Bot Inflation | 70.5% | **45.3%** | **−25.3pp** |
| Published Posts | 48 | **105** | +119% |

## Diagnostic Challenge Results
- `/case-studies`: Resolves 308→200 ✅ (GSC redirect error is stale)
- Pricing page canonical: Correctly set to trailing-slash ✅
- Sitemap: 117 URLs, healthy ✅
- llms.txt: Live at 200 ✅

## Outstanding
- 4 URLs pending Indexing API submission (quota exhausted 429)
- Revalidate `/case-studies` via GSC console
- Next audit: 2026-03-28
