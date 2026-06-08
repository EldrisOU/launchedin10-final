# RunPerformance Audit — launchedin10.co.uk
**Run 16** | 08.06.26 | Protocol: DeepRank v3.0 | Single-language (EN)

---

## Honest Assessment

LaunchedIn10 remains in incubation. 699 GSC impressions with zero clicks across 90 days. The site has 108 published blog posts, strong SSG rendering, deployed AEO infrastructure (data-ai-summary, Speakable, llms.txt, IndexNow), and correct technical setup — but lacks the domain authority to convert impressions into clicks. The content pipeline has been dormant for 80 days with zero orbit_3_flow backlog.

**The site needs authority building and time, not more content or major intervention.** Three genuine P1 issues remain: the 7-audit-old FAQPage duplicate, a homepage price schema mismatch, and a Bing stale-empty-crawl on /website-translation/. Everything else is monitoring.

---

## Key Metrics

| Metric | Run 15 (01.06.26) | Run 16 (08.06.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (90d) | 1,075 | 699 | -35% (window shift) |
| GSC Clicks (90d) | 0 | 0 | — |
| GA4 Total Sessions | 208 | 176 | -15.4% |
| Tier A (Human) Sessions | 89 | 72 | -19.1% |
| Bot Inflation | 57.2% | 59.1% | +1.9pp |
| AI Citations | 1 (Perplexity) | 1 (Perplexity) | Flat |
| Conversions | 0 | 0 | — |
| Published Posts | 108 | 108 | Flat (80d dormant) |
| orbit_3_flow Pending | 0 | 0 | — |
| Bing Index (sampled) | 6/7 healthy | 6/7 healthy | 1 stale-empty persists |

---

## Boot Sequence Walkthrough

### Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Framework**: React 19 SPA (Vite 7.2) with SSG layer (generate-static.js). NOT Astro. Deployed via Cloudflare Pages + Wrangler.

**AEO Infrastructure:**
- data-ai-summary: Present on homepage (3 blocks), /blog/ (3 blocks), /case-studies/ (3 blocks). ABSENT from /seo-automation/, /website-translation/, individual blog posts.
- Speakable: SpeakableSpecification injected into WebPage schema for all SSG pages via injectSchema().
- FAQPage: Homepage only (12 questions). /case-studies/ has duplicate FAQPage error (7th audit).
- llms.txt: Exists, well-structured, lists core services and blog categories.
- robots.txt: AI-friendly — explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended.
- IndexNow: Deployed (key: 40b3efc5ab8e4c0e9ca6163daca5d29e).

**Schema at template level:** Organization (all pages), WebSite + SearchAction (all pages), WebPage + Speakable (all pages), FAQPage (homepage), Service + Offer (homepage), Article + BreadcrumbList (blog posts), VideoObject (YouTube posts), CollectionPage (indexes).

**Last 7 days:** No code changes. Only audit artefact commits from Run 15. Content pipeline stalled 80+ days.

---

### Step 0 — Service Account Access [ARCHITECT]

- GSC: `sc-domain:launchedin10.co.uk` — Domain property, siteOwner. CONFIRMED.
- Homepage inspection: Submitted and indexed, last crawl 01.06.26, FAQ rich results PASS.
- GA4: properties/517814343 — CONFIRMED.
- NOTE: Domain property includes law.launchedin10.co.uk (~47% of total impressions). All analysis filters for main domain only.

---

### Step 1 — Historical Lookback [SENTINEL]

Previous audit: Run 15, 01.06.26 (7 days ago). 15 consecutive runs since 20.02.26.

**Outstanding from Run 15:**

| ID | Priority | Description | Audits Open |
|----|----------|-------------|-------------|
| ACT-LI10-023 | P1 | FAQPage WRS duplicate on /case-studies/ + cross-property schema leakage | **7** |
| ACT-LI10-032 | P2 | web-design-cost-2026 blog post stale (~140d) | 2 |
| ACT-LI10-033 | P3 | BreadcrumbList missing on commercial pages | 2 |
| ACT-LI10-034 | P3 | PageSpeed baseline (API quota 429 previously) | 2 |

**Resolved:** ACT-LI10-028 (IndexNow key), ACT-LI10-029 (Bing stale-empty /blog/), ACT-LI10-030 (reclassified), ACT-LI10-031 (data-ai-summary deployed).

---

### Step 2 — Data Acquisition [SENTINEL]

All 7 sources acquired:

1. **GSC (90d):** 699 impressions, 0 clicks (LI10 core). Best positions: "managed server oder shared hosting" pos 1.0, "construction website design trends" pos 6.8.
2. **GA4 Page Engagement:** 176 total sessions. Homepage 142, /case-studies/ 12, /seo-automation/ 10.
3. **GA4 Traffic Sources:** Direct 143 (81%), Google organic 12, Bing organic 4, Perplexity 1.
4. **GA4 Campaigns:** N/A — Ads PAUSED.
5. **GSC URL Inspections:** 7/7 indexed. /case-studies/ FAQPage FAIL.
6. **Sitemap:** 113 URLs (8 core + 4 category + 101 blog posts).
7. **Bing WMT (li-10-bing-aeo-protocol):**
   - Block A: 7/7 IsPage=true. 6/7 DocumentSize>0. /website-translation/ Size=0 (stale-empty).
   - Block B: 0 impressions site-wide. Authority weakness, NOT indexation.
   - Block C: 2 feeds, both Status=Success, 0 errors.
   - Block D: No crawl issues.

---

### Step 3 — Data Reconciliation [SENTINEL]

GSC organic clicks: 0. GA4 organic sessions: 16. Delta explained by deep positions and GSC sampling at low volumes. No contamination.

---

### Step 4 — Bot Filtering [SENTINEL]

| Tier | Sessions | % |
|------|----------|---|
| A (Human) | 72 | 40.9% |
| B (Grey) | 37 | 21.0% |
| C (Bot/Spam) | 67 | 38.1% |

Bot inflation: 59.1% (Run 15: 57.2%). Stable.

---

### Step 5 — Technical Audit [ARCHITECT+AEO]

**Sitemaps (GSC):**

| Sitemap | Last Downloaded | URLs | Indexed (GSC) |
|---------|-----------------|------|---------------|
| sitemap.xml | 17 Apr 2026 (52d stale) | 117 | 0 (reporting lag) |
| sitemap-redirectfix.xml | 05 Jun 2026 | 16 | 0 |

**URL Inspections:**

| Page | Indexed | Last Crawl | Rich Results |
|------|---------|-----------|-------------|
| /seo-automation/ | YES | 02 Jun | None |
| /website-translation/ | YES | 18 May | None |
| /case-studies/ | YES | 02 Jun | **FAIL — Duplicate FAQPage** |
| /blog/ | YES | 22 May | None |
| /blog/seo-fundamentals/ | YES | 22 May | None |
| /blog/website-design/ | YES | 02 Jun | None |

**PageSpeed:**

| Page | Mobile Score | Mobile LCP | Desktop Score |
|------|-------------|-----------|---------------|
| / | 55 | 10.8s | 91 |
| /seo-automation/ | 43 | 9.7s | — |
| /blog/seo-fundamentals/ | 59 | 24.1s | — |

Mobile LCP catastrophic. Desktop healthy. At 0.8 sessions/day, this is a monitoring item.

**Bing vs Google Crawl Comparison:**

| Page | Google Crawl | Bing Crawl | Bing Size |
|------|-------------|-----------|-----------|
| / | ~01 Jun | 01 Jun | 24,882 |
| /seo-automation/ | 02 Jun | 27 May | 14,586 |
| /website-translation/ | 18 May | 08 May | **0** |
| /case-studies/ | 02 Jun | 24 May | 15,539 |
| /blog/ | 22 May | 17 May | 55,968 |

---

### Step 5.05 — Content Integrity [ARCHITECT+SENTINEL]

**Body Fingerprint:** All 7 pages return unique content. No SPA catch-all false positives. PASS.

**Price/Currency Drift:**
- Homepage: **FAIL.** HTML shows £99.95/£149.95/£195.00 (SEO automation). JSON-LD shows £99/£149/£249 (web design). Internal mismatch.
- /seo-automation/: PASS. HTML and JSON-LD match.
- /website-translation/: PASS. HTML and JSON-LD match.

**Brand Markers:** All commercial pages contain "LaunchedIn10". /terms/ missing (P3).

---

### Step 5.06 — Language Integrity

SKIP — single-language EN property. All examined content confirmed English.

---

### Step 5.1 — Content Freshness [AEO]

Last new content: 20 Mar 2026 (80 days). web-design-cost-2026 post: ~140 days stale. Multiple pages past 90-day threshold. Secondary concern — authority is the bottleneck, not freshness.

---

### Step 5.2 — Structured Data Coverage [AEO]

| Schema Type | Coverage |
|-------------|----------|
| Organization/WebSite/WebPage/Speakable | 100% |
| Article + BreadcrumbList | ~89% (blog posts) |
| FAQPage | <1% (homepage only) |
| Service | ~2% |
| data-ai-summary | ~3% |
| HowTo | 0% |

No change from Run 15.

---

### Step 6 — Gap Analysis [STRATEGIST+AEO]

**Page 1 near-misses (pos 5-10):** "website design cost uk small business 2026" (pos 8.2), "construction website design trends 2026" (pos 6.8) — both Verdict B.

**Page 2 opportunities (pos 11-20):** "transparent web design pricing" (pos 15.4), "affordable website design" (pos 11.4-12.5), "wordpress maintenance" (pos 11.0) — all Verdict B.

**Topical drift:** "dedicated server hosting" cluster (176 imp) tangential to core offering. Maintenance only.

**Verdict A candidates (noted, not actioned — maintenance-only property):** "10 day website build" (core USP, no page), "bespoke website design UK" (no content).

---

### Step 6.1 — Citation Matrix [AEO]

All 10 tested queries returned NO AI Overview in UK SERPs. No LI10 pages cited. 1 Perplexity referral session (homepage). The UK web design vertical does not yet trigger AI Overviews.

---

### Step 6.2 — Competitor AEO [AEO]

No AI Overviews trigger. No competitor holds Tier 1 AEO. No P0 findings.

---

### Step 6b — Cross-Portfolio [STRATEGIST]

N/A — LI10 is non-Eldris brand. Does not cross-link with Eldris properties.

---

### Step 7 — Pipeline Audit [ARCHITECT]

| Metric | Value |
|--------|-------|
| Published (li10_posts) | 108 |
| orbit_3_flow processed | 95 |
| orbit_3_flow pending | 0 |
| Last publish | 20 Mar 2026 (80d) |

Pipeline clean but dormant.

---

### Step 7.5 — CRO [CONVERTER]

N/A — no page meets >100 Tier A sessions threshold.

---

### Step 8.5 — Ghost Indexing [INCUBATOR]

30 ghost query/page pairs (pos >50, 0 clicks). All in early incubation. No imminent equity expiry risk.

---

## Action Plan Summary

| ID | Priority | Description |
|----|----------|-------------|
| ACT-LI10-023 | P1 | FAQPage WRS duplicate on /case-studies/ (7th audit) |
| ACT-LI10-035 | P1 | Homepage HTML vs JSON-LD price mismatch |
| ACT-LI10-036 | P1 | /website-translation/ Bing stale-empty-crawl (Size=0) |
| ACT-LI10-037 | P2 | Sitemap.xml stale (52d, resubmit) |
| ACT-LI10-038 | P2 | Malformed internal link (div class in href) |
| ACT-LI10-032 | P2 | web-design-cost-2026 post ~140d stale |
| ACT-LI10-034 | P3 | Mobile LCP monitoring (10.8-24.1s) |

---

## Challenge Loop

29/29 applicable criteria PASS. 2 PENDING (GitHub push verification — criteria 24, 26).

The 3 files pushed to GitHub for launchedin10.co.uk are: walkthrough.md, Gap_Analysis_li10_08.06.26.json, Bot_Cleaned_Action_Plan_li10.json. These match the CONTEXT.md naming contract: YES.
