import { getAllPublicProperties } from '@/app/actions/properties'
import { formatIndianPrice, getPropertyImages } from '@/lib/property-utils'
import { PropertyCarousel } from '@/components/property-carousel'
import { ArrowLeft, Home, MapPin, MessageCircle, Ruler } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const properties = await getAllPublicProperties()
  const property = properties.find((item) => item.id === Number(id))
  if (!property) notFound()

  const images = getPropertyImages(property.imageUrl)
  const primaryImage = images[0]

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/properties" className="mb-8 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft data-icon="inline-start" /> Back to Properties
        </Link>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {primaryImage && <PropertyCarousel images={images} name={property.name} />}
          <div className="flex flex-col gap-8 p-6 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">{property.type}</p>
                <h1 className="text-3xl font-bold text-foreground sm:text-5xl">{property.name}</h1>
                <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin data-icon="inline-start" />{property.location}</p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end"><p className="text-3xl font-bold text-primary">{formatIndianPrice(property.price)}</p><a href={`https://wa.me/917569955634?text=${encodeURIComponent(`Hello, I am interested in ${property.name} (${property.code || 'Property'}). Location: ${property.location}. Price: ${formatIndianPrice(property.price)}. Please share more details.`)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"><MessageCircle data-icon="inline-start" /> WhatsApp</a></div>
            </div>
            <div className="grid gap-4 border-y border-border py-6 sm:grid-cols-2">
              <p className="flex items-center gap-3 text-muted-foreground"><Home data-icon="inline-start" />{property.type}</p>
              <p className="flex items-center gap-3 text-muted-foreground"><Ruler data-icon="inline-start" />{property.size}</p>
            </div>
            {property.description && <p className="max-w-3xl leading-7 text-muted-foreground">{property.description}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
