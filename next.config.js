const path = require('path');

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'ts'],
  async rewrites() {
    return createRewritePaths([
      '/me/:path*',
      '/artist/:path*',
      '/artists/:path*',
      '/auth/:path*',
      '/raccoon-user:path*',
    ]);
  },
  env: {
    BE_BASE_URL: process.env.BE_BASE_URL,
  },
  // https://github.com/vercel/next.js/tree/canary/examples/with-why-did-you-render
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const wdrPath = path.resolve(__dirname, './src/scripts/wdyr.js');
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes(wdrPath)) {
          entries['main.js'].push(wdrPath);
        }
        return entries;
      };
    }

    return config;
  },
});

function createRewritePaths(paths) {
  return paths.map(path => ({ source: path, destination: `/api${path}` }));
}
