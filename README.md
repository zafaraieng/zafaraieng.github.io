# Zafarullah — Research Portfolio

Personal research portfolio of **Zafarullah**, undergraduate AI researcher at Emerson University Multan, Pakistan, exploring funded graduate research opportunities for Fall 2027.

Live site: **https://zafaraieng.github.io/**

## Focus areas

- **Computer Vision** — AI-generated image detection (CIFake benchmark)
- **Conversational AI** — NOVA-Mem memory-strategy evaluation framework, locally deployable RAG systems
- **Robotics & Embodied AI** — verified reading log on dexterous manipulation and egocentric-video learning

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui · Framer Motion

## Getting started

```bash
bun install        # or: npm install / pnpm install
bun run dev        # development server on http://localhost:3000
bun run lint       # ESLint
bun run build      # static production build (outputs to ./out)
```

Requires [Bun](https://bun.sh) 1.3.4 (or Node.js 20.9+ with npm — swap `bun` for `npm run`).

## Structure

```
src/
  app/
    page.tsx              # single-page portfolio (hero, about, research, projects,
                          #   experience, education & skills, credentials, contact)
    readings/page.tsx     # annotated reading log (10 papers)
    layout.tsx            # SEO metadata (title, description, OpenGraph, Twitter)
  lib/
    portfolio-data.ts     # SINGLE SOURCE OF TRUTH — all verified facts:
                          #   profile, education, research, projects, readings,
                          #   MATLAB courses (14), credentials, LeetCode stats
  components/
    site-header.tsx       # sticky nav + dark-mode toggle
public/
  certificates/           # verified credential images (8)
  profile.jpeg, logo.svg, robots.txt, CV PDF
scripts/                  # document generators (see below)
```

**Single source of truth:** every fact on the site (research descriptions, 14 MATLAB Onramp certificates with verification links, readings, stats) lives in `src/lib/portfolio-data.ts`. The site, the CV generators, and the readings export all render from that one file — edit it, then re-run the generators.

## Document generators

Run from the repo root (outputs land in `download/`):

```bash
bun scripts/generate_cv.mjs          # academic CV (DOCX, Fei-Fei-Li-style serif)
bun scripts/generate_cv_docx.mjs     # CV, editable twin
python3 scripts/generate_cv_pdf.py  # CV, rules-exact PDF (ReportLab)
bun scripts/export_readings.mjs      # readings log as Markdown
```

## Design notes

The layout follows the academic-homepage tradition (Karpathy, Abbeel, Fei-Fei Li, Levine, Huang): single column, link-dense prose, labeled flat lists, per-entry grammar (title → labeled rows → notes), no decorative cards. Certificate images render on demand — text rows with a *Show image* button that opens a lightbox — so the page stays fast and print-friendly.

## Deployment

The site is published to GitHub Pages from the `main` branch using `.github/workflows/deploy.yml`. The workflow installs the locked Bun dependencies, runs `bun run build`, and deploys the generated `./out` directory. This repository uses Next.js static export; API route handlers and server-only runtime features are not part of the Pages deployment.
