import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks whether the page has been scrolled past a threshold.
 * Used for the sticky navbar's glass/shadow state.
 */
export function useScrolled(threshold = 12) {
  const scrolled = ref(false)
  let ticking = false

  function onScroll() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(() => {
      scrolled.value = window.scrollY > threshold
      ticking = false
    })
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return { scrolled }
}
