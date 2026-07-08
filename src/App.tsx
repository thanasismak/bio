'use client'

import Navbar from './components/Navbar'
import DoctorBio from './components/DoctorBio'
import TrustMetrics from './components/TrustMetrics'
import About from './components/About'
import Hospitals from './components/Hospitals'
import Expertise from './components/Expertise'
import Timeline from './components/Timeline'
import Publications from './components/Publications'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import SectionDivider from './components/SectionDivider'
import CookieConsent from './components/CookieConsent'

const SECTIONS = [
  { key: 'DoctorBio', Component: DoctorBio },
  { key: 'TrustMetrics', Component: TrustMetrics },
  { key: 'About', Component: About },
  { key: 'Hospitals', Component: Hospitals },
  { key: 'Expertise', Component: Expertise },
  { key: 'Timeline', Component: Timeline },
  { key: 'Publications', Component: Publications },
  { key: 'CallToAction', Component: CallToAction },
]

export default function App() {
  return (
    <div className="min-h-screen bg-home-page overflow-x-hidden">
      <Navbar />

      {SECTIONS.map(({ key, Component }, i) => (
        <div key={key}>
          {i > 0 && <SectionDivider />}
          <Component />
        </div>
      ))}

      <Footer />
      <BackToTop />
      <CookieConsent />
    </div>
  )
}
