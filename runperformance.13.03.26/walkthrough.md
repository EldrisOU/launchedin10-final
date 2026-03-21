# runperformance — launchedin10.co.uk — 13.03.26

## Audit Metadata
- **Date**: 2026-03-13
- **Site Age**: Day 73 (Go-Live: 2026-02-01)
- **Audit Cycle**: 4th (Feb 6 → Feb 20 → Mar 5 → **Mar 13**)
- **Commit**: `42ae884` (fix: canonical trailing-slash + llms.txt)

## Key Metrics (User-Verified GSC Dashboard)
| Metric | Value |
|--------|-------|
| Impressions (3mo) | 234 |
| Clicks (3mo) | 7 |
| CTR | 3% |
| Avg Position | 16.4 |
| Indexed Pages | 19 |
| Not Indexed | 24 |
| Sitemap URLs | 94 |
| Published Posts | 48 |
| Pipeline (orbit_3_flow) | 77 |
| GA4 Tier A (UK Human) | 182 (29.5%) |
| Bot Inflation | 70.5% |

## Actions Taken
1. **Canonical trailing-slash fix** — `BlogPost.jsx` (lines 148, 155) and `BlogIndex.jsx` (line 140) now emit trailing-slash canonicals matching sitemap output. This resolves the dual-URL cannibalization that was fragmenting "managed dedicated hosting" from Position 4 → 36-63.
2. **`llms.txt` created** — Added `public/llms.txt` for LLM/AEO discoverability.
3. **`/case-studies` "Fixed" submitted** — User submitted "Fixed" in GSC for the redirect error that persisted across 3 audits.

## Findings Summary
- **Escalation de-escalated**: Script showed 0 clicks / 66 impressions, but user-verified GSC dashboard shows 7 clicks / 234 impressions / 3% CTR. The script's per-dimension fragmentation had masked true totals.
- **Sitemap fixed ~3 weeks ago** (~Feb 20): Real indexing only began ~Feb 20, making the effective indexing age ~21 days, not 73 days.
- **19/43 pages indexed** (+58% from Mar 5's 12/83). Crawl velocity accelerating.
- **`.pages.dev`** handled by Cloudflare bulk 301 redirects at account level. GA4 residual traffic (98 users) is cached/stale.
- **Google Ads**: No campaigns currently active. 6 CPC users in GA4 are residual.
- **Pipeline saturated**: 77 orbit_3_flow + 48 published. No new content ingestion required.

## Carry-Forward Items
- [ ] Verify canonical fix appears in live HTML after Cloudflare deployment
- [ ] Monitor `/case-studies` redirect error clearance in next GSC crawl
- [ ] Consider FAQ JSON-LD injection on top 3 ranking pages when they stabilise
- [ ] Re-run URL inspection on full 94 URLs when API rate limits allow
- [ ] Next audit: ~Day 100 (early April 2026)
