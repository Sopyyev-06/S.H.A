<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: number | string
    title?: string
  }>(),
  { size: 20, title: 'IMO' },
)

const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    :aria-label="title"
    focusable="false"
  >
    <title>{{ title }}</title>
    <!-- IMO Messenger Style Icon -->
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2.1 21.9a1 1 0 0 0 1.22 1.22l4.83-1.28A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-3.5 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
  </svg>
</template>
