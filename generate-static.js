import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || 'https://acheexsffdcuzidpiwbh.supabase.co',
    process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaGVleHNmZmRjdXppZHBpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU3MDAsImV4cCI6MjA4MjYwMTcwMH0._RH5vbfRy-v8iHzZkir1oS-aw-uzmmC7dUfgt8Bae1I'
);

// CSS Utility for writing vertical text
const cssStyles = `
<style>
    .writing-vertical-rl { writing-mode: vertical-rl; text-orientation: mixed; }
    .shadow-luxury { box-shadow: 0 4px 24px rgba(26, 43, 74, 0.06); }
</style>
`;

// HTML TEMPLATING LOGIC
const generatePostCardHtml = (post) => {
    const categorySlug = (post.primary_category || 'Digital Strategy').toLowerCase().replace(/ /g, '-');
    return `
    <article class="post-card group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
        <a href="/blog/${categorySlug}/${post.slug}" class="block aspect-[16/10] overflow-hidden bg-[#1A2B4A]">
            <img 
                src="${post.featured_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'}" 
                alt="${post.image_alt || post.post_title}"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
        </a>
        <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-4 mb-4">
                <span class="text-[10px] font-bold text-[#0EA5A5] uppercase tracking-widest">${post.primary_category || 'Digital Strategy'}</span>
                <span class="text-xs text-[#1A2B4A]/50">${new Date(post.published_at || post.created_at).toLocaleDateString('en-GB')}</span>
            </div>
            <h4 class="text-lg font-bold text-[#1A2B4A] mb-3 leading-snug group-hover:text-[#0EA5A5] transition-colors">
                <a href="/blog/${categorySlug}/${post.slug}">${post.post_title}</a>
            </h4>
            <p class="text-sm text-[#1A2B4A]/70 line-clamp-3 mb-6 flex-grow leading-relaxed">
                ${post.excerpt || post.yoast_description || ''}
            </p>
            <div class="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto text-[10px] font-bold text-[#1A2B4A]/50 uppercase tracking-wider">
                <div class="flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-[#0EA5A5]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    ${post.read_time || 5} min read
                </div>
                <a href="/blog/${categorySlug}/${post.slug}" class="text-[#1A2B4A] hover:text-[#0EA5A5] transition-colors">Full Guide</a>
            </div>
        </div>
    </article>
    `;
};

const generateBlogIndexPage = (posts, titleSuffix = "Inside The Lab") => {
    const categories = [
        { id: 'business-growth', name: 'Business Growth', desc: 'Scaling strategies and automation playbooks for elite performance.' },
        { id: 'website-design', name: 'Website Design', desc: 'Conversion-first architecture and premium user experience guides.' },
        { id: 'seo-fundamentals', name: 'SEO Fundamentals', desc: 'Technical SEO and authority building for search dominance.' },
        { id: 'industry-spotlights', name: 'Industry Spotlights', desc: 'Sector-specific insights and emerging technology trends.' }
    ];

    const categorySections = categories.map(cat => {
        const catPosts = posts.filter(p => (p.primary_category || '').toLowerCase() === cat.name.toLowerCase());
        if (catPosts.length === 0) return '';

        return `
        <div class="category-block bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-24">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 pb-8 border-b border-gray-50">
                <div class="flex items-center gap-6">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2B4A] to-[#010816] flex items-center justify-center text-[#0EA5A5] shadow-lg">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                    </div>
                    <div>
                        <h3 class="text-3xl font-bold text-[#1A2B4A] font-display">${cat.name}</h3>
                        <p class="text-[#1A2B4A]/50 mt-1">${cat.desc}</p>
                    </div>
                </div>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${catPosts.map(p => generatePostCardHtml(p)).join('')}
            </div>
        </div>
        `;
    }).join('');

    return `
    <div class="bg-[#F9F8F6] min-h-screen">
        <section class="relative pt-48 pb-32 px-4 overflow-hidden bg-gradient-to-b from-[#F9F8F6] to-[#F2F0EB]">
            <div class="max-w-screen-lg mx-auto text-center relative z-10">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0EA5A5]/10 border border-[#0EA5A5]/20 text-[#0EA5A5] text-sm font-semibold mb-8">
                    Elite Digital Intelligence
                </div>
                <h1 class="text-5xl md:text-7xl font-bold text-[#1A2B4A] font-display mb-8 tracking-tight leading-[1.05]">
                    ${titleSuffix}
                </h1>
                <p class="text-xl text-[#1A2B4A]/70 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Master the mechanics of high-performance digital assets. No fluff. Just the frameworks we use to launch businesses in 10 days.
                </p>
            </div>
        </section>
        
        <section class="py-32 px-4">
            <div class="max-w-screen-xl mx-auto">
                ${categorySections}
            </div>
        </section>
    </div>
    `;
};

const parseYoutubeVideos = (content) => {
    // Robust YouTube regex for WordPress/Lucide embeds
    const youtubeRegex = /<figure[^>]*>.*?https:\/\/www\.youtube\.com\/watch\?v=([\w-]+).*?<\/figure>/g;
    return content.replace(youtubeRegex, (match, videoId) => {
        return `
        <div class="my-12 relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-black">
            <iframe 
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        `;
    });
};

const NavBarHtml = `
<nav class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-luxury h-20 flex items-center">
    <div class="max-w-screen-xl mx-auto px-6 w-full flex justify-between items-center">
        <a href="/" class="group flex items-center gap-3">
            <div class="w-10 h-10 bg-[#1A2B4A] rounded-xl flex items-center justify-center text-white group-hover:bg-[#0EA5A5] transition-colors duration-500 shadow-lg shadow-[#1A2B4A]/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3l1 1"></path><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5l-1-1"></path><line x1="11.5" y1="15.5" x2="15.5" y2="11.5"></line><path d="M8 9l3 3"></path><path d="M13 14l3 3"></path></svg>
            </div>
            <span class="font-bold text-xl text-[#1A2B4A] tracking-tight">Launched<span class="text-[#0EA5A5] underline decoration-[#0EA5A5]/30 decoration-4 underline-offset-4">In10</span></span>
        </a>
        <div class="hidden md:flex items-center gap-10">
            <a href="/#process" class="text-sm font-bold text-[#1A2B4A]/70 hover:text-[#0EA5A5] transition-all uppercase tracking-widest">Process</a>
            <a href="/#pricing" class="text-sm font-bold text-[#1A2B4A]/70 hover:text-[#0EA5A5] transition-all uppercase tracking-widest">Pricing</a>
            <a href="/blog" class="text-sm font-bold text-[#0EA5A5] border-b-2 border-[#0EA5A5] pb-1 transition-all uppercase tracking-widest">Insights</a>
            <a href="/#pricing" class="bg-[#1A2B4A] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#1A2B4A]/80 transition-all shadow-xl shadow-[#1A2B4A]/20 hover:-translate-y-1 uppercase tracking-widest">Start Build</a>
        </div>
    </div>
</nav>
`;

const FooterHtml = `
<footer class="bg-[#1A2B4A] text-white pt-32 pb-12 overflow-hidden relative">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0EA5A5] to-transparent"></div>
    <div class="max-w-screen-xl mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div class="col-span-1 md:col-span-2 text-center md:text-left">
                <a href="/" class="inline-block mb-8">
                    <span class="font-bold text-3xl tracking-tighter capitalize">Launched<span class="text-[#0EA5A5] italic">In10</span></span>
                </a>
                <p class="text-gray-400 text-lg leading-relaxed max-w-md mb-8 mx-auto md:mx-0">Precision engineering for the private sector. We build hyper-performance digital assets that turn visibility into regional market share.</p>
                <div class="flex justify-center md:justify-start gap-4">
                    <div class="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#0EA5A5] transition-colors cursor-pointer group">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400 group-hover:text-white transition-colors"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </div>
                    <div class="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#0EA5A5] transition-colors cursor-pointer group">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400 group-hover:text-white transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </div>
                </div>
            </div>
            <div class="text-center md:text-left">
                <h4 class="font-bold text-[10px] uppercase tracking-[0.2em] text-[#0EA5A5] mb-8">Navigation</h4>
                <ul class="space-y-4 text-gray-400 font-medium">
                    <li><a href="/#process" class="hover:text-white transition-colors">Process</a></li>
                    <li><a href="/#pricing" class="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="/blog" class="hover:text-white transition-colors">Insights</a></li>
                    <li><a href="/#comparison" class="hover:text-white transition-colors">Comparison</a></li>
                </ul>
            </div>
            <div class="text-center md:text-left">
                <h4 class="font-bold text-[10px] uppercase tracking-[0.2em] text-[#0EA5A5] mb-8">Legal</h4>
                <ul class="space-y-4 text-gray-400 font-medium">
                    <li><a href="/privacy" class="hover:text-white transition-colors">Privacy</a></li>
                    <li><a href="/terms" class="hover:text-white transition-colors">Terms</a></li>
                    <li><a href="/cookies" class="hover:text-white transition-colors">Cookies</a></li>
                </ul>
            </div>
        </div>
        <div class="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-500 gap-8">
            <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full bg-[#0EA5A5] animate-pulse"></span>
                <span>Systems Online - v3.5.5</span>
            </div>
            <p>&copy; ${new Date().getFullYear()} LaunchedIn10. All rights reserved.</p>
            <div class="flex gap-6">
                <span>UK Stack</span>
                <span>Elite Performance</span>
            </div>
        </div>
    </div>
</footer>
`;

const ConciergePanelHtml = `
<div class="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-[#1A2B4A] text-[#0EA5A5] border border-[rgba(14,165,165,0.2)] border-r-0 shadow-2xl py-8 px-3 rounded-l-xl cursor-pointer overflow-hidden group transition-all hover:pl-6">
    <div class="absolute inset-0 bg-[rgba(14,165,165,0.1)] translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
    <div class="flex flex-col items-center gap-4 writing-vertical-rl rotate-180">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="rotate-90 text-[#0EA5A5]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <span class="font-bold tracking-[0.2em] text-xs text-white uppercase font-display">CONCIERGE</span>
    </div>
</div>
`;

// IMPORTANT: This layout must match App.jsx exactly for hydration
const wrapWithAppLayout = (content) => {
    return `
    <div class="min-h-screen bg-[#F9F8F6] selection:bg-[#0EA5A5] selection:text-white">
        ${NavBarHtml}
        ${content}
        ${FooterHtml}
        ${ConciergePanelHtml}
    </div>
    `;
};

async function generateStaticPosts() {
    try {
        console.log('🚀 [ELITE] Starting Static Generation Pipeline v3.5.5...');

        const templatePath = path.resolve('dist', 'index.html');
        if (!fs.existsSync(templatePath)) {
            console.error('❌ Error: dist/index.html not found. Run vite build first.');
            return;
        }

        const template = fs.readFileSync(templatePath, 'utf8');
        const { data: posts, error } = await supabase
            .from('li10_posts')
            .select('*')
            .eq('status', 'publish');

        if (error) throw error;
        console.log(`📦 [ELITE] Fetched ${posts.length} published posts.`);

        // Helper to normalize template for base path issues
        const finalizeHtml = (content, title, desc, canonical) => {
            return template
                .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
                .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${desc}" />`)
                .replace('</head>', `
                    <link rel="canonical" href="${canonical}" />
                    ${cssStyles}
                </head>`)
                .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
        };

        // 1. Generate Main Blog Index
        const blogIndexDir = path.resolve('dist', 'blog');
        if (!fs.existsSync(blogIndexDir)) fs.mkdirSync(blogIndexDir, { recursive: true });

        const blogIndexContent = generateBlogIndexPage(posts);
        const fullIndexLayout = wrapWithAppLayout(`<main class="relative z-10">${blogIndexContent}</main>`);

        const blogIndexHtml = finalizeHtml(
            fullIndexLayout,
            'Website Insights & Growth Guides | LaunchedIn10 Blog',
            'Expert guides on website design, SEO fundamentals, and business growth for UK SMEs.',
            'https://launchedin10.co.uk/blog'
        );

        fs.writeFileSync(path.join(blogIndexDir, 'index.html'), blogIndexHtml);
        console.log('✅ [ELITE] Pre-rendered Index: /blog/index.html');

        // 2. Pre-render Category Index Pages
        const uniqueCategories = [...new Set(posts.map(p => p.primary_category || 'Digital Strategy'))];
        for (const catName of uniqueCategories) {
            const catSlug = catName.toLowerCase().replace(/ /g, '-');
            const catDir = path.resolve('dist', 'blog', catSlug);
            if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

            const catPosts = posts.filter(p => (p.primary_category || 'Digital Strategy') === catName);
            const catIndexContent = generateBlogIndexPage(catPosts, catName);
            const fullCatIndex = wrapWithAppLayout(`<main class="relative z-10">${catIndexContent}</main>`);

            const catIndexHtml = finalizeHtml(
                fullCatIndex,
                `${catName} Insights | LaunchedIn10`,
                `Expert guides and strategies for ${catName}.`,
                `https://launchedin10.co.uk/blog/${catSlug}`
            );

            fs.writeFileSync(path.join(catDir, 'index.html'), catIndexHtml);
            console.log(`✅ [ELITE] Pre-rendered Category Index: /blog/${catSlug}/index.html`);
        }

        // 3. Generate Individual Posts
        for (const post of posts) {
            const categorySlug = (post.primary_category || 'Digital Strategy').toLowerCase().replace(/ /g, '-');
            const postDir = path.resolve('dist', 'blog', categorySlug, post.slug);
            if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

            let processedContent = parseYoutubeVideos(post.post_content || '');

            const postHtmlStructure = wrapWithAppLayout(`
                <main class="relative pt-24 pb-32 bg-[#F9F8F6]">
                    <article class="max-w-screen-lg mx-auto px-6">
                        <header class="text-center mb-16 pt-24">
                            <span class="inline-block px-4 py-1.5 rounded-full bg-[#0EA5A5]/10 text-[#0EA5A5] text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#0EA5A5]/20">${post.primary_category || 'Elite Guide'}</span>
                            <h1 class="text-4xl md:text-6xl font-bold text-[#1A2B4A] font-display mb-8 leading-[1.1] tracking-tight">${post.post_title}</h1>
                            <div class="flex items-center justify-center gap-6 text-[#1A2B4A]/50 font-bold text-[10px] uppercase tracking-widest">
                                <span>${new Date(post.published_at || post.created_at).toLocaleDateString('en-GB')}</span>
                                <span class="w-1.5 h-1.5 bg-[#0EA5A5] rounded-full"></span>
                                <span>${post.read_time || 5} MIN READ</span>
                            </div>
                        </header>
                        <div class="aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 shadow-2xl border border-gray-100">
                            <img src="${post.featured_image_url}" alt="${post.image_alt || post.post_title}" class="w-full h-full object-cover" />
                        </div>
                        <div class="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#1A2B4A] prose-headings:font-display prose-p:text-[#1A2B4A]/80 prose-a:text-[#0EA5A5] prose-strong:text-[#1A2B4A]">
                            ${processedContent}
                        </div>
                    </article>
                </main>
            `);

            const postHtml = finalizeHtml(
                postHtmlStructure,
                `${post.post_title} | LaunchedIn10`,
                post.yoast_description || post.excerpt || '',
                `https://launchedin10.co.uk/blog/${categorySlug}/${post.slug}`
            );

            fs.writeFileSync(path.join(postDir, 'index.html'), postHtml);
            console.log(`✅ [ELITE] Pre-rendered Post: /blog/${categorySlug}/${post.slug}`);
        }

        console.log('✨ [ELITE] Static Deployment Ready.');
    } catch (err) {
        console.error('❌ [ELITE] Generation Failed:', err);
    }
}

generateStaticPosts();
