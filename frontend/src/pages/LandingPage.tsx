import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../components/landing/HeroSection'
import TrustBar from '../components/landing/TrustBar'
import QRTypesSection from '../components/landing/QRTypesSection'
import StepsSection from '../components/landing/StepsSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import StatsSection from '../components/landing/StatsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import FAQSection from '../components/landing/FAQSection'
import CTASection from '../components/landing/CTASection'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustBar />
      <QRTypesSection />
      <StepsSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  )
}
