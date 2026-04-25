import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Award, Trophy, Users, ChevronDown } from 'lucide-react'

const floatingCards = [
  { icon: Award, value: '10+', label: 'Years Experience', pos: '-left-12 top-10', floatY: -7, delay: 0 },
  { icon: Trophy, value: 'FIFA', label: 'Certified', pos: '-right-8 top-1/3', floatY: -9, delay: 0.3 },
  { icon: Users, value: '4.9★', label: 'Patient Rating', pos: '-left-10 bottom-20', floatY: -6, delay: 0.6 },
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
          KB
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
                Orthopedic Surgeon
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
                <em>Dr. Kyriakos</em>
                <br />
                <span className="text-white/85">Bekas</span>
              </motion.h1>
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-white/50 text-lg font-light leading-relaxed max-w-[42ch]"
            >
              Precision orthopaedic surgery for sports injuries and joint reconstruction.
              FIFA-certified. Serving elite athletes and everyday patients alike.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="px-8 py-4 bg-teal-400 text-navy-950 font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal-300 transition-colors duration-300"
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

          {/* Right: profile card with real photo */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-64 lg:w-72 xl:w-80 mx-auto"
          >
            {/* Profile card */}
            <div
              className="relative rounded-3xl overflow-hidden border border-white/[0.08]"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src="/hero.jpeg"
                alt="Dr. Kyriakos Bekas"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Gradient overlay for badge readability */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,13,26,0.88) 0%, rgba(8,13,26,0.08) 45%, transparent 70%)' }}
              />
              {/* Credential badge */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center">
                <p className="font-display text-lg font-medium text-white italic">Dr. Kyriakos Bekas</p>
                <p className="font-sans text-[10px] tracking-[0.2em] text-white/45 uppercase mt-1">M.D. · M.Sc. · FIFA</p>
              </div>
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
