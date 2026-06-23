import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/bio',
  distDir: 'docs',
  env: { NEXT_PUBLIC_BASE_PATH: '/bio' },
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
