import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

// docs/ is committed to main and served by GitHub Pages ("Deploy from a
// branch" -> main /docs). Only `next build` should write there, with the
// /bio basePath GitHub Pages needs. `next dev` must never touch docs/, so
// it keeps the default .next cache and serves at plain localhost:3000/.
const nextConfig = (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  return {
    output: 'export',
    ...(isDev ? {} : {
      basePath: '/bio',
      distDir: 'docs',
      env: { NEXT_PUBLIC_BASE_PATH: '/bio' },
    }),
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
  }
}

export default nextConfig
