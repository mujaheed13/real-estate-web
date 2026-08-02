import { Building2, MapPin, TrendingUp, Handshake, FileCheck, PhoneCall } from 'lucide-react'

const benefits = [
  {
    icon: Building2,
    title: 'Trusted Real Estate Experts',
    description: 'Decades of experience in premium property transactions and investment guidance',
  },
  {
    icon: MapPin,
    title: 'Prime Locations',
    description: 'Access to the most sought-after properties in prime locations across the region',
  },
  {
    icon: TrendingUp,
    title: 'Best Investment Opportunities',
    description: 'Carefully selected properties with high appreciation potential and ROI',
  },
  {
    icon: Handshake,
    title: 'Transparent Deals',
    description: 'Complete transparency in pricing and terms with no hidden charges',
  },
  {
    icon: FileCheck,
    title: 'Legal Assistance',
    description: 'Full legal documentation and compliance support throughout the process',
  },
  {
    icon: PhoneCall,
    title: 'Complete Customer Support',
    description: 'End-to-end assistance from property selection to final registration',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Why Choose Us</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the difference of working with India&apos;s most trusted real estate partners
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <div
                key={idx}
                className="card-luxury p-8 text-center hover:shadow-2xl transition-all duration-300 group border border-border"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/15 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
