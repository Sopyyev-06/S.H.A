<script setup lang="ts">
/**
 * Contact page — the form really posts to the Express API (POST /api/contact)
 * through src/services/api.ts, with loading / success / validation / server
 * error states and no page reload.
 */
import { AlertCircle, Check, Loader2, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-vue-next'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import SocialLinks from '@/components/ui/SocialLinks.vue'
import { useContactForm } from '@/composables/useContactForm'
import { siteConfig } from '@/config/site'

const { values, errors, state, serverMessage, serverError, submit, validateField, reset } =
  useContactForm()

async function onSubmit() {
  await submit()
}

const maxMessage = 2000
</script>

<template>
  <div class="section-pad">
    <div class="container-page">
      <SectionTitle
        :label="$t('contact.label')"
        :heading="$t('contact.heading')"
        :accent="$t('contact.accent')"
        :description="$t('contact.description')"
        size="xl"
      />

      <div class="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        <!-- ================= LEFT: contact info ================= -->
        <aside class="animate-fade-left" style="animation-delay: 120ms">
          <div class="glass-card flex h-full flex-col gap-6 p-6 sm:p-8">
            <div class="flex flex-col gap-1.5">
              <h2 class="text-xl font-semibold tracking-tight">{{ $t('contact.infoTitle') }}</h2>
              <p class="text-sm leading-relaxed text-muted">
                {{ $t('contact.infoDesc') }}
              </p>
            </div>

            <ul class="flex flex-col gap-3">
              <!-- Primary Email -->
              <li>
                <a
                  :href="`mailto:${siteConfig.email}`"
                  class="group flex items-center gap-4 rounded-xl border border-line/70 bg-surface-2/50 p-4 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/55 hover:shadow-glow-sm"
                >
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-surface/80 text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    <Mail :size="18" />
                  </span>
                  <span class="min-w-0">
                    <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('contact.email') }} 1</span>
                    <span class="mt-0.5 block truncate text-sm font-medium text-content group-hover:text-primary">
                      {{ siteConfig.email }}
                    </span>
                  </span>
                </a>
              </li>

              <!-- Secondary Email -->
              <li v-if="siteConfig.emailSecondary">
                <a
                  :href="`mailto:${siteConfig.emailSecondary}`"
                  class="group flex items-center gap-4 rounded-xl border border-line/70 bg-surface-2/50 p-4 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/55 hover:shadow-glow-sm"
                >
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-surface/80 text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    <Mail :size="18" />
                  </span>
                  <span class="min-w-0">
                    <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('contact.email') }} 2</span>
                    <span class="mt-0.5 block truncate text-sm font-medium text-content group-hover:text-primary">
                      {{ siteConfig.emailSecondary }}
                    </span>
                  </span>
                </a>
              </li>

              <!-- Primary Phone -->
              <li>
                <a
                  :href="`tel:${siteConfig.phone.replace(/\s/g, '')}`"
                  class="group flex items-center gap-4 rounded-xl border border-line/70 bg-surface-2/50 p-4 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/55 hover:shadow-glow-sm"
                >
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-surface/80 text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    <Phone :size="18" />
                  </span>
                  <span class="min-w-0">
                    <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('contact.phone') }} 1</span>
                    <span class="mt-0.5 block truncate text-sm font-medium text-content group-hover:text-primary">
                      {{ siteConfig.phone }}
                    </span>
                  </span>
                </a>
              </li>

              <!-- Secondary Phone -->
              <li v-if="siteConfig.phoneSecondary">
                <a
                  :href="`tel:${siteConfig.phoneSecondary.replace(/\s/g, '')}`"
                  class="group flex items-center gap-4 rounded-xl border border-line/70 bg-surface-2/50 p-4 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-primary/55 hover:shadow-glow-sm"
                >
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-surface/80 text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    <Phone :size="18" />
                  </span>
                  <span class="min-w-0">
                    <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('contact.phone') }} 2</span>
                    <span class="mt-0.5 block truncate text-sm font-medium text-content group-hover:text-primary">
                      {{ siteConfig.phoneSecondary }}
                    </span>
                  </span>
                </a>
              </li>

              <!-- Location -->
              <li>
                <div class="flex items-center gap-4 rounded-xl border border-line/70 bg-surface-2/50 p-4">
                  <span
                    class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line/70 bg-surface/80 text-muted"
                  >
                    <MapPin :size="18" />
                  </span>
                  <span class="min-w-0">
                    <span class="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{{ $t('contact.location') }}</span>
                    <span class="mt-0.5 block truncate text-sm font-medium text-content">
                      {{ siteConfig.location }}
                    </span>
                  </span>
                </div>
              </li>
            </ul>

            <div class="flex flex-col gap-3">
              <h3 class="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{{ $t('contact.socials') }}</h3>
              <SocialLinks size="md" />
            </div>

            <div class="mt-auto flex items-start gap-3 rounded-xl border border-line/60 bg-surface/50 p-4">
              <ShieldCheck :size="17" class="mt-0.5 shrink-0 text-emerald-400" />
              <p class="text-xs leading-relaxed text-muted">
                {{ $t('contact.privacyNote') }}
              </p>
            </div>
          </div>
        </aside>

        <!-- ================= RIGHT: form ================= -->
        <div class="animate-fade-right" style="animation-delay: 200ms">
          <form
            class="glass-card flex h-full flex-col gap-5 p-6 sm:p-8"
            novalidate
            @submit.prevent="onSubmit"
          >
            <div class="flex flex-col gap-1.5">
              <h2 class="text-xl font-semibold tracking-tight">{{ $t('contact.formTitle') }}</h2>
              <p class="text-sm leading-relaxed text-muted">
                {{ $t('contact.formDesc') }}
              </p>
            </div>

            <!-- Name -->
            <div class="flex flex-col gap-2">
              <label for="contact-name" class="text-sm font-medium text-content">
                {{ $t('contact.name') }} <span class="text-primary">{{ $t('contact.required') }}</span>
              </label>
              <input
                id="contact-name"
                v-model="values.name"
                type="text"
                name="name"
                autocomplete="name"
                :placeholder="$t('contact.namePlaceholder')"
                class="field"
                :class="errors.name && 'field-error'"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'contact-name-error' : undefined"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" id="contact-name-error" class="flex items-center gap-1.5 text-xs text-rose-400">
                <AlertCircle :size="13" /> {{ errors.name }}
              </p>
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2">
              <label for="contact-email" class="text-sm font-medium text-content">
                {{ $t('contact.emailLabel') }} <span class="text-primary">{{ $t('contact.required') }}</span>
              </label>
              <input
                id="contact-email"
                v-model="values.email"
                type="email"
                name="email"
                autocomplete="email"
                :placeholder="$t('contact.emailPlaceholder')"
                class="field"
                :class="errors.email && 'field-error'"
                :aria-invalid="Boolean(errors.email)"
                :aria-describedby="errors.email ? 'contact-email-error' : undefined"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" id="contact-email-error" class="flex items-center gap-1.5 text-xs text-rose-400">
                <AlertCircle :size="13" /> {{ errors.email }}
              </p>
            </div>

            <!-- Message -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <label for="contact-message" class="text-sm font-medium text-content">
                  {{ $t('contact.message') }} <span class="text-primary">{{ $t('contact.required') }}</span>
                </label>
                <span class="font-mono text-[10px] text-muted">
                  {{ values.message.length }}/{{ maxMessage }}
                </span>
              </div>
              <textarea
                id="contact-message"
                v-model="values.message"
                name="message"
                rows="6"
                :maxlength="maxMessage"
                :placeholder="$t('contact.messagePlaceholder')"
                class="field resize-y"
                :class="errors.message && 'field-error'"
                :aria-invalid="Boolean(errors.message)"
                :aria-describedby="errors.message ? 'contact-message-error' : undefined"
                @blur="validateField('message')"
              />
              <p
                v-if="errors.message"
                id="contact-message-error"
                class="flex items-center gap-1.5 text-xs text-rose-400"
              >
                <AlertCircle :size="13" /> {{ errors.message }}
              </p>
            </div>

            <!-- Live region for status -->
            <div aria-live="polite" class="flex flex-col gap-3">
              <Transition
                enter-active-class="transition duration-300 ease-premium"
                enter-from-class="translate-y-2 opacity-0"
                leave-active-class="transition duration-200 ease-in"
                leave-to-class="opacity-0"
              >
                <p
                  v-if="state === 'success' && serverMessage"
                  class="flex items-start gap-2.5 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
                >
                  <Check :size="17" class="mt-0.5 shrink-0" />
                  {{ serverMessage }}
                </p>
              </Transition>

              <p
                v-if="state === 'error' && serverError"
                class="flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
              >
                <AlertCircle :size="17" class="mt-0.5 shrink-0" />
                {{ serverError }}
              </p>
            </div>

            <div class="mt-auto flex flex-wrap items-center gap-3 pt-2">
              <button type="submit" class="btn-primary group" :disabled="state === 'loading'">
                <Loader2 v-if="state === 'loading'" :size="17" class="animate-spin" />
                <Send v-else :size="17" class="transition-transform duration-300 group-hover:translate-x-0.5" />
                {{ state === 'loading' ? $t('contact.sending') : $t('contact.send') }}
              </button>

              <button
                v-if="state === 'success' || state === 'error'"
                type="button"
                class="btn-ghost"
                @click="reset()"
              >
                {{ $t('contact.sendAnother') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
