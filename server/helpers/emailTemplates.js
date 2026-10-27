/**
 * Taraj Global - Premium Modern Email Template Engine
 * 
 * Provides responsive, executive-grade HTML email templates for all
 * customer-facing confirmations and internal administration alerts.
 * Designed with inline CSS for universal email client compatibility (Gmail, Outlook, Apple Mail).
 */

const esc = (value) =>
  String(value ?? '')
    .replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]))

/**
 * Base Shell Wrapper for all Taraj Global Emails
 */
const renderEmailShell = ({
  badgeText = 'TARAJ GLOBAL ENTERPRISE',
  badgeColor = '#00A6FF',
  badgeBg = 'rgba(0, 166, 255, 0.12)',
  title = '',
  subtitle = '',
  headerGradient = 'linear-gradient(135deg, #070D1B 0%, #0A1B3A 50%, #0D2754 100%)',
  accentColor = '#00A6FF',
  bodyContent = '',
}) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${esc(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, h1, h2, h3, p, a, span { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; line-height: 1.6; color: #1E293B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F1F5F9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04); border: 1px solid #E2E8F0;">
          
          <!-- Top Multi-Color Brand Strip -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #00A6FF 0%, #0077CC 50%, #FF6D00 100%); line-height: 5px; font-size: 0;">&nbsp;</td>
          </tr>

          <!-- Modern Executive Hero Header -->
          <tr>
            <td style="background: ${headerGradient}; padding: 36px 32px 30px 32px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <!-- Brand Monogram + Tag -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="width: 42px; height: 42px; background: linear-gradient(135deg, #00A6FF 0%, #005599 100%); border-radius: 10px; text-align: center; vertical-align: middle; box-shadow: 0 4px 12px rgba(0, 166, 255, 0.35);">
                          <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-weight: 900; font-size: 17px; color: #FFFFFF; letter-spacing: 0.5px;">TG</span>
                        </td>
                        <td style="padding-left: 14px;">
                          <div style="font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 1.5px; line-height: 1.2;">TARAJ GLOBAL</div>
                          <div style="display: inline-block; margin-top: 4px; padding: 2px 10px; border-radius: 12px; background-color: ${badgeBg}; border: 1px solid ${badgeColor}; font-size: 10px; font-weight: 800; color: ${badgeColor}; text-transform: uppercase; letter-spacing: 1px;">
                            ${esc(badgeText)}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px; line-height: 1.25;">
                      ${esc(title)}
                    </h1>
                    ${subtitle ? `
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #CBD5E1; line-height: 1.5;">
                      ${esc(subtitle)}
                    </p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Content Body -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background-color: #FFFFFF;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Professional Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 32px; text-align: center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-size: 13px; font-weight: 700; color: #0F172A; letter-spacing: 0.5px;">
                      TARAJ GLOBAL SOLUTIONS
                    </p>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color: #64748B; line-height: 1.6; max-width: 480px;">
                      The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748B;">
                      <a href="mailto:info@tarajglobal.com" style="color: #00A6FF; text-decoration: none; font-weight: 600;">info@tarajglobal.com</a>
                      &nbsp;&bull;&nbsp;
                      <a href="tel:+919665599442" style="color: #00A6FF; text-decoration: none; font-weight: 600;">+91 96655-99442</a>
                      &nbsp;&bull;&nbsp;
                      <a href="https://tarajglobal.com" target="_blank" style="color: #00A6FF; text-decoration: none; font-weight: 600;">tarajglobal.com</a>
                    </p>
                    <p style="margin: 14px 0 0 0; font-size: 11px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.8px;">
                      Enterprise B2B Growth & Lead Intelligence &bull; Confirmed Calendar Dispatch
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Reusable Specification Row Table for High-Tech Spec Sheet
 */
const renderSpecRow = (label, value, isHighlight = false, isDel = false) => {
  return `
    <tr>
      <td style="padding: 10px 14px; font-size: 12px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px; width: 140px; border-bottom: 1px solid #EDF2F7; vertical-align: middle;">
        ${esc(label)}
      </td>
      <td style="padding: 10px 14px; font-size: 14px; ${isHighlight ? 'font-weight: 800; color: #0284C7; background-color: #F0F9FF;' : 'font-weight: 600; color: #0F172A;'} border-bottom: 1px solid #EDF2F7; vertical-align: middle;">
        ${isDel ? `<del style="color: #94A3B8;">${esc(value)}</del>` : esc(value)}
      </td>
    </tr>
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CLIENT CONFIRMATION EMAIL (Meeting Booked)
// ─────────────────────────────────────────────────────────────────────────────
export const renderClientMeetingConfirmedEmail = ({
  fullName,
  company,
  displayDate,
  time,
  finalTimeZone,
  email,
  googleCalUrl,
  bookingId,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      Dear <strong style="color: #00A6FF;">${esc(fullName)}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
      Thank you for scheduling a strategy session with <strong>Taraj Global</strong>. Your appointment has been officially confirmed and registered in our calendar system.
    </p>

    <!-- Meeting Dossier Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0 26px 0;">
      <tr>
        <td colspan="2" style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
                📅 Confirmed Appointment Dossier
              </td>
              ${bookingId ? `<td align="right" style="font-family: monospace; font-size: 11px; font-weight: 700; color: #00A6FF;">Ref: #${esc(bookingId)}</td>` : ''}
            </tr>
          </table>
        </td>
      </tr>
      ${renderSpecRow('Scheduled Date', displayDate, true)}
      ${renderSpecRow('Time Slot', time, true)}
      ${renderSpecRow('Timezone', finalTimeZone)}
      ${renderSpecRow('Client Email', email)}
      ${company ? renderSpecRow('Organization', company) : ''}
      ${renderSpecRow('Session Format', '1-on-1 Video Strategy Call (Meet / Zoom)')}
    </table>

    <!-- Call To Action: Google Calendar -->
    ${googleCalUrl ? `
    <div style="text-align: center; margin: 28px 0 24px 0;">
      <a href="${googleCalUrl}" target="_blank" style="background: linear-gradient(135deg, #00A6FF 0%, #0077CC 100%); color: #FFFFFF; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; box-shadow: 0 6px 18px rgba(0, 166, 255, 0.35); letter-spacing: 0.3px;">
        📅 Add to Google Calendar
      </a>
    </div>` : ''}

    <!-- Executive Briefing Note -->
    <div style="background-color: #F0F9FF; border-left: 4px solid #00A6FF; border-radius: 8px; padding: 14px 18px; margin: 24px 0;">
      <p style="margin: 0; font-size: 13px; color: #0369A1; line-height: 1.5;">
        <strong>Calendar Invite Attached:</strong> We have attached a standard <code>invite.ics</code> calendar file to this email. You can open it to automatically sync with Outlook, Apple Calendar, or Google Calendar.
      </p>
    </div>

    <p style="margin: 24px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">
      Our leadership team looks forward to speaking with you and exploring high-impact growth and pipeline acceleration strategies for your enterprise.
    </p>

    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #F1F5F9;">
      <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A;">Warm regards,</p>
      <p style="margin: 2px 0 0 0; font-size: 14px; color: #64748B;">Taraj Global Executive Scheduling Team</p>
    </div>
  `

  return renderEmailShell({
    badgeText: 'CONFIRMED APPOINTMENT',
    badgeColor: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.12)',
    title: 'Your Strategy Session is Confirmed',
    subtitle: 'We look forward to connecting with you on our discovery call.',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ADMIN NOTIFICATION EMAIL (New Meeting Booked)
// ─────────────────────────────────────────────────────────────────────────────
export const renderAdminMeetingConfirmedEmail = ({
  fullName,
  email,
  company,
  phone,
  displayDate,
  time,
  finalTimeZone,
  bookingId,
  googleCalUrl,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      <strong>Executive Alert:</strong> A client has booked a new strategy call.
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.5;">
      The details below have been verified against the 24-hour advance booking rule and synchronized with your enterprise calendar.
    </p>

    <!-- Client Dossier -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0;">
      <tr>
        <td colspan="2" style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
          <span style="font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
            👤 Client Profile & Organization
          </span>
        </td>
      </tr>
      ${renderSpecRow('Full Name', fullName)}
      ${renderSpecRow('Email Address', email)}
      ${renderSpecRow('Company', company || 'Not specified')}
      ${renderSpecRow('Phone Number', phone || 'Not provided')}
    </table>

    <!-- Session Details -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0 26px 0;">
      <tr>
        <td colspan="2" style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
                ⚡ Session Schedule
              </td>
              ${bookingId ? `<td align="right" style="font-family: monospace; font-size: 11px; font-weight: 700; color: #FF6D00;">Booking ID: #${esc(bookingId)}</td>` : ''}
            </tr>
          </table>
        </td>
      </tr>
      ${renderSpecRow('Date', displayDate, true)}
      ${renderSpecRow('Time Slot', time, true)}
      ${renderSpecRow('Client Timezone', finalTimeZone)}
      ${renderSpecRow('Meeting Type', 'Enterprise Strategy Call')}
    </table>

    <!-- Action Button -->
    ${googleCalUrl ? `
    <div style="text-align: center; margin: 24px 0;">
      <a href="${googleCalUrl}" target="_blank" style="background: linear-gradient(135deg, #FF6D00 0%, #E65100 100%); color: #FFFFFF; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; box-shadow: 0 6px 18px rgba(255, 109, 0, 0.35); letter-spacing: 0.3px;">
        📅 Add to Admin Google Calendar
      </a>
    </div>` : ''}
  `

  return renderEmailShell({
    badgeText: 'NEW BOOKING RECEIVED',
    badgeColor: '#FF6D00',
    badgeBg: 'rgba(255, 109, 0, 0.12)',
    title: `New Meeting: ${fullName} (${company || 'Individual'})`,
    subtitle: 'A new enterprise appointment has been scheduled via the portal.',
    headerGradient: 'linear-gradient(135deg, #0B132B 0%, #172554 60%, #1E3A8A 100%)',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CLIENT RESCHEDULE EMAIL
// ─────────────────────────────────────────────────────────────────────────────
export const renderClientRescheduledEmail = ({
  fullName,
  displayDate,
  time,
  finalTimeZone,
  oldDisplayDate,
  oldTime,
  googleCalUrl,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      Dear <strong style="color: #00A6FF;">${esc(fullName || 'Client')}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
      Your strategy call appointment with <strong>Taraj Global</strong> has been successfully rescheduled. Please review your updated time slot below.
    </p>

    <!-- Reschedule Comparison Table -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0 26px 0;">
      <tr>
        <td colspan="2" style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
          <span style="font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
            ↻ Updated Meeting Schedule
          </span>
        </td>
      </tr>
      ${renderSpecRow('NEW Date', displayDate, true)}
      ${renderSpecRow('NEW Time', time, true)}
      ${renderSpecRow('Timezone', finalTimeZone)}
      ${oldDisplayDate ? renderSpecRow('Previous Schedule', `${oldDisplayDate} ${oldTime ? `at ${oldTime}` : ''}`, false, true) : ''}
      ${renderSpecRow('Session Format', '1-on-1 Video Strategy Call (Meet / Zoom)')}
    </table>

    ${googleCalUrl ? `
    <div style="text-align: center; margin: 28px 0 24px 0;">
      <a href="${googleCalUrl}" target="_blank" style="background: linear-gradient(135deg, #00A6FF 0%, #0077CC 100%); color: #FFFFFF; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; box-shadow: 0 6px 18px rgba(0, 166, 255, 0.35); letter-spacing: 0.3px;">
        📅 Add Updated Meeting to Google Calendar
      </a>
    </div>` : ''}

    <p style="margin: 24px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">
      The updated calendar invitation (<code>rescheduled.ics</code>) is attached to this email. We look forward to connecting with you at the updated time.
    </p>

    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #F1F5F9;">
      <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A;">Best regards,</p>
      <p style="margin: 2px 0 0 0; font-size: 14px; color: #64748B;">Taraj Global Executive Scheduling Team</p>
    </div>
  `

  return renderEmailShell({
    badgeText: 'MEETING RESCHEDULED',
    badgeColor: '#00A6FF',
    badgeBg: 'rgba(0, 166, 255, 0.12)',
    title: 'Your Meeting Has Been Rescheduled',
    subtitle: 'Your session has been moved to the updated date and time.',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. ADMIN RESCHEDULE NOTIFICATION
// ─────────────────────────────────────────────────────────────────────────────
export const renderAdminRescheduledEmail = ({
  fullName,
  email,
  company,
  oldDisplayDate,
  oldTime,
  displayDate,
  time,
  finalTimeZone,
  bookingId,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      <strong>Notice:</strong> An appointment has been rescheduled by the client.
    </p>
    
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0;">
      <tr>
        <td colspan="2" style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
                👤 Client & Schedule Information
              </td>
              ${bookingId ? `<td align="right" style="font-family: monospace; font-size: 11px; font-weight: 700; color: #00A6FF;">Ref: #${esc(bookingId)}</td>` : ''}
            </tr>
          </table>
        </td>
      </tr>
      ${renderSpecRow('Customer Name', fullName || 'N/A')}
      ${renderSpecRow('Email', email)}
      ${company ? renderSpecRow('Company', company) : ''}
      ${oldDisplayDate ? renderSpecRow('Previous Schedule', `${oldDisplayDate} ${oldTime ? `at ${oldTime}` : ''}`, false, true) : ''}
      ${renderSpecRow('NEW Date', displayDate, true)}
      ${renderSpecRow('NEW Time', time, true)}
      ${renderSpecRow('Timezone', finalTimeZone)}
    </table>
  `

  return renderEmailShell({
    badgeText: 'SCHEDULE MODIFIED',
    badgeColor: '#00A6FF',
    badgeBg: 'rgba(0, 166, 255, 0.12)',
    title: `Rescheduled: ${fullName || email}`,
    subtitle: 'The customer has updated their meeting date & time.',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. CLIENT CANCELLATION EMAIL
// ─────────────────────────────────────────────────────────────────────────────
export const renderClientCancelledEmail = ({
  fullName,
  displayDate,
  time,
  finalTimeZone,
  reason,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      Dear <strong style="color: #EF4444;">${esc(fullName || 'Client')}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
      This email confirms that your scheduled strategy call with <strong>Taraj Global</strong> has been cancelled as requested.
    </p>

    <!-- Cancelled Appointment Card -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FEF2F2; border-radius: 14px; border: 1px solid #FECACA; overflow: hidden; margin: 20px 0 24px 0;">
      <tr>
        <td colspan="2" style="background: #FEE2E2; padding: 12px 16px; border-bottom: 1px solid #FECACA;">
          <span style="font-size: 11px; font-weight: 800; color: #991B1B; text-transform: uppercase; letter-spacing: 1px;">
            ✕ Cancelled Appointment Details
          </span>
        </td>
      </tr>
      ${renderSpecRow('Original Date', displayDate)}
      ${time ? renderSpecRow('Original Time', time) : ''}
      ${renderSpecRow('Timezone', finalTimeZone)}
      ${reason ? renderSpecRow('Cancellation Reason', reason) : ''}
    </table>

    <p style="margin: 20px 0 0 0; font-size: 14px; color: #475569; line-height: 1.6;">
      If your schedule frees up or you would like to book a meeting at a future time, you are always welcome to pick a convenient new slot anytime on our portal.
    </p>

    <div style="text-align: center; margin: 28px 0 24px 0;">
      <a href="https://tarajglobal.com" target="_blank" style="background: linear-gradient(135deg, #00A6FF 0%, #0077CC 100%); color: #FFFFFF; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; box-shadow: 0 4px 14px rgba(0, 166, 255, 0.35); letter-spacing: 0.3px;">
        Book a New Appointment
      </a>
    </div>

    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #F1F5F9;">
      <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A;">Warm regards,</p>
      <p style="margin: 2px 0 0 0; font-size: 14px; color: #64748B;">Taraj Global Team</p>
    </div>
  `

  return renderEmailShell({
    badgeText: 'APPOINTMENT CANCELLED',
    badgeColor: '#EF4444',
    badgeBg: 'rgba(239, 68, 68, 0.12)',
    title: 'Your Meeting Has Been Cancelled',
    subtitle: 'Confirmation of cancelled appointment slot.',
    headerGradient: 'linear-gradient(135deg, #450A0A 0%, #7F1D1D 50%, #991B1B 100%)',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ADMIN CANCELLATION NOTIFICATION
// ─────────────────────────────────────────────────────────────────────────────
export const renderAdminCancelledEmail = ({
  fullName,
  email,
  displayDate,
  time,
  finalTimeZone,
  bookingId,
  reason,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      <strong>Cancellation Alert:</strong> A client has cancelled their scheduled strategy call. The slot has been released back to availability.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FEF2F2; border-radius: 14px; border: 1px solid #FECACA; overflow: hidden; margin: 20px 0;">
      <tr>
        <td colspan="2" style="background: #FEE2E2; padding: 12px 16px; border-bottom: 1px solid #FECACA;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size: 11px; font-weight: 800; color: #991B1B; text-transform: uppercase; letter-spacing: 1px;">
                ✕ Cancelled Meeting Record
              </td>
              ${bookingId ? `<td align="right" style="font-family: monospace; font-size: 11px; font-weight: 700; color: #DC2626;">Ref: #${esc(bookingId)}</td>` : ''}
            </tr>
          </table>
        </td>
      </tr>
      ${renderSpecRow('Customer Name', fullName || 'N/A')}
      ${renderSpecRow('Customer Email', email)}
      ${renderSpecRow('Original Date', displayDate)}
      ${time ? renderSpecRow('Original Time', time) : ''}
      ${renderSpecRow('Timezone', finalTimeZone)}
      ${reason ? renderSpecRow('Client Stated Reason', reason) : ''}
    </table>
  `

  return renderEmailShell({
    badgeText: 'SLOT CANCELLED & RELEASED',
    badgeColor: '#EF4444',
    badgeBg: 'rgba(239, 68, 68, 0.12)',
    title: `Meeting Cancelled: ${fullName || email}`,
    subtitle: 'The calendar appointment has been removed and released.',
    headerGradient: 'linear-gradient(135deg, #450A0A 0%, #7F1D1D 50%, #991B1B 100%)',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. CONTACT US LEAD CONFIRMATION (To User)
// ─────────────────────────────────────────────────────────────────────────────
export const renderLeadConfirmationEmail = ({ name, email, subject, message }) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      Hi <strong style="color: #00A6FF;">${esc(name)}</strong>,
    </p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #475569; line-height: 1.6;">
      Thank you for reaching out to <strong>Taraj Global</strong>. We have received your inquiry and our team is already reviewing your requirements. We will be in touch shortly.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0 24px 0;">
      <tr>
        <td style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
          📝 Your Submitted Inquiry
        </td>
      </tr>
      <tr>
        <td style="padding: 16px;">
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Subject:</p>
          <p style="margin: 0 0 14px 0; font-size: 14px; font-weight: 600; color: #0F172A;">${esc(subject || 'General Inquiry')}</p>
          <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px;">Message:</p>
          <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 14px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${esc(message)}</div>
        </td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #F1F5F9;">
      <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0F172A;">Best regards,</p>
      <p style="margin: 2px 0 0 0; font-size: 14px; color: #64748B;">The Taraj Global Client Success Team</p>
    </div>
  `

  return renderEmailShell({
    badgeText: 'INQUIRY RECEIVED',
    badgeColor: '#00A6FF',
    badgeBg: 'rgba(0, 166, 255, 0.12)',
    title: 'Thank You for Contacting Taraj Global',
    subtitle: 'We have received your message and will respond promptly.',
    bodyContent,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. CONTACT US LEAD NOTIFICATION (To Admin)
// ─────────────────────────────────────────────────────────────────────────────
export const renderLeadNotificationEmail = ({
  name,
  email,
  company,
  phone,
  message,
  source,
  page_url,
  cta_button,
  cta_section,
  source_page,
  utm_campaign,
  utm_source,
  utm_medium,
}) => {
  const bodyContent = `
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #0F172A;">
      <strong>New Lead Alert:</strong> A new contact form inquiry has been received on the website.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F8FAFC; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; margin: 20px 0;">
      <tr>
        <td colspan="2" style="background: #F1F5F9; padding: 12px 16px; border-bottom: 1px solid #E2E8F0; font-size: 11px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">
          👤 Prospect Dossier
        </td>
      </tr>
      ${renderSpecRow('Name', name)}
      ${renderSpecRow('Email', email)}
      ${renderSpecRow('Company', company || 'Not provided')}
      ${renderSpecRow('Phone', phone || 'Not provided')}
      ${cta_button ? renderSpecRow('🎯 Originating CTA', `<strong style="color: #00A6FF;">${esc(cta_button)}</strong>`) : ''}
      ${cta_section ? renderSpecRow('📍 Origin Section', `<strong style="color: #FF6D00;">${esc(cta_section)}</strong>`) : ''}
      ${source_page ? renderSpecRow('📄 Origin Page', esc(source_page)) : ''}
      ${utm_campaign ? renderSpecRow('🏷️ UTM Campaign', esc(utm_campaign)) : ''}
      ${utm_source || utm_medium ? renderSpecRow('📡 Channel / Medium', esc(`${utm_source || 'direct'} / ${utm_medium || 'cta_button'}`)) : ''}
      ${renderSpecRow('Lead Source', source || 'contact_form')}
      ${page_url && !cta_button ? renderSpecRow('Landing Page', page_url) : ''}
    </table>

    <div style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; margin: 20px 0;">
      <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 0.8px;">Prospect Message:</p>
      <div style="font-size: 14px; color: #1E293B; line-height: 1.6; white-space: pre-wrap;">${esc(message || 'No message text provided')}</div>
    </div>
  `

  return renderEmailShell({
    badgeText: 'NEW PROSPECT LEAD',
    badgeColor: '#FF6D00',
    badgeBg: 'rgba(255, 109, 0, 0.12)',
    title: `New Lead: ${name}`,
    subtitle: cta_button ? `Inquiry via CTA: "${cta_button}" in ${cta_section || 'page'}` : 'A prospective client has submitted an inquiry via Taraj Global.',
    bodyContent,
  })
}
