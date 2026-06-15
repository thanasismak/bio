'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { assetUrl } from '../utils/assets'

const photos = [
  { src: '/assets/arthrex-training-center.jpg',       label: 'Arthrex Training Center',     sublabel: 'Naples, Florida',               pos: 'center 18%' },
  { src: '/assets/arthroscopy-training-screen.jpg',    label: 'Arthroscopic Training',        sublabel: 'Live surgical demonstration',   pos: 'center center' },
  { src: '/assets/snace-smith-nephew.png',             label: 'SNACE — Smith & Nephew',       sublabel: 'International collaboration',   pos: 'center 22%' },
  { src: '/assets/hirslanden-zurich-consultation.jpg', label: 'Hirslanden SportClinic',       sublabel: 'Zürich, Switzerland',           pos: 'center center' },
  { src: '/assets/vr-surgical-simulation.jpg',         label: 'VR Surgical Simulation',       sublabel: 'Immersive training technology', pos: 'center center' },
  { src: '/assets/snace-surgical-team.jpg',            label: 'SNACE Surgical Team',          sublabel: 'Workshop participants',         pos: 'center center' },
  { src: '/assets/ar-hololens-surgery.jpg',            label: 'AR-Assisted Surgery',          sublabel: 'HoloLens navigation system',   pos: 'center center' },
  { src: '/assets/citieffe-implants-workshop.jpg',     label: 'Citieffe Implants Workshop',   sublabel: 'Essential Moves in Trauma',    pos: 'center center' },
]

export default function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null)

  const close  = useCallback(() => setSelected(null), [])
  const prev   = useCallback(() => setSelected(i => i === null ? null : (i - 1 + photos.length) % photos.length), [])
  const next   = useCallback(() => setSelected(i => i === null ? null : (i + 1) % photos.length), [])

  useEffect(() => {
    if (selected === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')   prev()
      if (e.key === 'ArrowRight')  next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected, close, prev, next])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <>
      <section id="gallery" className="py-20 lg:py-28 bg-surface border-t border-navy-950/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-teal-400" />
              <span className="type-eyebrow text-teal-400">Training & Milestones</span>
            </div>
            <h2 className="type-h2 text-navy-950 max-w-xl">
              International Experience
            </h2>
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
            {photos.map((p, i) => (
              <div
                key={p.src}
                className="break-inside-avoid mb-3 cursor-zoom-in group"
                onClick={() => setSelected(i)}
              >
                <div className="overflow-hidden rounded-xl relative">
                  <img
                    src={assetUrl(p.src)}
                    alt={p.label}
                    className="w-full block transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Hover caption */}
                  <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/40 transition-colors duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                    <p className="text-white text-xs font-semibold leading-tight">{p.label}</p>
                    <p className="text-white/60 text-[10px] mt-0.5">{p.sublabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col items-center px-16 max-w-[90vw]"
              >
                <img
                  src={assetUrl(photos[selected].src)}
                  alt={photos[selected].label}
                  className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
                />
                <div className="mt-4 text-center">
                  <p className="text-white font-semibold">{photos[selected].label}</p>
                  <p className="text-white/50 text-sm mt-0.5">{photos[selected].sublabel}</p>
                </div>
                <p className="text-white/25 text-xs mt-3">
                  {selected + 1} / {photos.length}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
