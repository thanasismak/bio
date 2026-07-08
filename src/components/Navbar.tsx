'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { assetUrl } from '../utils/assets'
import { useLanguage } from '../contexts/LanguageContext'

type NavKey = 'navHome' | 'navAbout' | 'navHospitals' | 'navExpertise' | 'navCredentials' | 'navPublications'

const linkKeys: { key: NavKey; href: string }[] = [
  { key: 'navHome',         href: '#home'         },
  { key: 'navAbout',        href: '#about'        },
  { key: 'navHospitals',    href: '#hospitals'    },
  { key: 'navExpertise',    href: '#expertise'    },
  { key: 'navCredentials',  href: '#credentials'  },
  { key: 'navPublications', href: '#publications' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const { t, lang, setLang } = useLanguage()

  const close = () => setOpen(false)

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface text-navy-950 border-b border-navy-900/10 shadow-sm"
    >
      {/* Desktop nav row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="h-full flex items-center overflow-hidden opacity-90 hover:opacity-100 transition-opacity duration-300"
        >
          <img
            src={assetUrl('/brand/logo-horizontal2.png')}
            alt="Dr. Kyriakos Bekas"
            className="h-30 w-auto object-contain"
          />
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {linkKeys.map(({ key, href }) => (
            <a
              key={href}
              href={href}
              className="type-body-sm font-medium text-navy-950/70 hover:text-navy-950 transition-colors duration-200"
            >
              {t[key]}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="px-6 py-2.5 bg-primary text-navy-950 text-sm font-sans font-semibold rounded-full hover:bg-teal-300 transition-colors duration-200"
          >
            {t.navBook}
          </a>

          <button
            onClick={() => setLang(lang === 'el' ? 'en' : 'el')}
            className="font-sans text-xs font-semibold tracking-widest text-navy-950/60 hover:text-navy-950 hover:border-navy-950/40 transition-colors duration-200 cursor-pointer px-3 py-2 rounded-full border border-navy-950/20"
          >
            {lang === 'el' ? 'EN' : 'ΕΛ'}
          </button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="lg:hidden text-navy-950/80 hover:text-navy-950 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-surface backdrop-blur-xl border-t border-navy-900/10"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {linkKeys.map(({ key, href }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="type-body-sm font-medium text-navy-950/80 hover:text-navy-950 transition-colors"
              >
                {t[key]}
              </a>
            ))}

            <div className="flex items-center gap-4 pt-2 border-t border-navy-900/10">
              <a
                href="#contact"
                onClick={close}
                className="flex-1 px-6 py-3 bg-primary text-navy-950 text-sm font-sans font-semibold rounded-full text-center"
              >
                {t.navBook}
              </a>
              <button
                onClick={() => setLang(lang === 'el' ? 'en' : 'el')}
                className="font-sans text-xs font-semibold tracking-widest text-navy-950/60 cursor-pointer px-3 py-2 rounded-full border border-navy-950/20"
              >
                {lang === 'el' ? 'EN' : 'ΕΛ'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
