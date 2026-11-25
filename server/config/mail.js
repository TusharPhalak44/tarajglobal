import nodemailer from 'nodemailer'
import 'dotenv/config'

/**
 * Securely retrieve SMTP password from process environment
 */
const getSmtpPassword = () => {
  const pass = process.env.EMAIL_PASSWORD || process.env.SMTP_PASSWORD || process.env.EMAIL_PASS
  return (typeof pass === 'string' && pass.trim().length > 0) ? pass.trim() : null
}

/**
 * Build dynamic SMTP transporter honoring environment settings (Hostinger / Gmail / custom)
 */
export const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.hostinger.com'
  const port = parseInt(process.env.EMAIL_PORT || '465', 10)
  const isSecure = port === 465 || String(process.env.EMAIL_PORT).trim() === '465' || process.env.EMAIL_SECURE === 'true'
  const user = process.env.EMAIL_USER || 'info@tarajglobal.com'
  const pass = getSmtpPassword()

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure,
    auth: pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: process.env.NODE_ENV !== 'production' ? false : true
    }
  })
}

const transporter = createTransporter()

export const sendEmail = async (options) => {
  const user = process.env.EMAIL_USER || 'info@tarajglobal.com'
  const pass = getSmtpPassword()

  if (!pass) {
    console.warn(`⚠️ [Mail] Skipping email to ${options.to}: process.env.EMAIL_PASSWORD is not set in the server environment.`)
    return { success: false, skipped: true }
  }

  try {
    const rawFrom = options.from || process.env.EMAIL_FROM || user || 'info@tarajglobal.com'
    const from = rawFrom.includes('<') ? rawFrom : `"TaRaj Global" <${rawFrom}>`

    const mailOptions = {
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || (options.html ? options.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '')
    }

    const client = createTransporter()
    const info = await client.sendMail(mailOptions)
    console.log(`✅ [Mail] Email sent to ${options.to}: ${info.messageId}`)
    return info
  } catch (error) {
    const safeMsg = String(error.message || '').replace(/pass(?:word)?\s*[:=]\s*\S+/gi, 'password=***')
    console.error(`❌ [Mail Error] Failed to send email to ${options.to}:`, safeMsg)
    throw new Error(safeMsg)
  }
}

export default transporter
