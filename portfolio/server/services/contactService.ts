import { randomUUID } from 'node:crypto'
import { mkdir, readFile, appendFile } from 'node:fs/promises'
import path from 'node:path'
import { logger } from '../utils/logger.js'
import type { ValidatedContact } from '../utils/validation.js'

export interface StoredMessage extends ValidatedContact {
  id: string
  receivedAt: string
  ip: string
  userAgent: string
}

/**
 * Storage + delivery for contact submissions.
 * ---------------------------------------------------------------------------
 * If an email service is configured (SMTP_* + CONTACT_TO_EMAIL env vars) the
 * message is emailed. Otherwise — and also when email delivery fails — the
 * submission is appended to a JSON file so nothing is ever silently lost.
 */

const STORE_PATH = path.resolve(
  process.cwd(),
  process.env.CONTACT_STORE_PATH ?? 'server/data/messages.json',
)

/** Newline-delimited JSON keeps appends atomic and corruption-resistant. */
async function persist(message: StoredMessage): Promise<void> {
  await mkdir(path.dirname(STORE_PATH), { recursive: true })
  await appendFile(STORE_PATH, `${JSON.stringify(message)}\n`, 'utf8')
}

export async function listMessages(): Promise<StoredMessage[]> {
  try {
    const raw = await readFile(STORE_PATH, 'utf8')
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as StoredMessage)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
    logger.error('Could not read the contact store', error)
    return []
  }
}

function emailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.CONTACT_TO_EMAIL)
}

/**
 * Placeholder for real delivery. When SMTP env vars are absent this returns
 * false and the caller falls back to file storage, so the endpoint always
 * succeeds without pretending an email was sent.
 */
async function trySendEmail(message: StoredMessage): Promise<boolean> {
  if (!emailConfigured()) {
    logger.info('Email service not configured — storing the submission instead.', { id: message.id })
    return false
  }
  try {
    // Deliberately not implemented: install nodemailer (or your provider SDK)
    // and send `message` here, then return true on success.
    logger.warn('SMTP is configured but no mail transport is implemented in this project.', {
      id: message.id,
    })
    return false
  } catch (error) {
    logger.error('Email delivery failed — falling back to local storage.', error)
    return false
  }
}

export interface CreateResult {
  stored: StoredMessage
  delivered: boolean
}

export async function saveContactMessage(
  data: ValidatedContact,
  meta: { ip: string; userAgent: string },
): Promise<CreateResult> {
  const message: StoredMessage = {
    id: randomUUID(),
    ...data,
    receivedAt: new Date().toISOString(),
    ip: meta.ip,
    userAgent: meta.userAgent,
  }

  const delivered = await trySendEmail(message)
  await persist(message)

  logger.info('Contact message received', {
    id: message.id,
    email: message.email,
    delivered,
  })

  return { stored: message, delivered }
}

/** Simple in-memory rate limiter (per IP) — resets when the process restarts. */
const hits = new Map<string, number[]>()

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 600_000)
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5)
  const now = Date.now()

  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  if (timestamps.length >= max) {
    const oldest = timestamps[0]
    hits.set(ip, timestamps)
    return { allowed: false, retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000) }
  }

  timestamps.push(now)
  hits.set(ip, timestamps)
  return { allowed: true, retryAfterSeconds: 0 }
}
