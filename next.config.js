/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'ts'],
  images: {
    domains: ['www.placecage.com'],
  },
  // async rewrites() {
  //   return [{ source: '/:path*', destination: '/api/server/:path*' }];
  // },
  env: {
    BE_BASE_URL: process.env.BE_BASE_URL,
  },
};
