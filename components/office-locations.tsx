'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function OfficeLocations() {
  const offices = [
    {
      type: 'Head Office',
      name: 'Shaiks Real Estate - Narayankhed',
      address: 'Vehkateshwar Theatre Road Narayankhed, Sangareddy Dist.',
      phone: '+91-9876543210',
      email: 'shaiksrealestate@gmail.com',
      hours: 'Mon - Sat: 08:00 AM - 7:00 PM | Sun: 06:00 AM - 08:00 PM',
      isHead: true,
    },
    {
      type: 'Branch Office',
      name: 'Shaiks Real Estate - Zaheerabad',
      address: 'Zaheerabad, Telangana',
      phone: '+91-7569955634',
      email: 'shaiksrealestate@gmail.com',
      hours: 'Mon - Sat: 08:00 AM - 7:00 PM | Sun: 06:00 AM - 08:00 PM',
      isHead: false,
    },
    {
      type: 'Branch Office',
      name: 'Shaiks Real Estate - Rajeshwar, Basava Kalyan',
      address: 'Rajeshwar, Basava Kalyan, Karnataka',
      phone: '+91-7569955634',
      email: 'shaiksrealestate@gmail.com',
      hours: 'Mon - Sat: 08:00 AM - 7:00 PM | Sun: 06:00 AM - 08:00 PM',
      isHead: false,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Office Locations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us at our conveniently located offices across Telangana and Karnataka
          </p>
        </div>

        {/* Offices Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <div
              key={index}
              className={`card-luxury overflow-hidden transition-all hover:shadow-2xl ${
                office.isHead ? 'lg:col-span-1 md:col-span-1' : ''
              }`}
            >
              {/* Badge */}
              <div
                className={`px-4 py-2 text-white font-semibold text-center ${
                  office.isHead
                    ? 'bg-primary'
                    : 'bg-accent'
                }`}
              >
                {office.type}
                {office.isHead && ' ⭐'}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {office.name}
                </h3>

                {/* Address */}
                <div className="mb-4">
                  <div className="flex gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      {office.address}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${office.phone}`}
                      className="text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {office.hours}
                  </p>
                </div>

                {/* CTA Button */}
                <button className="button-primary w-full mt-6">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-8 bg-secondary/50 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Plan Your Visit
          </h3>
          <p className="text-muted-foreground mb-6">
            Our team is ready to assist you at any of our office locations. Call ahead to schedule a consultation or property viewing.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/917569955634"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+917569955634"
              className="button-secondary"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
