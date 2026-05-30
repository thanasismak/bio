import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { CheckCircle } from 'lucide-react'
import { assetUrl } from '../utils/assets'
import { useLanguage } from '../contexts/LanguageContext'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY     = useTransform(scrollYProgress, [0, 1], ['-30px', '60px'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 0.97])

  const credentials = [t.aboutCred1, t.aboutCred2, t.aboutCred3, t.aboutCred4]

  return (
    <section ref={ref} id="about" className="relative bg-surface py-24 lg:py-36 overflow-hidden border-t border-navy-950/[0.07]">

      {/* Background — robotic knee, right-focused so the subject reads clearly */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={reduced ? {} : { y: bgY, scale: bgScale }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        <img
          src={assetUrl('/brand/robot-artificial-intelligence.png')}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '72% 20%', opacity: 0.28 }}
        />
        {/* Left fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, var(--color-surface) 0%, transparent 45%)',
          }}
        />
        {/* Top + bottom fade — bottom fades out before section ends so image stops at the divider */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, var(--color-surface) 0%, transparent 15%, transparent 55%, var(--color-surface) 85%)',
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: profile card — clip-path polygon wipe reveal */}
          <motion.div
            initial={reduced ? false : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
            whileInView={{ clipPath: 'polygon(0 0, 110% 0, 110% 110%, 0 110%)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
            className="relative"
          >
            {/* Photo card */}
            <div
              className="relative rounded-3xl overflow-hidden border border-navy-950/[0.10] mx-auto max-w-sm lg:max-w-none"
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
              />
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
                <span className="type-eyebrow text-teal-400">{t.aboutLabel}</span>
              </div>
              <h2 className="type-h2 text-navy-950 mb-6">{t.aboutHeading}</h2>
              <p className="type-body text-navy-950/65 mb-4">{t.aboutPara1}</p>
              <p className="type-body text-navy-950/65">{t.aboutPara2}</p>
            </div>

            <div className="space-y-3 pt-2">
              {credentials.map((c, i) => (
                <motion.div
                  key={i}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="type-body-sm text-navy-950/65">{c}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
