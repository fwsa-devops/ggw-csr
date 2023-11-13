/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iili.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // serverActions: true,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
