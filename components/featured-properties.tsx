import { getAllPublicProperties } from '@/app/actions/properties'
import { getPropertyImages } from '@/lib/property-utils'
import { Home, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export async function FeaturedProperties() {
  const properties = (await getAllPublicProperties()).slice(0, 3)

  return (
    <section id="properties" className="bg-secondary/20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 className="text-4xl font-bold text-foreground sm:text-5xl">Featured Properties</h2><p className="mt-3 max-w-2xl text-lg text-muted-foreground">Discover our latest premium real estate opportunities.</p></div>
          <Link href="/properties" className="button-secondary inline-flex w-fit items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">View More Properties</Link>
        </div>
        {properties.length === 0 ? <p className="py-12 text-center text-muted-foreground">New properties are coming soon.</p> : <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{properties.map((item) => { const image = getPropertyImages(item.imageUrl)[0]; return <article key={item.id} className="card-luxury overflow-hidden"><div className="relative h-64 bg-muted">{image && <Image src={image} alt={item.name} fill className="object-cover" />}</div><div className="p-6"><p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">{item.type}</p><h3 className="mb-3 text-xl font-bold text-foreground">{item.name}</h3><p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"><MapPin data-icon="inline-start" />{item.location}</p><p className="mb-4 text-3xl font-bold text-primary">₹{(item.price / 10000000).toFixed(2)} Cr</p><div className="mb-6 flex gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><Home data-icon="inline-start" />{item.type}</span><span className="flex items-center gap-1"><Ruler data-icon="inline-start" />{item.size}</span></div><Link href={`/properties/${item.id}`} className="button-primary block w-full bg-primary text-center text-primary-foreground hover:shadow-lg">View Details</Link></div></article> })}</div>}
      </div>
    </section>
  )
}
