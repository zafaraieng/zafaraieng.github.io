#!/usr/bin/env python3
"""
Academic CV — Zafarullah — concise 2-page text-only PDF for Fall 2027 MS/PhD applications.

Source of truth: facts verified in src/lib/portfolio-data.ts and prior fact-check rounds
(Nov 20/26, 2026). No invented numbers; user's own qualifier wording preserved.

Rules implemented exactly:
- No icons, no images, one dark-navy accent for headings only, no skill bars,
  no tables except right-aligned date column (date alignment only).
- FreeSerif (serif) 10.5pt body, 0.75" margins, A4.
- Order: Header, Education, Research (3 items + one readings line), Experience,
  Projects, Skills, Awards/Certifications, Languages.
- Every bullet is ONE rendered line (validated with pdfmetrics.stringWidth before build),
  <= ~20 words, verb-first where applicable, result/number last. Max 3 bullets/item.
- Research items: question / method / result(+honest qualifier). No status paragraphs.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily, stringWidth

FONT_DIR = '/usr/share/fonts/truetype/freefont'
pdfmetrics.registerFont(TTFont('FreeSerif', f'{FONT_DIR}/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', f'{FONT_DIR}/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', f'{FONT_DIR}/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', f'{FONT_DIR}/FreeSerifBoldItalic.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')

NAVY = colors.HexColor('#1B2A4A')   # single dark navy accent — headings only
INK = colors.HexColor('#111111')    # body text
MUTED = colors.HexColor('#3F3F3F')  # meta lines

BODY = 10.5
LEAD = 16.5   # relaxed leading to balance two pages

S = {
    'name': ParagraphStyle('name', fontName='FreeSerif-Bold', fontSize=20, leading=24,
                            alignment=TA_LEFT, textColor=NAVY, spaceAfter=2),
    'tagline': ParagraphStyle('tagline', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                                textColor=INK, spaceAfter=2),
    'contact': ParagraphStyle('contact', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                                textColor=MUTED, spaceAfter=0),
    'interest': ParagraphStyle('interest', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                                 textColor=INK, spaceBefore=4, spaceAfter=0),
    'section': ParagraphStyle('section', fontName='FreeSerif-Bold', fontSize=11.5, leading=15,
                                textColor=NAVY, spaceBefore=0, spaceAfter=1),
    'entry': ParagraphStyle('entry', fontName='FreeSerif-Bold', fontSize=BODY, leading=LEAD,
                             textColor=INK, spaceBefore=0, spaceAfter=0),
    'entry_meta': ParagraphStyle('entry_meta', fontName='FreeSerif-Italic', fontSize=BODY,
                                  leading=LEAD, textColor=MUTED, spaceAfter=1),
    'bullet': ParagraphStyle('bullet', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                              textColor=INK, leftIndent=14, bulletIndent=2,
                              spaceBefore=0, spaceAfter=0),
    'line': ParagraphStyle('line', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                            textColor=INK, spaceBefore=0, spaceAfter=0),
    'skill': ParagraphStyle('skill', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                              textColor=INK, spaceBefore=0, spaceAfter=0),
    'date': ParagraphStyle('date', fontName='FreeSerif', fontSize=BODY, leading=LEAD,
                            textColor=MUTED, alignment=TA_RIGHT),
}

PAGE_W = A4[0]
MARGIN = 0.75 * inch
CONTENT_W = PAGE_W - 2 * MARGIN        # full content width
RIGHT_W = 1.55 * inch                  # date column
LEFT_W = CONTENT_W - RIGHT_W           # entry content column
BULLET_W = CONTENT_W - 14 - 2          # bullet text width after indent

# one-line guarantee: every bullet/project line validated against real font metrics
def check_one_line(text, width, font='FreeSerif', size=BODY, prefix=''):
    w = stringWidth(text, font, size) + stringWidth(prefix, 'FreeSerif', size)
    assert w <= width, f'OVERFLOW ({w:.0f}pt > {width:.0f}pt): {text[:60]}'


def section(title):
    return [
        Spacer(1, 13),
        Paragraph(f'<b>{title}</b>', S['section']),
        HRFlowable(width='100%', thickness=0.7, color=NAVY, spaceBefore=1, spaceAfter=6),
    ]


def dual_row(left_flow, right_text):
    """Left content / right-aligned date — alignment-only table."""
    t = Table([[left_flow, Paragraph(right_text, S['date'])]],
              colWidths=[LEFT_W, RIGHT_W])
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('ALIGN', (1, 0), (1, 0), 'RIGHT'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 1),
    ]))
    return t


def bullet(text):
    check_one_line(text, BULLET_W, prefix='•')
    return Paragraph(text, S['bullet'], bulletText='•')


def oneline(text):
    """Non-bullet single line (projects, awards): validated one line."""
    check_one_line(text, CONTENT_W)
    return Paragraph(text, S['line'])


story = []

# ═══════════ HEADER ═══════════
story.append(Paragraph('ZAFARULLAH', S['name']))
story.append(Paragraph('Undergraduate AI Researcher — Computer Vision · Conversational AI · Robotics/Embodied AI', S['tagline']))
story.append(Paragraph('Multan, Pakistan · +92 306 7872856 · zafarullaharshad2@gmail.com', S['contact']))
story.append(Paragraph('Portfolio: zafarullahportfolio.space-z.ai · GitHub: github.com/zafaraieng · LinkedIn: linkedin.com/in/zafar-ullahv', S['contact']))
story.append(Spacer(1, 3))
story.append(Paragraph('Applying for fully funded MS/PhD admission (Fall 2027) in AI — computer vision, conversational AI, robotics/embodied AI.', S['interest']))

# ═══════════ EDUCATION ═══════════
edu = section('EDUCATION')
edu.append(dual_row(
    [Paragraph('<b>Emerson University Multan — B.S. Artificial Intelligence</b>', S['entry']),
     Paragraph('Multan, Pakistan', S['entry_meta'])],
    'Aug 2023 – May 2027 (expected)'))
edu.append(Paragraph('CGPA 3.22/4.00 · Coursework: Computer Vision, Probability &amp; Statistics, Linear Algebra.', S['line']))
edu.append(Paragraph('Stanford online coursework (in progress): Code in Place (CS106A) · Probability of AI (PAI26).', S['line']))
story.extend(edu)

# ═══════════ RESEARCH ═══════════
story.extend(section('RESEARCH'))

# -- NOVA-Mem --
nm = [Paragraph('<b>NOVA-Mem — Conversational Memory Strategy Evaluation Framework</b>', S['entry']),
      Paragraph('Independent research software · creator and sole maintainer', S['entry_meta'])]
story.append(dual_row(nm, '2026 – present'))
story.append(bullet('Question: how do memory strategies trade answer quality against cost, latency, storage?'))
story.append(bullet('Built a Python framework over LongMemEval: BM25, dense, hybrid, RRF retrieval, reranking.'))
story.append(bullet('Result: A, Oracle, and C-BM25 dev-100 conditions scored — internal, backend differs.'))
story.append(Spacer(1, 6))

# -- CIFake --
cf = [Paragraph('<b>AI-Generated Image Detection on CIFake — Independent Study</b>', S['entry']),
      Paragraph('Independent computer-vision research · PyTorch · MobileNetV2', S['entry_meta'])]
story.append(dual_row(cf, 'May 2026'))
story.append(bullet('Question: can a lightweight CNN match heavier detectors on AI-generated image classification?'))
story.append(bullet('Fine-tuned MobileNetV2 (two-phase transfer learning, Mixup, test-time augmentation) on 120K images.'))
story.append(bullet('Result: ~98% accuracy, 0.997 ROC-AUC on 20K held-out images — preliminary, internal.'))
story.append(Spacer(1, 6))

# -- NOVA FYP --
nv = [Paragraph('<b>NOVA — Locally Deployable AI Companion Intelligence Framework</b>', S['entry']),
      Paragraph('Final-year project · three-person team · supervised by Dr. Sohail Raza', S['entry_meta'])]
story.append(dual_row(nv, '2026 – present'))
story.append(bullet('Question: how far can a retrieval-augmented conversational companion run locally on consumer hardware?'))
story.append(bullet('Built RAG (ChromaDB/FAISS), Ollama Phi-3.5 inference, Whisper ASR input, Coqui TTS output.'))
story.append(bullet('Result: offline-capable pipeline implemented; evaluation suite for latency in progress.'))

story.append(Spacer(1, 6))
story.append(oneline('Read and annotated 10 papers on dexterous manipulation and egocentric-video learning — notes on the portfolio.'))

# ═══════════ EXPERIENCE ═══════════
exp = section('EXPERIENCE')
exp.append(dual_row(
    [Paragraph('<b>Software Developer — Bucha-Soft</b>', S['entry']),
     Paragraph('Multan, Pakistan', S['entry_meta'])],
    'Jun 2025 – Mar 2026'))
exp.append(bullet('Automated PRA tax compliance for restaurant systems — QR invoices; reported issues fell ~40%.'))
exp.append(bullet('Built an end-to-end smart parking system (OpenCV capture, ticketing, RFID gates), halving gate time.'))
exp.append(bullet('Owned Linux hosting, SSL, and databases, sustaining 99.5% uptime across the employment period.'))
story.extend(exp)

# ═══════════ PROJECTS ═══════════
proj = section('PROJECTS')
for p in [
    'ARIA (Google AI Hackathon) — voice agent on Gemini Live API; WebSocket audio, search grounding.',
    'Aurixon — MERN publisher across four official platform APIs; AI-generated trend-aware metadata.',
    'Clarity Cove — MERN learning platform pairing teacher and AI answers for hesitant students.',
    'Plant Disease Classification (coursework) — PyTorch ResNet-9 classifier with augmentation.',
]:
    proj.append(oneline(p))
story.extend(proj)

# ═══════════ SKILLS ═══════════
sk = section('SKILLS')
for label, vals in [
    ('Programming', 'Python, C/C++, JavaScript, SQL, Java.'),
    ('ML &amp; Computer Vision', 'PyTorch, TensorFlow, Keras, scikit-learn, OpenCV, CNNs, transfer learning.'),
    ('LLM Applications', 'RAG (FAISS, ChromaDB), Ollama, OpenAI API, Gemini API, Whisper ASR, Coqui TTS.'),
    ('Software Engineering', 'React, Node.js, Express, Flask, REST APIs, MongoDB, PostgreSQL, WebSocket.'),
    ('Systems &amp; Robotics', 'Linux administration, Docker, Git, GCP, MATLAB · ROS/ROS2, Webots.'),
]:
    sk.append(Paragraph(f'<b>{label}:</b> {vals}', S['skill']))
story.extend(sk)

# ═══════════ AWARDS & CERTIFICATIONS ═══════════
aw = section('AWARDS &amp; CERTIFICATIONS')
aw.append(oneline('Participant — CALICO (California Informatics Competition), biannual team contest, UC Berkeley (2026).'))
aw.append(oneline('LeetCode: 139 problems solved (39 easy / 67 medium / 33 hard); 90-day problem-solving streak.'))
aw.append(oneline('14 MathWorks MATLAB Academy Onramp courses, certificates verified — ML, Deep Learning, Vision, RL.'))
aw.append(oneline('NAVTTC Certified AI Course (ML &amp; Deep Learning), May 2026 · Stanford Code in Place · Claude Academy.'))
story.extend(aw)

# ═══════════ LANGUAGES ═══════════
lg = section('LANGUAGES')
lg.append(Paragraph('Urdu (native) · English (full professional proficiency) · Mandarin Chinese (university coursework).', S['line']))
story.extend(lg)

# ── Build ──
doc = SimpleDocTemplate(
    'download/Zafarullah_CV.pdf',
    pagesize=A4,
    leftMargin=MARGIN, rightMargin=MARGIN,
    topMargin=MARGIN, bottomMargin=MARGIN,
    title='Zafarullah — Academic CV (Fall 2027)',
    author='Zafarullah', creator='Z.ai',
    subject='Academic CV — AI research (computer vision, conversational AI, robotics/embodied AI)',
)
doc.build(story)
print('PDF written: download/Zafarullah_CV.pdf')
print('all bullets/projects validated single-line via stringWidth')
