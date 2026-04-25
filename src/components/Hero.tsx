import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Award, Star, Users, ChevronDown } from 'lucide-react'

const floatingCards = [
  { icon: Award, value: '20+', label: 'Years Experience', pos: '-left-12 top-10', floatY: -7, delay: 0 },
  { icon: Star, value: '4.9★', label: 'Patient Rating', pos: '-right-8 top-1/3', floatY: -9, delay: 0.3 },
  { icon: Users, value: '3,200+', label: 'Patients Helped', pos: '-left-10 bottom-20', floatY: -6, delay: 0.6 },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 40])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-950">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 75% 15%, rgba(45,212,191,0.09) 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 15% 85%, rgba(200,169,110,0.05) 0%, transparent 55%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      {/* Giant background initials */}
      <motion.div
        style={reduced ? {} : { y: bgY }}
        className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display font-light text-white leading-none"
          style={{ fontSize: 'clamp(12rem, 30vw, 38rem)', opacity: 0.018, letterSpacing: '-0.04em' }}
        >
          AC
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={reduced ? {} : { opacity: textOpacity, y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-center">

          {/* Left: text */}
          <div className="space-y-8">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-teal-400" />
              <span className="text-teal-400 font-sans text-xs font-semibold tracking-[0.22em] uppercase">
                Consultant Cardiologist
              </span>
            </motion.div>

            <div className="space-y-1 overflow-hidden">
              <motion.h1
                initial={reduced ? false : { opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light leading-[0.9] tracking-tight text-white"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 7.5rem)' }}
              >
                <em>Dr. Alexander</em>
                <br />
                <span className="text-white/85">Chen</span>
              </motion.h1>
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-white/50 text-lg font-light leading-relaxed max-w-[42ch]"
            >
              Precision cardiovascular care at the intersection of advanced science
              and genuine compassion. Twenty years advancing cardiac medicine.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group relative px-8 py-4 bg-teal-400 text-navy-950 font-sans font-semibold text-sm tracking-wide rounded-full overflow-hidden transition-colors duration-300 hover:bg-teal-300"
              >
                Book a Consultation
              </a>
              <a
                href="#expertise"
                className="px-8 py-4 border border-white/20 text-white/75 font-sans font-medium text-sm tracking-wide rounded-full hover:border-teal-400/50 hover:text-teal-300 transition-all duration-300"
              >
                View Expertise
              </a>
            </motion.div>
          </div>

          {/* Right: profile card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-64 lg:w-72 xl:w-80 mx-auto"
          >
            {/* Profile card */}
            <div
              className="relative rounded-3xl overflow-hidden border border-white/[0.08]"
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(160deg, #141C35 0%, #0F1629 50%, #1E2A4A 100%)',
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 60% 30%, rgba(45,212,191,0.07) 0%, transparent 60%)' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-28 h-28 rounded-full border border-teal-400/25 flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.1) 0%, rgba(45,212,191,0.03) 100%)' }}
                >
                  <span className="font-display text-5xl font-light italic text-teal-400/70">AC</span>
                </div>
                <div className="text-center">
                  <p className="font-display text-lg font-medium text-white/80">Dr. Alexander Chen</p>
                  <p className="font-sans text-[11px] tracking-[0.18em] text-white/35 uppercase mt-1">M.D. · F.A.C.C.</p>
                </div>
              </div>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,13,26,0.7) 0%, transparent 50%)' }}
              />
            </div>

            {/* Floating metric cards */}
            {floatingCards.map(({ icon: Icon, value, label, pos, floatY, delay: d }) => (
              <motion.div
                key={label}
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + d }}
                className={`absolute ${pos} hidden sm:block`}
              >
                <motion.div
                  animate={reduced ? {} : { y: [0, floatY, 0] }}
                  transition={{ duration: 3.5 + d, repeat: Infinity, ease: 'easeInOut', delay: d * 0.5 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.08] shadow-2xl"
                  style={{ background: 'rgba(15,22,41,0.85)', backdropFilter: 'blur(16px)' }}
                >
                  <div className="w-8 h-8 rounded-xl bg-teal-400/[0.12] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-white leading-none">{value}</p>
                    <p className="font-sans text-[10px] text-white/45 mt-0.5 whitespace-nowrap">{label}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.25em] text-white/25 uppercase">Scroll</span>
        <motion.div
          animate={reduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
