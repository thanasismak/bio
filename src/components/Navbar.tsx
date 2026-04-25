import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/90 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#home" className="flex flex-col leading-none group">
          <span className="font-display text-xl font-medium text-white group-hover:text-teal-400 transition-colors duration-300">
            Dr. Kyriakos Bekas
          </span>
          <span className="text-[10px] font-sans font-medium tracking-[0.22em] text-white/40 uppercase mt-0.5">
            M.D. · M.Sc. · FIFA
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-sans font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="px-6 py-2.5 bg-teal-400 text-navy-950 text-sm font-sans font-semibold rounded-full hover:bg-teal-300 transition-colors duration-200"
          >
            Book Consultation
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white/70 hover:text-white transition-colors"
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
          className="lg:hidden bg-navy-900/95 backdrop-blur-xl border-t border-white/[0.06]"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-sans font-medium text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-6 py-3 bg-teal-400 text-navy-950 text-sm font-sans font-semibold rounded-full text-center"
            >
              Book Consultation
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
