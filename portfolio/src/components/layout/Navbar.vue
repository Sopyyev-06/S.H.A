<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'
import NEmblem from '@/components/ui/NEmblem.vue'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import DownloadCvButton from '@/components/ui/DownloadCvButton.vue'
import { navLinks, siteConfig } from '@/config/site'
import { useScrolled } from '@/composables/useScrolled'
import { useBodyScrollLock } from '@/composables/useBodyScrollLock'

const route = useRoute()
const { scrolled } = useScrolled(10)
const mobileOpen = ref(false)

const { lock, unlock } = useBodyScrollLock(
  () => mobileOpen.value,
  () => (mobileOpen.value = false),
)

watch(mobileOpen, (open) => (open ? lock() : unlock()))
watch(
  () => route.fullPath,
  () => { mobileOpen.value = false },
)

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(`${path}/`)
}

const shellClass = computed(() =>
  scrolled.value
    ? 'border-line/70 bg-bg/80 shadow-card backdrop-blur-xl'
    : 'border-transparent bg-bg/40 backdrop-blur-md',
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-premium"
    :class="shellClass"
  >
    <nav class="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]" aria-label="Baş nawigasiýa">
      <!-- Brand -->
      <RouterLink
        to="/"
        class="group flex items-center gap-3 rounded-xl py-2 pr-2 transition-opacity duration-300 hover:opacity-95"
        aria-label="Nepes Sopyyew — baş sahypa"
      >
        <NEmblem :size="38" />
        <span class="flex flex-col leading-none">
          <span class="text-[15px] font-semibold tracking-tight text-content">{{ siteConfig.name }}</span>
          <span class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {{ siteConfig.role }}
          </span>
        </span>
      </RouterLink>

      <!-- Desktop links -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li v-for="link in navLinks" :key="link.path">
          <RouterLink
            :to="link.path"
            class="nav-link"
            :class="{ 'nav-link-active': isActive(link.path) }"
            :aria-current="isActive(link.path) ? 'page' : undefined"
          >
            {{ $t(`nav.${link.key}`) }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right cluster -->
      <div class="flex items-center gap-2 sm:gap-2.5">
        <ThemeToggle />
        <div class="hidden sm:block">
          <DownloadCvButton size="sm" />
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line/80
                 bg-surface/70 text-muted backdrop-blur transition-colors duration-300
                 hover:border-primary/60 hover:text-primary lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-navigation"
          :aria-label="mobileOpen ? 'Nawigasiýany ýap' : 'Nawigasiýany aç'"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="19" />
          <Menu v-else :size="19" />
        </button>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition duration-350 ease-premium"
      enter-from-class="-translate-y-3 opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div
        v-if="mobileOpen"
        id="mobile-navigation"
        class="border-t border-line/70 bg-bg/95 backdrop-blur-xl lg:hidden"
      >
        <div class="container-page flex flex-col gap-1 py-5">
          <RouterLink
            v-for="(link, index) in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-300"
            :class="
              isActive(link.path)
                ? 'bg-surface-2/80 text-primary'
                : 'text-muted hover:bg-surface-2/60 hover:text-content'
            "
            :aria-current="isActive(link.path) ? 'page' : undefined"
            :style="{ transitionDelay: `${index * 20}ms` }"
          >
            {{ $t(`nav.${link.key}`) }}
            <span class="font-mono text-[11px] text-muted/70">0{{ index + 1 }}</span>
          </RouterLink>

          <div class="mt-3 sm:hidden">
            <DownloadCvButton block />
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
