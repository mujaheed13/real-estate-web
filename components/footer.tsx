import Link from 'next/link'
import { Mail, Phone, MapPin, Share2, Heart, PlayCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background dark:bg-slate-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-foreground">
                SR
              </div>
              <span className="font-bold text-lg">Shaiks Real Estate</span>
            </div>
            <p className="text-gray-400 mb-4">
              India&apos;s most trusted real estate partner, dedicated to helping you find your dream property.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#properties" className="text-gray-400 hover:text-accent transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Buy Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Sell Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Investment Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                  Legal Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Phone size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-gray-400">+91 7569955634</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-gray-400">shaiksrealestate@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-gray-400">Vehkateshwar Theatre Road<br />Narayankhed, Sangareddy Dist.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex justify-between items-center flex-col sm:flex-row gap-6">
            <div className="flex gap-4">
              <a
                href="https://facebook.com/shaiksrealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent/20 hover:bg-accent text-accent hover:text-foreground rounded-full flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Share2 size={20} />
              </a>
              <a
                href="https://instagram.com/shaiksrealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent/20 hover:bg-accent text-accent hover:text-foreground rounded-full flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Heart size={20} />
              </a>
              <a
                href="https://youtube.com/@shaiksrealestate2413"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent/20 hover:bg-accent text-accent hover:text-foreground rounded-full flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <PlayCircle size={20} />
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              © 2024 Shaiks Real Estate. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
