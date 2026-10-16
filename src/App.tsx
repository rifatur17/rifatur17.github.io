import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, CodeXml, ContactRound, Mail, Menu, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { coursework, navigation, profile, projects, research, skills } from './data'
import { AppointmentVisual, OrbitVisual, RetrievalVisual } from './Visuals'

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="section-label"><span>{number}</span><span>{children}</span></p>
}

function ProjectDetails({ project }: { project: (typeof projects)[keyof typeof projects] }) {
  return <div className="project-details">
    <p className="project-role">{project.role}</p>
    <p className="project-summary">{project.summary}</p>
    <p className="project-problem">{project.problem}</p>
    <p className="project-solution">{project.solution}</p>
    <ul className="project-highlights">{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>
    <ul className="stack" aria-label={`${project.name} technology stack`}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
    <div className="project-links"><ExternalLink href={project.repo}>View repository</ExternalLink>{'demo' in project && <ExternalLink href={project.demo}>Upstream live demo</ExternalLink>}</div>
  </div>
}

function Navigation() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLElement>(null)

  useEffect(() => {
    const update = () => {
      let id = 'home'
      for (const name of navigation) {
        const section = document.getElementById(name.toLowerCase())
        if (section && section.getBoundingClientRect().top <= 180) id = section.id
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12) id = 'contact'
      setActive(id)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const links = panel.current?.querySelectorAll('a')
        if (!links?.length) return
        if (!event.shiftKey && document.activeElement === links[links.length - 1]) { event.preventDefault(); toggle.current?.focus() }
        else if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); toggle.current?.focus() }
        else if (document.activeElement === toggle.current) { event.preventDefault(); (event.shiftKey ? links[links.length - 1] : links[0]).focus() }
      }
    }
    const onResize = () => { if (window.innerWidth > 900) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) }
  }, [open])

  function navigate(id: string) {
    setActive(id)
    setOpen(false)
    // Move keyboard focus to the destination after closing the mobile menu.
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }

  return <header className="site-header"><div className="header-inner">
    <a className="wordmark" href="#home" aria-label="Rifatur Rahman home" onClick={() => navigate('home')}>R<span className="wordmark-dot">.</span><span className="wordmark-name">RIFATUR RAHMAN</span></a>
    <button ref={toggle} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}>{open ? <X /> : <Menu />}</button>
    <nav ref={panel} id="main-navigation" aria-label="Main navigation" className={open ? 'navigation is-open' : 'navigation'}>{navigation.map(name => {
      const id = name.toLowerCase()
      return <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => navigate(id)}>{name}</a>
    })}</nav>
    <a href={`mailto:${profile.email}`} className="header-contact" aria-label="Email Rifatur"><ArrowUpRight size={20} /></a>
  </div></header>
}

function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.06 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <Navigation />
    <main id="main" tabIndex={-1}>
      <section id="home" tabIndex={-1} className="hero container">
        <div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> SOFTWARE DEVELOPMENT · AI ENGINEERING</span><span className="hero-location">DHAKA, BANGLADESH</span></div>
        <div className="hero-grid"><div className="hero-copy">
          <p className="hero-intro">Hello, I’m</p>
          <h1>Rifatur<br /><span>Rahman</span><span className="name-period">.</span></h1>
          <p className="hero-role">Full-Stack Developer</p>
          <p className="hero-description">I build .NET applications, modern web experiences, and AI-powered systems—connecting thoughtful interfaces with the engineering underneath.</p>
          <div className="hero-actions"><a href="#projects" className="button button-primary">Explore Projects <ArrowDown size={17} /></a><a href={profile.cv} className="button button-secondary" download>Download CV <ArrowDownToLine size={17} /></a></div>
          <div className="hero-socials"><ExternalLink href={profile.github}><CodeXml size={17} /> GitHub</ExternalLink><ExternalLink href={profile.linkedin}><ContactRound size={17} /> LinkedIn</ExternalLink></div>
        </div><div className="hero-art"><OrbitVisual /><p className="hero-art-caption"><span>ENGINEERING, END TO END.</span><span>01—04</span></p></div></div>
        <div className="hero-bottom"><span>THOUGHTFUL INTERFACES. SOLID FOUNDATIONS.</span><a href="#about">A little about me <ArrowDown size={15} /></a></div>
      </section>

      <section id="about" tabIndex={-1} className="section about-section container reveal">
        <SectionLabel number="01">THE PERSON BEHIND THE CODE</SectionLabel>
        <div className="about-grid"><div className="portrait-wrap"><img src="/assets/rifatur-portrait.jpg" alt="Rifatur Rahman" width="952" height="1110" loading="lazy" /><span className="portrait-mark" aria-hidden="true">RR /</span><p>RIFATUR RAHMAN <span>DHAKA, BD</span></p></div><div className="about-copy">
          <h2>Curious by nature.<br /><span className="muted">Builder by practice.</span></h2>
          <p className="large-copy">I’m a Computer Science and Engineering student at AIUB, working across full-stack development, .NET, and AI engineering.</p>
          <p>I enjoy understanding how the pieces fit: the interface someone uses, the data it relies on, and the backend that makes it work. My projects span inventory workflows, incident analysis, healthcare scheduling, and interactive graphics.</p>
          <p>Alongside software, I lead academic research and collaborate on team projects—from shaping an idea to implementing, testing, and documenting it.</p>
          <div className="focus-areas"><span>.NET Development</span><span>Web Technologies</span><span>AI & Machine Learning</span></div>
        </div></div>
      </section>

      <section id="skills" tabIndex={-1} className="section skills-section container reveal">
        <SectionLabel number="02">TOOLS OF THE TRADE</SectionLabel>
        <div className="section-heading"><h2>Across the <span className="muted">stack.</span></h2><p>A working toolkit for turning an idea into a complete application.</p></div>
        <div className="skill-table">{skills.map((group, i) => <div className="skill-row" key={group.title}><span className="skill-number">0{i + 1}</span><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
      </section>

      <section id="projects" tabIndex={-1} className="section projects-section container">
        <div className="reveal"><SectionLabel number="03">SELECTED WORK</SectionLabel><div className="section-heading"><h2>Built to <span className="muted">work.</span><br />Designed to make sense.</h2><p>A selection of applications, engineering work, and experiments. Each solves a different kind of problem.</p></div></div>
        <article className="project project-stock reveal" aria-labelledby="stockpilot-title"><div className="project-title-row"><span className="project-index">01 / FEATURED</span><span className="project-category">BUSINESS SOFTWARE</span></div><h3 id="stockpilot-title" className="project-title">StockPilot<span className="blue">↗</span></h3><div className="stock-grid"><figure className="stock-figure"><div className="preview-chrome"><span><i /><i /><i /></span><span>STOCKPILOT / OVERVIEW</span><span>ASP.NET CORE</span></div><img src="/assets/stockpilot-dashboard.png" alt="StockPilot dashboard with navigation, inventory summaries, recent sales, and reporting" width="1440" height="1000" loading="lazy" /><figcaption>Application screenshot · isolated test data</figcaption></figure><ProjectDetails project={projects.stockpilot} /></div></article>
        <article className="project project-incident reveal" aria-labelledby="incidentlens-title"><div className="incident-grid"><div><div className="project-title-row"><span className="project-index">02 / FEATURED</span><span className="project-category">AI ENGINEERING</span></div><h3 id="incidentlens-title" className="project-title">Incident<span className="muted">Lens</span></h3><ProjectDetails project={projects.incidentlens} /><p className="attribution">Maintained fork of <ExternalLink href={projects.incidentlens.upstream}>Niloy-Bhuiyan/IncidentLens</ExternalLink>. Demo is the upstream deployment.</p></div><figure className="retrieval-figure"><RetrievalVisual /><figcaption>Architecture illustration · based on the repository</figcaption></figure></div></article>
        <div className="additional-heading reveal"><span className="eyebrow">MORE TO EXPLORE</span><p>Different problems. The same curiosity.</p></div>
        <article className="project project-small reveal" aria-labelledby="hospital-title"><div className="small-project-grid"><figure><AppointmentVisual /><figcaption>Interface illustration · not an application screenshot</figcaption></figure><div><span className="project-index">03 / HEALTHCARE</span><h3 id="hospital-title">Hospital Appointment<br /><span className="muted">System</span></h3><ProjectDetails project={projects.hospital} /></div></div></article>
        <article className="project project-small project-solar reveal" aria-labelledby="solar-title"><div className="small-project-grid"><div><span className="project-index">04 / COMPUTER GRAPHICS</span><h3 id="solar-title">A small window<br /><span className="muted">into the solar system.</span></h3><p className="project-name-small">Solar System Simulation</p><ProjectDetails project={projects.solar} /></div><figure className="solar-figure"><OrbitVisual compact /><figcaption>Original orbital illustration · not a simulation screenshot</figcaption></figure></div></article>
      </section>

      <section id="research" tabIndex={-1} className="section research-section reveal"><div className="container">
        <SectionLabel number="04">RESEARCH & EXPLORATION</SectionLabel><div className="research-grid"><div className="research-heading"><p className="eyebrow blue">HUMAN–AI INTERACTION</p><h2>When a label<br /><span className="muted">goes unnoticed.</span></h2><span className="research-stamp">RESEARCH TEAM LEAD<br />FOUR-MEMBER TEAM</span></div><div className="research-copy"><h3>{research.title}</h3><p>Does naming the source change how people respond? Our study examined source-label recall, trust, and self-reported anti-consumption responses to identical de-influencing content attributed to a human or AI.</p><p>A between-subjects online questionnaire used birthday-half allocation into two label conditions. I led research coordination, design, analysis, and manuscript-writing activities.</p><div className="research-links"><ExternalLink href={research.paper}>Read manuscript</ExternalLink><ExternalLink href={research.repo}>Analysis & results</ExternalLink></div><ul className="stack" aria-label="Research analysis tools">{['Python', 'pandas', 'SciPy', 'scikit-learn'].map(x => <li key={x}>{x}</li>)}</ul></div></div>
        <div className="research-metrics">{research.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.detail}</p></div>)}</div><p className="research-note">Findings from the supplied study and analysis. Predictive estimates are cross-validated; they are not causal effects or production benchmarks. Manuscript status does not imply publication acceptance.</p>
      </div></section>

      <section id="leadership" tabIndex={-1} className="section leadership-section container reveal"><SectionLabel number="05">WORKING TOGETHER</SectionLabel><div className="section-heading"><h2>Good work is<br /><span className="muted">a shared effort.</span></h2><p>Academic leadership through research, collaboration, and project delivery.</p></div><div className="leadership-list"><article><span className="timeline-index">01</span><div><p className="eyebrow">ACADEMIC RESEARCH</p><h3>Research Team Lead</h3><p>Coordinated a four-member team through study design, analysis, and paper writing for the de-influencing source-label study.</p></div><ArrowUpRight aria-hidden="true" /></article><article><span className="timeline-index">02</span><div><p className="eyebrow">.NET & WEB TECHNOLOGIES</p><h3>Academic Project Team Lead</h3><p>Organized tasks, coordinated implementation, and supported collaboration and delivery across academic software projects.</p></div><ArrowUpRight aria-hidden="true" /></article></div></section>

      <section id="education" tabIndex={-1} className="section education-section container reveal"><SectionLabel number="06">FOUNDATIONS & CONTINUED LEARNING</SectionLabel><div className="education-grid"><div><p className="eyebrow">EDUCATION</p><h2>Learning.<br /><span className="muted">Then building.</span></h2><h3>BSc in Computer Science & Engineering</h3><p>{profile.university} (AIUB)</p><p className="muted">Current CSE student · Dhaka, Bangladesh</p></div><div><p className="eyebrow">SELECTED COURSEWORK</p><ul className="coursework">{coursework.map(item => <li key={item}>{item}</li>)}</ul><p className="eyebrow certifications-label">CERTIFICATIONS & WORKSHOPS</p><div className="certification"><span>AI Engineering Bootcamp</span><span>OSTAD · 2025</span></div><div className="certification"><span>Networking Fundamentals</span><span>CISCO</span></div></div></div></section>

      <section id="contact" tabIndex={-1} className="contact-section container reveal"><SectionLabel number="07">START A CONVERSATION</SectionLabel><div className="contact-heading"><h2>Have an idea?<br /><span className="muted">Let’s connect.</span></h2><a className="contact-arrow" href={`mailto:${profile.email}`} aria-label="Start a conversation by email"><ArrowUpRight size={66} strokeWidth={1.25} /></a></div><p className="contact-description">I’d enjoy talking about software development, full-stack engineering, AI systems, or a thoughtful technical project.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={22} /></a><div className="contact-bottom"><div><ExternalLink href={profile.github}><CodeXml size={18} />GitHub</ExternalLink><ExternalLink href={profile.linkedin}><ContactRound size={18} />LinkedIn</ExternalLink><a href={profile.cv} download><ArrowDownToLine size={18} />Download CV</a></div><span><Mail size={15} /> DHAKA, BANGLADESH</span></div></section>
    </main>
    <footer className="site-footer container"><p>© {new Date().getFullYear()} Rifatur Rahman</p><span>BUILT WITH INTENT.</span><a href="#home">Back to top <ArrowRight size={15} className="back-arrow" /></a></footer>
  </>
}

export default App
