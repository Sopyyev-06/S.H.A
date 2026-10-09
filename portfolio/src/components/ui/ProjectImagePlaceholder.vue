<script setup lang="ts">
/**
 * Reusable image placeholder.
 * ---------------------------------------------------------------------------
 * Renders YOUR image when `src` is set; otherwise shows a polished, clearly
 * marked placeholder area that is easy to replace later.
 *
 *   <ProjectImagePlaceholder label="Place Melhem AI screenshot here" aspect="16/9" />
 *   <ProjectImagePlaceholder :src="myScreenshot" alt="…" />
 *
 * The `<!-- comment -->` slot is available for an extra note:
 *   <ProjectImagePlaceholder label="…">
 *     <!-- PLACE PROJECT SCREENSHOT HERE -->
 *   </ProjectImagePlaceholder>
 */
import { computed, ref } from 'vue'
import { ImageIcon } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    /** Image URL. Empty string → placeholder is shown. */
    src?: string
    label?: string
    hint?: string
    alt?: string
    /** Tailwind aspect-ratio class, e.g. 'aspect-video', 'aspect-[4/3]', 'aspect-square' */
    aspect?: string
    rounded?: string
    /** object-fit for the real image */
    fit?: 'cover' | 'contain'
    loading?: 'lazy' | 'eager'
    hoverZoom?: boolean
    iconSize?: number
  }>(),
  {
    src: '',
    label: 'Place your image here',
    hint: '',
    alt: '',
    aspect: 'aspect-video',
    rounded: 'rounded-2xl',
    fit: 'cover',
    loading: 'lazy',
    hoverZoom: false,
    iconSize: 30,
  },
)

const failed = ref(false)
const hasImage = computed(() => Boolean(props.src && props.src.trim().length > 0) && !failed.value)

function onError() {
  failed.value = true
}
</script>

<template>
  <div
    class="image-placeholder w-full"
    :class="[aspect, rounded, hoverZoom && 'group/zoom']"
    role="img"
    :aria-label="hasImage ? alt || label : `Image placeholder: ${label}`"
  >
    <!-- REAL IMAGE (rendered as soon as you set the src prop) -->
    <img
      v-if="hasImage"
      :src="src"
      :alt="alt || label"
      :loading="loading"
      decoding="async"
      class="absolute inset-0 h-full w-full transition-transform duration-700 ease-premium"
      :class="[fit === 'cover' ? 'object-cover' : 'object-contain', hoverZoom && 'group-hover/zoom:scale-[1.04]']"
      @error="onError"
    />

    <!-- PLACEHOLDER STATE -->
    <div v-else class="flex flex-col items-center gap-2.5 px-6 py-8 text-center">
      <span
        class="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-surface/80 text-primary shadow-glow-sm"
      >
        <ImageIcon :size="iconSize" :stroke-width="1.6" />
      </span>
      <p class="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-primary/90">
        {{ label }}
      </p>
      <p v-if="hint" class="max-w-xs text-xs leading-relaxed text-muted">{{ hint }}</p>
      <slot />
    </div>
  </div>
</template>
