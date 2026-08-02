'use client'

import { useState } from 'react'
import { PropertyInput, createProperty, updateProperty } from '@/app/actions/properties'
import { Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PropertyFormProps {
  property?: PropertyInput & { id?: number }
  onClose?: () => void
}

const PROPERTY_TYPES = ['Villa', 'Apartment', 'Plot', 'Farm Land', 'Commercial']
const STATUSES = ['available', 'sold', 'rented', 'under-construction']

export function PropertyForm({ property: initialProperty, onClose }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyInput>(
    initialProperty || {
      name: '',
      location: '',
      price: 0,
      size: '',
      type: 'Villa',
      description: '',
      imageUrl: '',
      status: 'available',
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (initialProperty?.id) {
        await updateProperty(initialProperty.id, formData)
      } else {
        await createProperty(formData)
      }
      setFormData({
        name: '',
        location: '',
        price: 0,
        size: '',
        type: 'Villa',
        description: '',
        imageUrl: '',
        status: 'available',
      })
      onClose?.()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save property')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-luxury p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {initialProperty?.id ? 'Edit Property' : 'Add New Property'}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={24} className="text-foreground" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Property Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Luxury Villa in Hyderabad"
              className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Hyderabad, Telangana"
              className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Price (in INR) *
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Size *
            </label>
            <input
              type="text"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="e.g., 2500 sq.ft"
              className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
              required
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status *
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Property details..."
            rows={4}
            className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 bg-input rounded-lg border border-border text-foreground outline-none focus:border-primary"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 button-primary bg-primary text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving...
              </>
            ) : initialProperty?.id ? (
              'Update Property'
            ) : (
              'Add Property'
            )}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 button-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
