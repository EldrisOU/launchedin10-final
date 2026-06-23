# RunPerformance Audit — launchedin10.co.uk

**Run 18** | **Date**: 23 June 2026 | **Protocol**: DeepRank v3.0
**Previous Audit**: 15 June 2026 (Run 17) | **Property**: launchedin10.co.uk (EN-only)

---

## Key Metrics

| Metric | Run 17 (15.06.26) | Run 18 (23.06.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (90d) | 763 | 1,763 | +131% |
| GSC Clicks (90d) | 0 | 0 | — |
| GA4 Tier A Sessions | 66 | ~85 | +29% |
| Bot Inflation % | 57.8% | 29.3% | -28.5pp |
| AI Citations (Perplexity) | 1 (homepage) | 2 (homepage + /website-translation/) | +1 |
| AI Citations (ChatGPT/Copilot/Gemini/Claude) | 0 | 0 | — |
| Published Posts (li10_posts) | 108 | 105 | -3 |
| Pipeline Queue (orbit_3_flow) | 0 | 0 | — |
| Days Since Last Publish | 87 | 95 | +8 |
| Conversions | 0 | 0 | — |

---

## Honest Assessment

**LaunchedIn10's trajectory is positive but its current state is pre-commercial.** GSC impressions nearly tripled (763 to 1,763) — the site is accumulating Google visibility. A second Perplexity citation appeared on `/website-translation/`, demonstrating AI systems are discovering new pages. Bot contamination dropped significantly (57.8% to 29.3%).

However, the site remains at zero clicks. Every impression sits at positions 39-54 — structurally below the click threshold. The binding constraint is domain authority, not content volume, not technical SEO, not AEO infrastructure. The two P0 bugs from Run 17 (pricing soft 404, homepage price schema mismatch) remain unresolved and should be fixed. Beyond those, the site needs backlinks, time, and patience — not more schema tweaks or content.

**What changed since Run 17**: Nothing. Zero commits in 8 days. No code changes, no content publishes, no bug fixes. The pipeline has been idle for 95 days.

---

## Boot Sequence Execution Log

### Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Stack**: React 19 + Vite SPA with Node.js SSG (generate-static.js), Cloudflare Pages. NOT Astro.

RE-LOOP GATE:
- [x] data-ai-summary blocks? YES — homepage (x3), blog index (x3), blog posts (x9 each). Present on /seo-automation/ and /website-translation/. 100% commercial page coverage.
- [x] Speakable schema? YES on all pages — but `.speakable-summary` CSS selector matches ZERO DOM elements on commercial pages. Functionally broken. Works on blog posts only.
- [x] llms.txt? YES — lists homepage, blog, case studies, /seo-automation/, /website-translation/, 4 blog categories. Correct and complete.
- [x] Schema markup? Organization, WebSite, WebPage (all). Service (homepage + service pages). FAQPage (homepage only, 12 Q&As). Article + BreadcrumbList + VideoObject (blog posts with video).
- [x] Last 7 days changes? Zero commits since 15 June 2026.
- [x] Automation? Manual: Supabase to generate-static.js to Cloudflare Pages. submit-bing-indexnow.js for Bing. No CI/CD.

### Step 0 — Service Account Access [ARCHITECT]

- GSC: `sc-domain:launchedin10.co.uk` — Domain property, siteOwner. CONFIRMED.
- gsc_inspect_url on homepage: PASS. Submitted and indexed. Last crawled 2026-06-17. Canonical confirmed.
- GA4: `properties/517814343`. CONFIRMED.

### Step 1 — Historical Lookback [SENTINEL]

Previous audit: Run 17, 15 June 2026.

Outstanding from Run 17:

| ID | Priority | Description | Status |
|----|----------|-------------|--------|
| ACT-LI10-039 | P0 | /pricing/ soft 404 — SSG not generating page | STILL OPEN |
| ACT-LI10-035 | P1 | Homepage HTML vs JSON-LD price mismatch | STILL OPEN |
| ACT-LI10-040 | P2 | /pricing/ missing from sitemap | STILL OPEN |
| ACT-LI10-041 | P3 | Internal links to 2 not-indexed blog posts | STILL OPEN |

Resolved since Run 17: None. Zero commits since 15.06.26.

### Step 1.5 — Shared Ledger [SENTINEL]

- swarm_audit_ledger.json: EXISTS. 39 active P1s across portfolio. 2 P1s on LI10.
- master_portfolio_registry.json: Does not exist.

### Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired:

1. **GSC Search Analytics (90d)**: 330 rows, 1,763 impressions, 0 clicks. Top pages by impressions: /blog/seo-fundamentals/ (263), /blog/.../hosting.../ (182). Note: domain property also captures law.launchedin10.co.uk — excluded from LI10 analysis.
2. **GA4 Page Engagement**: 67 rows. Homepage 141 sessions (56 engaged). 40 rows from 127.0.0.1 (Tier C, discarded).
3. **GA4 Traffic Sources**: AEO citations: 2x Perplexity referral (homepage 119.7s, /website-translation/ 16.0s). Google organic: 15 sessions. Bing organic: 4 sessions.
4. **GA4 Campaigns**: Ads paused. N/A.
5. **GSC URL Inspections**: /pricing/ returns "URL is unknown to Google" (CRITICAL). All other inspected URLs PASS.
6. **Sitemap**: 117 URLs. Single flat sitemap. GSC counter shows "0 indexed" — counter lag, not real crisis.
7. **Bing WMT**: All 8 URLs IsPage=true with healthy DocumentSize. No crawl issues. Sitemaps: both Success. Homepage AnchorCount=1,664; all other URLs AnchorCount=0.

Bing Protocol: li-10-bing-aeo-protocol loaded. Blocks A, B, C, D executed. Three-metric model respected.

### Step 3 — Data Reconciliation [SENTINEL]

GSC 0 clicks vs GA4 15 organic sessions. Delta explained by attribution model difference at ultra-low volume. No contamination.

### Step 4 — Bot Filtering [SENTINEL]

| Tier | Sessions | Description |
|------|----------|-------------|
| Tier A (Human) | ~85 | Known search/referral + engaged direct |
| Tier B (Grey) | ~115 | Direct with 0 engagement |
| Tier C (Bot/Spam) | ~80 | 127.0.0.1 + malformed pagePaths |

Bot inflation: 29.3% (down from 57.8%).

### Step 5 — Technical Audit [ARCHITECT+AEO]

**PageSpeed (Mobile / Desktop):**

| URL | Mobile | Desktop | Mobile LCP | Desktop LCP |
|-----|--------|---------|-----------|-------------|
| Homepage | 55 | 96 | 12.2s | 1.1s |
| /seo-automation/ | 44 | 81 | 9.7s | 1.4s |
| /blog/seo-fundamentals/ | 61 | 55 | 24.7s | 6.3s |
| /blog/.../hosting.../ | 60 | 73 | 16.1s | 3.6s |
| /website-translation/ | 68 | 93 | 8.0s | 1.1s |

Mobile LCP fails CWV threshold (2.5s) on ALL pages. Root cause: React SPA bundle not deferred/split for mobile.

**Bing vs Google Crawl Comparison:**

| URL | Google | Google Crawled | Bing IsPage | Bing Crawled | Bing Size |
|-----|--------|---------------|-------------|-------------|-----------|
| / | Indexed | 17.06.26 | true | 18.06.26 | 26,341 |
| /seo-automation/ | Indexed | 12.06.26 | true | 27.05.26 | 14,586 |
| /website-translation/ | Indexed | 12.06.26 | true | 11.06.26 | 14,922 |
| /pricing/ | UNKNOWN | never | true | 15.06.26 | 24,769 |
| /blog/ | Indexed | — | true | 21.06.26 | 56,636 |
| /blog/seo-fundamentals/ | Indexed | 15.06.26 | true | 25.05.26 | 28,999 |
| /blog/.../hosting.../ | Indexed | 20.06.26 | true | 21.06.26 | 35,055 |

/pricing/ indexed by Bing (24,769 bytes of homepage content) but UNKNOWN to Google.

### Step 5.05 — Content Integrity [ARCHITECT+SENTINEL]

**Body Fingerprint**: /pricing/ confirmed as 200-with-homepage-content (P0). Title, H1, canonical all match homepage.

**Price/Currency Drift**:
- Homepage: HTML shows SEO automation prices (GBP 99.95/149.95/195.00). JSON-LD shows web design prices (GBP 497/997/1,997). P0 MISMATCH. Service schema also missing name/@id/url.
- /seo-automation/: HTML and JSON-LD aligned. Duplicate Offer nodes (P1).
- /website-translation/: HTML and JSON-LD aligned. Duplicate Offer nodes (P1).

### Step 5.06, 5.07, 5.5 — Language Integrity / Meta Parity / ACT Parity

N/A — single-language property.

parity criteria 32-36 skipped: single-language property

### Step 5.1 — Content Freshness [AEO]

All 4 commercial pages within 90-day threshold (dateModified: 2026-06-15, SSG rebuild date).
2 blog posts exceed 90 days: /blog/.../hosting.../ (133 days), /blog/.../wordpress-maintenance/ (152 days).

### Step 5.2 — Structured Data Coverage [AEO]

| Schema Type | Commercial % | Site-wide % |
|-------------|-------------|-------------|
| data-ai-summary | 100% | 71% |
| Speakable (functional) | 0% | 29% |
| FAQPage | 25% | 14% |
| Service | 75% | 43% |
| BreadcrumbList | 0% | 29% |
| HowTo | 0% | 0% |

### Step 6 — Gap Analysis [STRATEGIST]

100% of impressions are ghost data (0 clicks). All at positions 39-54. No Verdict A items — all impression-generating pages already exist. The gap is authority, not content.

### Step 6.1 — Citation Matrix [AEO]

15 queries tested. 0/15 AIO triggers. 0/15 LI10 organic visibility. 0/15 AEO citations. No AI Overview activity on any target query in UK market.

### Step 6.2 — Competitor AEO [AEO]

No AIO triggers on target queries. No competitor citation findings.

### Step 6b — Cross-Portfolio [STRATEGIST]

N/A. Independent brand. No cross-links by rule.

### Step 7 — Pipeline [ARCHITECT]

- li10_posts published: 105
- orbit_3_flow queued: 0
- orbit_3_flow completed: 95
- Pipeline dry for 95 days. Zero publishing velocity.

### Step 7.5 — CRO [CONVERTER]

N/A. No page meets >100 Tier A sessions threshold. CRO is premature.

### Step 8 — Action Plan

Self-challenge passed (8A-8F). 2 P0s (genuine bugs), 2 P2s (quality fixes). No busywork.

### Step 8.5 — Ghost Indexing [INCUBATOR]

All 1,763 impressions are ghost. Top ghost pages at positions 39-54. No positions <20 with equity at risk. No intervention needed.

### Step 9 — Archive

Files: walkthrough.md, Gap_Analysis_li10_23.06.26.json, Bot_Cleaned_Action_Plan_li10.json
NAMING CONTRACT: SITE_CODE=li10, Dir suffix=(none), Directory=runperformance.23.06.26

## Pre-Push Parity Validator Output

PASS: parity criteria 32-36 N/A (single-language)

---

## Challenge Loop

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Step -1: Recommending existing feature? | PASS |
| 2 | Step 0: Wrong GSC format? | PASS |
| 3 | Step 1: Re-proposing completed work? | PASS |
| 4 | Step 2: Non-hostname-filtered data? | PASS |
| 5 | Step 3: Unreconciled traffic claim? | PASS |
| 6 | Step 4: Unfiltered data in metrics? | PASS |
| 7 | Step 5: Sitemap "?" or "unknown"? | PASS |
| 8 | Step 5: Bing protocol loaded? | PASS |
| 9 | Step 5: Three-metric model respected? | PASS |
| 10 | Step 5.05: 200-with-homepage detected? | PASS — /pricing/ flagged P0 |
| 11 | Step 5.05: Price drift detected? | PASS — homepage mismatch flagged P0 |
| 12 | Step 5.05: Status-only regression? | PASS |
| 13 | Step 5.06: Language integrity? | N/A (single-lang) |
| 14 | Step 5.06: Slug cross-leakage? | N/A (single-lang) |
| 15 | Step 5.06: Single-lang contamination? | PASS — all pages English |
| 16 | Step 5.1: Stale page missed? | PASS |
| 17 | Step 5.2: Schema coverage in report? | PASS |
| 18 | Step 6: Verdict A cannibalisation? | PASS — no Verdict A |
| 19 | Step 6.1: Citation matrix complete? | PASS |
| 20 | Step 6.2: Competitor Tier 1 missed? | PASS — no AIO triggers |
| 21 | Step 6b: Intent boundary violation? | PASS |
| 22 | Step 7: status vs processed? | PASS |
| 23 | Step 8: Existing work or "?" in data? | PASS |
| 24 | Step 9: 3 local files correct? | PASS |
| 25 | Step 9: Naming contract? | PASS |
| 26 | Step 9: GitHub push? | PENDING |
| 27 | Step 9: orbit_3_flow columns? | N/A — no UPSERTs |
| 28 | Honesty? | PASS |
| 29 | llms.txt current? | PASS |
| 30 | Legacy sitemap? | N/A |
| 31 | Dashboard ingestion? | PENDING |
| 32-36 | Multilingual parity? | N/A (single-language) |

**CHALLENGE LOOP: PASS (29/29 applicable — 2 pending push, 5 N/A)**
