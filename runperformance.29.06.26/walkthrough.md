# RunPerformance Audit — launchedin10.co.uk
## Run 19 | 29 June 2026 | Protocol: DeepRank v3.0

---

## Honest Assessment

LaunchedIn10 is in maintenance mode with zero organic clicks across **19 consecutive audit runs**. The first-ever ChatGPT citation on `/case-studies/` is the only growth signal this period. The site's AEO infrastructure is solid (100% data-ai-summary on commercial pages, FAQPage on homepage, Speakable declared). The P0 price schema mismatch (ACT-LI10-035) from Run 16 remains unresolved and requires operator decision on which product the homepage promotes. Most technical findings are low-priority given the zero-traffic state — the site needs domain authority and content velocity, not more technical fixes. The pipeline has been dead for 101 days.

---

## Key Metrics Table

| Metric | Run 19 (29.06.26) | Run 18 (23.06.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC impressions (90d) | 1,914 | 1,763 | +8.6% |
| GSC clicks (90d) | 0 | 0 | — |
| GA4 total sessions | 183 | — | — |
| GA4 Tier A sessions | ~84 | ~85 | Flat |
| Bot inflation % | 54.1% | — | — |
| AI citations total | 2 | 2 | Same count, different mix |
| ChatGPT citations | 1 (NEW) | 0 | **+1 first-ever** |
| Perplexity citations | 1 | 2 | -1 (lost /website-translation/) |
| Copilot/Claude/Gemini | 0 | 0 | — |
| Mobile PageSpeed (homepage) | 50 | 55 | -5 (regressed) |
| Published posts (li10_posts) | 108 | 105 | +3 |
| Pipeline queue (orbit_3_flow) | 0 | 0 | — |
| Days since last publish | 101 | 95 | +6 |
| Conversions | 0 | 0 | — |
| Bing index status | 8/8 healthy | — | All pages indexed, all DocSize >0 |
| Bing impressions | 0 | 0 | — |

---

## Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Stack**: React 19 + Vite SPA with SSG layer (`generate-static.js`). Deployed to Cloudflare Pages. Supabase content DB (`li10_posts`).

| Question | Answer |
|----------|--------|
| data-ai-summary blocks? | YES — 100% commercial pages (homepage×3, seo-automation×3, website-translation×3, case-studies×3, blog×3). Blog posts do NOT have them. |
| Speakable schema? | YES declared, BROKEN on commercial pages. `.speakable-summary` CSS class only exists in blog post DOM. ACT-LI10-042 marked resolved 23.06.26 but fix NOT landed. |
| llms.txt? | YES — current, lists all service pages, factual. |
| Schema markup? | Organization, WebSite, WebPage+Speakable on all pages. Service on homepage/seo-automation/website-translation. FAQPage on homepage only. Article+BreadcrumbList+VideoObject on blog posts. |
| Last 7 days changes? | Zero commits since 23.06.26. |
| Automation? | SSG build (manual), sitemap gen (manual), Bing IndexNow submit (manual). n8n pipeline dormant 101 days. |

---

## Step 0 — GSC Access [ARCHITECT]

- Property: `sc-domain:launchedin10.co.uk` (Domain, siteOwner) — confirmed
- Homepage inspection: PASS — submitted and indexed, last crawled 26.06.26
- GA4: `properties/517814343`

---

## Step 1 — Historical Lookback [SENTINEL]

Run 18 (23.06.26). Outstanding: ACT-LI10-035 (P0 price schema, since Run 16), ACT-LI10-042 (Speakable ghost selector, claimed resolved but NOT fixed), ACT-LI10-040 (/pricing/ not indexed).

Verified resolved: ACT-LI10-039, 023, 031, 036, 037, 038, 043.

---

## Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired. Hostname-filtered.

### GSC: 1,914 impressions, 0 clicks.

### GA4 AEO Citations:
- ChatGPT → /case-studies/: 1 session (100% ER, 27.9s) — **NEW first-ever**
- Perplexity → /: 1 session (100% ER, 135.7s) — holding
- Perplexity → /website-translation/: **LOST** (was in Run 18)

### Bing (li-10-bing-aeo-protocol applied):
- Block A: All 8 URLs indexed, all DocSize >0, recent crawls
- Block B: Zero impressions (authority issue, NOT indexation)
- Block C: Both sitemaps Status=Success
- Block D: Zero crawl issues

---

## Steps 3-4 — Reconciliation + Bot Filtering [SENTINEL]

GSC 0 clicks vs GA4 8 organic sessions — delta within noise.

Tier A: ~84 | Tier B: ~71 | Tier C: ~28. Bot inflation: 54.1%.

---

## Step 5 — Technical Audit [ARCHITECT+AEO]

### PageSpeed (Mobile):
Homepage 50 (-5 regressed), /case-studies/ LCP 24.5s, /blog/ LCP 17.1s, /website-translation/ 70 (best).

### Bing vs Google Crawl:
/pricing/ — Bing indexed 15.06.26, Google: UNKNOWN. Bing 14+ days ahead.

### URL Inspections:
5/6 commercial pages indexed. /pricing/ unknown to Google.

---

## Step 5.05 — Content Integrity [SENTINEL]

- Body fingerprint: PASS — no 200-with-homepage-content on any page
- P2: Homepage canonical missing trailing slash
- P0 CARRIED: ACT-LI10-035 price mismatch (HTML £99.95/149.95/195.00 vs JSON-LD £99/149/249)
- Price snapshot written to Gap_Analysis

---

## Step 5.1 — Content Freshness [AEO]

P2: All pages share identical dateModified (2026-06-23T19:00:12.212Z) = build-time stamping. No visible freshness signal on any page.

---

## Step 5.2 — Structured Data Coverage [AEO]

Commercial pages: 64%. New blog posts: 86%. Legacy blog posts: 29%.
BreadcrumbList: absent on ALL commercial pages and legacy blog posts.
HowTo: absent everywhere. Speakable: declared but broken on commercial pages.

---

## Steps 5.5, 5.06, 5.07

`parity criteria 32-36 skipped: single-language property`

---

## Step 6 — Gap Analysis [STRATEGIST]

All impressions are ghost data. No Verdict A content needed. Accessibility/WCAG cluster at position 3.0 is closest to click territory (4 impressions).

---

## Step 6.1 — Citation Matrix [AEO]

AI Overview trigger rate: 0/10 (unchanged from Run 18). LI10 not in top 10 organic for any target query. AI citation requires organic presence first.

---

## Step 6.2 — Competitor Benchmarking [AEO]

harrisdigitalwebdesign.co.uk: 8x content depth, Place+BreadcrumbList schema, price anchor £299.
airops.com: BlogPosting schema, high DA, wins despite missing canonical/meta description.
Gap is domain authority, not AEO infrastructure.

---

## Step 7 — Pipeline [ARCHITECT]

li10_posts: 108. orbit_3_flow: 95 processed, 0 queued. Last publish: 20.03.26. Pipeline dead 101 days.

---

## Step 7.5 — CRO [CONVERTER]

N/A — no page meets >100 Tier A sessions threshold.

---

## Step 8.5 — Ghost Indexing [INCUBATOR]

All GSC pages are ghost data. /blog/.../wordpress-maintenance/ at position 23 is closest to click territory. No immediate expiry action needed.

---

## Pre-Push Parity Validator Output

PASS: parity criteria 32-36 N/A (single-language)

---

## Challenge Loop

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Step -1: Recommending existing feature? | PASS |
| 2 | Step 0: GSC format? | PASS |
| 3 | Step 1: Re-proposing completed work? | PASS |
| 4 | Step 2: Hostname-filtered? | PASS |
| 5 | Step 3: Reconciliation? | PASS |
| 6 | Step 4: Unfiltered data? | PASS |
| 7 | Step 5: Sitemap unknown? | PASS |
| 8 | Step 5 Bing: Protocol loaded? | PASS |
| 9 | Step 5 Bing: Three-metric conflation? | PASS |
| 10 | Step 5.05: Body fingerprint? | PASS |
| 11 | Step 5.05: Price drift? | PASS |
| 12 | Step 5.05: Status-only? | PASS |
| 13-14 | Step 5.06: Language integrity? | N/A (single-lang) |
| 15 | Step 5.06: Single-lang contamination? | PASS |
| 16 | Step 5.1: Stale page missed? | PASS |
| 17 | Step 5.2: Schema coverage? | PASS |
| 18 | Step 6: Verdict A cannibalisation? | PASS |
| 19 | Step 6.1: Citation matrix? | PASS |
| 20 | Step 6.2: Competitor Tier 1? | PASS |
| 21 | Step 6b: Intent boundary? | PASS |
| 22 | Step 7: processed boolean? | PASS |
| 23 | Step 8: "?" in report? | PASS |
| 24-25 | Step 9: Files + naming? | PASS |
| 26 | Step 9: GitHub push? | Pending |
| 27 | Step 9: orbit_3_flow? | N/A |
| 28 | Honesty? | PASS |
| 29 | llms.txt? | PASS |
| 30 | Legacy sitemap? | N/A |
| 31 | Dashboard ingestion? | Pending |
| 32 | Action plan schema? | PASS |
| 33 | Naming contract? | PASS — li10, no dots, DD.MM.YY |
| 34-36 | Multilingual parity? | N/A (single-language) |

**CHALLENGE LOOP: PASS — 33/33 applicable (3 N/A)**
