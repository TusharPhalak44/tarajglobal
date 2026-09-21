import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

// Send email
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    }

    const info = await transporter.sendMail(mailOptions)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email send error:', error)
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
  const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
  
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

// Send new application notification
export const sendNewApplicationNotification = async (application, job, recipients) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00A6FF;">New Job Application</h2>
      <p>A new application has been submitted for the position: <strong>${job.title}</strong></p>
      <p><strong>Applicant Details:</strong></p>
      <ul>
        <li>Name: ${application.first_name} ${application.last_name}</li>
        <li>Email: ${application.email}</li>
        <li>Phone: ${application.phone || 'Not provided'}</li>
      </ul>
      <p>Log in to the admin panel to review this application.</p>
      <p>Best regards,<br>TaRaj Team</p>
    </div>
  `

  return sendEmail({
    to: recipients,
    subject: `New Application: ${job.title}`,
    html,
    text: `New application for ${job.title} from ${application.first_name} ${application.last_name}`
  })
}

// Send lead notification
export const sendLeadNotification = async (lead, recipients) => {
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
    to: recipients,
    subject: `New Lead: ${lead.name}`,
    html,
    text: `New lead from ${lead.name} (${lead.email})`
  })
}

// Send blog published notification
export const sendBlogPublishedNotification = async (blog, recipients) => {
  const blogUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/blog/${blog.slug}`
  
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
    to: recipients,
    subject: `Blog Published: ${blog.title}`,
    html,
    text: `New blog published: ${blog.title} by ${blog.author_name}`
  })
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNewApplicationNotification,
  sendLeadNotification,
  sendBlogPublishedNotification
}
