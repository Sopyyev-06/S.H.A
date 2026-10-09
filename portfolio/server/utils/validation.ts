/**
 * Shared validation + sanitisation for the contact endpoint.
 * Mirrors src/composables/useContactForm.ts so client and server agree.
 */
export interface ContactInput {
  name?: unknown
  email?: unknown
  message?: unknown
}

export interface ValidatedContact {
  name: string
  email: string
  message: string
}

export type FieldErrors = Record<string, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 160,
  messageMin: 10,
  messageMax: 2000,
} as const

/** Strip control characters and trim. Never trust client input. */
export function sanitize(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/\r\n/g, '\n')
    .trim()
}

/** Reject strings that look like header injection attempts. */
function hasHeaderInjection(value: string): boolean {
  return /[\n\r]/.test(value)
}

export function validateContact(input: ContactInput): {
  ok: boolean
  data: ValidatedContact
  errors: FieldErrors
} {
  const name = sanitize(input.name)
  const email = sanitize(input.email)
  const message = sanitize(input.message)
  const errors: FieldErrors = {}

  if (!name) errors.name = 'Name is required.'
  else if (name.length < LIMITS.nameMin) errors.name = `Name must be at least ${LIMITS.nameMin} characters.`
  else if (name.length > LIMITS.nameMax) errors.name = `Name must be ${LIMITS.nameMax} characters or fewer.`

  if (!email) errors.email = 'Email is required.'
  else if (email.length > LIMITS.emailMax) errors.email = 'Email address is too long.'
  else if (hasHeaderInjection(email) || !EMAIL_RE.test(email)) errors.email = 'Please provide a valid email address.'

  if (!message) errors.message = 'Message is required.'
  else if (message.length < LIMITS.messageMin)
    errors.message = `Message must be at least ${LIMITS.messageMin} characters.`
  else if (message.length > LIMITS.messageMax)
    errors.message = `Message must be ${LIMITS.messageMax} characters or fewer.`

  return {
    ok: Object.keys(errors).length === 0,
    data: { name, email, message },
    errors,
  }
}
