export function getPropertyImages(imageUrl?: string | null) {
  return (imageUrl ?? '')
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter((url) => url.startsWith('https://'))
}
