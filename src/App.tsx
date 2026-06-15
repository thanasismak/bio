'use client'

import { useState, useEffect } from 'react'
import type { ComponentType } from 'react'
import Navbar from './components/Navbar'
import DoctorBio from './components/DoctorBio'
import TrustMetrics from './components/TrustMetrics'
import About from './components/About'
import Hospitals from './components/Hospitals'
import Expertise from './components/Expertise'
import CareApproach from './components/CareApproach'
import Timeline from './components/Timeline'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ThemeSwitcher from './components/ThemeSwitcher'
import SectionDivider from './components/SectionDivider'
import PhotoStrip from './components/PhotoStrip'
import PhotoGallery from './components/PhotoGallery'
import MotionLab from './components/MotionLab'
import CookieConsent from './components/CookieConsent'
import SectionReorder from './components/SectionReorder'
import { DEFAULT_ORDER, type SectionKey } from './config/sectionOrder'

const LS_ORDER  = 'bio-section-order'
const LS_HIDDEN = 'bio-section-hidden'

const SECTION_MAP: Record<SectionKey, ComponentType> = {
  PhotoStrip,
  TrustMetrics,
  PhotoGallery,
  About,
  Hospitals,
  DoctorBio,
  Expertise,
  CareApproach,
  Timeline,
  CallToAction,
}

export default function App() {
  const [order,  setOrder]  = useState<SectionKey[]>(DEFAULT_ORDER)
  const [hidden, setHidden] = useState<SectionKey[]>([])

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem(LS_ORDER)
      if (savedOrder) {
        const parsed = JSON.parse(savedOrder) as SectionKey[]
        if (Array.isArray(parsed) && parsed.length === DEFAULT_ORDER.length) {
          setOrder(parsed)
        }
      }

      const savedHidden = localStorage.getItem(LS_HIDDEN)
      if (savedHidden) {
        const parsed = JSON.parse(savedHidden) as SectionKey[]
        if (Array.isArray(parsed)) setHidden(parsed)
      }
    } catch {}
  }, [])

  const visible = order.filter(k => !hidden.includes(k))

  return (
    <div className="min-h-screen bg-home-page overflow-x-hidden">
      <Navbar />

      {visible.map((key, i) => {
        const Section = SECTION_MAP[key]
        return (
          <div key={key}>
            {i > 0 && <SectionDivider />}
            <Section />
          </div>
        )
      })}

      <Footer />
      <BackToTop />
      <ThemeSwitcher />
      <CookieConsent />
      {process.env.NODE_ENV === 'development' && <MotionLab />}
      <SectionReorder
        order={order}
        hidden={hidden}
        onChange={setOrder}
        onHiddenChange={setHidden}
      />
    </div>
  )
}
