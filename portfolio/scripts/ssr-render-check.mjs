/**
 * Render-check every route through Vue's SSR renderer (via Vite's
 * ssrLoadModule, so SFCs are compiled exactly as in the app) and write static
 * preview HTML files with the compiled Tailwind CSS inlined.
 *
 * This catches template/runtime errors in any component and proves that the
 * real content (project names, headings, form fields) is rendered.
 *
 *   node scripts/ssr-render-check.mjs
 */
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createRouter, createMemoryHistory } from 'vue-router'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.resolve('preview')
const noopDirective = { getSSRProps: () => ({}) }

const vite = await createServer({
  configFile: path.resolve('vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

const view = async (name) => (await vite.ssrLoadModule(`/src/views/${name}.vue`)).default
const App = (await vite.ssrLoadModule('/src/App.vue')).default

/**
 * Memory-history mirror of src/router/index.ts (the real router uses
 * createWebHistory, which needs a browser). Route records match 1:1.
 */
const routes = [
  { path: '/', component: await view('HomeView') },
  { path: '/about', component: await view('AboutView') },
  { path: '/projects', component: await view('ProjectsView') },
  { path: '/projects/:slug', component: await view('ProjectDetailsView'), props: true },
  { path: '/skills', component: await view('SkillsView') },
  { path: '/contact', component: await view('ContactView') },
  { path: '/:pathMatch(.*)*', component: await view('NotFoundView') },
]

/**
 * Substrings that must appear in the rendered HTML.
 * NOTE: headings that use an accent gradient are split into
 * "before" + <span>accent</span> + "after", so expectations use fragments
 * that survive that split.
 */
const CHECKS = [
  {
    route: '/',
    slug: 'home',
    expect: [
      'Nepes Sopyyev',
      'FULL STACK DEVELOPER',
      'Sopyyev',
      'Featured',
      'Melhem AI',
      'AIVA Food Delivery',
      'Projects Completed',
      '100%',
      'Download CV',
      // Placeholder labels are uppercased via CSS, so match the DOM text.
      'Place your profile photo here',
      'Open to opportunities',
    ],
  },
  {
    route: '/about',
    slug: 'about',
    expect: [
      'ABOUT ME',
      'A little bit about me',
      'Problem Solving',
      'Goal Oriented',
      'Continuous Learning',
      'Future Goals',
      'Place your profile photo here',
      'Download CV',
    ],
  },
  {
    route: '/projects',
    slug: 'projects',
    expect: [
      'MY PROJECTS',
      'Featured',
      'Showing 6 of 6 projects',
      'Melhem AI',
      'Gorogly',
      'Sanly Bilim',
      'AI / ML',
      'View Details',
      'Live Demo',
      'Place Melhem AI screenshot here',
      'Place Gorogly',
    ],
  },
  {
    route: '/projects/melhem-ai',
    slug: 'projects-melhem-ai',
    expect: [
      'Back to Projects',
      'FEATURED PROJECT',
      'Melhem AI',
      'AI / RAG',
      'MELHEM AI MAIN SCREENSHOT PLACEHOLDER',
      'AI medical assistant',
      'First-aid instructions',
      'Medicinal plants identification',
      'Donor / blood donation system',
      'Health centers &amp; doctors',
      'SCREENSHOT PLACEHOLDER 01',
      'SCREENSHOT PLACEHOLDER 04',
      'Vue Frontend',
      'Express API',
      'Prisma',
      'SQLite Database',
      'AI / RAG Layer',
      'Future Improvements',
      'View Case Study',
    ],
  },
  {
    route: '/projects/aiva',
    slug: 'projects-aiva',
    expect: [
      'AIVA Food Delivery',
      'Full Stack',
      'Kotlin',
      'Ordering flow',
      'AIVA FOOD DELIVERY MAIN SCREENSHOT PLACEHOLDER',
      'SCREENSHOT PLACEHOLDER 01',
      '/projects/sanly-bilim',
    ],
  },
  {
    route: '/skills',
    slug: 'skills',
    expect: [
      'MY SKILLS',
      'Technologies I',
      'Frontend',
      'Backend',
      'Mobile',
      'Jetpack Compose',
      'Learning',
      'Comfortable',
      'Experienced',
      'REST API',
      'PostgreSQL',
    ],
  },
  {
    route: '/contact',
    slug: 'contact',
    expect: [
      'GET IN TOUCH',
      // The heading is split by the gradient accent span, so match fragments.
      'Let&#39;s Work',
      'Together',
      'Send Message',
      'POST /api/contact',
      'Contact information',
      'Ashgabat, Turkmenistan',
      'nepes@example.com',
      'Name',
      'Email',
      'Message',
    ],
  },
  { route: '/nope-404', slug: 'not-found', expect: ['This page does not exist', '404'] },
]

/** Compiled Tailwind CSS, inlined so each preview file is self-contained. */
const assetsDir = path.resolve('dist', 'assets')
let css = ''
try {
  const cssFile = readdirSync(assetsDir).find((file) => file.endsWith('.css'))
  if (cssFile) css = readFileSync(path.join(assetsDir, cssFile), 'utf8')
} catch {
  /* handled below */
}
if (!css) console.warn('[preview] No built CSS found — run `npx vite build` first.')

const shell = (theme, markup) => `<!doctype html>
<html lang="en" class="${theme}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${css}</style>
<style>body{margin:0}</style>
</head>
<body>${markup}</body>
</html>`

mkdirSync(OUT_DIR, { recursive: true })

let failures = 0
const report = []

for (const check of CHECKS) {
  const router = createRouter({ history: createMemoryHistory(), routes })
  const app = createSSRApp(App)
  app.directive('reveal', noopDirective)
  app.use(router)

  const warnings = []
  const originalWarn = console.warn
  console.warn = (...args) => warnings.push(args.map(String).join(' '))

  let html = ''
  let error = null
  try {
    await router.push(check.route)
    await router.isReady()
    html = await renderToString(app)
  } catch (err) {
    error = err
  } finally {
    console.warn = originalWarn
  }

  const missing = error ? check.expect : check.expect.filter((needle) => !html.includes(needle))
  const relevantWarnings = warnings.filter(
    (w) => !w.includes('Failed to resolve directive') && !w.includes('Hydration'),
  )
  const ok = !error && missing.length === 0 && relevantWarnings.length === 0
  if (!ok) failures += 1

  report.push({ ...check, ok, bytes: html.length, error: error ? String(error) : null, missing, relevantWarnings })

  writeFileSync(path.join(OUT_DIR, `${check.slug}.dark.html`), shell('dark', html), 'utf8')
  if (check.route === '/' || check.route === '/projects') {
    writeFileSync(path.join(OUT_DIR, `${check.slug}.light.html`), shell('light', html), 'utf8')
  }
}

await vite.close()

console.log('\n================ ROUTE RENDER CHECK ================')
for (const entry of report) {
  console.log(`${entry.ok ? 'PASS' : 'FAIL'}  ${entry.route.padEnd(20)} ${String(entry.bytes).padStart(7)} bytes`)
  if (entry.error) console.log(`      error: ${entry.error}`)
  if (entry.missing.length) console.log(`      missing content: ${entry.missing.join(' | ')}`)
  if (entry.relevantWarnings.length)
    console.log(`      warnings: ${entry.relevantWarnings.slice(0, 3).join(' || ')}`)
}
console.log('===================================================')
console.log(failures === 0 ? 'ALL ROUTES RENDERED OK' : `${failures} ROUTE(S) FAILED`)
process.exitCode = failures === 0 ? 0 : 1
