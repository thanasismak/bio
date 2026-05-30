import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Calendar, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ContactForm from './ContactForm'

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
      className="bg-surface-soft relative py-24 lg:py-36 overflow-hidden border-t border-navy-950/[0.07]"
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
              <span className="h-px w-10 bg-navy-950/20" />
              <span className="type-eyebrow text-navy-950/50">{t.ctaLabel}</span>
            </div>

            <h2 className="type-h2 text-navy-950 mb-6">
              {t.ctaHeading1}
              <br />
              <em className="italic text-primary">{t.ctaHeading2}</em>
            </h2>

            <p className="type-body text-navy-950/60 mb-10 max-w-md">{t.ctaBody}</p>

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
                className="flex items-center gap-2 px-8 py-4 border border-navy-950/20 text-navy-950/70 font-sans font-medium text-sm tracking-wide rounded-full hover:border-navy-950/40 hover:text-navy-950 transition-all duration-300 group cursor-pointer"
              >
                {t.ctaLearn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[t.ctaBullet1, t.ctaBullet2, t.ctaBullet3].map((label, i) => (
                <span key={i} className="flex items-center gap-2 font-sans text-xs text-navy-950/40">
                  <span className="w-1 h-1 rounded-full bg-teal-400/60 shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — contact form + info */}
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Contact form */}
            <div className="p-8 lg:p-10 rounded-2xl border border-navy-950/[0.10] bg-white shadow-sm">
              <p className="type-eyebrow text-navy-950/40 mb-6">Φόρμα Επικοινωνίας</p>
              <ContactForm />
            </div>

            {/* Contact details strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-navy-950/[0.07] bg-white/60">
                  <Icon className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                  <span className="type-caption text-navy-950/60">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 px-4">
              <span className="w-2 h-2 rounded-full bg-teal-400/80 animate-pulse shrink-0" />
              <span className="font-sans text-xs text-navy-950/45">{t.footerAccepting}</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
