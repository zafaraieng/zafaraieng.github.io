/**
 * Export the research reading log to Markdown, generated from the same
 * canonical data source as the portfolio website and the CV
 * (src/lib/portfolio-data.ts). Re-run after editing readings there:
 *
 *   bun scripts/export_readings.mjs
 */
import fs from 'fs'
import { researchReadings, profile } from '../src/lib/portfolio-data.ts'

const lines = []
lines.push(`# Research Reading & Technical Insights — ${profile.name}`)
lines.push('')
lines.push(`> ${researchReadings.intro}`)
lines.push('>')
lines.push(`> **Disclaimer:** ${researchReadings.disclaimer}`)
lines.push('>')
lines.push(`> **Verified:** ${researchReadings.verifiedOn} · **Full annotated log:** ${profile.portfolioUrl.replace(/\/$/, '')}/#readings`)
lines.push('')

researchReadings.papers.forEach((p, i) => {
  lines.push(`## ${i + 1}. ${p.title}`)
  lines.push('')
  lines.push(`**Authors:** ${p.authors}${p.affiliation ? ` — ${p.affiliation}` : ''}  `)
  lines.push(`**Year / Venue:** ${p.year} · ${p.venue}  `)
  lines.push(`**Link:** ${p.link}`)
  lines.push('')
  lines.push(`**Research problem.** ${p.problem}`)
  lines.push('')
  lines.push(`**Core contribution.** ${p.contribution}`)
  lines.push('')
  lines.push(`**Key takeaways.** ${p.takeaway}`)
  lines.push('')
  lines.push(`**Limitation / open challenge.** ${p.limitation}`)
  lines.push('')
  lines.push(`**Why it matters to me.** ${p.relevance}`)
  lines.push('')
  lines.push('---')
  lines.push('')
})

lines.pop() // drop trailing separator
lines.push('')
lines.push(`_Reading log maintained as data in \`src/lib/portfolio-data.ts\` (single source of truth shared with the portfolio website and CV). Last updated: ${profile.lastUpdated}._`)

fs.writeFileSync('download/research-readings.md', lines.join('\n') + '\n')
console.log('Wrote download/research-readings.md —', researchReadings.papers.length, 'papers')
