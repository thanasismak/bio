import { motion, useReducedMotion } from 'motion/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const navLinks = [
    { label: t.navAbout,       href: '#about' },
    { label: t.navExpertise,   href: '#expertise' },
    { label: t.navCredentials, href: '#credentials' },
    { label: t.footerContactTitle, href: '#contact' },
  ]

  const services = [t.footerS1, t.footerS2, t.footerS3, t.footerS4, t.footerS5]

  return (
    <footer className="bg-navy-900 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14"
        >
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div>
              <p className="font-display text-xl font-semibold text-white">Dr. Kyriakos Bekas</p>
              <p className="font-sans text-[11px] tracking-[0.2em] text-white/40 uppercase mt-1">M.D. · M.Sc. · FIFA</p>
            </div>
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-xs">{t.footerBio}</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400/70 animate-pulse" />
              <span className="font-sans text-xs text-white/40">{t.footerAccepting}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase mb-5">{t.footerNavTitle}</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-sans text-sm text-white/55 hover:text-teal-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase mb-5">{t.footerServTitle}</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="font-sans text-sm text-white/55">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase mb-5">{t.footerContactTitle}</p>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'Bioclinic Athens, Μιχαλακοπούλου 15, Αθήνα' },
                { icon: Phone,  text: '+30 210 000 0000' },
                { icon: Mail,   text: 'info@drbekas.gr' },
                { icon: Clock,  text: 'Δευ–Παρ: 09:00 – 18:00' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-teal-400/60 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="font-sans text-sm text-white/55 leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/25">
            © {year} Dr. Kyriakos Bekas. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="font-sans text-xs text-white/25 hover:text-white/50 transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
