/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { 
    unoptimized: true,
    domains: ['s3.eu-west-2.amazonaws.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ensure API routes work in static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
