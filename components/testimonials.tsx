'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    title: 'Business Owner',
    rating: 5,
    text: 'Found my dream villa through Shaiks Real Estate. Their professionalism and transparency throughout the process made it hassle-free.',
    image: '/api/placeholder/80/80',
  },
  {
    name: 'Priya Sharma',
    title: 'Investment Professional',
    rating: 5,
    text: 'Excellent guidance on property investment. Their team provided detailed market analysis and helped me make informed decisions.',
    image: '/api/placeholder/80/80',
  },
  {
    name: 'Amit Patel',
    title: 'Entrepreneur',
    rating: 5,
    text: 'Outstanding service! They understood my requirements perfectly and presented options that exceeded expectations.',
    image: '/api/placeholder/80/80',
  },
  {
    name: 'Deepika Singh',
    title: 'Corporate Executive',
    rating: 5,
    text: 'The documentation process was smooth and transparent. Highly recommend for anyone serious about real estate investment.',
    image: '/api/placeholder/80/80',
  },
  {
    name: 'Vikram Reddy',
    title: 'Developer',
    rating: 5,
    text: 'Working with Shaiks Real Estate as a business partner has been great. Professional, reliable, and results-driven.',
    image: '/api/placeholder/80/80',
  },
]

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10 dark:bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Client Testimonials</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our satisfied clients who have found their perfect properties
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              <div className="flex">
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="min-w-full px-4">
                    <div className="card-luxury p-8 sm:p-12 text-center border border-border">
                      {/* Rating */}
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} className="fill-primary text-primary" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-lg text-foreground mb-8 leading-relaxed italic font-medium">
                        &quot;{testimonial.text}&quot;
                      </p>

                      {/* Author */}
                      <div>
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                          {testimonial.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-lg text-foreground">{testimonial.name}</h4>
                        <p className="text-foreground/60">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 sm:-translate-x-20 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:shadow-lg transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 sm:translate-x-20 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:shadow-lg transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-primary w-8' : 'bg-muted'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
