<script setup lang="ts">
/** Small technology badge with a real brand icon. */
import TechIcon from './TechIcon.vue'
import { iconSlugForTech } from '@/data/techIcons'

withDefaults(
  defineProps<{
    name: string
    interactive?: boolean
    size?: 'sm' | 'md'
  }>(),
  { interactive: true, size: 'sm' },
)
</script>

<template>
  <span
    class="chip"
    :class="[
      interactive && 'chip-hover',
      size === 'md' && 'px-3 py-1.5 text-xs',
      'group/chip',
    ]"
  >
    <TechIcon
      :icon="iconSlugForTech(name)"
      :name="name"
      :size="size === 'md' ? 15 : 13"
      class="opacity-80 transition-opacity duration-300 group-hover/chip:opacity-100"
    />
    {{ name }}
  </span>
</template>
