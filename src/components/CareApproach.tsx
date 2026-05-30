import { motion, useReducedMotion } from 'motion/react'
import type { Variants } from 'motion/react'
import { UserCheck, ScanSearch, Dumbbell, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

const card: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    opacity: 1,
    transition: { duration: 0.72, ease: [0.77, 0, 0.175, 1] },
  },
}

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
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">{t.careLabel}</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="type-h2 text-navy-950 max-w-xl"
          >
            {t.careHeading}
          </motion.h2>
        </div>

        <motion.div
          variants={reduced ? undefined : container}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {pillars.map(({ num, icon: Icon, title, description }) => (
            <motion.div
              key={num}
              variants={reduced ? undefined : card}
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
        </motion.div>
      </div>
    </section>
  )
}
