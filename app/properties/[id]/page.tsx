import { getAllPublicProperties } from '@/app/actions/properties'
import { getPropertyImages } from '@/lib/property-utils'
import { ArrowLeft, Home, IndianRupee, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
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
          {primaryImage && (
            <div className="grid gap-3 bg-muted p-3 sm:grid-cols-2">
              {images.map((image, index) => (
                <div key={image} className={`relative ${index === 0 ? 'h-72 sm:col-span-2 sm:h-[28rem]' : 'h-40'}`}>
                  <Image src={image} alt={`${property.name} image ${index + 1}`} fill className="rounded-lg object-cover" priority={index === 0} />
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-8 p-6 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">{property.type}</p>
                <h1 className="text-3xl font-bold text-foreground sm:text-5xl">{property.name}</h1>
                <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin data-icon="inline-start" />{property.location}</p>
              </div>
              <p className="text-3xl font-bold text-primary">₹{(property.price / 10000000).toFixed(2)} Cr</p>
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
