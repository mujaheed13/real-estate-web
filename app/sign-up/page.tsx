import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Admin Sign Up - Shaiks Real Estate',
  description: 'Create a new admin account',
}

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <AuthForm mode="sign-up" />
    </main>
  )
}
