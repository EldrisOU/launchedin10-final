import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Supabase environment variables missing.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ------------------------------------------------------------------
 *  ELITE BLOG DESIGN - TEMPLATE LOADER
 * ------------------------------------------------------------------
 */
function loadEliteTemplate() {
    try {
        const templatePath = path.resolve(__dirname, '../website/launchedin10-blog-categories.html');
        return fs.readFileSync(templatePath, 'utf8');
    } catch (error) {
        console.error('CRITICAL ERROR: Could not load design template:', error);
        process.exit(1);
    }
}

const ELITE_TEMPLATE = loadEliteTemplate();

/**
 * ------------------------------------------------------------------
 *  HTML GENERATION HELPERS (Strictly adhering to design)
 * ------------------------------------------------------------------
 */

const SVG_PLACEHOLDERS = [
    // Placeholder 1 (Rect + Circle)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
    // Placeholder 2 (Document)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`,
    // Placeholder 3 (Graph)
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
];

function generatePostCardHtml(post) {
    const date = new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const categoryName = post.primary_category || post.category || 'Insights';
    const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
    const postUrl = `/blog/${categorySlug}/${post.slug}/`;

    // Rotate placeholders based on title length pseudo-randomness
    const placeholderSvg = SVG_PLACEHOLDERS[(post.title || '').length % SVG_PLACEHOLDERS.length];

    // Check for image (Logic can be expanded later to use real images if DB has them)
    // const imageHtml = `<div class="post-image-placeholder">${placeholderSvg}</div>`;
    const imageHtml = post.image_url
        ? `<img src="${post.image_url}" alt="${post.title}" loading="lazy" />`
        : `<div class="post-image-placeholder">${placeholderSvg}</div>`;

    return `
    <!-- Post Card: ${post.title} -->
    <a href="${postUrl}" class="post-card">
        <div class="post-image">
            ${imageHtml}
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-tag">${categoryName}</span>
                <span class="post-date">${date}</span>
            </div>
            <h4 class="post-title">${post.title}</h4>
            <p class="post-excerpt">${post.excerpt || 'Read our latest guide on this topic...'}</p>
            <div class="post-read-time">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                ${post.read_time || '5 min read'}
            </div>
        </div>
    </a>`;
}

function generateCategoryBlockHtml(categoryName, posts) {
    const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
    const categoryUrl = `/blog/${categorySlug}/`;

    // Limit to 3 posts for the "Index" view
    const visiblePosts = posts.slice(0, 3);
    const postsHtml = visiblePosts.map(generatePostCardHtml).join('\n');

    return `
    <!-- CATEGORY: ${categoryName} -->
    <article class="category-block">
        <header class="category-header">
            <div class="category-title-group">
                <div class="category-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18"/>
                        <path d="M9 21V9"/>
                    </svg>
                </div>
                <div>
                    <h3>${categoryName}</h3>
                    <span class="category-count">${posts.length} Articles</span>
                </div>
            </div>
            <a href="${categoryUrl}" class="category-view-all">
                View All
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </a>
        </header>
        <div class="posts-grid">
            ${postsHtml}
        </div>
    </article>`;
}

function assignCategory(post) {
    if (post.primary_category) return post.primary_category;
    if (post.category) return post.category;

    const title = (post.title || '').toLowerCase();
    if (title.includes('seo') || title.includes('google') || title.includes('keyword')) return 'SEO Fundamentals';
    if (title.includes('design') || title.includes('website') || title.includes('ux')) return 'Website Design';
    if (title.includes('business') || title.includes('growth') || title.includes('lead')) return 'Business Growth';
    return 'Industry Insights';
}

/**
 * ------------------------------------------------------------------
 *  MAIN GENERATION CONTROLLER
 * ------------------------------------------------------------------
 */
async function generateAll() {
    console.log('🚀 Starting Elite Static Site Generation...');

    // 1. Fetch Posts
    // FIXED: Using correct table name 'li10_posts' and status 'publish'
    const { data: posts, error } = await supabase
        .from('li10_posts')
        .select('*')
        .eq('status', 'publish'); // 'publish' matches generate-sitemap.js

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log(`✅ Fetched ${posts.length} posts.`);

    // 2. Process Posts & Categories
    const postsByCategory = {};
    const ALL_CATEGORIES = new Set();

    posts.forEach(post => {
        post.category = assignCategory(post);
        ALL_CATEGORIES.add(post.category);

        if (!postsByCategory[post.category]) {
            postsByCategory[post.category] = [];
        }
        postsByCategory[post.category].push(post);
    });

    const categoryNames = Array.from(ALL_CATEGORIES);
    console.log('📂 Categories Identified:', categoryNames);

    const distDir = path.resolve(__dirname, 'dist');

    // 3. Generate Blog Index (/blog/index.html)
    await generateBlogIndex(postsByCategory, categoryNames, distDir);

    // 4. Generate Category Pages (/blog/[category]/index.html)
    await generateCategoryPages(postsByCategory, categoryNames, distDir);

    // 5. Generate Individual Posts (/blog/[category]/[slug]/index.html)
    // NOTE: Maintaining React App shell for individual posts for now, but fixing assets
    await generateIndividualPosts(posts, distDir);

    console.log('🎉 Elite SSG Complete.');
    process.exit(0);
}

/**
 * GENERATE BLOG INDEX
 */
async function generateBlogIndex(postsByCategory, categoryNames, distDir) {
    console.log('🔨 Generating Blog Index...');

    // Generate HTML for each category block
    const allCategoriesHtml = categoryNames.map(catName => {
        return generateCategoryBlockHtml(catName, postsByCategory[catName]);
    }).join('\n\n');

    // Inject into Template
    const cleanTemplate = ELITE_TEMPLATE.replace(
        /<div class="categories-grid">([\s\S]*?)<\/section>/,
        `<div class="categories-grid">\n${allCategoriesHtml}\n</div>\n    </section>`
    );

    const outputPath = path.join(distDir, 'blog/index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, cleanTemplate);
    console.log('✅ Blog Index Generated.');
}

/**
 * GENERATE CATEGORY PAGES
 */
async function generateCategoryPages(postsByCategory, categoryNames, distDir) {
    console.log('🔨 Generating Category Pages...');

    for (const catName of categoryNames) {
        const catSlug = catName.toLowerCase().replace(/ /g, '-');
        const posts = postsByCategory[catName];

        // 1. Generate Posts Grid (All Posts)
        const postsHtml = posts.map(generatePostCardHtml).join('\n');

        // 2. Prepare Template
        // We modify the TITLE and GRID
        let pageHtml = ELITE_TEMPLATE;

        // Dynamic Title
        pageHtml = pageHtml.replace(
            /<title>.*?<\/title>/,
            `<title>${catName} Guides | LaunchedIn10 Blog</title>`
        );

        // Dynamic Hero Header
        pageHtml = pageHtml.replace(
            /<h1>Grow Your Business with <span class="highlight">Daily SEO Content<\/span> That Ranks<\/h1>/,
            `<h1>Category: <span class="highlight">${catName}</span></h1>`
        );

        // Replace Grid with JUST this category's posts
        const categoryGridHtml = `
            <article class="category-block" style="border:none; box-shadow:none;">
                <div class="posts-grid">
                    ${postsHtml}
                </div>
            </article>
        `;

        pageHtml = pageHtml.replace(
            /<div class="categories-grid">([\s\S]*?)<\/section>/,
            `<div class="categories-grid">\n${categoryGridHtml}\n</div>\n    </section>`
        );

        const outputDir = path.join(distDir, 'blog', catSlug);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), pageHtml);
        console.log(`   - Generated /blog/${catSlug}/`);
    }
}

/**
 * GENERATE INDIVIDUAL POSTS (Legacy React Wrapper for Content Fidelity)
 */
async function generateIndividualPosts(posts, distDir) {
    console.log('🔨 Generating Individual Posts (React Shell)...');

    // We read the VITE built index.html from dist/index.html
    let reactTemplate;
    try {
        reactTemplate = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
    } catch (e) {
        console.log('Warning: dist/index.html not found, skipping post gen (this happens in pre-build check).');
        return;
    }

    for (const post of posts) {
        const categoryName = post.primary_category || post.category || 'Insights';
        const catSlug = categoryName.toLowerCase().replace(/ /g, '-');
        const postSlug = post.slug;

        // Ensure directory exists: /blog/[category]/[slug]/
        const outputDir = path.join(distDir, 'blog', catSlug, postSlug);
        fs.mkdirSync(outputDir, { recursive: true });

        // Clone React Template
        let html = reactTemplate;

        // INJECT SEO METADATA
        html = html.replace('<title>LaunchedIn10</title>', `<title>${post.title} | LaunchedIn10</title>`);
        html = html.replace(/<link rel="canonical".*?>/g, ''); // Clear existing
        html = html.replace('</head>', `<link rel="canonical" href="https://launchedin10.co.uk/blog/${catSlug}/${postSlug}/" /></head>`);

        // INJECT PRE-RENDERED TITLE (Basic SEO Fallback before React Hydrates)
        // This is "soft" hydration - React will take over, but bots see this title.
        html = html.replace('<div id="root"></div>', `<div id="root"><h1>${post.title}</h1><p>Loading article...</p></div>`);

        // ABSOLUTE PATH FIX
        html = html.replace(/\.\/assets\//g, '/assets/');

        fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    }
}

generateAll();
