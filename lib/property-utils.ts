function normalizeImageUrl(value: string) {
  const url = value.trim()
  if (!url.startsWith('https://')) return null

  try {
    const parsed = new URL(url)
    const fileId = parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? parsed.searchParams.get('id')

    if (parsed.hostname === 'drive.google.com' && fileId) {
      return `https://drive.google.com/uc?export=view&id=${encodeURIComponent(fileId)}`
    }
  } catch {
    return null
  }

  return url
}

export function getPropertyImages(imageUrl?: string | null) {
  return (imageUrl ?? '')
    .split(/[\n,]+/)
    .map(normalizeImageUrl)
    .filter((url): url is string => Boolean(url))
}

export function formatIndianPrice(value: number) {
  const price = Number(value)
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(price % 10000000 === 0 ? 0 : 2)} Cr`
  if (price >= 100000) return `₹${(price / 100000).toFixed(price % 100000 === 0 ? 0 : 2)} Lac`
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
}
