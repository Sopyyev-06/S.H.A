<script setup lang="ts">
import { computed } from 'vue'
import { techIcons } from '@/data/techIcons'

const props = withDefaults(
  defineProps<{
    size?: number | string
    title?: string
  }>(),
  { size: 20, title: 'TikTok' },
)

const icon = computed(() => techIcons.tiktok)
const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    v-if="icon"
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    :aria-label="title"
    focusable="false"
  >
    <title>{{ title }}</title>
    <path :d="icon.path" />
  </svg>
</template>
