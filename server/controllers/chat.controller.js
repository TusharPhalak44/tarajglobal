import db from '../config/db.js'
import { sendChatLeadNotification } from '../services/email.service.js'
import notificationHelper from '../helpers/notificationHelper.js'

// Knowledge base responses for bot auto-reply
const BOT_RESPONSES = [
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'],
    response: "Hello! 👋 Welcome to **Taraj Global**! How can I help you today? Feel free to ask about our services, industries we serve, or company background."
  },
  {
    patterns: ['service', 'services', 'what do you do', 'offer', 'offerings', 'solutions', 'provide'],
    response: "We offer a comprehensive suite of B2B marketing & lead generation solutions:\n\n**Lead Generation Services:**\n• Content Syndication\n• BANT Lead Generation\n• MQL Services\n• B2B Appointment Setting\n• B2B Email Marketing\n• ABM (Account-Based Marketing)\n• Webinar Services\n• Lead Nurturing\n• Demand Generation\n\n**Database Services:**\n• B2B List Building\n• Database Cleansing\n\nWould you like details on any specific service?"
  },
  {
    patterns: ['about', 'taraj', 'company', 'who are you', 'taraj global', 'tell me about'],
    response: "**Taraj Global** is an ISO 9001:2015 (Quality Management) and ISO 27001:2022 (Data Security) certified B2B demand generation agency.\n\nWe deliver performance-driven solutions that help technology and enterprise companies generate high-quality sales leads and accelerate revenue."
  },
  {
    patterns: ['contact', 'reach', 'email', 'phone', 'call', 'touch', 'talk', 'human'],
    response: "You can reach us through multiple channels:\n\n📧 **Email:** info@tarajglobal.com\n📞 **Phone:** +91 96655-99442\n📍 **Office:** The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014\n\nOr visit our [Contact page](/contact) to send us a direct message!"
  },
  {
    patterns: ['industry', 'industries', 'sector', 'sectors', 'vertical', 'verticals', 'market'],
    response: "We serve a wide range of B2B sectors:\n\n• 💻 Technology & SaaS\n• ☁️ Cloud & Infrastructure\n• 🔒 Cybersecurity\n• 📊 Data & Analytics\n• 🤖 Artificial Intelligence\n• 🏥 Healthcare IT\n• 💰 FinTech\n• 📦 Enterprise Software"
  },
  {
    patterns: ['career', 'careers', 'job', 'jobs', 'hiring', 'work', 'join'],
    response: "We're always looking for talented professionals! 🚀 Check out our open positions on our [Careers page](/careers)."
  },
  {
    patterns: ['price', 'pricing', 'cost', 'how much', 'budget', 'quote'],
    response: "Our pricing is customized to your specific target criteria, lead volume, and geographical requirements. Reach out to info@tarajglobal.com for a tailored proposal."
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'appreciate', 'great', 'awesome'],
    response: "You're very welcome! 😊 Let me know if there's anything else I can help you with."
  }
]

const FALLBACK_RESPONSES = [
  "Thank you for your message! Our team is reviewing your query and will assist you shortly.",
  "That's a great question! I'm sharing your request with our specialist team. Is there anything else you'd like to specify?",
  "Thanks for reaching out! You can also email us directly at **info@tarajglobal.com** or call **+91 96655-99442**."
]

const getBotResponse = (input) => {
  const lower = input.toLowerCase().trim()
  for (const entry of BOT_RESPONSES) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      return entry.response
    }
  }
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)]
}

// 2 Minutes Live Agent Override Window (in ms)
const LIVE_AGENT_TIMEOUT_MS = 2 * 60 * 1000

/**
 * Contextual Bot Response Generator
 * Studies full transcript history, user profile, and latest message to deliver:
 * 1. Targeted company & service information
 * 2. Relevant workflow & requirement questions
 * 3. Official contact fallback if off-topic or unnecessary communication detected
 */
function generateContextualBotResponse(transcript = [], latestMessage = '', sessionInfo = {}) {
  const currentText = (latestMessage || '').trim()
  const lowerCurrent = currentText.toLowerCase()

  // Combine all user messages from transcript to understand accumulated context
  const userMessages = transcript
    .filter(m => m.sender_type === 'user')
    .map(m => m.message)

  const allUserText = userMessages.join(' ').toLowerCase()
  const userTurnCount = userMessages.length

  // 1. Detect Off-topic / Gibberish / Unnecessary / Irrelevant Messages
  const randomOrOffTopicPatterns = [
    /^[a-z0-9]{1,3}$/i,
    /asdf|qwerty|123456|hahaha|lol|joke|weather|song|movie|football|cricket|game|politics/i,
    /who are you dating|marry me|what is 2\+2|sing a song|tell me a story/i
  ]

  const isNonsenseOrOffTopic = randomOrOffTopicPatterns.some(pattern => pattern.test(lowerCurrent))

  // If communication is off-topic, unnecessary, or vague after multiple turns:
  if (isNonsenseOrOffTopic || (userTurnCount > 6 && !allUserText.match(/lead|service|b2b|marketing|price|cost|company|taraj|contact|phone|email|job|career|bant|abm/i))) {
    return `Thank you for reaching out to **Taraj Global**! 🏢\n\nTo ensure you receive prompt and accurate assistance for your inquiry, please contact our team directly:\n\n📧 **Email:** info@tarajglobal.com | tgs.admin001@gmail.com\n📞 **Phone:** +91 96655-99442\n📍 **Office:** The Space Business Complex, Office No. 512 to 517, Grant Rd, Kharadi, Pune, Maharashtra 411014\n\nOur representatives will be happy to assist you!`
  }

  // 2. Extract Key Business Topics & Requirements from Transcript History
  const mentionsLeadGen = /lead|leads|demand gen|syndication|whitepaper|bant|mql|sql|appointment|meeting/i.test(allUserText)
  const mentionsABM = /abm|account based|target account/i.test(allUserText)
  const mentionsDatabase = /database|list|cleansing|enrichment|contacts|email list/i.test(allUserText)
  const mentionsPricing = /price|pricing|cost|budget|quote|cpl|rate/i.test(allUserText)
  const mentionsCareers = /career|job|hiring|work|apply|interview/i.test(allUserText)

  const firstName = sessionInfo.first_name || 'there'

  // Service Specific Analysis
  if (lowerCurrent.includes('content syndication') || (mentionsLeadGen && lowerCurrent.includes('content'))) {
    return `Regarding **Content Syndication** at Taraj Global:\n\nWe distribute your enterprise whitepapers, eBooks, and tech assets to target B2B buyers across US, EMEA, and APAC. All leads undergo 100% telemetry verification and GDPR/CCPA consent validation.\n\n❓ **To help us tailor the workflow for your company:**\n1. What target job titles (e.g. CIOs, IT Managers, CISOs) are you aiming to reach?\n2. What is your preferred target region and monthly lead volume requirement?`
  }

  if (lowerCurrent.includes('bant') || lowerCurrent.includes('qualified') || (mentionsLeadGen && lowerCurrent.includes('bant'))) {
    return `Regarding **BANT Lead Generation** (Budget, Authority, Need, Timeline):\n\nTaraj Global pre-qualifies prospect organizations against strict campaign parameters before delivering them directly to your sales team as sales-ready opportunities.\n\n❓ **To understand your workflow requirements:**\n1. What budget and purchase timeline criteria (e.g. within 3-6 months) define your Ideal Customer Profile (ICP)?\n2. What target industry verticals are you prioritizing?`
  }

  if (lowerCurrent.includes('appointment') || lowerCurrent.includes('meeting') || (mentionsLeadGen && lowerCurrent.includes('appointment'))) {
    return `Regarding **B2B Appointment Setting**:\n\nOur dedicated SDR team books qualified discovery meetings directly into your sales reps' Google/Outlook calendars with decision-makers.\n\n❓ **To tailor our outreach strategy for your team:**\n1. What enterprise company size (employee count or revenue) are you targeting?\n2. How many sales-ready discovery meetings are you looking to generate per month?`
  }

  if (mentionsABM || lowerCurrent.includes('abm')) {
    return `Regarding **Account-Based Marketing (ABM)**:\n\nTaraj Global executes multi-touch, account-centric campaigns against named target account lists (TAL) using custom content and telemetry tracking.\n\n❓ **To assist with your ABM requirement:**\n1. Do you already have a Target Account List (TAL) prepared, or do you need us to build one?\n2. Which key decision-maker personas are you targeting within these accounts?`
  }

  if (mentionsDatabase || lowerCurrent.includes('database') || lowerCurrent.includes('cleansing') || lowerCurrent.includes('list')) {
    return `Regarding our **Database & Data Hygiene Services**:\n\nWe provide 95%+ accurate B2B contact lists, database cleansing, domain verification, and direct-dial enrichment compliant with global privacy laws.\n\n❓ **To evaluate your data requirement:**\n1. How many contact records or accounts require validation/enrichment?\n2. What specific attributes (e.g. work emails, direct phone numbers, tech stack) do you need?`
  }

  if (mentionsPricing || lowerCurrent.includes('price') || lowerCurrent.includes('cost') || lowerCurrent.includes('quote')) {
    return `At **Taraj Global**, pricing is customized based on your target lead criteria, qualification depth (MQL vs BANT), volume, and geographic scope on a Cost-Per-Lead (CPL) model.\n\n❓ **To provide an accurate proposal:**\n1. What lead type (Content Syndication, MQL, or BANT) do you require?\n2. What is your estimated monthly volume or campaign budget?`
  }

  if (mentionsCareers || lowerCurrent.includes('career') || lowerCurrent.includes('job') || lowerCurrent.includes('hiring')) {
    return `We are excited about your interest in joining **Taraj Global**! 🚀\n\nWe are an ISO 9001 & ISO 27001 certified organization offering growth opportunities in B2B Marketing, Data Operations, and Tech Sales.\n\n📩 Please send your resume directly to **hr@tarajglobal.com** or explore open roles on our [Careers page](/careers). What specific role or department are you looking for?`
  }

  // 3. Multi-Turn Stage Analysis
  if (userTurnCount <= 1) {
    return `Hello ${firstName}! 👋 Thank you for connecting with **Taraj Global**.\n\nWe are an ISO 9001:2015 and ISO 27001:2022 certified B2B demand generation agency. We specialize in:\n• Content Syndication & Lead Generation\n• BANT Qualified Leads & Appointment Setting\n• Account-Based Marketing (ABM)\n• Data Cleansing & B2B List Building\n\n❓ **To understand your company's requirement:** Could you share what specific marketing or lead generation goal you are aiming to achieve?`
  }

  if (userTurnCount === 2) {
    return `Thank you for sharing those details, ${firstName}! Based on your input, our team can design a custom execution workflow tailored to your target audience.\n\nWe ensure complete data security (ISO 27001 certified) and 100% human-verified lead delivery.\n\n❓ **To finalize your requirements:** What is your target geographic market (e.g., North America, Europe, APAC) and target company size?`
  }

  // Multi-turn contextual fallback
  return `Thank you for providing your requirements! 🎯 Based on our conversation history, Taraj Global can deliver a structured B2B lead generation solution tailored for your company.\n\nOur strategy team is reviewing your details. You can also reach our team directly at **info@tarajglobal.com** or call **+91 96655-99442** to schedule a formal discovery call.`
}

/**
 * Helper to check if a live agent has replied within the last 2 minutes (LIVE_AGENT_TIMEOUT_MS)
 */
function checkIsLiveAgentActive(session) {
  if (!session || !session.last_admin_reply_at) return false
  const lastAdminTime = new Date(session.last_admin_reply_at).getTime()
  if (isNaN(lastAdminTime) || lastAdminTime <= 0) return false
  const elapsedMs = Date.now() - lastAdminTime
  return elapsedMs >= 0 && elapsedMs < LIVE_AGENT_TIMEOUT_MS
}

/**
 * Checks if live agent is inactive (no reply for 2+ mins).
 * If inactive and the last message in the session is from the USER,
 * automatically generates a bot response studying the full transcript history!
 */
async function checkAndTriggerBotReply(session) {
  const isLiveActive = checkIsLiveAgentActive(session)
  if (isLiveActive) return null

  // Live agent is NOT active (>2 minutes since last admin reply or no admin reply yet)
  const [messages] = await db.query(
    `SELECT * FROM chat_messages WHERE session_id = ? ORDER BY id ASC`,
    [session.id]
  )

  if (!messages || messages.length === 0) return null

  const lastMsg = messages[messages.length - 1]

  // If the last message in the session is from the USER, bot takes over!
  if (lastMsg && lastMsg.sender_type === 'user') {
    const botResponseText = generateContextualBotResponse(messages, lastMsg.message, session)

    const [botMsgResult] = await db.execute(
      `INSERT INTO chat_messages (session_id, sender_type, sender_name, message, created_at)
       VALUES (?, 'bot', 'Taraj Assistant', ?, NOW())`,
      [session.id, botResponseText]
    )

    await db.execute(`UPDATE chat_sessions SET updated_at = NOW() WHERE id = ?`, [session.id])

    return {
      id: botMsgResult.insertId,
      session_id: session.id,
      sender_type: 'bot',
      sender_name: 'Taraj Assistant',
      message: botResponseText,
      created_at: new Date()
    }
  }

  return null
}

// Background session scanner every 10 seconds to auto-trigger bot takeover for stale unreplied sessions
setInterval(async () => {
  try {
    const [activeSessions] = await db.query(
      `SELECT * FROM chat_sessions WHERE status = 'active'`
    )
    for (const session of activeSessions) {
      await checkAndTriggerBotReply(session)
    }
  } catch (err) {
    // Silent background scanner fallback
  }
}, 10000)

const chatController = {
  // 1. Create a new Chat Session (Form Submission)
  createSession: async (req, res) => {
    try {
      const { first_name, last_name, email, phone } = req.body

      if (!first_name || !last_name || !email) {
        return res.status(400).json({ success: false, message: 'First name, last name, and email are required.' })
      }

      const id = 'cs_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7)
      const session_token = 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10)

      await db.execute(
        `INSERT INTO chat_sessions (id, session_token, first_name, last_name, email, phone, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
        [id, session_token, first_name, last_name, email, phone || '']
      )

      // Initial Bot Welcome Message
      const welcomeText = `Hi ${first_name}! 👋 Welcome to **Taraj Global**. How can I help you today?`
      const [msgResult] = await db.execute(
        `INSERT INTO chat_messages (session_id, sender_type, sender_name, message, created_at)
         VALUES (?, 'bot', 'Taraj Assistant', ?, NOW())`,
        [id, welcomeText]
      )

      const sessionData = { id, session_token, first_name, last_name, email, phone }

      // Asynchronously send Email Notification to tgs.admin001@gmail.com
      sendChatLeadNotification(sessionData).catch(err => {
        console.error('Failed to send chat lead email notification:', err.message)
      })

      // In-app admin notification
      try {
        notificationHelper.notifyAdmins({
          title: '💬 New Chatbot Lead',
          message: `${first_name} ${last_name} (${email}) started a chat session.`,
          type: 'lead',
          link: '/admin/chat'
        }).catch(() => {})
      } catch (err) {}

      res.status(201).json({
        success: true,
        data: {
          session: sessionData,
          messages: [
            {
              id: msgResult.insertId,
              session_id: id,
              sender_type: 'bot',
              sender_name: 'Taraj Assistant',
              message: welcomeText,
              created_at: new Date()
            }
          ]
        }
      })
    } catch (error) {
      console.error('Create chat session error:', error)
      res.status(500).json({ success: false, message: 'Failed to start chat session' })
    }
  },

  // 2. User sends a message
  sendMessage: async (req, res) => {
    try {
      const { session_token, message } = req.body

      if (!session_token || !message || !message.trim()) {
        return res.status(400).json({ success: false, message: 'Session token and message are required.' })
      }

      // Find session
      const [sessions] = await db.execute(
        `SELECT * FROM chat_sessions WHERE session_token = ?`,
        [session_token]
      )

      if (sessions.length === 0) {
        return res.status(404).json({ success: false, message: 'Chat session not found' })
      }

      const session = sessions[0]

      // Insert User Message
      const [userMsgResult] = await db.execute(
        `INSERT INTO chat_messages (session_id, sender_type, sender_name, message, created_at)
         VALUES (?, 'user', ?, ?, NOW())`,
        [session.id, `${session.first_name} ${session.last_name}`, message.trim()]
      )

      const userMsgObj = {
        id: userMsgResult.insertId,
        session_id: session.id,
        sender_type: 'user',
        sender_name: `${session.first_name} ${session.last_name}`,
        message: message.trim(),
        created_at: new Date()
      }

      // Automatically check and trigger bot response if live agent is inactive (> 2 mins)
      const botMsgObj = await checkAndTriggerBotReply(session)
      const isLiveAgentActive = checkIsLiveAgentActive(session)

      // Update session timestamp
      await db.execute(`UPDATE chat_sessions SET updated_at = NOW() WHERE id = ?`, [session.id])

      res.json({
        success: true,
        data: {
          userMessage: userMsgObj,
          botMessage: botMsgObj,
          isLiveAgentActive
        }
      })
    } catch (error) {
      console.error('Send user message error:', error)
      res.status(500).json({ success: false, message: 'Failed to send message' })
    }
  },

  // 3. Poll Messages (for user or active chat screen)
  pollMessages: async (req, res) => {
    try {
      const { session_token, last_id = 0 } = req.query

      if (!session_token) {
        return res.status(400).json({ success: false, message: 'Session token is required.' })
      }

      const [sessions] = await db.execute(
        `SELECT * FROM chat_sessions WHERE session_token = ?`,
        [session_token]
      )

      if (sessions.length === 0) {
        return res.status(404).json({ success: false, message: 'Session not found' })
      }

      const session = sessions[0]

      // Auto-trigger bot response during poll if 2 minutes have elapsed since last admin reply
      await checkAndTriggerBotReply(session)

      const [newMessages] = await db.query(
        `SELECT * FROM chat_messages WHERE session_id = ? AND id > ? ORDER BY id ASC`,
        [session.id, parseInt(last_id, 10)]
      )

      const isLiveAgentActive = checkIsLiveAgentActive(session)

      res.json({
        success: true,
        data: {
          messages: newMessages,
          isLiveAgentActive,
          sessionStatus: session.status
        }
      })
    } catch (error) {
      console.error('Poll messages error:', error)
      res.status(500).json({ success: false, message: 'Failed to poll messages' })
    }
  },

  // ─── ADMIN ENDPOINTS ────────────────────────────────────────────────────────

  // Get all chat sessions for Admin console
  getAdminSessions: async (req, res) => {
    try {
      const [sessions] = await db.query(`
        SELECT 
          s.*,
          (SELECT message FROM chat_messages WHERE session_id = s.id ORDER BY id DESC LIMIT 1) as last_message,
          (SELECT created_at FROM chat_messages WHERE session_id = s.id ORDER BY id DESC LIMIT 1) as last_message_time,
          (SELECT COUNT(*) FROM chat_messages WHERE session_id = s.id AND sender_type = 'user') as user_msg_count
        FROM chat_sessions s
        ORDER BY s.updated_at DESC
      `)

      res.json({
        success: true,
        data: sessions.map(s => {
          const isLiveAgentActive = checkIsLiveAgentActive(s)
          return {
            ...s,
            isLiveAgentActive
          }
        })
      })
    } catch (error) {
      console.error('Get admin sessions error:', error)
      res.status(500).json({ success: false, message: 'Failed to fetch chat sessions' })
    }
  },

  // Get messages for a specific session ID
  getAdminSessionMessages: async (req, res) => {
    try {
      const { id } = req.params

      const [sessions] = await db.execute(`SELECT * FROM chat_sessions WHERE id = ?`, [id])
      if (sessions.length === 0) {
        return res.status(404).json({ success: false, message: 'Session not found' })
      }

      const session = sessions[0]

      // Auto-trigger bot check if inactive
      await checkAndTriggerBotReply(session)

      const [messages] = await db.query(
        `SELECT * FROM chat_messages WHERE session_id = ? ORDER BY id ASC`,
        [id]
      )

      const isLiveAgentActive = checkIsLiveAgentActive(session)

      res.json({
        success: true,
        data: {
          session: {
            ...session,
            isLiveAgentActive
          },
          messages
        }
      })
    } catch (error) {
      console.error('Get admin session messages error:', error)
      res.status(500).json({ success: false, message: 'Failed to fetch session messages' })
    }
  },

  // Send message from Admin to User (Activates Live Agent Mode for 2 mins)
  sendAdminMessage: async (req, res) => {
    try {
      const { id } = req.params
      const { message } = req.body

      if (!message || !message.trim()) {
        return res.status(400).json({ success: false, message: 'Message text is required.' })
      }

      const [sessions] = await db.execute(`SELECT * FROM chat_sessions WHERE id = ?`, [id])
      if (sessions.length === 0) {
        return res.status(404).json({ success: false, message: 'Session not found' })
      }

      // Insert Admin Message (appears seamlessly as Taraj Assistant to user)
      const [msgResult] = await db.execute(
        `INSERT INTO chat_messages (session_id, sender_type, sender_name, message, created_at)
         VALUES (?, 'admin', 'Taraj Assistant', ?, NOW())`,
        [id, message.trim()]
      )

      // Update last_admin_reply_at = NOW() (Mutes bot auto-reply for 2 minutes)
      await db.execute(
        `UPDATE chat_sessions SET last_admin_reply_at = NOW(), updated_at = NOW() WHERE id = ?`,
        [id]
      )

      res.json({
        success: true,
        data: {
          id: msgResult.insertId,
          session_id: id,
          sender_type: 'admin',
          sender_name: 'Taraj Assistant',
          message: message.trim(),
          created_at: new Date()
        }
      })
    } catch (error) {
      console.error('Send admin message error:', error)
      res.status(500).json({ success: false, message: 'Failed to send admin message' })
    }
  },

  // Update session status (e.g. close/open)
  updateSessionStatus: async (req, res) => {
    try {
      const { id } = req.params
      const { status } = req.body

      if (!['active', 'closed'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' })
      }

      await db.execute(`UPDATE chat_sessions SET status = ?, updated_at = NOW() WHERE id = ?`, [status, id])

      res.json({ success: true, message: `Session marked as ${status}` })
    } catch (error) {
      console.error('Update session status error:', error)
      res.status(500).json({ success: false, message: 'Failed to update session status' })
    }
  }
}

export default chatController
