<script setup lang="ts">
/**
 * Horizontal, scroll-snapping screenshot gallery.
 * Each item is a reusable placeholder until you drop in a real image.
 */
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProjectImagePlaceholder from '@/components/ui/ProjectImagePlaceholder.vue'

const props = defineProps<{ images: string[]; title: string }>()

const track = ref<HTMLElement | null>(null)

function scrollBy(direction: 1 | -1) {
  const el = track.value
  if (!el) return
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.8, 520), behavior: reduced ? 'auto' : 'smooth' })
}

const total = () => Math.max(props.images.length, 1)
</script>

<template>
  <div>
    <div class="flex items-end justify-between gap-4">
      <p class="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {{ total() }} screenshots · scroll horizontally
      </p>
      <div class="flex gap-2">
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line/80 bg-surface/70
                 text-muted transition-all duration-300 hover:border-primary/60 hover:text-primary"
          aria-label="Scroll gallery left"
          @click="scrollBy(-1)"
        >
          <ChevronLeft :size="16" />
        </button>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line/80 bg-surface/70
                 text-muted transition-all duration-300 hover:border-primary/60 hover:text-primary"
          aria-label="Scroll gallery right"
          @click="scrollBy(1)"
        >
          <ChevronRight :size="16" />
        </button>
      </div>
    </div>

    <div
      ref="track"
      class="no-scrollbar mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      tabindex="0"
      role="group"
      aria-label="Project screenshots"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-[85%] shrink-0 snap-start sm:w-[62%] lg:w-[46%]"
      >
        <ProjectImagePlaceholder
          :src="image"
          :alt="`${title} screenshot ${index + 1}`"
          :label="`SCREENSHOT PLACEHOLDER ${String(index + 1).padStart(2, '0')}`"
          aspect="aspect-[16/10]"
          rounded="rounded-2xl"
          hover-zoom
        >
          <!-- SCREENSHOT PLACEHOLDER {{ String(index + 1).padStart(2, '0') }} -->
        </ProjectImagePlaceholder>
      </div>
    </div>
  </div>
</template>
