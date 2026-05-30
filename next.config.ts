import type { NextConfig } from 'next'

// '/bio' for GitHub Pages (thanasismak.github.io/bio).
// Set to '' when deploying to Cloudflare Pages at root domain.
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/bio' : ''

const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'docs',
    basePath: BASE_PATH,
  }),
  // Expose basePath to client so assetUrl() can prefix image paths correctly
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
