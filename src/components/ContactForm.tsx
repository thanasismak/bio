'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus]   = useState<Status>('idle')
  const [errMsg, setErrMsg]   = useState('')
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Αποτυχία αποστολής.')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err: any) {
      setErrMsg(err.message)
      setStatus('error')
    }
  }

  const inputBase =
    'w-full px-4 py-3 rounded-xl border border-navy-950/[0.12] bg-white text-navy-950 type-body-sm placeholder:text-navy-950/30 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition-all duration-200'

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="type-caption text-navy-950/50 block mb-1.5">Ονοματεπώνυμο *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            placeholder="Γιάννης Παπαδόπουλος"
            className={inputBase}
          />
        </div>
        <div>
          <label className="type-caption text-navy-950/50 block mb-1.5">Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="email@example.com"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label className="type-caption text-navy-950/50 block mb-1.5">Τηλέφωνο</label>
        <input
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          placeholder="+30 210 000 0000"
          className={inputBase}
        />
      </div>

      <div>
        <label className="type-caption text-navy-950/50 block mb-1.5">Μήνυμα *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="Περιγράψτε σύντομα την ανάγκη σας ή το πρόβλημά σας…"
          className={`${inputBase} resize-none`}
        />
      </div>

      {/* Feedback messages */}
      <AnimatePresence mode="wait">
        {status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-red-600 type-body-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errMsg || 'Κάτι πήγε στραβά. Δοκιμάστε ξανά.'}
          </motion.div>
        )}
        {status === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-teal-600 type-body-sm"
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            Το μήνυμά σας εστάλη. Θα επικοινωνήσουμε σύντομα.
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="flex items-center gap-2 px-7 py-3.5 bg-navy-950 text-white rounded-full type-body-sm font-semibold hover:bg-teal-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <><Loader className="w-4 h-4 animate-spin" /> Αποστολή…</>
        ) : status === 'success' ? (
          <><CheckCircle className="w-4 h-4" /> Εστάλη</>
        ) : (
          <><Send className="w-4 h-4" /> Αποστολή μηνύματος</>
        )}
      </button>
    </form>
  )
}
