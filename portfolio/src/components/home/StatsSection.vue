<script setup lang="ts">
/** Four premium statistic cards, revealed with a stagger. */
import { resolveIcon } from '@/utils/icons'
import { stats } from '@/data/content'
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <div class="flex flex-col gap-3">
        <span v-reveal class="section-label w-fit">{{ $t('stats.label') }}</span>
        <h2 v-reveal="{ delay: 80 }" class="text-2xl font-semibold sm:text-3xl">
          {{ $t('stats.heading') }}
        </h2>
      </div>

      <ul class="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <li
          v-for="(stat, index) in stats"
          :key="stat.id"
          v-reveal:scale="{ delay: index * 90 }"
          class="glass-card card-hover group overflow-hidden p-5 sm:p-6"
        >
          <div
            class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-surface-2/80 text-primary transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-glow-sm"
          >
            <component :is="resolveIcon(stat.icon)" :size="19" :stroke-width="1.8" />
          </span>
          <p class="mt-5 text-3xl font-bold tracking-tight text-content sm:text-4xl">
            {{ stat.value }}
          </p>
          <p class="mt-1.5 text-sm text-muted">{{ $t(`stats.${stat.id}`) || stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
