import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * submit-bing-indexnow.js
 * 
 * Parses dist/sitemap.xml, extracts all <loc> URLs, and submits them
 * to the IndexNow API for Bing crawl acceleration.
 * 
 * Usage: node submit-bing-indexnow.js
 * Run AFTER: npm run build (sitemap.xml must exist in dist/)
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_KEY = '40b3efc5ab8e4c0e9ca6163daca5d29e';
const HOST = 'launchedin10.co.uk';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 100; // IndexNow supports up to 10,000 URLs per request

async function main() {
    console.log('🔍 [IndexNow] Reading sitemap.xml...');

    const sitemapPath = path.join(__dirname, 'dist', 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        console.error('❌ dist/sitemap.xml not found. Run "npm run build" first.');
        process.exit(1);
    }

    const sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

    if (urls.length === 0) {
        console.error('❌ No URLs found in sitemap.xml.');
        process.exit(1);
    }

    console.log(`📦 [IndexNow] Found ${urls.length} URLs to submit.`);

    // Submit in batches
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const batch = urls.slice(i, i + BATCH_SIZE);
        const batchNum = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(urls.length / BATCH_SIZE);

        console.log(`\n🚀 [IndexNow] Submitting batch ${batchNum}/${totalBatches} (${batch.length} URLs)...`);

        const payload = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: batch
        };

        try {
            const response = await fetch(INDEXNOW_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 200 || response.status === 202) {
                console.log(`✅ Batch ${batchNum}: HTTP ${response.status} — Accepted`);
            } else {
                const body = await response.text();
                console.error(`⚠️  Batch ${batchNum}: HTTP ${response.status} — ${body}`);
            }
        } catch (err) {
            console.error(`❌ Batch ${batchNum}: Network error — ${err.message}`);
        }

        // Rate limit: 1 second between batches
        if (i + BATCH_SIZE < urls.length) {
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    console.log(`\n🎉 [IndexNow] Submission complete. ${urls.length} URLs submitted to Bing.`);
    console.log(`📋 Key file: https://${HOST}/${INDEXNOW_KEY}.txt`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
