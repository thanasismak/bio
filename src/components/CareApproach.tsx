import { motion, useReducedMotion } from 'motion/react'
import { UserCheck, ScanSearch, Dumbbell, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function CareApproach() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const pillars: { num: string; icon: LucideIcon; title: string; description: string }[] = [
    { num: '01', icon: UserCheck, title: t.careP1Title, description: t.careP1Desc },
    { num: '02', icon: ScanSearch, title: t.careP2Title, description: t.careP2Desc },
    { num: '03', icon: Dumbbell,   title: t.careP3Title, description: t.careP3Desc },
    { num: '04', icon: Leaf,       title: t.careP4Title, description: t.careP4Desc },
  ]

  return (
    <section className="bg-surface py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">{t.careLabel}</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="type-h2 text-navy-950 max-w-xl"
          >
            {t.careHeading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map(({ num, icon: Icon, title, description }, i) => (
            <motion.div
              key={num}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative p-8 rounded-2xl border border-navy-950/[0.07] bg-white group hover:border-teal-400/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <span
                  className="type-stat text-6xl shrink-0 mt-1"
                  style={{ color: 'rgba(160,120,60,0.30)' }}
                >
                  {num}
                </span>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-400/[0.1] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="type-h3 text-navy-950">{title}</h3>
                  </div>
                  <p className="type-body-sm text-navy-950/60">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
