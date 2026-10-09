import { ref } from 'vue'
import type { ContactPayload } from '@/types'
import { ApiError, sendContactMessage } from '@/services/api'
import { i18n } from '@/i18n'

export interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

/** Client-side validation mirrors the server rules in server/utils/validation.ts */
export function validateContact(values: ContactPayload): FieldErrors {
  const errors: FieldErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  const t = (key: string, fallback: string) => {
    try {
      const val = i18n.global.t(key)
      return typeof val === 'string' && val !== key ? val : fallback
    } catch {
      return fallback
    }
  }

  if (!name) errors.name = t('validation.nameRequired', 'Please enter your name.')
  else if (name.length < 2) errors.name = t('validation.nameMin', 'Name must be at least 2 characters.')
  else if (name.length > 80) errors.name = 'Name must be 80 characters or fewer.'

  if (!email) errors.email = t('validation.emailRequired', 'Please enter your email address.')
  else if (!EMAIL_RE.test(email)) errors.email = t('validation.emailInvalid', 'Please enter a valid email address.')

  if (!message) errors.message = t('validation.messageRequired', 'Please write a message.')
  else if (message.length < 10) errors.message = t('validation.messageMin', 'Message must be at least 10 characters.')
  else if (message.length > 2000) errors.message = 'Message must be 2000 characters or fewer.'

  return errors
}

export type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export function useContactForm() {
  const values = ref<ContactPayload>({ name: '', email: '', message: '' })
  const errors = ref<FieldErrors>({})
  const state = ref<SubmitState>('idle')
  const serverMessage = ref('')
  const serverError = ref('')

  function reset() {
    values.value = { name: '', email: '', message: '' }
    errors.value = {}
    state.value = 'idle'
    serverMessage.value = ''
    serverError.value = ''
  }

  function validateField(field: keyof ContactPayload) {
    const fieldErrors = validateContact(values.value)
    errors.value = { ...errors.value, [field]: fieldErrors[field] }
  }

  async function submit(): Promise<boolean> {
    serverError.value = ''
    serverMessage.value = ''

    const fieldErrors = validateContact(values.value)
    errors.value = fieldErrors
    if (Object.keys(fieldErrors).length > 0) {
      state.value = 'error'
      return false
    }

    state.value = 'loading'
    try {
      const response = await sendContactMessage({
        name: values.value.name.trim(),
        email: values.value.email.trim(),
        message: values.value.message.trim(),
      })

      if (!response.success) {
        state.value = 'error'
        serverError.value = response.message || (i18n.global.t('validation.error') as string)
        return false
      }

      state.value = 'success'
      serverMessage.value = (i18n.global.t('validation.success') as string) || response.message
      values.value = { name: '', email: '', message: '' }
      errors.value = {}
      return true
    } catch (error) {
      state.value = 'error'
      if (error instanceof ApiError) {
        serverError.value = error.message
        if (error.errors) {
          errors.value = { ...errors.value, ...error.errors }
        }
      } else {
        serverError.value = (i18n.global.t('validation.error') as string) || 'Unexpected error. Please try again in a moment.'
      }
      return false
    }
  }

  return { values, errors, state, serverMessage, serverError, submit, validateField, reset }
}
