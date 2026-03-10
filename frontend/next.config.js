/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't fail build on ESLint warnings
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:5000'],
    },
  },
};

module.exports = nextConfig;
