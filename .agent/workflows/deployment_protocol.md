---
description: How to deploy updates to the blog without causing broken images (Asset Pre-Push Protocol)
---

# Asset Pre-Push Deployment Protocol

To prevent "Blind Builds" (where Cloudflare builds the site before assets are available in the repository), always follow this sequence:

1. **Local Asset Preparation**:
   - Save all new blog images to `public/blog-assets/`.
   - Ensure they use `.png` extensions (even if the source is JPEG) to match frontend logic.

2. **Git Push FIRST**:
   - Add, commit, and push the image assets to the `main` branch.
   ```bash
   git add public/blog-assets/
   git commit -m "chore: add blog assets for [New Post Title]"
   git push origin main
   ```

3. **Verify Asset Visibility**:
   - Check the GitHub repository to ensure the files are physically present in the `main` branch.

4. **Update Supabase SECOND**:
   - Only after the assets are pushed, update the `featured_image_url` or `post_content` in the `li10_posts` table.
   - **Reason**: The Supabase update triggers an immediate Cloudflare rebuild. Cloudflare clones the repository *at that moment*. If you haven't pushed yet, the build container will not have the images, resulting in 404s.

5. **Monitor Build**:
   - Verify the Cloudflare Pages build completes and check the live site.
