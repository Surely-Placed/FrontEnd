/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'surelyplaced.com' }],
        destination: 'https://www.surelyplaced.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
