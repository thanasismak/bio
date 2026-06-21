import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { useLanguage } from '../contexts/LanguageContext'

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

export default function TrustMetrics() {
  const reduced = useReducedMotion()
  const { t } = useLanguage()

  const MAPS_LINK =
    'https://www.google.com/search?sca_esv=83850591823af048&rlz=1C1GCEA_enGR1061GR1061&sxsrf=APpeQntyJ3VeOFUGG1S8kNZmszSDrxbBbg:1782047126806&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_5ygY111kTBYO4MwVMpKbEIuAeQgHyHeEsFXVAzB-MQKoF0Nn6axrkT8TUE_geVGsffZ2dOQsvdH5c4q0gmgDugRhObkdR_LEyfo0ho4Ld8a84fcSoWg9A6eXNnDtN8XhwTRkrs%3D&q=%CE%9A%CF%85%CF%81%CE%B9%CE%AC%CE%BA%CE%BF%CF%82+%CE%9C%CF%80%CE%AD%CE%BA%CE%B1%CF%82+MD,+MSc+%CE%9A%CF%81%CE%B9%CF%84%CE%B9%CE%BA%CE%AD%CF%82&sa=X&ved=2ahUKEwiei93vspiVAxU697sIHdQyIqMQ0bkNegQIIBAF&biw=1920&bih=911&dpr=1'

  const stats = [
    { value: 6,   suffix: '+', label: t.trustYearsLabel,  sublabel: t.trustYearsSub,  href: undefined },
    { value: 6,   suffix: '+', label: t.trustPubLabel,    sublabel: t.trustPubSub,    href: undefined },
    { value: 15,  suffix: '+', label: t.trustCourseLabel, sublabel: t.trustCourseSub, href: undefined },
    { value: 4.9, suffix: '',  decimals: 1, label: t.trustRatingLabel, sublabel: t.trustRatingSub, href: MAPS_LINK },
  ]

  return (
    <section className="bg-surface-soft border-y border-navy-950/[0.07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => {
            const Wrapper = s.href ? motion.a : motion.div
            return (
              <Wrapper
                key={s.label}
                {...(s.href ? { href: s.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`px-8 py-8 text-center ${i < stats.length - 1 ? 'border-r border-navy-950/[0.07]' : ''} ${s.href ? 'hover:bg-surface-soft/80 transition-colors duration-200 cursor-pointer' : ''}`}
              >
                <p className="type-stat text-[clamp(2.8rem,5vw,4.2rem)] text-gold-400 mb-3">
                  <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </p>
                <p className="type-body-sm font-medium text-navy-950/70 mb-1">{s.label}</p>
                <p className="type-caption text-navy-950/50">{s.sublabel}</p>
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
