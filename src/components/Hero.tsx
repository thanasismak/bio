import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Award, Trophy, Users, ChevronDown } from 'lucide-react'
import { assetUrl } from '../utils/assets'

const floatingCards = [
  { icon: Award,  value: '10+',  label: 'Years Experience', pos: '-left-12 top-10',    floatY: -7, delay: 0,   enterX: -20 },
  { icon: Trophy, value: 'FIFA', label: 'Certified',        pos: '-right-8 top-1/3',   floatY: -9, delay: 0.2, enterX:  20 },
  { icon: Users,  value: '4.9★', label: 'Patient Rating',   pos: '-left-10 bottom-20', floatY: -6, delay: 0.4, enterX: -20 },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY     = useTransform(scrollYProgress, [0, 1],    [0, 140])
  const bgScale = useTransform(scrollYProgress, [0, 0.6],  [1, 1.08])

  const leftY       = useTransform(scrollYProgress, [0, 0.7],  [0, 85])
  const leftOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0])

  const rightY       = useTransform(scrollYProgress, [0, 0.7],  [0, 38])
  const rightOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const rightScale   = useTransform(scrollYProgress, [0, 0.55], [1, 1.05])

  const floatOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const cueOpacity   = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden">

      <div className="absolute inset-0 bg-navy-950">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 60% at 75% 15%, rgba(45,212,191,0.09) 0%, transparent 65%)',
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 50% 50% at 15% 85%, rgba(200,169,110,0.05) 0%, transparent 55%)',
        }} />
      </div>

      {/* Background initials */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        style={reduced ? {} : { y: bgY, scale: bgScale }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="font-display font-light text-white leading-none"
          style={{ fontSize: 'clamp(12rem, 30vw, 38rem)', opacity: 0.018, letterSpacing: '-0.04em' }}
        >
          KB
        </span>
      </motion.div>

      {/* ── Main grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-14 lg:gap-20 items-center">

          {/* Left text column */}
          <motion.div
            style={reduced ? {} : { y: leftY, opacity: leftOpacity }}
            className="space-y-8"
          >
            {/* Specialty pill */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-teal-400" />
              <span className="text-teal-400 font-sans text-xs font-semibold tracking-[0.22em] uppercase">
                Orthopedic Surgeon
              </span>
            </motion.div>

            {/* Doctor name */}
            <div className="overflow-hidden">
              <motion.h1
                initial={reduced ? false : { opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light leading-[0.9] tracking-tight text-white"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 7.5rem)' }}
              >
                <em>Dr. Kyriakos</em>
                <br />
                <span className="text-white/85">Bekas</span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={reduced ? false : { opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-white/50 text-lg font-light leading-relaxed max-w-[42ch]"
            >
              Precision orthopaedic surgery for sports injuries and joint reconstruction.
              FIFA-certified. Serving elite athletes and everyday patients alike.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.68, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          </motion.div>

          {/* Photo card */}
          <motion.div
            style={reduced ? {} : { y: rightY, opacity: rightOpacity, scale: rightScale }}
            className="relative w-64 lg:w-72 xl:w-80 mx-auto"
          >
            {/* Entrance animation wrapper */}
            <motion.div
              initial={reduced ? false : { opacity: 0, x: 70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.05, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Breathing glow ring */}
              <motion.div
                animate={reduced ? {} : { opacity: [0.3, 0.7, 0.3], scale: [0.97, 1.02, 0.97] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl -z-10"
                style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)' }}
              />

              {/* Photo card */}
              <motion.div
                animate={reduced ? {} : {
                  boxShadow: [
                    '0 0 0px rgba(45,212,191,0)',
                    '0 0 28px rgba(45,212,191,0.10)',
                    '0 0 0px rgba(45,212,191,0)',
                  ],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="relative rounded-3xl overflow-hidden border border-white/[0.08]"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Photo — clip-path reveal upward */}
                <motion.div
                  initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                  transition={{ duration: 1.3, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={assetUrl('/profile/hero.jpeg')}
                    alt="Dr. Kyriakos Bekas"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,13,26,0.88) 0%, rgba(8,13,26,0.08) 45%, transparent 70%)' }}
                />

                {/* Credential badge */}
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute bottom-0 left-0 right-0 px-5 pb-5 text-center"
                >
                  <p className="font-display text-lg font-medium text-white italic">Dr. Kyriakos Bekas</p>
                  <p className="font-sans text-[10px] tracking-[0.2em] text-white/45 uppercase mt-1">M.D. · M.Sc. · FIFA</p>
                </motion.div>
              </motion.div>

              {/* Floating metric cards — fade out first on scroll */}
              <motion.div
                style={reduced ? {} : { opacity: floatOpacity }}
                className="absolute inset-0 pointer-events-none"
              >
                {floatingCards.map(({ icon: Icon, value, label, pos, floatY, delay: d, enterX }) => (
                  <motion.div
                    key={label}
                    initial={reduced ? false : { opacity: 0, x: enterX, scale: 0.88 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.65, delay: 1.05 + d, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute ${pos} hidden sm:block`}
                  >
                    <motion.div
                      animate={reduced ? {} : {
                        y: [0, floatY, 0],
                        boxShadow: [
                          '0 8px 32px rgba(0,0,0,0.35)',
                          '0 8px 32px rgba(45,212,191,0.10)',
                          '0 8px 32px rgba(0,0,0,0.35)',
                        ],
                      }}
                      transition={{ duration: 3.5 + d * 0.6, repeat: Infinity, ease: 'easeInOut', delay: d * 0.4 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.08]"
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
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={reduced ? {} : { opacity: cueOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
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
