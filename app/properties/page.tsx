import { getAllPublicProperties } from '@/app/actions/properties'
import { PropertiesBrowser } from '@/components/properties-browser'
import Link from 'next/link'

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg">No properties available at the moment.</p>
          </div>
        ) : (
          <PropertiesBrowser properties={properties} />
        )}
      </div>
    </main>
  )
}
