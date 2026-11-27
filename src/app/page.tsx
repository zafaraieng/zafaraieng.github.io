'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SiteHeader from '@/components/site-header'
import { matlabCourseGroups, matlabCount } from '@/lib/portfolio-data'

/**
 * Single-page research portfolio — Zafarullah.
 * Arrangement-first layout: every section follows one entry grammar
 * (title row → labeled rows → notes) so the page reads like a clean CV.
 * Layout pattern follows the academic-homepage tradition (Karpathy,
 * Abbeel, Fei-Fei Li, Levine, Y.-C. Huang): single column, link-dense
 * prose, labeled flat lists, no decorative cards.
 * Type scale: name 36–48px · section 24px · entry title 17–18px ·
 * body 15–16px · row labels 11–12px uppercase · captions 12px.
 * Icons: exactly 3 (contact row). Images: profile photo only in the page
 * body — the 8 certificate images render on demand inside the lightbox
 * after a Show-image click (hidden by default, per user preference),
 * plus 14 MATLAB Onramp certificates as linked text rows.
 */

const GROUPS = ['Courses & Webinars', 'Internships & Service', 'Contest & Practice Evidence'] as const

type Credential = {
  src: string
  w: number
  h: number
  title: string
  meta: string
  group: 'Courses & Webinars' | 'Internships & Service' | 'Contest & Practice Evidence'
}

const CREDENTIALS: Credential[] = [
  {
    src: '/certificates/qubit-research-tools.jpg', w: 1600, h: 1131,
    title: 'AI Tools for Smarter Research',
    meta: 'Qubit Dynamics · webinar · Sep 2025',
    group: 'Courses & Webinars',
  },
  {
    src: '/certificates/qubit-agentic-ai.jpg', w: 1600, h: 1131,
    title: 'No Code Power Tools and Agentic AI',
    meta: 'Qubit Dynamics · webinar · Sep 2025',
    group: 'Courses & Webinars',
  },
  {
    src: '/certificates/alkhidmat-internship.png', w: 828, h: 1170,
    title: 'Welfare Intern — Volunteer Management',
    meta: 'Alkhidmat Foundation Pakistan · 30 Jun – 30 Aug 2026 · Ref AKFP/VM/3783',
    group: 'Internships & Service',
  },
  {
    src: '/certificates/youth-internship.jpg', w: 1600, h: 1137,
    title: 'Youth Internship',
    meta: 'Prime Minister’s Youth Programme · Government of Pakistan · 2025',
    group: 'Internships & Service',
  },
  {
    src: '/certificates/traffic-volunteer.jpg', w: 1600, h: 983,
    title: 'Traffic Help Volunteer (Warden Program)',
    meta: 'Punjab Police · Chief Traffic Officer Multan · Aug 2025',
    group: 'Internships & Service',
  },
  {
    src: '/certificates/calico-scoreboard.png', w: 1664, h: 725,
    title: 'CALICO Contest Scoreboard',
    meta: 'UC Berkeley student-run contest · my team’s row highlighted · participation evidence, not an award',
    group: 'Contest & Practice Evidence',
  },
  {
    src: '/certificates/leetcode-badge.jpg', w: 1600, h: 741,
    title: 'LeetCode — 50 Days Badge 2026',
    meta: 'Problems solved on 50+ days in 2026',
    group: 'Contest & Practice Evidence',
  },
  {
    src: '/certificates/leetcode-progress-2026-11.png', w: 1897, h: 922,
    title: 'LeetCode Progress Snapshot',
    meta: '139 solved (39 easy / 67 medium / 33 hard) · 90-day streak · verified 20 Nov 2026',
    group: 'Contest & Practice Evidence',
  },
]

export default function Home() {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5">

        {/* HERO */}
        <section id="home" className="flex flex-col gap-8 pt-14 pb-12 sm:flex-row sm:items-center sm:pt-20">
          <Image
            src="/profile.jpeg"
            alt="Portrait of Zafarullah"
            width={128}
            height={128}
            priority
            className="h-28 w-28 rounded-full border border-slate-200 object-cover dark:border-slate-800 sm:h-32 sm:w-32"
          />
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Zafarullah</h1>
            <p className="mt-3 text-xl text-slate-700 sm:text-2xl dark:text-slate-300">
              Computer Vision · Conversational AI · Robotics &amp; Embodied AI
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              I build measurable, deployable AI: evaluation frameworks, lightweight vision models,
              and fully local conversational systems.
            </p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
              B.S. Artificial Intelligence, Emerson University Multan (expected 2027) · Multan, Pakistan
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              Seeking funded graduate research opportunities — Fall 2027.
            </p>
          </div>
        </section>

        {/* ABOUT — link-dense prose, Karpathy-style */}
        <Section id="about" title="About">
          <p className="text-base leading-relaxed">
            I turn research questions into measurable, working systems. My independent work spans{' '}
            <a href="https://github.com/zafaraieng/nova-mem" target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-slate-300 underline-offset-4">NOVA-Mem</a>,
            a reproducible evaluation framework for conversational memory; a{' '}
            <a href="https://github.com/zafaraieng" target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-slate-300 underline-offset-4">lightweight AI-generated-image detector</a>{' '}
            reaching ~98% accuracy on a 120,000-image benchmark; and NOVA, a locally deployable AI
            companion stack. Nine months of professional software engineering taught me to ship
            reliably under real constraints. I am now going deep into{' '}
            <a href="/readings" className="font-medium underline decoration-slate-300 underline-offset-4">robotics and embodied AI through verified, structured reading</a>,
            aiming at research that makes autonomy efficient, measurable, and deployable in the
            real world.
          </p>
        </Section>

        {/* RESEARCH */}
        <Section id="research" title="Research">
          <div className="divide-y divide-slate-100 dark:divide-slate-900">
            <ResearchCard
              title="NOVA-Mem: Conversational Memory Strategy Evaluation"
              link="https://github.com/zafaraieng/nova-mem"
              rows={[
                ['Question', 'How do memory strategies trade answer quality against cost, latency, and storage?'],
                ['Method', 'Python framework over LongMemEval: BM25, dense, hybrid, and RRF retrieval, plus reranking.'],
                ['Result', 'A, Oracle, and C-BM25 dev-100 conditions scored (internal; backend differs).'],
              ]}
              limitation="Scored runs used a commercial backend, not the frozen local protocol; CI verifies plumbing, not conclusions."
              more={[
                'Full case study: motivation (anecdotal memory-design choices made measurable), modular package (data, models, memory, retrieval, reranking, evaluation, metrics, analysis), declarative YAML experiment profiles, generation caching, dataset fingerprints.',
                'Memory strategies: A (no memory), B (full context), Oracle (evidence-only), C (retrieval: BM25 / dense / hybrid fusion / RRF), D (retrieval + cross-encoder rerank), E (structured memory with fact extraction and supersession).',
                'Continuous integration runs unit, regression, and prompt-parity tests; the held-out Test-400 set stays locked behind review criteria.',
              ]}
            />
            <ResearchCard
              title="AI-Generated Image Detection on CIFake"
              link="https://github.com/zafaraieng"
              rows={[
                ['Question', 'Can a lightweight CNN match heavier detectors on AI-generated image classification?'],
                ['Method', 'MobileNetV2, two-phase transfer learning, Mixup, test-time augmentation; 120K images.'],
                ['Result', '~98% accuracy, 0.997 ROC-AUC on 20K held-out images (preliminary, internal).'],
              ]}
              limitation="Not externally validated; cross-generator generalization untested; CIFAR-resolution only."
              more={[
                'CIFake benchmark: 60,000 real CIFAR-10 photographs vs 60,000 Stable Diffusion v1.4 images; all numbers on the 20,000-image held-out test split.',
                'Two-phase protocol: head fine-tuning with frozen backbone, then full-network fine-tuning; TTA at inference; precision, recall, F1 reported alongside accuracy and ROC-AUC.',
                'Published reference points (CNNDetect 93.1%, UnivFD 93.8%) follow different evaluation protocols and are context, not like-for-like comparisons. The model is ~7× smaller in parameters than ResNet-50 (3.5M vs 25.6M).',
              ]}
            />
            <ResearchCard
              title="NOVA: Locally Deployable AI Companion Framework"
              link="https://github.com/zafaraieng"
              rows={[
                ['Question', 'How far can a retrieval-augmented companion run fully locally on consumer hardware?'],
                ['Method', 'RAG (ChromaDB/FAISS), Ollama Phi-3.5 inference, Whisper ASR, Coqui TTS.'],
                ['Result', 'Offline-capable pipeline implemented; evaluation suite for latency in progress.'],
              ]}
              limitation="Final-year team project under supervision; evaluation and contribution split still in progress."
              more={[
                'Final-year project: three-person team supervised by Dr. Sohail Raza, Emerson University Multan, on a 22-week experimental roadmap.',
                'Implemented: RAG pipeline with ChromaDB/FAISS vector retrieval, local Phi-3.5 inference via Ollama, speech interfaces (Whisper ASR input, Coqui TTS output), PostgreSQL persistence.',
                'In development: affect-aware interaction via local emotion detection (Qwen) and measurable evaluation: retrieval grounding, response quality under a rubric, end-to-end latency, resource usage.',
              ]}
            />
          </div>
        </Section>

        {/* PROJECTS — one structured entry per project */}
        <Section id="projects" title="Projects">
          <div className="divide-y divide-slate-100 dark:divide-slate-900">
            {[
              {
                name: 'ARIA — Real-Time Voice Agent',
                desc: 'Conversational voice agent built at the Google AI Hackathon on the Gemini Live API, with search grounding for factual answers.',
                stack: 'Gemini Live API · search grounding · real-time voice',
              },
              {
                name: 'Aurixon — Multi-Platform Publisher',
                desc: 'MERN publishing tool posting across four official platform APIs, with AI-generated trend-aware metadata for each post.',
                stack: 'MERN · four platform APIs · AI metadata',
              },
              {
                name: 'Clarity Cove — Learning Platform',
                desc: 'MERN learning platform that pairs teacher answers with AI answers, so hesitant students get help without fear of asking.',
                stack: 'MERN · React · Node.js · MongoDB',
              },
              {
                name: 'Plant Disease Classification',
                desc: 'Coursework project: PyTorch ResNet-9 classifier for crop disease, trained with augmentation to generalize beyond the training set.',
                stack: 'PyTorch · ResNet-9 · augmentation',
              },
            ].map((p) => (
              <article key={p.name} className="py-5 first:pt-0">
                <h3 className="text-lg font-semibold leading-snug">{p.name}</h3>
                <p className="mt-1.5 text-base leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">{p.stack}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" title="Experience">
          <article>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">Software Developer · Bucha-Soft, Multan</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500">Jun 2025 – Mar 2026</p>
            </div>
            <ul className="mt-3 space-y-2 text-base leading-relaxed">
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" aria-hidden="true" /><span>Automated Punjab Revenue Authority tax compliance for restaurant systems with QR invoices; reported issues fell ~40%.</span></li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" aria-hidden="true" /><span>Built an end-to-end smart parking system (OpenCV capture, ticketing, RFID gates), halving gate processing time.</span></li>
              <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" aria-hidden="true" /><span>Owned Linux hosting, SSL, and databases, sustaining 99.5% uptime across the employment period.</span></li>
            </ul>
          </article>
        </Section>

        {/* EDUCATION & SKILLS — labeled rows throughout */}
        <Section id="education" title="Education &amp; Skills">
          <article>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">B.S. Artificial Intelligence · Emerson University Multan</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500">2023 – 2027 (expected)</p>
            </div>
            <div className="mt-3 space-y-2">
              <Row label="CGPA">3.22 / 4.00</Row>
              <Row label="Coursework">Computer Vision, Probability &amp; Statistics, Linear Algebra, Data Structures &amp; Algorithms, Robotics Simulation, Swarm Intelligence</Row>
              <Row label="Also">Stanford online coursework in progress: Code in Place (CS106A) · Probability of AI (PAI26)</Row>
            </div>
          </article>

          <div className="mt-8 space-y-3">
            <Row label="Programming" big>Python, C/C++, JavaScript, SQL, Java</Row>
            <Row label="ML &amp; Vision" big>PyTorch, TensorFlow, Keras, scikit-learn, OpenCV, CNNs, transfer learning</Row>
            <Row label="LLM Apps" big>RAG (FAISS, ChromaDB), Ollama, OpenAI API, Gemini API, Whisper ASR, Coqui TTS</Row>
            <Row label="Engineering" big>React, Node.js, Express, Flask, REST APIs, MongoDB, PostgreSQL, WebSocket</Row>
            <Row label="Systems" big>Linux administration, Docker, Git, GCP, MATLAB, ROS/ROS2, Webots</Row>
          </div>

          {/* MATLAB Onramp certificates — labeled flat lists, link to verified certificates */}
          <div className="mt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold">MathWorks MATLAB Academy — {matlabCount} Onramp courses</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500">all certificates verified</p>
            </div>
            <div className="mt-3 space-y-3">
              {matlabCourseGroups.map((g) => (
                <div key={g.category} className="grid grid-cols-1 gap-1 sm:grid-cols-[130px_1fr] sm:gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 sm:pt-1 dark:text-slate-600">{g.category}</p>
                  <p className="text-base leading-relaxed">
                    {g.courses.map((c, i) => (
                      <span key={c.name}>
                        {i > 0 && <span className="text-slate-400 dark:text-slate-600"> · </span>}
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-4 hover:decoration-current">
                          {c.name.replace(' Onramp', '')}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-600">
              Each course name links to its verified MathWorks certificate.
            </p>
          </div>

          <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
            Readings: 10 annotated papers on dexterous manipulation and egocentric-video learning —{' '}
            <a href="/readings" className="font-semibold underline decoration-slate-300 underline-offset-4">full list with notes</a>.
          </p>
        </Section>

        {/* CREDENTIALS — text rows; images render only on demand in the lightbox */}
        <Section id="credentials" title="Certificates, Internships &amp; Activities">
          {GROUPS.map((group) => (
            <div key={group} className="mb-8 last:mb-0">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">{group}</h3>
              <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-900">
                {CREDENTIALS.map((c, idx) => c.group !== group ? null : (
                  <div key={c.src} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0 max-w-[calc(100%-7rem)]">
                      <p className="text-base font-semibold leading-snug">{c.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-500">{c.meta}</p>
                    </div>
                    <button
                      onClick={() => setActive(idx)}
                      aria-label={`Show image: ${c.title}`}
                      className="shrink-0 text-sm font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:decoration-current dark:text-slate-400"
                    >
                      Show image
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-600">
            Certificate images stay hidden by default — select Show image to view one in full size.
            CALICO and LeetCode items are participation and practice evidence, not awards.
          </p>
        </Section>

        {/* CONTACT */}
        <Section id="contact" title="Contact" last>
          <div className="flex flex-col items-start gap-3 text-base">
            <a href="mailto:zafarullaharshad2@gmail.com" className="inline-flex items-center gap-2 hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
              zafarullaharshad2@gmail.com
            </a>
            <a href="https://github.com/zafaraieng" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-7a6 6 0 0 0-1.5-4c.5-1.5.5-3 .5-3s-2 0-3.5 1.5A10 10 0 0 0 12 3a10 10 0 0 0-3.5-.5C7 1 5 1 5 1s0 1.5.5 3A6 6 0 0 0 4 8c0 5 3 7 6 7a4.8 4.8 0 0 0-1 3.5v4"/><path d="M9 22c-5-2-7-4.5-7-9"/></svg>
              github.com/zafaraieng
            </a>
            <a href="https://linkedin.com/in/zafar-ullahv" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin.com/in/zafar-ullahv
            </a>
          </div>
          <p className="mt-5 border-l-2 border-slate-200 pl-3 text-sm leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-500">
            Prospective supervisors: email is the best channel — I respond within two days and can
            share project code, data, or evaluation logs on request.
          </p>
        </Section>
      </main>

      <footer className="mx-auto max-w-3xl px-5 pb-10 pt-4 text-xs text-slate-400 dark:text-slate-600">
        Multan, Pakistan · zafarullahportfolio.space-z.ai
      </footer>

      {/* lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={CREDENTIALS[active].title}
        >
          <div className="max-h-full w-full max-w-3xl overflow-auto rounded-lg bg-white p-3 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <Image
              src={CREDENTIALS[active].src}
              alt={CREDENTIALS[active].title}
              width={CREDENTIALS[active].w}
              height={CREDENTIALS[active].h}
              className="h-auto max-h-[80vh] w-full rounded object-contain"
            />
            <div className="mt-2 text-center">
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <span className="font-semibold">{CREDENTIALS[active].title}</span> — {CREDENTIALS[active].meta}
              </p>
              <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                Press Esc or click outside to close
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ id, title, children, last }: { id: string; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-20 pb-14 ${last ? 'pb-20' : ''}`}>
      <h2 className="border-b border-slate-200 pb-2 text-2xl font-semibold tracking-tight dark:border-slate-800">{title}</h2>
      <div className="mt-4 text-slate-700 dark:text-slate-300">{children}</div>
    </section>
  )
}

function Row({ label, children, big }: { label: string; children: React.ReactNode; big?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[130px_1fr] sm:gap-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 sm:pt-0.5 dark:text-slate-600">{label}</p>
      <p className={big ? 'text-base' : 'text-sm leading-relaxed'}>{children}</p>
    </div>
  )
}

function ResearchCard({ title, link, rows, limitation, more }: {
  title: string; link: string; rows: [string, string][]; limitation: string; more: string[]
}) {
  const [open, setOpen] = useState(false)
  return (
    <article className="py-6 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm underline decoration-slate-300 underline-offset-4">
          Repository
        </a>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map(([label, text]) => (
          <div key={label} className="grid grid-cols-1 gap-1 sm:grid-cols-[100px_1fr] sm:gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 sm:pt-0.5 dark:text-slate-600">{label}</p>
            <p className="text-base leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 border-l-2 border-slate-200 pl-3 text-sm italic leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-500">
        Limitation: {limitation}
      </p>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-3 text-sm font-semibold text-slate-600 hover:underline dark:text-slate-400">
        {open ? 'Hide details' : 'Read more'}
      </button>
      {open && (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {more.map((m) => (
            <li key={m.slice(0, 30)} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
