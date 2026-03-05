# Audit Walkthrough: launchedin10.co.uk (2026-03-05)

## Overview
- **Audit Date**: 2026-03-05
- **Site Age**: 33 Days (Go-Live: 2026-02-01)
- **Prior Audits**: `runperformance6.02.26` (Day 5) → `runperformance.20.02.26` (Day 19) → This (Day 33)
- **Protocol**: DeepRank v1.1 (PhD Deep Systems Edition)
- **User Context**: Sitemap only started indexing last week due to prior technical issues.

---

## Key Findings

### 1. GSC Performance — Explosive Query Growth
| Metric | Feb 6 | Feb 20 | **Mar 5** |
|---|---|---|---|
| Queries | 2 | 4 | **27** |
| Impressions | 2 | 6 | **61** |
| Clicks | 0 | 0 | 0 |
| Indexed Pages | 1 | 1 | **12** (GSC verified) |

**Emerging Keyword Clusters:**
- "managed dedicated hosting" — **Position 4.0** (US Desktop), 8 queries, 27 impressions
- "construction websites 2026" — Position 19.0 (UK Mobile), 4 queries, 15 impressions
- "web design pricing" — Position 10.7, 4 queries, 6 impressions

### 2. Bot-Filtered Traffic (604 Total Users)
| Tier | Users | % |
|---|---|---|
| Tier A (UK Human) | 183 | 30.3% |
| Tier B (Grey Zone) | 280 | 46.4% |
| Tier C (Bot/Spam) | 141 | 23.3% |

### 3. Indexing Status (User-Verified GSC)
- **12 pages indexed** (14.5%) — up from 1 on Feb 20
- **23 not indexed** — in processing queue
- **83 total sitemap URLs** — submitted Feb 26
- Indexing velocity: **+1,100%** since prior audit

---

## Prior Technical Debt — Status

| Issue (from Feb 20) | Status Mar 5 |
|---|---|
| Trailing slash redirect errors | ✅ Fixed & re-submitted as 'fixed' in GSC (~Feb 28) |
| `.pages.dev` duplicate content | ✅ 301 redirects in place. GA4 figures are residual strays |
| `orbit_3_flow` category casing | ✅ Resolved in Feb 20 cycle |
| Title tag mismatches | ✅ Resolved in Feb 20 cycle |

---

## Actions This Cycle
- [x] Ran fresh `fetch_snapshot.js` and `analyze_snapshot.js`
- [x] Bot-Filtered GA4 traffic (Tier A/B/C classification)
- [x] GSC keyword cluster analysis — identified 3 emerging clusters
- [x] Reconciled script data with user's manual GSC verification (12 indexed, not 2)
- [x] Confirmed all prior technical debt resolved by user
- [x] Archived to `runperformance.05.03.26/`

## Recommendations for Next Audit
- **Monitor clicks**: With 12 indexed pages and Position 4.0 placement, first clicks should emerge within 2-4 weeks
- **No content ingestion**: Pipeline saturated at 61 entries across 5 silos
- **Escalation trigger**: If zero clicks persist past Day 60, activate Position 1 Recovery Protocol
- **Track 23 'not indexed' pages**: Should decrease as Google processes the sitemap

---
*Stored in Archive: runperformance.05.03.26/*
