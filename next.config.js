/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['s3.eu-west-2.amazonaws.com']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
