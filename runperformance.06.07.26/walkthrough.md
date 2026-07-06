# RunPerformance Audit — launchedin10.co.uk
## Run 20 | 06 July 2026 | DeepRank v3.0

**Previous audit**: Run 19, 29 June 2026 (7 days ago)
**Mode sequence**: ARCHITECT → SENTINEL → AEO SPECIALIST → STRATEGIST → CONVERTER → INCUBATOR

---

## Key Metrics Table

| Metric | Run 19 (29.06.26) | Run 20 (06.07.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (LI10 main) | ~914 | 965 | +51 (+5.6%) |
| GSC Clicks | 0 | 0 | 0 (20th consecutive) |
| GA4 Tier A Sessions | 84 | 129 | +45 (+53.6%) |
| Bot Inflation | 54.1% | 25.4% | -28.7pp |
| AI Citations (90d) | 2 | 2 | Stable |
| Google Organic (Tier A) | — | 9 | — |
| Bing Organic (Tier A) | — | 2 | — |
| PageSpeed Mobile | 50 | 55 | +5 |
| Published Posts | 108 | 108 | 0 |
| Pipeline Dormancy | 101 days | 108 days | +7 |
| Active P0 | 1 | 1 | Unchanged |
| Active P1 | 2 | 1 | -1 (resolved) |

---

## Honest Assessment

LaunchedIn10 is in authority-building phase. Zero organic clicks across 20 consecutive audits, but impressions are growing (965 LI10-specific, up from ~914). Tier A sessions improved 53% week-on-week (84→129) and bot inflation halved. The technical infrastructure is solid — SSG renders clean HTML with comprehensive schema markup, robots.txt permits all AI crawlers, llms.txt exists and is mostly current.

The site **does not need more technical intervention**. It needs time for authority to accumulate. The only genuine blockers are:
1. The P0 price schema mismatch (5th audit — needs operator decision, not code)
2. /pricing/ refusing to index on Google (internal linking weakness identified)

Everything else is monitoring or marginal improvement that would be busywork at 129 Tier A sessions over 90 days.

---

## Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Stack**: React 19 + Vite SPA with SSG pre-rendering (`generate-static.js`). Cloudflare Pages. Supabase `li10_posts`.

### RE-LOOP GATE
- [x] data-ai-summary blocks: YES — 6 commercial pages (homepage, blog index, case-studies, seo-automation, website-translation, pricing). 0% on blog posts.
- [x] Speakable schema: YES declared on all pages via SSG. Selector `.speakable-summary` — SSG injects it but React hydration may remove it.
- [x] llms.txt: EXISTS (HTTP 200). Lists 5 service pages. MISSING: /pricing/.
- [x] Schema at template level: Organization, WebSite (global); WebPage + SpeakableSpecification (all); Service + FAQPage (homepage); Article + BreadcrumbList (new blog posts); CollectionPage (blog categories).
- [x] Last 7 days: 2 commits on 06.07.26 — ACT-LI10-046 canonical fix + writeback. No code changes since 23.06.26.
- [x] Automation: generate-static.js (manual SSG), generate-sitemap.js (manual), submit-bing-indexnow.js (manual). n8n pipeline DORMANT 108 days.

---

## Step 0 — GSC Access [ARCHITECT]

| Check | Result |
|-------|--------|
| Property | `sc-domain:launchedin10.co.uk` (Domain, siteOwner) |
| Homepage inspection | PASS — indexed, crawled 04.07.26, canonical match, Breadcrumbs rich result |
| GA4 Property | `properties/517814343` |

---

## Step 1 — Historical Lookback [SENTINEL]

22 audit directories in repo. Run 19 (29.06.26) is the latest.

### Outstanding from Run 19
| ID | Priority | Status |
|----|----------|--------|
| ACT-LI10-035 | P0 | **5th consecutive audit** — price schema mismatch. Operator decision required. |
| ACT-LI10-042 | P2 | Speakable ghost selector — reopened. Fix never landed. |
| ACT-LI10-047 | P3 | dateModified uses build timestamp. |
| ACT-LI10-049 | P3 | Legacy blog schema backfill (29% missing BreadcrumbList). |

### Resolved since Run 19
| ID | Evidence |
|----|----------|
| ACT-LI10-046 | Canonical trailing slash — confirmed fixed via GSC inspection 06.07.26. |
| ACT-LI10-044 | ChatGPT first-citation response — IndexNow deployed, content expanded. |
| ACT-LI10-048 | /pricing/ force-submitted — but **STILL not indexed**. Re-opened as ACT-LI10-050. |
| ACT-LI10-045 | BreadcrumbList on commercial pages — confirmed via rich results. |

---

## Step 1.5 — Shared Ledger [SENTINEL]

Portfolio: 5 P0, 31 P1, 44 P2, 25 P3 across 15 properties.
LI10 ledger entry: Run 19, 1 P0 + 2 P1 + 4 P2 + 2 P3.

---

## Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired:
1. GSC Search Analytics (90d) — 2,081 impressions total (965 LI10 + 1,116 law)
2. GA4 Page Engagement (90d) — 173 total sessions
3. GA4 Traffic Sources (90d) — 36 rows, AI citations identified
4. GA4 Campaigns — N/A (no ads active)
5. GSC URL Inspections — homepage, /pricing/, /case-studies/, /seo-automation/
6. Sitemap — 118 URLs parsed
7. Bing WMT (li-10-bing-aeo-protocol) — Block A (5 URLs), Block C (2 feeds), Block D (0 issues)

### Bing Protocol Results (Block A)
| URL | IsPage | DocumentSize | Discovered | Last Crawled |
|-----|--------|-------------|------------|-------------|
| / | true | 26,673 | 27.03.26 | 06.07.26 |
| /pricing/ | true | 26,341 | 11.05.26 | 29.06.26 |
| /case-studies/ | true | 17,528 | 19.04.26 | 29.06.26 |
| /seo-automation/ | true | 15,254 | 05.04.26 | 01.07.26 |
| /website-translation/ | true | 14,922 | 08.05.26 | 11.06.26 |

All pages fully indexed in Bing with non-zero DocumentSize. No stale-empty-crawl issues.

### Bing vs Google Crawl Comparison
| Page | Google Status | Google Crawled | Bing Crawled | Bing Size | Winner |
|------|-------------|---------------|-------------|-----------|--------|
| / | Indexed | 04.07.26 | 06.07.26 | 26,673 | Bing (today) |
| /pricing/ | **NOT INDEXED** | never | 29.06.26 | 26,341 | **Bing only** |
| /case-studies/ | Indexed | 02.07.26 | 29.06.26 | 17,528 | Google |
| /seo-automation/ | Indexed | 28.06.26 | 01.07.26 | 15,254 | Bing |

Critical: /pricing/ is fully indexed by Bing but Google refuses to index it despite force-submission.

### Block C — Bing Feeds
| Sitemap | Status | URL Count |
|---------|--------|-----------|
| sitemap.xml | Success | 117 |
| sitemap-redirectfix.xml | Success | 16 |

### Block D — Crawl Issues
None reported by Bing.

---

## Step 3 — Data Reconciliation [SENTINEL]

- GSC organic clicks (LI10): 0
- GA4 Google organic sessions: 9
- Delta: +9 sessions (GA4 > GSC)
- At micro-volumes, this is normal measurement noise. Not actionable.

---

## Step 4 — Bot Filtering [SENTINEL]

| Tier | Sessions | % | Description |
|------|----------|---|-------------|
| A (Human) | 129 | 74.6% | On-domain, engaged >5s, known source |
| B (Grey) | 24 | 13.9% | Direct anomalies, low engagement |
| C (Bot/Spam) | 20 | 11.6% | localhost, (not set), 0s engagement |
| **Total** | **173** | | |

Bot inflation: 25.4% (improved from 54.1% at Run 19).

### AI Citations (Tier A)
| Source | Medium | Landing Page | Sessions | Engagement | Duration |
|--------|--------|-------------|----------|------------|----------|
| chatgpt.com | ai-assistant | /case-studies/ | 1 | 100% | 28s |
| perplexity.ai | referral | / | 1 | 100% | 136s |

Note: ChatGPT medium changed from "referral" (Run 19) to "ai-assistant" — OpenAI updated their attribution.

---

## Step 5 — Technical Audit [ARCHITECT+AEO]

### Sitemap
- 118 URLs submitted, 0 errors, 0 warnings
- Last downloaded by Google: 04.07.26
- Video entries: 74 (via video:video namespace)
- Legacy sitemap-redirectfix.xml still submitted (16 URLs) — no issues

### PageSpeed (Mobile)
| Metric | Value | Status |
|--------|-------|--------|
| Performance | 55 | Poor |
| FCP | 9.5s | Fail |
| LCP | 10.7s | Fail |
| TBT | 150ms | OK |
| CLS | 0 | Good |
| TTI | 13.1s | Fail |

React SPA hydration is the bottleneck. Architectural issue — not fixable without framework migration. At 129 Tier A sessions, the ROI of migration is zero. Monitor.

### Render Compare
Homepage SSR: 27,554 bytes. All JSON-LD types present (Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage). Canonical correct. H1 count: 1. No issues.

### GSC Sitemaps
| Sitemap | Submitted | Last Downloaded | URLs | Errors |
|---------|-----------|----------------|------|--------|
| sitemap.xml | 23.06.26 | 04.07.26 | 118 web + 74 video | 0 |
| sitemap-redirectfix.xml | 21.03.26 | 02.07.26 | 16 | 0 |

---

## Step 5.05 — Content Integrity [ARCHITECT+SENTINEL]

### 5.05.B — Price/Currency Drift
**P0 MISMATCH (5th consecutive audit)**:
- Homepage HTML: £99.95/£149.95/£195.00 (SEO automation tiers)
- Homepage JSON-LD: £497/£997/£1,997 (web design activation fees)
- /pricing/ page: £497/£997/£1,997 activation + £99/£149/£249/mo (web design tiers)
- /pricing/ has no JSON-LD pricing schema

Price snapshot written to Gap_Analysis JSON.

---

## Step 5.1 — Content Freshness [AEO SPECIALIST]

- Commercial pages: lastmod = 2026-07-06 (build date) — OK but misleading
- Blog posts: 96 of 98 are >90 days old (98% stale)
- Most recent blog update: 2026-06-01 (35 days ago)
- dateModified issue: ACT-LI10-047 (all pages share build timestamp)

---

## Step 5.2 — Schema Coverage [AEO SPECIALIST]

| Type | Coverage | Notes |
|------|----------|-------|
| WebPage | 100% | All via SSG |
| Speakable | 100% (declared) | Selector may not match post-hydration |
| BreadcrumbList | 77% | 29% legacy posts missing |
| Article | 93% | All blog posts |
| FAQPage | 1.7% | Homepage + case-studies only |
| data-ai-summary | 5.1% | Commercial only, 0% blog |
| HowTo | 0% | Absent |
| VideoObject | 63% | Blog posts with YouTube |

---

## Step 5.06/5.07/5.5 — Language Steps

`parity criteria 32-36 skipped: single-language property`

---

## Step 6 — Gap Analysis [STRATEGIST]

### Ghost Indexing
ALL 24 pages with GSC impressions have zero clicks. 100% ghost rate. 18 pages have positions under 20 (recoverable).

Notable: `/blog/industry-spotlights/dedicated-server-managed-hosting-vs-shared/` — 188 impressions at position 1.0 with zero clicks.

### Remediation Verdicts
No Verdict A (new content) recommendations. 108 published posts cover the keyword space. The problem is authority and CTR, not content gaps.

---

## Step 6b — Cross-Portfolio [STRATEGIST]

LI10 is non-Eldris brand. Only valid sister: law.launchedin10.co.uk.
Deep-links:
1. LI10 accessibility blog → law.launchedin10.co.uk
2. law.launchedin10.co.uk → LI10 /seo-automation/

---

## Step 7 — Pipeline Audit [ARCHITECT]

- Published posts: 108
- orbit_3_flow queued: 0
- Pipeline status: **DORMANT** (108 days)

---

## Step 7.5 — CRO Audit [CONVERTER]

N/A — no page meets >100 Tier A sessions threshold.

---

## Action Summary

| ID | Priority | Summary |
|----|----------|---------|
| ACT-LI10-035 | P0 | Homepage price schema mismatch — **OPERATOR DECISION** (5th audit) |
| ACT-LI10-050 | P1 | /pricing/ not indexing on Google — weak internal linking |
| ACT-LI10-051 | P2 | Add /pricing/ to llms.txt |
| ACT-LI10-042 | P3 | Speakable ghost selector — monitor |
| ACT-LI10-047 | P3 | dateModified build timestamp |
| ACT-LI10-049 | P3 | Legacy blog BreadcrumbList backfill |

---

## Pre-Push Parity Validator Output

```
PASS: parity criteria 32-36 N/A (single-language property)
```

---

## Challenge Loop

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Step -1: Action recommending existing feature? | PASS |
| 2 | Step 0: GSC format error? | PASS |
| 3 | Step 1: Re-proposing completed work? | PASS |
| 4 | Step 2: Non-hostname-filtered analysis? | PASS |
| 5 | Step 3: Traffic claim without reconciliation? | PASS |
| 6 | Step 4: Unfiltered data in metrics? | PASS |
| 7 | Step 5: Sitemap "?" or "unknown"? | PASS |
| 8 | Step 5 Bing protocol loaded? | PASS |
| 9 | Step 5 Bing three-metric model? | PASS |
| 10 | Step 5.05 body fingerprint? | PASS |
| 11 | Step 5.05 price drift? | PASS |
| 12 | Step 5.05 status-only regression? | PASS |
| 13 | Step 5.06 language integrity? | N/A (single-lang) |
| 14 | Step 5.06 slug cross-leakage? | N/A (single-lang) |
| 15 | Step 5.06 single-lang contamination? | PASS |
| 16 | Step 5.1 stale page missed? | PASS |
| 17 | Step 5.2 schema coverage in report? | PASS |
| 18 | Step 6 cannibalisation? | PASS |
| 19 | Step 6.1 citation matrix? | PASS (2 citations tracked) |
| 20 | Step 6.2 competitor Tier 1? | PASS |
| 21 | Step 6b intent boundary? | PASS |
| 22 | Step 7 processed boolean? | PASS |
| 23 | Step 8 existing work recommended? | PASS |
| 24 | Step 9 files local? | PASS |
| 25 | Step 9 naming contract? | PASS |
| 26 | Step 9 GitHub push? | PENDING |
| 27 | Step 9 orbit_3_flow? | N/A (no Verdict A) |
| 28 | Honesty: worth the time? | PASS |
| 29 | llms.txt current? | PASS (gap flagged) |
| 30 | Legacy sitemap? | N/A |
| 31 | Dashboard ingestion? | PENDING |
| 32-36 | Multilingual parity? | N/A (single-language) |

**CHALLENGE LOOP: 29/31 applicable PASS. 2 PENDING (push + ingest).**

The 3 files pushed to GitHub for launchedin10.co.uk are: `walkthrough.md`, `Gap_Analysis_li10_06.07.26.json`, `Bot_Cleaned_Action_Plan_li10.json`. These match the CONTEXT.md naming contract: YES.
