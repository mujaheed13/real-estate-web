'use server'

import { auth } from '@/lib/auth'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { property } from '@/lib/db/schema'
import * as schema from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')
  const pool = new Pool({ connectionString: url })
  return drizzle(pool, { schema })
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
  const db = getDb()

  const result = await db
    .insert(property)
    .values({
      ...data,
      userId,
      status: data.status || 'available',
    })
    .returning()

  revalidatePath('/admin/properties')
  revalidatePath('/properties')
  return result[0]
}

export async function updateProperty(id: number, data: PropertyInput) {
  const userId = await getUserId()
  const db = getDb()

  await db
    .update(property)
    .set({
      ...data,
      updatedAt: new Date(),
    })
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
  const db = getDb()
  const properties = await db.select().from(property).orderBy(desc(property.createdAt))
  return properties
}
