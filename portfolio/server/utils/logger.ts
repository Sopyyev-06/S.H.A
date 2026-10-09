/** Tiny structured logger — keeps server output readable and greppable. */
type Level = 'info' | 'warn' | 'error'

function stamp(): string {
  return new Date().toISOString()
}

function emit(level: Level, message: string, meta?: unknown) {
  const line = `[${stamp()}] ${level.toUpperCase()} ${message}`
  if (meta === undefined) {
    console[level](line)
    return
  }
  console[level](line, meta)
}

export const logger = {
  info: (message: string, meta?: unknown) => emit('info', message, meta),
  warn: (message: string, meta?: unknown) => emit('warn', message, meta),
  error: (message: string, meta?: unknown) => emit('error', message, meta),
}
