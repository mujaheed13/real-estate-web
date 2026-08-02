import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FeaturedProperties } from '@/components/featured-properties'
import { WhyChooseUs } from '@/components/why-choose-us'
import { About } from '@/components/about'
import { Statistics } from '@/components/statistics'
import { Process } from '@/components/process'
import { SiteVisits } from '@/components/site-visits'
import { Team } from '@/components/team'
import { ServiceAreas } from '@/components/service-areas'
import { LegalProcess } from '@/components/legal-process'
import { LegalAdvocates } from '@/components/legal-advocates'
import { OfficeLocations } from '@/components/office-locations'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { FloatingButtons } from '@/components/floating-buttons'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <SiteVisits />
      <WhyChooseUs />
      <About />
      <Statistics />
      <Team />
      <ServiceAreas />
      <LegalProcess />
      <LegalAdvocates />
      <OfficeLocations />
      <Process />
      <Testimonials />
      <Contact />
      <FloatingButtons />
      <Footer />
    </main>
  )
}
