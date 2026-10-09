<script setup lang="ts">
/**
 * Compact project card used on the home page ("Featured Projects" preview).
 * Full card with filters lives in components/projects/ProjectCard.vue.
 */
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import ProjectImagePlaceholder from '@/components/ui/ProjectImagePlaceholder.vue'
import TechBadge from '@/components/ui/TechBadge.vue'
import GitHubButton from '@/components/ui/GitHubButton.vue'
import { isUnconfigured } from '@/config/site'
import type { Project } from '@/types'

const props = defineProps<{ project: Project; index?: number }>()

const liveConfigured = () => !isUnconfigured(props.project.liveUrl)
</script>

<template>
  <article class="glass-card card-hover group flex h-full flex-col overflow-hidden">
    <!-- Image / placeholder -->
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

      <span
        class="absolute left-5 top-5 rounded-lg border border-line/70 bg-bg/80 px-2.5 py-1 font-mono
               text-[10px] uppercase tracking-[0.14em] text-primary backdrop-blur"
      >
        {{ project.category }}
      </span>
    </div>

    <!-- Body -->
    <div class="flex flex-1 flex-col p-5 pt-2 sm:p-6 sm:pt-3">
      <h3 class="text-lg font-semibold tracking-tight text-content transition-colors duration-300 group-hover:text-primary">
        {{ project.title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-muted">{{ project.description }}</p>

      <ul class="mt-4 flex flex-wrap gap-1.5">
        <li v-for="tech in project.technologies.slice(0, 4)" :key="tech">
          <TechBadge :name="tech" />
        </li>
        <li v-if="project.technologies.length > 4">
          <span class="chip">+{{ project.technologies.length - 4 }}</span>
        </li>
      </ul>

      <div class="mt-6 flex flex-wrap items-center gap-2 pt-1">
        <RouterLink
          :to="`/projects/${project.slug}`"
          class="btn-primary btn-sm group/cta"
        >
          {{ $t('projects.viewProject') }}
          <ArrowRight :size="15" class="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </RouterLink>

        <a
          v-if="liveConfigured()"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline btn-sm"
          aria-label="Open live demo in a new tab"
        >
          {{ $t('projects.live') }}
          <ArrowUpRight :size="14" />
        </a>
        <button
          v-else
          type="button"
          disabled
          class="btn-outline btn-sm"
        >
          {{ $t('projects.live') }}
          <ArrowUpRight :size="14" />
        </button>

        <GitHubButton :repo="project.repo" :label="$t('projects.code')" variant="ghost" size="sm" />
      </div>
    </div>
  </article>
</template>
