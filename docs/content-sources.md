# Content provenance and attribution

Verified against the supplied files and public repositories on 16 October 2026.

## Profile and CV

Primary source: the newer `Rifatur_Rahman_CV (1).pdf` supplied in Downloads. Both available CV PDFs were read; the newer version's skills align with the requested seven groups. Its education, leadership, certifications, and contact details inform this site. No graduation date, GPA, employment, availability, or proficiency percentage is invented.

The LinkedIn destination `https://www.linkedin.com/in/rifatur-rahman11/` is verified from the CV's link annotation. LinkedIn returns HTTP 999 to automated retrieval; that restriction does not establish a broken profile. The site uses the supplied actual URL.

CV SHA-256: `2c7cfe202477509c94df4014b6317d26a959300b9b53a8e91a8164c557b5ce8d`. The public and built copies must retain these bytes. The redesign's explicitly supplied `Rifatur_Rahman_CV (1).pdf` was checked and matches this existing copy exactly; it was copied unchanged, not regenerated or replaced with an older CV.

## Supplied redesign photographs

- `1000166477.jpg.jpeg` → `public/assets/rifatur-professional-portrait.jpg`: blazer portrait explicitly selected again for the final polish, used on Home and About, 173,659 bytes.
- `FB_IMG_1792153872813.jpg.jpeg` → `public/assets/rifatur-outdoor-portrait.jpg`: outdoor personal photo retained as an available asset, 48,961 bytes; the final About page uses the explicitly selected blazer portrait. No research, event, or professional-employment context is inferred from it.

Both local images were visually inspected. Their original bytes are preserved; responsive CSS controls framing. At these sizes no lossy recompression is needed. They are not fabricated faces or project screenshots. Browser tests compare the served image hashes with the supplied files. The earlier portrait extracted from the CV is retained, along with the existing project and social assets.

## Project claims

| Project | Sources | Scope and attribution |
| --- | --- | --- |
| StockPilot | Public repository, implementation, README, verification materials, actual dashboard screenshot | Rifatur's full-stack inventory/sales project. Identity/four roles, atomic inventory, POS/invoices/payments/returns/reports and automated testing are implemented. Screenshot uses isolated fixtures, not production transactions. No verified live deployment. |
| IncidentLens | Repository README, Git history, `backend/app/retrieval/engine.py`, `backend/app/agents/graph.py` | History-preserving fork of Niloy-Bhuiyan/IncidentLens. Original application authorship remains upstream. Rifatur's verified work is migration, dependency security, glob compatibility, and CI/browser fixes. Retrieval uses in-process feature-hash vectors, BM25, and reciprocal rank fusion; do not imply a managed vector database. Demo is the upstream Vercel deployment. |
| Hospital Appointment System | Team repository, Git authorship, requirements/development docs | Rifatur's features are authentication, patient/staff management, specializations, doctor profiles, and availability. Teammate's features are booking and appointment dashboards. Avoid a team-size claim because supplied CV and earlier allocation differ. No verified live deployment. |
| Solar System Simulation | Public repository's `main.cpp` | C++/OpenGL/GLUT source implements orbital and self rotation, keyboard input, camera views, lighting, moons, and rings. Original orbit artwork here is illustrative; no app screenshot or browser demo was available. |

Project repository links were verified through GitHub. The IncidentLens upstream landing and investigation demo returned HTTP 200. No live buttons are created for the other three projects.

## Research

Sources: supplied `results.txt`, research PDF, CV, and the research repository. Research team leadership and four-member team are sourced from the CV. The study retained 183 valid participants from 202 raw responses, with 117 human-label and 66 AI-label conditions.

The 50.8% result is **correct source attribution across both conditions**, rather than an AI-condition-only noticing rate. R² 0.578 is cross-validated ridge regression for trust; AUC 0.879 is cross-validated logistic regression for anti-consumption response. This is a birthday-half allocation, between-subjects questionnaire study. Do not claim strict random assignment, causal effects, production performance, or publication acceptance.

The original portfolio reference was visually inspected for broad inspiration only. Its source, biography, branding, metrics, and photographs are not reused.
