/** @type {import('next').NextConfig} */
const nextConfig = {
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
