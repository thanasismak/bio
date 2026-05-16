import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Calendar } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function CallToAction() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative py-28 lg:py-40 overflow-hidden border-t border-teal-400/20">
      <div className="absolute inset-0 bg-navy-900">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,212,191,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(200,169,110,0.05) 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-teal-400" />
          <span className="font-sans text-xs font-semibold tracking-[0.22em] text-teal-400 uppercase">{t.ctaLabel}</span>
          <span className="h-px w-10 bg-teal-400" />
        </motion.div>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[1.0] text-white mb-8"
        >
          {t.ctaHeading1} <br />
          <em className="text-teal-300 font-medium">{t.ctaHeading2}</em>
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-white/65 text-lg font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          {t.ctaBody}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.38 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            className="flex items-center gap-3 px-9 py-4 bg-primary text-navy-950 font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-teal-300 transition-colors duration-200 shadow-lg shadow-teal-400/20 cursor-pointer"
          >
            <Calendar className="w-4 h-4" strokeWidth={2} />
            {t.ctaSchedule}
          </motion.button>
          <button className="flex items-center gap-2 px-9 py-4 border border-white/20 text-white/70 font-sans font-medium text-sm tracking-wide rounded-full hover:border-teal-400/40 hover:text-teal-300 transition-all duration-300 group cursor-pointer">
            {t.ctaLearn}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40"
        >
          {[t.ctaBullet1, t.ctaBullet2, t.ctaBullet3].map((label, i) => (
            <span key={i} className="flex items-center gap-2 font-sans text-xs">
              <span className="w-1 h-1 rounded-full bg-teal-400/50" />
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
