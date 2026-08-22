"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function SiteVisits() {
  const visits = [
    {
      image: "/client-visit/client-visit-9.jpeg",
      title: "Professional Site Inspection",
      description:
        "Our team conducts thorough property inspections with clients",
    },
    {
      image: "/client-visit/client-visit-7.jpeg",
      title: "Project Consultation",
      description:
        "Discussing development details and investment opportunities",
    },
    {
      image: "/client-visit/client-visit-3.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
    {
      image: "/client-visit/client-visit-7.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
    {
      image: "/client-visit/client-visit-5.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
    {
      image: "/client-visit/client-visit-6.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
    {
      image: "/client-visit/client-visit-4.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
    {
      image: "/client-visit/client-visit-8.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
    {
      image: "/client-visit/client-visit-1.jpeg",
      title: "Property Tour",
      description: "Guiding clients through premium residential properties",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Camera className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">Our Happy Clients</h2>

          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Experience our transparent and professional approach to property
            selection.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {visits.map((visit, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group overflow-hidden rounded-xl shadow-lg">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={visit.image}
                      alt={visit.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="-left-5" />
          <CarouselNext className="-right-5" />
        </Carousel>
      </div>
    </section>
  );
}
