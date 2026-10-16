# Rifatur Rahman — portfolio

An original editorial portfolio for a full-stack developer and AIUB CSE student. Near-black surfaces, restrained electric blue, self-hosted type, and project-specific technical visuals.

**Website:** https://rifatur17.github.io/

**Repository:** https://github.com/rifatur17/rifatur17.github.io

## Develop

Requires Node.js 24 and npm. This is a static React + Vite + TypeScript site; no backend, credentials, or environment file is needed.

```sh
npm ci
npm run dev
```

Edit profile, skills, research, and project metadata in `src/data.ts`. Components are in `src/App.tsx` and `src/Visuals.tsx`; design tokens and responsive rules are in `src/styles.css`. Fonts are bundled from Fontsource, not requested from a third-party CDN at runtime.

## Verify

```sh
npm run lint
npm run typecheck
npm run build
npm audit
npm test
```

Local browser tests use installed Google Chrome. CI uses Playwright Chromium. If Chrome is unavailable locally, first run `npx playwright install chromium` and change the local `channel` in `playwright.config.ts` to use that browser instead. Test outputs are ignored by Git.

Tests cover four viewport widths (1440, 834, 390, 320), navigation and focus, menu/Escape behavior, anchor offsets, active sections, reduced motion, overflow, asset failures, contact/project destinations, CV download bytes, SEO assets, and automated WCAG A/AA checks. Automated accessibility checks cannot establish complete accessibility or every assistive-technology interaction.

Run the same checks against a deployed site in PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'https://rifatur17.github.io'
npm test
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

## Deploy

GitHub Pages is configured to use GitHub Actions. Pushes to `main` run lint, TypeScript/build, a full npm audit, and browser checks before uploading `dist/` and deploying. Pull requests run verification without deploying. Actions are pinned to immutable commit hashes. Vite's base is `/` for the account's root Pages domain.

No source CV, other project repository, or original project history is modified by this site. See [content sources](docs/content-sources.md) for provenance and contribution boundaries.

## Assets and content

- `public/assets/Rifatur_Rahman_CV.pdf` is an unchanged copy of the latest supplied CV.
- The portrait is the genuine embedded photo extracted from that CV.
- The StockPilot preview is an actual screenshot captured with isolated test data.
- IncidentLens, hospital, and orbital figures are original labeled illustrations, not fake screenshots.
- IncidentLens retains upstream authorship; its demo is explicitly the upstream deployment.
- Research figures are reported from the supplied manuscript and analysis; no publication acceptance is claimed.

Font licenses are included in the installed Fontsource packages. Lucide icons are ISC licensed. Portfolio photographs, CV, and personal research content remain their respective owners' materials.
