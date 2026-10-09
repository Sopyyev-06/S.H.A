<script setup lang="ts">
/**
 * Renders a real brand icon for a technology.
 * - brand slugs (e.g. 'vuedotjs') resolve against src/data/techIcons.ts
 * - 'lucide:xxx' names resolve against the lucide map
 * - anything unknown falls back to a styled monogram
 */
import { computed } from 'vue'
import { techIcons } from '@/data/techIcons'
import { resolveIcon } from '@/utils/icons'

const props = withDefaults(
  defineProps<{
    /** simple-icons slug or 'lucide:icon-name' */
    icon?: string
    /** Fallback label used for the monogram and the accessible name */
    name: string
    size?: number
    colored?: boolean
  }>(),
  { size: 20, colored: true },
)

const brand = computed(() => {
  const slug = props.icon?.replace(/^lucide:/, '').toLowerCase()
  if (!slug) return undefined
  return techIcons[slug]
})

const isLucide = computed(() => Boolean(props.icon?.startsWith('lucide:')))
const LucideComponent = computed(() => resolveIcon(props.icon))
const monogram = computed(() => props.name.replace(/[^A-Za-z0-9+#]/g, '').slice(0, 2).toUpperCase())

const dimension = computed(() => `${props.size}px`)

/** Brand colour when available; inherits the surrounding text colour otherwise. */
const brandColor = computed(() => {
  if (!brand.value || !props.colored) return undefined
  return `#${brand.value.hex}`
})
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center justify-center"
    :style="{ width: dimension, height: dimension }"
  >
    <svg
      v-if="brand"
      :width="dimension"
      :height="dimension"
      viewBox="0 0 24 24"
      fill="currentColor"
      :style="brandColor ? { color: brandColor } : undefined"
      aria-hidden="true"
      focusable="false"
    >
      <path :d="brand.path" />
    </svg>
    <component
      :is="LucideComponent"
      v-else-if="isLucide"
      :size="size"
      :stroke-width="1.8"
      aria-hidden="true"
    />
    <span
      v-else
      class="font-mono text-[10px] font-semibold leading-none text-primary"
      aria-hidden="true"
    >
      {{ monogram }}
    </span>
    <span class="sr-only">{{ name }}</span>
  </span>
</template>
