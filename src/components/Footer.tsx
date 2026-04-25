import { motion, useReducedMotion } from 'motion/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const navLinks = ['About', 'Expertise', 'Credentials', 'Research', 'Testimonials', 'Contact']
const services = [
  'Sports Injuries',
  'Arthroscopic Surgery',
  'Hip & Knee Arthroplasty',
  'Biological Therapies',
  'Trauma & Fracture Care',
  'FIFA Sports Medicine',
]

export default function Footer() {
  const reduced = useReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 border-t border-white/[0.06]">
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
              <p className="font-display text-xl font-medium text-white">Dr. Kyriakos Bekas</p>
              <p className="font-sans text-[11px] tracking-[0.2em] text-white/35 uppercase mt-1">M.D. · M.Sc. · FIFA</p>
            </div>
            <p className="font-sans text-sm text-white/40 leading-relaxed max-w-xs">
              Orthopedic Surgeon. Registrar at 401 ΓΣΝΑ. Private practice at Bioclinic Athens.
              ESSKA & AO Foundation member.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400/70 animate-pulse" />
              <span className="font-sans text-xs text-white/35">Accepting new patients</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase mb-5">Navigation</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="font-sans text-sm text-white/50 hover:text-teal-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase mb-5">Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="font-sans text-sm text-white/50">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.18em] text-white/40 uppercase mb-5">Contact</p>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'Bioclinic Athens, Μιχαλακοπούλου 15, Athens' },
                { icon: Phone, text: '+30 210 000 0000' },
                { icon: Mail, text: 'info@drbekas.gr' },
                { icon: Clock, text: 'Mon–Fri: 09:00 – 18:00' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-teal-400/60 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="font-sans text-sm text-white/45 leading-snug">{text}</span>
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
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility'].map((link) => (
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
