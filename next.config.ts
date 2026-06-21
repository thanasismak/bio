import type { NextConfig } from 'next'

// DEPLOY_TARGET=github  → GitHub Pages  (basePath /bio, distDir docs/)
// DEPLOY_TARGET unset   → Cloudflare Pages (root, out/)
const isGitHub = process.env.DEPLOY_TARGET === 'github'

const nextConfig: NextConfig = {
  output: 'export',
  ...(isGitHub && {
    basePath: '/bio',
    distDir: 'docs',
  }),
  // Expose to client so assetUrl() can prefix paths on GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHub ? '/bio' : '',
  },
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
