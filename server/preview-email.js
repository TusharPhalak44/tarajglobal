/**
 * Email Template Preview Script
 * Run: node preview-email.js
 * Opens a local preview of how your branded meeting emails look
 */
import {
  renderClientMeetingConfirmedEmail,
  renderAdminMeetingConfirmedEmail,
  renderClientCancelledEmail,
  renderAdminCancelledEmail,
} from './helpers/emailTemplates.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Sample data matching a real Calendly booking
const sampleData = {
  fullName: 'Saee Kulkarni',
  email: 'saeekulkarni953@gmail.com',
  company: 'Enterprise Partner',
  phone: '+91 98765 43210',
  displayDate: 'Thursday, October 29, 2026',
  time: '10:00 AM',
  finalTimeZone: 'Asia/Kolkata (India Standard Time)',
  bookingId: 'CAL-b55493b5',
  googleCalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Strategy+Call+with+Taraj+Global&dates=20261029T043000Z/20261029T050000Z',
}

// Generate all 4 email templates
const templates = [
  {
    name: 'client_meeting_confirmed',
    title: 'Client Booking Confirmation',
    html: renderClientMeetingConfirmedEmail(sampleData),
  },
  {
    name: 'admin_meeting_confirmed',
    title: 'Admin Booking Notification',
    html: renderAdminMeetingConfirmedEmail(sampleData),
  },
  {
    name: 'client_cancelled',
    title: 'Client Cancellation',
    html: renderClientCancelledEmail({
      fullName: sampleData.fullName,
      displayDate: sampleData.displayDate,
      time: sampleData.time,
      finalTimeZone: sampleData.finalTimeZone,
      reason: 'Schedule conflict',
    }),
  },
  {
    name: 'admin_cancelled',
    title: 'Admin Cancellation Alert',
    html: renderAdminCancelledEmail({
      fullName: sampleData.fullName,
      email: sampleData.email,
      displayDate: sampleData.displayDate,
      time: sampleData.time,
      finalTimeZone: sampleData.finalTimeZone,
      bookingId: sampleData.bookingId,
      reason: 'Schedule conflict',
    }),
  },
]

// Write each template to an HTML file for preview
const previewDir = path.join(__dirname, 'email-previews')
if (!fs.existsSync(previewDir)) fs.mkdirSync(previewDir)

templates.forEach(({ name, title, html }) => {
  const filePath = path.join(previewDir, `${name}.html`)
  fs.writeFileSync(filePath, html, 'utf-8')
  console.log(`✅ ${title}: ${filePath}`)
})

// Create an index page with all previews
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Taraj Global — Email Template Previews</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B1120; color: #fff; min-height: 100vh; }
    .header { padding: 40px 32px 24px; text-align: center; background: linear-gradient(135deg, #070D1B, #0A1B3A, #0D2754); border-bottom: 3px solid #00A6FF; }
    .header h1 { font-size: 28px; font-weight: 800; background: linear-gradient(135deg, #00A6FF, #00D4FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .header p { color: #94A3B8; font-size: 14px; margin-top: 8px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 32px; max-width: 1200px; margin: 0 auto; }
    .card { background: #1E293B; border: 1px solid #334155; border-radius: 14px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,166,255,0.15); }
    .card-header { padding: 16px 20px; border-bottom: 1px solid #334155; }
    .card-header h3 { font-size: 15px; font-weight: 700; color: #E2E8F0; }
    .card-header span { font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; }
    .card-body { padding: 20px; text-align: center; }
    .card-body a { display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #00A6FF, #0077CC); color: #fff; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(0,166,255,0.35); transition: box-shadow 0.2s; }
    .card-body a:hover { box-shadow: 0 6px 20px rgba(0,166,255,0.5); }
    .note { text-align: center; padding: 24px; color: #64748B; font-size: 13px; max-width: 600px; margin: 0 auto; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
    .badge-confirm { background: rgba(16,185,129,0.12); color: #10B981; border: 1px solid #10B981; }
    .badge-cancel { background: rgba(239,68,68,0.12); color: #EF4444; border: 1px solid #EF4444; }
    .badge-admin { background: rgba(255,109,0,0.12); color: #FF6D00; border: 1px solid #FF6D00; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📧 Email Template Preview Gallery</h1>
    <p>Preview how your premium branded meeting emails will appear in client & admin inboxes</p>
  </div>
  <div class="grid">
    <div class="card">
      <div class="card-header">
        <span class="badge badge-confirm">Booking Confirmed</span>
        <h3>Client Confirmation Email</h3>
      </div>
      <div class="card-body">
        <p style="color:#94A3B8;font-size:13px;margin-bottom:16px;">Sent to the client after booking</p>
        <a href="client_meeting_confirmed.html" target="_blank">Preview →</a>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="badge badge-admin">Admin Alert</span>
        <h3>Admin Booking Notification</h3>
      </div>
      <div class="card-body">
        <p style="color:#94A3B8;font-size:13px;margin-bottom:16px;">Sent to TGS admin on new booking</p>
        <a href="admin_meeting_confirmed.html" target="_blank">Preview →</a>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="badge badge-cancel">Cancelled</span>
        <h3>Client Cancellation Email</h3>
      </div>
      <div class="card-body">
        <p style="color:#94A3B8;font-size:13px;margin-bottom:16px;">Sent to client on cancellation</p>
        <a href="client_cancelled.html" target="_blank">Preview →</a>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <span class="badge badge-cancel">Admin Alert</span>
        <h3>Admin Cancellation Alert</h3>
      </div>
      <div class="card-body">
        <p style="color:#94A3B8;font-size:13px;margin-bottom:16px;">Sent to admin on cancellation</p>
        <a href="admin_cancelled.html" target="_blank">Preview →</a>
      </div>
    </div>
  </div>
  <div class="note">
    <p>These templates use the same premium design system as your Career application emails — with gradient headers, TG monogram, spec-sheet cards, and branded footers.</p>
  </div>
</body>
</html>`

fs.writeFileSync(path.join(previewDir, 'index.html'), indexHtml, 'utf-8')
console.log(`\n🎨 Preview gallery: ${path.join(previewDir, 'index.html')}`)
console.log('Open the index.html file in your browser to see all templates!')
