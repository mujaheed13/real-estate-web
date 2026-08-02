import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

export function About() {
  const features = [
    '10+ Years of Industry Experience',
    'Customer-First Approach',
    'Verified & Authenticated Properties',
    'Expert Investment Guidance',
    'Transparent Documentation',
    'Legal Compliance Assured',
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/hero-villa.png"
              alt="Shaiks Real Estate Team"
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full font-semibold mb-4">
              About Shaiks Real Estate
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              Building Trust, Creating Dreams
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Shaiks Real Estate, we believe that finding the perfect property should be an experience filled with 
              confidence, transparency, and professional excellence. With over a decade of experience in premium real estate, 
              we have transformed the way people invest in property.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our team of certified real estate consultants works tirelessly to bring you the finest properties across 
              villas, apartments, open plots, and farm lands. We don&apos;t just sell properties—we build lasting relationships 
              based on trust and results.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button className="button-primary bg-primary text-primary-foreground hover:shadow-lg">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
