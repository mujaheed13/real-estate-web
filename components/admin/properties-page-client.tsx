'use client'

import { useState } from 'react'
import { PropertyForm } from '@/components/admin/property-form'
import { PropertiesTable } from '@/components/admin/properties-table'
import { Plus } from 'lucide-react'

interface PropertyData {
  id: number
  name: string
  location: string
  price: number
  size: string
  type: string
  status: string
  description?: string
  imageUrl?: string
  createdAt: Date
}

interface PropertiesPageClientProps {
  properties: PropertyData[]
}

export function PropertiesPageClient({ properties: initialProperties }: PropertiesPageClientProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<PropertyData | null>(null)

  function handleEdit(property: PropertyData) {
    setEditingProperty(property)
    setShowForm(true)
  }

  function handleCloseForm() {
    setShowForm(false)
    setEditingProperty(null)
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditingProperty(null)
            setShowForm(!showForm)
          }}
          className="flex items-center gap-2 px-4 py-2 button-primary bg-primary text-primary-foreground hover:shadow-lg rounded-lg"
        >
          <Plus size={20} />
          {showForm && !editingProperty ? 'Cancel' : 'Add Property'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <PropertyForm
            property={
              editingProperty
                ? {
                    ...editingProperty,
                    id: editingProperty.id,
                  }
                : undefined
            }
            onClose={handleCloseForm}
          />
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">All Properties</h2>
        <PropertiesTable properties={initialProperties} onEdit={handleEdit} />
      </div>
    </>
  )
}
