import { Braces, CalendarDays, Check, FileCheck2, GitCommitHorizontal, Layers3, ScanSearch, ShieldCheck } from 'lucide-react'

export function OrbitVisual({ compact = false }: { compact?: boolean }) {
  return <div className={`orbit-visual ${compact ? 'orbit-compact' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 600 600" fill="none">
      <defs><radialGradient id={compact ? 'sun-small' : 'sun'}><stop stopColor="#A6C1FF" /><stop offset="1" stopColor="#4D7CFE" /></radialGradient></defs>
      <path d="M300 20V580M20 300H580" stroke="currentColor" strokeDasharray="3 9" />
      <circle cx="300" cy="300" r="270" stroke="currentColor" strokeDasharray="2 8" />
      <g transform="rotate(-32 300 300)">
        <ellipse cx="300" cy="300" rx="265" ry="115" stroke="#39445D" />
        <ellipse cx="300" cy="300" rx="210" ry="89" stroke="#4D7CFE" strokeOpacity=".65" />
        <ellipse cx="300" cy="300" rx="145" ry="61" stroke="#39445D" />
        <circle cx="35" cy="300" r="9" fill="#929CB0" />
        <circle cx="456" cy="240" r="14" fill="#4D7CFE" />
        <circle cx="198" cy="344" r="6" fill="#F3F6FC" />
      </g>
      <circle cx="300" cy="300" r={compact ? '30' : '66'} fill={`url(#${compact ? 'sun-small' : 'sun'})`} />
      {!compact && <><path d="M276 328v-56h25c15 0 22 7 22 18 0 9-5 15-14 18l20 20h-20l-18-20v20zm15-33h9c5 0 8-2 8-6s-3-6-8-6h-9z" fill="#08090D" /><text x="300" y="42" textAnchor="middle" className="svg-label" fill="#929CB0">SYSTEMS · INTERFACES · INTELLIGENCE</text><path d="M450 450h100v-30M150 150H50v30" stroke="#4D7CFE" /></>}
    </svg>
    {!compact && <><span className="orbit-label orbit-label-top">01 / BUILD WITH INTENT</span><span className="orbit-label orbit-label-bottom">.NET ↔ WEB ↔ AI</span></>}
  </div>
}

export function RetrievalVisual() {
  return <div className="retrieval-visual">
    <div className="diagram-bar"><span className="status-dot" /> EVIDENCE → RETRIEVAL → REASONING</div>
    <div className="evidence-inputs"><span><Braces /> Incident logs</span><span><GitCommitHorizontal /> Code changes</span></div>
    <div className="connector" />
    <div className="retrieval-core"><ScanSearch size={30} /><div><strong>Hybrid retrieval</strong><small>Feature-hash vectors + BM25</small></div></div>
    <div className="diagram-fork"><span>Rank fusion</span><span>LangGraph</span></div>
    <div className="connector" />
    <div className="citation-output"><FileCheck2 /><div><strong>Evidence-linked answers</strong><small>Citation verification</small></div><Check size={18} /></div>
    <div className="diagram-footer"><span>OPENAI / GEMINI</span><span>FASTAPI + NEXT.JS</span></div>
  </div>
}

export function AppointmentVisual() {
  return <div className="appointment-visual" aria-hidden="true">
    <div className="appointment-heading"><CalendarDays size={21} /><span>Appointment workspace</span><span className="tiny-square" /></div>
    <div className="schedule"><div className="schedule-label">PATIENT</div><div className="schedule-row"><span className="avatar-placeholder" /><div><i /><i /></div><span className="schedule-state">Request</span></div><div className="schedule-label">CARE TEAM</div><div className="week-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <span key={i} className={i < 5 ? 'weekday' : ''}>{day}</span>)}</div><div className="schedule-row"><ShieldCheck size={20} /><span>Role-based access</span><Check size={16} /></div><div className="schedule-row"><Layers3 size={20} /><span>PHP MVC architecture</span><Check size={16} /></div></div>
  </div>
}
