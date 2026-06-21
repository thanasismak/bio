import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { BookOpen, ChevronDown, ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface Publication {
  titleEl: string
  titleEn: string
  journal: string
  year: string
  abstractEl: string
  abstractEn: string
  href: string
}

// Replace with real papers + Google Scholar links
const publications: Publication[] = [
  {
    titleEl: 'Αρθροσκοπική Αποκατάσταση ΠΧΣ σε Αθλητές Ποδοσφαίρου: Κλινικά Αποτελέσματα & Επιστροφή στον Αθλητισμό',
    titleEn: 'Arthroscopic ACL Reconstruction in Football Players: Clinical Outcomes and Return-to-Sport Rate',
    journal: 'Knee Surgery, Sports Traumatology, Arthroscopy (KSSTA)',
    year: '2023',
    abstractEl: 'Προοπτική μελέτη σε αθλητές υψηλών επιδόσεων που υπεβλήθησαν σε αρθροσκοπική αποκατάσταση ΠΧΣ. Αξιολόγηση κλινικών αποτελεσμάτων και ποσοστού επιστροφής στον αθλητισμό στους 12 μήνες.',
    abstractEn: 'Prospective study in high-performance athletes undergoing arthroscopic ACL reconstruction. Assessment of clinical outcomes and return-to-sport rate at 12 months.',
    href: '#',
  },
  {
    titleEl: 'PRP ως Συμπλήρωμα στην Επισκευή Στροφικού Πετάλου: Προοπτική Συγκριτική Μελέτη',
    titleEn: 'PRP Augmentation in Rotator Cuff Repair: A Prospective Comparative Study',
    journal: 'Journal of Shoulder and Elbow Surgery',
    year: '2022',
    abstractEl: 'Σύγκριση κλινικών και λειτουργικών αποτελεσμάτων σε ασθενείς με επισκευή στροφικού πετάλου με ή χωρίς εφαρμογή PRP. Αξιολόγηση ανάπλασης τένοντα στους 6 μήνες.',
    abstractEn: 'Comparison of clinical and functional outcomes in patients undergoing rotator cuff repair with or without PRP application. Tendon healing assessment at 6 months.',
    href: '#',
  },
  {
    titleEl: 'Μεταβολικά Νοσήματα Οστών σε Ασθενείς Ορθοπαιδικού Τραύματος: Επιδημιολογική Μελέτη',
    titleEn: 'Metabolic Bone Disease Prevalence in Orthopaedic Trauma Patients',
    journal: 'Bone & Joint Journal',
    year: '2024',
    abstractEl: 'Επιδημιολογική ανάλυση της επίπτωσης μεταβολικών νοσημάτων οστών σε ασθενείς με κατάγματα χαμηλής ενέργειας, με έμφαση στην οστεοπόρωση ως υποκείμενο παράγοντα κινδύνου.',
    abstractEn: 'Epidemiological analysis of metabolic bone disease incidence in low-energy fracture patients, with emphasis on osteoporosis as an underlying risk factor.',
    href: '#',
  },
]

export default function Publications() {
  const reduced = useReducedMotion()
  const { lang } = useLanguage()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section
      id="publications"
      className="bg-surface py-20 lg:py-28 border-t border-navy-950/[0.07]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-teal-400" />
            <span className="type-eyebrow text-teal-400">
              {lang === 'el' ? 'Επιστημονικές Δημοσιεύσεις' : 'Scientific Publications'}
            </span>
          </div>
          <h2 className="type-h2 text-navy-950">
            {lang === 'el'
              ? 'Δημοσιεύσεις σε διεθνή επιστημονικά περιοδικά'
              : 'Publications in peer-reviewed journals'}
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="rounded-2xl overflow-hidden border border-navy-950/[0.08] divide-y divide-navy-950/[0.07]">
          {publications.map((pub, i) => {
            const isOpen = openIdx === i
            const title  = lang === 'el' ? pub.titleEl  : pub.titleEn
            const abstract = lang === 'el' ? pub.abstractEl : pub.abstractEn

            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="bg-white/60 backdrop-blur-sm"
              >
                {/* Row — always visible */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-white/80 transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-400/[0.12] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-400/[0.18] transition-colors duration-200">
                    <BookOpen className="w-4 h-4 text-teal-400" strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="type-body-sm font-semibold text-navy-950 leading-snug pr-2">
                      {title}
                    </p>
                    <p className="type-caption text-navy-950/45 mt-1">
                      <span className="italic">{pub.journal}</span>
                      <span className="mx-1.5">·</span>
                      <span>{pub.year}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 mt-0.5">
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 type-caption font-medium text-teal-500 hover:text-teal-600 transition-colors px-2 py-1 rounded-md hover:bg-teal-50"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="hidden sm:inline">
                        {lang === 'el' ? 'Δημοσίευση' : 'View'}
                      </span>
                    </a>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown className="w-4 h-4 text-navy-950/30" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded abstract */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="abstract"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="type-body-sm text-navy-950/60 px-6 pb-5 pl-[4.5rem] leading-relaxed">
                        {abstract}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
