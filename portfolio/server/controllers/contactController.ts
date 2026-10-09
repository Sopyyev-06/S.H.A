import type { Request, Response } from 'express'
import { validateContact, type ContactInput } from '../utils/validation.js'
import { checkRateLimit, saveContactMessage } from '../services/contactService.js'
import { logger } from '../utils/logger.js'

/** POST /api/contact */
export async function createContactMessage(req: Request, res: Response): Promise<void> {
  const ip = req.ip ?? 'unknown'

  const { allowed, retryAfterSeconds } = checkRateLimit(ip)
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSeconds))
    res.status(429).json({
      success: false,
      message: `Too many messages sent. Please try again in ${Math.ceil(retryAfterSeconds / 60)} minute(s).`,
    })
    return
  }

  const { ok, data, errors } = validateContact(req.body as ContactInput)
  if (!ok) {
    res.status(422).json({
      success: false,
      message: 'Please check the highlighted fields and try again.',
      errors,
    })
    return
  }

  try {
    const { stored } = await saveContactMessage(data, {
      ip,
      userAgent: String(req.get('user-agent') ?? 'unknown'),
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully. Thank you — I will get back to you soon.',
      data: { id: stored.id, receivedAt: stored.receivedAt },
    })
  } catch (error) {
    logger.error('Failed to store the contact message', error)
    res.status(500).json({
      success: false,
      message: 'The message could not be saved right now. Please try again in a moment.',
    })
  }
}

/** GET /api/contact — lightweight diagnostics (no message bodies are exposed). */
export async function getContactInfo(_req: Request, res: Response): Promise<void> {
  res.json({
    success: true,
    message: 'POST { name, email, message } to this endpoint to send a message.',
    data: {
      emailDeliveryConfigured: Boolean(process.env.SMTP_HOST && process.env.CONTACT_TO_EMAIL),
    },
  })
}
