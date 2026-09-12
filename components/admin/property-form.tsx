'use client'

import { useState } from 'react'
import { PropertyInput, createProperty, updateProperty } from '@/app/actions/properties'
import { Loader2, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PropertyFormProps { property?: PropertyInput & { id?: number }; onClose?: () => void }
const TYPES = ['Villa', 'Apartment', 'Plot', 'Farm Land', 'Commercial']
const STATUSES = ['available', 'sold', 'rented', 'under-construction']

export function PropertyForm({ property: initialProperty, onClose }: PropertyFormProps) {
  const empty: PropertyInput = { code: '', name: '', location: '', price: 0, size: '', type: 'Villa', description: '', imageUrl: '', status: 'available' }
  const [formData, setFormData] = useState<PropertyInput>(initialProperty || empty)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function uploadImages(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files?.length) return
    setUploading(true)
    setError('')
    try {
      const body = new FormData()
      Array.from(files).forEach((file) => body.append('files', file))
      const response = await fetch('/api/uploads', { method: 'POST', body })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Upload failed')
      const existing = formData.imageUrl?.trim() ? `${formData.imageUrl.trim()}\n` : ''
      setFormData({ ...formData, imageUrl: `${existing}${result.urls.join('\n')}` })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload images')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      if (initialProperty?.id) await updateProperty(initialProperty.id, formData)
      else await createProperty(formData)
      onClose?.(); router.refresh()
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to save property') }
    finally { setLoading(false) }
  }

  const field = (label: string, key: keyof PropertyInput, type = 'text', placeholder = '') => (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground">{label}
      <input type={type} value={String(formData[key] ?? '')} onChange={(e) => setFormData({ ...formData, [key]: type === 'number' ? Number(e.target.value) : e.target.value })} placeholder={placeholder} className="w-full rounded-lg border border-border bg-input px-3 py-2 font-normal outline-none focus:border-primary" required={!['code', 'description', 'imageUrl'].includes(key)} />
    </label>
  )

  return <div className="card-luxury border border-border p-6">
    <div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-bold">{initialProperty?.id ? 'Edit Property' : 'Add New Property'}</h2>{onClose && <button type="button" onClick={onClose} aria-label="Close"><X /></button>}</div>
    <form onSubmit={submit} className="flex flex-col gap-4">
      {error && <p className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">{field('Property Code', 'code', 'text', 'e.g. PROP-001')}{field('Property Name *', 'name', 'text', 'Luxury Villa')}{field('Location *', 'location', 'text', 'Hyderabad, Telangana')}{field('Price (INR) *', 'price', 'number', '10000000')}{field('Size *', 'size', 'text', '2500 sq.ft')}
        <label className="flex flex-col gap-2 text-sm font-medium">Type<select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="rounded-lg border border-border bg-input px-3 py-2">{TYPES.map((x) => <option key={x}>{x}</option>)}</select></label>
        <label className="flex flex-col gap-2 text-sm font-medium">Status<select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="rounded-lg border border-border bg-input px-3 py-2">{STATUSES.map((x) => <option key={x}>{x}</option>)}</select></label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">Description<textarea value={formData.description ?? ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="rounded-lg border border-border bg-input px-3 py-2" /></label>
      <label className="flex flex-col gap-2 text-sm font-medium">Property images
        <span className="text-xs font-normal text-muted-foreground">Upload JPG, PNG, WEBP, or AVIF images to Cloudflare R2, or paste external HTTPS URLs below. Up to 12 images, 10 MB each.</span>
        <div className="flex items-center gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"><Upload data-icon="inline-start" />{uploading ? 'Uploading...' : 'Upload to R2'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={uploadImages} disabled={uploading} className="sr-only" /></label>{uploading && <Loader2 className="animate-spin" aria-label="Uploading images" />}</div>
        <textarea value={formData.imageUrl ?? ''} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} rows={5} placeholder="One URL per line or comma-separated" className="rounded-lg border border-border bg-input px-3 py-2 font-normal" />
      </label>
      <div className="flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2">Cancel</button><button type="submit" disabled={loading || uploading} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50">{loading && <Loader2 className="animate-spin" />} {loading ? 'Saving...' : initialProperty?.id ? 'Update Property' : 'Create Property'}</button></div>
    </form>
  </div>
}
