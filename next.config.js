/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  distDir: '.next',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig; 