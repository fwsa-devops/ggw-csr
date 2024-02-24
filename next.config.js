/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
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
