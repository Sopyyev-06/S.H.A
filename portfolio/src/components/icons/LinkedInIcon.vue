<script setup lang="ts">
/**
 * Official LinkedIn emblem (simple-icons path, slug-resolved).
 */
import { computed } from 'vue'
import { techIcons } from '@/data/techIcons'

const props = withDefaults(defineProps<{ size?: number | string }>(), { size: 20 })
const linkedin = computed(() => techIcons.linkedin)
const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    v-if="linkedin"
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="LinkedIn"
    focusable="false"
  >
    <title>LinkedIn</title>
    <path :d="linkedin.path" />
  </svg>
  <svg
    v-else
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="LinkedIn"
    focusable="false"
  >
    <title>LinkedIn</title>
    <path
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45z"
    />
  </svg>
</template>
