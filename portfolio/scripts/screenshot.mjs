/**
 * Real-browser screenshots of the running app (Express serving ./dist on :8787).
 *   node scripts/screenshot.mjs
 * Writes PNGs into preview/shots/. Used to visually verify the layout, theme
 * toggle and responsive breakpoints.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

const BASE = process.env.PREVIEW_BASE ?? 'http://localhost:8787'
const OUT = path.resolve('preview', 'shots')
mkdirSync(OUT, { recursive: true })

const SHOTS = [
  { name: 'home-desktop', route: '/', width: 1440, height: 1000 },
  { name: 'home-mobile', route: '/', width: 390, height: 844 },
  { name: 'projects-desktop', route: '/projects', width: 1440, height: 1000 },
  { name: 'project-details', route: '/projects/melhem-ai', width: 1440, height: 1000 },
  { name: 'skills-desktop', route: '/skills', width: 1440, height: 1000 },
  { name: 'contact-desktop', route: '/contact', width: 1440, height: 1000 },
  { name: 'about-desktop', route: '/about', width: 1440, height: 1000 },
]

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const errors = []

for (const shot of SHOTS) {
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  })
  const page = await context.newPage()
  const pageErrors = []
  page.on('pageerror', (err) => pageErrors.push(String(err)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') pageErrors.push(`console: ${msg.text()}`)
  })

  await page.goto(`${BASE}${shot.route}`, { waitUntil: 'networkidle', timeout: 30000 })

  // Force every scroll-reveal element visible so full-page shots are not blank.
  await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' })
  await page.waitForTimeout(700)
  await page.screenshot({ path: path.join(OUT, `${shot.name}.png`), fullPage: true })

  if (pageErrors.length) errors.push(`${shot.name}: ${pageErrors.slice(0, 3).join(' | ')}`)
  await context.close()
}

/* --- interaction checks: theme toggle + mobile menu + filter + form --- */
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: 'dark',
})
const page = await context.newPage()
const interaction = []

await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })

// 1. theme toggle
const before = await page.getAttribute('html', 'class')
await page.click('button[aria-label*="light mode"], button[aria-label*="dark mode"]')
await page.waitForTimeout(400)
const after = await page.getAttribute('html', 'class')
interaction.push(`theme toggle: ${before} -> ${after} (${before !== after ? 'OK' : 'FAILED'})`)
await page.screenshot({ path: path.join(OUT, 'home-light-theme-toggle.png'), fullPage: false })

// 2. project category filter
await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle' })
const allCount = await page.locator('article').count()
await page.getByRole('tab', { name: /Full Stack/ }).click()
await page.waitForTimeout(500)
const filteredCount = await page.locator('article').count()
const summary = await page.locator('p[aria-live="polite"]').first().innerText()
interaction.push(`filter "Full Stack": ${allCount} cards -> ${filteredCount} cards (${summary.replace(/\s+/g, ' ').trim()})`)
await page.screenshot({ path: path.join(OUT, 'projects-filtered.png'), fullPage: true })

// 3. client-side routing without reload
await page.goto(`${BASE}/projects`, { waitUntil: 'networkidle' })
await page.getByRole('link', { name: /View details of Melhem AI/i }).first().click()
await page.waitForTimeout(700)
const detailHeading = await page.locator('h1').first().innerText()
interaction.push(`router push -> ${page.url()} | h1: "${detailHeading.replace(/\s+/g, ' ')}"`)

// 4. contact form validation + real submit
await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /Send Message/i }).click()
await page.waitForTimeout(400)
const validationVisible = await page.locator('#contact-name-error').isVisible()
interaction.push(`empty-form submit shows validation: ${validationVisible ? 'OK' : 'FAILED'}`)

await page.fill('#contact-name', 'Browser Test')
await page.fill('#contact-email', 'browser@example.com')
await page.fill('#contact-message', 'Submitted from the headless browser verification run.')
await page.getByRole('button', { name: /Send Message/i }).click()
await page.waitForTimeout(1500)
const successText = await page.locator('[aria-live="polite"] p').first().innerText().catch(() => '')
interaction.push(`form submit -> "${successText.replace(/\s+/g, ' ').trim()}"`)
await page.screenshot({ path: path.join(OUT, 'contact-submitted.png'), fullPage: false })

// 5. mobile navigation drawer
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' })
const mpage = await mobile.newPage()
await mpage.goto(`${BASE}/`, { waitUntil: 'networkidle' })
await mpage.click('button[aria-label*="navigation menu"]')
await mpage.waitForTimeout(500)
const drawerVisible = await mpage.locator('#mobile-navigation').isVisible()
interaction.push(`mobile drawer opens: ${drawerVisible ? 'OK' : 'FAILED'}`)
await mpage.screenshot({ path: path.join(OUT, 'home-mobile-menu.png'), fullPage: false })
await mobile.close()

await context.close()
await browser.close()

console.log('\n================ INTERACTION CHECKS ================')
interaction.forEach((line) => console.log(`  • ${line}`))
if (errors.length) {
  console.log('\n---------------- PAGE ERRORS ----------------')
  errors.forEach((line) => console.log(`  ! ${line}`))
} else {
  console.log('\n  No page/console errors on any route.')
}
console.log('====================================================')
console.log(`Screenshots written to ${OUT}`)
