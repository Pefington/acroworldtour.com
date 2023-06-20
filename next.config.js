/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'hatscripts.github.io',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['api.acroworldtour.com', 'civlcomps.org', 'hatscripts.github.io'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
