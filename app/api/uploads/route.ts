import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])

function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  if (!accountId || !accessKeyId || !secretAccessKey) throw new Error('Cloudflare R2 is not configured')
  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  })
}

export async function GET(request: Request) {
  try {
    const key = new URL(request.url).searchParams.get('key')
    if (!key || !key.startsWith('properties/')) return NextResponse.json({ error: 'Invalid image key' }, { status: 400 })

    const bucket = process.env.R2_BUCKET_NAME
    if (!bucket) return NextResponse.json({ error: 'Cloudflare R2 bucket is not configured' }, { status: 500 })

    const result = await getR2Client().send(new GetObjectCommand({ Bucket: bucket, Key: key }))
    if (!result.Body) return new NextResponse('Not found', { status: 404 })

    const extension = key.split('.').pop()?.toLowerCase()
    const contentTypeByExtension: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      avif: 'image/avif',
    }

    return new NextResponse(result.Body.transformToWebStream(), {
      status: 200,
      headers: {
        'Content-Type': result.ContentType || contentTypeByExtension[extension ?? ''] || 'application/octet-stream',
        'Content-Length': result.ContentLength?.toString() ?? '',
        'Content-Disposition': 'inline',
        'Cache-Control': result.CacheControl ?? 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        ETag: result.ETag ?? '',
      },
    })
  } catch (error) {
    console.error('[v0] R2 image delivery failed:', error)
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await request.formData()
    const files = formData.getAll('files').filter((value): value is File => value instanceof File)
    if (!files.length) return NextResponse.json({ error: 'No images selected' }, { status: 400 })
    if (files.length > 12) return NextResponse.json({ error: 'You can upload up to 12 images at once' }, { status: 400 })

    const bucket = process.env.R2_BUCKET_NAME
    if (!bucket) throw new Error('Cloudflare R2 bucket is not configured')

    const client = getR2Client()
    const urls: string[] = []
    for (const file of files) {
      if (!ALLOWED_TYPES.has(file.type)) throw new Error(`${file.name} is not a supported image type`)
      if (file.size > MAX_FILE_SIZE) throw new Error(`${file.name} exceeds the 10 MB limit`)
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const key = `properties/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
        CacheControl: 'public, max-age=31536000, immutable',
      }))
      urls.push(`/api/uploads?key=${encodeURIComponent(key)}`)
    }
    return NextResponse.json({ urls })
  } catch (error) {
    console.error('[v0] R2 upload failed:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 })
  }
}
