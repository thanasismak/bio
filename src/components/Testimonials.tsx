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
    quote: "After my ACL tear, I was told by others I'd be out for a year minimum. Dr. Bekas got me back on the pitch in seven months — fully, properly back. The precision of the procedure and the personalised rehab protocol made all the difference.",
    name: 'Andreas P.',
    condition: 'ACL Reconstruction',
    years: 'Patient since 2023',
  },
  {
    quote: "I had been managing chronic shoulder pain for three years before meeting Dr. Bekas. He identified the problem immediately, performed the arthroscopy, and within four months I was back to training overhead. Outstanding care.",
    name: 'Maria K.',
    condition: 'Shoulder Arthroscopy',
    years: 'Patient since 2022',
  },
  {
    quote: "My hip replacement at 62 gave me my life back. Dr. Bekas explained every step, answered every question, and the recovery was smoother than I could have imagined. I am walking without pain for the first time in years.",
    name: 'Nikos T.',
    condition: 'Total Hip Arthroplasty',
    years: 'Patient since 2024',
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
    <section id="testimonials" className="bg-surface py-24 lg:py-36 overflow-hidden">
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
            className="font-display text-[clamp(2.4rem,4.5vw,4rem)] font-light leading-[1.05] text-navy-950 max-w-xl"
          >
            Outcomes measured in <em>lives restored</em>
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
