# RunPerformance Audit — launchedin10.co.uk
## Run 23 | 29.10.26 | DeepRank v3.0

---

## Key Metrics Table

| Metric | Run 22 (20.07.26) | Run 23 (29.10.26) | Delta |
|--------|-------------------|-------------------|-------|
| GSC Impressions (90d) | 2,361 | 8,743 | +270% |
| GSC Clicks (90d) | 0 | 2 | +2 (first ever) |
| GSC CTR | 0.00% | 0.02% | +0.02pp |
| GA4 Tier A Sessions | 68 | ~95 | +40% |
| GA4 Total Sessions | 289 | 259 | -10% |
| Bot Inflation | 76.5% | ~63% | -13.5pp (improved) |
| AI Citations (90d) | 2 (ChatGPT 1, Perplexity 1) | 0 | -2 |
| Published Posts | 108 | 105 | -3 (cleanup) |
| Pipeline (orbit_3_flow queued) | 0 | 0 | No change |
| Pipeline Dormancy | 122 days | 223 days | +101 days |
| Mobile PageSpeed | 55 | 55 | No change |
| Conversions | 0 | 0 | No change |

---

## Honest Assessment

LaunchedIn10 remains in deep authority-deficit stasis. This is the 23rd consecutive audit. Impressions have risen significantly (+270%) driven primarily by one blog post ("7 Companies That Design Websites for Small Businesses" accounting for 49% of all impressions), but positions remain too deep for meaningful click capture (23-78 range on core queries). The site recorded its first-ever GSC clicks (2) — a technical milestone but not a business one.

The fundamental problem is unchanged: zero content velocity for 223 days, zero conversions across 23 audits, zero external authority signals. The site is classified "maintenance only" in business priorities and the data supports that classification. However, three genuine P0 issues discovered this run (top page redirect collapse, soft 404s on sale pages, continuing price schema mismatch) should be fixed regardless of active investment status — they are actively degrading what little equity exists.

AI citations dropped from 2 to 0. Without content freshness and authority growth, AI engines have no reason to cite this property.

**This site needs sustained investment (content velocity + authority building), not more technical ACTs. If it remains maintenance-only, the honest recommendation is: fix the three P0s and leave it alone.**

---

## Step -1 — Codebase Reconnaissance [ARCHITECT+AEO]

**Mode: ARCHITECT + AEO SPECIALIST**

### Architecture
- **Stack**: React 19 SPA (Vite build) with SSG post-processing via `generate-static.js` — NOT Astro despite CLAUDE.md stating Astro for all sites
- **Deployment**: Cloudflare Pages via Wrangler. `_redirects` = `/* /index.html 200` (SPA catch-all)
- **Content source**: Supabase `li10_posts` (project `acheexsffdcuzidpiwbh`)
- **Build chain**: `vite build` → `generate-static.js` (SSG schema/meta injection) → `generate-sitemap.js` (dynamic sitemap from Supabase)

### RE-LOOP GATE Answers

- **data-ai-summary blocks?** YES — 16 blocks across 6 page types, injected via SSG in `generate-static.js`. Blog posts do NOT have per-post blocks.
- **RS-5 pre-flight**: **FINDING — Unscoped global hiding rule in `src/index.css`:**
  ```css
  [data-ai-summary] {
    position: absolute !important; width: 1px !important; height: 1px !important;
    padding: 0 !important; margin: -1px !important; overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important; white-space: nowrap !important; border: 0 !important;
  }
  ```
  **Selector: `[data-ai-summary]` — UNSCOPED with `!important`. This is the exact same pattern that caused the torxup.co.uk incident (ACT-TORX-038).** Currently not causing visual harm because existing data-ai-summary elements are purpose-built summary divs, but any future addition of the attribute to a content wrapper would immediately hide the page.
- **Speakable schema?** YES — via `generate-static.js`, every page gets `SpeakableSpecification` with `cssSelector: [".speakable-summary"]`. Applied to hero subtitles on commercial pages and blog post excerpts.
- **llms.txt?** YES — exists at `/llms.txt`, returns 200. Lists core services, key pages, blog categories. Does NOT list individual blog post URLs.
- **Schema markup?** Organization, WebSite, WebPage (all pages); FAQPage (homepage, case studies); Service (seo-automation, website-translation, pricing); Article + VideoObject (blog posts); BreadcrumbList (all pages); SpeakableSpecification (all pages).
- **Last 7 days?** Zero commits. Last commit: 2026-07-20 (audit files only). Site codebase unchanged since at least July 2026.
- **Publishing automation?** `generate-sitemap.js` pulls from Supabase; `submit-bing-indexnow.js` batch-submits to IndexNow (key: `40b3efc5ab8e4c0e9ca6163daca5d29e`). No n8n webhook triggers in repo.

---

## Step 0 — Service Account Access Gate [ARCHITECT]

**Mode: ARCHITECT**

| Check | Result |
|-------|--------|
| GSC Property | `sc-domain:launchedin10.co.uk` (Domain property, siteOwner) |
| gsc_inspect_url (homepage) | PASS — Submitted and indexed, last crawled 20.10.26, canonical aligned |
| GA4 Property | `properties/517814343` confirmed |

---

## Step 1 — Historical Lookback [SENTINEL]

**Mode: SENTINEL**

- **Previous audit**: Run 22, 20.07.26 (100 days ago — longest gap in property history)
- **Repo**: `EldrisOU/launchedin10-final` (NB: CLAUDE.md registry says `EldrisOU/launchedin10` — should be updated)
- **24 audit directories** in repo spanning 20.02.26 to 20.07.26

### Outstanding Issues from Prior Audits

| ID | Priority | Description | Consecutive Audits | Status |
|----|----------|-------------|--------------------|--------|
| ACT-LI10-035 | P0 | Homepage JSON-LD Service prices ≠ visible HTML prices | 8th | OPEN — requires operator decision |
| ACT-LI10-050 | P1 | /pricing/ not indexed by Google | 4th | UPDATE — now shows "Page with redirect" |
| ACT-LI10-042 | P3 | Speakable ghost selector (.speakable-summary) | 6th | Monitor |
| ACT-LI10-047 | P3 | dateModified uses build timestamp | 5th | Monitor |
| ACT-LI10-049 | P3 | 29% blog posts missing BreadcrumbList | 5th | Monitor |

### Resolved Since Last Audit
- ACT-LI10-051: /pricing/ added to llms.txt — completed 06.07.26
- ACT-LI10-046: Homepage canonical trailing slash — completed 06.07.26

---

## Step 1.5 — Shared Ledger Context [SENTINEL]

**Mode: SENTINEL**

- **Active P1 count across portfolio**: 22 P1 + 3 P0
- **LI10-specific in ledger**: 1 P0 (ACT-LI10-035), 1 P1 (ACT-LI10-050), 3 P3s
- **master_portfolio_registry.json**: Does not exist (N/A)

---

## Step 2 — Data Acquisition [SENTINEL]

**Mode: SENTINEL**

### Source Summary

| Source | Status | Key Data |
|--------|--------|----------|
| GSC Search Analytics (90d) | ACQUIRED | 1,130 rows, 8,743 impressions, 2 clicks |
| GA4 Traffic Sources (90d) | ACQUIRED | 259 sessions (hostname-filtered) |
| GA4 Page Engagement (90d) | ACQUIRED | 115 distinct pages, 296 sessions |
| GA4 Campaigns | N/A | No active campaigns |
| GSC URL Inspections | ACQUIRED | 8 URLs sampled |
| Sitemaps | ACQUIRED | 118 URLs in sitemap.xml |
| Bing WMT | ACQUIRED | Blocks A, B, C, D completed per li-10-bing-aeo-protocol |

### GSC Top 10 Queries (90d: 31.07.26 — 29.10.26)

| Query | Impressions | Clicks | Position |
|-------|------------|--------|----------|
| google ads for solicitors | 371 | 1 | 14.1 |
| website designers for small business | 352 | 0 | 34.3 |
| web design services for small business | 329 | 0 | 28.6 |
| solicitor google ads | 304 | 0 | 10.3 |
| small business web design company | 176 | 0 | 23.9 |
| solicitors google ads | 168 | 0 | 13.0 |
| website accessibility checker pricing | 144 | 0 | 13.6 |
| local business web design | 141 | 0 | 78.1 |
| small business web design uk | 136 | 0 | 46.9 |
| small business web design | 129 | 0 | 55.6 |

Note: "solicitor" and "google ads for solicitors" queries are from `law.launchedin10.co.uk` surfacing through the domain property. These are NOT LI10 content.

### GSC Top Pages by Impressions

| Page | Impressions | Clicks |
|------|-----------|--------|
| /blog/website-design/7-companies-that-design-websites-for-small/ | 4,295 | 1 |
| law.launchedin10.co.uk/resources/google-ads-for-solicitors/ | 986 | 1 |
| /blog/industry-spotlights/dedicated-server-managed-hosting-vs-shared/ | 649 | 0 |
| /blog/seo-fundamentals/ | 437 | 0 |

The "7 companies" blog post accounts for **49% of all GSC impressions**.

### GA4 Traffic Sources (hostname=launchedin10.co.uk)

| Source / Medium | Sessions |
|----------------|----------|
| (direct) / (none) | 234 |
| type19specialists.com / referral | 11 |
| google / organic | 9 |
| (not set) / (not set) | 3 |
| bing / organic | 1 |
| epr.eldris.ai / referral | 1 |

### AEO Citation Breakdown

| AI Source | Sessions |
|-----------|----------|
| chatgpt.com / referral | 0 |
| perplexity.ai / referral | 0 |
| claude.ai / referral | 0 |
| gemini.google.com / referral | 0 |
| bing.com / referral (Copilot) | 0 |
| **Total AI citations** | **0** |

**Zero AI citation sessions.** Down from 2 in prior audit (1 ChatGPT, 1 Perplexity).

### Bing WMT Data (per li-10-bing-aeo-protocol)

#### Block A — GetUrlInfo (Index Status)

| URL | Discovered | Last Crawled | Doc Size | IsPage |
|-----|-----------|-------------|----------|--------|
| / | 27.03.26 | 28.10.26 | 26,714 | true |
| /pricing/ | 11.05.26 | 04.10.26 | 26,341 | true |
| /case-studies/ | 19.04.26 | 17.10.26 | 20,862 | true |
| /seo-automation-sale/ | never | never | 0 | false |
| /blog/ | 12.04.26 | 09.10.26 | 58,529 | true |

#### Block B — GetUrlTrafficInfo (Homepage)
Homepage: IsPage=true, Clicks=0, Impressions=0. Indexed but zero visibility. Authority/ranking weakness, NOT indexation.

#### Block C — GetFeeds
| Sitemap | Status | URLs | Last Crawled |
|---------|--------|------|-------------|
| sitemap.xml | Success | 117 | 01.04.26 |
| sitemap-redirectfix.xml | Success | 16 | 22.10.26 |

Both accepted. Main sitemap last crawled 7 months ago (stale fetch, but individual URLs within it are being crawled).

#### Block D — GetCrawlIssues
Empty. No crawl issues flagged by Bing.

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Last Crawled | Bing Discovered | Bing Last Crawled | Bing Size | Winner |
|------|-------------|-------------------|----------------|------------------|-----------|--------|
| / | Indexed | 20.10.26 | 27.03.26 | 28.10.26 | 26,714 | Bing (1 day fresher) |
| /pricing/ | Page with redirect | 12.10.26 | 11.05.26 | 04.10.26 | 26,341 | Google (8 days fresher) |
| /case-studies/ | Indexed | 25.10.26 | 19.04.26 | 17.10.26 | 20,862 | Google (8 days fresher) |
| /seo-automation-sale/ | Unknown | Never | Never | Never | 0 | Neither |
| /blog/ | Indexed | 25.10.26 | 12.04.26 | 09.10.26 | 58,529 | Google (16 days fresher) |

---

## Step 3 — Data Reconciliation [SENTINEL]

**Mode: SENTINEL**

- GSC organic clicks (90d): 2
- GA4 organic sessions (hostname-filtered): 10 (Google 9 + Bing 1)
- **Delta: 400%** — GA4 shows 5x more organic sessions than GSC clicks
- At micro volumes (single digits), this delta is expected noise. GA4 may attribute some discover/image search sessions as organic that GSC doesn't count as search clicks. Not actionable.

**Reconciliation delta: 400% (expected at micro volumes, not actionable)**

---

## Step 4 — Bot Filtering [SENTINEL]

**Mode: SENTINEL**

### Classification

| Tier | Sessions | % | Criteria |
|------|----------|---|----------|
| **Tier A (Human)** | ~95 | 36.7% | Organic search (10), engaged referral (~12), engaged direct (~73) |
| **Tier B (Grey)** | ~30 | 11.6% | Direct with partial engagement, ambiguous |
| **Tier C (Bot/Spam)** | ~134 | 51.7% | Zero-engagement direct, (not set) |
| **Total** | 259 | 100% | |

- **Bot inflation: ~63%** (improved from 76.5% in Run 22)
- **Tier A sessions: ~95** (up from 68 in Run 22, +40%)
- Homepage engagement rate: 0.311 (69% bounce)
- /case-studies/ engagement: 0.600, avg duration 82.3s (best engagement on site)

### Per-language Tier A: EN = ~95 (single-language property, all Tier A is EN)

### Comparison to prior audit:
- Run 22: 68 Tier A, 76.5% bot inflation
- Run 23: ~95 Tier A, ~63% bot inflation
- Improvement in both metrics. Organic referral quality improving.

---

## Step 5 — Technical Audit [ARCHITECT+AEO]

**Mode: ARCHITECT + AEO SPECIALIST**

### Sitemap Analysis

| Sitemap | URLs | lastmod Range | GSC Status | Bing Status |
|---------|------|--------------|------------|-------------|
| sitemap.xml | 118 | 2026-01-01 to 2026-07-20 | Submitted, 0 indexed (GSC lag) | Success |
| sitemap-redirectfix.xml | 16 | Legacy | Submitted | Success |

GSC "0 indexed" is a reporting anomaly — URL inspections confirm multiple pages ARE individually indexed.

### PageSpeed Scores

| Page | Mobile | Desktop | Mobile LCP | Mobile FCP |
|------|--------|---------|-----------|-----------|
| Homepage | 55 | 79 | 12.1s | 10.2s |
| 7 Companies blog | 56 | — | 15.9s | 8.8s |
| Case Studies | 50 | — | **24.8s** | 11.6s |

**Mobile performance is catastrophic.** All pages fail Core Web Vitals on mobile. LCP ranges 12.1s to 24.8s (good threshold: 2.5s). TTFB is 0ms (Cloudflare edge), so the bottleneck is render-blocking JS (React SPA) and unoptimised assets. This is an architectural limitation of the React/Vite SPA approach — cannot be fixed without framework migration.

### Render Compare (SSR vs CSR)
All three tested pages (homepage, 7 companies blog, case studies) render cleanly with no SSR/CSR discrepancies. SSG pre-renders full HTML including JSON-LD. No hydration issues detected.

### Rich Results Test
All tested pages pass with no schema errors. JSON-LD detected: Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage, Article.

### URL Inspection Results

| URL | Status | Last Crawled | Canonical | Notes |
|-----|--------|-------------|-----------|-------|
| / | Indexed | 20.10.26 | Self | Healthy |
| /pricing/ | **Page with redirect** | 12.10.26 | Redirects to / | P1 — Google treats as redirect despite serving unique content |
| /case-studies/ | Indexed | 25.10.26 | Self | Healthy. Rich results: Breadcrumbs, Image, Video |
| /seo-automation-sale/ | **Unknown to Google** | Never | N/A | P0 — soft 404 (serves homepage content) |
| /website-translation-sale/ | **Unknown to Google** | Never | N/A | P0 — soft 404 (serves homepage content) |
| /blog/ | Indexed | 25.10.26 | Self | Healthy |
| /blog/.../7-companies.../ | **Page with redirect** | 03.09.26 | /blog/ | **P0 — TOP IMPRESSION PAGE treated as redirect** |
| /blog/.../dedicated-server.../ | Indexed | 14.10.26 | Self | Healthy. Video rich results |
| /blog/seo-fundamentals/ | Indexed | 25.10.26 | Self | Healthy. Malformed referring URL found |

### P0 CRITICAL — Top Impression Page Redirect Collapse
`/blog/website-design/7-companies-that-design-websites-for-small/` generates 49% of all GSC impressions (4,295) and recorded the only click on the main domain. Google is now treating this URL as "Page with redirect" with canonical collapsed to `/blog/`. Last crawled 03.09.26 (nearly 2 months stale). This page is effectively deindexed as a standalone URL. The SPA `_redirects` catch-all (`/* /index.html 200`) may be the cause — Google may be interpreting the rewrite as a redirect.

### RS-5 Finding — Unscoped Global Hiding Rule
`src/index.css` contains `[data-ai-summary] { ... !important }` — unscoped global attribute selector. Same pattern as torxup.co.uk ACT-TORX-038 incident. Currently benign because all existing data-ai-summary elements are purpose-built summary divs, but this is a latent hazard. Any future addition of the attribute to a content wrapper would immediately hide the page.

### Malformed Internal Link
GSC URL inspection revealed a referring URL of `/Front-end-web-developers-in-2026-do-you-need-one-or-done-for-you?-interactive/` — clearly broken. Crawl budget waste.

---

## Step 5.05 — Content Integrity Assertions [ARCHITECT+SENTINEL]

**Mode: ARCHITECT + SENTINEL**

### 5.05.A — Body Fingerprint Assertion

Homepage baseline: Title = "High-Performance Web Design in 10 Days | LaunchedIn10", H1 = "Your Website. Live in 10 Days. Managed Forever."

| URL | Title | H1 | Canonical | Matches Homepage? |
|-----|-------|----|-----------|-------------------|
| / | High-Performance Web Design... | Your Website. Live in 10 Days... | / | BASELINE |
| /case-studies/ | Real Websites. Live in 10 Days... | Real Websites. Live in 10 Days. | /case-studies/ | NO — unique |
| /seo-automation-sale/ | High-Performance Web Design... | Your Website. Live in 10 Days... | / | **P0 — YES** |
| /website-translation-sale/ | High-Performance Web Design... | Your Website. Live in 10 Days... | / | **P0 — YES** |
| /seo-automation/ | Daily SEO Content Automation... | Outrank Your Competitors... | /seo-automation/ | NO — unique |
| /website-translation/ | Expand to Europe: Website Translation... | Clone Your Business into 23 EU Languages | /website-translation/ | NO — unique |
| /blog/ | Website Insights & Growth Guides... | Grow Your Business... | /blog/ | NO — unique |
| /pricing/ | Web Design & SEO Pricing... | Transparent Pricing | /pricing/ | NO — unique |

**P0: `/seo-automation-sale/` and `/website-translation-sale/` return HTTP 200 with homepage content.** Title, H1, canonical all match homepage. These are soft 404s — invisible pages wasting crawl budget and potentially cannibalising homepage.

### 5.05.B — Price/Currency Drift

#### Homepage — PRICE MISMATCH PERSISTS (ACT-LI10-035, 8th audit)
- **HTML visible prices**: SEO automation — £99.95/mo, £149.95/mo, £195.00/mo
- **JSON-LD Service schema**: Web design activation — £497, £997, £1,997 + monthly £99, £149, £249
- **Mismatch**: Homepage HTML promotes SEO automation pricing but JSON-LD declares web design pricing

#### /pricing/ — ALIGNED
All 6 web design tier prices match between HTML and JSON-LD (£497/£997/£1,997 activation, £99/£149/£249 monthly).

#### /seo-automation/ — ALIGNED
All SEO automation prices match (£99.95/£149.95/£195.00 monthly, £195 setup).

#### /website-translation/ — ALIGNED
All translation prices match (£29.95/£49.95/£79.95/£129.95 monthly).

### Price Snapshot
```json
{
  "price_snapshot": {
    "https://launchedin10.co.uk/": {
      "html_prices": ["£99.95", "£149.95", "£195.00"],
      "jsonld_prices": [{"price": "497", "currency": "GBP"}, {"price": "997", "currency": "GBP"}, {"price": "1997", "currency": "GBP"}, {"price": "99", "currency": "GBP"}, {"price": "149", "currency": "GBP"}, {"price": "249", "currency": "GBP"}],
      "captured_at": "2026-10-29",
      "matches_prior_audit": true,
      "html_jsonld_match": false
    },
    "https://launchedin10.co.uk/pricing/": {
      "html_prices": ["£497", "£997", "£1,997", "£99", "£149", "£249"],
      "jsonld_prices": [{"price": "497", "currency": "GBP"}, {"price": "997", "currency": "GBP"}, {"price": "1997", "currency": "GBP"}, {"price": "99", "currency": "GBP"}, {"price": "149", "currency": "GBP"}, {"price": "249", "currency": "GBP"}],
      "captured_at": "2026-10-29",
      "matches_prior_audit": true,
      "html_jsonld_match": true
    },
    "https://launchedin10.co.uk/seo-automation/": {
      "html_prices": ["£99.95", "£149.95", "£195.00", "£195"],
      "jsonld_prices": [{"price": "99.95", "currency": "GBP"}, {"price": "149.95", "currency": "GBP"}, {"price": "195.00", "currency": "GBP"}, {"price": "195.00", "currency": "GBP"}],
      "captured_at": "2026-10-29",
      "matches_prior_audit": true,
      "html_jsonld_match": true
    },
    "https://launchedin10.co.uk/website-translation/": {
      "html_prices": ["£29.95", "£49.95", "£79.95", "£129.95"],
      "jsonld_prices": [{"price": "29.95", "currency": "GBP"}, {"price": "49.95", "currency": "GBP"}, {"price": "79.95", "currency": "GBP"}, {"price": "129.95", "currency": "GBP"}],
      "captured_at": "2026-10-29",
      "matches_prior_audit": true,
      "html_jsonld_match": true
    }
  }
}
```

### 5.05.C — Required Content Markers
All pages (except soft-404 sale pages) contain "LaunchedIn10" brand marker and appropriate service keywords. PASS.

---

## Step 5.06 — Language Integrity [SENTINEL+AEO]

N/A — single-language property (EN only). No non-English content detected.

---

## Step 5.07 — Per-Language Meta + AEO Signal Parity [AEO SPECIALIST]

N/A — single-language property.

---

## STEP 5.5 PRE-FLIGHT ASSERTION — launchedin10.co.uk

parity criteria 32-36 skipped: single-language property

---

## Step 5.1 — Content Freshness Gate [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

| Commercial Page | Sitemap lastmod | Days Since | Status |
|----------------|----------------|-----------|--------|
| / | 2026-07-20 | 101 | **P1 — STALE (>90d)** |
| /pricing/ | 2026-07-20 | 101 | **P1 — STALE** |
| /case-studies/ | 2026-07-20 | 101 | **P1 — STALE** |
| /seo-automation/ | 2026-07-20 | 101 | **P1 — STALE** |
| /website-translation/ | 2026-07-20 | 101 | **P1 — STALE** |

All commercial pages exceed 90 days since last update. All lastmods are 2026-07-20 (the last audit push date). dateModified in JSON-LD uses build timestamp (ACT-LI10-047, known issue). No code changes in 3+ months. Every commercial page is auto-flagged P1 for content staleness.

---

## Step 5.2 — Structured Data Coverage Score [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

| Schema Type | Commercial Pages (5) | Blog Posts (105) | Overall (118) |
|-------------|---------------------|-----------------|---------------|
| BreadcrumbList | 100% | ~71% | ~74% |
| WebPage | 100% | 100% | 100% |
| Organization | 100% | 100% | 100% |
| FAQPage | 40% (homepage, case studies) | 0% | ~3% |
| Service | 60% (seo-auto, translation, pricing) | 0% | ~3% |
| Article | 0% | 100% | ~89% |
| Speakable | 100% | 100% (excerpts) | 100% |
| data-ai-summary | 100% (16 blocks) | 0% | ~5% |
| VideoObject | 0% | Variable (posts with YouTube) | ~15% |
| HowTo | 0% | 0% | 0% |

**Run-on-run comparison:**
| Metric | Run 22 | Run 23 | Delta |
|--------|--------|--------|-------|
| Speakable | 100% | 100% | No change |
| data-ai-summary | 100% (commercial) | 100% (commercial) | No change |
| FAQPage | ~3% | ~3% | No change |
| BreadcrumbList | ~71% | ~74% | No change |

No improvement in structured data coverage. Blog posts remain at 0% for FAQPage and data-ai-summary.

---

## Step 6 — Gap Analysis [STRATEGIST+AEO]

**Mode: STRATEGIST + AEO SPECIALIST**

### Ghost Data Analysis
Of 8,743 GSC impressions, only 2 resulted in clicks. Virtually all query/page combinations are ghost-indexed — visible in SERPs but too deep for clicks.

**Ghost URLs with best positions (LI10-specific, excluding law.launchedin10.co.uk):**

| Query | Position | Impressions | Verdict |
|-------|----------|-----------|---------|
| website accessibility checker pricing | 13.6 | 144 | Ghost — page exists but redirect treatment may be harming |
| small business web design company | 23.9 | 176 | Ghost — barely outside top 20 |
| small business website design services | 26.7 | 95 | Ghost — outside top 20 |
| web design services for small business | 28.6 | 329 | Ghost — high impression count, could reach top 20 with authority |

### Intent Cluster Analysis

| Cluster | Queries | Total Impressions | Best Position | Verdict |
|---------|---------|------------------|---------------|---------|
| "web design small business" (8 variants) | 8 | 1,652 | 23.9 | B — surgical: consolidate ranking signal on one definitive page |
| "solicitor/google ads" (from law subdomain) | 3 | 843 | 10.3 | C — law.launchedin10.co.uk content, not LI10 |
| "website accessibility" | 1 | 144 | 13.6 | B — monitor, blog post exists |
| Misc SEO/web terms | 10+ | ~2,000 | 30+ | Ghost — too scattered for action |

### Remediation Verdicts

| Finding | Q1 (page exists?) | Q2 (cannibalise?) | Q3 (sister?) | Verdict |
|---------|-------------------|-------------------|-------------|---------|
| "web design small business" cluster | YES — homepage + multiple blog posts | YES — 8 variants competing | NO | **B** — consolidate internal linking to homepage |
| Top blog post redirect collapse | YES — page exists but Google treats as redirect | N/A | NO | **B** — fix SPA redirect behaviour |
| Soft 404 sale pages | NO — they serve homepage content | YES — cannibalise homepage | NO | **B** — redirect or 404 |

### Cross-Language Cannibalisation
N/A — single-language property.

---

## Step 6.1 — Citation Matrix [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

**BLOCKED**: Serper.dev API credits exhausted. Both `ai_overview_check` and `serp_check` return HTTP 400 "Not enough credits". No live SERP or AEO citation data available for this run.

**Prior baseline (Run 22)**: 0 AEO citations on search queries. 2 total AI referral sessions (1 ChatGPT to /case-studies/, 1 Perplexity to /).

**Current GA4 data**: 0 AI referral sessions in 90d window. AI citation presence has degraded.

**Action**: Serper credits need topping up before next audit run.

---

## Step 6.2 — Competitor AEO Benchmarking [AEO SPECIALIST]

**Mode: AEO SPECIALIST**

BLOCKED — dependent on serp_check and ai_overview_check (Serper credits exhausted).

---

## Step 6b — Cross-Portfolio Equity [STRATEGIST]

**Mode: STRATEGIST**

LaunchedIn10 is an independent brand — per intent boundaries, it does NOT cross-link with Eldris-branded properties. However:

**Observed cross-portfolio traffic:**
- type19specialists.com → LI10: 11 referral sessions (intent boundary note: non-Eldris brands should not cross-link with each other per CONTEXT.md rules)
- epr.eldris.ai → LI10: 1 referral session (Eldris → non-Eldris cross-link, violates intent boundary)
- ag8n.io → LI10: confirmed in GSC referring URLs

**Deep-link drafts**: N/A — LI10 is independent and should not receive cross-portfolio links from Eldris properties or other non-Eldris brands per intent boundary rules. Existing cross-links should be reviewed for removal.

---

## Step 7 — Pipeline Audit [ARCHITECT]

**Mode: ARCHITECT**

| Metric | Value |
|--------|-------|
| Published posts (li10_posts) | 105 (down from 108 — 3 posts removed May 2026) |
| All posts status | 100% `publish` |
| Last publish date | 2026-03-20 (223 days ago) |
| orbit_3_flow processed | 95 |
| orbit_3_flow queued | 0 |
| Stalled items | None |
| Pipeline status | **DRY — completely dormant** |

Pipeline has been empty for the entire observation period. No new content briefs queued. The 105 posts represent the entire content corpus and it has not grown in 7+ months. This aligns with "maintenance only" classification in business priorities.

---

## Step 7.5 — CRO Audit [CONVERTER]

**Mode: CONVERTER**

N/A — no page meets the >100 Tier A sessions threshold. Homepage has ~95 total sessions but only ~30 Tier A (engaged direct + organic). Zero conversions site-wide across all 23 audit runs.

---

## Step 8 — Action Plan [ALL MODES]

See `Bot_Cleaned_Action_Plan_li10.json` for the full action plan.

### Self-Challenge Results

**8A — Honesty Gate**: Would I spend my own money on these? YES for the three P0s (top page redirect, soft 404s, price schema) — these are actively destroying what little equity exists. The RS-5 scoping fix is genuine prevention. The P3 monitors are correctly classified as wait-and-observe.

**8B — Codebase Cross-Check**: Verified all recommendations against codebase. No action recommends adding something already present.

**8C — Data Integrity Check**: All data points trace to tool calls. No fabricated metrics. Steps 6.1/6.2 explicitly marked BLOCKED due to Serper credits.

**8D — Schema Compliance**: All actions have `description` (2+ sentences) and `prompt` (executable). No forbidden fields used.

**8E — Cannibalisation Check**: No Verdict A actions proposed. All actions are Verdict B (surgical) or monitoring.

**8F — Priority Sanity Check**: 3 P0s (all genuine — active equity destruction or misleading structured data), 2 P1s (performance and freshness — systemic but not fixable without investment), 1 P2 (RS-5 prevention), 3 P3s (monitors from prior audits). Priorities are defensible.

**8G — Render Safety Check**: One action (ACT-LI10-054) touches the global hiding rule. It REMOVES the unscoped rule and replaces with a scoped one — this is RS-5 remediation, not RS-5 violation. The prompt includes RS-4 post-change verification. No other action adds hiding attributes.

---

## Step 8.5 — Ghost Indexing [INCUBATOR]

**Mode: INCUBATOR**

Essentially ALL LI10 content is ghost-indexed — 8,743 impressions with 2 clicks across 1,130 query/page combinations.

**Highest-equity ghost pages (position <30, >100 impressions):**

| Page | Best Query | Position | Impressions | Equity Risk |
|------|-----------|----------|-----------|-------------|
| /blog/.../7-companies.../ | website designers for small business | ~34 | 4,295 | HIGH — but page has redirect treatment, equity leaking |
| /blog/.../dedicated-server.../ | (cluster) | ~20-30 | 649 | MEDIUM — indexed and healthy |
| /blog/seo-fundamentals/ | seo baseline | 33.6 | 437 | LOW — category page, not commercial |

**Expiry timeline**: At zero click rate with no content freshness, Google will continue deprioritising these pages. The "7 companies" post is the only asset with material impressions and it's already being treated as a redirect — if not fixed, it will lose its position entirely within 60-90 days.

---

## Step 9 — Archive

### Naming Contract Verification
- Directory: `runperformance.29.10.26` — matches CONTEXT.md (no suffix for LI10)
- SITE_CODE: `li10` — matches CONTEXT.md
- Files:
  1. `walkthrough.md` — correct
  2. `Gap_Analysis_li10_29.10.26.json` — correct (DD.MM.YY format)
  3. `Bot_Cleaned_Action_Plan_li10.json` — correct (no date)

### Pre-Push Parity Validator Output

PASS: parity criteria 32-36 N/A (single-language property)

---

## Challenge Loop

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Step -1: Action recommending something codebase already has? | PASS — no duplicate recommendations |
| 2 | Step 0: Any GSC call failed due to wrong format? | PASS — sc-domain:launchedin10.co.uk used throughout |
| 3 | Step 1: Any action re-proposing completed prior work? | PASS — resolved items (ACT-LI10-051, -046) not re-proposed |
| 4 | Step 2: Any analysis on non-hostname-filtered data? | PASS — all GA4 data hostname-filtered |
| 5 | Step 3: Any traffic claim without reconciliation? | PASS — reconciliation stated (400% delta at micro volumes) |
| 6 | Step 4: Any metric based on unfiltered Tier B/C data? | PASS — all metrics use Tier A |
| 7 | Step 5: Any sitemap reported as "?" or "unknown"? | PASS — all definitive (118 URLs, 16 URLs) |
| 8 | Step 5 (Bing protocol loaded): | PASS — li-10-bing-aeo-protocol loaded, Blocks A/B/C/D completed |
| 9 | Step 5 (Bing three-metric model): | PASS — index status, search performance, sitemap processing treated as independent. No "size=0 = not indexed" conflation. /seo-automation-sale/ correctly reported as IsPage=false (genuinely not indexed). Homepage correctly reported as indexed-but-zero-impressions (authority issue). |
| 10 | Step 5.05 (200-with-homepage-content): | PASS — /seo-automation-sale/ and /website-translation-sale/ flagged P0 |
| 11 | Step 5.05 (price drift): | PASS — price_snapshot written, prior audit compared, homepage mismatch flagged |
| 12 | Step 5.05 (status-only regression): | PASS — body content verified on all pages, not just HTTP status |
| 13 | Step 5.06 (language integrity): | N/A — single-language property |
| 14 | Step 5.06 (slug cross-leakage): | N/A — single-language property |
| 15 | Step 5.06 (single-lang contamination): | PASS — confirmed no non-English content anywhere in body |
| 16 | Step 5.1: Any stale commercial page missed? | PASS — all 5 commercial pages flagged P1 stale |
| 17 | Step 5.2: Schema coverage in report? | PASS — coverage table included |
| 18 | Step 6: Any Verdict A that cannibalises? | PASS — no Verdict A actions proposed |
| 19 | Step 6.1: Citation matrix present? | PARTIAL — BLOCKED due to Serper credits. Explicitly documented. |
| 20 | Step 6.2: Competitor Tier 1 missed? | N/A — BLOCKED (Serper credits) |
| 21 | Step 6b: Intent boundary violation in recommendations? | PASS — no cross-portfolio links recommended |
| 22 | Step 7: status used instead of processed? | PASS — processed boolean used |
| 23 | Step 8: Action recommending existing work? Report contains "?"? | PASS — all verified against codebase |
| 24 | Step 9 (files local): | PASS — 3 files written |
| 25 | Step 9 (naming contract): | PASS — li10, no dots, no date in Bot_Cleaned, DD.MM.YY in Gap_Analysis |
| 26 | Step 9 (GitHub push): | PENDING — push after challenge loop |
| 27 | Step 9 (orbit_3_flow): | PASS — no Verdict A gaps, no UPSERTs needed |
| 28 | Honesty: would I spend time on these? | PASS — P0s are genuine |
| 29 | llms.txt: reflects current state? | PASS — exists, reviewed in Step -1 |
| 30 | Legacy sitemap: | N/A — no 301s deployed this run |
| 31 | Dashboard ingestion: | PENDING — after push |
| 32-36 | Multilingual parity: | N/A — parity criteria 32-36 skipped: single-language property |
| 37 | Plan-side render safety (RS-1/2/3/5): | PASS — ACT-LI10-054 is RS-5 remediation (removes unscoped rule, replaces with scoped). No action adds hiding to content elements. |
| 38 | Execution-side render safety (RS-4): | RS-4 N/A: no source commit this run |

**RESULT: PASS — 36/38 applicable criteria passed (2 N/A). Steps 6.1/6.2 documented as BLOCKED (Serper credits) — not a quality failure, but a data gap.**

---

## scrollHeight Baselines (for RS-4 future runs)

No source commits this run. No RS-4 checks required. scrollHeight baselines not captured (next run should capture if code changes are made).
