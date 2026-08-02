import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import { LogOut, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Dashboard - Shaiks Real Estate',
  description: 'Manage your properties',
}

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  async function handleLogout() {
    'use server'
    await auth.api.signOut({ headers: await headers() })
    redirect('/sign-in')
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-foreground/60 text-sm mt-1">Welcome, {session.user.email}</p>
          </div>
          <form action={handleLogout}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 button-secondary hover:bg-muted rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/properties"
            className="card-luxury p-6 border border-border hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Manage Properties</p>
                <p className="text-3xl font-bold text-primary mt-2">Properties</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center">
                <Plus size={24} className="text-primary" />
              </div>
            </div>
          </Link>

          <div className="card-luxury p-6 border border-border">
            <div>
              <p className="text-foreground/60 text-sm">Account</p>
              <p className="text-xl font-semibold text-foreground mt-2">{session.user.email}</p>
              <p className="text-sm text-foreground/60 mt-4">Administrator</p>
            </div>
          </div>

          <div className="card-luxury p-6 border border-border">
            <div>
              <p className="text-foreground/60 text-sm">Quick Links</p>
              <div className="mt-4 space-y-2">
                <Link
                  href="/"
                  className="block text-primary hover:underline text-sm"
                >
                  View Public Site
                </Link>
                <Link
                  href="/properties"
                  className="block text-primary hover:underline text-sm"
                >
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Dashboard Navigation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/admin/properties"
              className="p-4 border border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all text-foreground hover:text-primary"
            >
              <p className="font-semibold">Properties Management</p>
              <p className="text-sm text-foreground/60 mt-1">Add, edit, and delete properties</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
