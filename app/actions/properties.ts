'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { property } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

function getDb() {
  if (!db) throw new Error('DATABASE_URL is required')
  return db
}

const PROPERTY_STATUSES = ['available', 'sold', 'rented', 'under-construction'] as const

function normalizeProperty(data: PropertyInput) {
  const name = data.name.trim()
  const location = data.location.trim()
  const size = data.size.trim()
  const type = data.type.trim()
  const price = Number(data.price)
  const status = data.status || 'available'

  if (!name || !location || !size || !type) throw new Error('Please complete all required fields')
  if (!Number.isSafeInteger(price) || price <= 0) throw new Error('Price must be a positive whole number')
  if (!PROPERTY_STATUSES.includes(status as (typeof PROPERTY_STATUSES)[number])) throw new Error('Invalid property status')
  if (data.imageUrl && !data.imageUrl.startsWith('https://')) throw new Error('Image URL must use HTTPS')

  return { name, location, size, type, price, status, description: data.description?.trim() || null, imageUrl: data.imageUrl?.trim() || null }
}

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getProperties() {
  const userId = await getUserId()
  const db = getDb()
  return db
    .select()
    .from(property)
    .where(eq(property.userId, userId))
    .orderBy(desc(property.createdAt))
}

export async function getPropertyById(id: number) {
  const userId = await getUserId()
  const db = getDb()
  const result = await db
    .select()
    .from(property)
    .where(and(eq(property.id, id), eq(property.userId, userId)))

  return result[0] || null
}

export interface PropertyInput {
  name: string
  location: string
  price: number
  size: string
  type: string
  description?: string
  imageUrl?: string
  status?: string
}

export async function createProperty(data: PropertyInput) {
  const userId = await getUserId()
  const database = getDb()
  const values = normalizeProperty(data)

  const result = await database
    .insert(property)
    .values({ ...values, userId })
    .returning()

  revalidatePath('/admin/properties')
  revalidatePath('/properties')
  return result[0]
}

export async function updateProperty(id: number, data: PropertyInput) {
  const userId = await getUserId()
  const database = getDb()
  const values = normalizeProperty(data)

  await database
    .update(property)
    .set({ ...values, updatedAt: new Date() })
    .where(and(eq(property.id, id), eq(property.userId, userId)))

  revalidatePath('/admin/properties')
  revalidatePath('/properties')
  return await getPropertyById(id)
}

export async function deleteProperty(id: number) {
  const userId = await getUserId()
  const db = getDb()

  await db
    .delete(property)
    .where(and(eq(property.id, id), eq(property.userId, userId)))

  revalidatePath('/admin/properties')
  revalidatePath('/properties')
}

export async function getAllPublicProperties() {
  const database = getDb()
  return database
    .select()
    .from(property)
    .orderBy(desc(property.createdAt))
}
