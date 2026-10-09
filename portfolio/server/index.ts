/**
 * Express API for the portfolio.
 * ---------------------------------------------------------------------------
 * Development : `npm run dev` starts Vite (5173) and this API (8787) together;
 *               Vite proxies /api/* here (see vite.config.ts).
 * Production  : `npm run build` then `npm start` — this server also serves the
 *               built SPA from ./dist, so everything runs from one origin.
 */
import path from 'node:path'
import { existsSync } from 'node:fs'
import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import contactRouter from './routes/contact.js'
import { logger } from './utils/logger.js'

const app = express()
const PORT = Number(process.env.PORT ?? 8787)
const DIST_DIR = path.resolve(process.cwd(), 'dist')

/* ----------------------------- middleware ----------------------------- */

app.disable('x-powered-by')
app.set('trust proxy', true)

const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      // Same-origin / curl / server-to-server requests have no Origin header.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(null, false)
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    maxAge: 86400,
  }),
)

app.use(express.json({ limit: '32kb' }))

/** Minimal security headers (no extra dependency needed). */
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  next()
})

/* ------------------------------- routes ------------------------------- */

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/contact', contactRouter)

/** Unknown API route → JSON 404 (never the SPA fallback). */
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `No API route for ${req.method} ${req.originalUrl}` })
})

/* --------------------- static SPA (production only) -------------------- */

if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, { index: false, maxAge: '1h' }))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'))
  })
  logger.info(`Serving built frontend from ${DIST_DIR}`)
} else {
  app.get('/', (_req, res) => {
    res
      .status(200)
      .type('text/plain')
      .send(
        'Portfolio API is running. Start the frontend with `npm run dev:web` (or run `npm run build` to serve the built app from this server).',
      )
  })
}

/* --------------------------- error handling --------------------------- */

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('Unhandled server error', error)
  if (res.headersSent) return
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

app.listen(PORT, () => {
  logger.info(`API listening on http://localhost:${PORT}`)
  logger.info(`Allowed CORS origins: ${allowedOrigins.join(', ') || '(none)'}`)
})
