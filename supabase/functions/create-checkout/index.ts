
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    // Define config vars
    let stripeKey = "";
    let supabaseUrl = "";
    let serviceRoleKey = "";

    try {
        // --- 1. Environment & Config Validation ---
        stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
        supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

        if (!stripeKey) throw new Error("Missing STRIPE_SECRET_KEY in Supabase Secrets.");
        if (!supabaseUrl || !serviceRoleKey) throw new Error("Missing Supabase configuration (URL or Service Role Key).");

        const stripe = new Stripe(stripeKey, {
            apiVersion: "2023-10-16",
            httpClient: Stripe.createFetchHttpClient(),
        });

        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

        // --- 2. Parse Request Data ---
        // SECURITY NOTE: We IGNORE deposit_amount / monthly_amount from client to prevent tampering.
        const { user_id, email, formData } = await req.json();

        if (!email) throw new Error("Email is required for checkout.");

        console.log(`Processing checkout for ${email}. Tier: ${formData?.tier}`);

        // --- 3. Database Operations (Service Role Bypasses RLS) ---
        const { data: project, error: projError } = await supabaseAdmin
            .from('li10_projects')
            .upsert({
                user_id: user_id || null, // Allow guest
                client_email: email,
                business_name: formData?.businessName || 'New Project',
                client_name: formData?.clientName || email,
                tier: formData?.tier || 'standard',
                project_type: formData?.projectType || 'website',
                seo_active: formData?.seoActive || false,
                seo_tier: formData?.seoTier || null,
                status: 'pending_payment', // Reset/Set status to pending payment
                notes: JSON.stringify(formData)
            }, { onConflict: 'client_email' }) // Use upsert to handle re-tries gracefully
            .select()
            .single();

        if (projError) {
            console.error("Database Error (li10_projects):", projError);
            throw new Error(`Failed to create/update project record: ${projError.message}`);
        }

        const projectId = project.id;

        // Save full onboarding submission for redundancy
        try {
            await supabaseAdmin
                .from('li10_onboarding_submissions')
                .insert({
                    project_id: projectId,
                    user_id: user_id || null,
                    submission_data: formData
                });
        } catch (dumpError) {
            console.warn("Minor error: Failed to save full onboarding dump:", dumpError);
        }

        // --- 4. Stripe Customer Management ---
        let customerId;
        const { data: customers } = await stripe.customers.search({
            query: `email:'${email}'`,
        });

        if (customers && customers.length > 0) {
            customerId = customers[0].id;
        } else {
            const customer = await stripe.customers.create({
                email: email,
                name: formData?.clientName || email,
                metadata: { user_id: user_id || 'guest', project_id: projectId }
            });
            customerId = customer.id;
        }

        // --- 5. Strict Server-Side Pricing Logic ---

        // A. Product Mapping
        const TIER_PRODUCTS: Record<string, string> = {
            'starter': 'prod_TgumwI3gEqvimb',
            'growth': 'prod_TgumEjvofvyNsa',
            'scale': 'prod_Tgun40LfY54Tm0'
        };

        const ACTIVATION_PRODUCTS: Record<string, string> = {
            'starter': 'prod_TgBLhW68e7Yc5q',
            'growth': 'prod_TgBML9295Hq9P9',
            'scale': 'prod_TgBNpR3gcxtj5E'
        };

        const SEO_PRODUCTS: Record<string, string> = {
            'launch': 'prod_TiOiCMTWN2yzSQ',
            'boost': 'prod_TiOipEc43AX3x5',
            'orbit': 'prod_TiOikoBcjgCA7j'
        };

        const SEO_ONBOARDING_PRODUCT = 'prod_TiOiBz7sbfXNpa';

        const subscriptionItems = [];

        // 1. Handle Main Website Tier (Monthly Care Plan)
        const tierKey = (formData?.tier || 'starter').toLowerCase();
        const mainProductId = TIER_PRODUCTS[tierKey] || TIER_PRODUCTS['growth'];
        const activationProductId = ACTIVATION_PRODUCTS[tierKey] || ACTIVATION_PRODUCTS['growth'];

        console.log(`Resolving Pricing for Main Tier: ${tierKey} (Care Prod: ${mainProductId}, Activation Prod: ${activationProductId})`);

        const { data: mainPrices } = await stripe.prices.list({
            product: mainProductId,
            active: true,
            limit: 10
        });

        const { data: activationPrices } = await stripe.prices.list({
            product: activationProductId,
            active: true,
            limit: 10
        });

        const mainSubPrice = mainPrices.find(p => p.recurring?.interval === 'month');
        // Look for the activation fee (one-time price) on the activation product
        const mainActivationPrice = activationPrices.find(p => p.type === 'one_time' && p.unit_amount > 10000);

        if (!mainSubPrice) throw new Error(`No monthly price found for product ${mainProductId}`);

        subscriptionItems.push({ price: mainSubPrice.id });

        // 2. Handle SEO Tier (optional subscription)
        if (formData?.seoActive && formData?.seoTier) {
            const seoProductId = SEO_PRODUCTS[formData.seoTier.toLowerCase()];
            if (seoProductId) {
                console.log(`Adding SEO Tier: ${formData.seoTier} (Product: ${seoProductId})`);
                const { data: seoPrices } = await stripe.prices.list({
                    product: seoProductId,
                    active: true,
                    limit: 10
                });

                // STRICTLY find monthly recurring price for subscription
                const seoSubPrice = seoPrices.find(p => p.type === 'recurring' && p.recurring?.interval === 'month');

                if (seoSubPrice) {
                    subscriptionItems.push({ price: seoSubPrice.id });
                } else {
                    console.error(`CRITICAL: No monthly recurring price found for SEO product ${seoProductId}`);
                    // We don't throw yet, but this will likely cause a subscription failure if this was meant to be the core of the sub
                    // In this flow, the main website care plan is the core recurring item.
                }
            }
        }

        // --- 6. Invoice Items (One-off Fees) ---

        // A. Website Activation Fee (50% Deposit)
        if (mainActivationPrice) {
            const depositAmount = Math.round(mainActivationPrice.unit_amount / 2);
            await stripe.invoiceItems.create({
                customer: customerId,
                price_data: {
                    currency: 'gbp',
                    product: mainProductId,
                    unit_amount: depositAmount,
                },
                description: `50% Onboarding Deposit (Website)`,
                metadata: { project_id: projectId, type: 'deposit' }
            });
        }

        // B. SEO Onboarding Fee (£195 - No Discount)
        if (formData?.seoActive) {
            const { data: seoOnboardingPrices } = await stripe.prices.list({
                product: SEO_ONBOARDING_PRODUCT,
                active: true,
                limit: 1
            });

            const seoOnboardingPrice = seoOnboardingPrices[0];

            await stripe.invoiceItems.create({
                customer: customerId,
                price: seoOnboardingPrice?.id || undefined,
                price_data: !seoOnboardingPrice ? {
                    currency: 'gbp',
                    product: SEO_ONBOARDING_PRODUCT,
                    unit_amount: 19500,
                } : undefined,
                description: `SEO Onboarding Fee (One-off)`,
                metadata: { project_id: projectId, type: 'seo_onboarding' }
            });
        }

        // --- 7. Create Subscription ---
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: subscriptionItems,
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
            metadata: { project_id: projectId, user_id: user_id || 'guest' }
        });

        if (!subscription.latest_invoice || typeof subscription.latest_invoice === 'string' || !subscription.latest_invoice.payment_intent) {
            throw new Error("Stripe failed to generate a payment intent for the subscription invoice.");
        }

        const intent = subscription.latest_invoice.payment_intent as any;

        // --- 8. Success Response ---
        return new Response(
            JSON.stringify({
                subscriptionId: subscription.id,
                clientSecret: intent.client_secret,
                projectId: projectId
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("CRITICAL: Checkout Creation Failed:", error);
        // Return 200 instead of 400 to see the error message in frontend
        return new Response(JSON.stringify({
            ok: false,
            error: error.message,
            context: "Edge Function Error"
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    }
});
