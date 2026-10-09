<script setup lang="ts">
/** Staggered feature cards for a project case study. */
import { resolveIcon } from '@/utils/icons'
import type { ProjectFeature } from '@/types'

defineProps<{ features: ProjectFeature[]; accent?: 'blue' | 'green' | 'purple' }>()

const accentRing: Record<string, string> = {
  blue: 'group-hover:border-primary/60 group-hover:shadow-glow-sm',
  green: 'group-hover:border-emerald-400/60 group-hover:shadow-[0_12px_44px_-18px_rgb(16_185_129/0.7)]',
  purple: 'group-hover:border-accent/60 group-hover:shadow-glow-accent',
}
const accentText: Record<string, string> = {
  blue: 'text-primary',
  green: 'text-emerald-400',
  purple: 'text-accent',
}
</script>

<template>
  <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="(feature, index) in features"
      :key="feature.title"
      v-reveal="{ delay: index * 90 }"
      class="glass-card group p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5"
      :class="accentRing[accent ?? 'blue']"
    >
      <span
        class="flex h-12 w-12 items-center justify-center rounded-xl border border-line/70 bg-surface-2/80 transition-transform duration-500 group-hover:scale-105"
        :class="accentText[accent ?? 'blue']"
      >
        <component :is="resolveIcon(feature.icon)" :size="21" :stroke-width="1.7" />
      </span>
      <h3 class="mt-5 text-base font-semibold tracking-tight text-content">{{ feature.title }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-muted">{{ feature.description }}</p>
    </li>
  </ul>
</template>
