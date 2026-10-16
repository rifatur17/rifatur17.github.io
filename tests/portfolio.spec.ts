import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHash } from 'node:crypto'
import { navigation, profile, projects, research } from '../src/data'

test('complete portfolio loads without broken requests, images, or console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RifaturRahman.')
  await expect(page.getByText('Full-Stack Developer', { exact: true })).toBeVisible()
  for (const id of ['about', 'skills', 'projects', 'research', 'leadership', 'education', 'contact']) {
    const section = page.locator(`#${id}`)
    await section.scrollIntoViewIfNeeded()
    await expect(section).toBeVisible()
  }
  await page.locator('footer').scrollIntoViewIfNeeded()
  await page.evaluate(() => document.fonts.ready)
  await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true)
  expect(errors).toEqual([])
})

test('all section anchors exist, menu works, headings clear the sticky header', async ({ page }) => {
  await page.goto('/')
  for (const name of navigation) {
    const button = page.getByRole('button', { name: 'Open navigation menu' })
    if (await button.isVisible()) await button.click()
    const link = page.getByRole('navigation').getByRole('link', { name, exact: true })
    await link.click()
    const section = page.locator(`#${name.toLowerCase()}`)
    await expect(section).toBeFocused()
    await expect(page.locator(`#main-navigation a[href="#${name.toLowerCase()}"]`)).toHaveAttribute('aria-current', 'location')
    expect((await section.boundingBox())!.y).toBeGreaterThanOrEqual(68)
    await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveCount(0)
  }
})

test('keyboard navigation, menu Escape, focus loop, and skip link work', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  const menu = page.getByRole('button', { name: 'Open navigation menu' })
  if (await menu.isVisible()) {
    await menu.click()
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.getByRole('button', { name: 'Close navigation menu' })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(menu).toBeFocused()
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
  }
})

test('no horizontal overflow at any section and no hidden content under reduced motion', async ({ page }, testInfo) => {
  await page.goto('/')
  for (const name of navigation) {
    await page.locator(`#${name.toLowerCase()}`).scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  }
  expect(await page.locator('.reveal').evaluateAll(elements => elements.every(el => getComputedStyle(el).animationName === 'none'))).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('portfolio-full.png'), fullPage: true })
})

test('CV download is the exact supplied PDF and social/SEO assets exist', async ({ page, request }) => {
  await page.goto('/')
  const cv = await request.get(profile.cv)
  expect(cv.status()).toBe(200)
  expect(cv.headers()['content-type']).toContain('application/pdf')
  const bytes = await cv.body()
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
  expect(createHash('sha256').update(bytes).digest('hex')).toBe('2c7cfe202477509c94df4014b6317d26a959300b9b53a8e91a8164c557b5ce8d')
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download CV' }).first().click()
  expect((await downloadEvent).suggestedFilename()).toBe('Rifatur_Rahman_CV.pdf')
  for (const asset of ['/favicon.svg', '/assets/social-preview.png', '/robots.txt', '/sitemap.xml']) expect((await request.get(asset)).status()).toBe(200)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://rifatur17.github.io/')
})

test('project links, attribution, contact, research and internal links are accurate', async ({ page }) => {
  await page.goto('/')
  for (const project of Object.values(projects)) await expect(page.locator(`a[href="${project.repo}"]`)).toHaveCount(1)
  await expect(page.locator(`a[href="${projects.incidentlens.demo}"]`)).toHaveCount(1)
  await expect(page.locator(`a[href="${profile.linkedin}"]`)).toHaveCount(2)
  await expect(page.locator(`a[href="mailto:${profile.email}"]`)).toHaveCount(3)
  await expect(page.locator(`a[href="${research.paper}"]`)).toHaveCount(1)
  await expect(page.getByText('Maintained fork of', { exact: false })).toContainText('Niloy-Bhuiyan/IncidentLens')
  await expect(page.getByText('50.8%', { exact: true })).toBeAttached()
  expect(await page.locator('a[href^="#"]').evaluateAll(links => links.every(link => !!document.getElementById((link.getAttribute('href') || '').slice(1))))).toBe(true)
  expect(await page.locator('a[target="_blank"]').evaluateAll(links => links.every(link => link.getAttribute('rel')?.includes('noopener')))).toBe(true)
})

test('WCAG A/AA automated accessibility checks pass', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(results.violations).toEqual([])
})

test('normal-motion mode reveals content and active navigation follows scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await page.locator('#research').scrollIntoViewIfNeeded()
  await expect(page.locator('#research')).toHaveClass(/is-visible/)
  await expect(page.locator('#main-navigation a[href="#research"]')).toHaveAttribute('aria-current', 'location')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await expect(page.locator('#contact')).toHaveClass(/is-visible/)
})
