/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'ts'],
  async rewrites() {
    return [
      { source: '/me/:path*', destination: '/api/mockServer/me/:path*' },
      { source: '/artist/:path*', destination: '/api/mockServer/artist/:path*' },
    ];
  },
  env: {
    BE_BASE_URL: process.env.BE_BASE_URL,
  },
};
