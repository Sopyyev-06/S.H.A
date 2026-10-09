import type { Directive } from 'vue'

/**
 * v-reveal — animates an element the first time it enters the viewport.
 *
 * Usage:
 *   <div v-reveal>…</div>
 *   <div v-reveal="{ delay: 120 }">…</div>
 *   <div v-reveal:left="{ delay: 80 }">…</div>   // left | right | scale | fade
 *
 * Respects `prefers-reduced-motion` and never leaves content hidden if
 * IntersectionObserver is unavailable.
 *
 * Exported as `vReveal` so it can also be registered locally in a component
 * that needs it outside the global registration.
 */
export type RevealValue = { delay?: number; threshold?: number }

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, RevealValue | undefined> = {
  mounted(el, binding) {
    const { delay = 0, threshold = 0.12 } = binding.value ?? {}
    const variant = binding.arg ?? 'up'

    el.classList.add('reveal')
    if (variant === 'left') el.classList.add('reveal-left')
    if (variant === 'right') el.classList.add('reveal-right')
    if (variant === 'scale') el.classList.add('reveal-scale')
    if (variant === 'fade') el.classList.add('reveal-fade')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
            observers.delete(el)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    observers.set(el, observer)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}
