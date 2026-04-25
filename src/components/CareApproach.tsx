import { motion, useReducedMotion } from 'motion/react'
import { UserCheck, ScanSearch, Dumbbell, Leaf } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Pillar {
  num: string
  icon: LucideIcon
  title: string
  description: string
}

const pillars: Pillar[] = [
  {
    num: '01',
    icon: UserCheck,
    title: 'Patient-Centred Care',
    description: 'Each patient receives a personalised treatment plan shaped around their specific condition, lifestyle, and activity goals — not a one-size-fits-all protocol.',
  },
  {
    num: '02',
    icon: ScanSearch,
    title: 'Diagnostic Precision',
    description: 'Advanced imaging, arthroscopic assessment, and a rigorous clinical evaluation process ensure an accurate diagnosis before any intervention is considered.',
  },
  {
    num: '03',
    icon: Dumbbell,
    title: 'Athlete-Focused Protocols',
    description: 'Dedicated surgical and rehabilitation pathways for athletes of all levels — from recreational runners to professional competitors — prioritising safe, full return to sport.',
  },
  {
    num: '04',
    icon: Leaf,
    title: 'Regenerative Innovation',
    description: 'Cutting-edge biological therapies — PRP, stem cell augmentation, and advanced materials — are integrated where evidence supports them, accelerating recovery outcomes.',
  },
]

export default function CareApproach() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-navy-950 py-24 lg:py-36 overflow-hidden">
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
            <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">The Care Approach</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-light leading-[1.05] text-white max-w-xl"
          >
            Surgery guided by <em>principles</em>, not protocols
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
              className="relative p-8 rounded-2xl border border-white/[0.07] bg-navy-800/30 group hover:border-white/[0.12] transition-colors duration-300"
            >
              <div className="flex items-start gap-6">
                <span
                  className="font-display text-6xl font-light leading-none shrink-0 mt-1"
                  style={{ color: 'rgba(200,169,110,0.35)' }}
                >
                  {num}
                </span>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-400/[0.1] flex items-center justify-center">
                      <Icon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-medium text-white">{title}</h3>
                  </div>
                  <p className="font-sans text-sm text-white/45 leading-relaxed">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
