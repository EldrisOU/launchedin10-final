import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Supabase Config (Robust fallback for production builds)
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://acheexsffdcuzidpiwbh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaGVleHNmZmRjdXppZHBpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU3MDAsImV4cCI6MjA4MjYwMTcwMH0._RH5vbfRy-v8iHzZkir1oS-aw-uzmmC7dUfgt8Bae1I';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// DEF-G3 compliant regex — catches iframe, bare URL, and embed patterns
const YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/)([\w-]{11})/g;

function extractVideoIds(content) {
    if (!content) return [];
    return [...new Set([...content.matchAll(YT_REGEX)].map(m => m[1]))];
}

async function generateSitemap() {
  try {
    console.log('🚀 [ELITE] Generating Sitemap (v3.5.0)...');

    // DEF-G1 fix: Select post_content, post_title, excerpt for video extraction
    const { data: posts, error } = await supabase
      .from('li10_posts')
      .select('slug, updated_at, primary_category, post_content, post_title, excerpt')
      .eq('status', 'publish');

    if (error) throw error;

    const baseUrl = 'https://launchedin10.co.uk';
    const staticPages = [
      '',
      '/privacy',
      '/terms',
      '/cookies',
      '/blog',
      '/case-studies',
      '/seo-automation',
      '/website-translation'
    ];

    // DEF-G2 fix: Add xmlns:video namespace
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

    // 1. Static Pages
    const buildDate = new Date().toISOString().split('T')[0];
    const legalPages = ['/privacy', '/terms', '/cookies'];
    staticPages.forEach(page => {
      const freq = legalPages.includes(page) ? 'monthly' : (page === '' ? 'daily' : 'weekly');
      xml += `
  <url>
    <loc>${baseUrl}${page === '' ? '/' : page + '/'}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // 2. Dynamic Posts (with video:video blocks)
    console.log(`📦 [ELITE] Processing ${posts.length} posts for sitemap...`);
    const categorySlugs = new Set();
    let videoCount = 0;

    posts.forEach(post => {
      const categoryName = post.primary_category || 'Digital Strategy';
      const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
      categorySlugs.add(categorySlug);

      const videoIds = extractVideoIds(post.post_content);

      xml += `
  <url>
    <loc>${baseUrl}/blog/${categorySlug}/${post.slug}/</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;

      // Video sitemap blocks (DEF-G1/G2/G3 compliant)
      videoIds.forEach((id, idx) => {
        videoCount++;
        const videoTitle = post.post_title || post.slug;
        const videoDesc = (post.excerpt || videoTitle).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const safeTitle = videoTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        xml += `
    <video:video>
      <video:thumbnail_loc>https://img.youtube.com/vi/${id}/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>${safeTitle}${videoIds.length > 1 ? ` — Video ${idx + 1}` : ''}</video:title>
      <video:description>${videoDesc}</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=${id}</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/${id}</video:player_loc>
    </video:video>`;
      });

      xml += `
  </url>`;
    });

    // 3. Category Silos (deduplicated by slug)
    categorySlugs.forEach(catSlug => {
      xml += `
  <url>
    <loc>${baseUrl}/blog/${catSlug}/</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    const distPath = path.resolve('dist', 'sitemap.xml');
    fs.writeFileSync(distPath, xml);
    console.log(`✅ [ELITE] Sitemap generated at ${distPath}`);
    console.log(`🎬 [ELITE] ${videoCount} video:video blocks from ${posts.filter(p => extractVideoIds(p.post_content).length > 0).length} posts`);

  } catch (err) {
    console.error('❌ [ELITE] Sitemap generation failed:', err);
    process.exit(1);  // FAIL BUILD — never deploy a sitemap with 0 posts
  }
}

generateSitemap();
