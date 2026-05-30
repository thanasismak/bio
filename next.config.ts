import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for production — outputs to docs/ so GitHub Pages can serve it directly.
  // next dev does not support output:'export' — omitted in development.
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'docs',
  }),
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
