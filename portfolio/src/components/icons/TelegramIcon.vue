<script setup lang="ts">
/**
 * Official Telegram emblem (simple-icons path, slug-resolved).
 */
import { computed } from 'vue'
import { techIcons } from '@/data/techIcons'

const props = withDefaults(defineProps<{ size?: number | string }>(), { size: 20 })
const telegram = computed(() => techIcons.telegram)
const dimension = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
  <svg
    v-if="telegram"
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="Telegram"
    focusable="false"
  >
    <title>Telegram</title>
    <path :d="telegram.path" />
  </svg>
  <svg
    v-else
    :width="dimension"
    :height="dimension"
    viewBox="0 0 24 24"
    fill="currentColor"
    role="img"
    aria-label="Telegram"
    focusable="false"
  >
    <title>Telegram</title>
    <path
      d="M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.34-4.79 8.72-7.88c.38-.34-.08-.52-.58-.19L6.99 13.1l-4.65-1.45c-1.01-.32-1.03-1.01.21-1.5l18.15-7c.84-.31 1.58.2 1.24 1.45z"
    />
  </svg>
</template>
