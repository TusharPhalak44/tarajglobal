import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587', 10)
  const user = process.env.EMAIL_USER || process.env.SMTP_USER
  const pass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || process.env.SMTP_PASS

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
    tls: {
      rejectUnauthorized: false
    }
  })
}

// Send email
export const sendEmail = async (options) => {
  try {
    const user = process.env.EMAIL_USER || process.env.SMTP_USER
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || user || '"Taraj Global Careers" <info@tarajglobal.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent successfully to ${options.to}: ${info.messageId}`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error(`❌ Email send error to ${options.to}:`, error.message)
    return { success: false, error: error.message }
  }
}

// Send welcome email
export const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A6FF;">Welcome to TaRaj CMS</h2>
      <p>Hello ${user.name},</p>
      <p>Welcome to the TaRaj CMS admin panel. Your account has been successfully created.</p>
      <p><strong>Your login details:</strong></p>
      <ul>
        <li>Email: ${user.email}</li>
        <li>Role: ${user.role}</li>
      </ul>
      <p>Please log in to get started.</p>
      <p>Best regards,<br>TaRaj Team</p>
    </div>
  `

  return sendEmail({
    to: user.email,
    subject: 'Welcome to TaRaj CMS',
    html,
    text: `Welcome to TaRaj CMS. Your account has been created. Email: ${user.email}, Role: ${user.role}`
  })
}

// Send password reset email
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A6FF;">Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <p>You requested a password reset for your TaRaj CMS account.</p>
      <p>Click the link below to reset your password:</p>
      <p><a href="${resetUrl}" style="color: #00A6FF;">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>TaRaj Team</p>
    </div>
  `

  return sendEmail({
    to: user.email,
    subject: 'Password Reset - TaRaj CMS',
    html,
    text: `Password reset link: ${resetUrl}. This link will expire in 1 hour.`
  })
}

// Send new application notification to admin/recruiter
export const sendNewApplicationNotification = async (application, job, recipients) => {
  const adminEmail = recipients || process.env.CAREER_EMAIL || process.env.HR_EMAIL || 'hr@tarajglobal.com'
  const candidateName = `${application.first_name || ''} ${application.last_name || ''}`.trim() || 'Candidate'
  const jobTitle = job?.title || application.job_title || 'Career Position'

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <div style="background: #0f172a; padding: 24px 20px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #00A6FF;">⚡ New Job Application Received</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">Taraj Global Recruitment Notification</p>
      </div>

      <div style="padding: 28px 24px; color: #1e293b; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">A candidate has submitted an application for <strong style="color: #00A6FF;">${jobTitle}</strong>.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #FF6D00; padding: 18px 20px; border-radius: 6px; margin: 20px 0;">
          <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Applicant Overview</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 130px;">Position Applied:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${jobTitle}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Full Name:</td>
              <td style="padding: 6px 0;">${candidateName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${application.email}" style="color: #00A6FF; font-weight: 600;">${application.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 6px 0;">${application.phone || 'Not provided'}</td>
            </tr>
            ${application.resume_path ? `<tr><td style="padding: 6px 0; font-weight: bold;">Resume File:</td><td style="padding: 6px 0; font-family: monospace; font-size: 13px;">${application.resume_path}</td></tr>` : ''}
          </table>
        </div>
        
        <p style="font-size: 14px; color: #475569;">
          Log in to the <strong>Taraj Global Command Center</strong> to view, manage candidate status, and download the resume.
        </p>
      </div>

      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0;">Taraj Global Automated Recruitment System</p>
      </div>
    </div>
  `

  return sendEmail({
    to: adminEmail,
    subject: `[New Applicant] ${candidateName} - ${jobTitle}`,
    html,
    text: `New application for ${jobTitle} from ${candidateName} (${application.email}, Phone: ${application.phone || 'N/A'}).`
  })
}

// Send application confirmation email to candidate
export const sendCandidateApplicationConfirmation = async (application, job) => {
  const candidateName = `${application.first_name || ''} ${application.last_name || ''}`.trim() || 'Applicant'
  const jobTitle = job?.title || application.job_title || 'Career Position'

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #00A6FF, #0077CC); padding: 32px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Application Received!</h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.95;">Taraj Global Solutions — Recruitment Team</p>
      </div>
      
      <div style="padding: 32px 28px; color: #1e293b; line-height: 1.6;">
        <h3 style="margin-top: 0; color: #0f172a; font-size: 18px; font-weight: 700;">Dear ${candidateName},</h3>
        
        <p style="font-size: 15px; color: #334155;">
          Thank you for applying for the position of <strong style="color: #00A6FF;">${jobTitle}</strong> at <strong>Taraj Global Solutions</strong>!
        </p>
        
        <p style="font-size: 14px; color: #475569;">
          We have successfully received your application details and resume. Our Talent Acquisition team is currently reviewing candidate profiles and qualifications.
        </p>

        <div style="background-color: #f8fafc; border-left: 4px solid #00A6FF; padding: 18px 20px; border-radius: 6px; margin: 24px 0;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Application Summary</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #334155;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 120px;">Position:</td>
              <td style="padding: 4px 0; font-weight: bold; color: #0f172a;">${jobTitle}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Full Name:</td>
              <td style="padding: 4px 0;">${candidateName}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Email:</td>
              <td style="padding: 4px 0;">${application.email}</td>
            </tr>
            ${application.phone ? `<tr><td style="padding: 4px 0; font-weight: bold;">Phone:</td><td style="padding: 4px 0;">${application.phone}</td></tr>` : ''}
          </table>
        </div>

        <p style="font-size: 14px; color: #475569;">
          If your background and qualifications match our recruitment requirements, our Talent Acquisition team will contact you directly to discuss the next interview stage.
        </p>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
          <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0f172a;">Best regards,</p>
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #64748b;">Taraj Global Solutions Recruitment Operations</p>
        </div>
      </div>

      <div style="background-color: #f1f5f9; padding: 16px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Taraj Global Solutions. All rights reserved.</p>
      </div>
    </div>
  `

  return sendEmail({
    to: application.email,
    subject: `Application Received: ${jobTitle} - Taraj Global`,
    html,
    text: `Hello ${candidateName}, Thank you for applying for the position of ${jobTitle} at Taraj Global Solutions. We have received your application and resume. Our recruitment team will review your qualifications and contact you if there is a match.`
  })
}

// Send lead notification
export const sendLeadNotification = async (lead, recipients) => {
  const adminEmail = recipients || process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'tgs.admin001@gmail.com'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A6FF;">New Lead Received</h2>
      <p>A new lead has been submitted through the contact form.</p>
      <p><strong>Lead Details:</strong></p>
      <ul>
        <li>Name: ${lead.name}</li>
        <li>Email: ${lead.email}</li>
        <li>Company: ${lead.company || 'Not provided'}</li>
        <li>Phone: ${lead.phone || 'Not provided'}</li>
        <li>Message: ${lead.message || 'No message'}</li>
      </ul>
      <p>Log in to the admin panel to follow up with this lead.</p>
      <p>Best regards,<br>TaRaj Team</p>
    </div>
  `

  return sendEmail({
    to: adminEmail,
    subject: `New Lead: ${lead.name}`,
    html,
    text: `New lead from ${lead.name} (${lead.email})`
  })
}

// Send lead confirmation to user
export const sendLeadConfirmation = async (lead) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #00A6FF, #FF6D00); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h2 style="color: white; margin: 0;">Thank You for Contacting Us</h2>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <p>Hi ${lead.name},</p>
        <p>Thank you for reaching out to TaRaj Global. We have received your message and our team will get back to you shortly.</p>
        <p><strong>Your Message Details:</strong></p>
        <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00A6FF;">
          <p><strong>Subject:</strong> ${lead.subject || 'Contact Form Submission'}</p>
          <p><strong>Message:</strong><br/> ${lead.message}</p>
        </div>
        <p>Best regards,<br>The TaRaj Global Team</p>
      </div>
    </div>
  `

  return sendEmail({
    to: lead.email,
    subject: 'We received your message - TaRaj Global',
    html,
    text: `Hi ${lead.name}, Thank you for reaching out to TaRaj Global. We have received your message and will get back to you shortly.`
  })
}

// Send blog published notification
export const sendBlogPublishedNotification = async (blog, recipients) => {
  const adminEmail = recipients || process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'tgs.admin001@gmail.com'
  const blogUrl = `${process.env.CLIENT_URL || 'http://localhost:3001'}/blog/${blog.slug}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A6FF;">Blog Post Published</h2>
      <p>A new blog post has been published: <strong>${blog.title}</strong></p>
      <p>Author: ${blog.author_name}</p>
      <p>View the blog post: <a href="${blogUrl}" style="color: #00A6FF;">${blog.title}</a></p>
      <p>Best regards,<br>TaRaj Team</p>
    </div>
  `

  return sendEmail({
    to: adminEmail,
    subject: `Blog Published: ${blog.title}`,
    html,
    text: `New blog published: ${blog.title} by ${blog.author_name}`
  })
}

// Send Chatbot lead notification to Admin
export const sendChatLeadNotification = async (session) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'tgs.admin001@gmail.com'
  const adminChatUrl = `${process.env.CLIENT_URL || 'http://localhost:3001'}/admin/chat`

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #00A6FF, #FF6D00); padding: 24px 20px; text-align: center; color: #ffffff;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">💬 New Chatbot Lead Initiated</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Taraj Global Website Assistant</p>
      </div>

      <div style="padding: 28px 24px; color: #1e293b; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">A user has submitted their contact details on the Website Chatbot:</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #00A6FF; padding: 18px 20px; border-radius: 6px; margin: 20px 0;">
          <h4 style="margin: 0 0 12px 0; color: #0f172a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">User Details</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 130px;">First Name:</td>
              <td style="padding: 6px 0;">${session.first_name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Last Name:</td>
              <td style="padding: 6px 0;">${session.last_name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${session.email}" style="color: #00A6FF; font-weight: 600;">${session.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone Number:</td>
              <td style="padding: 6px 0;">${session.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Started At:</td>
              <td style="padding: 6px 0;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin: 28px 0 14px 0;">
          <a href="${adminChatUrl}" target="_blank" style="background: linear-gradient(135deg, #00A6FF, #0077CC); color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 8px rgba(0,166,255,0.3);">
            💬 Open Live Chat Console
          </a>
        </div>
        <p style="font-size: 13px; color: #64748b; text-align: center;">You can monitor or reply to this conversation live from the Admin Dashboard.</p>
      </div>

      <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0;">Taraj Global Live Chat Automation</p>
      </div>
    </div>
  `

  return sendEmail({
    to: adminEmail,
    subject: `[New Chatbot Lead] ${session.first_name} ${session.last_name}`,
    html,
    text: `New Chatbot Lead: ${session.first_name} ${session.last_name} (${session.email}, Phone: ${session.phone || 'N/A'}). Admin Live Console: ${adminChatUrl}`
  })
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNewApplicationNotification,
  sendCandidateApplicationConfirmation,
  sendLeadNotification,
  sendLeadConfirmation,
  sendBlogPublishedNotification,
  sendChatLeadNotification
}
