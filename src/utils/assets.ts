const EXTERNAL_BASE = process.env.NEXT_PUBLIC_ASSETS_URL ?? ''
const BASE_PATH     = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function assetUrl(path: string): string {
  if (EXTERNAL_BASE) return `${EXTERNAL_BASE}${path}`
  return `${BASE_PATH}${path}`
}
