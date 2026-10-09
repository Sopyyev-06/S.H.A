<script setup lang="ts">
/**
 * "Download CV" button.
 * Reads the path from the central config and stays visually disabled when the
 * PDF has not been added to /public/cv yet — no broken download links.
 */
import { onMounted } from 'vue'
import { Download } from 'lucide-vue-next'
import { useCvAvailability } from '@/composables/useCvAvailability'

withDefaults(defineProps<{ block?: boolean; size?: 'sm' | 'md' }>(), {
  block: false,
  size: 'md',
})

const { available, check, cvUrl, fileName } = useCvAvailability()

onMounted(check)
</script>

<template>
  <a
    v-if="available"
    :href="cvUrl"
    :download="fileName"
    class="btn-outline group"
    :class="[block && 'w-full', size === 'sm' ? 'btn-sm' : '']"
    aria-label="Download CV (PDF)"
  >
    <Download
      :size="size === 'sm' ? 14 : 16"
      class="transition-transform duration-300 group-hover:translate-y-0.5"
    />
    {{ $t('common.downloadCv') }}
  </a>
  <button
    v-else
    type="button"
    disabled
    class="btn-outline"
    :class="[block && 'w-full', size === 'sm' ? 'btn-sm' : '']"
    aria-label="Download CV — not available yet"
    title="Add your PDF to public/cv/Nepes-Sopyyev-CV.pdf to enable this button"
  >
    <Download :size="size === 'sm' ? 14 : 16" />
    {{ $t('common.downloadCv') }}
  </button>
</template>
