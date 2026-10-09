<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggle() {
  locale.value = locale.value === 'en' ? 'tk' : 'en'
  localStorage.setItem('ns-locale', locale.value)
}
</script>

<template>
  <button
    type="button"
    class="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line/80 bg-surface/70
           px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted backdrop-blur
           transition-colors duration-300 hover:border-primary/60 hover:text-primary"
    :aria-label="locale === 'en' ? 'Türkmen diline geç' : 'Switch to English'"
    @click="toggle"
  >
    {{ locale === 'en' ? 'TK' : 'EN' }}
  </button>
</template>
