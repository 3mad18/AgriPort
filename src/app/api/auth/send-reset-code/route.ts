import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// CORS Headers helper
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code, name } = body;

    if (!email || !code) {
      return NextResponse.json(
        { success: false, error: "Email and code are required." },
        { status: 400, headers: corsHeaders() }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanCode = String(code).trim();
    const recipientName = name ? String(name).trim() : "عزيزنا العميل";

    // SMTP Configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure = process.env.SMTP_SECURE !== "false";
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "agriporteg@gmail.com";
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "cvhoknhntkeqfzqh";
    const smtpFrom = process.env.SMTP_FROM || `"AgriPort Portal" <${smtpUser}>`;

    // HTML Email Template
    const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>رمز استعادة كلمة المرور — AgriPort</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="560px" style="max-width: 560px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <!-- Top Accent Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #10b981 0%, #059669 100%); height: 6px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; text-align: center;">
              <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 9999px; padding: 6px 16px; margin-bottom: 16px;">
                <span style="font-size: 13px; font-weight: 700; color: #047857;">🌱 AgriPort — بوابة الزوار والتصدير</span>
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">
                استعادة كلمة المرور
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b;">
                Password Reset Verification Code
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 0 32px 32px 32px; text-align: right; direction: rtl;">
              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 16px 0;">
                مرحباً <strong>${recipientName}</strong>،
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 24px 0;">
                تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك في بوابة <strong>AgriPort</strong> لتصدير الحاصلات الزراعية. يُرجى استخدام رمز التحقق التالي لإتمام العملية:
              </p>

              <!-- OTP Code Display Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
                <tr>
                  <td align="center" style="background: #ecfdf5; border: 2px dashed #059669; border-radius: 16px; padding: 24px 16px;">
                    <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                      رمز التحقق المؤقت | Verification Code
                    </div>
                    <div style="font-size: 38px; font-weight: 900; letter-spacing: 12px; color: #065f46; font-family: Consolas, Monaco, 'Courier New', monospace; margin: 10px 0; direction: ltr;">
                      ${cleanCode}
                    </div>
                    <div style="font-size: 12px; color: #059669; font-weight: 600;">
                      ⏱️ هذا الرمز صالح لمدة 10 دقائق فقط
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Advice -->
              <div style="background-color: #f1f5f9; border-radius: 12px; padding: 14px 16px; margin-top: 24px; border-right: 4px solid #94a3b8;">
                <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #475569;">
                  🛡️ <strong>تنبيه أمني:</strong> لا تشارك هذا الرمز مع أي شخص. إذا لم تكن قد طلبت إعادة تعيين كلمة المرور، يمكنك تجاهل هذه الرسالة بأمان وسيبقى حسابك محمياً.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px 32px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 600;">
                AgriPort Egypt — تصدير الخضروات والفواكه المصرية الفاخرة
              </p>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #94a3b8; direction: ltr;">
                Questions? Contact us: <a href="mailto:agriporteg@gmail.com" style="color: #059669; text-decoration: none;">agriporteg@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const plainText = `
رمز استعادة كلمة المرور — AgriPort
=======================================

مرحباً ${recipientName}،

تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك في بوابة AgriPort.

رمز التحقق الخاص بك هو: ${cleanCode}

صلاحية الرمز: 10 دقائق فقط.

إذا لم تكن أنت صاحب هذا الطلب، يُرجى تجاهل هذه الرسالة وسيظل حسابك آمناً تماماً.

فريق دعم AgriPort
agriporteg@gmail.com
    `.trim();

    let emailSent = false;
    let transportMethod = "none";
    let transportError = null;

    // 1. Try sending via SMTP (e.g. Gmail App Password or custom SMTP)
    if (smtpPass) {
      try {
        const cleanPass = smtpPass.replace(/\s+/g, "");
        const isGmail = smtpHost.includes("gmail") || smtpUser.endsWith("@gmail.com");

        const transporter = nodemailer.createTransport(
          isGmail
            ? {
                service: "gmail",
                auth: {
                  user: smtpUser,
                  pass: cleanPass,
                },
              }
            : {
                host: smtpHost,
                port: smtpPort,
                secure: smtpSecure,
                auth: {
                  user: smtpUser,
                  pass: cleanPass,
                },
              }
        );

        await transporter.sendMail({
          from: smtpFrom,
          to: cleanEmail,
          subject: `رمز استعادة كلمة المرور: ${cleanCode} — AgriPort`,
          text: plainText,
          html: htmlContent,
        });

        emailSent = true;
        transportMethod = isGmail ? "gmail-smtp" : "smtp";
        console.log(`[AgriPort Mailer] Reset code successfully delivered via SMTP to ${cleanEmail}`);
      } catch (err: any) {
        console.error("[AgriPort Mailer] SMTP transport failed:", err?.message || err);
        transportError = err?.message || "SMTP sending error";
      }
    }

    // 2. Try sending via Resend API if configured
    if (!emailSent && process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || `AgriPort <onboarding@resend.dev>`,
            to: [cleanEmail],
            subject: `رمز استعادة كلمة المرور: ${cleanCode} — AgriPort`,
            html: htmlContent,
            text: plainText,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
          transportMethod = "resend";
          console.log(`[AgriPort Mailer] Reset code sent via Resend API to ${cleanEmail}`);
        }
      } catch (err: any) {
        console.error("[AgriPort Mailer] Resend API failed:", err?.message || err);
      }
    }

    // 3. Try sending via Brevo API if configured
    if (!emailSent && process.env.BREVO_API_KEY) {
      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "AgriPort Egypt", email: smtpUser },
            to: [{ email: cleanEmail, name: recipientName }],
            subject: `رمز استعادة كلمة المرور: ${cleanCode} — AgriPort`,
            htmlContent: htmlContent,
            textContent: plainText,
          }),
        });

        if (brevoRes.ok) {
          emailSent = true;
          transportMethod = "brevo";
          console.log(`[AgriPort Mailer] Reset code sent via Brevo API to ${cleanEmail}`);
        }
      } catch (err: any) {
        console.error("[AgriPort Mailer] Brevo API failed:", err?.message || err);
      }
    }

    // Log for server diagnostics
    console.log(
      `[AgriPort Mailer] Processed reset request for ${cleanEmail}. Email dispatched: ${emailSent} (Method: ${transportMethod})`
    );

    return NextResponse.json(
      {
        success: true,
        emailSent,
        transportMethod,
        recipient: cleanEmail,
        transportError: transportError ? String(transportError) : undefined,
      },
      { headers: corsHeaders() }
    );
  } catch (error: any) {
    console.error("[AgriPort Mailer] Server error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while processing reset email." },
      { status: 500, headers: corsHeaders() }
    );
  }
}
