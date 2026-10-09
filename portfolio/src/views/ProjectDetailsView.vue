<script setup lang="ts">
/**
 * Project case-study page (portfolio presentation of the project — not the app).
 * All copy, features, gallery and architecture come from the project data, so
 * the same view serves every /projects/:slug route.
 */
import { computed } from 'vue'
import { ArrowLeft, ArrowRight, Calendar, Info, User } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProjectImagePlaceholder from '@/components/ui/ProjectImagePlaceholder.vue'
import TechBadge from '@/components/ui/TechBadge.vue'
import GitHubButton from '@/components/ui/GitHubButton.vue'
import FeatureGrid from '@/components/projects/FeatureGrid.vue'
import ProjectGallery from '@/components/projects/ProjectGallery.vue'
import ArchitectureFlow from '@/components/projects/ArchitectureFlow.vue'
import CaseStudyTimeline from '@/components/projects/CaseStudyTimeline.vue'
import CtaSection from '@/components/sections/CtaSection.vue'
import { getAdjacentProjects, getProjectBySlug } from '@/data/projects'
import { isUnconfigured } from '@/config/site'

const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectBySlug(props.slug))
const neighbours = computed(() => getAdjacentProjects(props.slug))

/** Split the title so the accent fragment gets the gradient treatment. */
const titleParts = computed(() => {
  const p = project.value
  if (!p) return { before: '', accent: '' }
  if (!p.titleAccent) return { before: p.title, accent: '' }
  const index = p.title.indexOf(p.titleAccent)
  if (index === -1) return { before: p.title, accent: '' }
  return { before: p.title.slice(0, index), accent: p.title.slice(index) }
})

const liveConfigured = computed(() => Boolean(project.value) && !isUnconfigured(project.value!.liveUrl))

const accentBadge = computed(() => (project.value?.accent === 'green' ? 'text-emerald-400' : 'text-primary'))
const heroGlow = computed(() =>
  project.value?.accent === 'green'
    ? 'radial-gradient(60% 60% at 20% 0%, rgb(16 185 129 / 0.28), transparent 65%), radial-gradient(60% 60% at 100% 20%, rgb(var(--c-primary) / 0.26), transparent 65%)'
    : 'radial-gradient(60% 60% at 20% 0%, rgb(var(--c-primary) / 0.3), transparent 65%), radial-gradient(60% 60% at 100% 20%, rgb(var(--c-accent) / 0.26), transparent 65%)',
)
</script>

<template>
  <div v-if="project">
    <!-- ============ HERO ============ -->
    <section class="relative overflow-hidden pb-14 pt-12 sm:pt-16">
      <div class="pointer-events-none absolute inset-0 -z-10" :style="{ background: heroGlow }" aria-hidden="true" />

      <div class="container-page">
        <RouterLink
          to="/projects"
          class="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-primary"
        >
          <ArrowLeft :size="16" class="transition-transform duration-300 group-hover:-translate-x-1" />
          {{ $t('projects.backToProjects') }}
        </RouterLink>

        <div class="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <!-- Copy -->
          <div class="animate-fade-up">
            <span class="section-label">
              <span class="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-sm" />
              {{ $t('projects.featuredProject') }}
            </span>

            <h1 class="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[58px]">
              {{ titleParts.before }}
              <span v-if="titleParts.accent" :class="project.accent === 'green' ? 'text-gradient-green' : 'text-gradient'">
                {{ titleParts.accent }}
              </span>
            </h1>

            <p class="mt-5 text-lg leading-relaxed text-content/90">{{ project.tagline }}</p>

            <p class="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {{ project.longDescription || project.description }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-2.5">
              <span
                class="inline-flex items-center gap-2 rounded-xl border border-line/80 bg-surface/70 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] backdrop-blur"
                :class="accentBadge"
              >
                <Info :size="13" />
                {{ project.category }}
              </span>
              <span class="chip chip-hover">
                <Calendar :size="13" /> {{ project.year }}
              </span>
              <span class="chip chip-hover">
                <User :size="13" /> {{ project.role }}
              </span>
              <span class="chip">{{ project.status }}</span>
            </div>

            <!-- Buttons -->
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <a
                v-if="liveConfigured"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary group"
              >
                {{ $t('projects.liveDemo') }}
                <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                v-else
                type="button"
                disabled
                class="btn-primary"
              >
                {{ $t('projects.liveDemo') }}
                <ArrowRight :size="16" />
              </button>

              <GitHubButton :repo="project.repo" label="GitHub" variant="outline" />

              <a href="#case-study" class="btn-ghost">{{ $t('projects.viewCaseStudy') }}</a>
            </div>

            <!-- Tech badges -->
            <ul class="mt-8 flex flex-wrap gap-2">
              <li v-for="tech in project.technologies" :key="tech">
                <TechBadge :name="tech" size="md" />
              </li>
            </ul>
          </div>

          <!-- Main showcase -->
          <div class="animate-fade-right relative" style="animation-delay: 160ms">
            <div
              class="animate-pulse-glow absolute -inset-5 rounded-[2.5rem] opacity-30 blur-3xl"
              :style="{
                background:
                  project.accent === 'green'
                    ? 'linear-gradient(120deg,#3b82f6,#10b981)'
                    : 'linear-gradient(120deg,#3b82f6,#a855f7)',
              }"
              aria-hidden="true"
            />
            <div class="glass-card relative p-3 shadow-card">
              <ProjectImagePlaceholder
                :src="project.image"
                :alt="project.imageAlt"
                :label="`${project.title.toUpperCase()}`"
                hint="Project visual showcase"
                aspect="aspect-[16/11]"
                rounded="rounded-2xl"
                fit="cover"
                loading="eager"
              >
              </ProjectImagePlaceholder>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ KEY FEATURES ============ -->
    <section v-if="project.features?.length" class="section-pad pt-8">
      <div class="container-page">
        <SectionTitle
          :label="$t('projects.keyFeatures')"
          :heading="$t('projects.whatPlatformDoes')"
          accent="platform"
          description="Key features solving concrete real-world needs."
        />
        <div class="mt-10">
          <FeatureGrid :features="project.features" :accent="project.accent" />
        </div>
      </div>
    </section>

    <!-- ============ GALLERY ============ -->
    <section v-if="project.gallery.length" class="section-pad pt-0">
      <div class="container-page">
        <SectionTitle :label="$t('projects.gallery')" :heading="$t('projects.insideProduct')" accent="product" />
        <div v-reveal="{ delay: 120 }" class="mt-9">
          <ProjectGallery :images="project.gallery" :title="project.title" />
        </div>
      </div>
    </section>

    <!-- ============ ARCHITECTURE ============ -->
    <section v-if="project.architecture?.length" class="section-pad pt-0">
      <div class="container-page">
        <SectionTitle
          :label="$t('projects.architecture')"
          :heading="$t('projects.howBuilt')"
          accent="built"
          :description="$t('projects.architectureDesc')"
        />
        <div class="mt-12">
          <ArchitectureFlow :steps="project.architecture" />
        </div>
      </div>
    </section>

    <!-- ============ CASE STUDY ============ -->
    <section id="case-study" class="section-pad scroll-mt-24 pt-0">
      <div class="container-page">
        <SectionTitle
          :label="$t('projects.caseStudy')"
          :heading="$t('projects.storyBehind')"
          accent="story"
          :description="$t('projects.storyDesc')"
        />
        <div class="mt-12">
          <CaseStudyTimeline v-if="project.caseStudy?.length" :sections="project.caseStudy" />
        </div>
      </div>
    </section>

    <!-- ============ PREV / NEXT ============ -->
    <section class="pb-6">
      <div class="container-page">
        <div class="hairline mb-8" />
        <div class="grid gap-4 sm:grid-cols-2">
          <RouterLink
            v-if="neighbours.prev"
            :to="`/projects/${neighbours.prev.slug}`"
            class="glass-card card-hover group flex items-center gap-4 p-5"
          >
            <ArrowLeft :size="18" class="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-x-1" />
            <span class="min-w-0">
              <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('projects.previous') }}</span>
              <span class="mt-1 block truncate text-sm font-semibold text-content">{{ neighbours.prev.title }}</span>
            </span>
          </RouterLink>
          <span v-else class="hidden sm:block" />

          <RouterLink
            v-if="neighbours.next"
            :to="`/projects/${neighbours.next.slug}`"
            class="glass-card card-hover group flex items-center justify-end gap-4 p-5 text-right"
          >
            <span class="min-w-0">
              <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('projects.next') }}</span>
              <span class="mt-1 block truncate text-sm font-semibold text-content">{{ neighbours.next.title }}</span>
            </span>
            <ArrowRight :size="18" class="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1" />
          </RouterLink>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>

  <!-- ============ UNKNOWN SLUG ============ -->
  <div v-else class="section-pad">
    <div class="container-page">
      <div class="glass-card mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-16 text-center">
        <span class="section-label">404</span>
        <h1 class="text-2xl font-semibold">{{ $t('projects.projectNotFound') }}</h1>
        <p class="text-sm text-muted">
          {{ $t('projects.noProjectAt') }}:
          <code class="rounded bg-surface-2/80 px-1.5 py-0.5 font-mono text-xs text-primary">/projects/{{ slug }}</code>
        </p>
        <RouterLink to="/projects" class="btn-primary mt-2">{{ $t('projects.backToProjects') }}</RouterLink>
      </div>
    </div>
  </div>
</template>
