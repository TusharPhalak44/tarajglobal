import nodemailer from 'nodemailer'

// Create transporter with comprehensive fallback for environment variables
const createTransporter = () => {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || '587', 10)
  const user = process.env.SMTP_USER || process.env.EMAIL_USER
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  })
}

// Send email
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter()
    const fromEmail = process.env.MAIL_FROM || process.env.EMAIL_FROM || process.env.SMTP_FROM || process.env.SMTP_USER || process.env.EMAIL_USER || 'info@tarajglobal.com'
    
    const mailOptions = {
      from: options.from || fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`[EMAIL_SENT] Email successfully delivered to: ${options.to}, Subject: "${options.subject}" (MsgID: ${info.messageId})`)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error(`[EMAIL_FAILED] Failed sending email to: ${options.to}, Error: ${error.message}`)
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

// Send customer meeting confirmation email
export const sendMeetingConfirmationEmail = async (meeting) => {
  const customerName = meeting.fullName || meeting.full_name || meeting.name || 'Valued Client'
  const displayDate = meeting.displayDate || (typeof meeting.meeting_date === 'string' ? meeting.meeting_date.split('T')[0] : new Date(meeting.meeting_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const displayTime = meeting.meeting_time || meeting.time || meeting.start_time
  const timezone = meeting.timeZone || meeting.time_zone || 'Asia/Kolkata'
  const meetLink = meeting.meeting_link || meeting.meetingLink || ''
  const calendarLink = meeting.calendar_event_link || meeting.calendarEventLink || ''
  const interest = meeting.interest || 'B2B Growth / Demand Generation'
  const message = meeting.message || 'No additional notes provided'
  const phone = meeting.phone || 'Not provided'
  const company = meeting.company || 'Not provided'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Strategy Call is Confirmed</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
        .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #00A6FF 0%, #0066FF 100%); color: #ffffff; padding: 36px 30px; text-align: center; }
        .header h1 { margin: 0 0 10px; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
        .header p { margin: 0; font-size: 14px; opacity: 0.92; }
        .body { padding: 32px 30px; }
        .greeting { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #0f172a; }
        .intro { font-size: 14px; color: #475569; margin-bottom: 24px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #00A6FF; }
        .card-title { font-size: 15px; font-weight: 700; color: #00A6FF; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px; }
        .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; font-size: 13.5px; }
        .item:last-child { border-bottom: none; }
        .label { color: #64748b; font-weight: 500; }
        .value { color: #0f172a; font-weight: 600; text-align: right; }
        .cta-box { text-align: center; margin: 28px 0; }
        .btn-meet { display: inline-block; background: #00A6FF; color: #ffffff !important; padding: 13px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(0,166,255,0.35); }
        .btn-cal { display: inline-block; margin-left: 10px; background: #ffffff; color: #00A6FF !important; border: 1px solid #00A6FF; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 13px; }
        .footer { background: #f1f5f9; padding: 24px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .footer p { margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1>Strategy Call Confirmed</h1>
          <p>Taraj Global Solutions &bull; Revenue Engineering & Growth</p>
        </div>
        <div class="body">
          <p class="greeting">Hi ${customerName},</p>
          <p class="intro">
            Thank you for booking a strategy call with Taraj Global Solutions. Your meeting has been successfully scheduled and added to our calendar.
          </p>

          <div class="card">
            <div class="card-title">Meeting Details</div>
            <div class="item"><span class="label">Meeting:</span><span class="value">Strategy Call</span></div>
            <div class="item"><span class="label">Date:</span><span class="value">${displayDate}</span></div>
            <div class="item"><span class="label">Time:</span><span class="value">${displayTime}</span></div>
            <div class="item"><span class="label">Timezone:</span><span class="value">${timezone}</span></div>
            <div class="item"><span class="label">Name:</span><span class="value">${customerName}</span></div>
            <div class="item"><span class="label">Company:</span><span class="value">${company}</span></div>
            <div class="item"><span class="label">Email:</span><span class="value">${meeting.email}</span></div>
            <div class="item"><span class="label">Phone:</span><span class="value">${phone}</span></div>
            <div class="item"><span class="label">Area of Interest:</span><span class="value">${interest}</span></div>
            ${message && message !== 'No additional notes provided' ? `<div class="item"><span class="label">Notes / Message:</span><span class="value">${message}</span></div>` : ''}
          </div>

          ${meetLink ? `
          <div class="cta-box">
            <a href="${meetLink}" target="_blank" rel="noopener noreferrer" class="btn-meet">
              Join Google Meet
            </a>
            ${calendarLink ? `
            <a href="${calendarLink}" target="_blank" rel="noopener noreferrer" class="btn-cal">
              View on Google Calendar
            </a>` : ''}
          </div>
          ` : ''}

          <p style="font-size: 13.5px; color: #475569; line-height: 1.6;">
            We look forward to speaking with you and exploring tailored strategies to accelerate your B2B demand generation and pipeline growth.
          </p>
          <p style="font-size: 13.5px; color: #0f172a; font-weight: 600; margin-top: 20px;">
            Regards,<br>
            <span style="color: #00A6FF;">Taraj Global Solutions</span><br>
            <span style="font-weight: 400; color: #64748b; font-size: 12.5px;">info@tarajglobal.com | +91 96655-99442</span>
          </p>
        </div>
        <div class="footer">
          <p><strong>Taraj Global Solutions Pvt Ltd</strong></p>
          <p>The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014</p>
          <p>Website: <a href="https://tarajglobal.com" style="color: #00A6FF; text-decoration: none;">tarajglobal.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
Hi ${customerName},

Thank you for booking a strategy call with Taraj Global Solutions.
Your meeting has been successfully scheduled.

Meeting Details:
- Meeting: Strategy Call
- Date: ${displayDate}
- Time: ${displayTime} (${timezone})
- Name: ${customerName}
- Company: ${company}
- Email: ${meeting.email}
- Phone: ${phone}
- Area of Interest: ${interest}
- Message: ${message}
${meetLink ? `- Google Meet Link: ${meetLink}\n` : ''}${calendarLink ? `- Calendar Event: ${calendarLink}\n` : ''}

We look forward to speaking with you.

Regards,
Taraj Global Solutions
info@tarajglobal.com
+91 96655-99442
https://tarajglobal.com
  `.trim()

  return sendEmail({
    to: meeting.email,
    subject: 'Your Strategy Call with Taraj Global is Confirmed',
    html,
    text
  })
}

// Send internal notification email to Taraj admin
export const sendMeetingAdminNotificationEmail = async (meeting) => {
  const recipient = process.env.MEETING_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'info@tarajglobal.com'
  const customerName = meeting.fullName || meeting.full_name || meeting.name || 'Client'
  const displayDate = meeting.displayDate || (typeof meeting.meeting_date === 'string' ? meeting.meeting_date.split('T')[0] : new Date(meeting.meeting_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const displayTime = meeting.meeting_time || meeting.time || meeting.start_time
  const timezone = meeting.timeZone || meeting.time_zone || 'Asia/Kolkata'
  const meetLink = meeting.meeting_link || meeting.meetingLink || ''
  const calendarLink = meeting.calendar_event_link || meeting.calendarEventLink || ''
  const interest = meeting.interest || 'B2B Growth / Demand Generation'
  const message = meeting.message || 'No additional notes provided'
  const phone = meeting.phone || 'Not provided'
  const company = meeting.company || 'Not provided'
  const bookingId = meeting.bookingId || meeting.booking_id || 'N/A'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; background: #f8fafc; padding: 20px; }
        .box { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
        .hdr { background: linear-gradient(135deg, #00A6FF, #FF6D00); color: #fff; padding: 24px; text-align: center; }
        .cnt { padding: 24px; }
        .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
        .row { padding: 6px 0; font-size: 13.5px; border-bottom: 1px dashed #e2e8f0; }
        .row:last-child { border-bottom: none; }
        .k { color: #64748b; font-weight: bold; }
        .v { color: #0f172a; }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="hdr">
          <h2 style="margin:0 0 6px;">New Strategy Call Booked</h2>
          <p style="margin:0; font-size: 13px;">Booking ID: ${bookingId}</p>
        </div>
        <div class="cnt">
          <div class="card">
            <h4 style="margin:0 0 10px; color:#00A6FF;">Customer Information</h4>
            <div class="row"><span class="k">Name:</span> <span class="v">${customerName}</span></div>
            <div class="row"><span class="k">Email:</span> <span class="v"><a href="mailto:${meeting.email}">${meeting.email}</a></span></div>
            <div class="row"><span class="k">Company:</span> <span class="v">${company}</span></div>
            <div class="row"><span class="k">Phone:</span> <span class="v">${phone}</span></div>
            <div class="row"><span class="k">Area of Interest:</span> <span class="v">${interest}</span></div>
            <div class="row"><span class="k">Message:</span> <span class="v">${message}</span></div>
          </div>

          <div class="card">
            <h4 style="margin:0 0 10px; color:#FF6D00;">Meeting Schedule</h4>
            <div class="row"><span class="k">Date:</span> <span class="v">${displayDate}</span></div>
            <div class="row"><span class="k">Time:</span> <span class="v">${displayTime} (${timezone})</span></div>
            ${meetLink ? `<div class="row"><span class="k">Google Meet:</span> <span class="v"><a href="${meetLink}" target="_blank">${meetLink}</a></span></div>` : ''}
            ${calendarLink ? `<div class="row"><span class="k">Calendar Event:</span> <span class="v"><a href="${calendarLink}" target="_blank">Open Event</a></span></div>` : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  const text = `
New Strategy Call Booking
Customer: ${customerName}
Email: ${meeting.email}
Company: ${company}
Phone: ${phone}
Date: ${displayDate}
Time: ${displayTime} (${timezone})
Interest: ${interest}
Message: ${message}
Google Meet: ${meetLink || 'Not available'}
Calendar Event: ${calendarLink || 'Not available'}
Booking ID: ${bookingId}
  `.trim()

  return sendEmail({
    to: recipient,
    subject: `New Strategy Call Booked — ${customerName}`,
    html,
    text
  })
}

// Send reschedule notification to customer
export const sendMeetingRescheduledEmail = async (meeting) => {
  const customerName = meeting.fullName || meeting.full_name || meeting.name || 'Valued Client'
  const displayDate = meeting.displayDate || (typeof meeting.meeting_date === 'string' ? meeting.meeting_date.split('T')[0] : new Date(meeting.meeting_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const displayTime = meeting.meeting_time || meeting.time || meeting.start_time
  const timezone = meeting.timeZone || meeting.time_zone || 'Asia/Kolkata'
  const meetLink = meeting.meeting_link || meeting.meetingLink || ''

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #00A6FF;">Strategy Call Rescheduled</h2>
      <p>Hello ${customerName},</p>
      <p>Your strategy call with Taraj Global Solutions has been rescheduled to:</p>
      <p style="font-size: 16px; font-weight: bold; background: #f8fafc; padding: 12px; border-radius: 8px; border-left: 4px solid #00A6FF;">
        ${displayDate} at ${displayTime} (${timezone})
      </p>
      ${meetLink ? `<p>Google Meet link remains: <a href="${meetLink}">${meetLink}</a></p>` : ''}
      <p>If you have any questions or need to make further adjustments, feel free to reply directly to this email.</p>
      <p>Best regards,<br>Taraj Global Solutions Team<br>info@tarajglobal.com | +91 96655-99442</p>
    </div>
  `

  return sendEmail({
    to: meeting.email,
    subject: 'Your Strategy Call with Taraj Global Has Been Rescheduled',
    html,
    text: `Your strategy call with Taraj Global Solutions has been rescheduled to ${displayDate} at ${displayTime} (${timezone}). Meet link: ${meetLink}`
  })
}

// Send cancellation notification to customer
export const sendMeetingCancellationEmail = async (meeting, reason = '') => {
  const customerName = meeting.fullName || meeting.full_name || meeting.name || 'Valued Client'
  const displayDate = meeting.displayDate || (typeof meeting.meeting_date === 'string' ? meeting.meeting_date.split('T')[0] : new Date(meeting.meeting_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const displayTime = meeting.meeting_time || meeting.time || meeting.start_time

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <h2 style="color: #ef4444;">Strategy Call Cancelled</h2>
      <p>Hello ${customerName},</p>
      <p>Your scheduled strategy call for <strong>${displayDate} at ${displayTime}</strong> has been cancelled.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
      <p>You can rebook a strategy call anytime by visiting our website: <a href="https://tarajglobal.com/contact">tarajglobal.com/contact</a>.</p>
      <p>Best regards,<br>Taraj Global Solutions Team<br>info@tarajglobal.com</p>
    </div>
  `

  return sendEmail({
    to: meeting.email,
    subject: 'Strategy Call Cancelled — Taraj Global Solutions',
    html,
    text: `Your strategy call scheduled for ${displayDate} at ${displayTime} has been cancelled.${reason ? ` Reason: ${reason}` : ''} Visit https://tarajglobal.com/contact to reschedule.`
  })
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNewApplicationNotification,
  sendLeadNotification,
  sendBlogPublishedNotification,
  sendMeetingConfirmationEmail,
  sendMeetingAdminNotificationEmail,
  sendMeetingRescheduledEmail,
  sendMeetingCancellationEmail
}

