import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Locks body scroll (used while the mobile navigation drawer is open)
 * and closes a UI layer on Escape.
 */
export function useBodyScrollLock(active: () => boolean, onEscape?: () => void) {
  const isLocked = ref(false)

  function lock() {
    if (typeof document === 'undefined') return
    document.body.style.overflow = 'hidden'
    isLocked.value = true
  }

  function unlock() {
    if (typeof document === 'undefined') return
    document.body.style.overflow = ''
    isLocked.value = false
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && active()) {
      unlock()
      onEscape?.()
    }
  }

  onMounted(() => document.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
    unlock()
  })

  return { lock, unlock, isLocked }
}
