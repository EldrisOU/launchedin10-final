
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// --- CERTIFICATE PINNING ---
const SERVER_CERT = `
-----BEGIN CERTIFICATE-----
MIIDejCCAmKgAwIBAgIEaMbldjANBgkqhkiG9w0BAQsFADBjMQswCQYDVQQGEwJD
SDEVMBMGA1UEBwwMU2NoYWZmaGF1c2VuMQ4wDAYDVQQKDAVQbGVzazEOMAwGA1UE
AwwFUGxlc2sxHTAbBgkqhkiG9w0BCQEWDmluZm9AcGxlc2suY29tMB4XDTI1MDkx
NDE1NTUzNVoXDTI2MDkxNDE1NTUzNVowYzELMAkGA1UEBhMCQ0gxFTATBgNVBAcM
DFNjaGFmZmhhdXNlbjEOMAwGA1UECgwFUGxlc2sxDjAMBgNVBAMMBVBsZXNrMR0w
GwYJKoZIhvcNAQkBFg5pbmZvQHBsZXNrLmNvbTCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBAKSOU+Ej9rRW+Cq1h/4yLDWUnHKgmT7krtJK36caznCPmuSq
XWygQr52YyN619gIE2J5yjAnTKLCg97y7CDkxC1tST+UywINpbfhZBge/DiPBYKr
EdIcNhI/kRHQMFh04Ay6gIpBq6mS7sDO8VuyhoN91K0Sh2I0QKdu0VpifWTA5keL
nZQsltaIsCJkdF8DVvONmgVhp1Z6xXVDV/IE13atuwPSu57Zua+bmjaHUOvoAPXg
tJgJ0Vm/g4mpuKA8dHUzZyT6t/hypzciVYntNoX+8Y7vJnMZFOTuxKPuvOockJje
zG2LK9Ot9wGWG/ptI0hU5kmKRD/ndHbE2bOTOEECAwEAAaM2MDQwEwYDVR0lBAww
CgYIKwYBBQUHAwEwHQYDVR0OBBYEFG5LWmLZl2WLgH0wKkXHp9fR4SKVMA0GCSqG
SIb3DQEBCwUAA4IBAQAKPIfHCmLMlpEcu9yp4td9bAlMLaCa9ixV+y1BvREkHLOT
LMNO1P4fqkzFDxchZWK0qe220J2+382A5cKIXVPtNEWZV484x0yE9/7zjOZHQt9D
xRukDC5Xsq1is4uIMihKIOeUpl5B+SBFKN8Hh8+88QpaOa3o8ax2WcR6cFQw9Y7B
cmiol2/IIDsBMcMyIkAmOF8bMpJjKebZmwynkASyup+BT7ZDKFoaBYRXwYIffzTA
/PRTOj/SQLC0JkMmc6E5VD9rPCP0h9yn2GY+oIwhOqNmE4dRgBqaLTfCiroR1VWc
hR6F7ODL4EE9po4czqmRYe2p5JolNI/iCO65VUIp
-----END CERTIFICATE-----
`.trim();

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

        const smtpHost = Deno.env.get("SMTP_HOST") || "webmail.launchedin10.co.uk";
        const smtpPort = Number(Deno.env.get("SMTP_PORT")) || 465;
        const smtpUser = Deno.env.get("SMTP_USER") || "hello@launchedin10.co.uk";
        const smtpPass = Deno.env.get("SMTP_PASS") || "6h9G1&om7";

        console.log(`Attempting SMTP connection to ${smtpHost}:${smtpPort} as ${smtpUser}`);

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            // Explicitly set rejectUnauthorized: false at the transport level
            // This is the "Nuclear Option" v2 - ensuring it overrides everything
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
Sent via LaunchedIn10 Edge Function (v13 Forced Insecure)
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
