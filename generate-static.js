import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://acheexsffdcuzidpiwbh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaGVleHNmZmRjdXppZHBpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU3MDAsImV4cCI6MjA4MjYwMTcwMH0._RH5vbfRy-v8iHzZkir1oS-aw-uzmmC7dUfgt8Bae1I';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ------------------------------------------------------------------
 *  ELITE BLOG DESIGN - TEMPLATE LOADER
 * ------------------------------------------------------------------
 */
function loadMasterShell(distDir) {
    try {
        const shellPath = path.join(distDir, 'index.html');
        return fs.readFileSync(shellPath, 'utf8');
    } catch (error) {
        console.error('CRITICAL ERROR: Could not load master shell (dist/index.html):', error);
        process.exit(1);
    }
}

/**
 * ------------------------------------------------------------------
 *  HTML GENERATION HELPERS (Matching React Components)
 * ------------------------------------------------------------------
 */

const SILO_CATEGORIES = [
    { id: 'business-growth', name: 'Business Growth', description: 'Scaling strategies and automation playbooks for elite performance.' },
    { id: 'website-design', name: 'Website Design', description: 'Converstion-first architecture and premium user experience guides.' },
    { id: 'seo-fundamentals', name: 'SEO Fundamentals', description: 'Technical SEO and authority building for search dominance.' },
    { id: 'industry-spotlights', name: 'Industry Spotlights', description: 'Sector-specific insights and emerging technology trends.' }
];

const ORG_SCHEMA = {
    "@type": "Organization",
    "@id": "https://launchedin10.co.uk/#organization",
    "name": "LaunchedIn10",
    "url": "https://launchedin10.co.uk",
    "logo": {
        "@type": "ImageObject",
        "@id": "https://launchedin10.co.uk/#logo",
        "url": "https://launchedin10.co.uk/assets/logo.svg",
        "contentUrl": "https://launchedin10.co.uk/assets/logo.svg",
        "caption": "LaunchedIn10"
    },
    "image": { "@id": "https://launchedin10.co.uk/#logo" },
    "sameAs": [
        "https://linkedin.com/company/launchedin10"
    ]
};

const WEBSITE_SCHEMA = {
    "@type": "WebSite",
    "@id": "https://launchedin10.co.uk/#website",
    "url": "https://launchedin10.co.uk",
    "name": "LaunchedIn10",
    "publisher": { "@id": "https://launchedin10.co.uk/#organization" }
};

function injectSchema(html, pageType, pageData) {
    const graph = [ORG_SCHEMA, WEBSITE_SCHEMA];

    if (pageType === 'Article') {
        graph.push({
            "@type": "Article",
            "@id": `${pageData.url}#article`,
            "isPartOf": { "@id": `${pageData.url}#webpage` },
            "author": {
                "@type": "Person",
                "name": pageData.author || "LaunchedIn10 Strategist",
                "url": "https://launchedin10.co.uk"
            },
            "headline": pageData.title,
            "datePublished": pageData.datePublished,
            "dateModified": pageData.dateModified || pageData.datePublished,
            "mainEntityOfPage": { "@id": `${pageData.url}#webpage` },
            "publisher": { "@id": "https://launchedin10.co.uk/#organization" },
            "image": {
                "@type": "ImageObject",
                "url": pageData.image
            },
            "description": pageData.description
        });
    } else if (pageType === 'Service') {
        graph.push({
            "@type": "Service",
            "@id": `${pageData.url}#service`,
            "name": pageData.title,
            "description": pageData.description,
            "provider": { "@id": "https://launchedin10.co.uk/#organization" },
            "areaServed": "GB",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": pageData.title,
                "itemListElement": pageData.offers || []
            }
        });
    }

    const schemaScript = `\n    <script type="application/ld+json">\n    ${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 4)}\n    </script>\n`;
    return html.replace('</head>', `${schemaScript}</head>`);
}

function generatePostCardHtml(post) {
    const title = post.post_title || post.title || 'Untitled Post';
    const dateStr = post.published_at || post.created_at;
    const date = new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const categoryName = post.primary_category || post.category || 'Insights';
    const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
    const postUrl = `/blog/${categorySlug}/${post.slug}/`;

    const imageUrl = post.featured_image_url || post.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80';

    // SVG Icon for Read Time (Matches BlogIndex.jsx)
    const clockIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" style="color:var(--teal);"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;

    return `
    <article class="post-card group flex flex-col bg-[var(--bg-warm)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
        <a href="${postUrl}" class="block aspect-[16/10] overflow-hidden bg-[var(--navy)]">
            <img src="${imageUrl}" alt="${title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
        </a>
        <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-4 mb-4">
                <span class="text-[10px] font-bold text-[var(--teal)] uppercase tracking-widest">${post.display_tag || categoryName}</span>
                <span class="text-xs text-[var(--text-muted)]">${date}</span>
            </div>
            <h4 class="text-lg font-bold text-[var(--navy)] mb-3 leading-snug group-hover:text-[var(--teal)] transition-colors">
                <a href="${postUrl}">${title}</a>
            </h4>
            <p class="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6 flex-grow leading-relaxed">${post.excerpt || 'Read our latest guide on this topic...'}</p>
            <div class="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)] mt-auto text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                <div class="flex items-center gap-2">
                    ${clockIcon}
                    ${post.read_time || '5'} Min Read
                </div>
                <a href="${postUrl}" class="text-[var(--navy)] hover:text-[var(--teal)] transition-colors">Full Guide</a>
            </div>
        </div>
    </article>`;
}

function generateSiloHtml(silo, posts) {
    if (posts.length === 0) return '';
    const postsHtml = posts.map(generatePostCardHtml).join('\n');
    const categoryUrl = `/blog/${silo.id}/`;

    // Category Icon Placeholder (Matches BlogIndex.jsx style roughly)
    const iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;

    return `
    <div class="category-block bg-white rounded-3xl p-8 md:p-12 border border-[var(--border-subtle)] shadow-sm mb-24">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 pb-8 border-b border-[var(--border-subtle)]">
            <div class="flex items-center gap-6">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--navy-deep)] flex items-center justify-center text-[var(--teal)] shadow-lg">
                    ${iconSvg}
                </div>
                <div>
                    <h3 class="text-3xl font-display font-bold text-[var(--navy)]">${silo.name}</h3>
                    <p class="text-[var(--text-muted)] mt-1">${silo.description}</p>
                </div>
            </div>
            <a href="${categoryUrl}" class="inline-flex items-center gap-2 text-sm font-bold text-[var(--teal)] hover:text-[var(--navy)] transition-colors group">
                View Archive
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" class="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${postsHtml}
        </div>
    </div>`;
}

function assignCategory(post) {
    if (post.primary_category) return post.primary_category;
    const title = (post.post_title || post.title || '').toLowerCase();
    if (title.includes('seo') || title.includes('google') || title.includes('keyword')) return 'SEO Fundamentals';
    if (title.includes('design') || title.includes('website') || title.includes('ux')) return 'Website Design';
    if (title.includes('business') || title.includes('growth') || title.includes('lead')) return 'Business Growth';
    return 'Industry Spotlights';
}

/**
 * ------------------------------------------------------------------
 *  MAIN GENERATION CONTROLLER
 * ------------------------------------------------------------------
 */
/**
 * 
 *  API GENERATION (Categories JSON)
 * 
 */
async function generateCategoriesApi(posts, distDir) {
    console.log('🔨 [ELITE] Generating Categories API...');

    const uniqueCategories = [
        ...new Set(
            posts
                .map((post) => post.primary_category)
                .filter((cat) => !!cat)
        ),
    ].sort();

    const outputDir = path.join(distDir, 'api');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(
        path.join(outputDir, 'categories.json'),
        JSON.stringify(uniqueCategories)
    );
    console.log('✅ [ELITE] Categories API Generated.');
}

async function generateAll() {
    console.log('🚀 [ELITE] Starting Zero-JS Phased Generation (Phase 1)...');

    const distDir = path.resolve(__dirname, 'dist');
    const masterShell = loadMasterShell(distDir);

    const { data: posts, error } = await supabase
        .from('li10_posts')
        .select('*')
        .eq('status', 'publish');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`✅ [ELITE] Fetched ${posts.length} published posts.`);

    const postsByCategory = {};
    posts.forEach(post => {
        post.category = assignCategory(post);
        if (!postsByCategory[post.category]) {
            postsByCategory[post.category] = [];
        }
        postsByCategory[post.category].push(post);
    });

    await generateBlogIndex(postsByCategory, posts, distDir, masterShell);
    await generateCategoryPages(postsByCategory, distDir, masterShell);
    await generateIndividualPosts(posts, distDir, masterShell);
    await generateCategoriesApi(posts, distDir);

    // PHASE 2: HIGH-VALUE SILOS
    await generateCaseStudiesPage(distDir, masterShell);
    await generateSEOSalePage(distDir, masterShell);
    await generateTranslationSalePage(distDir, masterShell);
    await generateHomepage(distDir, masterShell);
    await generateLegalPages(distDir, masterShell);

    console.log('🎉 [ELITE] Phase 2 Generation Complete.');
    process.exit(0);
}

async function generateBlogIndex(postsByCategory, allPosts, distDir, shell) {
    console.log('🔨 [ELITE] Generating Blog Index...');

    const silosHtml = SILO_CATEGORIES.map(silo => {
        // Sort by date (most recent first) and limit to 3 posts per category
        const categoryPosts = (postsByCategory[silo.name] || [])
            .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at))
            .slice(0, 3);
        return generateSiloHtml(silo, categoryPosts);
    }).join('\n');

    let html = shell;
    html = html.replace('<title>LaunchedIn10</title>', '<title>Website Insights & Growth Guides | LaunchedIn10 Blog</title>');
    html = html.replace('</head>', '<meta name="description" content="Expert guides on website design, SEO fundamentals, and business growth for UK SMEs." /><link rel="canonical" href="https://launchedin10.co.uk/blog" /></head>');

    html = injectSchema(html, 'CollectionPage', {
        url: 'https://launchedin10.co.uk/blog',
        title: 'Website Insights & Growth Guides | LaunchedIn10 Blog',
        description: 'Expert guides on website design, SEO fundamentals, and business growth for UK SMEs.'
    });

    // Get 6 most recent posts for the "Latest Intelligence" Grid
    const recentPosts = allPosts.slice(0, 6);
    const recentPostsHtml = recentPosts.map(generatePostCardHtml).join('\n');

    const preRenderedHtml = `
    <div id="root">
        <div class="bg-[var(--bg-warm)] min-h-screen blog-index-context">
            <section class="relative pt-48 pb-32 px-4 overflow-hidden bg-gradient-to-b from-[var(--bg-warm)] to-[var(--surface)]">
                <div class="max-w-screen-lg mx-auto text-center relative z-10">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(14,165,165,0.08)] border border-[rgba(14,165,165,0.2)] text-[var(--teal)] text-sm font-semibold mb-8">
                        Elite Digital Intelligence
                    </div>
                    <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-[var(--navy)] mb-8 tracking-tight leading-[1.05]">
                        Grow Your Business with Daily <span class="relative inline-block">
                            SEO Content That Ranks
                            <span class="absolute bottom-4 left-0 right-0 h-3 bg-gradient-to-r from-[rgba(14,165,165,0.3)] to-[rgba(14,165,165,0.1)] -z-10 rounded-full" />
                        </span>
                    </h1>
                    <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
                        Expert guides, actionable insights, and proven strategies for UK SMEs. Every article is optimised for Google and designed to drive qualified traffic.
                    </p>
                </div>
            </section>

            <section class="py-32 px-4 bg-white">
                <div class="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div class="space-y-8">
                        <h2 class="text-4xl font-display font-bold text-[var(--navy)] leading-tight tracking-tight">
                            Strategic Content Designed for <span class="text-[var(--teal)] italic">Disruption</span>.
                        </h2>
                        <ul class="space-y-4">
                            <li class="flex gap-3 items-start text-[var(--text-primary)] font-medium">Zero-JS Pre-rendered Content Infrastructure</li>
                            <li class="flex gap-3 items-start text-[var(--text-primary)] font-medium">Semantic Siloing for Search Dominance</li>
                            <li class="flex gap-3 items-start text-[var(--text-primary)] font-medium">Connected Entity Schema Implementation</li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- LATEST INTELLIGENCE GRID (New for SSG Hardening) -->
            <section class="py-24 px-4 bg-[var(--bg-warm)] border-t border-[var(--border-subtle)]">
                <div class="max-w-screen-2xl mx-auto">
                    <div class="flex items-center gap-4 mb-12">
                         <div class="w-12 h-12 rounded-2xl bg-[var(--navy)] text-[var(--teal)] flex items-center justify-center shadow-lg">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        </div>
                        <h3 class="text-3xl font-display font-bold text-[var(--navy)]">Latest Intelligence</h3>
                    </div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${recentPostsHtml}
                    </div>
                </div>
            </section>

            <section class="py-32 px-4 bg-[var(--bg-warm)]">
                <div class="max-w-screen-2xl mx-auto">
                    ${silosHtml}
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${preRenderedHtml}</body>`);
    html = html.replace(/\.\/assets\//g, '/assets/');

    const outputPath = path.join(distDir, 'blog/index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log('✅ [ELITE] Blog Index Generated.');
}


/**
 * 
 *  HOMEPAGE GENERATION (Explicit SEO Injection)
 * 
 */
async function generateHomepage(distDir, shell) {
    console.log('🔨 [ELITE] Generating Homepage...');

    // Note: We cannot fully pre-render the complex React components (Pricing, Calculator) in this Node script
    // without a full SSR setup. However, we CAN inject the critical SEO meta tags and Schema
    // into the main index.html so Google sees them immediately, even if the body is hydrated later.

    // For a true "No-JS" SEO fallback on the specific Homepage, we would need to replicate the Hero HTML here.
    // Given the complexity of the Home.jsx components, we will focus on Header injection for now,
    // which satisfies the "Googlebot reading meta/schema" requirement. The friend's concern 
    console.log('Generating Homepage with full content...');

    // Inject Meta Tags
    let html = shell
        .replace('<title>LaunchedIn10</title>', '<title>High-Performance Web Design in 10 Days | LaunchedIn10</title>')
        .replace('</head>', `
    <meta name="description" content="We build elite, revenue-generating web assets for ambitious businesses. Custom high-performance websites delivered in 10 days. Disrupt your market today.">
    <link rel="canonical" href="https://launchedin10.co.uk">
    <meta property="og:title" content="Elite Web Design & Performance | LaunchedIn10">
    <meta property="og:description" content="Stop building standard sites. Start building digital assets. Custom websites delivered in 10 days.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://launchedin10.co.uk">
    <meta property="og:image" content="https://launchedin10.co.uk/og-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Web Design Reimagined | LaunchedIn10">
    <meta name="twitter:description" content="Professional custom websites delivered in 10 days. High speed, high performance.">
    </head>`);

    // Inject Hero & Core Content
    const content = `
        <main>
            <section class="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100/50">
                <div class="absolute top-[15%] right-0 w-1/2 h-full pointer-events-none opacity-[0.03] select-none">
                    <div class="w-full h-px bg-primary transform -rotate-12 translate-y-12"></div>
                    <div class="w-2/3 ml-auto h-px bg-primary transform -rotate-12 translate-y-24"></div>
                    <div class="w-full h-px bg-primary transform -rotate-12 translate-y-36"></div>
                    <div class="absolute top-20 right-20 text-[20rem] font-display font-bold text-primary opacity-[0.05] leading-none -rotate-12 z-0">10</div>
                </div>
                <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        <div class="lg:col-span-8 relative">
                            <div class="inline-flex items-center gap-3 mb-10">
                                <span class="text-sm font-bold text-primary tracking-tight">Trusted by UK Founders</span>
                            </div>
                            <h1 class="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-primary leading-[0.95] mb-8 tracking-tighter">
                                Your Website.<br />
                                <span class="font-serif italic font-light text-accent">Live in 10 Days.</span><br />
                                Managed Forever.
                            </h1>
                            <p class="text-xl md:text-2xl text-text-muted mb-12 max-w-2xl leading-relaxed font-light">
                                The anti-agency service. We design, build, and manage your bespoke website for a flat monthly fee. No templates. No freelancers. No headaches.
                            </p>
                            <div class="flex flex-col sm:flex-row gap-5">
                                <a href="javascript:void(0)" onclick="const e='aGVsbG9AbGF1bmNoZWRpbjEwLmNvLnVr'; window.location.href='mailto:'+atob(e)+'?subject='+encodeURIComponent('Start Your Build')+'&body='+encodeURIComponent('Hi, I\'d like to start my build.')" class="inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-white bg-primary rounded-none hover:bg-primary-light transition-all shadow-luxury-elevated min-w-[200px]">Start Your Build</a>
                                <a href="#process" class="inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-primary bg-transparent border-2 border-primary/10 rounded-none transition-all min-w-[200px]">How It Works</a>
                            </div>
                        </div>
                        <!-- ... (Hero Image Block reused from above) ... -->
                    </div>
                </div>
            </section>
            
            <!-- SERVICES MANIFESTO -->
            <section class="py-24 bg-primary text-white">
                <div class="max-w-screen-2xl mx-auto px-4">
                    <div class="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 class="text-5xl font-display font-bold mb-8">The 10-Day Standard</h2>
                            <p class="text-xl text-white/80 leading-relaxed mb-6">
                                We believe speed is a feature. In a world where agencies take 12 weeks to deliver a Wordpress template, we deliver bespoke, hand-coded React applications in 10 days.
                            </p>
                        </div>
                        <div class="grid grid-cols-2 gap-8">
                             <div class="p-8 bg-white/5 border border-white/10">
                                <div class="text-4xl font-bold text-accent mb-2">10</div>
                                <div class="text-sm font-bold uppercase tracking-widest">Days to Launch</div>
                             </div>
                             <div class="p-8 bg-white/5 border border-white/10">
                                <div class="text-4xl font-bold text-accent mb-2">100%</div>
                                <div class="text-sm font-bold uppercase tracking-widest">Google Compliance</div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="problem" class="py-24 bg-white relative">
                <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-display font-bold text-primary mb-4">Sound Familiar?</h2>
                        <p class="text-xl text-text-muted">Most UK businesses are stuck in one of three traps.</p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8 mb-16">
                        <div class="bg-white p-8 rounded-2xl shadow-luxury border border-gray-100">
                            <h3 class="text-xl font-display font-bold text-primary mb-4">The DIY Trap</h3>
                            <p class="text-text-muted leading-relaxed">You started with Wix or Squarespace. Three weekends later, it still looks like a template.</p>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-luxury border border-gray-100">
                            <h3 class="text-xl font-display font-bold text-primary mb-4">The Agency Black Hole</h3>
                            <p class="text-text-muted leading-relaxed">You paid £5,000+ for a "bespoke" website. Twelve weeks later, you're still "in revisions."</p>
                        </div>
                        <div class="bg-white p-8 rounded-2xl shadow-luxury border border-gray-100">
                            <h3 class="text-xl font-display font-bold text-primary mb-4">The AI Gamble</h3>
                            <p class="text-text-muted leading-relaxed">It generated something in 30 seconds—and it looks like it. Generic. Soulless.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    `;

    // SEO Navigation Block for Googlebot crawlability
    const seoNavBlock = `
    <!-- SEO: Static navigation for crawlers (hidden, off-screen) -->
    <nav id="seo-nav" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
        <a href="/blog/website-design">Website Design</a>
        <a href="/blog/seo-fundamentals">SEO Fundamentals</a>
        <a href="/blog/business-growth">Business Growth</a>
        <a href="/blog/industry-spotlights">Industry Spotlights</a>
        <a href="/case-studies">Case Studies</a>
        <a href="/seo-automation">SEO Automation</a>
        <a href="/website-translation">Website Translation</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/cookies" rel="nofollow">Cookie Policy</a>
    </nav>
    `;

    html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${seoNavBlock}<div id="root">${content}</div></body>`);

    const outputPath = path.join(distDir, 'index.html');
    fs.writeFileSync(outputPath, html);
    console.log('✅ [ELITE] Homepage Meta & Schema Injected.');
}

async function generateCategoryPages(postsByCategory, distDir, shell) {
    console.log('🔨 [ELITE] Generating Category Pages...');

    for (const silo of SILO_CATEGORIES) {
        const posts = postsByCategory[silo.name] || [];
        if (posts.length === 0) continue;

        const postsHtml = posts.map(generatePostCardHtml).join('\n');
        let html = shell;

        html = html.replace('<title>LaunchedIn10</title>', `<title>${silo.name} Insights | LaunchedIn10 Blog</title>`);
        html = html.replace('</head>', `<meta name="description" content="Expert guides on ${silo.name} for UK SMEs." /><link rel="canonical" href="https://launchedin10.co.uk/blog/${silo.id}" /></head>`);

        html = injectSchema(html, 'CollectionPage', {
            url: `https://launchedin10.co.uk/blog/${silo.id}`,
            title: `${silo.name} Insights | LaunchedIn10 Blog`,
            description: `Expert guides on ${silo.name} for UK SMEs.`
        });

        const preRenderedHtml = `
        <div id="root">
            <div class="bg-[var(--bg-warm)] min-h-screen blog-index-context">
                <section class="relative pt-48 pb-32 px-4 overflow-hidden bg-gradient-to-b from-[var(--bg-warm)] to-[var(--surface)]">
                    <div class="max-w-screen-lg mx-auto text-center relative z-10">
                        <div class="mb-6">
                            <a href="/blog" class="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--teal)] transition-colors uppercase tracking-widest">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                Back to Intelligence Lab
                            </a>
                        </div>
                        <h1 class="text-5xl md:text-7xl font-display font-bold text-[var(--navy)] mb-8 tracking-tight leading-[1.05]">
                            ${silo.name} <span class="relative inline-block">Insights
                                <span class="absolute bottom-4 left-0 right-0 h-3 bg-gradient-to-r from-[rgba(14,165,165,0.3)] to-[rgba(14,165,165,0.1)] -z-10 rounded-full" />
                            </span>
                        </h1>
                    </div>
                </section>
                <section class="py-32 px-4 bg-[var(--bg-warm)]">
                    <div class="max-w-screen-xl mx-auto">
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${postsHtml}
                        </div>
                    </div>
                </section>
            </div>
        </div>`;

        html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${preRenderedHtml}</body>`);
        html = html.replace(/\.\/assets\//g, '/assets/');

        const outputDir = path.join(distDir, 'blog', silo.id);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), html);
        console.log(`   - Generated /blog/${silo.id}/`);
    }
}

async function generateIndividualPosts(posts, distDir, shell) {
    console.log('🔨 [ELITE] Generating Individual Posts...');

    for (const post of posts) {
        const categoryName = post.primary_category || post.category || 'Insights';
        const catSlug = categoryName.toLowerCase().replace(/ /g, '-');
        const postSlug = post.slug;
        const title = post.post_title || post.title;

        let html = shell;
        html = html.replace('<title>LaunchedIn10</title>', `<title>${title} | LaunchedIn10</title>`);
        html = html.replace('</head>', `<link rel="canonical" href="https://launchedin10.co.uk/blog/${catSlug}/${postSlug}/" /></head>`);

        html = injectSchema(html, 'Article', {
            url: `https://launchedin10.co.uk/blog/${catSlug}/${postSlug}`,
            title: title,
            description: post.excerpt || 'Technical SEO and business growth insights.',
            datePublished: post.published_at || post.created_at,
            dateModified: post.updated_at,
            image: post.featured_image_url,
            author: post.author_name
        });

        let postContent = post.post_content || '';
        // YouTube transformation... (omitting details for brevity in search replacement, but keeping logic)
        const youtubeRegex = /(?:<p>[\s\n\r]*)?(?:<figure[^>]*>[\s\n\r]*(?:<div[^>]*>[\s\n\r]*)?)?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[^\s<"']*)(?:[\s\n\r]*<\/div>)?(?:[\s\n\r]*<\/figure>)?(?:[\s\n\r]*<\/p>)?/g;
        postContent = postContent.replace(youtubeRegex, (match, videoId) => {
            return `<div class="youtube-container" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:4rem 0;border-radius:2rem;box-shadow:0 30px 60px rgba(0,0,0,0.2);background:#000;border:4px solid var(--navy);"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        });

        const preRenderedHtml = `
        <div id="root">
            <div class="bg-[var(--bg-warm)] min-h-screen blog-post-context">
                <div class="max-w-screen-2xl mx-auto px-4 pt-48 pb-24">
                    <div class="flex items-center gap-4 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-12">
                        <a href="/blog" class="hover:text-[var(--teal)] transition-colors inline-flex items-center gap-2">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Intelligence Lab
                        </a>
                        <span>/</span>
                        <span class="text-[var(--teal)]">${categoryName}</span>
                    </div>

                    <article class="max-w-screen-2xl mx-auto">
                        <header class="mb-20 text-center">
                            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(14,165,165,0.08)] border border-[rgba(14,165,165,0.2)] text-[var(--teal)] text-[10px] font-bold uppercase tracking-widest mb-8">
                                ${post.display_tag || 'Verified Insight'}
                            </div>
                            <h1 class="text-4xl md:text-7xl font-display font-bold text-[var(--navy)] mb-10 leading-[1.05] tracking-tight">${title}</h1>
                            <div class="flex flex-wrap justify-center items-center gap-8 text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                                <span>Published ${new Date(post.published_at || post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                <span>${post.read_time || 5} Min Read</span>
                            </div>
                        </header>

                        ${post.featured_image_url ? `
                        <div class="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-24 shadow-2xl border border-[var(--border-subtle)] bg-[var(--navy)]">
                            <img src="${post.featured_image_url}" alt="${title}" class="w-full h-full object-cover opacity-90">
                        </div>` : ''}

                        <div class="flex flex-col lg:flex-row gap-20">
                            <aside class="lg:w-1/4 order-2 lg:order-1">
                                <div class="sticky top-32 space-y-12">
                                    <div class="p-8 bg-white rounded-3xl border border-[var(--border-subtle)] shadow-sm">
                                        <h3 class="text-[10px] font-bold text-[var(--navy)] uppercase tracking-widest mb-6 pb-2 border-b border-[var(--border-subtle)] inline-block">Analyst</h3>
                                        <div class="flex items-center gap-4">
                                            <div class="w-12 h-12 rounded-2xl bg-[var(--navy)] text-[var(--teal)] flex items-center justify-center text-xl font-bold shadow-lg">L</div>
                                            <div>
                                                <div class="text-sm font-bold text-[var(--navy)] leading-none mb-1">${post.author_name || 'LaunchedIn10'}</div>
                                                <div class="text-[10px] text-[var(--teal)] font-bold uppercase tracking-wider">Strategy Director</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-8 bg-[var(--navy)] rounded-3xl text-white">
                                        <h4 class="font-display font-bold text-lg mb-2">Ready to scale?</h4>
                                        <p class="text-[10px] text-white/60 mb-6 leading-relaxed">Implement these strategies in your own business in just 10 days.</p>
                                        <a href="/#pricing" class="block text-center bg-white text-[var(--navy)] text-xs font-bold py-3 rounded-xl hover:bg-[var(--teal)] hover:text-white transition-colors">Get Started</a>
                                    </div>
                                </div>
                            </aside>

                            <div class="lg:w-3/4 order-1 lg:order-2">
                                <div class="blog-content prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--navy)] prose-p:text-[var(--text-primary)]">
                                    ${postContent}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>`;

        html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${preRenderedHtml}</body>`);
        html = html.replace(/\.\/assets\//g, '/assets/');

        const outputDir = path.join(distDir, 'blog', catSlug, postSlug);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    }
}

/**
 * ------------------------------------------------------------------
 *  PHASE 2: HIGH-VALUE PAGES
 * ------------------------------------------------------------------
 */

async function generateCaseStudiesPage(distDir, shell) {
    console.log('🔨 [ELITE] Generating Case Studies Page...');

    const CASE_STUDIES = [
        {
            id: 'pritchard',
            title: 'Pritchard Critical Power',
            location: 'Pontypool, Wales',
            tag: 'ELECTRICAL',
            date: '03/01/2026',
            description: 'A 30-year veteran electrician pivoting to specialist data centre and AI compute infrastructure. Bold, industrial brand that stands apart from generic trade websites.',
            stats: [
                { value: '8', label: 'DAYS', sub: 'From Brief' },
                { value: '5', label: 'PAGES', sub: '' },
                { value: 'B2B', label: 'FOCUS', sub: '' }
            ],
            challenge: 'Gareth Pritchard had 30 years of electrical experience but his existing brand was generic — lost among thousands of UK sparkies. As he pivoted to specialist data centre work, he needed a website that signalled serious capability, not domestic call-outs.',
            solution: 'We created Pritchard Critical Power — a complete rebrand with an industrial aesthetic (anthracite black, molten copper) that photographs beautifully against server rooms. Five pages of conversion-focused copy, B2B positioning, and technical credibility signals.',
            result: 'A distinctive online presence that positions Gareth for the contracts he actually wants — data centre operators, colocation providers, and enterprise IT teams.',
            quote: 'The site looks nothing like any other electrical contractor in Wales. That’s exactly what I wanted. Now when I’m tendering for data centre work, I look the part.',
            author: 'Gareth Pritchard, Managing Director',
            url: 'https://client-pritchardcritical-power.pages.dev/',
            domain: 'pritchardcp.co.uk'
        },
        {
            id: 'dunnethouse',
            title: 'Dunnet House School',
            location: 'Caithness, Scotland',
            tag: 'EDUCATION',
            date: '02/01/2026',
            description: 'An independent primary school in the Scottish Highlands. Warm, sophisticated design that conveys trust to parents — while meeting Education Scotland compliance.',
            stats: [
                { value: '9', label: 'DAYS', sub: 'From Brief' },
                { value: '6', label: 'PAGES', sub: '' },
                { value: '100%', label: 'COMPLIANT', sub: '' }
            ],
            challenge: 'Dunnet House School needed to modernize its digital presence without losing the warmth and family atmosphere that defines it. The previous site was outdated and didn\'t clearly communicate their unique value proposition to prospective parents.',
            solution: 'We designed a welcoming, accessible website using a soft, sophisticated color palette that reflects the school\'s heritage. The new structure simplifies navigation for parents while ensuring all regulatory information is easily found.',
            result: 'A compliant, engaging website that truly represents the school\'s ethos. Initial feedback from parents has been overwhelmingly positive, citing ease of use and the warm, inviting visual design.',
            quote: 'Finally, a website that shows parents what we’re really like. It feels like us — not like a generic school template.',
            author: 'Mrs Fiona MacLeod, Headteacher',
            url: 'https://client-dunnethouseschool.pages.dev/',
            domain: 'dunnethouse.sch.uk'
        }
    ];

    const caseCardsHtml = CASE_STUDIES.map(cs => `
        <div class="case-card">
            <div class="case-preview">
                <div class="preview-header">
                    <span class="domain">${cs.domain}</span>
                    <span class="preview-hint">Live Preview ↗</span>
                </div>
                <div class="iframe-container">
                    <iframe src="${cs.url}" title="${cs.title} Live Preview" loading="lazy"></iframe>
                    <div class="iframe-overlay">
                        <div class="overlay-btn">View Live Site</div>
                    </div>
                </div>
            </div>
            <div class="case-content">
                <div class="case-meta">
                    <span class="meta-date">${cs.date}</span>
                    <span class="meta-tag">${cs.tag}</span>
                </div>
                <h2 class="case-title">${cs.title}</h2>
                <p class="case-location">${cs.location}</p>
                <p class="case-description">${cs.description}</p>

                <div class="case-stats">
                    ${cs.stats.map(s => `
                        <div class="stat">
                            <div class="stat-value">${s.value}</div>
                            <div class="stat-label flex-col">${s.label}${s.sub ? `<span class="stat-sub">${s.sub}</span>` : ''}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="case-story expanded" style="margin-top:2rem; display:block !important; opacity:1 !important;">
                    <div class="case-story-inner">
                        <div class="story-section">
                            <h4 style="color:var(--teal); font-size:0.9rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">The Challenge</h4>
                            <p style="font-size:1.1rem; line-height:1.6; color:var(--text-secondary);">${cs.challenge}</p>
                        </div>
                        <div class="story-section" style="margin-top:2rem;">
                            <h4 style="color:var(--teal); font-size:0.9rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">The Solution</h4>
                            <p style="font-size:1.1rem; line-height:1.6; color:var(--text-secondary);">${cs.solution}</p>
                        </div>
                        <div class="story-section" style="margin-top:2rem;">
                            <h4 style="color:var(--teal); font-size:0.9rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:1rem;">The Result</h4>
                            <p style="font-size:1.1rem; line-height:1.6; color:var(--text-secondary);">${cs.result}</p>
                        </div>
                    </div>
                </div>

                <div class="case-quote" style="margin-top:3rem; padding-top:2rem; border-top:1px solid var(--border-subtle);">
                    <p style="font-family:var(--font-display); font-size:1.25rem; font-weight:700; color:var(--navy); line-height:1.4; font-style:italic;">"${cs.quote}"</p>
                    <div class="quote-author" style="margin-top:1rem; font-size:0.9rem; color:var(--text-muted); font-weight:700;">— ${cs.author}</div>
                </div>
            </div>
        </div>
    `).join('\n');

    let html = shell;
    html = html.replace('<title>LaunchedIn10</title>', '<title>Real Websites. Live in 10 Days. | LaunchedIn10 Case Studies</title>');
    html = html.replace('</head>', '<meta name="description" content="See real examples of high-performance websites built and launched in just 10 days. No templates. No delays. Just results." /><link rel="canonical" href="https://launchedin10.co.uk/case-studies" /></head>');

    html = injectSchema(html, 'CollectionPage', {
        url: 'https://launchedin10.co.uk/case-studies',
        title: 'Real Websites. Live in 10 Days. | LaunchedIn10 Case Studies',
        description: 'See real examples of high-performance websites built and launched in just 10 days.'
    });

    const preRenderedHtml = `
    <div id="root">
        <div class="case-studies-wrapper">
            <section class="hero py-48 px-4 bg-gradient-to-b from-[var(--bg-warm)] to-white">
                <div class="max-w-screen-lg mx-auto text-center">
                    <div class="text-[var(--teal)] font-bold uppercase tracking-widest text-xs mb-6">Trusted by UK Founders</div>
                    <h1 class="text-6xl md:text-8xl font-display font-bold text-[var(--navy)] mb-8 leading-[1.05]">
                        Real Websites.<br />
                        <span class="text-[var(--teal)]">Live in 10 Days.</span>
                    </h1>
                    <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                        No templates. No drag-and-drop. No 12-week timelines.<br /> Professional websites built for your business — managed forever.
                    </p>
                </div>
            </section>
            
            <section class="case-grid-section py-32 px-4 bg-white">
                <div class="max-w-screen-xl mx-auto">
                    <div class="case-grid grid gap-16 lg:gap-24">
                        ${caseCardsHtml}
                    </div>
                </div>
            </section>

            <section class="mid-text-section py-40 px-4 bg-[var(--navy)] text-white text-center">
                <div class="max-w-screen-lg mx-auto">
                    <h3 class="text-4xl md:text-5xl font-display font-bold mb-8">There's a reason you're still looking.</h3>
                    <p class="text-xl text-[var(--teal)] font-medium">The website design services market is broken. <span class="text-white">We fixed it.</span></p>
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${preRenderedHtml}</body>`);
    html = html.replace(/\.\/assets\//g, '/assets/');

    const outputDir = path.join(distDir, 'case-studies');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log('✅ [ELITE] Case Studies Page Generated.');
}

async function generateSEOSalePage(distDir, shell) {
    console.log('🔨 [ELITE] Generating SEO Sale Page...');

    let html = shell;
    html = html.replace('<title>LaunchedIn10</title>', '<title>Daily SEO Content Automation | Outrank Competitors Automatically</title>');
    html = html.replace('</head>', '<meta name="description" content="Our autonomous SEO engine publishes authority-building posts every single day. Outrank competitors while you sleep." /><link rel="canonical" href="https://launchedin10.co.uk/seo-automation" /></head>');

    html = injectSchema(html, 'Service', {
        url: 'https://launchedin10.co.uk/seo-automation',
        title: 'Daily SEO Content Automation',
        description: 'Our autonomous SEO engine publishes authority-building posts every single day.'
    });

    const preRenderedHtml = `
    <div id="root">
        <div class="seo-page-wrapper">
            <section class="hero">
                <div class="container">
                    <span class="hero-label">The SEO Market Disruptor</span>
                    <h1 class="hero-title">Outrank Your Competitors <span>Before They Wake Up</span></h1>
                    <p class="hero-subtitle">Google rewards consistent, quality content. Most businesses can't keep up. Yours will. Our autonomous content engine publishes authority-building posts every single day—while your competitors scramble to catch up.</p>
                    <div class="hero-stats">
                        <div class="hero-stat">
                            <div class="hero-stat-value">Daily</div>
                            <div class="hero-stat-label">Fresh Content Published</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-value">1,200+</div>
                            <div class="hero-stat-label">Words Per Post</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-value">12hrs</div>
                            <div class="hero-stat-label">First Post Live</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="problem-section">
                <div class="container">
                    <div class="section-header">
                        <div class="section-label">The Hard Truth</div>
                        <h2 class="section-title">Google Changed the Rules. Most Businesses Are Drowning.</h2>
                        <p class="section-subtitle">The algorithm now demands consistent, high-quality content at scale. Without it, you're invisible.</p>
                    </div>
                    <div class="problem-grid">
                        <div class="problem-card">
                            <div class="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <h3>Your Competitors Are Moving</h3>
                            <p>While you're planning your content calendar, they're publishing. Every day you wait is another day they're building authority you'll have to fight for.</p>
                        </div>
                        <div class="problem-card">
                            <div class="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <h3>Content Costs Are Killing You</h3>
                            <p>Freelancers charge £50-£100 per post. Agencies want retainers. By the time you've budgeted, your competitors have published 30 more articles.</p>
                        </div>
                        <div class="problem-card">
                            <div class="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                            </div>
                            <h3>You Can't Scale Manually</h3>
                            <p>Google's new quality signals favour volume and consistency. One post a week doesn't cut it anymore. You need daily output to compete.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="how-section">
                <div class="container">
                    <h2 class="section-title text-center">How It Works</h2>
                    <div class="steps-grid">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <h3>Select Your Tier</h3>
                            <p>Choose your publishing frequency based on your market's competitiveness.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <h3>AI Strategy</h3>
                            <p>Our engine scans Google Trends and your competitors to find breakout keywords.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <h3>Autonomous Publishing</h3>
                            <p>Articles are written, optimized, and published directly to your CMS.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">4</div>
                            <h3>Dominant Results</h3>
                            <p>Watch your impressions and clicks climb as you flood Google with quality.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="pricing-section">
                <div class="container">
                    <h2 class="section-title text-center">Simple Pricing</h2>
                    <div class="tiers-grid">
                        <div class="tier-card">
                            <h3 class="tier-name">Launch</h3>
                            <div class="tier-tagline">Foundational Authority</div>
                            <div class="tier-price"><span class="tier-amount">£99.95</span><span class="tier-period">/mo</span></div>
                            <div class="tier-output">
                                <div class="tier-output-main">30 Posts</div>
                                <div class="tier-output-label">Published Every Month</div>
                            </div>
                            <ul class="tier-features">
                                <li class="tier-feature">✓ 1 Post Per Day</li>
                                <li class="tier-feature">✓ Weekly Trend Scanning</li>
                                <li class="tier-feature">✓ Automated CMS Publishing</li>
                            </ul>
                        </div>
                        <div class="tier-card popular">
                            <span class="tier-badge">Most Popular</span>
                            <h3 class="tier-name">Boost</h3>
                            <div class="tier-tagline">Market Aggression</div>
                            <div class="tier-price"><span class="tier-amount">£149.95</span><span class="tier-period">/mo</span></div>
                            <div class="tier-output">
                                <div class="tier-output-main">60 Posts</div>
                                <div class="tier-output-label">Published Every Month</div>
                            </div>
                            <ul class="tier-features">
                                <li class="tier-feature">✓ 2 Posts Per Day</li>
                                <li class="tier-feature">✓ Competitor Gap Analysis</li>
                                <li class="tier-feature">✓ Everything in Launch</li>
                            </ul>
                        </div>
                        <div class="tier-card">
                            <h3 class="tier-name">Orbit</h3>
                            <div class="tier-tagline">Total Dominance</div>
                            <div class="tier-price"><span class="tier-amount">£195.00</span><span class="tier-period">/mo</span></div>
                            <div class="tier-output">
                                <div class="tier-output-main">90 Posts</div>
                                <div class="tier-output-label">Published Every Month</div>
                            </div>
                            <ul class="tier-features">
                                <li class="tier-feature">✓ 3 Posts Per Day</li>
                                <li class="tier-feature">✓ Daily Performance Audits</li>
                                <li class="tier-feature">✓ Everything in Boost</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="faq-section">
                <div class="container">
                    <h2 class="section-title text-center">Frequently Asked Questions</h2>
                    <div class="faq-grid">
                        <div class="faq-item">
                            <h3 class="faq-question">Will AI content actually rank?</h3>
                            <p class="faq-answer">Yes. Google rewards quality and consistency. Our engine follows all E-E-A-T guidelines to ensure value.</p>
                        </div>
                        <div class="faq-item">
                            <h3 class="faq-question">Do you support my CMS?</h3>
                            <p class="faq-answer">We support WordPress, Shopify, Webflow, and custom headless setups via our API.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${preRenderedHtml}</body>`);
    html = html.replace(/\.\/assets\//g, '/assets/');

    const outputDir = path.join(distDir, 'seo-automation');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log('✅ [ELITE] SEO Sale Page Generated.');
}

async function generateTranslationSalePage(distDir, shell) {
    console.log('🔨 [ELITE] Generating Translation Sale Page...');

    let html = shell;
    html = html.replace('<title>LaunchedIn10</title>', '<title>Expand to Europe: Website Translation & Localisation | LaunchedIn10</title>');
    html = html.replace('</head>', '<meta name="description" content="Clone and localise your website into 23 EU languages. SEO structure and hreflang baked in. Live in under an hour." /><link rel="canonical" href="https://launchedin10.co.uk/website-translation" /></head>');

    html = injectSchema(html, 'Service', {
        url: 'https://launchedin10.co.uk/website-translation',
        title: 'Website Translation & Localisation',
        description: 'Clone and localise your website into 23 EU languages. SEO structure and hreflang baked in.'
    });

    const preRenderedHtml = `
    <div id="root">
        <div class="translation-page-wrapper">
            <section class="hero">
                <div class="container">
                    <span class="hero-label">European Market Expansion</span>
                    <h1 class="hero-title">Clone Your Business into <span>23 EU Languages</span></h1>
                    <p class="hero-subtitle">We clone your existing website into any EU language—complete with SEO structure, hreflang tags, and proper URL architecture.</p>
                    <div class="hero-stats">
                        <div class="hero-stat">
                            <div class="hero-stat-value">23</div>
                            <div class="hero-stat-label">EU Languages</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-value">100%</div>
                            <div class="hero-stat-label">SEO Signals</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="problem-section">
                <div class="container">
                    <div class="section-header">
                        <div class="section-label">The Reality</div>
                        <h2 class="section-title">EU Expansion Fails for Boring Reasons</h2>
                        <p class="section-subtitle">Demand isn't the issue. Friction is. Localisation projects get stuck in cost, complexity, and constant rework.</p>
                    </div>
                    <div class="problem-grid">
                        <div class="problem-card">
                            <div class="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <h3>The Agency Trap</h3>
                            <p>Traditional agencies treat translation as a service, not an asset. They charge by the word, and every update is a new project.</p>
                        </div>
                        <div class="problem-card">
                            <div class="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            </div>
                            <h3>Technical Debt</h3>
                            <p>Managing subdomains, hreflang tags, and database synchronization across 23 sites is a nightmare without automation.</p>
                        </div>
                        <div class="problem-card">
                            <div class="problem-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"></path><path d="m17 5-5-3-5 3"></path><path d="m17 19-5 3-5-3"></path><path d="M2 12h20"></path><path d="m5 7 3 5-3 5"></path><path d="m19 7-3 5 3 5"></path></svg>
                            </div>
                            <h3>Missed Returns</h3>
                            <p>If your checkout isn't in their native language and currency, they don't buy. It's that simple.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="solution-section">
                <div class="container">
                    <div class="solution-grid">
                        <div class="solution-content">
                            <h2>Clone Once. Sell Everywhere.</h2>
                            <ul class="solution-list">
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>Full site clone</strong> — Every page, form, and product</span>
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>SEO-ready</strong> — Localised URLs and metadata</span>
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    <span><strong>No dev required</strong> — We handle the technical complexity</span>
                                </li>
                            </ul>
                        </div>
                        <div class="solution-visual">
                             <div class="visual-stat-value">Instant</div>
                             <p class="visual-stat-label">Market Entry</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="how-section">
                <div class="container text-center">
                    <h2 class="section-title">The Onboarding Flow</h2>
                    <div class="steps-grid">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <h3>URL Scan</h3>
                            <p>We analyze your existing architecture to map every conversion path.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <h3>Language Selection</h3>
                            <p>Choose from 23 EU languages. We handle the cultural nuances.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <h3>Clone & Sync</h3>
                            <p>Our engine creates a pixel-perfect clone that stays in sync with your original.</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">4</div>
                            <h3>Go Live</h3>
                            <p>Localised domains are linked and your new market is open for business.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="pricing-section">
                <div class="container">
                    <h2 class="section-title text-center">European Expansion Packages</h2>
                    <div class="tiers-grid">
                        <div class="tier-card">
                            <h3 class="tier-name">Starter</h3>
                            <div class="tier-amount">£29.95<span class="tier-period">/mo</span></div>
                            <p class="tier-tagline">Up to 50 pages. Perfect for small sites.</p>
                        </div>
                        <div class="tier-card popular">
                            <span class="tier-badge">Most Popular</span>
                            <h3 class="tier-name">Growth</h3>
                            <div class="tier-amount">£49.95<span class="tier-period">/mo</span></div>
                            <p class="tier-tagline">Up to 100 pages. For growing businesses.</p>
                        </div>
                        <div class="tier-card">
                            <h3 class="tier-name">Business</h3>
                            <div class="tier-amount">£79.95<span class="tier-period">/mo</span></div>
                            <p class="tier-tagline">Up to 500 pages. Full market expansion.</p>
                        </div>
                        <div class="tier-card">
                            <h3 class="tier-name">Enterprise</h3>
                            <div class="tier-amount">£129.95<span class="tier-period">/mo</span></div>
                            <p class="tier-tagline">Unlimited pages. Total EU dominance.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="faq-section">
                <div class="container">
                    <h2 class="section-title text-center">Expansion Intelligence</h2>
                    <div class="faq-grid">
                        <div class="faq-item">
                            <h3 class="faq-question">Do I need to rebuild my website?</h3>
                            <p class="faq-answer">No. We clone from your existing URL. Your original site stays untouched. We create separate, fully translated versions.</p>
                        </div>
                        <div class="faq-item">
                            <h3 class="faq-question">What about SEO?</h3>
                            <p class="faq-answer">Each clone includes localised URLs, translated metadata, and proper hreflang tags.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body>${preRenderedHtml}</body>`);
    html = html.replace(/\.\/assets\//g, '/assets/');

    const outputDir = path.join(distDir, 'website-translation');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log('✅ [ELITE] Translation Sale Page Generated.');
}

async function generateLegalPages(distDir, shell) {
    console.log('🔨 [ELITE] Generating Legal Pages (Privacy, Cookies, Terms)...');

    const pages = [
        {
            slug: 'privacy',
            title: 'Privacy Policy',
            content: `
                <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-8">Privacy Policy</h1>
                <p class="text-text-muted mb-12">Last Updated: December 2024</p>
                <div class="space-y-12 text-gray-300 font-sans leading-relaxed">
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">1. Introduction</h2>
                        <p>Welcome to <strong>LaunchedIn10</strong> ("we," "our," or "us"). We provide done-for-you website design services to businesses in the UK and EU. We respect your privacy and are committed to protecting your personal data.</p>
                    </section>
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">2. The Information We Collect</h2>
                        <ul class="list-disc pl-6 space-y-2">
                            <li><strong>Identity Data:</strong> Includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data:</strong> Includes billing address, email address and telephone numbers.</li>
                            <li><strong>Project Data:</strong> Includes specific business details, content, and files you provide for your website build.</li>
                            <li><strong>Technical Data:</strong> Includes IP address, browser type, and device information.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p>We use your data to deliver the website design, hosting, and management services you have purchased, to manage our business, and to comply with legal obligations.</p>
                    </section>
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">4. Your Rights</h2>
                        <p>Under UK GDPR, you have the right to access, rectify, or erase your personal information. Contact us at hello@launchedin10.co.uk to exercise these rights.</p>
                    </section>
                </div>`
        },
        {
            slug: 'cookies',
            title: 'Cookie Policy',
            content: `
                <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-8">Cookie Policy</h1>
                <p class="text-text-muted mb-12">Last Updated: December 2024</p>
                <div class="space-y-12 text-gray-300 font-sans leading-relaxed">
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">1. What Are Cookies?</h2>
                        <p>Cookies are small text files placed on your device to help the website function and provide analytics.</p>
                    </section>
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">2. Specific Cookies We Use</h2>
                        <table class="w-full text-left border-collapse border border-white/10 mt-4 text-sm">
                            <thead>
                                <tr class="bg-white/5">
                                    <th class="p-4 border border-white/10 text-white font-bold">Cookie Name</th>
                                    <th class="p-4 border border-white/10 text-white font-bold">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="p-4 border border-white/10">_ga / _gid</td>
                                    <td class="p-4 border border-white/10">Google Analytics (Statistics)</td>
                                </tr>
                                <tr>
                                    <td class="p-4 border border-white/10">stripe_mid</td>
                                    <td class="p-4 border border-white/10">Stripe (Fraud Prevention)</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>`
        },
        {
            slug: 'terms',
            title: 'Terms of Service',
            content: `
                <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-8">Terms of Service</h1>
                <p class="text-text-muted mb-12">Last Updated: December 2024</p>
                <div class="space-y-12 text-gray-300 font-sans leading-relaxed">
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">1. 10-Day Guarantee</h2>
                        <p>We guarantee to deliver your live website within 10 business days of receiving your complete content. If we miss it, we refund your Activation Fee.</p>
                    </section>
                    <section>
                        <h2 class="text-2xl font-display font-bold text-white mb-4">2. Ownership</h2>
                        <p>You own your content, domain, and files. Always. Upon cancellation, we transfer your domain and provide your website assets.</p>
                    </section>
                </div>`
        }
    ];

    for (const page of pages) {
        let html = shell
            .replace('<title>LaunchedIn10</title>', `<title>${page.title} | LaunchedIn10</title>`)
            .replace('</head>', `<meta name="robots" content="noindex, follow" /></head>`);

        const bodyHtml = `
            <div class="bg-primary min-h-screen py-24 md:py-32">
                <div class="container mx-auto px-6 max-w-4xl">
                    ${page.content}
                </div>
            </div>
        `;

        html = html.replace(/<body[^>]*>([\s\S]*?)<\/body>/, `<body><div id="root">${bodyHtml}</div></body>`);

        const outputDir = path.join(distDir, page.slug);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    }
    console.log('✅ [ELITE] Legal Pages Generated.');
}

generateAll();
