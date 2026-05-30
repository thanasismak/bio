import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export only for production builds (Cloudflare Pages).
  // next dev does not support output:'export' — omit it in development.
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
