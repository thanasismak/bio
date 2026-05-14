import { motion, useReducedMotion } from 'motion/react'
import { assetUrl } from '../utils/assets'

const hospitals = [
  {
    src: assetUrl('/hospitals/biokliniki.jpg'),
    alt: 'Bioclinic Athens',
    name: 'Bioclinic Athens',
    description: 'Private practice & outpatient consultations',
  },
  {
    src: assetUrl('/hospitals/iaso.jpg'),
    alt: 'ΙΑΣΩ Γενική Κλινική',
    name: 'ΙΑΣΩ General Clinic',
    description: 'Surgical procedures & inpatient care',
  },
  {
    src: assetUrl('/hospitals/ygeia.jpg'),
    alt: 'Υγεία',
    name: 'Υγεία Hospital',
    description: 'Orthopaedic surgery & trauma unit',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hospitals() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-surface py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-10 bg-teal-400" />
            <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">
              Collaborating Hospitals
            </span>
          </motion.div>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.2rem,4vw,3.6rem)] font-light leading-[1.05] text-navy-950 max-w-xl"
          >
            Practicing at <em>Greece's leading</em> private hospitals
          </motion.h2>
        </div>

        <motion.div
          variants={reduced ? undefined : container}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        >
          {hospitals.map(({ src, alt, name, description }) => (
            <motion.div
              key={name}
              variants={reduced ? undefined : card}
              whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.25 } }}
              className="group flex flex-col items-center gap-5 p-8 rounded-2xl border border-white/[0.07] bg-navy-800/30 hover:border-white/[0.14] transition-colors duration-300"
            >
              {/* White logo container */}
              <div className="w-full bg-white rounded-xl px-6 py-5 flex items-center justify-center h-20">
                <img
                  src={src}
                  alt={alt}
                  className="max-h-10 w-auto object-contain"
                />
              </div>

              <div className="text-center">
                <p className="font-display text-base font-medium text-white/80">{name}</p>
                <p className="font-sans text-xs text-white/35 mt-1">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
