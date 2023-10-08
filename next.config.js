/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_HOST: process.env.HOST,
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
