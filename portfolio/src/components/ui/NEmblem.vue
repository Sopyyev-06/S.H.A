<script setup lang="ts">
/**
 * The "N" emblem used in the navbar, footer and loading state.
 * A monoline N inside a gradient-bordered rounded square — no image asset needed.
 */
withDefaults(defineProps<{ size?: number; withGlow?: boolean }>(), {
  size: 38,
  withGlow: true,
})
</script>

<template>
  <span
    class="relative inline-flex shrink-0 items-center justify-center"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
  >
    <span
      v-if="withGlow"
      class="absolute inset-0 rounded-xl bg-brand-gradient opacity-45 blur-md transition-opacity duration-500 group-hover:opacity-80"
    />
    <svg
      class="relative h-full w-full"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nemblem-stroke" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#60a5fa" />
          <stop offset="50%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="13"
        class="fill-surface"
        stroke="url(#nemblem-stroke)"
        stroke-width="2.5"
      />
      <path
        d="M15 34V14l18 20V14"
        stroke="url(#nemblem-stroke)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>
