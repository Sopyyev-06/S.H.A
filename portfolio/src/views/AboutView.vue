<script setup lang="ts">
/** About page — content comes from src/data/content.ts. */
import { Check, Download, MapPin, Sparkles } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectImagePlaceholder from '@/components/ui/ProjectImagePlaceholder.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import DownloadCvButton from '@/components/ui/DownloadCvButton.vue'
import { resolveIcon } from '@/utils/icons'
import { journey } from '@/data/content'
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="relative overflow-hidden pb-12 pt-12 sm:pt-16">
      <div class="container-page">
        <div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div class="animate-fade-up">
            <span class="section-label">
              <Sparkles :size="12" />
              {{ $t('about.label') }}
            </span>

            <h1 class="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              {{ $t('about.heading') }}
            </h1>

            <p class="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {{ $t('about.intro') }}
            </p>
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {{ $t('about.second') }}
            </p>

            <!-- Facts -->
            <dl class="mt-8 grid gap-3 sm:grid-cols-2">
              <div class="rounded-xl border border-line/70 bg-surface/60 px-4 py-3 backdrop-blur">
                <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('about.facts.location') }}</dt>
                <dd class="mt-1 text-sm font-medium text-content">{{ $t('about.facts.locationValue') }}</dd>
              </div>
              <div class="rounded-xl border border-line/70 bg-surface/60 px-4 py-3 backdrop-blur">
                <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('about.facts.focus') }}</dt>
                <dd class="mt-1 text-sm font-medium text-content">{{ $t('about.facts.focusValue') }}</dd>
              </div>
              <div class="rounded-xl border border-line/70 bg-surface/60 px-4 py-3 backdrop-blur">
                <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('about.facts.currently') }}</dt>
                <dd class="mt-1 text-sm font-medium text-content">{{ $t('about.facts.currentlyValue') }}</dd>
              </div>
              <div class="rounded-xl border border-line/70 bg-surface/60 px-4 py-3 backdrop-blur">
                <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('about.facts.openTo') }}</dt>
                <dd class="mt-1 text-sm font-medium text-content">{{ $t('about.facts.openToValue') }}</dd>
              </div>
            </dl>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <DownloadCvButton />
              <RouterLink to="/contact" class="btn-outline">{{ $t('about.getInTouch') }}</RouterLink>
            </div>

            <div class="mt-8">
              <SocialLinks size="md" />
            </div>
          </div>

          <!-- Profile image -->
          <div class="animate-fade-right relative mx-auto w-full max-w-[440px]" style="animation-delay: 200ms">
            <div
              class="animate-pulse-glow absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-3xl"
              aria-hidden="true"
            />
            <ProjectImagePlaceholder
              src="/Screenshot 2026-10-09 004124.png"
              alt="Nepes Sopyyev"
              label="Nepes Sopyyev"
              aspect="aspect-square"
              rounded="rounded-[2rem]"
              fit="cover"
              loading="eager"
              hover-zoom
              :icon-size="34"
              class="animate-float-slow relative shadow-card ring-1 ring-primary/25"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ VALUES ============ -->
    <section class="section-pad pt-8">
      <div class="container-page">
        <SectionTitle
          :label="$t('about.valuesLabel')"
          :heading="$t('about.valuesHeading')"
          :accent="$t('about.valuesAccent')"
          :description="$t('about.valuesDescription')"
        />

        <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-reveal="{ delay: 0 }"
            class="glass-card card-hover group p-6"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-surface-2/80 text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-glow-sm"
            >
              <component :is="resolveIcon('lightbulb')" :size="21" :stroke-width="1.7" />
            </span>
            <h3 class="mt-5 text-base font-semibold tracking-tight">{{ $t('about.values.problemSolving') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ $t('about.values.problemSolvingDesc') }}</p>
          </li>
          <li
            v-reveal="{ delay: 90 }"
            class="glass-card card-hover group p-6"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-surface-2/80 text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-glow-sm"
            >
              <component :is="resolveIcon('users')" :size="21" :stroke-width="1.7" />
            </span>
            <h3 class="mt-5 text-base font-semibold tracking-tight">{{ $t('about.values.teamPlayer') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ $t('about.values.teamPlayerDesc') }}</p>
          </li>
          <li
            v-reveal="{ delay: 180 }"
            class="glass-card card-hover group p-6"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-surface-2/80 text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-glow-sm"
            >
              <component :is="resolveIcon('graduation-cap')" :size="21" :stroke-width="1.7" />
            </span>
            <h3 class="mt-5 text-base font-semibold tracking-tight">{{ $t('about.values.continuousLearning') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ $t('about.values.continuousLearningDesc') }}</p>
          </li>
          <li
            v-reveal="{ delay: 270 }"
            class="glass-card card-hover group p-6"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-surface-2/80 text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-glow-sm"
            >
              <component :is="resolveIcon('target')" :size="21" :stroke-width="1.7" />
            </span>
            <h3 class="mt-5 text-base font-semibold tracking-tight">{{ $t('about.values.goalOriented') }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ $t('about.values.goalOrientedDesc') }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ JOURNEY TIMELINE ============ -->
    <section class="section-pad pt-0">
      <div class="container-page">
        <SectionTitle
          :label="$t('about.journeyLabel')"
          :heading="$t('about.journeyHeading')"
          :accent="$t('about.journeyAccent')"
          :description="$t('about.journeyDescription')"
        />

        <div class="relative mt-12">
          <!-- animated rail -->
          <span
            class="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary via-accent/60 to-transparent sm:block"
            aria-hidden="true"
          />

          <ol class="flex flex-col gap-6">
            <li
              v-for="(step, index) in journey"
              :key="step.title"
              v-reveal="{ delay: index * 90 }"
              class="relative sm:pl-16"
            >
              <span
                class="absolute left-0 top-5 hidden h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-surface text-primary shadow-glow-sm sm:flex"
                aria-hidden="true"
              >
                <component :is="resolveIcon(step.icon)" :size="18" :stroke-width="1.8" />
              </span>

              <div class="glass-card card-hover group p-6">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {{ $t(`about.journey.step0${index + 1}`) || step.phase }}
                  </span>
                  <span class="h-1 w-1 rounded-full bg-line" aria-hidden="true" />
                  <h3 class="text-lg font-semibold tracking-tight">
                    {{ $t(`about.journey.step0${index + 1}Title`) || step.title }}
                  </h3>
                </div>
                <p class="mt-2.5 text-sm leading-relaxed text-muted">
                  {{ $t(`about.journey.step0${index + 1}Desc`) || step.description }}
                </p>
                <ul v-if="step.tags?.length" class="mt-4 flex flex-wrap gap-1.5">
                  <li v-for="tag in step.tags" :key="tag">
                    <span class="chip chip-hover">
                      <Check :size="12" />
                      {{ tag }}
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============ CV / LOCATION CTA ============ -->
    <section class="pb-4">
      <div class="container-page">
        <div
          v-reveal:scale
          class="glass-card flex flex-col items-center gap-5 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left"
        >
          <div class="flex flex-col gap-2">
            <span class="inline-flex items-center justify-center gap-2 text-sm text-muted sm:justify-start">
              <MapPin :size="15" />
              {{ $t('about.facts.locationValue') }}
            </span>
            <p class="text-lg font-semibold">{{ $t('about.cvCta') }}</p>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <DownloadCvButton />
            <RouterLink to="/projects" class="btn-ghost">
              <Download :size="16" class="rotate-180" />
              {{ $t('about.seeProjects') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
