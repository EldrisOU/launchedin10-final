
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { name, email, businessName, enquiryType, message } = await req.json();

        if (!name || !email || !message) {
            throw new Error("Missing required fields: name, email, or message.");
        }

        // --- 1. SMTP Configuration ---
        // We use secrets set in Supabase dashboard
        const smtpHost = Deno.env.get("SMTP_HOST") || "launchedin10.co.uk";
        const smtpPort = Number(Deno.env.get("SMTP_PORT")) || 465;
        const smtpUser = Deno.env.get("SMTP_USER") || "hello@launchedin10.co.uk";
        const smtpPass = Deno.env.get("SMTP_PASS") || "6h9G1&om7";

        console.log(`Attempting to send email from ${smtpUser} via ${smtpHost}:${smtpPort}`);

        const client = new SmtpClient();

        // Connect via TLS (for port 465)
        await client.connectTLS({
            hostname: smtpHost,
            port: smtpPort,
            username: smtpUser,
            password: smtpPass,
        });

        // --- 2. Send Email ---
        await client.send({
            from: smtpUser,
            to: "hello@launchedin10.co.uk",
            subject: `New Lead: ${enquiryType} from ${name}`,
            content: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Business: ${businessName || 'N/A'}
Enquiry: ${enquiryType}

Message:
${message}

---
Sent via LaunchedIn10 Edge Function
            `,
        });

        await client.close();

        return new Response(
            JSON.stringify({ ok: true, message: "Email sent successfully" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("SMTP Error:", error);
        return new Response(
            JSON.stringify({ ok: false, error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200 // Return 200 so frontend can handle it gracefully if needed
            }
        );
    }
});
