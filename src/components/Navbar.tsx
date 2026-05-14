import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { assetUrl } from '../utils/assets'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  const headerClasses = 'bg-surface text-navy-950 border-b border-navy-900/10 shadow-sm py-4'
  const navLinkClasses = 'text-sm font-sans font-medium text-navy-950/80 hover:text-navy-950 transition-colors duration-200 tracking-wide'
  const mobileMenuClasses = 'lg:hidden bg-surface backdrop-blur-xl border-t border-navy-900/10'

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#home" className="block group opacity-90 hover:opacity-100 transition-opacity duration-300">
          <img
            src={assetUrl('/brand/logo-vector.png')}
            alt="Dr. Kyriakos Bekas"
            className="h-16 w-auto object-contain"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={navLinkClasses}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="px-6 py-2.5 bg-primary text-navy-950 text-sm font-sans font-semibold rounded-full hover:bg-teal-300 transition-colors duration-200"
          >
            Book Consultation
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-navy-950/80 hover:text-navy-950 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={mobileMenuClasses}
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-sans font-medium text-navy-950/80 hover:text-navy-950 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-6 py-3 bg-primary text-navy-950 text-sm font-sans font-semibold rounded-full text-center"
            >
              Book Consultation
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
