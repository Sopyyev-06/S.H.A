<script setup lang="ts">
/**
 * Vertical storytelling timeline for the case study sections
 * (01 Problem → 06 Future Improvements).
 */
import type { CaseStudySection } from '@/types'

defineProps<{ sections: CaseStudySection[] }>()
</script>

<template>
  <div class="relative">
    <!-- timeline rail -->
    <span
      class="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/70 via-line to-transparent sm:block"
      aria-hidden="true"
    />

    <div class="flex flex-col gap-12 sm:gap-14">
      <section
        v-for="(section, index) in sections"
        :id="section.id"
        :key="section.id"
        v-reveal="{ delay: 60 }"
        class="relative scroll-mt-28 sm:pl-16"
      >
        <!-- node -->
        <span
          class="absolute left-0 top-0 hidden h-10 w-10 items-center justify-center rounded-xl border border-primary/30
                 bg-surface font-mono text-[11px] font-semibold text-primary shadow-glow-sm sm:flex"
          aria-hidden="true"
        >
          {{ section.index }}
        </span>

        <p class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:hidden">
          {{ section.index }} — {{ section.title }}
        </p>
        <h3 class="hidden text-2xl font-semibold tracking-tight sm:block">
          <span class="text-muted/70">{{ section.index }} —</span> {{ section.title }}
        </h3>

        <div class="mt-4 flex flex-col gap-3">
          <p
            v-for="(paragraph, pIndex) in section.paragraphs"
            :key="pIndex"
            class="text-sm leading-relaxed text-muted sm:text-base"
          >
            {{ paragraph }}
          </p>
        </div>

        <ul v-if="section.bullets?.length" class="mt-5 grid gap-2.5 sm:grid-cols-2">
          <li
            v-for="bullet in section.bullets"
            :key="bullet"
            class="flex items-start gap-2.5 rounded-xl border border-line/60 bg-surface/50 px-3.5 py-2.5 text-sm text-muted"
          >
            <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-glow-sm" aria-hidden="true" />
            {{ bullet }}
          </li>
        </ul>

        <slot :name="`section-${section.id}`" :index="index" />
      </section>
    </div>
  </div>
</template>
