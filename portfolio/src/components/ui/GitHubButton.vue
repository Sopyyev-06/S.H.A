<script setup lang="ts">
/**
 * Reusable GitHub link button (profile or repository).
 * The URL is always built from the single `githubUsername` in the site config.
 * When a repo/URL is not configured yet the button renders disabled rather
 * than pointing at a broken address.
 */
import { computed } from 'vue'
import GitHubIcon from '@/components/icons/GitHubIcon.vue'
import { githubRepoUrl, isUnconfigured, siteConfig } from '@/config/site'

const props = withDefaults(
  defineProps<{
    /** Repository name, e.g. 'melhem-ai'. Omit to link the GitHub profile. */
    repo?: string
    label?: string
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md'
    block?: boolean
    /** Full override URL (still only used if it is configured) */
    url?: string
  }>(),
  { label: 'GitHub', variant: 'outline', size: 'md', block: false },
)

const href = computed(() => {
  if (props.url) return props.url
  if (props.repo) return githubRepoUrl(props.repo)
  return `https://github.com/${siteConfig.githubUsername}`
})

const configured = computed(() => !isUnconfigured(href.value))

const classes = computed(() => [
  props.variant === 'primary' && 'btn-primary',
  props.variant === 'outline' && 'btn-outline',
  props.variant === 'ghost' && 'btn-ghost',
  props.size === 'sm' && 'btn-sm',
  props.block && 'w-full',
])
</script>

<template>
  <a
    v-if="configured"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="classes"
    class="group/gh"
    :aria-label="`${label} (opens in a new tab)`"
  >
    <GitHubIcon
      :size="size === 'sm' ? 15 : 18"
      class="transition-transform duration-300 group-hover/gh:-translate-y-0.5 group-hover/gh:scale-110"
    />
    <span>{{ label }}</span>
    <slot />
  </a>
  <button
    v-else
    type="button"
    disabled
    :class="classes"
    :aria-label="`${label} — repository not configured yet`"
    :title="`Set the repository name in src/data/projects.ts (githubUsername lives in src/config/site.ts)`"
  >
    <GitHubIcon :size="size === 'sm' ? 15 : 18" />
    <span>{{ label }}</span>
    <slot />
  </button>
</template>
