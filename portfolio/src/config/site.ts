/**
 * Central site configuration.
 * ---------------------------------------------------------------------------
 * Change these values once — every component reads from here, so no GitHub /
 * social / email link is ever hardcoded inside a component.
 */
export const siteConfig = {
  name: 'Nepes Sopyyev',
  role: 'Web Işläp Düzüji',
  location: 'Ashgabat, Turkmenistan',
  email: 'nepessopyyev@gmail.com',
  emailSecondary: 'nepessopyyev629@gmail.com',
  phone: '+993 61 46 89 15',
  phoneSecondary: '+993 64 71 61 28',

  /** Used to build every GitHub link in the project. */
  githubUsername: 'Sopyyev-06',

  /** Social platform URLs. */
  instagramUrl: 'https://www.instagram.com/nepes245223',
  tiktokUrl: 'https://www.tiktok.com/@hacker9526',
  whatsappUrl: 'https://wa.me/99364716128',
  imoPhone1: '+99361468915',
  imoPhone2: '+99364716128',

  /** CV file — drop your PDF in `public/cv/` (see public/cv/README on setup). */
  cvUrl: '/cv/Nepes-Sopyyev-CV.pdf',
  cvFileName: 'Nepes-Sopyyev-CV.pdf',
} as const

/** GitHub profile URL, built from the username above. */
export const GITHUB_PROFILE_URL = `https://github.com/${siteConfig.githubUsername}`

/** Build a repository URL from the central GitHub username. */
export function githubRepoUrl(repo: string): string {
  return `https://github.com/${siteConfig.githubUsername}/${repo}`
}

/**
 * True when a config value is still the un-edited placeholder.
 * Catches 'YOUR_…' anywhere in the string, so a URL such as
 * `https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO` is treated as unset.
 */
export function isUnconfigured(value: string | undefined | null): boolean {
  if (!value) return true
  const v = value.trim()
  return v.length === 0 || v === '#' || v.includes('YOUR_')
}

export const navLinks = [
  { key: 'home', name: 'Home', path: '/' },
  { key: 'about', name: 'About', path: '/about' },
  { key: 'projects', name: 'Projects', path: '/projects' },
  { key: 'skills', name: 'Skills', path: '/skills' },
  { key: 'contact', name: 'Contact', path: '/contact' },
] as const

export const socialLinks = [
  { key: 'github', label: 'GitHub', url: GITHUB_PROFILE_URL },
  { key: 'instagram', label: 'Instagram', url: siteConfig.instagramUrl },
  { key: 'tiktok', label: 'TikTok', url: siteConfig.tiktokUrl },
  { key: 'whatsapp', label: 'WhatsApp', url: siteConfig.whatsappUrl },
  { key: 'imo', label: 'IMO', url: `https://imo.im` },
] as const
