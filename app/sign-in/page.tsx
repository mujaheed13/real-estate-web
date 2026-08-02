import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Admin Sign In - Shaiks Real Estate',
  description: 'Sign in to your admin dashboard',
}

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <AuthForm mode="sign-in" />
    </main>
  )
}
