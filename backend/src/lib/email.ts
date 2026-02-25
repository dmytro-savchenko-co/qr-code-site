import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
      <h2 style="color: #1a1a2e; font-size: 24px; margin-bottom: 16px;">Reset your password</h2>
      <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        We received a request to reset your password. Click the button below to choose a new one.
        This link expires in 1 hour.
      </p>
      <a href="${resetUrl}" style="display: inline-block; background: #33b5e5; color: #fff; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 9999px; font-size: 15px;">
        Reset Password
      </a>
      <p style="color: #9ca3af; font-size: 13px; margin-top: 32px; line-height: 1.5;">
        If you didn't request this, you can safely ignore this email. Your password won't be changed.
      </p>
    </div>
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"QR Code.io" <noreply@qr-code.io>',
    to,
    subject: 'Reset your password - QR Code.io',
    html,
  })
}
