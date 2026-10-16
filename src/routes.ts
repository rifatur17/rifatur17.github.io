export const pages = [
  { id: 'home', label: 'Home', path: '/', title: 'Rifatur Rahman — Full-Stack Developer', description: 'Rifatur Rahman, Full-Stack Developer and CSE student at AIUB. Selected .NET applications, web engineering, AI systems, and research.' },
  { id: 'about', label: 'About', path: '/about/', title: 'About — Rifatur Rahman', description: 'Meet Rifatur Rahman, a CSE student at AIUB exploring full-stack development, .NET, AI engineering, and academic research.' },
  { id: 'skills', label: 'Skills', path: '/skills/', title: 'Technical Skills — Rifatur Rahman', description: 'Rifatur Rahman’s toolkit across languages, backend, frontend, mobile, databases, testing, and continuous integration.' },
  { id: 'projects', label: 'Projects', path: '/projects/', title: 'Selected Projects — Rifatur Rahman', description: 'Explore StockPilot, IncidentLens, the Hospital Appointment System, and Solar System Simulation, with verified contributions and repository links.' },
  { id: 'research', label: 'Research', path: '/research/', title: 'Research — Rifatur Rahman', description: 'Research on source-label recall, trust, and de-influencing content. Study design, verified findings, manuscript, and analysis.' },
  { id: 'leadership', label: 'Leadership', path: '/leadership/', title: 'Academic Leadership — Rifatur Rahman', description: 'Academic leadership through research coordination, collaborative .NET and web projects, implementation, and delivery.' },
  { id: 'education', label: 'Education & Certifications', path: '/education/', title: 'Education & Certifications — Rifatur Rahman', description: 'Computer Science and Engineering at AIUB, selected coursework, AI Engineering Bootcamp, and Networking Fundamentals.' },
  { id: 'contact', label: 'Contact', path: '/contact/', title: 'Contact — Rifatur Rahman', description: 'Connect with Rifatur Rahman about software development, full-stack engineering, AI systems, and technical projects.' },
] as const

export function pageForPath(pathname: string) {
  return pages.find(page => page.path === (pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`))
}
