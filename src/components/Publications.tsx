'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface Publication {
  title: string
  authors: string
  journal: string
  href: string
}

const publications: Publication[] = [
  {
    title:
      'Short-Term Outcomes of a Structured Self-Rehabilitation Program After Mini-Open Latarjet Procedure in Military Personnel: A Prospective Observational Study',
    authors: 'K Bekas, I Bampis, A Stamatopoulos, AA Papadimitriou, K Vamvakeros, I Kechagias, A Boutsiadis',
    journal: 'Medical Sciences 13 (4), 307',
    href: 'https://pubmed.ncbi.nlm.nih.gov/41440539/',
  },
  {
    title:
      'Reimagining Knee Surgery: The Promises and Pitfalls of Augmented and Virtual Reality in Orthopedic Training and Preoperative Planning',
    authors: 'K Bekas, A Stamatopoulos, I Kechagias, K Vamvakeros, I Bampis, A Boutsiadis',
    journal: 'The Hive - Musculoskeletal Journal',
    href: 'https://thehive-musculoskeletal.com/articles/689d986b6f58907bfb0311e0/detail',
  },
  {
    title: 'The role of bone mineral density in a successful lumbar interbody fusion: a narrative review',
    authors: 'KN Bekas, C Zafeiris',
    journal: 'Cureus 16 (2), e54727',
    href: 'https://pubmed.ncbi.nlm.nih.gov/38524011/',
  },
  {
    title: 'Dislocation of total hip arthroplasty of femoral neck fracture in the elderly: a narrative review',
    authors: 'E Skotidis, K Bekas, I Kechagias, I Tsakonas-Ntervakos, SP Galanakos, K Kateros',
    journal: 'Cureus 15 (10)',
    href: 'https://pubmed.ncbi.nlm.nih.gov/37916228/',
  },
  {
    title: 'Acute calcific periarthritis at the metatarsophalangeal joint-a case report',
    authors: 'K Bekas, K Giannikas',
    journal: 'Journal of the Foot & Ankle 17 (1), 49-52',
    href: 'https://scijfootankle.emnuvens.com.br/JournalFootAnkle/article/view/1683',
  },
  {
    title: 'Cylindrical Bone Autograft Fixed With Compression Headless Screws Is An Effective Treatment Option For Radial Neck Fractures',
    authors: 'J Bampis, I Lachanas, F Zigras, K Bekas, N Zervakis, A Boutsiadis',
    journal: 'Journal of Shoulder and Elbow Surgery 31 (3), e155',
    href: 'https://www.jshoulderelbow.org/article/S1058-2746(22)00089-1/abstract',
  },
]

export default function Publications() {
  const reduced = useReducedMotion()
  const { lang } = useLanguage()
  const scrollRef  = useRef<HTMLDivElement>(null)
  const wheelLock  = useRef(false)

  // Vertical wheel scroll steps exactly one card at a time, in order,
  // instead of free-scrolling the row (only active inside this row).
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      if (wheelLock.current) return

      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      const gap  = parseFloat(getComputedStyle(el).columnGap || '0')
      const step = first.getBoundingClientRect().width + gap

      wheelLock.current = true
      el.scrollBy({ left: e.deltaY > 0 ? step : -step, behavior: 'smooth' })
      setTimeout(() => { wheelLock.current = false }, 400)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section
      id="publications"
      className="bg-surface py-20 lg:py-28 border-t border-navy-950/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">
              {lang === 'el' ? 'Επιστημονικές Δημοσιεύσεις' : 'Scientific Publications'}
            </span>
          </div>
          <h2 className="type-h2 text-navy-950">
            {lang === 'el'
              ? 'Δημοσιεύσεις σε διεθνή επιστημονικά περιοδικά'
              : 'Publications in peer-reviewed journals'}
          </h2>
        </motion.div>

        {/* Horizontal scroll — 3 cards visible, scroll for the rest */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4">
          {publications.map((pub, i) => (
            <motion.a
              key={pub.href}
              href={pub.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.63rem)] lg:w-[calc(33.333%-0.84rem)] flex flex-col gap-4 p-6 rounded-2xl border border-navy-950/[0.08] bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:border-teal-400/30 transition-colors duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-400/[0.12] flex items-center justify-center shrink-0 group-hover:bg-teal-400/[0.18] transition-colors duration-200">
                  <BookOpen className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-1.5 group-hover:text-teal-600 transition-colors" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="type-body-sm font-semibold text-navy-950 leading-snug">
                  {pub.title}
                </p>
                <p className="type-caption text-navy-950/45 mt-2.5">
                  {pub.authors}
                </p>
                <p className="type-caption text-navy-950/45 mt-1 italic">
                  {pub.journal}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
