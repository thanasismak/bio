import { motion, useReducedMotion } from 'motion/react'
import { assetUrl } from '../utils/assets'
import { useLanguage } from '../contexts/LanguageContext'

export default function Hospitals() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const hospitals = [
    {
      src: assetUrl('/hospitals/biokliniki.jpg'),
      alt: 'Bioclinic Athens',
      name: 'Bioclinic Athens',
      description: t.hospitalBioclinicDesc,
    },
    {
      src: assetUrl('/hospitals/ygeia.jpg'),
      alt: 'Υγεία',
      name: 'Υγεία Hospital',
      description: t.hospitalYgeiaDesc,
    },
  ]

  return (
    <section className="bg-surface py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* Left: title + description */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-36"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-teal-400" />
              <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">
                {t.hospitalsLabel}
              </span>
            </div>

            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.1] text-navy-950 mb-6">
              {t.hospitalsHeading}
            </h2>

            <p className="font-sans text-base text-navy-950/55 leading-relaxed max-w-sm">
              {t.hospitalsDesc}
            </p>

            <div className="mt-10 h-px w-12 bg-teal-400/40" />
          </motion.div>

          {/* Right: vertical hospital cards */}
          <div className="space-y-5">
            {hospitals.map(({ src, alt, name, description }, i) => (
              <motion.div
                key={name}
                initial={reduced ? false : { opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group flex items-center gap-6 p-6 rounded-2xl border border-navy-950/[0.07] bg-white hover:border-teal-400/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-28 h-20 bg-white rounded-xl flex items-center justify-center shrink-0 border border-navy-950/[0.06] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <img src={src} alt={alt} className="max-h-10 max-w-[5.5rem] object-contain" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-navy-950">{name}</p>
                  <p className="font-sans text-sm text-navy-950/45 mt-1 leading-relaxed">{description}</p>
                </div>
                <div className="ml-auto w-0.5 h-8 rounded-full bg-teal-400/0 group-hover:bg-teal-400/50 transition-colors duration-300 shrink-0" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
