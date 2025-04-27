/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // New Next.js 15 features
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
