import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { pages } from '../src/routes.ts'

// Pages serves real directories; no redirect shim, server rewrite, or 404-as-200 is needed.
const shell = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

for (const page of pages) {
  const url = `https://rifatur17.github.io${page.path}`
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(page.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g, `$1${escape(page.title)}`)
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*/g, `$1${escape(page.description)}`)
  const directory = new URL(`../dist${page.path}`, import.meta.url)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}

await writeFile(new URL('../dist/404.html', import.meta.url), shell.replace(/<title>.*?<\/title>/, '<title>Page not found — Rifatur Rahman</title>').replace('</head>', '<meta name="robots" content="noindex" /></head>'))
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>https://rifatur17.github.io${page.path}</loc></url>`).join('')}</urlset>\n`)
console.log(`Generated ${pages.length} static route entries, sitemap, and 404 page.`)
