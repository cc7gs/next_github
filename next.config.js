/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const getBasePath = () => {
  if (isProd) {
    const basicPath = process.env.BASE_PATH;
    return basicPath.startsWith('/') ? basicPath : `/${basicPath}`;
  }
  return '';
};

module.exports = {
  reactStrictMode: true,
  basePath: getBasePath(),
  assetPrefix: getBasePath(),
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
