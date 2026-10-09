<script setup lang="ts">
/** Reusable closing call-to-action block. */
import { ArrowRight, Mail } from 'lucide-vue-next'
import SocialLinks from '@/components/ui/SocialLinks.vue'
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <div
        v-reveal:scale
        class="glass-card relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <div
          class="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div class="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <span class="section-label">{{ $t('cta.label') }}</span>
          <h2 class="text-3xl font-semibold leading-tight sm:text-4xl">
            {{ $t('cta.title') }}
          </h2>
          <p class="text-base leading-relaxed text-muted">{{ $t('cta.description') }}</p>

          <div class="mt-2 flex flex-col gap-3 sm:flex-row">
            <RouterLink to="/contact" class="btn-primary group">
              <Mail :size="17" />
              {{ $t('cta.contact') }}
              <ArrowRight :size="16" class="transition-transform duration-300 group-hover:translate-x-1" />
            </RouterLink>
            <RouterLink to="/projects" class="btn-outline">{{ $t('cta.browse') }}</RouterLink>
          </div>

          <SocialLinks size="md" class="mt-4" />
        </div>
      </div>
    </div>
  </section>
</template>
