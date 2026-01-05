import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Supabase Config (Robust fallback for production builds)
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://acheexsffdcuzidpiwbh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaGVleHNmZmRjdXppZHBpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU3MDAsImV4cCI6MjA4MjYwMTcwMH0._RH5vbfRy-v8iHzZkir1oS-aw-uzmmC7dUfgt8Bae1I';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateSitemap() {
  try {
    console.log('🚀 [ELITE] Generating Sitemap (v3.5.0)...');

    const { data: posts, error } = await supabase
      .from('li10_posts')
      .select('slug, updated_at, primary_category')
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

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. Static Pages
    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // 2. Dynamic Posts
    console.log(`📦 [ELITE] Processing ${posts.length} posts for sitemap...`);
    const categories = new Set();

    posts.forEach(post => {
      const categoryName = post.primary_category || 'Digital Strategy';
      const categorySlug = categoryName.toLowerCase().replace(/ /g, '-');
      categories.add(categoryName);

      xml += `
  <url>
    <loc>${baseUrl}/blog/${categorySlug}/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // 3. Category Silos
    categories.forEach(catName => {
      const catSlug = catName.toLowerCase().replace(/ /g, '-');
      xml += `
  <url>
    <loc>${baseUrl}/blog/${catSlug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    xml += '\n</urlset>';

    const distPath = path.resolve('dist', 'sitemap.xml');
    fs.writeFileSync(distPath, xml);
    console.log(`✅ [ELITE] Sitemap generated at ${distPath}`);

  } catch (err) {
    console.error('❌ [ELITE] Sitemap generation failed:', err);
  }
}

generateSitemap();
