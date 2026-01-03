
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";

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
        const body = await req.json();
        const { name, email, businessName, enquiryType, message } = body;

        if (!name || !email || !message) {
            throw new Error("Missing required fields: name, email, or message.");
        }

        // --- SMTP Configuration ---
        const smtpHost = Deno.env.get("SMTP_HOST") || "webmail.launchedin10.co.uk";
        const smtpPort = Number(Deno.env.get("SMTP_PORT")) || 465;
        const smtpUser = Deno.env.get("SMTP_USER") || "hello@launchedin10.co.uk";
        const smtpPass = Deno.env.get("SMTP_PASS") || "6h9G1&om7";

        console.log(`Attempting SMTP connection to ${smtpHost}:${smtpPort} as ${smtpUser}`);

        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                // OVERRIDING certificate validation as requested for self-signed certs
                rejectUnauthorized: false
            }
        });

        // Verify connection configuration
        await new Promise((resolve, reject) => {
            transporter.verify(function (error, success) {
                if (error) {
                    console.error("SMTP Verify Error:", error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: `"${name}" <${smtpUser}>`, // Sender address
            to: "hello@launchedin10.co.uk", // List of receivers
            replyTo: email,
            subject: `New Lead: ${enquiryType} from ${name}`, // Subject line
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Business: ${businessName || 'N/A'}
Enquiry: ${enquiryType}

Message:
${message}

---
Sent via LaunchedIn10 Edge Function (Nodemailer + Self-Signed Cert Fix)
            `, // plain text body
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
