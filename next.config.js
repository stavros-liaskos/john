const path = require('path');

const IS_MOCK = true;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'ts'],
  async rewrites() {
    return [createRewritePath('/me/:path*'), createRewritePath('/artist/:path*')];
  },
  env: {
    BE_BASE_URL: process.env.BE_BASE_URL,
  },
  // https://github.com/vercel/next.js/tree/canary/examples/with-why-did-you-render
  webpack(config, { dev, isServer }) {
    if (dev && !isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const wdrPath = path.resolve(__dirname, './scripts/wdyr.js');
        const entries = await originalEntry();

        if (entries['main.js'] && !entries['main.js'].includes(wdrPath)) {
          entries['main.js'].push(wdrPath);
        }
        return entries;
      };
    }

    return config;
  },
};

function createRewritePath(path) {
  return { source: path, destination: `/api${IS_MOCK ? '/mockServer' : ''}${path}` };
}
