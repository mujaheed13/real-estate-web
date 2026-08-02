'use client'

import Image from 'next/image'
import { MapPin, Home, Ruler } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Property {
  id: string
  name: string
  location: string
  price: string
  size: string
  type: string
  image: string
}

const properties: Property[] = [
  {
    id: '1',
    name: 'Luxury Villa with Pool',
    location: 'Premium Area, City',
    price: '₹2.5 Cr',
    size: '4500 sq ft',
    type: 'Villa',
    image: '/hero-villa.png',
  },
  {
    id: '2',
    name: 'Modern Apartment Complex',
    location: 'Downtown, City',
    price: '₹1.8 Cr',
    size: '3200 sq ft',
    type: 'Apartment',
    image: '/hero-apartment.png',
  },
  {
    id: '3',
    name: 'Premium Open Plot',
    location: 'Investment Zone, City',
    price: '₹85 Lac',
    size: '2500 sq ft',
    type: 'Open Plot',
    image: '/hero-plot.png',
  },
]

export function FeaturedProperties() {
  const [visibleCards, setVisibleCards] = useState<string[]>([])

  useEffect(() => {
    const observers = properties.map((prop, idx) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, prop.id])
      }, idx * 150)
    })
  }, [])

  return (
    <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Featured Properties</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties curated for discerning investors
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Open Plots', 'Villas', 'Apartments', 'Commercial', 'Farm Lands'].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                category === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`card-luxury transform transition-all duration-500 ${
                visibleCards.includes(property.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              } hover:scale-105`}
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                  {property.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-foreground">{property.name}</h3>

                {/* Location */}
                <div className="flex items-center mb-4">
                  <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/75">{property.location}</span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-3xl font-bold text-primary mb-2">{property.price}</p>
                  <div className="flex items-center space-x-4 text-sm text-foreground/70">
                    <div className="flex items-center">
                      <Home size={16} className="mr-1 text-primary" />
                      {property.size}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full button-primary bg-primary text-primary-foreground hover:shadow-lg mt-4">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
