'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie, X, ShieldCheck } from 'lucide-react'

const STORAGE_KEY = 'drbekas_cookie_consent'

export type ConsentChoice = 'accepted' | 'declined'

export function getConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY) as ConsentChoice | null
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show only if no previous choice stored
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  const choose = (choice: ConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, choice)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '110%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[9999]"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="rounded-2xl border border-navy-950/[0.10] bg-white shadow-xl shadow-navy-950/10 p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-400/10 flex items-center justify-center shrink-0">
                  <Cookie className="w-4 h-4 text-teal-500" strokeWidth={1.5} />
                </div>
                <p className="type-body-sm font-semibold text-navy-950">Cookies & Απόρρητο</p>
              </div>
              <button
                onClick={() => choose('declined')}
                className="text-navy-950/30 hover:text-navy-950/60 transition-colors cursor-pointer mt-0.5"
                aria-label="Κλείσιμο"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <p className="type-caption text-navy-950/55 leading-relaxed mb-4">
              Χρησιμοποιούμε cookies για την ανάλυση επισκεψιμότητας και τη βελτίωση της εμπειρίας σας.
              Μπορείτε να αποδεχτείτε ή να αρνηθείτε τα μη απαραίτητα cookies.{' '}
              <button
                onClick={() => {
                  document.querySelector<HTMLButtonElement>('[data-legal="cookies"]')?.click()
                }}
                className="text-teal-500 hover:text-teal-600 underline underline-offset-2 cursor-pointer"
              >
                Πολιτική Cookies
              </button>
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => choose('accepted')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-navy-950 text-white rounded-xl type-caption font-semibold hover:bg-teal-600 transition-colors duration-200 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Αποδοχή
              </button>
              <button
                onClick={() => choose('declined')}
                className="flex-1 py-2.5 px-4 border border-navy-950/[0.12] text-navy-950/60 rounded-xl type-caption font-medium hover:border-navy-950/25 hover:text-navy-950/80 transition-all duration-200 cursor-pointer"
              >
                Μόνο απαραίτητα
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
