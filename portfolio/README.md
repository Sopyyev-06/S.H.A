# Nepes Sopyyev — Developer Portfolio

A production-quality personal developer portfolio built with **Vue 3 + TypeScript + Vite + Tailwind CSS + Vue Router** on the frontend and **Express (TypeScript)** on the backend, with a real working contact form that posts to `POST /api/contact`.

---

## Quick start

```bash
npm install          # installs deps + generates the brand icon file
npm run dev          # Vite (5173) + Express API (8787) together
```

Open <http://localhost:5173>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Frontend + backend in watch mode (recommended) |
| `npm run dev:web` | Vite dev server only |
| `npm run dev:api` | Express API only |
| `npm run build` | Type-checks (`vue-tsc`) then builds the frontend to `dist/` |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run preview` | Serve the built frontend |
| `npm start` | Run the Express API (serves `dist/` too, once built) |
| `npm run icons:generate` | Regenerate `src/data/brandIcons.generated.ts` |

### Production

```bash
npm run build
npm start            # Express serves the API *and* the built SPA on :8787
```

---

## ⚙️ Configure it once — `src/config/site.ts`

Every GitHub / LinkedIn / Telegram / email / CV link is read from this single file. Nothing is hardcoded inside components.

```ts
export const siteConfig = {
  name: 'Nepes Sopyyev',
  role: 'Full Stack Developer',
  email: 'nepes@example.com',
  phone: '+993 XX XXX XX XX',
  githubUsername: 'YOUR_GITHUB_USERNAME',   // ← all GitHub links derive from this
  linkedinUrl: 'YOUR_LINKEDIN_URL',
  telegramUrl: 'YOUR_TELEGRAM_URL',
  cvUrl: '/cv/Nepes-Sopyyev-CV.pdf',
}
```

The GitHub profile URL and every repository URL are **built** from `githubUsername`:

```ts
githubRepoUrl('melhem-ai') // → https://github.com/<username>/melhem-ai
```

Any value still containing `YOUR_` is treated as *not configured*: the matching button renders disabled instead of pointing at a broken address.

---

## 🖼 Replacing the image placeholders

No fake screenshots or personal photos are generated anywhere. Instead, a reusable component renders a polished placeholder until you supply an image:

```vue
<ProjectImagePlaceholder label="Place Melhem AI screenshot here" aspect="16/9" />
```

To use a real image, just set `src` (and `alt`):

```vue
<ProjectImagePlaceholder src="/images/melhem-hero.png" alt="Melhem AI dashboard" aspect="16/11" />
```

Placeholders exist for:

| Where | File |
| --- | --- |
| Hero portrait | `src/components/home/HeroSection.vue` |
| About portrait | `src/views/AboutView.vue` |
| Home project cards | `src/components/home/ProjectPreviewCard.vue` |
| Projects grid | `src/components/projects/ProjectCard.vue` |
| Case-study hero + gallery | `src/views/ProjectDetailsView.vue`, `ProjectGallery.vue` |

Drop files in `public/images/` and reference them as `/images/<file>` — or import them for hashing:

```ts
image: new URL('../assets/melhem.png', import.meta.url).href
```

### CV file

Put your PDF at `public/cv/Nepes-Sopyyev-CV.pdf`. The **Download CV** button checks whether the file exists (HEAD request) and renders disabled — never a 404 — until you add it. A placeholder PDF is included so the button is demonstrably functional; replace it with your real CV.

---

## 🗂 Project structure

```
portfolio/
├─ index.html
├─ vite.config.ts            # /api proxy → Express
├─ tailwind.config.js        # theme tokens, animations
├─ src/
│  ├─ App.vue                # shell: background, navbar, router-view, footer
│  ├─ main.ts
│  ├─ components/
│  │  ├─ layout/             # Navbar.vue, Footer.vue
│  │  ├─ home/               # HeroSection, StatsSection, ProjectPreviewCard
│  │  ├─ projects/           # ProjectCard, ProjectFilters, ProjectGallery,
│  │  │                      # ArchitectureFlow, CaseStudyTimeline, FeatureGrid
│  │  ├─ sections/           # CtaSection
│  │  ├─ ui/                 # GitHubButton, SocialLinks, ThemeToggle,
│  │  │                      # ProjectImagePlaceholder, SectionTitle, TechIcon,
│  │  │                      # TechBadge, NEmblem, DownloadCvButton, BackToTop
│  │  └─ icons/              # GitHubIcon, LinkedInIcon, TelegramIcon
│  ├─ views/                 # HomeView, AboutView, ProjectsView,
│  │                         # ProjectDetailsView, SkillsView, ContactView, NotFound
│  ├─ router/index.ts        # all routes + scroll behaviour + titles
│  ├─ data/                  # projects.ts, skillsData.ts, content.ts, techIcons.ts
│  ├─ config/site.ts         # ⭐ single source of truth for links
│  ├─ services/api.ts        # the only place that calls fetch()
│  ├─ composables/           # useTheme, useScrolled, useBodyScrollLock,
│  │                         # useContactForm, useCvAvailability, useScroll
│  ├─ directives/            # v-reveal (IntersectionObserver, reduced-motion aware)
│  ├─ types/index.ts         # shared interfaces
│  └─ styles/main.css        # design tokens, component classes, reveal system
├─ server/
│  ├─ index.ts               # Express app (CORS, JSON, static SPA, errors)
│  ├─ routes/contact.ts
│  ├─ controllers/contactController.ts
│  ├─ services/contactService.ts   # storage, rate limit, optional email hook
│  └─ utils/                 # validation.ts, logger.ts
└─ scripts/generate-tech-icons.mjs # builds brand icons from simple-icons
```

---

## ➕ Adding content (no component edits required)

**A new project** — append one object to `src/data/projects.ts`; it appears in the grid, in the filters, in the home preview (if `featured: true`) and at `/projects/<slug>` automatically.

```ts
{
  id: 'p-my-app', slug: 'my-app', title: 'My App',
  category: 'Web Apps', technologies: ['Vue 3'],
  description: '…', repo: 'my-app-repo', liveUrl: '', featured: false,
  year: '2026', role: 'Full Stack Developer', status: 'Completed',
  image: '', imageAlt: '…', gallery: ['', ''],
}
```

**A new skill** — add to `src/data/skillsData.ts`; the icon resolves by brand slug or `lucide:icon-name`.

**Timeline / values / stats** — `src/data/content.ts`.

---

## 🔌 Contact API

`POST /api/contact`

```json
{ "name": "Ada", "email": "ada@example.com", "message": "Hello!" }
```

Validation lives in `server/utils/validation.ts` (name 2–80 chars, valid email, message 10–2000 chars, control characters stripped, header-injection rejected). Responses:

| Status | Body |
| --- | --- |
| `201` | `{ "success": true, "message": "Message sent successfully…", "data": { "id", "receivedAt" } }` |
| `422` | `{ "success": false, "message": "…", "errors": { "email": "…" } }` |
| `429` | `{ "success": false, "message": "Too many messages sent…" }` |
| `500` | `{ "success": false, "message": "…" }` |

Submissions are appended as newline-delimited JSON to `server/data/messages.json` (git-ignored) and logged. Set `SMTP_HOST` + `CONTACT_TO_EMAIL` and implement the transport in `server/services/contactService.ts` to switch to real email delivery. Rate limit: 5 messages / 10 minutes / IP (configurable via `.env`).

Copy `.env.example` → `.env` to change ports, CORS origins or rate limits.

---

## ♿ Accessibility & quality

- Semantic landmarks, a skip-to-content link, `aria-label`s on icon-only buttons, `aria-live` form status, visible focus rings, `aria-current` on the active nav link.
- `prefers-reduced-motion` disables animations and scroll reveals site-wide.
- Keyboard: Escape closes the mobile drawer (which also locks body scroll).
- Theme choice persists in `localStorage` and is applied before first paint (no flash).
- Responsive at 375 / 480 / 768 / 1024 / 1280 / 1440 px — 3-column project grid on desktop, 2 on tablet, 1 on mobile, no horizontal scroll.

---

## ✅ Verified before delivery

- `npm run build` — TypeScript (`vue-tsc`) and Vite build pass with no errors.
- Every route reachable: `/`, `/about`, `/projects`, `/projects/<slug>`, `/skills`, `/contact`, plus a styled 404.
- Category filters, search, dark/light toggle, mobile menu, download-CV check and the contact form all exercise real logic (no dead buttons).
- `POST /api/contact` verified end-to-end against the running Express server.

### Known, intentional states

- `githubUsername`, `linkedinUrl`, `telegramUrl`, `liveUrl` and every `repo` ship as `YOUR_…` placeholders → those buttons render **disabled** (never broken) until you set them.
- Project images and the two portrait images are placeholders by design.
