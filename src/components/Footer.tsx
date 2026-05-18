import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { SITE } from '../seo/seoConfig'
import LegalModal, { type LegalType } from './LegalModal'

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


const socialLinks = [
  { Icon: IconInstagram, href: SITE.social.instagram, label: 'Instagram' },
  { Icon: IconLinkedin,  href: SITE.social.linkedin,  label: 'LinkedIn'  },
]

export default function Footer() {
  const [legalModal, setLegalModal] = useState<LegalType | null>(null)
  const reduced = useReducedMotion()
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const navLinks = [
    { label: t.navAbout,           href: '#about' },
    { label: t.navExpertise,       href: '#expertise' },
    { label: t.navCredentials,     href: '#credentials' },
    { label: t.footerContactTitle, href: '#contact' },
  ]

  const services = [t.footerS1, t.footerS2, t.footerS3, t.footerS4, t.footerS5]

  return (
    <footer className="bg-surface-soft border-t border-navy-950/[0.08]">
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
              <p className="type-h3 text-navy-950">Dr. Kyriakos Bekas</p>
              <p className="type-eyebrow text-navy-950/40 mt-1">M.D. · M.Sc. · FIFA</p>
            </div>

            <p className="type-body-sm text-navy-950/55 max-w-xs">{t.footerBio}</p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-primary/30 bg-primary/[0.08] flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary/55 hover:bg-primary/[0.14] transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="type-eyebrow text-navy-950/40 mb-5">{t.footerNavTitle}</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="type-body-sm text-navy-950/60 hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="type-eyebrow text-navy-950/40 mb-5">{t.footerServTitle}</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="type-body-sm text-navy-950/55">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="type-eyebrow text-navy-950/40 mb-5">{t.footerContactTitle}</p>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'Bioclinic Athens, Μιχαλακοπούλου 15, Αθήνα' },
                { icon: Phone,  text: '+30 210 000 0000' },
                { icon: Mail,   text: 'info@drbekas.gr' },
                { icon: Clock,  text: 'Δευ–Παρ: 09:00 – 18:00' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="type-body-sm text-navy-950/60">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-navy-950/[0.08] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="type-caption text-navy-950/35">
            © {year} Dr. Kyriakos Bekas. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {([
              { label: 'Privacy Policy', type: 'privacy' },
              { label: 'Terms of Use',   type: 'terms'   },
              { label: 'Cookie Policy',  type: 'cookies' },
            ] as { label: string; type: LegalType }[]).map(({ label, type }) => (
              <button
                key={type}
                onClick={() => setLegalModal(type)}
                className="type-caption text-navy-950/35 hover:text-navy-950/65 transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </footer>
  )
}
