<script setup lang="ts">
/**
 * Architecture flow rendered purely with CSS cards (no diagram image):
 *   Vue Frontend ↓ Express API ↓ Prisma ↓ SQLite ↓ AI / RAG Layer
 * Cards appear sequentially as they scroll into view.
 */
import { ChevronDown } from 'lucide-vue-next'
import { resolveIcon } from '@/utils/icons'
import type { ArchitectureStep } from '@/types'

defineProps<{ steps: ArchitectureStep[] }>()
</script>

<template>
  <ol class="relative mx-auto flex max-w-xl flex-col items-stretch gap-3">
    <li v-for="(step, index) in steps" :key="step.label" class="flex flex-col items-stretch">
      <div
        v-reveal="{ delay: index * 130 }"
        class="glass-card group relative overflow-hidden px-5 py-4 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow-sm"
      >
        <span
          class="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/70 to-transparent"
        />
        <div class="flex items-center gap-4">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-surface-2/80 text-primary transition-transform duration-500 group-hover:scale-105"
          >
            <component :is="resolveIcon(step.icon)" :size="19" :stroke-width="1.8" />
          </span>
          <div class="min-w-0">
            <p class="text-sm font-semibold tracking-tight text-content">{{ step.label }}</p>
            <p class="mt-0.5 truncate text-xs text-muted">{{ step.detail }}</p>
          </div>
          <span class="ml-auto font-mono text-[10px] text-muted/70">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <div
        v-if="index < steps.length - 1"
        v-reveal:fade="{ delay: index * 130 + 70 }"
        class="flex justify-center py-1.5"
        aria-hidden="true"
      >
        <ChevronDown :size="18" class="animate-pulse text-primary/70" />
      </div>
    </li>
  </ol>
</template>
