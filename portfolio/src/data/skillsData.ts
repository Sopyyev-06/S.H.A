import type { SkillCategory } from '@/types'

/**
 * ---------------------------------------------------------------------------
 * SKILLS DATA
 * ---------------------------------------------------------------------------
 * Levels use honest, qualitative labels (no invented percentages):
 *   'Learning'    — actively studying / early projects
 *   'Comfortable' — using it regularly in real work
 *   'Experienced' — confident, used across multiple projects
 *
 * `icon` is either a simple-icons slug (e.g. 'vue') or a lucide icon name
 * prefixed with 'lucide:' (e.g. 'lucide:code'). <TechIcon /> resolves both and
 * falls back to a styled initial when an icon is unknown.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Çalt, responsyw we owadan interfeýsler.',
    icon: 'monitor',
    accent: 'blue',
    skills: [
      { name: 'Vue 3', icon: 'vuedotjs', level: 'Experienced' },
      { name: 'React', icon: 'react', level: 'Comfortable' },
      { name: 'TypeScript', icon: 'typescript', level: 'Comfortable' },
      { name: 'Tailwind CSS', icon: 'tailwindcss', level: 'Experienced' },
      { name: 'Nuxt.js', icon: 'nuxtdotjs', level: 'Comfortable' },
      { name: 'HTML5', icon: 'html5', level: 'Experienced' },
      { name: 'CSS3', icon: 'css3', level: 'Experienced' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'API-lar, maglumat modellemek we serwer tarapy logikasy.',
    icon: 'server',
    accent: 'purple',
    skills: [
      { name: 'Node.js', icon: 'nodedotjs', level: 'Comfortable' },
      { name: 'Express.js', icon: 'express', level: 'Comfortable' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    description: 'Ýerli we kross-platforma programma ösüşi.',
    icon: 'smartphone',
    accent: 'cyan',
    skills: [
      { name: 'Kotlin', icon: 'kotlin', level: 'Comfortable' },
      { name: 'React Native', icon: 'react', level: 'Learning' },
    ],
  },
  {
    id: 'tools',
    title: 'Gurallar & DevOps',
    description: 'Koduň daşyndaky iş prosesi: wersiýalama, iberiş, ýerleşdiriş.',
    icon: 'wrench',
    accent: 'indigo',
    skills: [
      { name: 'Git', icon: 'git', level: 'Comfortable' },
      { name: 'GitHub', icon: 'github', level: 'Comfortable' },
      { name: 'Docker', icon: 'docker', level: 'Learning' },
      { name: 'Vercel', icon: 'vercel', level: 'Comfortable' },
    ],
  },
  {
    id: 'languages',
    title: 'Diller',
    description: 'Aragatnaşyk dilleri.',
    icon: 'sparkles',
    accent: 'amber',
    skills: [
      { name: 'Türkmen dili', icon: 'lucide:book-open', level: 'Experienced' },
      { name: 'English', icon: 'lucide:book-open', level: 'Learning' },
    ],
  },
]

/** All technology names used across the site (hero marquee, footer, etc.). */
export const allSkillNames: string[] = skillCategories.flatMap((c) => c.skills.map((s) => s.name))

export const levelOrder = ['Learning', 'Comfortable', 'Experienced'] as const
