
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { record } = await req.json();
        const { id, featured_image_url, secondary_image_url, og_image } = record;

        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        const persistImage = async (url: string, prefix: string) => {
            if (!url || !url.startsWith("http") || url.includes("supabase.co")) return null;

            console.log(`Persisting image: ${url}`);
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);

            const blob = await response.blob();
            const contentType = response.headers.get("content-type") || "image/png";

            // Better extension logic
            let extension = "png";
            if (contentType.includes("webp")) extension = "webp";
            else if (contentType.includes("jpeg")) extension = "jpg";
            else if (contentType.includes("gif")) extension = "gif";
            else {
                const path = url.split("?")[0];
                const pathExt = path.split(".").pop();
                if (pathExt && pathExt.length <= 4 && /^[a-zA-Z]+$/.test(pathExt)) {
                    extension = pathExt;
                }
            }

            const fileName = `${prefix}_${id}_${Date.now()}.${extension}`;

            const { data, error } = await supabaseAdmin.storage
                .from("blog-images")
                .upload(fileName, blob, {
                    contentType: contentType,
                    upsert: true,
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabaseAdmin.storage
                .from("blog-images")
                .getPublicUrl(fileName);

            return publicUrl;
        };

        const newFeaturedUrl = await persistImage(featured_image_url, "hero");
        const newSecondaryUrl = await persistImage(secondary_image_url, "secondary");
        const newOgUrl = await persistImage(og_image, "og");

        if (newFeaturedUrl || newSecondaryUrl || newOgUrl) {
            console.log("Updating record with persisted URLs...");
            const updates: any = {};
            if (newFeaturedUrl) updates.featured_image_url = newFeaturedUrl;
            if (newSecondaryUrl) updates.secondary_image_url = newSecondaryUrl;
            if (newOgUrl) updates.og_image = newOgUrl;

            const { error: updateError } = await supabaseAdmin
                .from("li10_posts")
                .update(updates)
                .eq("id", id);

            if (updateError) throw updateError;
        }

        console.log("Waiting 120 seconds before rebuilding...");
        await new Promise((resolve) => setTimeout(resolve, 120000));

        console.log("Triggering Cloudflare build...");
        const cfResponse = await fetch(
            "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/2fbf1004-fc48-416e-a445-9806f53a489b",
            { method: "POST" }
        );

        if (!cfResponse.ok) {
            console.error("Cloudflare build trigger failed", await cfResponse.text());
        }

        return new Response(JSON.stringify({ ok: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error in persist-blog-assets:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
