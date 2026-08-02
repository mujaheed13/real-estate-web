'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react'

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'sign-up') {
        await authClient.signUp.email(
          { email, password, name },
          {
            onSuccess: () => {
              router.push('/')
              router.refresh()
            },
            onError: (ctx) => {
              setError(ctx.error.message || 'Sign up failed')
            },
          }
        )
      } else {
        await authClient.signIn.email(
          { email, password },
          {
            onSuccess: () => {
              router.push('/')
              router.refresh()
            },
            onError: (ctx) => {
              setError(ctx.error.message || 'Sign in failed')
            },
          }
        )
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-luxury p-8 border border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {mode === 'sign-in' ? 'Admin Login' : 'Create Admin Account'}
        </h1>
        <p className="text-foreground/60 mb-6">
          {mode === 'sign-in'
            ? 'Sign in to your admin account'
            : 'Create a new admin account'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle size={20} className="text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {mode === 'sign-up' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="flex items-center gap-2 px-3 py-2 bg-input rounded-lg border border-border">
                <User size={20} className="text-primary/60" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="flex-1 bg-transparent outline-none text-foreground"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-input rounded-lg border border-border">
              <Mail size={20} className="text-primary/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="flex-1 bg-transparent outline-none text-foreground"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2 bg-input rounded-lg border border-border">
              <Lock size={20} className="text-primary/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-foreground"
                minLength={8}
                required
              />
            </div>
            {mode === 'sign-up' && (
              <p className="text-xs text-foreground/60 mt-1">Minimum 8 characters</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full button-primary bg-primary text-primary-foreground hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                {mode === 'sign-in' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : mode === 'sign-in' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-foreground/60">
            {mode === 'sign-in' ? "Don't have an account? " : 'Already have an account? '}
            <a
              href={mode === 'sign-in' ? '/sign-up' : '/sign-in'}
              className="text-primary hover:underline font-medium"
            >
              {mode === 'sign-in' ? 'Sign up' : 'Sign in'}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
