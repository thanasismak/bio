import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Calendar, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function CallToAction() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const contactItems = [
    { icon: MapPin, text: 'Bioclinic Athens, Μιχαλακοπούλου 15' },
    { icon: Phone,  text: '+30 210 000 0000' },
    { icon: Mail,   text: 'info@drbekas.gr' },
    { icon: Clock,  text: 'Δευ – Παρ: 09:00 – 18:00' },
  ]

  return (
    <section
      id="contact"
      className="bg-navy-900 relative py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 70% at 20% 50%, rgba(45,212,191,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — headline + CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-white/30" />
              <span className="font-sans text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                {t.ctaLabel}
              </span>
            </div>

            <h2 className="font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[1.05] text-white mb-6">
              {t.ctaHeading1}
              <br />
              <em className="font-light text-teal-300">{t.ctaHeading2}</em>
            </h2>

            <p className="font-sans text-white/60 text-base leading-relaxed mb-10 max-w-md">
              {t.ctaBody}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <motion.a
                href="tel:+302100000000"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-navy-950 font-sans font-semibold text-sm tracking-wide rounded-full hover:bg-primary-soft transition-colors duration-200 shadow-lg shadow-black/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" strokeWidth={2} />
                {t.ctaSchedule}
              </motion.a>
              <a
                href="mailto:info@drbekas.gr"
                className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white/75 font-sans font-medium text-sm tracking-wide rounded-full hover:border-white/40 hover:text-white transition-all duration-300 group cursor-pointer"
              >
                {t.ctaLearn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[t.ctaBullet1, t.ctaBullet2, t.ctaBullet3].map((label, i) => (
                <span key={i} className="flex items-center gap-2 font-sans text-xs text-white/35">
                  <span className="w-1 h-1 rounded-full bg-teal-400/60 shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — contact info card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 lg:p-10 rounded-2xl border border-white/[0.10] bg-white/[0.05] backdrop-blur-sm"
          >
            <p className="font-sans text-xs font-semibold tracking-[0.20em] text-white/40 uppercase mb-7">
              {t.footerContactTitle}
            </p>

            <ul className="space-y-6">
              {contactItems.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-teal-300/80" strokeWidth={1.5} />
                  </div>
                  <span className="font-sans text-sm text-white/70 leading-snug pt-2">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-7 border-t border-white/[0.08] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal-400/80 animate-pulse shrink-0" />
              <span className="font-sans text-xs text-white/40">{t.footerAccepting}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
