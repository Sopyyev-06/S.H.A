import { randomUUID } from 'crypto'
import type { IncomingMessage, ServerResponse } from 'http'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

function validate(body: Record<string, unknown>) {
  const errors: Record<string, string> = {}
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name) errors.name = 'Adyňyzy giriziň.'
  else if (name.length < 2) errors.name = 'At azyndan 2 harp bolmaly.'
  else if (name.length > 80) errors.name = 'At 80 harpdan köp bolmaly däl.'

  if (!email) errors.email = 'E-poçta salgyňyzy giriziň.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Dogry e-poçta salgysyny giriziň.'

  if (!message) errors.message = 'Habar ýazyň.'
  else if (message.length < 10) errors.message = 'Habar azyndan 10 harp bolmaly.'
  else if (message.length > 2000) errors.message = 'Habar 2000 harpdan köp bolmaly däl.'

  return { ok: Object.keys(errors).length === 0, errors, name, email }
}

const hits = new Map<string, number[]>()

function checkRate(ip: string): boolean {
  const windowMs = 600_000
  const max = 5
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  if (timestamps.length >= max) return false
  timestamps.push(now)
  hits.set(ip, timestamps)
  return true
}

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (chunk: Buffer) => { data += chunk.toString() })
    req.on('end', () => {
      try { resolve(JSON.parse(data) as Record<string, unknown>) }
      catch { resolve({}) }
    })
    req.on('error', () => resolve({}))
  })
}

function send(res: ServerResponse, status: number, data: unknown) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(body)
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    return send(res, 204, {})
  }

  if (req.method === 'GET') {
    return send(res, 200, { success: true, message: 'POST { name, email, message } iberiň.' })
  }

  if (req.method !== 'POST') {
    return send(res, 405, { success: false, message: 'Rugsat berilmeýär.' })
  }

  const ip = String(
    (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0] ?? 'unknown'
  ).trim()

  if (!checkRate(ip)) {
    return send(res, 429, { success: false, message: 'Köp habar iberdiňiz. 10 minutdan soň synanyşyň.' })
  }

  const body = await readBody(req)
  const { ok, errors, name, email } = validate(body)

  if (!ok) {
    return send(res, 422, { success: false, message: 'Meýdanlary barlaň.', errors })
  }

  const id = randomUUID()
  console.log('Contact:', { id, name, email, at: new Date().toISOString() })

  return send(res, 201, {
    success: true,
    message: 'Habar iberildi. Sag boluň — ýakyn wagtda jogap bererin.',
    data: { id, receivedAt: new Date().toISOString() },
  })
}
