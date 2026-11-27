'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * Shared site header — used by the portfolio home and /readings so
 * navigation and the dark-mode toggle stay identical across pages.
 * The toggle owns the theme state and applies `dark` on <html>,
 * persisting the choice in localStorage.
 */

const SECTIONS = [
  { href: '/#research', label: 'Research' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#credentials', label: 'Credentials' },
]

export default function SiteHeader() {
  // Read the stored/system theme once on mount — lazy initializer, no effect needed.
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/95">
      <nav className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-6 px-5" aria-label="Main navigation">
        <Link href="/" className="text-sm font-semibold tracking-wide">Zafarullah</Link>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 md:flex">
            {SECTIONS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                {l.label}
              </Link>
            ))}
            <Link href="/readings" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              Readings
            </Link>
          </div>
          <a
            href="/Zafarullah_CV.pdf"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            download
          >
            CV
          </a>
          <button
            onClick={() => setDark((v) => !v)}
            aria-label="Toggle dark mode"
            className="rounded-md p-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </nav>
    </header>
  )
}
