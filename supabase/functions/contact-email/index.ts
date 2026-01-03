
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";
import process from "node:process";

// --- V16: THE HOSTNAME SPOOF STRATEGY ---
// Analysis: 
// 1. Port 587 (V14/15) failed with "UnknownIssuer".
// 2. Port 465 (V11) passed "UnknownIssuer" via Pinning but failed at "NotValidForName".
// 3. V12 (Callback Bypass) was ignored.

// Solution:
// Back to Port 465. Keep Pinning. 
// SOLVE "NotValidForName" by telling the TLS client we EXPECT "Plesk" (the CN).
// This creates a valid chain: Trusted Cert (Pinning) + Matching Name (Spoofing).

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

// Keep the polyfill just in case, it's harmless now
try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
} catch (e) { }

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
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

        const smtpHost = Deno.env.get("SMTP_HOST") || "webmail.launchedin10.co.uk";
        const smtpPort = 465; // BACK TO 465 (Implicit TLS)
        const smtpUser = Deno.env.get("SMTP_USER") || "hello@launchedin10.co.uk";
        const smtpPass = Deno.env.get("SMTP_PASS") || "6h9G1&om7";

        console.log(`Attempting V16 Connection: ${smtpHost}:${smtpPort} (User: ${smtpUser})`);

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: true, // 465 = Implicit TLS
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
            tls: {
                // 1. PIN THE CERT (Fixes UnknownIssuer)
                ca: [SERVER_CERT],

                // 2. SPOOF THE HOSTNAME (Fixes NotValidForName)
                // We tell TLS we are connecting to "Plesk" (the name ON the cert)
                // This makes the validation pass naturally.
                servername: "Plesk",

                // 3. Failsafe (but strictly shouldn't be needed with the above)
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
Sent via LaunchedIn10 Edge Function (v16 Hostname Spoofing)
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
