import type { NextConfig } from 'next'

// Only set in CI for the GitHub Pages build (see .github/workflows/deploy-pages.yml).
// Local dev/build never sets this, so it never affects your machine.
const basePath = process.env.BASE_PATH || ''

const nextConfig: NextConfig = {
  output: 'export',
  ...(basePath ? { basePath, env: { NEXT_PUBLIC_BASE_PATH: basePath } } : {}),
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
