'use client'

import { CheckCircle, FileText, Lock, Briefcase } from 'lucide-react'

export function LegalProcess() {
  const steps = [
    {
      icon: FileText,
      title: 'Token Amount',
      description: 'Client pays token amount to book the property and initiate the verification process',
    },
    {
      icon: Lock,
      title: 'Legal Verification',
      description: 'Our legal team verifies title deed, ownership documents, and property authenticity',
    },
    {
      icon: Briefcase,
      title: 'Documentation',
      description: 'All legal documents are prepared including sale agreement, regulatory compliance checks',
    },
    {
      icon: CheckCircle,
      title: 'Registration',
      description: 'Property registration with municipal authority and handover of registration certificate',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Legal Verification Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive legal verification ensures complete transparency and protection after token amount is paid
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="card-luxury p-8 border border-border">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/15">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-foreground/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Legal Guarantee */}
        <div className="mt-12 p-8 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-start gap-4">
            <Lock className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Guaranteed Legal Safety
              </h3>
              <p className="text-foreground/75 mb-4">
                Every property undergoes rigorous legal verification by our certified legal advocates. We ensure all documentation is authentic, titles are clear, and all regulatory requirements are met before the transaction proceeds. Your investment is protected at every step.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Original documentation verification
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Clear title and ownership verification
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Legal compliance and regulatory checks
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Transparent transaction process
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
