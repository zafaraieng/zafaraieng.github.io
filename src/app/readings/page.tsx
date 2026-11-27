'use client'

import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/site-header'

/**
 * /readings — robotics paper-reading notes, titles collapsed by default.
 * All titles, authors, venues, and links below are copied verbatim from
 * src/lib/portfolio-data.ts researchReadings — verified against primary
 * sources (arXiv / official pages / White Rose) on November 20, 2026.
 */

type Paper = {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  link: string
  takeaway: string
}

const PAPERS: Paper[] = [
  {
    id: 'hand-shadowing',
    title: 'Vision-Based Hand Shadowing for Robotic Manipulation via Inverse Kinematics',
    authors: 'Chiche, Jamme, Martinez, Gomes',
    venue: 'arXiv:2603.11383 · IEEE Access (2026)',
    year: '2026',
    link: 'https://arxiv.org/abs/2603.11383',
    takeaway:
      'An offline, zero-training pipeline: egocentric RGB-D + MediaPipe landmarks → deprojection → damped-least-squares IK on a low-cost SO-ARM101. Reached 86.7% ± 4.2% on a 150-episode pick-and-place benchmark, beating trained VLAs, though ACT stayed higher (92%); EMA smoothing cut hand jerk 57–68%. Closest to my toolkit — but hand occlusion collapsed real-world success to 9.3%, a sharp lesson in the sim-to-real visibility gap.',
  },
  {
    id: 'oat',
    title: 'Pose Retargeting from a Single RGB Camera: Optimization-Based Hand Pose Retargeting and Wrist Pose Estimation',
    authors: 'Chen, Chen, Yao, Dogar',
    venue: 'IEEE ICRA 2026',
    year: '2026',
    link: 'https://eprints.whiterose.ac.uk/id/eprint/238695/',
    takeaway:
      'Optimization-based retargeting of human hand poses to robot hands from a single RGB camera, including wrist-pose estimation — the mapping stage every video-to-robot pipeline needs.',
  },
  {
    id: 'dexemg',
    title: 'DexEMG: Towards Dexterous Teleoperation System via EMG2Pose Generalization',
    authors: 'Zhao, Li, Wang, et al.',
    venue: 'arXiv:2603.05861',
    year: '2026',
    link: 'https://arxiv.org/abs/2603.05861',
    takeaway:
      'Wrist EMG signals generalized to full hand poses for dexterous teleoperation — signal generalization across users is what reduces per-user calibration.',
  },
  {
    id: 't-rex',
    title: 'T-Rex: Tactile-Reactive Dexterous Manipulation',
    authors: 'Niu, Liu, Wang, et al.',
    venue: 'arXiv:2606.17055 · open dataset and code',
    year: '2026',
    link: 'https://arxiv.org/abs/2606.17055',
    takeaway:
      'Tactile sensing integrated into dexterous manipulation with reactive control — high-frequency tactile feedback is what lets a grasp recover after it starts failing.',
  },
  {
    id: 'gr-dexter',
    title: 'GR-Dexter Technical Report',
    authors: 'Wen, Chen, Cui, et al.',
    venue: 'arXiv:2512.24210 · technical report',
    year: '2025',
    link: 'https://arxiv.org/abs/2512.24210',
    takeaway:
      'Hardware design report for a dexterous hand — actuation, tendon routing, and sensing trade-offs that quietly determine what learning-based control can attempt.',
  },
  {
    id: 'egoscale',
    title: 'EgoScale: Scaling Dexterous Manipulation with Diverse Egocentric Human Data',
    authors: 'Zheng, Niu, Xie, et al.',
    venue: 'arXiv:2602.16710 · NVIDIA research',
    year: '2026',
    link: 'https://arxiv.org/abs/2602.16710',
    takeaway:
      'Scales dexterous-manipulation learning from large, diverse egocentric human datasets — the data-scaling argument for using human video as supervision for robot hands.',
  },
  {
    id: 'egoaero',
    title: 'EgoAERO: Learning Dexterous Manipulation from a Single Egocentric Video without Object Assets',
    authors: 'Niu, Lv, Zhang, et al.',
    venue: 'arXiv:2606.08057',
    year: '2026',
    link: 'https://arxiv.org/abs/2606.08057',
    takeaway:
      'Learns manipulation from one egocentric video with no object models — affordance estimation substituting for explicit object assets.',
  },
  {
    id: 'egocpt',
    title: 'EgoCPT: Learning Dexterous Manipulation from a Single Ego-Centric Video with Contact-Aware Optimization',
    authors: 'Sun, Shi, Ren, et al.',
    venue: 'arXiv:2610.17572 · ego-cpt.github.io',
    year: '2026',
    link: 'https://arxiv.org/abs/2610.17572',
    takeaway:
      'Contact-aware optimization for single-video imitation — modeling contact points as the bridge between human video and robot joint trajectories.',
  },
  {
    id: 'do-as-i-do',
    title: 'Do as I Do: Dexterous Manipulation Data from Everyday Human Videos',
    authors: 'Paliwal, Etukuri, et al.',
    venue: 'arXiv:2606.19333 · do-as-i-do.com',
    year: '2026',
    link: 'https://arxiv.org/abs/2606.19333',
    takeaway:
      'Extracts dexterous-manipulation demonstrations from everyday human video — the retargeting-plus-physics pipeline that turns raw video into usable robot data.',
  },
  {
    id: 'egomimic',
    title: 'EgoMimic: Scaling Imitation Learning via Egocentric Video',
    authors: 'Kareer, Patel, Punamiya, et al.',
    venue: 'arXiv:2410.24221 · ICRA 2025 · egomimic.github.io',
    year: '2024',
    link: 'https://arxiv.org/abs/2410.24221',
    takeaway:
      'Egocentric-video imitation learning with cross-platform data sharing — a shared camera viewpoint makes human and robot data jointly trainable.',
  },
]

export default function ReadingsPage() {
  const [openAll, setOpenAll] = useState(false)
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    const next = new Set(openIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setOpenIds(next)
  }

  const effectiveOpen = (id: string) => openAll || openIds.has(id)

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased dark:bg-slate-950 dark:text-slate-200">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-16">
        <section className="scroll-mt-20 pt-16 pb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Research Readings</h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Ten recent papers on dexterous manipulation, hand shadowing and retargeting, tactile sensing, and
            learning from egocentric human video — titles, authors, and venues verified against primary sources
            (arXiv, IEEE, and official project pages) on November 20, 2026. Independent reading notes with my
            own takeaways, written to sharpen my understanding of current robotics research.
          </p>
          <button
            onClick={() => setOpenAll((v) => !v)}
            className="mt-4 text-sm font-semibold text-slate-600 hover:underline dark:text-slate-400"
          >
            {openAll ? 'Collapse all notes' : 'Expand all notes'}
          </button>
        </section>

        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {PAPERS.map((p, i) => (
            <li key={p.id} className="py-4">
              <p className="text-sm font-medium leading-snug">
                <span className="text-slate-400 dark:text-slate-600">{i + 1}. </span>
                {p.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-600">{p.authors} · {p.year}</p>
              <div className="mt-1 flex items-center gap-4 text-xs">
                <button onClick={() => toggle(p.id)} aria-expanded={effectiveOpen(p.id)} className="font-semibold text-slate-500 hover:underline dark:text-slate-500">
                  {effectiveOpen(p.id) ? 'Hide note' : 'Note'}
                </button>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-slate-500 underline decoration-slate-300 underline-offset-4 hover:decoration-current dark:text-slate-500">
                  {p.venue}
                </a>
              </div>
              {effectiveOpen(p.id) && (
                <p className="mt-2 border-l-2 border-slate-200 pl-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                  {p.takeaway}
                </p>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-slate-400 dark:text-slate-600">
          Independent reading notes — not my own publications. Back to <Link href="/" className="underline">portfolio home</Link>.
        </p>
      </main>
    </div>
  )
}
