<script setup lang="ts">
/**
 * Home / landing page — composes the reusable sections.
 * Nothing is hardcoded here: content comes from src/data/*.
 */
import { ArrowRight } from 'lucide-vue-next'
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import ProjectPreviewCard from '@/components/home/ProjectPreviewCard.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import { featuredProjects } from '@/data/projects'

const preview = featuredProjects.slice(0, 3)
</script>

<template>
  <div>
    <HeroSection />

    <StatsSection />

    <!-- Featured projects preview -->
    <section class="section-pad pt-0">
      <div class="container-page">
        <div class="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div class="flex flex-col gap-4">
            <span v-reveal class="section-label w-fit">
              <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm" />
              {{ $t('featuredProjects.label') }}
            </span>
            <h2 v-reveal="{ delay: 80 }" class="text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {{ $t('featuredProjects.heading') }} <span class="text-gradient">{{ $t('featuredProjects.headingAccent') }}</span>
            </h2>
            <p v-reveal="{ delay: 140 }" class="max-w-2xl text-base leading-relaxed text-muted">
              {{ $t('featuredProjects.description') }}
            </p>
          </div>

          <RouterLink v-reveal="{ delay: 180 }" to="/projects" class="btn-outline group w-fit shrink-0">
            {{ $t('featuredProjects.viewAll') }}
            <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
          </RouterLink>
        </div>

        <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(project, index) in preview"
            :key="project.id"
            v-reveal="{ delay: index * 120 }"
            class="h-full"
          >
            <ProjectPreviewCard :project="project" :index="index" />
          </li>
        </ul>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
