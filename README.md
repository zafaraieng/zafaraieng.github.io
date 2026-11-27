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

This repository is configured to publish the portfolio to **https://zafaraieng.github.io/** using GitHub Actions. The site is exported as static HTML, CSS, and JavaScript into `out/`; GitHub Pages does not run a Next.js Node server.

### One-time GitHub setup

1. Push this project to the repository named `zafaraieng.github.io` under the `zafaraieng` GitHub account. The repository name is what gives the site its root URL.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to the `main` branch (or run **Deploy portfolio to GitHub Pages** manually from the Actions tab). The workflow installs the locked Bun dependencies, runs `bun run build`, and deploys the `out/` directory.
5. Check the **Actions** tab. When the workflow succeeds, the site is published at `https://zafaraieng.github.io/`.

Every later push to `main` automatically republishes the site. The public URL remains unchanged.

### Static-hosting notes

- `next.config.ts` uses `output: "export"` and `trailingSlash: true`; the `/readings/` page is emitted as a static route.
- `next/image` uses `unoptimized: true` because GitHub Pages does not provide the Next.js image-optimization server.
- The current portfolio pages are static. Do not add server actions, request-dependent route handlers, cookies, server-side database calls, or other features requiring a running Next.js server unless the hosting platform is changed.
- `prisma/schema.prisma` and `src/lib/db.ts` are not used by the published pages. GitHub Pages cannot host a Prisma-backed database or runtime API.
- The build uses `next/font/google`; the GitHub Actions build therefore needs internet access to fetch the font during compilation.
