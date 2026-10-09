<script setup lang="ts">
/** Skills dashboard — categories, real brand icons, honest level labels. */
import { computed } from 'vue'
import { Award, Filter, Info } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TechIcon from '@/components/ui/TechIcon.vue'
import GitHubButton from '@/components/ui/GitHubButton.vue'
import { resolveIcon } from '@/utils/icons'
import { allSkillNames, skillCategories } from '@/data/skillsData'
import type { SkillLevel } from '@/types'

const levelStyles: Record<SkillLevel, string> = {
  Learning: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  Comfortable: 'border-primary/40 bg-primary/10 text-primary',
  Experienced: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
}

/** Tailwind-safe accent classes per category. */
const accents: Record<string, { ring: string; text: string; bar: string }> = {
  blue: { ring: 'group-hover:border-primary/55', text: 'text-primary', bar: 'from-primary to-accent' },
  purple: { ring: 'group-hover:border-accent/55', text: 'text-accent', bar: 'from-accent to-primary' },
  cyan: { ring: 'group-hover:border-cyan-400/55', text: 'text-cyan-300', bar: 'from-cyan-400 to-primary' },
  green: { ring: 'group-hover:border-emerald-400/55', text: 'text-emerald-300', bar: 'from-emerald-400 to-primary' },
  indigo: { ring: 'group-hover:border-indigo-400/55', text: 'text-indigo-300', bar: 'from-indigo-400 to-accent' },
  amber: { ring: 'group-hover:border-amber-400/55', text: 'text-amber-300', bar: 'from-amber-400 to-accent' },
}

const totalSkills = computed(() => allSkillNames.length)

const levelCounts = computed(() => {
  const counts: Record<SkillLevel, number> = { Learning: 0, Comfortable: 0, Experienced: 0 }
  skillCategories.forEach((category) =>
    category.skills.forEach((skill) => {
      if (skill.level) counts[skill.level] += 1
    }),
  )
  return counts
})
</script>

<template>
  <div class="section-pad">
    <div class="container-page">
      <SectionTitle
        :label="$t('skills.label')"
        :heading="$t('skills.heading')"
        :accent="$t('skills.accent')"
        :description="$t('skills.description')"
        size="xl"
      />

      <!-- Summary strip -->
      <div
        v-reveal="{ delay: 180 }"
        class="mt-10 flex flex-col gap-4 border-t border-line/60 pt-7 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span class="inline-flex items-center gap-2 text-sm text-muted">
            <Filter :size="15" class="text-primary" />
            {{ totalSkills }} {{ $t('skills.technologies') }} · {{ skillCategories.length }} {{ $t('skills.categories') }}
          </span>
          <ul class="flex flex-wrap items-center gap-2">
            <li
              v-for="(count, level) in levelCounts"
              :key="level"
              class="rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
              :class="levelStyles[level as SkillLevel]"
            >
              {{ $t(`skills.${level.toLowerCase()}`) || level }} · {{ count }}
            </li>
          </ul>
        </div>
        <GitHubButton :label="$t('skills.seeOnGithub')" variant="outline" size="sm" />
      </div>

      <!-- Categories: 2 cols desktop/tablet, 1 col mobile -->
      <ul class="mt-10 grid gap-6 md:grid-cols-2">
        <li
          v-for="(category, index) in skillCategories"
          :key="category.id"
          v-reveal="{ delay: index * 90 }"
          class="glass-card group p-6 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-glow-sm sm:p-7"
          :class="accents[category.accent]?.ring"
        >
          <div class="flex items-start gap-4">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line/70 bg-surface-2/80 transition-transform duration-500 group-hover:scale-105"
              :class="accents[category.accent]?.text"
            >
              <component :is="resolveIcon(category.icon)" :size="21" :stroke-width="1.7" />
            </span>
            <div class="min-w-0 flex-1">
              <h2 class="text-lg font-semibold tracking-tight">{{ category.title }}</h2>
              <p class="mt-1 text-sm leading-relaxed text-muted">{{ category.description }}</p>
            </div>
            <span class="font-mono text-[10px] text-muted/70">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <span
            class="mt-5 block h-px w-full bg-gradient-to-r opacity-60"
            :class="accents[category.accent]?.bar"
            aria-hidden="true"
          />

          <!-- Skills -->
          <ul class="mt-5 grid grid-cols-2 gap-2.5">
            <li v-for="skill in category.skills" :key="skill.name">
              <div
                class="group/skill flex items-center gap-2.5 rounded-xl border border-line/60 bg-surface-2/50 px-3 py-2.5
                       transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/55 hover:bg-surface-2/80"
              >
                <TechIcon
                  :icon="skill.icon"
                  :name="skill.name"
                  :size="17"
                  class="text-muted transition-all duration-300 group-hover/skill:scale-110 group-hover/skill:drop-shadow-[0_0_10px_rgb(var(--c-primary)/0.65)]"
                />
                <span
                  class="min-w-0 flex-1 truncate text-sm font-medium text-content transition-colors duration-300 group-hover/skill:text-primary"
                >
                  {{ skill.name }}
                </span>
                <span
                  v-if="skill.level"
                  class="hidden shrink-0 rounded-md border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide lg:inline"
                  :class="levelStyles[skill.level]"
                >
                  {{ $t(`skills.${skill.level.toLowerCase()}`) || skill.level }}
                </span>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Honest note about levels -->
      <div
        v-reveal
        class="mt-10 flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface/50 px-5 py-4 sm:flex-row sm:items-center"
      >
        <Info :size="17" class="shrink-0 text-primary" />
        <p class="text-sm leading-relaxed text-muted">
          {{ $t('skills.levelsNote') }}
          <span class="text-amber-300">{{ $t('skills.learning') }}</span> {{ $t('skills.learningDesc') }},
          <span class="text-primary">{{ $t('skills.comfortable') }}</span> {{ $t('skills.comfortableDesc') }},
          <span class="text-emerald-300">{{ $t('skills.experienced') }}</span> {{ $t('skills.experiencedDesc') }}.
        </p>
        <span class="ml-auto hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:flex">
          <Award :size="14" />
          {{ $t('skills.updated') }}
        </span>
      </div>
    </div>
  </div>
</template>
