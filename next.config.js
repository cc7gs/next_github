/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath: '/home',
  async rewrites() {
    return [
      {
        source: '/about-us',
        destination: '/about',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/team',
        destination: '/about',
        permanent: false,
      },
    ];
  },
};
