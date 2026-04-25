import { motion, useReducedMotion } from 'motion/react'
import { Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  condition: string
  years: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Dr. Chen's expertise is matched only by his patience in explaining every detail of my condition. For the first time in years, I feel genuinely understood — and genuinely well.",
    name: 'Sarah M.',
    condition: 'Coronary Artery Disease',
    years: 'Patient since 2019',
  },
  {
    quote: "After three years of inconclusive tests elsewhere, Dr. Chen identified my arrhythmia within two consultations. The precision and the calm confidence he brings to every appointment are extraordinary.",
    name: 'Robert K.',
    condition: 'Atrial Fibrillation',
    years: 'Patient since 2021',
  },
  {
    quote: "The preventive programme Dr. Chen designed for me completely changed my relationship with my health. I am healthier now, at 58, than I was at 45. That is not a small thing.",
    name: 'Linda T.',
    condition: 'Preventive Cardiology',
    years: 'Patient since 2017',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as number[] } },
}

export default function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section id="testimonials" className="bg-navy-950 py-24 lg:py-36 overflow-hidden">
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
            <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">Patient Testimonials</span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-light leading-[1.05] text-white max-w-xl"
          >
            Outcomes measured in <em>lives changed</em>
          </motion.h2>
        </div>

        <motion.div
          variants={reduced ? undefined : container}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {testimonials.map(({ quote, name, condition, years }) => (
            <motion.div
              key={name}
              variants={reduced ? undefined : item}
              className="relative p-8 rounded-2xl border border-white/[0.07] bg-navy-800/30 flex flex-col gap-6 group hover:border-white/[0.12] transition-colors duration-300"
            >
              {/* Gold quote mark */}
              <span
                className="font-display text-8xl font-light leading-none -mb-4 -mt-2 select-none"
                style={{ color: 'rgba(200,169,110,0.25)' }}
                aria-hidden="true"
              >
                "
              </span>

              <p className="font-sans text-sm text-white/55 leading-relaxed flex-1 italic">
                {quote}
              </p>

              <div className="border-t border-white/[0.06] pt-5 flex items-end justify-between">
                <div>
                  <p className="font-display text-base font-medium text-white">{name}</p>
                  <p className="font-sans text-xs text-teal-400/70 mt-0.5">{condition}</p>
                  <p className="font-sans text-[10px] text-white/30 mt-0.5 tracking-wide">{years}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center font-sans text-xs text-white/25"
        >
          Patient testimonials are used with permission. Names are partially anonymised for privacy.
        </motion.p>
      </div>
    </section>
  )
}
