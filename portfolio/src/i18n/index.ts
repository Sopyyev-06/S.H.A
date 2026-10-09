import { createI18n } from 'vue-i18n'
import tk from './tk'

export const i18n = createI18n({
  legacy: false,
  locale: 'tk',
  fallbackLocale: 'tk',
  messages: { tk },
})

export default i18n
