import SeoManager from './seo/SeoManager'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustMetrics from './components/TrustMetrics'
import About from './components/About'
import Hospitals from './components/Hospitals'
import Expertise from './components/Expertise'
import CareApproach from './components/CareApproach'
import Timeline from './components/Timeline'
// import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ThemeSwitcher from './components/ThemeSwitcher'
import SectionDivider from './components/SectionDivider'

export default function App() {
  return (
    <div className="min-h-screen bg-home-page overflow-x-hidden">
      <SeoManager />
      <Navbar />
      <Hero />
      <TrustMetrics />
      <About />
      <Hospitals />
      <Expertise />
      <CareApproach />
      <Timeline />
      <SectionDivider />
      {/* <Testimonials /> */}
      <CallToAction />
      <Footer />
      <BackToTop />
      <ThemeSwitcher />
    </div>
  )
}
