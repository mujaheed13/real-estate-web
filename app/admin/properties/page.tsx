import { auth } from '@/lib/auth'
import { redirect, headers } from 'next/navigation'
import { getProperties } from '@/app/actions/properties'
import { PropertyForm } from '@/components/admin/property-form'
import { PropertiesTable } from '@/components/admin/properties-table'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PropertiesPageClient } from '@/components/admin/properties-page-client'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Manage Properties - Shaiks Real Estate',
  description: 'Manage your property listings',
}

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

export default async function PropertiesPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const properties = (await getProperties()) as PropertyData[]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-muted rounded-lg transition-colors text-foreground"
            >
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Properties Management</h1>
              <p className="text-foreground/60 text-sm mt-1">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} listed
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertiesPageClient properties={properties} />
      </div>
    </main>
  )
}
