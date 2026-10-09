<script setup lang="ts">
/** Back-to-top button, appears after scrolling. */
import { ArrowUp } from 'lucide-vue-next'
import { scrollToTop, useScrollToTopButton } from '@/composables/useScroll'

const { visible } = useScrollToTopButton(700)
</script>

<template>
  <Transition
    enter-active-class="transition duration-400 ease-premium"
    enter-from-class="translate-y-4 opacity-0"
    leave-active-class="transition duration-250 ease-in"
    leave-to-class="translate-y-4 opacity-0"
  >
    <button
      v-if="visible"
      type="button"
      class="fixed bottom-6 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl
             border border-line/80 bg-surface/85 text-muted shadow-card backdrop-blur-xl
             transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-primary/60
             hover:text-primary hover:shadow-glow-sm sm:bottom-8 sm:right-8"
      aria-label="Scroll back to top"
      @click="scrollToTop()"
    >
      <ArrowUp :size="18" />
    </button>
  </Transition>
</template>
