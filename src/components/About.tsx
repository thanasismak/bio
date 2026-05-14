import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle } from 'lucide-react'
import { assetUrl } from '../utils/assets'

const credentials = [
  'M.D., Military College of Officers Medical School, Athens (2015)',
  'MSc Metabolic Bone Diseases, National & Kapodistrian University of Athens',
  'FIFA Diploma in Football Medicine — FIFA Medical Network',
  'Member, ESSKA & AO Foundation',
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="bg-navy-900 py-24 lg:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: profile card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden border border-white/[0.07] mx-auto max-w-sm lg:max-w-none"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={assetUrl('/profile/hero.jpeg')}
                alt="Dr. Kyriakos Bekas"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,13,26,0.82) 0%, rgba(8,13,26,0.05) 45%, transparent 65%)' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(8,13,26,0.7) 0%, transparent 100%)' }}
              >
                <div className="flex justify-center gap-6">
                  {['401 ΓΣΝΑ', 'Bioclinic Athens', 'Hirslanden Zürich'].map((inst) => (
                    <span key={inst} className="font-sans text-[9px] tracking-widest text-white/35 uppercase">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full -z-10"
              style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)' }}
            />
          </motion.div>

          {/* Right: text content */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-teal-400" />
                <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">About</span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-light leading-[1.05] text-white mb-6">
                A decade of <em>precision</em> at the intersection of sport and surgery
              </h2>
              <p className="font-sans text-white/75 text-base leading-relaxed mb-4">
                Dr. Kyriakos Bekas is an Orthopedic Surgeon specialising in sports injuries and joint
                reconstruction surgery. A graduate of the Military College of Officers Medical School
                (2015), he completed his residency across leading Athenian hospitals — including 401
                ΓΣΝΑ and Γ. Γεννηματάς — and pursued advanced fellowship training at the renowned
                SportClinic Zurich Hirslanden in Switzerland.
              </p>
              <p className="font-sans text-white/75 text-base leading-relaxed">
                He holds a Master's degree in Metabolic Bone Diseases from the National and
                Kapodistrian University of Athens and is a certified physician of the FIFA Football
                Medicine programme. Since 2026, Dr. Bekas serves as Registrar at 401 ΓΣΝΑ and
                maintains a private practice at Bioclinic Athens. He is an active member of ESSKA
                and AO Foundation.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {credentials.map((c, i) => (
                <motion.div
                  key={c}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="font-sans text-sm text-white/75">{c}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
