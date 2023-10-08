/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_DEV: process.env.DEV_HOST,
    APP_PROD: process.env.PROD_HOST,
    APP_MODE: process.env.DEV_MODE,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://chatappbacknewv2.adaptable.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
