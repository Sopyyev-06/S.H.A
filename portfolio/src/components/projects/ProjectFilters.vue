<script setup lang="ts">
/**
 * Working category filter.
 * Counts are derived from the real project list; the active pill is exposed to
 * assistive tech via role="tablist" semantics.
 */
import { computed } from 'vue'
import type { Project, ProjectCategory } from '@/types'

const props = defineProps<{
  modelValue: ProjectCategory | 'All'
  categories: readonly (ProjectCategory | 'All')[]
  projects: Project[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: ProjectCategory | 'All'] }>()

function countFor(category: ProjectCategory | 'All') {
  if (category === 'All') return props.projects.length
  return props.projects.filter((p) => p.category === category).length
}

const withCounts = computed(() =>
  props.categories.map((category) => ({ category, count: countFor(category) })),
)

function select(category: ProjectCategory | 'All') {
  emit('update:modelValue', category)
}
</script>

<template>
  <div
    class="flex flex-wrap items-center gap-2"
    role="tablist"
    aria-label="Filter projects by category"
  >
    <button
      v-for="item in withCounts"
      :key="item.category"
      type="button"
      role="tab"
      :aria-selected="modelValue === item.category"
      :disabled="item.count === 0 && item.category !== 'All'"
      class="group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium
             transition-all duration-300 ease-premium disabled:cursor-not-allowed disabled:opacity-40"
      :class="
        modelValue === item.category
          ? 'border-primary/60 bg-primary/12 text-primary shadow-glow-sm'
          : 'border-line/80 bg-surface/60 text-muted hover:-translate-y-0.5 hover:border-primary/45 hover:text-content'
      "
      @click="select(item.category)"
    >
      {{ item.category === 'All' ? $t('projects.all') : item.category }}
      <span
        class="rounded-md px-1.5 py-0.5 font-mono text-[10px]"
        :class="modelValue === item.category ? 'bg-primary/20 text-primary' : 'bg-surface-2/80 text-muted'"
      >
        {{ item.count }}
      </span>
    </button>
  </div>
</template>
