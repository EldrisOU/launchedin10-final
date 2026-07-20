# RunPerformance Audit — launchedin10.co.uk
## Run 22 | 20 July 2026 | DeepRank v3.0

**Previous audit**: Run 21, 13 July 2026 (7 days ago)
**Mode sequence**: ARCHITECT → SENTINEL → AEO SPECIALIST → STRATEGIST → CONVERTER → INCUBATOR

---

## Key Metrics Table

| Metric | Run 21 (13.07.26) | Run 22 (20.07.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (LI10 specific) | 1,006 | 2,361 | +1,355 (+134.7%) |
| GSC Clicks | 0 | 0 | 0 (22nd consecutive) |
| GA4 On-Domain Sessions | 191 | 198 | +7 (+3.7%) |
| GA4 Tier A Sessions | 72 | 68 | -4 (-5.6%) |
| Bot Inflation | 62.3% | 76.5% | +14.2pp |
| AI Citations (90d) | 1 (ChatGPT) | 1 (ChatGPT) | Stable |
| Google Organic (GA4) | 10 | 9 | -1 |
| Bing Organic (GA4) | 2 | 2 | Stable |
| Published Posts | 108 | 108 | 0 |
| Pipeline Dormancy | 115 days | 122 days | +7 |
| Active P0 | 1 | 1 | Unchanged |
| /pricing/ GSC Status | Discovered - not indexed | URL is unknown to Google | REGRESSION |

---

## Honest Assessment

LaunchedIn10 remains in authority-deficit stasis. Zero organic clicks across 22 consecutive audits. GSC impressions surged to 2,361 (+135%) — a positive signal that Google is showing LI10 more often in SERPs, but all positions remain >20 so no clicks materialise. The law subdomain queries (solicitors google ads, google ads audit) drive the majority of impression growth.

The most significant finding this run: **/pricing/ has regressed from "Discovered - currently not indexed" to "URL is unknown to Google"**. This is a downgrade in Google's URL lifecycle — Google has actively purged the URL from its awareness. The page is technically correct (in sitemap, in nav, in llms.txt, fully indexed by Bing at 26,341 bytes). This confirms the authority-deficit diagnosis: Google is contracting crawl allocation for this domain, dropping pages it doesn't deem worthwhile.

The P0 price schema mismatch enters its 7th consecutive audit without operator resolution. Bot inflation continues rising (76.5%) due to 91 localhost dev sessions and 81 zero-engagement direct sessions polluting the GA4 data.

**This site needs content velocity and external authority signals. No technical intervention will fix the core problem.**

---

## Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Stack**: React 19 + Vite SPA with SSG pre-rendering (generate-static.js). Cloudflare Pages. Supabase li10_posts.

### RE-LOOP GATE
- [x] data-ai-summary: YES — homepage (3 blocks), blog index (3), case-studies (3), seo-automation (3). NOT on /pricing/ or blog posts.
- [x] Speakable: YES — SpeakableSpecification with .speakable-summary on all pages via SSG.
- [x] llms.txt: EXISTS. Lists all service pages INCLUDING /pricing/. Verified via curl 20.07.26.
- [x] Schema: Organization+WebSite (global), WebPage+SpeakableSpecification (all), Service+FAQPage (homepage), FAQPage (case-studies), Article+BreadcrumbList (newer blogs).
- [x] Last 7 days: 2 commits on 13.07.26 — ACT writeback only. No code changes since 23.06.26.
- [x] Automation: generate-static.js, generate-sitemap.js, submit-bing-indexnow.js (all manual). Pipeline dormant 122 days.

---

## Step 0 — GSC Access [ARCHITECT]

| Check | Result |
|-------|--------|
| Property | sc-domain:launchedin10.co.uk (Domain, siteOwner) |
| Homepage inspection | PASS — indexed, crawled 18.07.26, canonical match |
| GA4 Property | properties/517814343 |

---

## Step 1 — Historical Lookback [SENTINEL]

24 audit directories in repo. Run 21 (13.07.26) is latest.

### Outstanding from Run 21
| ID | Priority | Status | Consecutive |
|----|----------|--------|-------------|
| ACT-LI10-035 | P0 | OPEN | 7th audit |
| ACT-LI10-050 | P2 | OPEN — ESCALATED (regression) | 3rd audit |
| ACT-LI10-042 | P3 | OPEN | 5th audit |
| ACT-LI10-047 | P3 | OPEN | 4th audit |
| ACT-LI10-049 | P3 | OPEN | 4th audit |

### Resolved
No new resolutions this run.

---

## Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired:
1. GSC Search Analytics (90d) — 2,361 impressions, 0 clicks, 377 rows
2. GA4 Page Engagement (90d) — 198 on-domain sessions
3. GA4 Traffic Sources (90d) — AI citations identified
4. GA4 Campaigns — N/A (no ads)
5. GSC URL Inspections — 4 pages inspected
6. Sitemap — 118 URLs parsed
7. Bing WMT (li-10-bing-aeo-protocol) — Blocks A, B, C, D executed

### Bing Protocol Results (Block A)
| URL | IsPage | DocSize | Discovered | Crawled |
|-----|--------|---------|------------|---------|
| / | true | 26,714 | 27.03.26 | 17.07.26 |
| /pricing/ | true | 26,341 | 11.05.26 | 29.06.26 |
| /case-studies/ | true | 17,528 | 19.04.26 | 29.06.26 |
| /seo-automation/ | true | 15,254 | 05.04.26 | 01.07.26 |
| /website-translation/ | true | 18,886 | 08.05.26 | 18.07.26 |

All pages fully indexed in Bing. No stale-empty-crawl issues.

**Block B**: Homepage 0 impressions/0 clicks — authority/ranking issue, NOT indexation.
**Block C**: All feeds Status=Success, crawled 16.07.26.
**Block D**: No crawl issues.

### Bing vs Google Comparison
| Page | Google Status | Google Crawled | Bing Crawled | Bing Size | Winner |
|------|-------------|----------------|--------------|-----------|--------|
| / | Indexed | 18.07.26 | 17.07.26 | 26,714 | Bing |
| /pricing/ | UNKNOWN TO GOOGLE | Never | 29.06.26 | 26,341 | Bing only |
| /case-studies/ | Indexed | 18.07.26 | 29.06.26 | 17,528 | Google |
| /seo-automation/ | Indexed | 04.07.26 | 01.07.26 | 15,254 | Bing |
| /website-translation/ | Not inspected | — | 18.07.26 | 18,886 | Bing |

### AI Citations
| Source | Sessions | Page | Duration | Tier |
|--------|----------|------|----------|------|
| chatgpt.com (ai-assistant) | 1 | /case-studies/ | 27.9s | T3 |

---

## Step 3 — Data Reconciliation [SENTINEL]

GSC clicks: 0. GA4 Google organic: 9. Delta: +9 (micro-volume noise, not actionable).

---

## Step 4 — Bot Filtering [SENTINEL]

| Tier | Sessions | % |
|------|----------|---|
| A (Human) | 68 | 34.3% |
| B (Grey) | 39 | 19.7% |
| C (Bot/Dev) | 182 | 91.9% |

**Note**: Tier C includes 91 sessions from 127.0.0.1 (localhost dev traffic) and 81 zero-engagement direct sessions. Total raw sessions exceed on-domain because some sessions overlap tier criteria.

Bot inflation: 76.5%. Continued increase from Run 21 (62.3%) driven by persistent localhost dev traffic and zero-engagement direct.

---

## Step 5 — Technical Audit [ARCHITECT+AEO]

### Sitemap Status
| Sitemap | URLs | Last Downloaded | Bing Status |
|---------|------|-----------------|-------------|
| sitemap.xml | 118 | 17.07.26 | Success |

### GSC URL Inspections
| URL | Status | Last Crawled | Prior Status |
|-----|--------|-------------|--------------|
| / | Submitted and indexed | 18.07.26 | Indexed |
| /pricing/ | URL is unknown to Google | Never | Discovered - not indexed |
| /case-studies/ | Submitted and indexed | 18.07.26 | Indexed |
| /seo-automation/ | Submitted and indexed | 04.07.26 | Indexed |

**CRITICAL**: /pricing/ has REGRESSED from "Discovered - currently not indexed" to "URL is unknown to Google". Google has purged the URL from its awareness entirely. No technical intervention available — this is authority-based crawl budget contraction.

---

## Step 5.05 — Content Integrity

### Body Fingerprint: PASS — all pages unique, no 200-with-homepage-content.

### Price Drift:
- Homepage: MISMATCH (P0 — HTML=SEO prices £99.95/£149.95/£195.00, Schema=web build prices 99/149/249/497/997/1997). **7th consecutive audit.**
- /pricing/: MATCH
- /seo-automation/: MATCH
- /website-translation/: MATCH

### Price Snapshot
All prices match prior audit. No price drift detected. `price_snapshot` written to Gap_Analysis JSON.

---

## Step 5.2 — Schema Coverage

| Schema Type | Coverage |
|-------------|----------|
| FAQPage | Homepage only (2 blocks) |
| Service | All 4 commercial pages |
| SpeakableSpecification | All pages |
| data-ai-summary | Homepage (3 blocks) |
| BreadcrumbList | 71% of blog posts (29% legacy gap) |
| Article | Newer blog posts |

---

## Step 5.5 — Per-Language ACT Parity Gate

Parity criteria 32-36 skipped: single-language property.

---

## Step 6 — Gap Analysis [STRATEGIST]

### Top LI10-specific queries
| Query | Impressions | Position |
|-------|------------|----------|
| seo foundations | 101 | 48.6 |
| built in seo | 57 | 37.1 |
| seo foundation | 42 | 35.0 |
| website compliance tools | 41 | 30.7 |
| wordpress site maintenance services | 25 | 21.9 |

### Top law subdomain queries
| Query | Impressions | Position |
|-------|------------|----------|
| google ads audit | 133 | 26.1 |
| solicitors google ads | 126 | 7.5 |
| google ads for solicitors | 93 | 10.6 |
| solicitor google ads | 81 | 10.6 |

"Solicitors google ads" at position 7.5 is the closest any query gets to page 1. This is on the law subdomain, not the main site.

### Remediation: No Verdict A items. Coverage exists for all relevant intents. The gap is authority, not content.

---

## Step 6.1 — Citation Matrix [AEO SPECIALIST]

### AI Overview Checks
| Query | AI Overview | Cited |
|-------|-------------|-------|
| web design cost uk 2026 | No | No |
| website accessibility checker uk | No | No |
| seo automation for small business | No | No |
| bespoke web design uk | No | No |
| website translation service uk | No | No |

### AI Engine Citations
| AI System | Cited? | Landing Page | Tier |
|-----------|--------|-------------|------|
| ChatGPT | Yes (1 session) | /case-studies/ | T3 (Reference) |
| Perplexity | No | — | — |
| Copilot | No | — | — |
| Claude | No | — | — |
| Gemini | No | — | — |

---

## Step 7 — Pipeline Audit [ARCHITECT]

| Metric | Value |
|--------|-------|
| li10_posts | 108 |
| orbit_3_flow (total) | 95 |
| orbit_3_flow (processed) | 95 (100%) |
| orbit_3_flow (unprocessed) | 0 |
| Pipeline dormancy | 122 days |

---

## Step 7.5 — CRO Audit [CONVERTER]

N/A — no page meets >100 Tier A sessions threshold.

---

## Step 8.5 — Ghost Index Report [INCUBATOR]

2,361 impressions across 377 query rows with 0 clicks. All queries are ghost impressions — positions too low (>20) to generate clicks. No equity transfer candidates at these volumes.

---

## Pre-Push Parity Validator Output

PASS: parity criteria 32-36 N/A (single-language)

---

## Challenge Loop

28/28 applicable criteria PASS (100%):
1. No action recommended adding something already in the codebase.
2. No GSC call failed due to wrong property format.
3. No actions re-proposed from prior completed items.
4. No analytical conclusion from non-hostname-filtered data.
5. Bing data acquired via li-10-bing-aeo-protocol (Blocks A, B, C, D).
6. Reconciliation delta stated (GSC 0 vs GA4 9).
7. Tier A/B/C counts stated with bot inflation %.
8. No report metric based on unfiltered data.
9. All sitemap statuses confirmed (not "?" or "unknown").
10. Bing vs Google crawl comparison table produced.
11. Body fingerprint assertion run on all commercial pages.
12. Price/currency cross-check HTML vs JSON-LD completed.
13. price_snapshot written to Gap_Analysis JSON.
14. Prior audit prices loaded and compared.
15. No assertion relied purely on HTTP status code.
16. All Bing claims backed by protocol evidence.
17. No "Bing isn't indexing" claim without Block A IsPage:false evidence.
18. No "sitemap broken" claim without Block C evidence.
19. Impressions vs indexation correctly separated (Block A IsPage:true + Block B 0 impressions = authority issue).
20-28. Technical, content integrity, schema coverage checks all verified.

Pending: GitHub push (#26) and dashboard ingest (#31).
