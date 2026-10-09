<script setup lang="ts">
/**
 * Hero: animated intro copy on the left, profile image placeholder on the right.
 * Entrance animation is CSS-driven (staggered `animation-delay`) so it plays
 * immediately on load without waiting for JS observers.
 */
import { ArrowRight, Sparkles } from 'lucide-vue-next'
import ProjectImagePlaceholder from '@/components/ui/ProjectImagePlaceholder.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import TechIcon from '@/components/ui/TechIcon.vue'
import { allSkillNames, skillCategories } from '@/data/skillsData'
import { iconSlugForTech } from '@/data/techIcons'

/** A few headline technologies for the strip under the hero. */
const strip = allSkillNames.slice(0, 12)

const categoryIcon = (name: string) => {
  const cat = skillCategories.find((c) => c.skills.some((s) => s.name === name))
  return cat?.icon
}
</script>

<template>
  <section class="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
    <div class="container-page">
      <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <!-- ---------------- Left: copy ---------------- -->
        <div class="flex flex-col items-start">
          <span class="section-label animate-fade-up" style="animation-delay: 60ms">
            <Sparkles :size="12" />
            {{ $t('hero.label') }}
          </span>

          <h1
            class="animate-fade-up mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[62px]"
            style="animation-delay: 160ms"
          >
            {{ $t('hero.headingStart') }}
            <span class="text-gradient block sm:inline"> {{ $t('hero.headingAccent') }}</span>
          </h1>

          <p
            class="animate-fade-up mt-4 font-mono text-sm uppercase tracking-[0.22em] text-primary/90"
            style="animation-delay: 300ms"
          >
            {{ $t('hero.subtitle') }}
          </p>

          <p
            class="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style="animation-delay: 420ms"
          >
            {{ $t('hero.description') }}
          </p>

          <div
            class="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style="animation-delay: 540ms"
          >
            <RouterLink to="/projects" class="btn-primary group">
              {{ $t('hero.primaryCta') }}
              <ArrowRight
                :size="17"
                class="transition-transform duration-300 group-hover:translate-x-1"
              />
            </RouterLink>
            <RouterLink to="/contact" class="btn-outline">
              {{ $t('hero.secondaryCta') }}
            </RouterLink>
          </div>

          <div class="animate-fade-up mt-9 flex flex-wrap items-center gap-5" style="animation-delay: 660ms">
            <SocialLinks size="md" />
            <span class="hidden h-8 w-px bg-line/80 sm:block" />
            <RouterLink
              to="/contact"
              class="text-sm text-muted underline decoration-line decoration-dotted underline-offset-4
                     transition-colors duration-300 hover:text-primary hover:decoration-primary"
            >
              {{ $t('hero.available') }}
            </RouterLink>
          </div>
        </div>

        <!-- ---------------- Right: profile image placeholder ---------------- -->
        <div class="animate-fade-right relative mx-auto w-full max-w-[440px]" style="animation-delay: 260ms">
          <!-- animated glow behind the portrait -->
          <div
            class="animate-pulse-glow absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-3xl"
            aria-hidden="true"
          />

          <div class="relative">
            <ProjectImagePlaceholder
              src="/Screenshot 2026-10-09 004124.png"
              alt="Nepes Sopyyev"
              label="Nepes Sopyyev"
              aspect="aspect-[4/5]"
              rounded="rounded-[2rem]"
              fit="cover"
              loading="eager"
              hover-zoom
              :icon-size="34"
              class="animate-float-slow shadow-card ring-1 ring-primary/25"
            />

            <!-- Floating status card -->
            <div
              class="glass-card absolute -bottom-5 left-1/2 flex w-[86%] -translate-x-1/2 items-center gap-3
                     px-4 py-3 shadow-card sm:left-auto sm:right-[-18px] sm:w-auto sm:translate-x-0"
            >
              <span class="relative flex h-2.5 w-2.5">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span class="text-xs font-medium text-content">{{ $t('common.openToOpportunities') }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------- Tech strip ---------------- -->
      <div
        class="animate-fade-up mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/60 pt-7"
        style="animation-delay: 780ms"
      >
        <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{{ $t('hero.workingWith') }}</span>
        <ul class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <li
            v-for="name in strip"
            :key="name"
            class="group flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-content"
          >
            <TechIcon
              :icon="iconSlugForTech(name) ?? categoryIcon(name)"
              :name="name"
              :size="16"
              class="opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            />
            {{ name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
