import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle } from 'lucide-react'

const credentials = [
  'M.D., Harvard Medical School',
  'Fellowship, Cleveland Clinic Cardiology',
  'Fellow, American College of Cardiology',
  'Board Certified, Cardiovascular Disease',
]

export default function About() {
  const reduced = useReducedMotion()

  return (
    <section id="about" className="bg-navy-950 py-24 lg:py-36 overflow-hidden">
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
              style={{
                aspectRatio: '4/5',
                background: 'linear-gradient(145deg, #141C35 0%, #0F1629 60%, #1E2A4A 100%)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 40% 25%, rgba(45,212,191,0.08) 0%, transparent 55%)' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <div
                  className="w-36 h-36 rounded-full flex items-center justify-center border border-teal-400/20"
                  style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.1) 0%, rgba(20,28,53,0.6) 100%)' }}
                >
                  <span className="font-display text-6xl font-light italic text-teal-400/60">AC</span>
                </div>
                <div className="text-center px-8">
                  <p className="font-display text-2xl font-medium text-white/85 italic">Dr. Alexander Chen</p>
                  <p className="font-sans text-xs tracking-[0.2em] text-white/35 uppercase mt-2">
                    Consultant Cardiologist
                  </p>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(8,13,26,0.9) 0%, transparent 100%)' }}
              >
                <div className="flex justify-center gap-6">
                  {['Stanford University', 'Cleveland Clinic', 'Harvard Medical'].map((inst) => (
                    <span key={inst} className="font-sans text-[9px] tracking-widest text-white/30 uppercase">
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative element */}
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
                <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">
                  About
                </span>
              </div>
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-light leading-[1.05] text-white mb-6">
                Two decades of <em>advancing</em> cardiovascular medicine
              </h2>
              <p className="font-sans text-white/50 text-base leading-relaxed mb-4">
                Dr. Alexander Chen is a board-certified cardiologist with over twenty years of clinical
                experience treating complex cardiovascular conditions. Trained at Harvard Medical School
                and the Cleveland Clinic, he combines cutting-edge diagnostic precision with a deeply
                personal approach to patient care.
              </p>
              <p className="font-sans text-white/50 text-base leading-relaxed">
                His research spans cardiac imaging, interventional procedures, and preventive cardiology,
                with 47 peer-reviewed publications and active contributions to international cardiology
                conferences. He currently practices at the National Heart Institute and holds an
                associate professorship at Stanford University School of Medicine.
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
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span className="font-sans text-sm text-white/65">{c}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#credentials"
                className="inline-flex items-center gap-2 font-sans text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200 group"
              >
                View full credentials
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
