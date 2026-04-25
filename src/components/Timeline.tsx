import { motion, useReducedMotion } from 'motion/react'
import { GraduationCap, Building2, Trophy, BookOpen, Award, Microscope } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface TimelineItem {
  year: string
  icon: LucideIcon
  title: string
  institution: string
  description: string
  side: 'left' | 'right'
}

const items: TimelineItem[] = [
  {
    year: '2015',
    icon: GraduationCap,
    title: 'Doctor of Medicine',
    institution: 'Military College of Officers Medical School, Athens',
    description: "Graduated from the Medical School of the Hellenic Army's officer academy, establishing a foundation of discipline and clinical excellence.",
    side: 'left',
  },
  {
    year: '2015–2026',
    icon: Building2,
    title: 'Orthopaedic & Traumatology Residency',
    institution: '401 ΓΣΝΑ · Γ. Γεννηματάς · Παίδων "Π. & Α. Κυριακού"',
    description: "Full specialist training in orthopaedics and traumatology across three of Athens' leading hospitals, covering the full spectrum of surgical and conservative care.",
    side: 'right',
  },
  {
    year: '2019',
    icon: Trophy,
    title: 'FIFA Diploma in Football Medicine',
    institution: 'FIFA Medical Network',
    description: 'Certified physician of the FIFA Football Medicine programme — one of the premier international qualifications in sports medicine for athletes of all levels.',
    side: 'left',
  },
  {
    year: '2022',
    icon: BookOpen,
    title: 'MSc Metabolic Bone Diseases',
    institution: 'National & Kapodistrian University of Athens',
    description: 'Postgraduate research degree focusing on bone metabolism, osteoporosis, and the role of bone mineral density in orthopaedic surgical outcomes.',
    side: 'right',
  },
  {
    year: '2025',
    icon: Award,
    title: 'ON Foundation Clinical Fellowship',
    institution: 'Hirslanden SportClinic, Zürich',
    description: "Competitive international fellowship at one of Europe's foremost sports orthopaedic centres, advancing skills in arthroscopic and reconstructive knee and shoulder surgery.",
    side: 'left',
  },
  {
    year: '2026',
    icon: Microscope,
    title: 'Registrar — Orthopaedic Surgery',
    institution: '401 ΓΣΝΑ · Bioclinic Athens (Private Practice)',
    description: 'Currently serving as Orthopaedic Registrar at 401 ΓΣΝΑ while conducting a private practice at Bioclinic Athens for sports injuries, arthroplasty, and biological therapies.',
    side: 'right',
  },
]

export default function Timeline() {
  const reduced = useReducedMotion()

  return (
    <section id="credentials" className="bg-navy-900 py-24 lg:py-36 overflow-hidden">
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
            <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">Credentials</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-light leading-[1.05] text-white max-w-xl"
          >
            A career built on <em>rigorous</em> foundations
          </motion.h2>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.07] -translate-x-1/2" />
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
          <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.07]" />
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
  year: string
  icon: LucideIcon
  title: string
  institution: string
  description: string
  align: 'left' | 'right'
}) {
  return (
    <div className={`space-y-3 ${align === 'right' ? 'items-end flex flex-col' : ''}`}>
      <span className="inline-block font-display text-3xl font-light text-gold-400 leading-none">
        {year}
      </span>
      <div className={`p-5 rounded-2xl border border-white/[0.07] bg-navy-800/40 max-w-sm ${align === 'right' ? 'text-right' : ''}`}>
        <div className={`flex items-center gap-3 mb-3 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          <div className="w-8 h-8 rounded-lg bg-teal-400/[0.1] flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-display text-base font-medium text-white leading-tight">{title}</p>
            <p className="font-sans text-[11px] text-teal-400/70 tracking-wide mt-0.5">{institution}</p>
          </div>
        </div>
        <p className="font-sans text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
