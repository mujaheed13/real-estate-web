"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Imran Khan",
    rating: 5,
    text: "Israr and team are very professional and have in-depth knowledge of the complete process. We purchased 1 acre of agricultural land in Karamungi through them and received amazing support throughout the journey. Even when land loan issues came up, they handled everything smoothly and professionally without bothering us at all. Their dedication, transparency, and teamwork made the entire process stress-free. I highly recommend them and wish them continued success.",
    image: "/api/placeholder/80/80",
  },
  {
    name: "Gnanender Kumar",
    rating: 5,
    text: "I purchased 1.5 acres of agricultural land through Shaiks Real Estate about 6 months ago. Their service is excellent, and they deal only in verified properties. Thank you, Shaiks Real Estate!",
    image: "/api/placeholder/80/80",
  },
  {
    name: "Mohammed Nooruddin",
    rating: 5,
    text: "I purchased land in Narayankhed with the help of Shaiks Real Estate. The entire process was smooth and transparent. I highly recommend them to anyone looking to purchase land.",
    image: "/api/placeholder/80/80",
  },
  {
    name: "Titus Mary Richard",
    rating: 5,
    text: "Shaiks Real Estate is a genuine real estate company. They did a great job helping me purchase farmland. Thank you!",
    image: "/api/placeholder/80/80",
  },
  {
    name: "Sohail Tanveer",
    rating: 5,
    text: "Assalamu Alaikum. We purchased 3 acres of land in Nagalgidda, Narayankhed through Shaik Real Estate about 6 months ago. Last month we drilled a borewell, and Alhamdulillah, we found water. Their team thoroughly verified all papers and documents, making the deal transparent and genuine. Keep growing, Ahmed!",
    image: "/api/placeholder/80/80",
  },
];

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10 dark:bg-slate-900/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our satisfied clients who have found their perfect
            properties
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
                          <Star
                            key={i}
                            size={20}
                            className="fill-primary text-primary"
                          />
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
                        <h4 className="font-bold text-lg text-foreground">
                          {testimonial.name}
                        </h4>
                        {/* <p className="text-foreground/60">
                          {testimonial.title}
                        </p> */}
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
                  idx === currentSlide ? "bg-primary w-8" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
