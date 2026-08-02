import { getAllPublicProperties } from '@/app/actions/properties'
import { MapPin, Home, Ruler, IndianRupee } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Properties - Shaiks Real Estate',
  description: 'Browse our premium property listings',
}

export default async function PropertiesPage() {
  const properties = await getAllPublicProperties()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-primary hover:underline text-sm mb-4 inline-block">
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Properties</h1>
          <p className="text-foreground/60 text-lg">
            Discover premium real estate opportunities across Telangana and Karnataka
          </p>
        </div>
      </header>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg">No properties available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="card-luxury border border-border overflow-hidden hover:shadow-2xl transition-all">
                {/* Image */}
                {property.imageUrl && (
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={property.imageUrl}
                      alt={property.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          property.status === 'available'
                            ? 'bg-primary/90 text-primary-foreground'
                            : property.status === 'sold'
                            ? 'bg-destructive/90 text-destructive-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{property.name}</h3>

                  {/* Location */}
                  <div className="flex items-center text-foreground/70 mb-4">
                    <MapPin size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <IndianRupee size={20} className="text-primary" />
                      <span className="text-2xl font-bold text-primary">
                        {(property.price / 10000000).toFixed(2)} Cr
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-foreground/70">
                      <Home size={16} className="mr-2 text-primary" />
                      <span className="text-sm">{property.type}</span>
                    </div>
                    <div className="flex items-center text-foreground/70">
                      <Ruler size={16} className="mr-2 text-primary" />
                      <span className="text-sm">{property.size}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {property.description && (
                    <p className="text-foreground/70 text-sm mb-6 line-clamp-2">
                      {property.description}
                    </p>
                  )}

                  {/* Button */}
                  <button className="w-full button-primary bg-primary text-primary-foreground hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
