'use client'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
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
import MotionLab from './components/MotionLab'
import CookieConsent from './components/CookieConsent'

export default function App() {
  return (
    <div className="min-h-screen bg-home-page overflow-x-hidden">
      <Navbar />
      <Hero />
      <SectionDivider />
      <TrustMetrics />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Hospitals />
      <SectionDivider />
      <Expertise />
      <SectionDivider />
      <CareApproach />
      <SectionDivider />
      <Timeline />
      <SectionDivider />
      <CallToAction />
      <Footer />
      <BackToTop />
      <ThemeSwitcher />
      <CookieConsent />
      {process.env.NODE_ENV === 'development' && <MotionLab />}
    </div>
  )
}
