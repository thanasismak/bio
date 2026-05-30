const EXTERNAL_BASE = process.env.NEXT_PUBLIC_ASSETS_URL ?? ''

export function assetUrl(path: string): string {
  return EXTERNAL_BASE ? `${EXTERNAL_BASE}${path}` : path
}
