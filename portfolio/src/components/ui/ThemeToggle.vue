<script setup lang="ts">
/**
 * Working dark/light theme toggle.
 * The choice is persisted in localStorage and applied before first paint
 * (see the inline script in index.html), so there is no flash.
 */
import { Moon, Sun } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button
    type="button"
    class="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl
           border border-line/80 bg-surface/70 text-muted backdrop-blur transition-all duration-300
           ease-premium hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-glow-sm"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme()"
  >
    <span
      class="absolute inset-0 bg-brand-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-15"
    />
    <Transition
      enter-active-class="transition duration-300 ease-premium"
      enter-from-class="rotate-90 scale-50 opacity-0"
      leave-active-class="absolute transition duration-300 ease-premium"
      leave-to-class="rotate-90 scale-50 opacity-0"
      mode="out-in"
    >
      <Sun v-if="isDark" :key="'sun'" :size="18" :stroke-width="1.9" class="relative" />
      <Moon v-else :key="'moon'" :size="18" :stroke-width="1.9" class="relative" />
    </Transition>
  </button>
</template>
