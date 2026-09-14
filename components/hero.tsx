'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const images = ['/hero-villa.png', '/hero-apartment.png', '/hero-plot.png']
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      {images.map((img, idx) => (
        <Image
          key={idx}
          src={img}
          alt="Property"
          fill
          className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
            idx === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          priority={idx === 0}
        />
      ))}

      {/* Gradient Overlay - Enhanced for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
          Find Your Dream Property with Confidence
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-white drop-shadow-lg font-medium">
          Premium Open Plots • Villas • Apartments • Farm Lands • Investment Properties
        </p>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-12 max-w-3xl mx-auto">
          {[
            '✓ Verified Properties',
            '✓ Best Prices',
            '✓ Trusted Consultants',
            '✓ End-to-End Support',
          ].map((badge, idx) => (
            <div key={idx} className="bg-black/40 backdrop-blur-md border border-white/30 text-white py-3 px-2 rounded-lg text-sm font-medium shadow-lg">
              {badge}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/properties" className="button-primary bg-white text-secondary hover:bg-gray-100">
            View Properties
          </Link>
          <button className="button-secondary border-2 border-white text-white hover:bg-white hover:text-secondary">
            Contact Us
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  )
}
