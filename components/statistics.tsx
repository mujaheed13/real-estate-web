'use client'

import { useState, useEffect, useRef } from 'react'

interface Stat {
  number: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { number: 500, suffix: '+', label: 'Happy Customers' },
  { number: 1000, suffix: '+', label: 'Properties' },
  { number: 10, suffix: '+', label: 'Years Experience' },
  { number: 100, suffix: '%', label: 'Trusted Deals' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.unobserve(entry.target)
      }
    })

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let current = 0
    const increment = Math.ceil(target / 50)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [isVisible, target])

  return (
    <div ref={counterRef} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
        {count}
        {suffix}
      </div>
    </div>
  )
}

export function Statistics() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Our Track Record</h2>
          <p className="text-lg text-muted-foreground">
            Proven excellence in real estate with thousands of satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="card-luxury bg-primary p-8 text-center"
            >
              <Counter target={stat.number} suffix={stat.suffix} />
              <p className="text-foreground/80 font-semibold mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
