import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustMetrics from './components/TrustMetrics'
import About from './components/About'
import Hospitals from './components/Hospitals'
import Expertise from './components/Expertise'
import CareApproach from './components/CareApproach'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <div className="min-h-screen bg-home-page overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustMetrics />
      <About />
      <Hospitals />
      <Expertise />
      <CareApproach />
      <Timeline />
      <Testimonials />
      <CallToAction />
      <Footer />
      <BackToTop />
    </div>
  )
}
