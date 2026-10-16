import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { projects } from './data'

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="section-label"><span>{number}</span><span>{children}</span></p>
}

export function ProjectDetails({ project }: { project: (typeof projects)[keyof typeof projects] }) {
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
