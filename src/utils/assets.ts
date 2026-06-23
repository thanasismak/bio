const CDN_BASE = (process.env.NEXT_PUBLIC_ASSETS_URL ?? '').trim()

export function assetUrl(path: string): string {
  if (CDN_BASE) return `${CDN_BASE}${path}`
  return path
}
