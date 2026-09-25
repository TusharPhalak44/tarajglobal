/**
 * Safe SMTP Diagnostics and Test Utility
 * Usage:
 *   node scripts/test-smtp.js               -> verifies DNS, TCP connection, TLS & authentication
 *   node scripts/test-smtp.js --send [email] -> verifies AND sends a real test email if configured
 */

import 'dotenv/config'
import { verifySMTPConnection, sendEmail, getSMTPConfig } from '../services/email.service.js'

async function runDiagnostics() {
  console.log('\n========================================')
  console.log('   TARAJ GLOBAL — SMTP SAFE DIAGNOSTIC  ')
  console.log('========================================\n')

  const cfg = getSMTPConfig()

  console.log('1. Configuration Check:')
  console.log(`   - SMTP Host: ${cfg.host}`)
  console.log(`   - SMTP Port: ${cfg.port}`)
  console.log(`   - Secure (SSL port 465): ${cfg.secure}`)
  console.log(`   - Sender (From): ${cfg.from}`)
  console.log(`   - Reply-To: ${cfg.replyTo}`)
  console.log(`   - Admin Notification To: ${cfg.adminNotificationEmail}`)
  console.log(`   - Auth User: ${cfg.user ? (cfg.user.includes('@') ? `${cfg.user.split('@')[0].slice(0, 3)}***@${cfg.user.split('@')[1]}` : `${cfg.user.slice(0, 3)}***`) : '(not configured)'}`)
  console.log(`   - Auth Pass Set?: ${Boolean(cfg.pass)} (Length: ${cfg.pass ? cfg.pass.length : 0})`)
  console.log(`   - Is Placeholder Detected?: ${cfg.isPlaceholder}\n`)

  console.log('2. Testing SMTP Connection & Authentication...')
  const result = await verifySMTPConnection()

  if (result.success) {
    console.log('   ✅ SMTP CONNECTION & AUTHENTICATION SUCCESSFUL!\n')
  } else {
    console.log('   ❌ SMTP CONNECTION OR AUTHENTICATION FAILED')
    console.log(`   - Error Code: ${result.error?.code || 'N/A'}`)
    console.log(`   - Command: ${result.error?.command || 'N/A'}`)
    console.log(`   - Response Code: ${result.error?.responseCode || 'N/A'}`)
    console.log(`   - Server Response: ${result.error?.response || result.error?.message}`)
    if (result.likelyCause) {
      console.log(`   💡 Likely Cause / Action: ${result.likelyCause}`)
    }
    console.log('')
  }

  // 3. Optional send test email if --send flag is provided
  const args = process.argv.slice(2)
  const isSend = args.includes('--send')
  const recipientArg = args.find(a => a.includes('@')) || cfg.adminNotificationEmail

  if (isSend) {
    console.log(`3. Sending Test Email to: ${recipientArg}...`)
    if (!result.success) {
      console.log('   ⚠️ Skipping email send because SMTP verification failed.\n')
      process.exit(1)
    }

    const testResult = await sendEmail({
      to: recipientArg,
      subject: 'Taraj Global SMTP Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #00A6FF;">Taraj Global SMTP System Test</h2>
          <p>This is a test email sent from the Taraj Global Solutions backend to verify SMTP configuration.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Host:</strong> ${cfg.host}:${cfg.port}</p>
        </div>
      `,
      text: `Taraj Global SMTP System Test\nTimestamp: ${new Date().toISOString()}\nHost: ${cfg.host}:${cfg.port}`
    })

    if (testResult.success) {
      console.log(`   ✅ Test email successfully delivered! Message ID: ${testResult.messageId}\n`)
    } else {
      console.log(`   ❌ Failed sending test email: ${testResult.error}\n`)
      process.exit(1)
    }
  } else {
    console.log('3. Test Email Delivery:')
    console.log('   (Skipped. To send a real test email, run: node scripts/test-smtp.js --send your.email@example.com)\n')
  }

  process.exit(result.success ? 0 : 1)
}

runDiagnostics().catch(err => {
  console.error('Diagnostic error:', err)
  process.exit(1)
})
