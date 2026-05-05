const EXTERNAL_BASE = (import.meta.env.VITE_ASSETS_URL as string) ?? ''

export function assetUrl(path: string): string {
  if (EXTERNAL_BASE) {
    return `${EXTERNAL_BASE}${path}`
  }
  // Locally, Vite serves public/ files under BASE_URL (e.g. /bio/hero.jpeg)
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

