import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || 'https://acheexsffdcuzidpiwbh.supabase.co',
    process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaGVleHNmZmRjdXppZHBpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMjU3MDAsImV4cCI6MjA4MjYwMTcwMH0._RH5vbfRy-v8iHzZkir1oS-aw-uzmmC7dUfgt8Bae1I'
);

async function generateStaticPosts() {
    try {
        console.log('🚀 [REVERT] Restoring Original React Structure...');

        const templatePath = path.resolve('dist', 'index.html');
        if (!fs.existsSync(templatePath)) {
            console.error('❌ Error: dist/index.html not found. Run vite build first.');
            return;
        }

        const { data: posts, error } = await supabase
            .from('li10_posts')
            .select('*')
            .eq('status', 'publish');

        if (error) throw error;
        console.log(`📦 [REVERT] Fetched ${posts.length} published posts.`);

        // 1. We NO LONGER patch dist/index.html. We leave it as a pure React SPA container.
        // This fixes the "white screen" hydration failure.

        // 2. We NO LONGER generate hardcoded static HTML files for blog/categories.
        // This fixes the "wrong UI" issue and missing images by letting React handle it.

        console.log('✅ [REVERT] SPA Root preserved. React will handle all routing and UI.');
        console.log('✨ [REVERT] Deployment Ready.');
    } catch (err) {
        console.error('❌ [REVERT] Operation Failed:', err);
    }
}

generateStaticPosts();
