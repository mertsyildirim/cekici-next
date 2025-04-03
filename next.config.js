/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'export',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.externals.push({
      'leaflet': 'L',
      'leaflet-routing-machine': 'Routing'
    });
    return config;
  }
};

module.exports = nextConfig; 