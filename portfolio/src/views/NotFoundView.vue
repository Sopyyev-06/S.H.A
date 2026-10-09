<script setup lang="ts">
import { ArrowLeft, Compass } from 'lucide-vue-next'
import { navLinks } from '@/config/site'
</script>

<template>
  <div class="section-pad">
    <div class="container-page">
      <div class="glass-card mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 py-16 text-center sm:px-12">
        <span
          class="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-surface-2/80 text-primary shadow-glow-sm"
        >
          <Compass :size="28" :stroke-width="1.6" />
        </span>
        <p class="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">404</p>
        <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ $t('notFound.title') }}</h1>
        <p class="max-w-md text-sm leading-relaxed text-muted">
          {{ $t('notFound.description') }}
        </p>

        <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="btn-outline btn-sm"
          >
            {{ $t(`nav.${link.key}`) }}
          </RouterLink>
        </div>

        <RouterLink to="/" class="btn-primary mt-3">
          <ArrowLeft :size="16" />
          {{ $t('notFound.backHome') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
