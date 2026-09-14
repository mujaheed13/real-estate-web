'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { property } from '@/lib/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import * as XLSX from 'xlsx'
import { getPropertyImages } from '@/lib/property-utils'

function getDb() { if (!db) throw new Error('DATABASE_URL is required'); return db }
const PROPERTY_STATUSES = ['available', 'sold', 'rented', 'under-construction'] as const

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

function normalizeImages(value?: string) {
  const urls = getPropertyImages(value)
  if (urls.some((url) => !url.startsWith('https://'))) throw new Error('All image URLs must use HTTPS')
  return urls.join('\n') || null
}

function normalizeProperty(data: PropertyInput) {
  const name = data.name.trim(), location = data.location.trim(), size = data.size.trim(), type = data.type.trim()
  const price = Number(data.price), status = data.status || 'available'
  if (!name || !location || !size || !type) throw new Error('Please complete all required fields')
  if (!Number.isSafeInteger(price) || price <= 0) throw new Error('Price must be a positive whole number')
  if (!PROPERTY_STATUSES.includes(status as (typeof PROPERTY_STATUSES)[number])) throw new Error('Invalid property status')
  return { code: data.code?.trim() || null, name, location, size, type, price, status, description: data.description?.trim() || null, imageUrl: normalizeImages(data.imageUrl) }
}

export interface PropertyInput { code?: string; name: string; location: string; price: number; size: string; type: string; description?: string; imageUrl?: string; status?: string }

export async function getProperties() {
  const userId = await getUserId()
  return getDb().select().from(property).where(eq(property.userId, userId)).orderBy(desc(property.createdAt))
}

export async function getPropertyById(id: number) {
  const userId = await getUserId()
  const result = await getDb().select().from(property).where(and(eq(property.id, id), eq(property.userId, userId)))
  return result[0] || null
}

export async function createProperty(data: PropertyInput) {
  const userId = await getUserId(), values = normalizeProperty(data)
  const result = await getDb().insert(property).values({ ...values, userId }).returning()
  revalidatePath('/admin/properties'); revalidatePath('/properties'); revalidatePath('/')
  return result[0]
}

export async function updateProperty(id: number, data: PropertyInput) {
  const userId = await getUserId(), values = normalizeProperty(data)
  await getDb().update(property).set({ ...values, updatedAt: new Date() }).where(and(eq(property.id, id), eq(property.userId, userId)))
  revalidatePath('/admin/properties'); revalidatePath('/properties'); revalidatePath('/')
  return getPropertyById(id)
}

export async function deleteProperty(id: number) {
  const userId = await getUserId()
  await getDb().delete(property).where(and(eq(property.id, id), eq(property.userId, userId)))
  revalidatePath('/admin/properties'); revalidatePath('/properties'); revalidatePath('/')
}

export async function getAllPublicProperties() { return getDb().select().from(property).orderBy(desc(property.createdAt)) }

const columns = ['code', 'name', 'location', 'price', 'size', 'type', 'status', 'description', 'imageUrl']
function workbook(rows: Record<string, unknown>[]) { const sheet = XLSX.utils.json_to_sheet(rows, { header: columns }); const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Properties'); return XLSX.write(book, { type: 'buffer', bookType: 'xlsx' }) }

export async function exportProperties() {
  const rows = await getProperties()
  return Buffer.from(workbook(rows.map(({ code, name, location, price, size, type, status, description, imageUrl }) => ({ code, name, location, price, size, type, status, description: description ?? '', imageUrl: imageUrl ?? '' })))).toString('base64')
}

export async function downloadPropertyTemplate() { return Buffer.from(workbook([{ code: 'PROP-001', name: 'Example Villa', location: 'Hyderabad', price: 10000000, size: '2500 sq.ft', type: 'Villa', status: 'available', description: 'Property details', imageUrl: 'https://example.com/image.jpg\nhttps://example.com/image-2.jpg' }])).toString('base64') }

export async function importProperties(formData: FormData) {
  const userId = await getUserId(); const file = formData.get('file')
  if (!(file instanceof File)) throw new Error('Please select an XLSX file')
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(XLSX.read(Buffer.from(await file.arrayBuffer()), { type: 'buffer' }).Sheets.Properties || XLSX.read(Buffer.from(await file.arrayBuffer()), { type: 'buffer' }).Sheets.Sheet1)
  if (!rows.length) throw new Error('The workbook has no property rows')
  const values = rows.map((row, index) => { try { return { ...normalizeProperty({ code: String(row.code ?? ''), name: String(row.name ?? ''), location: String(row.location ?? ''), price: Number(row.price), size: String(row.size ?? ''), type: String(row.type ?? ''), status: String(row.status ?? 'available'), description: String(row.description ?? ''), imageUrl: String(row.imageUrl ?? '') }), userId } } catch (error) { throw new Error(`Row ${index + 2}: ${error instanceof Error ? error.message : 'Invalid row'}`) } })
  await getDb().insert(property).values(values)
  revalidatePath('/admin/properties'); revalidatePath('/properties'); revalidatePath('/')
  return values.length
}
