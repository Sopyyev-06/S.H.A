import { ref } from 'vue'
import { onBeforeUnmount, onMounted } from 'vue'

/** Smooth scroll to an element id, respecting reduced-motion preferences. */
export function scrollToId(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

export function scrollToTop() {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

/** Reactive "should the back-to-top button be visible" flag. */
export function useScrollToTopButton(threshold = 700) {
  const visible = ref(false)
  let ticking = false

  function onScroll() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(() => {
      visible.value = window.scrollY > threshold
      ticking = false
    })
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return { visible }
}
