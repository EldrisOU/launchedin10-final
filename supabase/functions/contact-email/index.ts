
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";
import process from "node:process"; // Correct way to access process in Deno

// --- FIXING CORS & TLS ---
// 1. Set the env var using the official node:process module to avoid crashing the runtime.
try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
} catch (e) {
    console.warn("Could not set process.env (non-fatal):", e);
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS", // Explicitly allow POST
};

serve(async (req) => {
    // Handle CORS - MUST BE FIRST
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const body = await req.json();
        const { name, email, businessName, enquiryType, message } = body;

        if (!name || !email || !message) {
            throw new Error("Missing required fields: name, email, or message.");
        }

        const smtpHost = Deno.env.get("SMTP_HOST") || "webmail.launchedin10.co.uk";
        // Keeping Port 587 (STARTTLS) as planned
        const smtpPort = 587;
        const smtpUser = Deno.env.get("SMTP_USER") || "hello@launchedin10.co.uk";
        const smtpPass = Deno.env.get("SMTP_PASS") || "6h9G1&om7";

        console.log(`Attempting Connection: ${smtpHost}:${smtpPort} (User: ${smtpUser})`);

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false, // 587 = Explicit TLS (starts plain)
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const info = await transporter.sendMail({
            from: `"${name}" <${smtpUser}>`,
            to: "hello@launchedin10.co.uk",
            replyTo: email,
            subject: `New Lead: ${enquiryType} from ${name}`,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Business: ${businessName || 'N/A'}
Enquiry: ${enquiryType}

Message:
${message}

---
Sent via LaunchedIn10 Edge Function (v15 Corrected Polyfill)
            `,
        });

        console.log("Message sent: %s", info.messageId);

        return new Response(
            JSON.stringify({ ok: true, message: "Email sent successfully", id: info.messageId }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Contact Function Error:", error);
        return new Response(
            JSON.stringify({ ok: false, error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200
            }
        );
    }
});
