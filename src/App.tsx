import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from './data'
import { pages, pageForPath } from './routes'
import { AboutPage, ContactPage, EducationPage, HomePage, LeadershipPage, ProjectsPage, ResearchPage, SkillsPage } from './Pages'

function Navigation() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const links = panel.current?.querySelectorAll('a')
        if (!links?.length) return
        if (document.activeElement === toggle.current) {
          event.preventDefault()
          ;(event.shiftKey ? links[links.length - 1] : links[0]).focus()
        } else if ((!event.shiftKey && document.activeElement === links[links.length - 1]) || (event.shiftKey && document.activeElement === links[0])) {
          event.preventDefault()
          toggle.current?.focus()
        }
      }
    }
    const onResize = () => { if (window.innerWidth > 1050) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) }
  }, [open])

  return <header className="site-header"><div className="header-inner">
    <Link className="wordmark" to="/" aria-label="Rifatur Rahman home" onClick={() => setOpen(false)}>R<span className="wordmark-dot">.</span><span className="wordmark-name">RIFATUR RAHMAN</span></Link>
    <button ref={toggle} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}>{open ? <X /> : <Menu />}</button>
    <nav ref={panel} id="main-navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>
      {pages.map(page => <NavLink key={page.id} to={page.path} end onClick={() => setOpen(false)}>{page.label}</NavLink>)}
    </nav>
    <a href={`mailto:${profile.email}`} className="header-contact" aria-label="Email Rifatur"><ArrowUpRight size={20} /></a>
  </div></header>
}

function RouteEffects() {
  const location = useLocation()
  const previousLocation = useRef(location.key)

  useEffect(() => {
    const page = pageForPath(location.pathname)
    const title = page?.title || 'Page not found — Rifatur Rahman'
    const description = page?.description || 'This portfolio page could not be found. Return to Rifatur Rahman’s homepage.'
    const url = `https://rifatur17.github.io${page?.path || location.pathname}`
    document.title = title
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', description)
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', title)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)

    if (previousLocation.current !== location.key && location.hash !== '#main') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
    }
    previousLocation.current = location.key

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.06 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname, location.key, location.hash])
  return null
}

function NotFound() {
  return <section className="container destination not-found"><p className="eyebrow blue">404 / PAGE NOT FOUND</p><h1 className="page-title" tabIndex={-1}>A different path.</h1><p>This destination isn’t part of the portfolio.</p><Link className="button button-primary" to="/">Return Home <ArrowRight size={17} /></Link></section>
}

export default function App() {
  const location = useLocation()
  return <div className="site-shell">
    <a href="#main" className="skip-link">Skip to content</a>
    <Navigation />
    <RouteEffects />
    <main id="main" tabIndex={-1}>
      <div className="page-stage" key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
    <footer className="site-footer container"><p>© {new Date().getFullYear()} Rifatur Rahman</p><span>BUILT WITH INTENT.</span><Link to="/">Return Home <ArrowRight size={15} /></Link></footer>
  </div>
}
