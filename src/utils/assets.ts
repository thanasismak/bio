const CDN_BASE  = (process.env.NEXT_PUBLIC_ASSETS_URL  ?? '').trim()
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim()

export function assetUrl(path: string): string {
  if (CDN_BASE) return `${CDN_BASE}${path}`
  return `${BASE_PATH}${path}`
}
