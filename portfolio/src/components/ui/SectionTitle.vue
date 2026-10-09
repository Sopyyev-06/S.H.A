<script setup lang="ts">
/**
 * Section eyebrow + heading + optional description, revealed on scroll.
 * Reusable across every page so headings stay consistent.
 */
import { computed } from 'vue'
import { vReveal } from '@/directives/vReveal'

const props = withDefaults(
  defineProps<{
    label?: string
    heading: string
    /** Part of the heading rendered in the accent gradient. */
    accent?: string
    description?: string
    align?: 'left' | 'center'
    as?: 'h1' | 'h2' | 'h3'
    size?: 'lg' | 'xl'
  }>(),
  { align: 'left', as: 'h2', size: 'lg' },
)

/** Split the heading so the accent word can be gradient-coloured. */
const parts = computed(() => {
  if (!props.accent) return { before: props.heading, accent: '' }
  const index = props.heading.indexOf(props.accent)
  if (index === -1) return { before: props.heading, accent: '' }
  return {
    before: props.heading.slice(0, index),
    accent: props.accent,
  }
})

const alignment = computed(() =>
  props.align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left',
)

const headingSize = computed(() =>
  props.size === 'xl'
    ? 'text-4xl sm:text-5xl lg:text-6xl'
    : 'text-3xl sm:text-4xl lg:text-5xl',
)
</script>

<template>
  <div class="flex flex-col gap-4" :class="alignment">
    <span v-if="label" v-reveal="{ delay: 40 }" class="section-label">
      <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm" />
      {{ label }}
    </span>

    <component
      :is="as"
      v-reveal="{ delay: 90 }"
      class="max-w-3xl font-semibold leading-[1.1] tracking-tight"
      :class="headingSize"
    >
      {{ parts.before }}<span v-if="parts.accent" class="text-gradient">{{ parts.accent }}</span>
    </component>

    <p
      v-if="description"
      v-reveal="{ delay: 150 }"
      class="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
    >
      {{ description }}
    </p>
  </div>
</template>
