"use client";

import { Briefcase, MapPin } from "lucide-react";

export function LegalAdvocates() {
  const advocates = [
    {
      name: "P. Venkat Ram Reddy",
      location: "Zaheerabad, Telangana",
      education: "B.Sc., LL.B.",
      experience: "30+ years",
    },
    {
      name: "D. Chandrashekar Rao",
      location: "Narayankhed, Telangana",
      education: "B.Sc., LL.B.",
      experience: "30+ years",
    },
    {
      name: "Susheel D. Avasti",
      location: "Basavakalyan, Karnataka",
      education: "B.Sc., LL.B.",
      experience: "15+ years",
    },
    {
      name: "P. Sudhakar",
      location: "Narayankhed, Telangana",
      education: "B.Sc., LL.B.",
      experience: "10+ years",
    },
  ];
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Legal Advocates Network
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert legal professionals ensuring safe and transparent
            transactions across all our service areas
          </p>
        </div>

        {/* Advocates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advocates.map((advocate, index) => (
            <div
              key={index}
              className="card-luxury p-6 border-l-4 border-primary hover:shadow-xl transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {advocate.name}
                </h3>
                <p className="text-sm text-primary font-semibold">
                  {advocate.education}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{advocate.location}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-sm font-semibold text-foreground">
                    Experience: {advocate.experience}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center p-8 bg-secondary/50 rounded-lg">
          <p className="text-foreground font-semibold mb-2">
            All Advocates are Certified by Bar Council of India
          </p>
          <p className="text-muted-foreground">
            We maintain partnerships with the most reputable legal professionals
            in Telangana and Karnataka
          </p>
        </div>
      </div>
    </section>
  );
}
