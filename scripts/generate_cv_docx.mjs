/**
 * Academic CV DOCX — Zafarullah — editable twin of the rules-exact PDF.
 *
 * Same content and order as scripts/generate_cv_pdf.py (single source: verified
 * portfolio-data facts). Style: text-only, single-column ATS-safe, Times New Roman
 * serif 10.5pt (size 21 half-points), navy #1B2A4A headings with bottom-border
 * rules, 0.75in (1080 twip) margins, 1.15x line spacing (resume scene rule),
 * no icons/images/tables-with-borders. Date alignment via borderless 2-col table
 * (WPS-safe per common-rules: borderless tables for alignment, tab stops avoided).
 *
 * Run: bun scripts/generate_cv_docx.mjs
 */
import * as docx from 'docx'
import fs from 'fs'

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, WidthType, BorderStyle, ShadingType, TabStopType, VerticalAlign,
} = docx

const FONT = 'Times New Roman'
const NAVY = '1B2A4A'
const INK = '111111'
const MUTED = '3F3F3F'
const SIZE = 21        // 10.5pt body
const NAME_SIZE = 40    // 20pt
const HEAD_SIZE = 23    // 11.5pt
const LINE = 276       // 1.15x (resume scene)
const MARGIN = 1080    // 0.75in

const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const allNoBorders = { top: NB, left: NB, right: NB, bottom: NB, insideHorizontal: NB, insideVertical: NB }

const CONTENT_W = 11906 - 2 * MARGIN
const RIGHT_W = 2200   // date column (twips)
const LEFT_W = CONTENT_W - RIGHT_W

const run = (text, opts = {}) => new TextRun({ text, size: SIZE, font: FONT, color: INK, ...opts })

function section(title) {
  return [
    new Paragraph({
      spacing: { before: 260, after: 40, line: LINE },
      keepNext: true,
      children: [run(title, { bold: true, size: HEAD_SIZE, color: NAVY })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 110, line: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 1 } },
      children: [run('', {})],
    }),
  ]
}

/** left content / right-aligned date — borderless alignment table */
function dualRow(leftParas, date) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [LEFT_W, RIGHT_W],
    borders: allNoBorders,
    rows: [new TableRow({
      cantSplit: true,
      children: [
        new TableCell({
          borders: allNoBorders, verticalAlign: VerticalAlign.TOP,
          margins: { top: 0, bottom: 0, left: 0, right: 80 },
          children: leftParas,
        }),
        new TableCell({
          borders: allNoBorders, verticalAlign: VerticalAlign.TOP,
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: 0, after: 0, line: LINE },
            children: [run(date, { color: MUTED })],
          })],
        }),
      ],
    })],
  })
}

const bullet = (text) => new Paragraph({
  spacing: { before: 0, after: 0, line: LINE },
  indent: { left: 240, hanging: 160 },
  children: [
    run('• ', { color: MUTED }),
    run(text),
  ],
})

const line = (children) => new Paragraph({
  spacing: { before: 0, after: 0, line: LINE },
  children,
})

const children = []

// ═══ HEADER ═══
children.push(new Paragraph({
  spacing: { before: 0, after: 40, line: 480 },
  children: [run('ZAFARULLAH', { bold: true, size: NAME_SIZE, color: NAVY })],
}))
children.push(line([run('Undergraduate AI Researcher — Computer Vision · Conversational AI · Robotics/Embodied AI', {})]))
children.push(line([run('Multan, Pakistan · +92 306 7872856 · zafarullaharshad2@gmail.com', { color: MUTED })]))
children.push(line([run('Portfolio: zafarullahportfolio.space-z.ai · GitHub: github.com/zafaraieng · LinkedIn: linkedin.com/in/zafar-ullahv', { color: MUTED })]))
children.push(new Paragraph({
  spacing: { before: 80, after: 40, line: LINE },
  children: [run('Applying for fully funded MS/PhD admission (Fall 2027) in AI — computer vision, conversational AI, robotics/embodied AI.')],
}))

// ═══ EDUCATION ═══
children.push(...section('EDUCATION'))
children.push(dualRow([
  line([run('Emerson University Multan — B.S. Artificial Intelligence', { bold: true })]),
  line([run('Multan, Pakistan', { italics: true, color: MUTED })]),
], 'Aug 2023 – May 2027 (expected)'))
children.push(line([run('CGPA 3.22/4.00 · Coursework: Computer Vision, Probability & Statistics, Linear Algebra.', {})]))
children.push(line([run('Stanford online coursework (in progress): Code in Place (CS106A) · Probability of AI (PAI26).', {})]))

// ═══ RESEARCH ═══
children.push(...section('RESEARCH'))

children.push(dualRow([
  line([run('NOVA-Mem — Conversational Memory Strategy Evaluation Framework', { bold: true })]),
  line([run('Independent research software · creator and sole maintainer', { italics: true, color: MUTED })]),
], '2026 – present'))
children.push(bullet('Question: how do memory strategies trade answer quality against cost, latency, storage?'))
children.push(bullet('Built a Python framework over LongMemEval: BM25, dense, hybrid, RRF retrieval, reranking.'))
children.push(bullet('Result: A, Oracle, and C-BM25 dev-100 conditions scored — internal, backend differs.'))

children.push(dualRow([
  line([run('AI-Generated Image Detection on CIFake — Independent Study', { bold: true })]),
  line([run('Independent computer-vision research · PyTorch · MobileNetV2', { italics: true, color: MUTED })]),
], 'May 2026'))
children.push(bullet('Question: can a lightweight CNN match heavier detectors on AI-generated image classification?'))
children.push(bullet('Fine-tuned MobileNetV2 (two-phase transfer learning, Mixup, test-time augmentation) on 120K images.'))
children.push(bullet('Result: ~98% accuracy, 0.997 ROC-AUC on 20K held-out images — preliminary, internal.'))

children.push(dualRow([
  line([run('NOVA — Locally Deployable AI Companion Intelligence Framework', { bold: true })]),
  line([run('Final-year project · three-person team · supervised by Dr. Sohail Raza', { italics: true, color: MUTED })]),
], '2026 – present'))
children.push(bullet('Question: how far can a retrieval-augmented conversational companion run locally on consumer hardware?'))
children.push(bullet('Built RAG (ChromaDB/FAISS), Ollama Phi-3.5 inference, Whisper ASR input, Coqui TTS output.'))
children.push(bullet('Result: offline-capable pipeline implemented; evaluation suite for latency in progress.'))
children.push(new Paragraph({
  spacing: { before: 140, after: 0, line: LINE },
  children: [run('Read and annotated 10 papers on dexterous manipulation and egocentric-video learning — notes on the portfolio.')],
}))

// ═══ EXPERIENCE ═══
children.push(...section('EXPERIENCE'))
children.push(dualRow([
  line([run('Software Developer — Bucha-Soft', { bold: true })]),
  line([run('Multan, Pakistan', { italics: true, color: MUTED })]),
], 'Jun 2025 – Mar 2026'))
children.push(bullet('Automated PRA tax compliance for restaurant systems — QR invoices; reported issues fell ~40%.'))
children.push(bullet('Built an end-to-end smart parking system (OpenCV capture, ticketing, RFID gates), halving gate time.'))
children.push(bullet('Owned Linux hosting, SSL, and databases, sustaining 99.5% uptime across the employment period.'))

// ═══ PROJECTS ═══
children.push(...section('PROJECTS'))
for (const p of [
  'ARIA (Google AI Hackathon) — voice agent on Gemini Live API; WebSocket audio, search grounding.',
  'Aurixon — MERN publisher across four official platform APIs; AI-generated trend-aware metadata.',
  'Clarity Cove — MERN learning platform pairing teacher and AI answers for hesitant students.',
  'Plant Disease Classification (coursework) — PyTorch ResNet-9 classifier with augmentation.',
]) {
  children.push(line([run(p)]))
}

// ═══ SKILLS ═══
children.push(...section('SKILLS'))
for (const [label, vals] of [
  ['Programming', 'Python, C/C++, JavaScript, SQL, Java.'],
  ['ML & Computer Vision', 'PyTorch, TensorFlow, Keras, scikit-learn, OpenCV, CNNs, transfer learning.'],
  ['LLM Applications', 'RAG (FAISS, ChromaDB), Ollama, OpenAI API, Gemini API, Whisper ASR, Coqui TTS.'],
  ['Software Engineering', 'React, Node.js, Express, Flask, REST APIs, MongoDB, PostgreSQL, WebSocket.'],
  ['Systems & Robotics', 'Linux administration, Docker, Git, GCP, MATLAB · ROS/ROS2, Webots.'],
]) {
  children.push(line([run(`${label}: `, { bold: true }), run(vals)]))
}

// ═══ AWARDS & CERTIFICATIONS ═══
children.push(...section('AWARDS & CERTIFICATIONS'))
for (const a of [
  'Participant — CALICO (California Informatics Competition), biannual team contest, UC Berkeley (2026).',
  'LeetCode: 139 problems solved (39 easy / 67 medium / 33 hard); 90-day problem-solving streak.',
  '14 MathWorks MATLAB Academy Onramp courses, certificates verified — ML, Deep Learning, Vision, RL.',
  'NAVTTC Certified AI Course (ML & Deep Learning), May 2026 · Stanford Code in Place · Claude Academy.',
]) {
  children.push(line([run(a)]))
}

// ═══ LANGUAGES ═══
children.push(...section('LANGUAGES'))
children.push(line([run('Urdu (native) · English (full professional proficiency) · Mandarin Chinese (university coursework).')]))

const doc = new Document({
  title: 'Zafarullah — Academic CV (Fall 2027)',
  creator: 'Zafarullah',
  description: 'Academic CV — AI research (computer vision, conversational AI, robotics/embodied AI)',
  styles: {
    default: {
      document: { run: { font: FONT, size: SIZE, color: INK } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
      },
    },
    children,
  }],
})

const buffer = await Packer.toBuffer(doc)
fs.writeFileSync('download/Zafarullah_CV.docx', buffer)
console.log('DOCX written: download/Zafarullah_CV.docx')
