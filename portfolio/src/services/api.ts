import type { ApiResponse, ContactPayload } from '@/types'

/**
 * Single API access layer — no component should call `fetch` directly.
 * In development, requests go to `/api/...` and Vite proxies them to the
 * Express server (see vite.config.ts). In production the same relative path
 * works because Express serves the built frontend.
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  errors?: Record<string, string>

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(init.headers ?? {}),
      },
      signal: controller.signal,
      ...init,
    })

    const isJson = response.headers.get('content-type')?.includes('application/json')
    const payload = isJson ? await response.json() : null

    if (!response.ok) {
      const message =
        (payload as { message?: string } | null)?.message ??
        `Request failed with status ${response.status}`
      const errors = (payload as { errors?: Record<string, string> } | null)?.errors
      throw new ApiError(message, response.status, errors)
    }

    return payload as T
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('The request timed out. Please check your connection and try again.', 408)
    }
    throw new ApiError(
      'Could not reach the server. Please make sure the API is running and try again.',
      0,
    )
  } finally {
    window.clearTimeout(timeout)
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
}

/** Submit the contact form. Throws ApiError with per-field errors when invalid. */
export async function sendContactMessage(payload: ContactPayload) {
  return request<ApiResponse<{ id: string; receivedAt: string }>>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/** Health check — useful to confirm the Express API is reachable. */
export async function checkApiHealth() {
  return request<{ status: string; uptime: number; timestamp: string }>('/api/health')
}
