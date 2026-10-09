import { computed, ref, watch } from 'vue'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'ns-theme'

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  // Dark is the identity of this portfolio, so it is the default regardless of
  // the OS preference. The toggle still persists an explicit user choice.
  return 'dark'
}

/** Module-level state so every component shares one theme. */
const theme = ref<Theme>(readInitialTheme())

function apply(next: Theme) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(next)
  root.style.colorScheme = next
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', next === 'dark' ? '#050812' : '#f8fafc')
}

apply(theme.value)

watch(theme, (next) => {
  apply(next)
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* storage may be unavailable (private mode) — theme still applies for the session */
  }
})

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function setTheme(next: Theme) {
    theme.value = next
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, isDark, setTheme, toggleTheme }
}
