<script setup lang="ts">
/**
 * Full project card used on /projects.
 * Image zoom on hover, card lift, border glow, GitHub icon lifts, arrow slides.
 */
import { ArrowRight, ArrowUpRight, Info } from 'lucide-vue-next'
import ProjectImagePlaceholder from '@/components/ui/ProjectImagePlaceholder.vue'
import TechBadge from '@/components/ui/TechBadge.vue'
import GitHubButton from '@/components/ui/GitHubButton.vue'
import { isUnconfigured } from '@/config/site'
import type { Project } from '@/types'

const props = defineProps<{ project: Project }>()

const liveConfigured = () => !isUnconfigured(props.project.liveUrl)
</script>

<template>
  <article
    class="glass-card card-hover group flex h-full flex-col overflow-hidden"
    :aria-labelledby="`project-${project.slug}`"
  >
    <!-- Media -->
    <div class="relative overflow-hidden p-3">
      <ProjectImagePlaceholder
        :src="project.image"
        :alt="project.imageAlt"
        :label="`Place ${project.title} screenshot here`"
        aspect="aspect-[16/10]"
        rounded="rounded-2xl"
        hover-zoom
      >
        <!-- PROJECT IMAGE PLACEHOLDER -->
      </ProjectImagePlaceholder>

      <div class="absolute left-5 top-5 flex flex-wrap gap-2">
        <span
          class="rounded-lg border border-line/70 bg-bg/80 px-2.5 py-1 font-mono text-[10px]
                 uppercase tracking-[0.14em] text-primary backdrop-blur"
        >
          {{ project.category }}
        </span>
        <span
          class="rounded-lg border border-line/70 bg-bg/80 px-2.5 py-1 font-mono text-[10px]
                 uppercase tracking-[0.14em] text-muted backdrop-blur"
        >
          {{ project.year }}
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col p-5 pt-2 sm:p-6 sm:pt-3">
      <div class="flex items-start justify-between gap-3">
        <h3
          :id="`project-${project.slug}`"
          class="text-lg font-semibold tracking-tight text-content transition-colors duration-300 group-hover:text-primary"
        >
          {{ project.title }}
        </h3>
        <span
          class="shrink-0 rounded-md border border-line/70 px-2 py-0.5 font-mono text-[10px] text-muted"
        >
          {{ project.status }}
        </span>
      </div>

      <p class="mt-2.5 text-sm leading-relaxed text-muted">{{ project.description }}</p>

      <ul class="mt-4 flex flex-wrap gap-1.5">
        <li v-for="tech in project.technologies" :key="tech">
          <TechBadge :name="tech" />
        </li>
      </ul>

      <!-- Actions -->
      <div class="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <!-- Live Demo -->
        <a
          v-if="liveConfigured()"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary btn-sm"
          aria-label="Open live demo in a new tab"
        >
          {{ $t('projects.liveDemo') }}
          <ArrowUpRight :size="14" />
        </a>
        <button
          v-else
          type="button"
          disabled
          class="btn-primary btn-sm"
        >
          {{ $t('projects.liveDemo') }}
          <ArrowUpRight :size="14" />
        </button>

        <!-- GitHub -->
        <GitHubButton :repo="project.repo" label="GitHub" variant="outline" size="sm" />

        <!-- Details -->
        <RouterLink
          :to="`/projects/${project.slug}`"
          class="btn-ghost btn-sm ml-auto group/details"
          :aria-label="`View details of ${project.title}`"
        >
          <Info :size="14" />
          {{ $t('projects.viewDetails') }}
          <ArrowRight
            :size="14"
            class="transition-transform duration-300 group-hover/details:translate-x-1"
          />
        </RouterLink>
      </div>
    </div>
  </article>
</template>
