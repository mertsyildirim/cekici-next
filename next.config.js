/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['unpkg.com']
  }
};

module.exports = nextConfig; 