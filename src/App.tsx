import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustMetrics from './components/TrustMetrics'
import About from './components/About'
import Expertise from './components/Expertise'
import CareApproach from './components/CareApproach'
import Timeline from './components/Timeline'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustMetrics />
      <About />
      <Expertise />
      <CareApproach />
      <Timeline />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}
