# Zafarullah — Research Portfolio

Personal research portfolio of **Zafarullah**, undergraduate AI researcher at Emerson University Multan, Pakistan, exploring funded graduate research opportunities for Fall 2027.

Live site: **https://zafarullahportfolio.space-z.ai**

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
bun run build      # production build (standalone output)
bun run start      # serve the production build
```

Requires [Bun](https://bun.sh) (or Node.js 20+ with npm — swap `bun` for `npx`/`npm run`).

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

## Deployment — GitHub Pages

This repository is configured for a static Next.js export. GitHub Actions builds the site and publishes the generated `out/` directory to GitHub Pages whenever changes are pushed to `main`.

1. In GitHub, open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push changes to `main` or run the **Deploy portfolio to GitHub Pages** workflow manually.
4. After the workflow succeeds, the site is available at **https://zafaraieng.github.io**.

The `/api` example route was excluded because GitHub Pages hosts static files and does not run Next.js server route handlers.
