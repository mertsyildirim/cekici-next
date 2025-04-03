/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  images: {
    unoptimized: true
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig; 