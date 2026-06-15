'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { assetUrl } from '../utils/assets'

const slides = [
  {
    src:      '/assets/esska-congress.jpg',
    label:    'ESSKA Congress',
    sublabel: 'European Society of Sports Traumatology, Knee Surgery & Arthroscopy',
    pos:      'center center',
  },
  {
    src:      '/assets/snace-workshop-group.jpg',
    label:    'SNACE International Workshop',
    sublabel: 'Smith & Nephew — Shoulder, Knee & Sports Medicine Training',
    pos:      'center center',
  },
  {
    src:      '/assets/warsaw-lab-exterior.jpg',
    label:    'Warsaw — Instytut Medycyny Praktycznej',
    sublabel: 'International Clinical Training, Poland',
    pos:      'center 38%',
  },
  {
    src:      '/assets/arthrex-training-center.jpg',
    label:    'Arthrex Training Center',
    sublabel: 'Advanced arthroscopic techniques — Naples, Florida',
    pos:      'center 18%',
  },
  {
    src:      '/assets/citieffe-trauma-workshop.jpg',
    label:    'Surgical Workshop',
    sublabel: 'Citieffe — Essential Moves in Trauma',
    pos:      'center center',
  },
  {
    src:      '/assets/eexot-congress-presentation.png',
    label:    'EEXOT Congress — Presentation',
    sublabel: 'Hellenic Orthopaedic Association Annual Congress',
    pos:      'center center',
  },
  {
    src:      '/assets/snace-smith-nephew.png',
    label:    'SNACE — Smith & Nephew',
    sublabel: 'International surgical collaboration',
    pos:      'center 22%',
  },
]

const INTERVAL = 5500

export default function PhotoStrip() {
  const [current, setCurrent]   = useState(0)
  const [paused, setPaused]     = useState(false)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length)
    setProgress(0)
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + slides.length) % slides.length)
    setProgress(0)
  }, [])

  const goTo = useCallback((i: number) => {
    setCurrent(i)
    setProgress(0)
  }, [])

  // Auto-advance via setTimeout so navigation is never called from inside a state updater
  useEffect(() => {
    if (paused || reduced) return
    const id = setTimeout(next, INTERVAL)
    return () => clearTimeout(id)
  }, [current, paused, reduced, next])

  // Progress bar — pure updater, no side effects
  useEffect(() => {
    if (paused || reduced) return
    setProgress(0)
    const tick = 80
    const id = setInterval(() => {
      setProgress(p => Math.min(p + (tick / INTERVAL) * 100, 100))
    }, tick)
    return () => clearInterval(id)
  }, [current, paused, reduced])

  const pad = (n: number) => String(n).padStart(2, '0')
  const slide = slides[current]

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      suppressHydrationWarning
    >
      {/* ── Full-fill image with per-slide crop + zoom ───────────────────── */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={assetUrl(slide.src)}
          alt={slide.label}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: slide.pos }}
        />
      </AnimatePresence>

      {/* ── Gradient — heavy bottom for caption legibility ──────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(to top, rgba(8,13,26,0.96) 0%, rgba(8,13,26,0.50) 24%, transparent 50%)',
            'linear-gradient(to bottom, rgba(8,13,26,0.42) 0%, transparent 25%)',
          ].join(', '),
        }}
      />

      {/* ── Slide counter ───────────────────────────────────────────────── */}
      <div className="absolute top-6 right-6 lg:right-10 z-10 flex items-center gap-1.5 pointer-events-none">
        <span className="font-sans text-sm font-semibold text-white/80 tabular-nums">
          {pad(current + 1)}
        </span>
        <span className="font-sans text-sm text-white/25">/</span>
        <span className="font-sans text-sm text-white/25 tabular-nums">
          {pad(slides.length)}
        </span>
      </div>

      {/* ── Arrows ──────────────────────────────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.18] hover:border-white/35 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.18] hover:border-white/35 transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ── Caption ─────────────────────────────────────────────────────── */}
      <div className="absolute bottom-16 left-0 right-0 px-6 lg:px-14 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="type-eyebrow text-teal-400/75 mb-2 tracking-widest">
              {slide.sublabel}
            </p>
            <p className="font-sans text-xl lg:text-2xl font-semibold text-white leading-snug">
              {slide.label}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dots ────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2.5 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}>
            <motion.span
              animate={{
                width:   i === current ? 22 : 5,
                opacity: i === current ? 1  : 0.3,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[5px] rounded-full bg-teal-400"
              style={{ width: 5 }}
            />
          </button>
        ))}
      </div>

      {/* ── Progress bar ────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.07] z-10">
        <motion.div
          className="h-full bg-teal-400/60"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>
    </section>
  )
}
