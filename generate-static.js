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

    await generateBlogIndex(postsByCategory, distDir, masterShell);
    await generateCategoryPages(postsByCategory, distDir, masterShell);
    await generateIndividualPosts(posts, distDir, masterShell);

    // PHASE 2: HIGH-VALUE SILOS
    await generateCaseStudiesPage(distDir, masterShell);
    await generateSEOSalePage(distDir, masterShell);
    await generateTranslationSalePage(distDir, masterShell);

    console.log('🎉 [ELITE] Phase 2 Generation Complete.');
    process.exit(0);
}

async function generateBlogIndex(postsByCategory, distDir, shell) {
    console.log('🔨 [ELITE] Generating Blog Index...');

    const silosHtml = SILO_CATEGORIES.map(silo => {
        return generateSiloHtml(silo, postsByCategory[silo.name] || []);
    }).join('\n');

    let html = shell;
    html = html.replace('<title>LaunchedIn10</title>', '<title>Website Insights & Growth Guides | LaunchedIn10 Blog</title>');
    html = html.replace('</head>', '<meta name="description" content="Expert guides on website design, SEO fundamentals, and business growth for UK SMEs." /><link rel="canonical" href="https://launchedin10.co.uk/blog" /></head>');

    const preRenderedHtml = `
    <div id="root">
        <div class="bg-[var(--bg-warm)] min-h-screen">
            <section class="relative pt-48 pb-32 px-4 overflow-hidden bg-gradient-to-b from-[var(--bg-warm)] to-[var(--surface)]">
                <div class="max-w-screen-lg mx-auto text-center relative z-10">
                    <h1 class="text-5xl md:text-7xl font-display font-bold text-[var(--navy)] mb-8 tracking-tight leading-[1.05]">
                        Grow Your Business with Daily <span className="relative inline-block">SEO Content That Ranks</span>
                    </h1>
                    <p class="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
                        Expert guides, actionable insights, and proven strategies for UK SMEs.
                    </p>
                </div>
            </section>
            <section class="py-32 px-4 bg-[var(--bg-warm)]">
                <div class="max-w-screen-xl mx-auto">
                    ${silosHtml}
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace('<div id="root"></div>', preRenderedHtml);
    html = html.replace(/\.\/assets\//g, '/assets/');

    const outputPath = path.join(distDir, 'blog/index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log('✅ [ELITE] Blog Index Generated.');
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

        const preRenderedHtml = `
        <div id="root">
            <div class="bg-[var(--bg-warm)] min-h-screen">
                <section class="relative pt-48 pb-32 px-4 overflow-hidden bg-gradient-to-b from-[var(--bg-warm)] to-[var(--surface)]">
                    <div class="max-w-screen-lg mx-auto text-center relative z-10">
                        <h1 class="text-5xl md:text-7xl font-display font-bold text-[var(--navy)] mb-8 tracking-tight leading-[1.05]">
                            ${silo.name} <span class="relative inline-block">Insights</span>
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

        html = html.replace('<div id="root"></div>', preRenderedHtml);
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

        let postContent = post.post_content || '';
        // YouTube transformation... (omitting details for brevity in search replacement, but keeping logic)
        const youtubeRegex = /(?:<p>[\s\n\r]*)?(?:<figure[^>]*>[\s\n\r]*(?:<div[^>]*>[\s\n\r]*)?)?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[^\s<"']*)(?:[\s\n\r]*<\/div>)?(?:[\s\n\r]*<\/figure>)?(?:[\s\n\r]*<\/p>)?/g;
        postContent = postContent.replace(youtubeRegex, (match, videoId) => {
            return `<div class="youtube-container" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:4rem 0;border-radius:2rem;box-shadow:0 30px 60px rgba(0,0,0,0.2);background:#000;border:4px solid var(--navy);"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        });

        const preRenderedHtml = `
        <div id="root">
            <div class="elite-post-container" style="max-width:850px; margin: 160px auto; padding: 0 24px;">
                <header style="margin-bottom:5rem; text-align:center;">
                    <span style="color:var(--teal); font-weight:800; text-transform:uppercase; letter-spacing:0.2em; font-size:0.75rem; display:block; margin-bottom:1.5rem;">${categoryName}</span>
                    <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1.05; margin: 0 0 2.5rem 0; font-weight: 800; tracking: -0.02em; color: var(--navy);">${title}</h1>
                    <div style="color:var(--text-secondary); font-size:0.8rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; display:flex; align-items:center; justify-content:center; gap:1.5rem;">
                        <span>Published ${new Date(post.published_at || post.created_at).toLocaleDateString('en-GB')}</span>
                        <span style="width:4px; height:4px; background:var(--teal); border-radius:50%;"></span>
                        <span>${post.read_time || 5} Min Read</span>
                    </div>
                </header>
                ${post.featured_image_url ? `<div style="margin-bottom:6rem; border-radius:3rem; overflow:hidden; box-shadow:0 40px 80px rgba(26, 43, 74, 0.15); aspect-ratio: 21/9;"><img src="${post.featured_image_url}" style="width:100%; height:100%; object-fit:cover;" alt="${title}"></div>` : ''}
                <div class="post-content prose prose-xl" style="font-size:1.25rem; line-height:1.75; color:var(--text-primary);">
                    ${postContent}
                </div>
            </div>
        </div>`;

        html = html.replace('<div id="root"></div>', preRenderedHtml);
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

    html = html.replace('<div id="root"></div>', preRenderedHtml);
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

    const preRenderedHtml = `
    <div id="root">
        <div class="seo-page-wrapper">
            <section class="hero pt-48 pb-32 px-4 text-center bg-gradient-to-b from-[var(--bg-warm)] to-white">
                <div class="max-w-screen-lg mx-auto">
                    <span class="text-[var(--teal)] font-bold uppercase tracking-widest text-xs mb-6 block">The SEO Market Disruptor</span>
                    <h1 class="text-6xl md:text-8xl font-display font-bold text-[var(--navy)] mb-8 leading-[1.05]">Outrank Your Competitors <span class="text-[var(--teal)]">Before They Wake Up</span></h1>
                    <p class="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-16">Google rewards consistent, quality content. Most businesses can't keep up. Yours will. Our autonomous content engine publishes authority-building posts every single day—while your competitors scramble to catch up.</p>
                    
                    <div class="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto border-y border-[var(--border-subtle)] py-12">
                        <div>
                            <div class="text-4xl font-bold text-[var(--navy)] mb-2">Daily</div>
                            <div class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Fresh Content Published</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold text-[var(--navy)] mb-2">1,200+</div>
                            <div class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">Words Per Post</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold text-[var(--navy)] mb-2">12hrs</div>
                            <div class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">First Post Live</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="problem-section py-32 px-4 bg-white">
                <div class="max-w-screen-lg mx-auto">
                    <div class="text-center mb-24">
                        <div class="text-[var(--teal)] font-bold uppercase tracking-widest text-xs mb-6">The Hard Truth</div>
                        <h2 class="text-4xl md:text-6xl font-display font-bold text-[var(--navy)] mb-8">Google Changed the Rules. Most Businesses Are Drowning.</h2>
                        <p class="text-xl text-[var(--text-secondary)]">The algorithm now demands consistent, high-quality content at scale. Without it, you're invisible.</p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <div class="bg-[var(--bg-warm)] p-10 rounded-3xl border border-[var(--border-subtle)]">
                            <h3 class="text-xl font-bold text-[var(--navy)] mb-4">Your Competitors Are Moving</h3>
                            <p class="text-[var(--text-secondary)]">While you're planning your content calendar, they're publishing. Every day you wait is another day they're building authority you'll have to fight for.</p>
                        </div>
                        <div class="bg-[var(--bg-warm)] p-10 rounded-3xl border border-[var(--border-subtle)]">
                            <h3 class="text-xl font-bold text-[var(--navy)] mb-4">Content Costs Are Killing You</h3>
                            <p class="text-[var(--text-secondary)]">Freelancers charge £50-£100 per post. Agencies want retainers. By the time you've budgeted, your competitors have published 30 more articles.</p>
                        </div>
                        <div class="bg-[var(--bg-warm)] p-10 rounded-3xl border border-[var(--border-subtle)]">
                            <h3 class="text-xl font-bold text-[var(--navy)] mb-4">You Can't Scale Manually</h3>
                            <p class="text-[var(--text-secondary)]">Google's new quality signals favour volume and consistency. One post a week doesn't cut it anymore. You need daily output to compete.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace('<div id="root"></div>', preRenderedHtml);
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

    const preRenderedHtml = `
    <div id="root">
        <div class="translation-page-wrapper">
            <section class="hero pt-48 pb-32 px-4 text-center bg-gradient-to-b from-[var(--bg-warm)] to-white">
                <div class="max-w-screen-lg mx-auto">
                    <span class="text-[var(--teal)] font-bold uppercase tracking-widest text-xs mb-6 block">EU Expansion Made Simple</span>
                    <h1 class="text-6xl md:text-8xl font-display font-bold text-[var(--navy)] mb-8 leading-[1.05]">Sell Across Europe <span class="text-[var(--teal)]">Without Rebuilding Your Site</span></h1>
                    <p class="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto leading-relaxed mb-16">Clone and localise your existing website into any EU language. Proper structure, SEO signals, and hreflang baked in. <span>No agencies. No six-figure costs. No waiting months for delivery.</span></p>
                    
                    <div class="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto border border-[var(--border-subtle)] rounded-3xl p-10 bg-white shadow-sm">
                        <div>
                            <div class="text-4xl font-bold text-[var(--navy)] mb-1">23</div>
                            <div class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">EU Languages</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold text-[var(--navy)] mb-1">&lt;1hr</div>
                            <div class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Sites Go Live</div>
                        </div>
                        <div>
                            <div class="text-4xl font-bold text-[var(--navy)] mb-1">£29.95</div>
                            <div class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">From /month</div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="problem-section py-32 px-4 bg-white text-center">
                <div class="max-w-screen-lg mx-auto">
                    <div class="mb-24">
                        <div class="text-[var(--teal)] font-bold uppercase tracking-widest text-xs mb-6">The Reality</div>
                        <h2 class="text-4xl md:text-6xl font-display font-bold text-[var(--navy)] mb-8">EU Expansion Fails for Boring Reasons</h2>
                        <p class="text-xl text-[var(--text-secondary)]">Demand isn't the issue. Friction is. Localisation projects get stuck in cost, complexity, and constant rework.</p>
                    </div>
                </div>
            </section>
        </div>
    </div>`;

    html = html.replace('<div id="root"></div>', preRenderedHtml);
    html = html.replace(/\.\/assets\//g, '/assets/');

    const outputDir = path.join(distDir, 'website-translation');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log('✅ [ELITE] Translation Sale Page Generated.');
}

generateAll();
