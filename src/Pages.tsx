import { Link } from 'react-router-dom'
import { ArrowDown, ArrowDownToLine, ArrowUpRight, CodeXml, ContactRound, Mail } from 'lucide-react'
import { coursework, profile, projects, research, skills } from './data'
import { AppointmentVisual, OrbitVisual, RetrievalVisual } from './Visuals'
import { ExternalLink, SectionLabel, ProjectDetails } from './Shared'

export function HomePage() {
  return <section id="home" tabIndex={-1} className="hero container">
        <div className="hero-topline"><span className="eyebrow"><span className="status-dot" /> SOFTWARE DEVELOPMENT · AI ENGINEERING</span><span className="hero-location">DHAKA, BANGLADESH</span></div>
        <div className="hero-grid"><div className="hero-copy">
          <p className="hero-intro">Hello, I’m</p>
          <h1 tabIndex={-1}>Rifatur<br /><span>Rahman</span><span className="name-period">.</span></h1>
          <p className="hero-role">Full-Stack Developer</p>
          <p className="hero-description">I build .NET applications, modern web experiences, and AI-powered systems—connecting thoughtful interfaces with the engineering underneath.</p>
          <div className="hero-actions"><Link to="/projects/" className="button button-primary">Explore Projects <ArrowUpRight size={17} /></Link><a href={profile.cv} className="button button-secondary" download>Download CV <ArrowDownToLine size={17} /></a></div>
          <div className="hero-socials"><ExternalLink href={profile.github}><CodeXml size={17} /> GitHub</ExternalLink><ExternalLink href={profile.linkedin}><ContactRound size={17} /> LinkedIn</ExternalLink></div>
        </div><figure className="hero-portrait"><div className="portrait-frame"><img src="/assets/rifatur-professional-portrait.jpg" alt="Rifatur Rahman wearing a grey blazer and black shirt" width="1024" height="1536" fetchPriority="high" /><span className="portrait-frame-index" aria-hidden="true">RR / 01</span></div><figcaption><span>RIFATUR RAHMAN</span><span>FULL-STACK DEVELOPER</span></figcaption></figure></div>
        <div className="hero-bottom"><span>THOUGHTFUL INTERFACES. SOLID FOUNDATIONS.</span><Link to="/projects/" className="explore-hint">Explore Portfolio <span>CLICK TO EXPLORE</span><ArrowDown size={16} aria-hidden="true" /></Link></div>
      </section>
}

export function AboutPage() {
  return <section id="about" tabIndex={-1} className="section destination about-section container reveal">
        <SectionLabel number="01">THE PERSON BEHIND THE CODE</SectionLabel>
        <div className="about-grid"><div className="portrait-wrap"><img src="/assets/rifatur-outdoor-portrait.jpg" alt="Rifatur Rahman standing outdoors with his arms folded" width="979" height="982" /><span className="portrait-mark" aria-hidden="true">RR /</span><p>RIFATUR RAHMAN <span>DHAKA, BD</span></p></div><div className="about-copy">
          <h1 className="page-title" tabIndex={-1}>Curious by nature.<br /><span className="muted">Builder by practice.</span></h1>
          <p className="large-copy">I’m a Computer Science and Engineering student at AIUB, working across full-stack development, .NET, and AI engineering.</p>
          <p>I enjoy understanding how the pieces fit: the interface someone uses, the data it relies on, and the backend that makes it work. My projects span inventory workflows, incident analysis, healthcare scheduling, and interactive graphics.</p>
          <p>Alongside software, I lead academic research and collaborate on team projects—from shaping an idea to implementing, testing, and documenting it.</p>
          <div className="focus-areas"><span>.NET Development</span><span>Web Technologies</span><span>AI & Machine Learning</span></div>
        </div></div>
      </section>
}

export function SkillsPage() {
  return <section id="skills" tabIndex={-1} className="section destination skills-section container reveal">
        <SectionLabel number="02">TOOLS OF THE TRADE</SectionLabel>
        <div className="section-heading"><h1 className="page-title" tabIndex={-1}>Across the <span className="muted">stack.</span></h1><p>A working toolkit for turning an idea into a complete application.</p></div>
        <div className="skill-table">{skills.map((group, i) => <div className="skill-row" key={group.title}><span className="skill-number">0{i + 1}</span><h2>{group.title}</h2><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
      </section>
}

export function ProjectsPage() {
  return <section id="projects" tabIndex={-1} className="section destination projects-section container">
        <div className="reveal"><SectionLabel number="03">SELECTED WORK</SectionLabel><div className="section-heading"><h1 className="page-title" tabIndex={-1}>Built to <span className="muted">work.</span><br />Designed to make sense.</h1><p>A selection of applications, engineering work, and experiments. Each solves a different kind of problem.</p></div></div>
        <article className="project project-stock reveal" aria-labelledby="stockpilot-title"><div className="project-title-row"><span className="project-index">01 / FEATURED</span><span className="project-category">BUSINESS SOFTWARE</span></div><h2 id="stockpilot-title" className="project-title">StockPilot<span className="blue">↗</span></h2><div className="stock-grid"><figure className="stock-figure"><div className="preview-chrome"><span><i /><i /><i /></span><span>STOCKPILOT / OVERVIEW</span><span>ASP.NET CORE</span></div><img src="/assets/stockpilot-dashboard.png" alt="StockPilot dashboard with navigation, inventory summaries, recent sales, and reporting" width="1440" height="1000" loading="lazy" /><figcaption>Application screenshot · isolated test data</figcaption></figure><ProjectDetails project={projects.stockpilot} /></div></article>
        <article className="project project-incident reveal" aria-labelledby="incidentlens-title"><div className="incident-grid"><div><div className="project-title-row"><span className="project-index">02 / FEATURED</span><span className="project-category">AI ENGINEERING</span></div><h2 id="incidentlens-title" className="project-title">Incident<span className="muted">Lens</span></h2><ProjectDetails project={projects.incidentlens} /><p className="attribution">Maintained fork of <ExternalLink href={projects.incidentlens.upstream}>Niloy-Bhuiyan/IncidentLens</ExternalLink>. Demo is the upstream deployment.</p></div><figure className="retrieval-figure"><RetrievalVisual /><figcaption>Architecture illustration · based on the repository</figcaption></figure></div></article>
        <div className="additional-heading reveal"><span className="eyebrow">MORE TO EXPLORE</span><p>Different problems. The same curiosity.</p></div>
        <article className="project project-small reveal" aria-labelledby="hospital-title"><div className="small-project-grid"><figure><AppointmentVisual /><figcaption>Interface illustration · not an application screenshot</figcaption></figure><div><span className="project-index">03 / HEALTHCARE</span><h2 id="hospital-title">Hospital Appointment<br /><span className="muted">System</span></h2><ProjectDetails project={projects.hospital} /></div></div></article>
        <article className="project project-small project-solar reveal" aria-labelledby="solar-title"><div className="small-project-grid"><div><span className="project-index">04 / COMPUTER GRAPHICS</span><h2 id="solar-title">A small window<br /><span className="muted">into the solar system.</span></h2><p className="project-name-small">Solar System Simulation</p><ProjectDetails project={projects.solar} /></div><figure className="solar-figure"><OrbitVisual compact /><figcaption>Original orbital illustration · not a simulation screenshot</figcaption></figure></div></article>
      </section>
}

export function ResearchPage() {
  return <section id="research" tabIndex={-1} className="section destination research-section reveal"><div className="container">
        <SectionLabel number="04">RESEARCH & EXPLORATION</SectionLabel><div className="research-grid"><div className="research-heading"><p className="eyebrow blue">HUMAN–AI INTERACTION</p><h1 className="page-title" tabIndex={-1}>When a label<br /><span className="muted">goes unnoticed.</span></h1><span className="research-stamp">RESEARCH TEAM LEAD<br />FOUR-MEMBER TEAM</span></div><div className="research-copy"><h2>{research.title}</h2><p>Does naming the source change how people respond? Our study examined source-label recall, trust, and self-reported anti-consumption responses to identical de-influencing content attributed to a human or AI.</p><p>A between-subjects online questionnaire used birthday-half allocation into two label conditions. I led research coordination, design, analysis, and manuscript-writing activities.</p><div className="research-links"><ExternalLink href={research.paper}>Read manuscript</ExternalLink><ExternalLink href={research.repo}>Analysis & results</ExternalLink></div><ul className="stack" aria-label="Research analysis tools">{['Python', 'pandas', 'SciPy', 'scikit-learn'].map(x => <li key={x}>{x}</li>)}</ul></div></div>
        <div className="research-metrics">{research.metrics.map(metric => <div key={metric.label}><strong>{metric.value}</strong><h2>{metric.label}</h2><p>{metric.detail}</p></div>)}</div><p className="research-note">Findings from the supplied study and analysis. Predictive estimates are cross-validated; they are not causal effects or production benchmarks. Manuscript status does not imply publication acceptance.</p>
      </div></section>
}

export function LeadershipPage() {
  return <section id="leadership" tabIndex={-1} className="section destination leadership-section container reveal"><SectionLabel number="05">WORKING TOGETHER</SectionLabel><div className="section-heading"><h1 className="page-title" tabIndex={-1}>Good work is<br /><span className="muted">a shared effort.</span></h1><p>Academic leadership through research, collaboration, and project delivery.</p></div><div className="leadership-list"><article><span className="timeline-index">01</span><div><p className="eyebrow">ACADEMIC RESEARCH</p><h2>Research Team Lead</h2><p>Coordinated a four-member team through study design, analysis, and paper writing for the de-influencing source-label study.</p></div><ArrowUpRight aria-hidden="true" /></article><article><span className="timeline-index">02</span><div><p className="eyebrow">.NET & WEB TECHNOLOGIES</p><h2>Academic Project Team Lead</h2><p>Organized tasks, coordinated implementation, and supported collaboration and delivery across academic software projects.</p></div><ArrowUpRight aria-hidden="true" /></article></div></section>
}

export function EducationPage() {
  return <section id="education" tabIndex={-1} className="section destination education-section container reveal"><SectionLabel number="06">FOUNDATIONS & CONTINUED LEARNING</SectionLabel><div className="education-grid"><div><p className="eyebrow">EDUCATION</p><h1 className="page-title" tabIndex={-1}>Learning.<br /><span className="muted">Then building.</span></h1><h2>BSc in Computer Science & Engineering</h2><p>{profile.university} (AIUB)</p><p className="muted">Current CSE student · Dhaka, Bangladesh</p></div><div><p className="eyebrow">SELECTED COURSEWORK</p><ul className="coursework">{coursework.map(item => <li key={item}>{item}</li>)}</ul><p className="eyebrow certifications-label">CERTIFICATIONS & WORKSHOPS</p><div className="certification"><span>AI Engineering Bootcamp</span><span>OSTAD · 2025</span></div><div className="certification"><span>Networking Fundamentals</span><span>CISCO</span></div></div></div></section>
}

export function ContactPage() {
  return <section id="contact" tabIndex={-1} className="contact-section destination container reveal"><SectionLabel number="07">START A CONVERSATION</SectionLabel><div className="contact-heading"><h1 className="page-title" tabIndex={-1}>Have an idea?<br /><span className="muted">Let’s connect.</span></h1><a className="contact-arrow" href={`mailto:${profile.email}`} aria-label="Start a conversation by email"><ArrowUpRight size={66} strokeWidth={1.25} /></a></div><p className="contact-description">I’d enjoy talking about software development, full-stack engineering, AI systems, or a thoughtful technical project.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={22} /></a><div className="contact-bottom"><div><ExternalLink href={profile.github}><CodeXml size={18} />GitHub</ExternalLink><ExternalLink href={profile.linkedin}><ContactRound size={18} />LinkedIn</ExternalLink><a href={profile.cv} download><ArrowDownToLine size={18} />Download CV</a></div><span><Mail size={15} /> DHAKA, BANGLADESH</span></div></section>
}
