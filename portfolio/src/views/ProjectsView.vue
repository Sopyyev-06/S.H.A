<script setup lang="ts">
/** Projects index: real filtering over the typed project data. */
import { computed, ref } from 'vue'
import { LayoutGrid, Search, X } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectFilters from '@/components/projects/ProjectFilters.vue'
import { PROJECT_CATEGORIES, projects } from '@/data/projects'
import type { ProjectCategory } from '@/types'

const activeCategory = ref<ProjectCategory | 'All'>('All')
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return projects.filter((project) => {
    const matchesCategory =
      activeCategory.value === 'All' || project.category === activeCategory.value
    if (!matchesCategory) return false
    if (!q) return true
    return (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q))
    )
  })
})

function clearFilters() {
  activeCategory.value = 'All'
  query.value = ''
}
</script>

<template>
  <div class="section-pad">
    <div class="container-page">
      <SectionTitle
        :label="$t('projects.label')"
        :heading="$t('projects.heading')"
        :accent="$t('projects.accent')"
        :description="$t('projects.description')"
        size="xl"
      />

      <!-- Controls -->
      <div
        v-reveal="{ delay: 200 }"
        class="mt-12 flex flex-col gap-5 border-t border-line/60 pt-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <ProjectFilters
          v-model="activeCategory"
          :categories="PROJECT_CATEGORIES"
          :projects="projects"
        />

        <div class="relative w-full lg:w-72">
          <Search
            :size="16"
            class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <label for="project-search" class="sr-only">{{ $t('common.searchProjects') }}</label>
          <input
            id="project-search"
            v-model="query"
            type="search"
            :placeholder="$t('projects.searchPlaceholder')"
            class="field pl-10 pr-10"
          />
          <button
            v-if="query"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-content"
            aria-label="Clear search"
            @click="query = ''"
          >
            <X :size="15" />
          </button>
        </div>
      </div>

      <!-- Result summary -->
      <p class="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted" aria-live="polite">
        {{ $t('projects.showing') }} {{ filtered.length }} {{ $t('projects.of') }} {{ projects.length }}
        <span v-if="activeCategory !== 'All'"> · {{ activeCategory }}</span>
        <span v-if="query"> · “{{ query }}”</span>
      </p>

      <!-- Grid: 3 cols desktop / 2 tablet / 1 mobile -->
      <ul v-if="filtered.length" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(project, index) in filtered"
          :key="project.id"
          v-reveal="{ delay: Math.min(index, 6) * 90 }"
          class="h-full"
        >
          <ProjectCard :project="project" />
        </li>
      </ul>

      <!-- Empty state -->
      <div
        v-else
        v-reveal
        class="glass-card mt-10 flex flex-col items-center gap-4 px-6 py-16 text-center"
      >
        <span
          class="flex h-14 w-14 items-center justify-center rounded-2xl border border-line/70 bg-surface-2/70 text-muted"
        >
          <LayoutGrid :size="24" :stroke-width="1.6" />
        </span>
        <h3 class="text-lg font-semibold">{{ $t('projects.noMatch') }}</h3>
        <p class="max-w-sm text-sm text-muted">
          {{ $t('projects.noMatchDesc') }}
        </p>
        <button type="button" class="btn-outline btn-sm" @click="clearFilters">{{ $t('projects.clearFilters') }}</button>
      </div>
    </div>
  </div>
</template>
