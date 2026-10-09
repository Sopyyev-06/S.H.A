#!/usr/bin/env node
/**
 * Generates src/data/brandIcons.generated.ts from the `simple-icons` package.
 * ---------------------------------------------------------------------------
 * Instead of guessing export names (siVuedotjs, siNodedotjs, …) we iterate the
 * package exports and match on each icon's own `slug` field, then emit only the
 * icons this project actually uses. Run with:  npm run icons:generate
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_FILE = path.resolve(__dirname, '..', 'src', 'data', 'brandIcons.generated.ts')

/** Every brand slug referenced anywhere in the project. */
const REQUIRED_SLUGS = [
  // socials
  'github',
  'linkedin',
  'telegram',
  'instagram',
  'tiktok',
  'whatsapp',
  // frontend
  'vuedotjs',
  'nuxtdotjs',
  'typescript',
  'javascript',
  'tailwindcss',
  'html5',
  'css3',
  // backend
  'nodedotjs',
  'express',
  'python',
  'prisma',
  'flask',
  // mobile
  'kotlin',
  'jetpackcompose',
  'react',
  // database
  'sqlite',
  'postgresql',
  'mysql',
  // tools
  'git',
  'docker',
  'vercel',
  'linux',
  'figma',
  // game / misc
  'unity',
  'csharp',
  'opencv',
  'openai',
]

async function main() {
  let mod
  try {
    mod = await import('simple-icons')
  } catch (error) {
    console.error('[icons] Could not import "simple-icons". Run `npm install` first.')
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
    return
  }

  /** Build slug → icon by inspecting every export (version-proof). */
  const bySlug = new Map()
  for (const value of Object.values(mod)) {
    if (
      value &&
      typeof value === 'object' &&
      typeof value.slug === 'string' &&
      typeof value.path === 'string' &&
      typeof value.title === 'string'
    ) {
      bySlug.set(value.slug, value)
    }
  }

  const found = []
  const missing = []
  for (const slug of REQUIRED_SLUGS) {
    const icon = bySlug.get(slug)
    if (icon) found.push({ slug, title: icon.title, path: icon.path, hex: icon.hex })
    else missing.push(slug)
  }

  const body = found
    .map(
      (icon) =>
        `  ${JSON.stringify(icon.slug)}: {\n` +
        `    title: ${JSON.stringify(icon.title)},\n` +
        `    path: ${JSON.stringify(icon.path)},\n` +
        `    hex: ${JSON.stringify(icon.hex)},\n` +
        `  },`,
    )
    .join('\n')

  const output = `/**
 * Brand icon paths — GENERATED FILE, DO NOT EDIT BY HAND.
 * Regenerate with: npm run icons:generate
 *
 * Source: simple-icons (${found.length} of ${REQUIRED_SLUGS.length} requested icons resolved)
 * Missing: ${missing.length ? missing.join(', ') : 'none'}
 */
export interface BrandIcon {
  title: string
  path: string
  hex: string
}

export const brandIcons: Record<string, BrandIcon> = {
${body}
}
`

  await mkdir(path.dirname(OUT_FILE), { recursive: true })
  await writeFile(OUT_FILE, output, 'utf8')

  console.log(`[icons] Wrote ${found.length} brand icons to src/data/brandIcons.generated.ts`)
  if (missing.length) {
    console.warn(`[icons] Not found in simple-icons (skipped): ${missing.join(', ')}`)
  }
}

main()
