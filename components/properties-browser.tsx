'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Home, IndianRupee, MapPin, Ruler, Search, SlidersHorizontal } from 'lucide-react'
import { formatIndianPrice, getPropertyImages } from '@/lib/property-utils'

type Property = {
  id: number
  name: string
  location: string
  price: number
  size: string
  type: string
  description: string | null
  imageUrl: string | null
  status: string
}

const PAGE_SIZE = 6

export function PropertiesBrowser({ properties }: { properties: Property[] }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [page, setPage] = useState(1)

  const types = useMemo(() => [...new Set(properties.map((property) => property.type))].sort(), [properties])
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const minimum = minPrice ? Number(minPrice) : 0
    const maximum = maxPrice ? Number(maxPrice) : Number.POSITIVE_INFINITY

    return properties.filter((property) => {
      const matchesSearch = !query || [property.name, property.location, property.type, property.description ?? ''].some((value) => value.toLowerCase().includes(query))
      return matchesSearch && (type === 'all' || property.type === type) && (status === 'all' || property.status === status) && property.price >= minimum && property.price <= maximum
    })
  }, [maxPrice, minPrice, properties, search, status, type])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visibleProperties = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const updateFilter = (setter: (value: string) => void, value: string) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-8">
      <section aria-label="Filter properties" className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-foreground">
          <SlidersHorizontal className="text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Find your property</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <label className="relative lg:col-span-2">
            <span className="sr-only">Search properties</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input value={search} onChange={(event) => updateFilter(setSearch, event.target.value)} placeholder="Search by name, location or type" className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" />
          </label>
          <label>
            <span className="sr-only">Property type</span>
            <select value={type} onChange={(event) => updateFilter(setType, event.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option value="all">All property types</option>
              {types.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Property status</span>
            <select value={status} onChange={(event) => updateFilter(setStatus, event.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <option value="all">All statuses</option>
              <option value="available">Available</option>
              <option value="under-construction">Under construction</option>
              <option value="rented">Rented</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <div className="flex gap-2">
            <label className="min-w-0 flex-1"><span className="sr-only">Minimum price</span><input type="number" min="0" value={minPrice} onChange={(event) => updateFilter(setMinPrice, event.target.value)} placeholder="Min price" className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
            <label className="min-w-0 flex-1"><span className="sr-only">Maximum price</span><input type="number" min="0" value={maxPrice} onChange={(event) => updateFilter(setMaxPrice, event.target.value)} placeholder="Max price" className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" /></label>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>{filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found</span>
          {(search || type !== 'all' || status !== 'all' || minPrice || maxPrice) && <button type="button" onClick={() => { setSearch(''); setType('all'); setStatus('all'); setMinPrice(''); setMaxPrice(''); setPage(1) }} className="font-medium text-primary hover:underline">Clear filters</button>}
        </div>
      </section>

      {visibleProperties.length === 0 ? <div className="rounded-2xl border border-dashed border-border py-16 text-center"><p className="text-lg font-medium text-foreground">No matching properties</p><p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p></div> : <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visibleProperties.map((property) => { const image = getPropertyImages(property.imageUrl)[0]; return <article key={property.id} className="card-luxury overflow-hidden border border-border transition-all hover:shadow-2xl">
        {image && <div className="relative h-48 overflow-hidden bg-muted"><Image src={image} alt={property.name} fill className="object-cover transition-transform duration-300 hover:scale-105" /><span className="absolute right-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground">{property.status.replace('-', ' ')}</span></div>}
        <div className="p-6"><h3 className="mb-2 text-xl font-bold text-foreground">{property.name}</h3><div className="mb-4 flex items-center text-foreground/70"><MapPin size={16} className="mr-2 shrink-0 text-primary" aria-hidden="true" /><span className="text-sm">{property.location}</span></div><div className="mb-4 flex items-center gap-2 border-b border-border pb-4"><IndianRupee size={20} className="text-primary" aria-hidden="true" /><span className="text-2xl font-bold text-primary">{formatIndianPrice(property.price)}</span></div><div className="mb-6 flex flex-col gap-2 text-foreground/70"><span className="flex items-center"><Home size={16} className="mr-2 text-primary" aria-hidden="true" />{property.type}</span><span className="flex items-center"><Ruler size={16} className="mr-2 text-primary" aria-hidden="true" />{property.size}</span></div>{property.description && <p className="mb-6 line-clamp-2 text-sm text-foreground/70">{property.description}</p>}<Link href={`/properties/${property.id}`} className="button-primary block w-full bg-primary text-center text-primary-foreground hover:shadow-lg">View Details</Link></div>
      </article> })}</div>}

      {totalPages > 1 && <nav aria-label="Property pages" className="flex items-center justify-center gap-2"><button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50">Previous</button><span className="px-3 text-sm text-muted-foreground">Page {page} of {totalPages}</span><button type="button" disabled={page === totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50">Next</button></nav>}
    </div>
  )
}

export default PropertiesBrowser
