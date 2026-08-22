"use client";

import { Users } from "lucide-react";

export function Team() {
  const teamMembers = [
    {
      name: "Shaik Shakeel",
      occupation: "Founder and CEO",
      area: "Hyderabad, Telangana",
      description: "Providing investment advice and portfolio management.",
    },
    {
      name: "Shaik Israr Ahmed",
      occupation: "Co-Founder",
      area: "Hyderabad, Telangana",
      description:
        "Leading the organization with 7+ years of real estate expertise.",
    },
    {
      name: "Mohammad Faizan",
      occupation: "Sales Director - Narayankhed",
      area: "Sangareddy, Telangana",
      description:
        "Managing sales operations in Narayankhed and ensuring client satisfaction.",
    },
    {
      name: "Mohammad Junaid Ahmed",
      occupation: "Sales Director - Zaheerabad",
      area: "Zaheerabad, Telangana",
      description:
        "Leading sales operations and assisting clients with real estate investments in the Zaheerabad region.",
    },
    {
      name: "Mohammad Akheel",
      occupation: "Sales Director - Sangareddy",
      area: "Sangareddy, Telangana",
      description:
        "Overseeing property sales and delivering personalized real estate solutions in Sangareddy.",
    },
    {
      name: "Mohammad Ajaz Momin",
      occupation: "Sales Director - Basavakalyan",
      area: "Basavakalyan, Karnataka",
      description:
        "Managing sales and client relationships across the Basavakalyan region.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Expert Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the dedicated professionals serving Shaiks Real Estate across
            Telangana and Karnataka
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="card-luxury p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-primary font-semibold mb-2">
                {member.occupation}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">
                {member.area}
              </p>
              {/* <p className="text-sm text-foreground/75 dark:text-gray-300">
                {member.description}
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
