'use client'

import { deleteProperty } from '@/app/actions/properties'
import { Edit2, Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PropertyData {
  id: number
  name: string
  location: string
  price: number
  size: string
  type: string
  status: string
  createdAt: Date
}

interface PropertiesTableProps {
  properties: PropertyData[]
  onEdit: (property: PropertyData) => void
}

export function PropertiesTable({ properties, onEdit }: PropertiesTableProps) {
  const [deleting, setDeleting] = useState<number | null>(null)
  const router = useRouter()

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this property?')) return

    setDeleting(id)
    try {
      await deleteProperty(id)
      router.refresh()
    } catch (error) {
      alert('Failed to delete property')
      console.error(error)
    } finally {
      setDeleting(null)
    }
  }

  if (properties.length === 0) {
    return (
      <div className="card-luxury p-8 text-center border border-border">
        <p className="text-foreground/60">No properties found. Create your first property.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Property
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Location
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Price
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Status
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3 text-foreground font-medium">{prop.name}</td>
              <td className="px-4 py-3 text-foreground/70">{prop.location}</td>
              <td className="px-4 py-3 text-foreground font-semibold">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(prop.price)}
              </td>
              <td className="px-4 py-3 text-foreground/70">{prop.type}</td>
              <td className="px-4 py-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  prop.status === 'available'
                    ? 'bg-primary/15 text-primary'
                    : prop.status === 'sold'
                    ? 'bg-destructive/15 text-destructive'
                    : 'bg-muted text-foreground'
                }`}>
                  {prop.status.charAt(0).toUpperCase() + prop.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(prop)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(prop.id)}
                    disabled={deleting === prop.id}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === prop.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
