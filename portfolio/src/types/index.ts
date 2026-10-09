/** Shared domain types for the portfolio. */

export interface SocialLink {
  key: string
  label: string
  url: string
}

export type ProjectCategory =
  | 'Web Apps'
  | 'Full Stack'
  | 'Mobile'
  | 'AI / ML'
  | 'Other'

export interface ArchitectureStep {
  label: string
  detail: string
  icon: string
}

export interface CaseStudySection {
  id: string
  index: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface ProjectFeature {
  title: string
  description: string
  icon: string
}

export interface Project {
  id: string
  slug: string
  title: string
  /** Part of the title rendered in the accent gradient, e.g. "AI". */
  titleAccent?: string
  tagline: string
  description: string
  longDescription?: string
  category: ProjectCategory
  technologies: string[]
  /** Empty string = show the polished placeholder instead of an <img>. */
  image: string
  imageAlt: string
  gallery: string[]
  features?: ProjectFeature[]
  architecture?: ArchitectureStep[]
  caseStudy?: CaseStudySection[]
  /** Repository name — combined with the central GitHub username. */
  repo: string
  liveUrl: string
  featured: boolean
  year: string
  role: string
  status: 'Completed' | 'In progress' | 'Prototype'
  /** Optional accent theme for the case-study page (tailwind-safe class keys). */
  accent?: 'blue' | 'green' | 'purple'
}

export interface Skill {
  name: string
  /** simple-icons slug or lucide icon name — resolved by <TechIcon /> */
  icon: string
  level?: SkillLevel
}

export type SkillLevel = 'Learning' | 'Comfortable' | 'Experienced'

export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: string
  accent: 'blue' | 'purple' | 'cyan' | 'green' | 'indigo' | 'amber'
  skills: Skill[]
}

export interface Stat {
  id: string
  value: string
  label: string
  icon: string
}

export interface ValueCard {
  title: string
  description: string
  icon: string
}

export interface TimelineStep {
  phase: string
  title: string
  description: string
  icon: string
  tags?: string[]
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export interface ApiSuccess<T> {
  success: true
  message: string
  data?: T
}

export interface ApiFailure {
  success: false
  message: string
  errors?: Record<string, string>
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiFailure
