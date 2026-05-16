import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { assetUrl } from '../utils/assets'
import { useLanguage } from '../contexts/LanguageContext'

const linkKeys = [
  { key: 'navAbout' as const, href: '#about' },
  { key: 'navExpertise' as const, href: '#expertise' },
  { key: 'navCredentials' as const, href: '#credentials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const { t, lang, setLang } = useLanguage()

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-surface text-navy-950 border-b border-navy-900/10 shadow-sm"
    >
      {/* Main nav row — fixed height so logo h-30 doesn't push the bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
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

        <nav className="hidden lg:flex items-center gap-8">
          {linkKeys.map(({ key, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-sans font-medium text-navy-950/80 hover:text-navy-950 transition-colors duration-200 tracking-wide"
            >
              {t[key]}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'el' ? 'en' : 'el')}
            className="font-sans text-xs font-semibold tracking-widest text-navy-950/50 hover:text-navy-950 transition-colors duration-200 cursor-pointer px-2 py-1"
          >
            {lang === 'el' ? 'EN' : 'ΕΛ'}
          </button>

          <a
            href="#contact"
            className="px-6 py-2.5 bg-primary text-navy-950 text-sm font-sans font-semibold rounded-full hover:bg-teal-300 transition-colors duration-200"
          >
            {t.navBook}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-navy-950/80 hover:text-navy-950 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu — outside the fixed-height row, so it expands freely */}
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
                onClick={() => setOpen(false)}
                className="text-sm font-sans font-medium text-navy-950/80 hover:text-navy-950 transition-colors"
              >
                {t[key]}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setLang(lang === 'el' ? 'en' : 'el')}
                className="font-sans text-xs font-semibold tracking-widest text-navy-950/50 cursor-pointer"
              >
                {lang === 'el' ? 'EN' : 'ΕΛ'}
              </button>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex-1 px-6 py-3 bg-primary text-navy-950 text-sm font-sans font-semibold rounded-full text-center"
              >
                {t.navBook}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
