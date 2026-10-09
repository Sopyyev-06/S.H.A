<script setup lang="ts">
/**
 * GitHub / LinkedIn / Telegram links, driven by the central site config.
 * GitHub uses the official emblem. Unconfigured URLs render as disabled
 * buttons instead of broken links.
 */
import { computed, type Component } from 'vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import LinkedInIcon from '@/components/icons/LinkedInIcon.vue'
import TelegramIcon from '@/components/icons/TelegramIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import TikTokIcon from '@/components/icons/TikTokIcon.vue'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon.vue'
import ImoIcon from '@/components/icons/ImoIcon.vue'
import { isUnconfigured, socialLinks } from '@/config/site'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    /** 'row' inline icons, 'stack' vertical list with labels */
    layout?: 'row' | 'stack'
    showLabels?: boolean
  }>(),
  { size: 'md', layout: 'row', showLabels: false },
)

const iconMap: Record<string, Component> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  whatsapp: WhatsAppIcon,
  imo: ImoIcon,
}

const items = computed(() =>
  socialLinks.map((link) => ({
    ...link,
    component: iconMap[link.key] ?? TelegramIcon,
    configured: !isUnconfigured(link.url),
  })),
)

const iconSize = computed(() => (props.size === 'sm' ? 16 : props.size === 'lg' ? 22 : 18))

const boxSize = computed(
  () =>
    ({
      sm: 'h-9 w-9',
      md: 'h-11 w-11',
      lg: 'h-12 w-12',
    })[props.size],
)
</script>

<template>
  <ul class="flex" :class="layout === 'row' ? 'flex-row items-center gap-2.5' : 'flex-col gap-2'">
    <li v-for="item in items" :key="item.key">
      <!-- Configured: real, working external link -->
      <a
        v-if="item.configured"
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group/social flex items-center gap-3 rounded-xl border border-line/70 bg-surface/70 text-muted backdrop-blur
               transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-primary/60
               hover:text-content hover:shadow-glow-sm"
        :class="[boxSize, showLabels && 'w-auto px-3.5 py-2.5']"
        :aria-label="`${item.label} (opens in a new tab)`"
      >
        <component
          :is="item.component"
          :size="iconSize"
          class="transition-transform duration-300 group-hover/social:scale-110"
        />
        <span v-if="showLabels" class="text-sm font-medium">{{ item.label }}</span>
      </a>

      <!-- Not configured yet: disabled, explains itself instead of 404-ing -->
      <button
        v-else
        type="button"
        disabled
        class="flex cursor-not-allowed items-center gap-3 rounded-xl border border-line/60 bg-surface/40 text-muted/60"
        :class="[boxSize, showLabels && 'w-auto px-3.5 py-2.5']"
        :aria-label="`${item.label} — link not configured yet`"
        :title="`Add your ${item.label} URL in src/config/site.ts`"
      >
        <component :is="item.component" :size="iconSize" />
        <span v-if="showLabels" class="text-sm font-medium">{{ item.label }}</span>
        <span v-else class="sr-only">{{ item.label }} (not configured)</span>
      </button>
    </li>
  </ul>
</template>
