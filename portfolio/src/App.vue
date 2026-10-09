<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import BackgroundDecor from '@/components/ui/BackgroundDecor.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg
           focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary
           focus:shadow-glow focus:outline-none"
  >
    Skip to content
  </a>

  <BackgroundDecor />
  <Navbar />

  <main id="main-content" class="relative min-h-[70vh] pt-16 lg:pt-[72px]">
    <RouterView v-slot="{ Component }">
      <Transition name="route-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <Footer />
  <BackToTop />
</template>
