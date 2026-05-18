import { motion, useReducedMotion } from 'motion/react'
import { Dumbbell, ScanSearch, Bone, FlaskConical, Bandage } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
}

export default function Expertise() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const services: { icon: LucideIcon; title: string; description: string }[] = [
    { icon: Dumbbell,     title: t.expertiseS1Title, description: t.expertiseS1Desc },
    { icon: ScanSearch,   title: t.expertiseS2Title, description: t.expertiseS2Desc },
    { icon: Bone,         title: t.expertiseS3Title, description: t.expertiseS3Desc },
    { icon: FlaskConical, title: t.expertiseS4Title, description: t.expertiseS4Desc },
    { icon: Bandage,      title: t.expertiseS5Title, description: t.expertiseS5Desc },
  ]

  return (
    <section id="expertise" className="bg-home-page py-24 lg:py-36 border-t border-navy-950/[0.07]">
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
            <span className="type-eyebrow text-teal-400">{t.expertiseLabel}</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="type-h2 text-navy-950 max-w-2xl"
          >
            {t.expertiseHeading}
          </motion.h2>
        </div>

        <motion.div
          variants={reduced ? undefined : container}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={reduced ? undefined : card}
              whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.25 } }}
              className="group relative p-7 rounded-2xl border border-navy-950/[0.08] bg-white cursor-default transition-all duration-300 hover:border-teal-400/30 hover:bg-surface hover:shadow-sm"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(circle at 30% 30%, rgba(45,212,191,0.04) 0%, transparent 60%)' }}
              />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-teal-400/[0.1] flex items-center justify-center mb-5 group-hover:bg-teal-400/[0.15] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                </div>
                <h3 className="type-h3 text-navy-950 mb-3 group-hover:text-primary transition-colors duration-300">
                  {title}
                </h3>
                <p className="type-body-sm text-navy-950/60">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
