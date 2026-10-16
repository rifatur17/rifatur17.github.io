export const profile = {
  name: 'Rifatur Rahman',
  title: 'Full-Stack Developer',
  email: 'rifaturrahman1131@gmail.com',
  github: 'https://github.com/rifatur17',
  linkedin: 'https://www.linkedin.com/in/rifatur-rahman11/',
  cv: '/assets/Rifatur_Rahman_CV.pdf',
  university: 'American International University-Bangladesh',
  location: 'Dhaka, Bangladesh',
}

export const skills = [
  { title: 'Languages', items: ['C#', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'SQL', 'HTML', 'CSS'] },
  { title: 'Backend', items: ['ASP.NET Core', 'MVC', 'Web API', 'EF Core', '.NET Framework', 'Node.js', 'NestJS', 'REST APIs', 'WebSockets'] },
  { title: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap 5'] },
  { title: 'Mobile & CMS', items: ['Flutter', 'WordPress'] },
  { title: 'Databases', items: ['SQL Server', 'SSMS', 'MySQL', 'PostgreSQL', 'SQLite'] },
  { title: 'Testing & quality', items: ['Unit Testing', 'Integration Testing', 'Playwright', 'pytest', 'Vitest'] },
  { title: 'Version control & CI', items: ['Git', 'GitHub', 'GitHub Actions'] },
]

export const projects = {
  stockpilot: {
    id: '01', name: 'StockPilot', kind: 'Inventory & sales management',
    role: 'Full-stack implementation',
    summary: 'From purchase order to point of sale. One connected workflow.',
    problem: 'Inventory, purchases, and sales need to agree—even when requests arrive together.',
    solution: 'A layered .NET application connects receiving, POS, invoices, payments, returns, and reporting with transaction-safe stock updates.',
    highlights: ['Four roles with ASP.NET Core Identity', 'Atomic stock operations & overselling protection', 'Unit, SQL integration & browser coverage'],
    stack: ['C#', 'ASP.NET Core', 'EF Core', 'SQL Server', 'Bootstrap'],
    repo: 'https://github.com/rifatur17/StockPilot-Inventory-Sales-Management',
  },
  incidentlens: {
    id: '02', name: 'IncidentLens', kind: 'AI-assisted incident analysis',
    role: 'Repository maintenance · security & CI',
    summary: 'Connecting incident evidence to answers you can trace.',
    problem: 'Investigating incidents means piecing together fragmented logs and code changes.',
    solution: 'FastAPI and LangGraph connect hybrid vector/BM25 retrieval, model integration, and citation verification. My work focuses on dependency security, glob compatibility, and CI reliability.',
    highlights: ['Feature-hash vectors + BM25 + reciprocal rank fusion', 'LangGraph corrective retrieval & verified citations', 'Original upstream history and authors preserved'],
    stack: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Next.js'],
    repo: 'https://github.com/rifatur17/IncidentLens',
    demo: 'https://incidentlens-nine.vercel.app/investigations/demo',
    upstream: 'https://github.com/Niloy-Bhuiyan/IncidentLens',
  },
  hospital: {
    id: '03', name: 'Hospital Appointment System', kind: 'Patient & staff workflows',
    role: 'Team project · authentication & doctor administration',
    summary: 'A clearer path from patient registration to appointment management.',
    problem: 'Patients and staff need distinct, authorized workflows around a shared appointment schedule.',
    solution: 'A PHP MVC application brings together patients, doctors, specializations, booking, and dashboards. I implemented authentication and doctor administration; my teammate implemented booking and appointment dashboards.',
    highlights: ['Role-based authorization & secure sessions', 'Doctor profiles, specializations & weekday availability'],
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    repo: 'https://github.com/hospital-appointment-team/hospital-appointment-system',
  },
  solar: {
    id: '04', name: 'Solar System Simulation', kind: 'Interactive computer graphics',
    role: 'Academic graphics project',
    summary: 'Exploring motion, perspective, and light through code.',
    problem: 'Orbital relationships are easier to explore when they can be seen in motion.',
    solution: 'A C++ and OpenGL simulation models planetary orbits and rotation, with keyboard camera controls, lighting, moons, and rings.',
    highlights: ['Interactive planetary motion & camera views', 'OpenGL lighting, orbital paths & visual effects'],
    stack: ['C++', 'OpenGL', 'GLUT'],
    repo: 'https://github.com/rifatur17/Solar-System-Simulation',
  },
}

export const research = {
  title: 'Unnoticed Disclosure: Readers Do Not Register AI Source Labels on De-Influencing Content',
  repo: 'https://github.com/rifatur17/Unnoticed-Disclosure-Readers-Do-Not-Register-AI-Source-Labels-on-De-Influencing-Content',
  paper: 'https://github.com/rifatur17/Unnoticed-Disclosure-Readers-Do-Not-Register-AI-Source-Labels-on-De-Influencing-Content/blob/main/paper/Unnoticed%20Disclosure%20Readers%20Do%20Not%20Register%20AI.pdf',
  metrics: [
    { value: '183', label: 'Valid participants', detail: 'After consent and response-quality exclusions' },
    { value: '50.8%', label: 'Source-label recall', detail: 'Correct attribution across both label conditions' },
    { value: '0.578', label: 'Trust prediction · R²', detail: 'Cross-validated ridge regression' },
    { value: '0.879', label: 'Anti-consumption · AUC', detail: 'Cross-validated logistic regression' },
  ],
}

export const coursework = ['Algorithms', 'Databases', 'Object-Oriented Programming', 'Software Engineering', 'Computer Networks', 'Advanced Programming with .NET', 'Advanced Programming in Web Technologies', 'SQAT']
