'use client'

import Image from 'next/image'
import { Camera } from 'lucide-react'

export function SiteVisits() {
  const visits = [
    {
      image: '/site-visit-1.png',
      title: 'Professional Site Inspection',
      description: 'Our team conducts thorough property inspections with clients',
    },
    {
      image: '/site-visit-2.png',
      title: 'Project Consultation',
      description: 'Discussing development details and investment opportunities',
    },
    {
      image: '/site-visit-3.png',
      title: 'Property Tour',
      description: 'Guiding clients through premium residential properties',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Site Visits with Our Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our transparent and professional approach to property selection
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {visits.map((visit, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 md:h-72 overflow-hidden">
                <Image
                  src={visit.image}
                  alt={visit.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              </div>
              <div className="p-6 bg-card">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {visit.title}
                </h3>
                <p className="text-muted-foreground">{visit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
