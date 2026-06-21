// CDN_BASE  — set NEXT_PUBLIC_ASSETS_URL to R2 public URL in production
// BASE_PATH — set automatically by next.config.ts for GitHub Pages (/bio)
const CDN_BASE  = (process.env.NEXT_PUBLIC_ASSETS_URL  ?? '').trim()
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH   ?? '').trim()

export function assetUrl(path: string): string {
  if (CDN_BASE) return `${CDN_BASE}${path}`
  return `${BASE_PATH}${path}`
}
