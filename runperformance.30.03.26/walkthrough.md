# LI10 DeepRank Audit #7 — 2026-03-30

## Verdict: PATIENCE PHASE — STRUCTURAL FIXES COMPLETE, TWO INDEXING GAPS REMAIN

LaunchedIn10 completed a massive AEO remediation sprint on 28.03.26 (8 action items). Schema coverage surged from <15% to >90%. SSR JSON-LD is confirmed working. AI crawler access configured. IndexNow key deployed. GA4 conversion events live.

However, two prior audit actions were **prematurely marked complete**:
1. `/website-translation/` remains "URL is unknown to Google" — the trailing-slash canonical has never been crawled
2. `/case-studies/` still shows duplicate FAQPage ERROR in GSC — the fix IS deployed (confirmed by render_compare) but Google hasn't re-crawled since 21.03.26

The cross-portfolio Bing size=0 issue persists. All LI10 pages are invisible to Bing, blocking ChatGPT and Copilot citation potential entirely.

### Key Metrics

| Metric | 27.03.26 | 30.03.26 | Delta |
|--------|----------|----------|-------|
| GSC Impressions (90d) | ~86 | ~140 | +63% |
| GSC Clicks (90d) | 0 | 0 | Flat |
| GA4 On-Domain Sessions (90d) | 774 | 732 | -5.4% |
| Tier A Human Sessions (90d) | ~142 | ~155 | +9% |
| Bot Inflation (all hostnames) | 31.9%* | 82.1% | Methodology change |
| Published Posts | 108 | 108 | Flat |
| AI Referral Sessions | 0 | 0 | Flat |
| Bing Pages Crawled (size>0) | 0 | 0 | Flat |
| Schema Coverage (overall) | <15% | >90% | +75pp |
| Orbit3Flow Pending | 0 | 0 | Clear |

*Prior audit excluded off-domain pages.dev traffic from total. This audit includes all hostnames for accuracy.

### Honest Assessment

This site needs patience and two specific fixes — nothing more. The 28.03.26 remediation was comprehensive and well-executed. The structural foundation is now sound: SSR JSON-LD, Speakable, VideoObject, Article schema, IndexNow key, AI crawler access — all confirmed live and working.

The two outstanding items (/website-translation indexing + /case-studies re-crawl) are quick fixes: force-submit one URL, request re-crawl on another. The Bing issue is cross-portfolio and needs Cloudflare investigation, not a per-site fix.

108 blog posts with ~140 GSC impressions and 0 clicks tells the story: Google knows the content exists but doesn't trust the domain yet. Authority takes months. More content is not the answer. More intervention is not the answer. Time is.

### Technical Health

| Page | Index Status | Last Crawled | Rich Results | Notes |
|------|-------------|-------------|--------------|-------|
| / | Indexed | 23.03.26 | FAQ PASS | SSR JSON-LD: Org+WebSite+WebPage+Service+FAQPage |
| /blog/ | Indexed | 22.03.26 | — | Clean |
| /seo-automation/ | Indexed | 21.02.26 | — | 37 days since crawl (stale but indexed) |
| /case-studies/ | Indexed | 21.03.26 | FAQ ERROR (duplicate) | Fix deployed 28.03, not re-crawled |
| /website-translation/ | Unknown to Google | Never | — | P1 — non-slash variant: redirect error |
| /website-translation (no slash) | Redirect error | 17.02.26 | — | 308 to /website-translation/ (CF) |

**Sitemap**: 117 URLs submitted (21.03.26). Last downloaded 21.03.26 — 9 days stale. Updated 28.03.26 with video entries. 0 indexed per GSC sitemap report.

**render_compare Results**:
| Page | SSR JSON-LD | Types | Canonical | Issues |
|------|------------|-------|-----------|--------|
| / | true | Org, WebSite, WebPage, Service, FAQPage | launchedin10.co.uk | None |
| /case-studies/ | true | Org, WebSite, WebPage | .../case-studies/ | None (FAQPage correctly removed) |
| /website-translation/ | true | Org, WebSite, WebPage, Service | .../website-translation/ | None |
| /seo-automation/ | true | Org, WebSite, WebPage, Service | .../seo-automation/ | None |

### Bing vs Google Crawl Comparison

| Page | Google Status | Google Crawled | Bing Discovered | Bing Crawled | Bing Size | Winner |
|------|-------------|---------------|-----------------|-------------|-----------|--------|
| / | Indexed | 23.03.26 | 27.03.26 | 27.03.26 | 0 | Google |
| /blog/ | Indexed | 22.03.26 | never | never | 0 | Google |
| /seo-automation/ | Indexed | 21.02.26 | never | never | 0 | Google |
| /case-studies/ | Indexed | 21.03.26 | never | never | 0 | Google |
| /website-translation/ | Unknown | Never | never | never | 0 | Neither |

### Schema Coverage (Post-Remediation)

| Type | Prior (27.03) | Current (30.03) | Status |
|------|--------------|-----------------|--------|
| Organization | Home only (CSR) | 100% (SSR) | FIXED |
| WebSite+SearchAction | Home only (CSR) | 100% (SSR) | FIXED |
| WebPage+Speakable | 0% | 100% | NEW |
| Article | 0% | 100% blog posts | NEW |
| BreadcrumbList | case-studies only | 100% blog posts | NEW |
| VideoObject | 0% | 74 posts | NEW |
| FAQPage | Broken (duplicate) | Homepage only | FIXED |
| Service+Pricing | Home (CSR) | Home + commercial (SSR) | FIXED |
| data-ai-summary | 0% | Hero.jsx | NEW |

### AEO Status

- **AI Referral Sessions**: 0 (all engines — zero)
- **AI Overview Triggers**: 0/10 queries tested — web design commercial queries don't trigger AI Overviews in UK
- **Citation Matrix**: Not applicable — zero citations across all engines
- **AEO Infrastructure**: Fully deployed. Ready for citations once Bing crawls and domain authority builds.

### GSC Near-Ranking Queries (pos <20)

| Query | Imp | Position | Page | Country |
|-------|-----|----------|------|---------|
| is managed dedicated server worth it | 2 | 4.0 | /dedicated-server-managed-hosting-worth/ | USA |
| what should i look for choosing inbound marketing firms | 1 | 5.0 | /business-web-design-agency-selection-2026 | GBR |
| launched in | 1 | 7.0 | / | GBR |
| construction company website design trends 2026 | 4 | 7-10 | /why-website-design-for-construction | BRA/ESP/USA |
| aws database services overview 2026 | 1 | 10.0 | /aws-database-migration-service-2026/ | ESP |
| website construction cost | 4 | 10.75 | /website-construction-cost-2026-uk-breakdown/ | GBR |
| digital agency pricing models 2026 | 3 | 10.7 | /business-web-design-pricing-transparent-cost/ | GBR |
| cost of web development | 1 | 11.0 | /web-development-cost-small-businesses-2026/ | GBR |
| construction websites 2026 | 15 | 19-30 | /why-website-design-for-construction | GBR |

### Ghost Equity (pos 50+)

| Query | Imp | Position | Risk |
|-------|-----|----------|------|
| affordable website designers | 26 | 85-88 | Low — too deep |
| managed dedicated hosting (variants) | 33 | 36-67 | Medium — building |
| seo foundations | 9 | 77 | Low — category page |

### Reconciliation

GSC clicks (90d): 0 | GA4 organic sessions (on-domain): 53 | Delta: 53 (acceptable at low volume)

### Bot Filtering

Total: 865 | On-domain: 732 | Tier A: ~155 | Tier C: 150 (off-domain/dev/bot) | Bot inflation: 82.1%

### Pipeline

li10_posts: 108 | orbit_3_flow: 95 processed, 0 pending | Velocity: 0 posts since last audit

### CRO

N/A — no page meets >100 Tier A sessions threshold. GA4 conversion events deployed 28.03.26. Need 30 days of data.

### Prior Audit Actions — Resolution Status

| ID | Description | Status | Evidence |
|----|------------|--------|----------|
| ACT-LI10-001 | Static JSON-LD in index.html | COMPLETED | render_compare: ssrHasJsonLd=true |
| ACT-LI10-002 | Bing sitemap submission | PARTIAL | Homepage discovered, size=0 |
| ACT-LI10-003 | /website-translation/ indexing | NOT RESOLVED | Still unknown. Re-opened: ACT-LI10-009 |
| ACT-LI10-004 | Duplicate FAQPage /case-studies/ | FIX DEPLOYED, NOT RE-CRAWLED | Re-opened: ACT-LI10-011 |
| ACT-LI10-005 | Article schema blog posts | COMPLETED | SSG confirmed |
| ACT-LI10-006 | GA4 conversion events | COMPLETED | Events configured |
| ACT-LI10-007 | IndexNow key file | COMPLETED | Key file deployed |
| ACT-LI10-008 | AI crawler robots.txt | COMPLETED | 10 crawlers allowed |

### Next Audit

2026-04-06 (7 days)
