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
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>`,
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
];

function generatePostCardHtml(post) {
    const title = post.post_title || post.title || 'Untitled Post';
    const dateStr = post.published_at || post.created_at;
    const date = new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const categoryName = post.primary_category || post.category || 'Insights';
    const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
    const postUrl = `/blog/${categorySlug}/${post.slug}/`;

    const placeholderSvg = SVG_PLACEHOLDERS[title.length % SVG_PLACEHOLDERS.length];
    const imageUrl = post.featured_image_url || post.image_url;

    const imageHtml = imageUrl
        ? `<img src="${imageUrl}" alt="${title}" loading="lazy" />`
        : `<div class="post-image-placeholder">${placeholderSvg}</div>`;

    return `
    <!-- Post Card: ${title} -->
    <a href="${postUrl}" class="post-card">
        <div class="post-image">
            ${imageHtml}
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-tag">${categoryName}</span>
                <span class="post-date">${date}</span>
            </div>
            <h4 class="post-title">${title}</h4>
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

    const title = (post.post_title || post.title || '').toLowerCase();
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
    console.log('🚀 [ELITE] Starting Static Site Generation...');

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
    const distDir = path.resolve(__dirname, 'dist');

    await generateBlogIndex(postsByCategory, categoryNames, distDir);
    await generateCategoryPages(postsByCategory, categoryNames, distDir);
    await generateIndividualPosts(posts, distDir);

    console.log('🎉 [ELITE] Static Site Generation Complete.');
    process.exit(0);
}

async function generateBlogIndex(postsByCategory, categoryNames, distDir) {
    console.log('🔨 [ELITE] Generating Blog Index...');

    const allCategoriesHtml = categoryNames.map(catName => {
        return generateCategoryBlockHtml(catName, postsByCategory[catName]);
    }).join('\n\n');

    const cleanTemplate = ELITE_TEMPLATE.replace(
        /<div class="categories-grid">([\s\S]*?)<\/section>/,
        `<div class="categories-grid">\n${allCategoriesHtml}\n</div>\n    </section>`
    );

    const outputPath = path.join(distDir, 'blog/index.html');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, cleanTemplate);
    console.log('✅ [ELITE] Blog Index Generated.');
}

async function generateCategoryPages(postsByCategory, categoryNames, distDir) {
    console.log('🔨 [ELITE] Generating Category Pages...');

    for (const catName of categoryNames) {
        const catSlug = catName.toLowerCase().replace(/ /g, '-');
        const posts = postsByCategory[catName];
        const postsHtml = posts.map(generatePostCardHtml).join('\n');

        let pageHtml = ELITE_TEMPLATE;
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${catName} Guides | LaunchedIn10 Blog</title>`);
        pageHtml = pageHtml.replace(/<h1>Grow Your Business with <span class="highlight">Daily SEO Content<\/span> That Ranks<\/h1>/, `<h1>Category: <span class="highlight">${catName}</span></h1>`);

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

async function generateIndividualPosts(posts, distDir) {
    console.log('🔨 [ELITE] Generating Individual Posts (React Shell)...');

    let reactTemplate;
    try {
        reactTemplate = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
    } catch (e) {
        console.log('Warning: dist/index.html not found, using basic generator logic.');
        return;
    }

    for (const post of posts) {
        const categoryName = post.primary_category || post.category || 'Insights';
        const catSlug = categoryName.toLowerCase().replace(/ /g, '-');
        const postSlug = post.slug;
        const title = post.post_title || post.title;

        const outputDir = path.join(distDir, 'blog', catSlug, postSlug);
        fs.mkdirSync(outputDir, { recursive: true });

        let html = reactTemplate;

        // SEO METADATA
        html = html.replace('<title>LaunchedIn10</title>', `<title>${title} | LaunchedIn10</title>`);
        html = html.replace(/<link rel="canonical".*?>/g, '');
        html = html.replace('</head>', `<link rel="canonical" href="https://launchedin10.co.uk/blog/${catSlug}/${postSlug}/" /></head>`);

        // TRANSFORM YOUTUBE VIDEOS & CONTENT (Elite Robust version)
        let postContent = post.post_content || '';
        const youtubeRegex = /(?:<figure[^>]*>)?(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})(?:[^\s<"']*)(?:<\/figure>)?/g;

        postContent = postContent.replace(youtubeRegex, (match, videoId) => {
            return `
                <div class="youtube-container" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:4rem 0;border-radius:2rem;box-shadow:0 30px 60px rgba(0,0,0,0.2);background:#000;border:4px solid var(--navy);">
                    <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1" 
                        style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>`;
        });

        // INJECT PRE-RENDERED CONTENT (Elite Design Fallback)
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
                    
                    ${post.featured_image_url ? `
                    <div style="margin-bottom:6rem; border-radius:3rem; overflow:hidden; box-shadow:0 40px 80px rgba(26, 43, 74, 0.15); aspect-ratio: 21/9;">
                        <img src="${post.featured_image_url}" style="width:100%; height:100%; object-fit:cover;" alt="${title}">
                    </div>
                    ` : ''}

                    <div class="post-content prose prose-xl" style="font-size:1.25rem; line-height:1.75; color:var(--text-primary);">
                        ${postContent}
                    </div>
                </div>
            </div>`;

        html = html.replace('<div id="root"></div>', preRenderedHtml);
        html = html.replace(/\.\/assets\//g, '/assets/');

        fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    }
}

generateAll();
