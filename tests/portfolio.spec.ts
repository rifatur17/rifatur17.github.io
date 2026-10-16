import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createHash } from 'node:crypto'
import { profile, projects, research } from '../src/data'
import { pages } from '../src/routes'

for (const destination of pages) {
  test(`${destination.label}: direct URL, refresh, assets, metadata, layout and accessibility`, async ({ page }, testInfo) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
    const response = await page.goto(destination.path)
    expect(response?.status()).toBe(200)
    // Inspect the actual static HTML as well as the client-updated metadata.
    expect(await response!.text()).toContain(`<title>${destination.title.replaceAll('&', '&amp;')}</title>`)
    await expect(page).toHaveTitle(destination.title)
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator(`main #${destination.id}`)).toBeVisible()
    await expect(page.locator('main > .page-stage > section')).toHaveCount(1)
    await expect(page.locator(`#main-navigation a[href="${destination.path}"]`)).toHaveAttribute('aria-current', 'page')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://rifatur17.github.io${destination.path}`)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://rifatur17.github.io${destination.path}`)
    expect((await page.reload())?.status()).toBe(200)
    await expect(page.locator('main h1')).toBeVisible()
    if (destination.id !== 'home') {
      const withoutSlash = await page.request.get(destination.path.replace(/\/$/, ''))
      expect(withoutSlash.status()).toBe(200)
    }
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate(async el => { if (el instanceof HTMLImageElement) await el.decode() })
    }
    await page.evaluate(() => document.fonts.ready)
    expect(await page.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.locator('footer').scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    expect(await page.locator('.reveal').evaluateAll(elements => elements.every(el => getComputedStyle(el).animationName === 'none'))).toBe(true)
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(accessibility.violations).toEqual([])
    expect(errors).toEqual([])
    await page.screenshot({ path: testInfo.outputPath(`${destination.id}.png`), fullPage: true })
  })
}

test('Home contains only the landing experience and Explore Portfolio opens Projects', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RifaturRahman.')
  await expect(page.getByText('Full-Stack Developer', { exact: true })).toBeVisible()
  await expect(page.locator('#projects, #research, #education, #contact, .project, .skill-table')).toHaveCount(0)
  await expect(page.locator('.hero-portrait img')).toHaveAttribute('src', '/assets/rifatur-professional-portrait.jpg')
  if (page.viewportSize()!.width <= 650) {
    const portrait = (await page.locator('.hero-portrait').boundingBox())!
    const copy = (await page.locator('.hero-copy').boundingBox())!
    expect(portrait.width).toBeGreaterThanOrEqual(page.viewportSize()!.width * .7)
    expect(portrait.y).toBeGreaterThanOrEqual(copy.y + copy.height)
  }
  await page.getByRole('link', { name: 'Explore Portfolio', exact: false }).click()
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page.locator('main h1')).toBeFocused()
  await page.getByRole('link', { name: 'Rifatur Rahman home' }).click()
  await page.getByRole('link', { name: 'Explore Projects', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/$/)
})

test('navigation reaches all eight pages, closes mobile menu, resets scroll and moves focus', async ({ page }) => {
  await page.goto('/')
  for (const destination of [...pages.slice(1), pages[0]]) {
    const menu = page.getByRole('button', { name: 'Open navigation menu' })
    if (await menu.isVisible()) await menu.click()
    await page.getByRole('navigation').getByRole('link', { name: destination.label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${destination.path}$`))
    await expect(page.locator('main h1')).toBeFocused()
    await expect(page.locator(`#main-navigation a[href="${destination.path}"]`)).toHaveAttribute('aria-current', 'page')
    await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveCount(0)
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    const heading = await page.locator('main h1').boundingBox()
    const header = await page.locator('header').boundingBox()
    expect(heading!.y).toBeGreaterThanOrEqual(header!.height)
  }
  // Even a Home link on Home must return focus and scrolling to the hero.
  await page.locator('footer').scrollIntoViewIfNeeded()
  await page.getByRole('link', { name: 'Return Home', exact: true }).click()
  await expect(page.locator('main h1')).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})

test('Back and Forward restore page, title and active navigation without document reloads', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => { document.documentElement.dataset.navigationProbe = 'retained' })
  await page.getByRole('link', { name: 'Explore Portfolio', exact: false }).click()
  await page.getByRole('link', { name: 'Return Home', exact: true }).click()
  await page.goBack()
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page).toHaveTitle('Selected Projects — Rifatur Rahman')
  await page.goBack()
  await expect(page).toHaveURL(/\.github\.io\/$|:4173\/$/)
  await page.goForward()
  await expect(page).toHaveURL(/\/projects\/$/)
  await expect(page.locator('#main-navigation a[href="/projects/"]')).toHaveAttribute('aria-current', 'page')
  expect(await page.locator('html').getAttribute('data-navigation-probe')).toBe('retained')
})

test('keyboard skip link, mobile focus loop and Escape work', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
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

test('CV is the exact supplied PDF, downloads, and shared static assets exist', async ({ page, request }) => {
  await page.goto('/')
  const cv = await request.get(profile.cv)
  expect(cv.status()).toBe(200)
  expect(cv.headers()['content-type']).toContain('application/pdf')
  const bytes = await cv.body()
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-')
  expect(createHash('sha256').update(bytes).digest('hex')).toBe('2c7cfe202477509c94df4014b6317d26a959300b9b53a8e91a8164c557b5ce8d')
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download CV', exact: true }).click()
  expect((await downloadEvent).suggestedFilename()).toBe('Rifatur_Rahman_CV.pdf')
  for (const asset of ['/favicon.svg', '/assets/social-preview.png', '/robots.txt', '/sitemap.xml']) expect((await request.get(asset)).status()).toBe(200)
  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const destination of pages) expect(sitemap).toContain(`<loc>https://rifatur17.github.io${destination.path}</loc>`)
})

test('verified links, contributions, research and new photos remain accurate', async ({ page, request }) => {
  await page.goto('/projects/')
  for (const project of Object.values(projects)) await expect(page.locator(`a[href="${project.repo}"]`)).toHaveCount(1)
  await expect(page.locator(`a[href="${projects.incidentlens.demo}"]`)).toHaveCount(1)
  await expect(page.getByText('Maintained fork of', { exact: false })).toContainText('Niloy-Bhuiyan/IncidentLens')
  await expect(page.getByText('I implemented authentication and doctor administration;', { exact: false })).toBeVisible()
  await page.goto('/research/')
  await expect(page.locator(`a[href="${research.paper}"]`)).toHaveCount(1)
  await expect(page.getByText('50.8%', { exact: true })).toBeVisible()
  await page.goto('/about/')
  await expect(page.locator('.portrait-wrap img')).toHaveAttribute('src', '/assets/rifatur-professional-portrait.jpg')
  await page.goto('/contact/')
  await expect(page.locator(`a[href="${profile.linkedin}"]`)).toHaveCount(1)
  await expect(page.locator(`a[href="mailto:${profile.email}"]`)).toHaveCount(3)
  expect(await page.locator('a[target="_blank"]').evaluateAll(links => links.every(link => link.getAttribute('rel')?.includes('noopener')))).toBe(true)
  for (const [asset, hash] of [
    ['/assets/rifatur-professional-portrait.jpg', 'f91a0f43bd9409b9a625266c5c325d765f5fbd50288aac0a157e5017df768baa'],
    ['/assets/rifatur-outdoor-portrait.jpg', '62310562f5c794ba99eae5727aca7015811de34140697c9e9dd27b57859f2d82'],
  ]) {
    const response = await request.get(asset)
    expect(response.status()).toBe(200)
    expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(hash)
  }
})

test('normal motion reveals each new route and respects later route visits', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/research/')
  await expect(page.locator('#research')).toHaveClass(/is-visible/)
  await page.getByRole('link', { name: 'Return Home', exact: true }).click()
  await page.getByRole('link', { name: 'Explore Portfolio', exact: false }).click()
  await expect(page.locator('.projects-section > div.reveal').first()).toHaveClass(/is-visible/)
  await page.locator('.project-stock').scrollIntoViewIfNeeded()
  await expect(page.locator('.project-stock')).toHaveClass(/is-visible/)
})

test('unknown destinations show a useful page with a working Home link', async ({ page }) => {
  await page.goto('/not-a-portfolio-page/')
  await expect(page.getByRole('heading', { name: 'A different path.' })).toBeVisible()
  await page.getByRole('link', { name: 'Return Home', exact: true }).first().click()
  await expect(page.locator('#home')).toBeVisible()
})


test('footer provides a complete page journey and About offers the supplied CV', async ({ page }) => {
  await page.goto('/')
  for (const destination of [...pages.slice(1), pages[0]]) {
    await page.getByRole('link', { name: `Next page: ${destination.label}`, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${destination.path}$`))
    await expect(page.locator('main h1')).toBeFocused()
  }
  await page.goto('/about/')
  const download = page.waitForEvent('download')
  await page.getByRole('link', { name: 'Download CV', exact: true }).click()
  expect((await download).suggestedFilename()).toBe('Rifatur_Rahman_CV.pdf')
})
