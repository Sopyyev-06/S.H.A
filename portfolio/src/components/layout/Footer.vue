<script setup lang="ts">
/**
 * Global footer — used on every page.
 * All external URLs come from the central site config (never hardcoded here).
 */
import { Mail, MapPin } from 'lucide-vue-next'
import NEmblem from '@/components/ui/NEmblem.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { navLinks, siteConfig } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative mt-24 border-t border-line/70 bg-bg-soft/70 backdrop-blur-sm">
    <div class="hairline absolute inset-x-0 top-0" />
    <div class="container-page py-14">
      <div class="grid gap-10 md:grid-cols-3 lg:gap-14">
        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <RouterLink to="/" class="group inline-flex items-center gap-3" aria-label="Back to home">
            <NEmblem :size="42" />
            <span class="flex flex-col leading-none">
              <span class="text-base font-semibold tracking-tight text-content">{{ siteConfig.name }}</span>
              <span class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {{ siteConfig.role }}
              </span>
            </span>
          </RouterLink>
          <p class="max-w-xs text-sm leading-relaxed text-muted">
            {{ $t('hero.description') }}
          </p>
          <SocialLinks size="sm" />
        </div>

        <!-- Navigation -->
        <nav class="flex flex-col gap-3" aria-label="Footer">
          <h2 class="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {{ $t('footer.navigation') }}
          </h2>
          <ul class="flex flex-col gap-2">
            <li v-for="link in navLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="inline-flex text-sm text-muted transition-colors duration-300 hover:text-primary"
              >
                {{ $t(`nav.${link.key}`) }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Contact -->
        <div class="flex flex-col gap-3">
          <h2 class="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {{ $t('footer.getInTouch') }}
          </h2>
          <a
            :href="`mailto:${siteConfig.email}`"
            class="inline-flex items-center gap-2.5 text-sm text-muted transition-colors duration-300 hover:text-primary"
          >
            <Mail :size="16" />
            {{ siteConfig.email }}
          </a>
          <span class="inline-flex items-center gap-2.5 text-sm text-muted">
            <MapPin :size="16" />
            {{ siteConfig.location }}
          </span>
          <RouterLink to="/contact" class="btn-outline btn-sm mt-2 w-fit">
            {{ $t('footer.sendMessage') }}
          </RouterLink>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-6 sm:flex-row"
      >
        <p class="text-center text-xs text-muted sm:text-left">
          © {{ year }} {{ siteConfig.name }}. {{ $t('footer.rights') }}
        </p>
        <p class="font-mono text-[11px] text-muted/80">
          {{ $t('footer.builtWith') }}
        </p>
      </div>
    </div>
  </footer>
</template>
