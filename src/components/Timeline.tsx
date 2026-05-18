import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { GraduationCap, Building2, Trophy, BookOpen, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { assetUrl } from '../utils/assets'
import { useLanguage } from '../contexts/LanguageContext'

type Side = 'left' | 'right'

interface TimelineItem {
  year: string
  icon: LucideIcon
  title: string
  institution: string
  description: string
  side: Side
}

export default function Timeline() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY     = useTransform(scrollYProgress, [0, 1], ['-30px', '60px'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 0.97])

  const items: TimelineItem[] = [
    { year: '2025',      icon: Award,        title: t.tl1Title, institution: t.tl1Inst, description: t.tl1Desc, side: 'left' },
    { year: '2022',      icon: BookOpen,     title: t.tl2Title, institution: t.tl2Inst, description: t.tl2Desc, side: 'right' },
    { year: '2019',      icon: Trophy,       title: t.tl3Title, institution: t.tl3Inst, description: t.tl3Desc, side: 'left' },
    { year: '2015–2026', icon: Building2,    title: t.tl4Title, institution: t.tl4Inst, description: t.tl4Desc, side: 'right' },
    { year: '2015',      icon: GraduationCap, title: t.tl5Title, institution: t.tl5Inst, description: t.tl5Desc, side: 'left' },
  ]

  return (
    <section ref={ref} id="credentials" className="relative bg-surface py-24 lg:py-36 overflow-hidden">

      {/* Full-section watermark */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.0, ease: 'easeOut' }}
        style={reduced ? {} : { y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        <img
          src={assetUrl('/brand/ortho-content.jpg')}
          alt=""
          className="w-full h-full object-cover object-right"
          style={{ opacity: 0.11 }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">{t.timelineLabel}</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="type-h2 text-navy-950 max-w-xl"
          >
            {t.timelineHeading}
          </motion.h2>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-navy-950/[0.10] -translate-x-1/2" />
          <div className="space-y-14">
            {items.map(({ year, icon: Icon, title, institution, description, side }, i) => (
              <motion.div
                key={year + title}
                initial={reduced ? false : { opacity: 0, x: side === 'left' ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative grid grid-cols-2 gap-12"
              >
                <div className="absolute left-1/2 top-6 w-3 h-3 rounded-full bg-teal-400/60 border-2 border-teal-400/30 -translate-x-1/2 z-10" />
                {side === 'left' ? (
                  <>
                    <div className="text-right pr-10">
                      <TimelineCard year={year} icon={Icon} title={title} institution={institution} description={description} align="right" />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="pl-10">
                      <TimelineCard year={year} icon={Icon} title={title} institution={institution} description={description} align="left" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-navy-950/[0.10]" />
          <div className="space-y-10">
            {items.map(({ year, icon: Icon, title, institution, description }, i) => (
              <motion.div
                key={year + title}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="relative"
              >
                <div className="absolute -left-8 top-5 w-2.5 h-2.5 rounded-full bg-teal-400/60 border border-teal-400/30 -translate-x-1/2" />
                <TimelineCard year={year} icon={Icon} title={title} institution={institution} description={description} align="left" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  year, icon: Icon, title, institution, description, align,
}: {
  year: string; icon: LucideIcon; title: string; institution: string; description: string; align: 'left' | 'right'
}) {
  return (
    <div className={`space-y-3 ${align === 'right' ? 'items-end flex flex-col' : ''}`}>
      <span className="inline-block type-stat text-3xl text-gold-400">
        {year}
      </span>
      <div className={`p-5 rounded-2xl border border-navy-950/[0.08] bg-white shadow-sm max-w-sm ${align === 'right' ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-3 mb-3 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-teal-400/[0.1] flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="type-h3 text-navy-950 text-base">{title}</p>
            <p className="type-caption text-teal-400/80 mt-0.5">{institution}</p>
          </div>
        </div>
        <p className="type-body-sm text-navy-950/60">{description}</p>
      </div>
    </div>
  )
}
