'use client'

import { MapPin, Globe, Building2, Trees, Landmark, Mountain } from 'lucide-react'

export function ServiceAreas() {
  const states = [
    { name: 'Telangana', icon: Building2, color: 'bg-blue-50 dark:bg-blue-950/20' },
    { name: 'Karnataka', icon: Trees, color: 'bg-orange-50 dark:bg-orange-950/20' },
  ]

  const districts = [
    {
      name: 'Hyderabad',
      state: 'Telangana',
      icon: Building2,
    },
    {
      name: 'Sangareddy',
      state: 'Telangana',
      icon: MapPin,
    },
    {
      name: 'Vikarabad',
      state: 'Telangana',
      icon: Landmark,
    },
    {
      name: 'Medak',
      state: 'Telangana',
      icon: Trees,
    },
    {
      name: 'Bidar',
      state: 'Karnataka',
      icon: Building2,
    },
    {
      name: 'Gulbarga',
      state: 'Karnataka',
      icon: Mountain,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Service Areas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Serving premium properties across 2 states and 6 districts
          </p>
        </div>

        {/* States Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            States We Operate In
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {states.map((state, index) => {
              const StateIcon = state.icon
              return (
                <div
                  key={index}
                  className={`${state.color} card-luxury p-8 text-center transition-all hover:shadow-lg border border-border`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/15 mb-4">
                    <StateIcon size={32} className="text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground">
                    {state.name}
                  </h4>
                </div>
              )
            })}
          </div>
        </div>

        {/* Districts Section */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            6 Districts Coverage
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {districts.map((district, index) => {
              const DistrictIcon = district.icon
              return (
                <div
                  key={index}
                  className="card-luxury p-6 flex items-center gap-4 hover:scale-105 transition-transform border border-border"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                    <DistrictIcon size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">{district.state}</p>
                    <p className="text-lg font-bold text-foreground">
                      {district.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coverage Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-4xl font-bold text-primary mb-2">2</div>
            <p className="text-foreground/70">States</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-4xl font-bold text-primary mb-2">6</div>
            <p className="text-foreground/70">Districts</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <div className="text-4xl font-bold text-primary mb-2">100+</div>
            <p className="text-foreground/70">Properties</p>
          </div>
        </div>
      </div>
    </section>
  )
}
