# RunPerformance Audit — launchedin10.co.uk
## Run 21 | 13 July 2026 | DeepRank v3.0

**Previous audit**: Run 20, 06 July 2026 (7 days ago)
**Mode sequence**: ARCHITECT → SENTINEL → AEO SPECIALIST → STRATEGIST → CONVERTER → INCUBATOR

---

## Key Metrics Table

| Metric | Run 20 (06.07.26) | Run 21 (13.07.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (LI10 specific) | 965 | 1,006 | +41 (+4.3%) |
| GSC Impressions (law subdomain) | 1,116 | 1,184 | +68 (+6.1%) |
| GSC Clicks | 0 | 0 | 0 (21st consecutive) |
| GA4 On-Domain Sessions | 173 | 191 | +18 (+10.4%) |
| GA4 Tier A Sessions | 129 | 72 | -57 (window shift) |
| Bot Inflation | 25.4% | 62.3% | +36.9pp (window composition) |
| AI Citations (90d) | 2 | 1 (ChatGPT) | -1 (Perplexity aged out) |
| Google Organic (GA4) | 9 | 10 | +1 |
| Bing Organic (GA4) | 2 | 2 | Stable |
| Published Posts | 108 | 108 | 0 |
| Pipeline Dormancy | 108 days | 115 days | +7 |
| Active P0 | 1 | 1 | Unchanged |
| Active P1 | 1 | 0 | -1 (downgraded to P2) |

---

## Honest Assessment

LaunchedIn10 is in authority-deficit stasis. Zero organic clicks across 21 consecutive audits — no technical intervention will fix this. The site's infrastructure is technically sound: clean SSG-rendered HTML, comprehensive schema (FAQPage, Service, Article, BreadcrumbList, SpeakableSpecification), data-ai-summary blocks on all commercial pages, llms.txt current, robots.txt permissive to all crawlers, Bing fully indexed.

The problem is singular and clear: **the domain has no authority**. 108 blog posts sit dormant (no new content in 115 days), zero backlinks from authoritative external sources, and Google is making editorial decisions not to index lower-priority pages (/pricing/) because it doesn't trust the domain enough to warrant full crawl allocation.

The P0 price schema mismatch requires human decision (6th consecutive audit). Everything else is monitoring. **This site needs content velocity and external authority signals, not more technical fixes.**

---

## Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Stack**: React 19 + Vite SPA with SSG pre-rendering (generate-static.js). Cloudflare Pages. Supabase li10_posts.

### RE-LOOP GATE
- [x] data-ai-summary: YES — homepage (3), blog index (3), case-studies (3), seo-automation (3). NOT on /pricing/ or blog posts.
- [x] Speakable: YES — SpeakableSpecification with .speakable-summary on all pages via SSG.
- [x] llms.txt: EXISTS. Lists all service pages INCLUDING /pricing/ (ACT-LI10-051 resolved).
- [x] Schema: Organization+WebSite (global), WebPage+SpeakableSpecification (all), Service+FAQPage (homepage), FAQPage (case-studies), Article+BreadcrumbList (newer blogs).
- [x] Last 7 days: 2 commits on 06.07.26 — ACT writeback only. No code changes since 23.06.26.
- [x] Automation: generate-static.js, generate-sitemap.js, submit-bing-indexnow.js (all manual). Pipeline dormant 115 days.

---

## Step 0 — GSC Access [ARCHITECT]

| Check | Result |
|-------|--------|
| Property | sc-domain:launchedin10.co.uk (Domain, siteOwner) |
| Homepage inspection | PASS — indexed, crawled 08.07.26, canonical match, Breadcrumbs rich result |
| GA4 Property | properties/517814343 |

---

## Step 1 — Historical Lookback [SENTINEL]

23 audit directories in repo. Run 20 (06.07.26) is latest.

### Outstanding from Run 20
| ID | Priority | Status | Consecutive |
|----|----------|--------|-------------|
| ACT-LI10-035 | P0 | OPEN | 6th audit |
| ACT-LI10-050 | P1 | OPEN (downgraded to P2) | 2nd audit |
| ACT-LI10-042 | P3 | OPEN | 4th audit |
| ACT-LI10-047 | P3 | OPEN | 3rd audit |
| ACT-LI10-049 | P3 | OPEN | 3rd audit |

### Resolved since Run 20
| ID | Evidence |
|----|----------|
| ACT-LI10-051 | llms.txt now includes /pricing/. curl confirms. |

---

## Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired:
1. GSC Search Analytics (90d) — 2,190 impressions, 0 clicks, 357 rows
2. GA4 Page Engagement (90d) — 191 on-domain sessions
3. GA4 Traffic Sources (90d) — 36 rows, AI citations identified
4. GA4 Campaigns — N/A (no ads)
5. GSC URL Inspections — 4 pages inspected
6. Sitemap — 118 URLs parsed
7. Bing WMT (li-10-bing-aeo-protocol) — Blocks A, B, C, D executed

### Bing Protocol Results (Block A)
| URL | IsPage | DocSize | Discovered | Crawled |
|-----|--------|---------|------------|---------|
| / | true | 26,673 | 27.03.26 | 06.07.26 |
| /pricing/ | true | 26,341 | 11.05.26 | 29.06.26 |
| /case-studies/ | true | 17,528 | 19.04.26 | 29.06.26 |
| /seo-automation/ | true | 15,254 | 05.04.26 | 01.07.26 |
| /website-translation/ | true | 14,922 | 08.05.26 | 11.06.26 |

All pages fully indexed in Bing. No stale-empty-crawl issues.

**Block B**: Homepage 0 impressions/0 clicks — authority/ranking issue, NOT indexation.
**Block C**: All feeds Status=Success.
**Block D**: No crawl issues.

### Bing vs Google Comparison
| Page | Google | Bing | Winner |
|------|--------|------|--------|
| / | Indexed 08.07.26 | Crawled 06.07.26 | Bing |
| /pricing/ | NOT INDEXED | Crawled 29.06.26, 26KB | Bing only |
| /case-studies/ | Indexed 08.07.26 | Crawled 29.06.26 | Google |
| /seo-automation/ | Indexed 04.07.26 | Crawled 01.07.26 | Bing |

### AI Citations
| Source | Sessions | Page | Engaged |
|--------|----------|------|---------|
| chatgpt.com (ai-assistant) | 1 | /case-studies/ | 28s |

---

## Step 3 — Data Reconciliation [SENTINEL]

GSC clicks: 0. GA4 Google organic: 10. Delta: +10 (micro-volume noise, not actionable).

---

## Step 4 — Bot Filtering [SENTINEL]

| Tier | Sessions | % |
|------|----------|---|
| A (Human) | 72 | 37.7% |
| B (Grey) | 39 | 20.4% |
| C (Bot) | 80 | 41.9% |

Bot inflation: 62.3%. Increase from Run 20 (25.4%) is window composition shift — engaged operator sessions from mid-April dropped out.

---

## Step 5 — Technical Audit [ARCHITECT+AEO]

### Sitemap Status
| Sitemap | URLs | Last Downloaded | Bing Status |
|---------|------|-----------------|-------------|
| sitemap.xml | 118 | 09.07.26 | Success |
| sitemap-redirectfix.xml | 16 | 02.07.26 | Success |

### GSC URL Inspections
| URL | Status | Last Crawled | Rich Results |
|-----|--------|-------------|--------------|
| / | Indexed | 08.07.26 | Breadcrumbs |
| /pricing/ | Discovered - not indexed | Never | None |
| /case-studies/ | Indexed | 08.07.26 | Breadcrumbs, Image, Video |
| /seo-automation/ | Indexed | 04.07.26 | None |

---

## Step 5.05 — Content Integrity

### Body Fingerprint: PASS — all pages unique, no 200-with-homepage-content.

### Price Drift:
- Homepage: MISMATCH (P0 — HTML=SEO prices, Schema=web build prices). 6th consecutive audit.
- /pricing/: MATCH
- /seo-automation/: MATCH
- /website-translation/: MATCH

---

## Step 5.5 — Per-Language ACT Parity Gate

parity criteria 32-36 skipped: single-language property

---

## Step 6 — Gap Analysis [STRATEGIST]

### Top LI10-specific queries
| Query | Impressions | Position |
|-------|------------|----------|
| seo foundations/foundation | 138 | 35-51 |
| website compliance tools | 48 | 24.3 |
| construction websites 2026 | 32 | 31.9 |
| wordpress site maintenance | 31 | 21.9 |
| inexpensive web design companies | 25 | 18.6 |

No positions <10. No click-generating positions achieved. Authority deficit.

### Remediation: No Verdict A items. Coverage exists; authority doesn't.

---

## Step 6.1 — Citation Matrix [AEO SPECIALIST]

| AI System | Cited? | Landing Page | Tier |
|-----------|--------|-------------|------|
| ChatGPT | Yes | /case-studies/ | T3 (Reference) |
| Perplexity | No | — | Aged out |
| Copilot | No | — | — |
| Claude | No | — | — |
| Gemini | No | — | — |

---

## Step 7 — Pipeline Audit [ARCHITECT]

| Metric | Value |
|--------|-------|
| li10_posts | 108 |
| orbit_3_flow (processed) | 95/95 (100%) |
| orbit_3_flow (unprocessed) | 0 |
| Pipeline dormancy | 115 days |

---

## Step 7.5 — CRO Audit [CONVERTER]

N/A — no page meets >100 Tier A sessions threshold.

---

## Pre-Push Parity Validator Output

PASS: parity criteria 32-36 N/A (single-language)

---

## Challenge Loop

PASS: 28/28 applicable criteria (100%). All Bing claims backed by protocol evidence. No status-only assertions. No fabricated data points. No actions recommending existing features.
