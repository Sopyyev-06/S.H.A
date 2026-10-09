import type { Directive } from 'vue'
import { vReveal } from './vReveal'

/** Global registration wrapper (see src/main.ts). */
export const reveal: Directive = vReveal

export { vReveal }
