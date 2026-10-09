import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ContactBody {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Portfolio Contact API endpoint is active.',
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  const { name, email, message } = (req.body || {}) as ContactBody

  const errors: Record<string, string> = {}
  const trimmedName = (name || '').trim()
  const trimmedEmail = (email || '').trim()
  const trimmedMessage = (message || '').trim()

  if (!trimmedName) errors.name = 'Please enter your name.'
  else if (trimmedName.length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!trimmedEmail) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(trimmedEmail)) errors.email = 'Please enter a valid email address.'

  if (!trimmedMessage) errors.message = 'Please enter a message.'
  else if (trimmedMessage.length < 10) errors.message = 'Message must be at least 10 characters.'

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors,
    })
  }

  const recipientEmails = ['nepessopyyev@gmail.com', 'nepessopyyev629@gmail.com']
  const emailSubject = `Täze Habar: ${trimmedName} portfolio arkaly hat iberdi`
  const emailContent = `
Ady: ${trimmedName}
Email: ${trimmedEmail}
Wagty: ${new Date().toLocaleString()}

Habar:
${trimmedMessage}
  `.trim()

  let emailSent = false

  // 1. If Resend API Key is provided
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: recipientEmails,
          subject: emailSubject,
          text: emailContent,
        }),
      })
      if (resendRes.ok) {
        emailSent = true
      }
    } catch (e) {
      console.error('[Vercel API] Resend email failed:', e)
    }
  }

  // 2. If Telegram Bot is configured (Instant alert to phone)
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      const tgText = `📬 *Täze Portfolio Habary*\n\n👤 *Ady:* ${trimmedName}\n📧 *Email:* ${trimmedEmail}\n\n💬 *Habar:*\n${trimmedMessage}`
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: tgText,
          parse_mode: 'Markdown',
        }),
      })
      emailSent = true
    } catch (e) {
      console.error('[Vercel API] Telegram alert failed:', e)
    }
  }

  // 3. If Webhook / Formspree URL is configured
  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
          to: recipientEmails,
        }),
      })
      emailSent = true
    } catch (e) {
      console.error('[Vercel API] Webhook notification failed:', e)
    }
  }

  return res.status(201).json({
    success: true,
    message: 'Message received successfully!',
    emailSent,
    data: {
      id: Date.now().toString(),
      receivedAt: new Date().toISOString(),
    },
  })
}
