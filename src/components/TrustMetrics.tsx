import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

interface MetricProps {
  to: number
  decimals?: number
  suffix?: string
}

function Counter({ to, decimals = 0, suffix = '' }: MetricProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setVal(to); return }
    const start = performance.now()
    const dur = 1800
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - (1 - t) ** 3
      setVal(to * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, reduced])

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()
  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>
}

const stats = [
  { value: 10, suffix: '+', label: 'Years of Practice', sublabel: 'Orthopedic Surgery' },
  { value: 6, suffix: '+', label: 'Publications', sublabel: 'Peer-Reviewed Journals' },
  { value: 15, suffix: '+', label: 'International Courses', sublabel: 'Fellowships & Training' },
  { value: 4.9, suffix: '', decimals: 1, label: 'Patient Rating', sublabel: 'Out of 5.0 Stars' },
]

export default function TrustMetrics() {
  const reduced = useReducedMotion()

  return (
    <section className="bg-navy-900 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`px-8 py-8 text-center ${i < stats.length - 1 ? 'border-r border-white/[0.07]' : ''}`}
            >
              <p className="font-display text-[clamp(2.8rem,5vw,4.2rem)] font-light text-gold-400 leading-none mb-3">
                <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </p>
              <p className="font-sans text-sm font-medium text-white/75 mb-1">{s.label}</p>
              <p className="font-sans text-xs text-white/35">{s.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
