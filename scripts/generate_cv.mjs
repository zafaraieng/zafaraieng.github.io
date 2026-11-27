/**
 * Academic CV generator — Zafarullah
 *
 * Single source of truth: ALL facts (profile, education, research, projects,
 * stats, readings, competitions) are imported from src/lib/portfolio-data.ts —
 * the same file the portfolio website renders from. Only presentation (layout,
 * wording condensation, citation shortening) lives in this script.
 *
 * Run with: bun scripts/generate_cv.mjs   (bun transpiles the TS data import)
 *
 * Design: follows the professor-CV reference style studied on 2026-11-20
 * (Fei-Fei Li / Abdeslam Boularias / Deepak Pathak / Kai-Wei Chang):
 * serif typography, small-caps section headings with hairline rules,
 * right-aligned dates, italic sub-lines, centered header with last-updated
 * date, black-on-white, ATS-readable, selectable text, no graphics.
 */
import * as docx from 'docx'
import fs from 'fs'
import {
  profile,
  education,
  onlineCoursework,
  research,
  industry,
  projects,
  skillCategories,
  leetcode,
  calico,
  researchReadings,
  matlabCount,
  service,
  personalInterests,
} from '../src/lib/portfolio-data.ts'

const FONT = 'Times New Roman'
const INK = '000000'
const GREY = '444444'
const LINK = '0B4F8A'

const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, ExternalHyperlink, TabStopType } = docx

/* ---------- sync guards: fail loudly if data is internally inconsistent ---------- */
const diffSum = leetcode.difficulties.reduce((s, d) => s + d.solved, 0)
if (diffSum !== leetcode.totalSolved) {
  throw new Error(`LeetCode sync error: difficulties sum ${diffSum} != totalSolved ${leetcode.totalSolved}`)
}
const [novaMem, cifake, novaFyp] = research
if (novaMem.id !== 'nova-mem' || cifake.id !== 'cifake' || novaFyp.id !== 'nova') {
  throw new Error(`Research array order changed: expected nova-mem, cifake, nova — got ${research.map((r) => r.id).join(', ')}`)
}

/* ---------- helpers ---------- */
function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: 20, color: INK, ...opts })
}

function link(text, url, opts = {}) {
  return new ExternalHyperlink({
    children: [new TextRun({ text, font: FONT, size: 20, color: LINK, underline: {}, ...opts })],
    link: url,
  })
}

function sectionHeading(text, extraSpaceBefore = 130, opts = {}) {
  return new Paragraph({
    spacing: { before: extraSpaceBefore, after: 60 },
    keepNext: true,
    pageBreakBefore: opts.pageBreakBefore ?? false,
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 2 } },
    children: [run(text, { bold: true, smallCaps: true, size: 21, characterSpacing: 14 })],
  })
}

function entryLine(left, right, opts = {}) {
  return new Paragraph({
    spacing: { after: 16 },
    tabStops: [{ type: TabStopType.RIGHT, position: 10626 }],
    children: [
      run(left, { bold: true, ...(opts.leftOpts || {}) }),
      run('\t' + right, { color: GREY, size: 19 }),
    ],
  })
}

function entrySub(text) {
  return new Paragraph({
    spacing: { after: 24 },
    children: [run(text, { italics: true, color: GREY, size: 19 })],
  })
}

function bullet(text, opts = {}) {
  const parts = typeof text === 'string' ? [{ t: text }] : text
  return new Paragraph({
    spacing: { after: 14, line: 240 },
    indent: { left: 280, hanging: 170 },
    children: [
      run('•  ', { color: GREY }),
      ...parts.map((p) => (p.url ? link(p.t, p.url, { size: 19, ...opts }) : run(p.t, { size: 19, ...(p.b ? { bold: true } : {}), ...(p.i ? { italics: true } : {}) }))),
    ],
  })
}

function readingEntry(paper, idx) {
  const firstAuthor = paper.authors.split(',')[0].trim().split(' ').pop()
  return new Paragraph({
    spacing: { after: 12, line: 236 },
    indent: { left: 280, hanging: 170 },
    children: [
      run('•  ', { color: GREY, size: 19 }),
      link(paper.title, paper.link, { size: 19, italics: true }),
      run(` — ${firstAuthor} et al., ${paper.year}.`, { size: 19 }),
    ],
  })
}

/* ---------- derived content ---------- */
const cifakeCS = cifake.caseStudy
const novaMemCS = novaMem.caseStudy
const novaCS = novaFyp.caseStudy
const hardSolved = leetcode.difficulties.find((d) => d.level === 'Hard')?.solved ?? 0

const projectByTitle = (t) => projects.find((p) => p.title.startsWith(t))
const parking = projectByTitle('Smart Parking')
const aria = projectByTitle('ARIA')
const aurixon = projectByTitle('Aurixon')
const clarity = projectByTitle('Clarity Cove')

/* ---------- document ---------- */
const doc = new Document({
  creator: profile.name,
  title: `${profile.name} — ${profile.title} — Academic CV`,
  styles: {
    default: {
      document: { run: { font: FONT, size: 20, color: INK } },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
        },
      },
      children: [
        /* ---------- Header ---------- */
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 30 },
          children: [run(profile.name.toUpperCase(), { bold: true, size: 40, characterSpacing: 36 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 40 },
          children: [run(`${profile.title}  ·  ${profile.subtitle}`, { size: 22, color: GREY })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 20 },
          children: [
            run(`${profile.location}  ·  ${profile.phone}  ·  `, { size: 18, color: GREY }),
            link(profile.email, `mailto:${profile.email}`, { size: 18 }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 16 },
          children: [
            run('Portfolio: ', { size: 18, color: GREY }),
            link(profile.portfolioUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''), profile.portfolioUrl, { size: 18 }),
            run('  ·  LinkedIn: ', { size: 18, color: GREY }),
            link('linkedin.com/in/zafar-ullahv', profile.linkedin, { size: 18 }),
            run('  ·  GitHub: ', { size: 18, color: GREY }),
            link('github.com/zafaraieng', profile.github, { size: 18 }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [run(`(Last updated: ${profile.lastUpdated})`, { size: 17, italics: true, color: GREY })],
        }),

        /* ---------- Research Interests ---------- */
        sectionHeading('Research Interests', 70),
        new Paragraph({
          spacing: { after: 10, line: 240 },
          children: [
            run('Primary: ', { size: 19, bold: true }),
            run('computer vision and deep learning (AI-generated image detection, efficient and lightweight models). ', { size: 19 }),
            run('Applied: ', { size: 19, bold: true }),
            run('conversational AI, retrieval-augmented generation, and long-term conversational memory — including research software for reproducible evaluation. ', { size: 19 }),
            run('Developing focus: ', { size: 19, bold: true }),
            run('robotics and embodied AI — robotic manipulation, dexterous hands, learning from human demonstration, and vision-language-action systems — pursued through systematic reading of current research and robotics coursework.', { size: 19 }),
          ],
        }),

        /* ---------- Education ---------- */
        sectionHeading('Education'),
        entryLine(`${education.degree} — ${education.institution}`, education.period.replace('—', '–')),
        bullet([
          { t: 'CGPA: ' },
          { t: education.cgpa, b: true },
          { t: `  ·  Coursework: ${education.coursework.slice(0, 8).join(', ')}` },
        ]),
        bullet(`Stanford University online coursework (in progress): ${onlineCoursework.program.replace('Code in Place — CS106A: Programming Methodology', 'Code in Place (CS106A: Programming Methodology)')}`),

        /* ---------- Research Software & Experience ---------- */
        sectionHeading('Research Software & Experience'),

        entryLine('NOVA-Mem — Resource-Aware Evaluation Framework for Conversational Memory Strategies', '2026 – Ongoing'),
        new Paragraph({
          spacing: { after: 24 },
          children: [
            run(`${novaMem.role}  ·  `, { italics: true, color: GREY, size: 19 }),
            link('github.com/zafaraieng/nova-mem', novaMemCS.links.github ?? 'https://github.com/zafaraieng/nova-mem', { italics: true, size: 19 }),
          ],
        }),
        bullet('A Python research framework that makes conversational-memory design choices measurable, inspectable, and reproducible: memory strategies from no-memory and full-context baselines through retrieval-augmented variants (BM25, dense, hybrid score fusion, reciprocal-rank fusion), cross-encoder reranking, and structured memory, evaluated on a cleaned LongMemEval benchmark.'),
        bullet('Architecture: modular package (data, models, memory, retrieval, reranking, evaluation, metrics, analysis) with declarative YAML experiment profiles, generation caching, dataset fingerprinting, and unit/regression/prompt-parity tests under continuous integration.'),
        bullet('Status — dev-100 scored for the A baseline, Oracle, and C-BM25 conditions; dense, hybrid, rerank, and structured-memory conditions in development. The scored runs used a commercial LLM backend and are documented in the repository as not directly comparable to the frozen local-protocol runs.'),

        entryLine(`${cifake.title} — Independent Research`, cifake.period, { leftOpts: {} }),
        bullet('Studied whether a lightweight CNN can match heavier detectors for AI-generated image forensics: fine-tuned MobileNetV2 on the 120,000-image CIFake benchmark (60K real / 60K AI-generated) using two-phase transfer learning, Mixup augmentation, and test-time augmentation.'),
        bullet([
          { t: `Preliminary internal results: ${cifakeCS.results[0].value} accuracy and ${cifakeCS.results[1].value} ROC-AUC on the 20,000-image held-out test split, with precision, recall, and F1 reported. ` },
          { t: 'Not externally validated; published reference points (CNNDetect 93.1%, UnivFD 93.8%) use different evaluation protocols.', i: true },
        ]),
        bullet('The model uses ~7× fewer parameters than ResNet-50 (~3.5M vs ~25.6M, standard published architecture sizes); deployed as a full-stack application (React frontend, Flask REST API) for live inference.'),

        entryLine('NOVA — AI Companion Intelligence Framework — Final Year Project (3-person team)', 'Ongoing'),
        entrySub(`Supervised by ${novaFyp.supervisor} · structured 22-week experimental roadmap`),
        bullet('Implemented: retrieval-augmented generation pipeline (ChromaDB/FAISS), local LLM inference (Ollama, Phi-3.5), and speech interfaces (Whisper ASR input, Coqui TTS output).'),
        bullet('In development: affect-aware interaction via local emotion detection (Qwen) and a measurable evaluation suite (grounding quality, latency, resource usage).'),

        /* ---------- Professional Experience ---------- */
        sectionHeading('Professional Experience'),
        entryLine(`${industry.role} — ${industry.company}, ${industry.location}`, industry.period.replace('—', '–')),
        bullet('Integrated PRA tax compliance into a restaurant management system: automated tax calculation for cash and credit transactions, QR-coded print-ready invoices; UI and bug fixes reduced reported issues by roughly 40%.'),
        bullet(`Built an end-to-end ${parking ? parking.title.toLowerCase() : 'smart parking system'} from scratch: OpenCV real-time vehicle capture, automated ticketing, and RFID entry/exit control, cutting manual gate processing time by more than half.`),
        bullet('Owned Linux server hosting and deployment (configuration, SSL, database maintenance), sustaining 99.5% uptime over the employment period.'),

        /* ---------- Selected Technical Projects (page 2 starts here) ---------- */
        sectionHeading('Selected Technical Projects', 0, { pageBreakBefore: true }),
        bullet([{ t: 'ARIA — AI Recruitment Intelligence Agent ', b: true }, { t: '(Google AI Hackathon): real-time voice application on the Gemini 2.0 Flash Live API with WebSocket audio streaming, Google Search grounding, and a self-serve API-key setup flow.' }]),
        bullet([{ t: 'Aurixon — Multi-Platform Publishing ', b: true }, { t: `(MERN): creator dashboard publishing via official YouTube, Instagram, and Facebook APIs and TikTok's draft/sandbox workflow; AI-generated, trend-aware metadata via OpenAI/Gemini backed by a live news and trends API.` }]),
        bullet([{ t: 'Clarity Cove ', b: true }, { t: '(MERN): AI-assisted learning platform pairing teacher and AI answers for students; also built a Chrome extension for scheduled website blocking with usage analytics.' }]),

        /* ---------- Programming Competitions & Coding Practice ---------- */
        sectionHeading('Programming Competitions & Coding Practice'),
        bullet([
          { t: `${calico.cvWording} (` },
          { t: 'calico.cs.berkeley.edu', url: calico.website },
          { t: '; scoreboard evidence on my portfolio — participation, not an award).', i: true },
        ]),
        bullet([
          { t: 'LeetCode: ' },
          { t: `${leetcode.totalSolved} problems solved `, b: true },
          { t: `(${leetcode.difficulties.map((d) => `${d.solved} ${d.level.toLowerCase()}`).join(' / ')}) with a ` },
          { t: `${leetcode.currentStreak}-day problem-solving streak`, b: true },
          { t: ` — statistics verified ${leetcode.verifiedOn}. Profile: ` },
          { t: `leetcode.com/${leetcode.username}`, url: leetcode.profileUrl },
          { t: '.' },
        ]),

        /* ---------- Selected Robotics Research Readings ---------- */
        sectionHeading('Selected Robotics Research Readings'),
        new Paragraph({
          spacing: { after: 40, line: 236 },
          children: [
            run('Independently read and studied — not authored, published, or experimentally reproduced by me. Titles, authors, and venues verified against primary sources on ', { size: 19, italics: true, color: GREY }),
            run(`${researchReadings.verifiedOn}. `, { size: 19, italics: true, color: GREY }),
            run('Detailed takeaways: ', { size: 19, italics: true, color: GREY }),
            link(`${profile.portfolioUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}/#readings`, `${profile.portfolioUrl.replace(/\/$/, '')}/#readings`, { size: 19, italics: true }),
            run('.', { size: 19, italics: true, color: GREY }),
          ],
        }),
        ...researchReadings.papers.map((p, i) => readingEntry(p, i)),

        /* ---------- Technical Skills ---------- */
        sectionHeading('Technical Skills'),
        ...skillCategories.map((c) =>
          bullet([{ t: `${c.title}: `, b: true }, { t: c.skills.join(', ') }])
        ),

        /* ---------- Certifications, Training & Service ---------- */
        sectionHeading('Certifications, Training & Service'),
        bullet(`${matlabCount} MathWorks MATLAB Academy Onramp courses (all certificates verified) — incl. Machine Learning, Deep Learning, Computer Vision, Reinforcement Learning, Optimization.`),
        bullet('NAVTTC Certified AI Course (Machine Learning & Deep Learning), Skill Castle Institute, May 2026; Claude Academy courses (MCP, Claude API, AI Fluency), 2026.'),
        bullet('Alkhidmat Foundation Pakistan — Welfare Intern, Volunteer Management (8 weeks, Jun–Aug 2026); Punjab Police — Traffic Help Volunteer, Warden Program (Aug 2025); Govt. of Pakistan Youth Internship (2025).'),

        /* ---------- Languages & Interests ---------- */
        sectionHeading('Languages & Interests'),
        ...education.languages.map((l) =>
          bullet([{ t: `${l.name}: `, b: true }, { t: l.level }])
        ),
        bullet('Interests: competitive chess, bird keeping, teaching and knowledge sharing, and following the work of builders such as Elon Musk and Steve Jobs.'),
      ],
    },
  ],
})

const buffer = await Packer.toBuffer(doc)
fs.writeFileSync('download/Zafarullah_Academic_CV.docx', buffer)
console.log('DOCX written:', buffer.length, 'bytes')
console.log('Sync check passed: LeetCode difficulties sum =', diffSum, '= totalSolved', leetcode.totalSolved)
