<script setup lang="ts">
/**
 * Ambient background: soft floating gradient shapes + a faint technical grid.
 * Purely decorative (aria-hidden) and GPU-friendly (transform/opacity only).
 */
withDefaults(defineProps<{ variant?: 'default' | 'subtle' }>(), { variant: 'default' })
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <!-- Base wash -->
    <div class="absolute inset-0 bg-bg" />
    <div
      class="absolute inset-0"
      style="
        background:
          radial-gradient(90% 60% at 50% -10%, rgb(var(--c-primary) / 0.16) 0%, transparent 60%),
          radial-gradient(70% 55% at 100% 0%, rgb(var(--c-accent) / 0.14) 0%, transparent 65%);
      "
    />

    <!-- Faint technical grid -->
    <div
      class="absolute inset-0 bg-grid-fade bg-grid"
      style="opacity: calc(var(--grid-opacity) * 0.26)"
    />

    <!-- Floating gradient shapes -->
    <div
      class="glow-blob animate-float"
      style="
        top: -8rem;
        left: -6rem;
        width: 34rem;
        height: 34rem;
        background: radial-gradient(circle, rgb(var(--c-primary) / 0.55), transparent 68%);
      "
    />
    <div
      class="glow-blob animate-float-slow"
      style="
        top: 18rem;
        right: -10rem;
        width: 40rem;
        height: 40rem;
        background: radial-gradient(circle, rgb(var(--c-accent) / 0.45), transparent 68%);
      "
    />
    <div
      v-if="variant === 'default'"
      class="glow-blob animate-float"
      style="
        bottom: -12rem;
        left: 25%;
        width: 36rem;
        height: 36rem;
        animation-delay: -4s;
        background: radial-gradient(circle, rgb(var(--c-cyan) / 0.28), transparent 70%);
      "
    />

    <!-- Vignette -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(120% 90% at 50% 40%, transparent 45%, rgb(var(--c-bg) / 0.85) 100%)"
    />
  </div>
</template>
