/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      'api.acroworldtour.com',
      'civlcomps.org',
      'hatscripts.github.io',
      'img.youtube.com',
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
