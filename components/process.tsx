import { MessageCircle, Eye, FileText, Loader, Home } from 'lucide-react'

const steps = [
  { icon: MessageCircle, title: 'Property Consultation', description: 'Discuss your requirements and preferences' },
  { icon: Eye, title: 'Property Visit', description: 'Schedule tours of selected properties' },
  { icon: FileText, title: 'Documentation', description: 'Complete all legal documentation' },
  { icon: Loader, title: 'Registration', description: 'Final registration and formalities' },
  { icon: Home, title: 'Possession', description: 'Take possession of your dream property' },
]

export function Process() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Our Process</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A seamless journey from consultation to possession
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on Mobile */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isEven = idx % 2 === 0

              return (
                <div
                  key={idx}
                  className={`relative ${isEven ? 'lg:mt-0' : 'lg:mt-16'}`}
                >
                  {/* Card */}
                  <div className="card-luxury p-6 text-center h-full">
                    {/* Icon Circle */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                      <Icon size={28} />
                    </div>

                    <div className="pt-8">
                      <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>

                    {/* Step Number */}
                    <div className="absolute top-6 right-6 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Arrow - Hidden on Last Item */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 text-primary text-2xl">
                      →
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-lg">Ready to start your property journey?</p>
          <button className="button-primary bg-primary text-primary-foreground hover:shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}
