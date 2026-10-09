import { ref } from 'vue'
import { siteConfig } from '@/config/site'

/**
 * Checks once (module-level cache) whether the CV file actually exists, so the
 * "Download CV" button can degrade gracefully instead of linking to a 404.
 */
const checked = ref(false)
const available = ref(false)
const checkedUrl = ref('')

export function useCvAvailability() {
  async function check() {
    if (checked.value && checkedUrl.value === siteConfig.cvUrl) return
    checkedUrl.value = siteConfig.cvUrl
    try {
      const response = await fetch(siteConfig.cvUrl, { method: 'HEAD' })
      available.value = response.ok
    } catch {
      available.value = false
    } finally {
      checked.value = true
    }
  }

  return { available, checked, check, cvUrl: siteConfig.cvUrl, fileName: siteConfig.cvFileName }
}
