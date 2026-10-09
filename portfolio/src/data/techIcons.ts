import { brandIcons, type BrandIcon } from './brandIcons.generated'

export type { BrandIcon }

/** slug → official brand glyph (see scripts/generate-tech-icons.mjs) */
export const techIcons: Record<string, BrandIcon> = brandIcons

/** Display name (as written in skillsData.ts) → simple-icons slug. */
const NAME_TO_SLUG: Record<string, string> = {
  'Vue 3': 'vuedotjs',
  Vue: 'vuedotjs',
  Nuxt: 'nuxtdotjs',
  'Nuxt.js': 'nuxtdotjs',
  'Nuxt.ts': 'nuxtdotjs',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  'Tailwind CSS': 'tailwindcss',
  HTML5: 'html5',
  CSS3: 'css3',
  'Node.js': 'nodedotjs',
  'Express.js': 'express',
  Express: 'express',
  Python: 'python',
  Prisma: 'prisma',
  Kotlin: 'kotlin',
  'Jetpack Compose': 'jetpackcompose',
  'React Native': 'react',
  React: 'react',
  instagram: 'instagram',
  tiktok: 'tiktok',
  whatsapp: 'whatsapp',
  SQLite: 'sqlite',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  Git: 'git',
  GitHub: 'github',
  Docker: 'docker',
  Vercel: 'vercel',
  Linux: 'linux',
  Figma: 'figma',
  Unity: 'unity',
  'C#': 'csharp',
  OpenCV: 'opencv',
  Flask: 'flask',
  'AI / RAG': 'openai',
  '2D': 'unity',
}

export function iconSlugForTech(name: string): string | undefined {
  return NAME_TO_SLUG[name]
}

export function hasBrandIcon(slug: string): boolean {
  return Boolean(brandIcons[slug])
}
