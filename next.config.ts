import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

// docs/ is committed to main and served by GitHub Pages ("Deploy from a
// branch" -> main /docs). Only a local `next build` should write there,
// with the /bio basePath GitHub Pages needs. `next dev` must never touch
// docs/, so it keeps the default .next cache and serves at plain
// localhost:3000/. Cloudflare Pages injects CF_PAGES=1 into its own
// builds automatically, so we detect that and output to the default
// out/ folder at the domain root instead - same command, right output
// for whichever platform is actually running it.
const nextConfig = (phase: string): NextConfig => {
  const isDev       = phase === PHASE_DEVELOPMENT_SERVER
  const isCloudflare = !!process.env.CF_PAGES

  return {
    output: 'export',
    ...(isDev || isCloudflare ? {} : {
      basePath: '/bio',
      distDir: 'docs',
      env: { NEXT_PUBLIC_BASE_PATH: '/bio' },
    }),
    images: { unoptimized: true },
    eslint: { ignoreDuringBuilds: true },
  }
}

export default nextConfig
