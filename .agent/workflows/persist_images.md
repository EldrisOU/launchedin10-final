---
description: How to persist AI-generated images as permanent assets in the repository
---

# Image Persistence Workflow

When the n8n workflow or an LLM generates a temporary image URL (e.g., from OpenAI/DALL-E), follow these steps to turn it into a permanent asset:

1. **Identify the URL**:
   - Locate the temporary `https://...` URL for the featured/secondary image.

2. **Download & Rename**:
   - Download the image to your local `public/blog-assets/` directory.
   - Use a descriptive slug from the blog post title (e.g., `seo-fundamentals-hero.png`).
   - **Mandatory**: Standardize on `.png` extension regardless of source format.

3. **Verification**:
   - Verify the image opens locally and has a reasonable file size.

4. **Sync with Git**:
   - Follow the `deployment_protocol.md` (Asset Pre-Push Protocol) to commit this file *before* updating Supabase.

5. **Update Supabase**:
   - Update the `li10_posts` record with the relative path: `/blog-assets/your-image-name.png`.
