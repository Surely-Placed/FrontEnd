/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.razorpay.com https://www.googletagmanager.com https://connect.facebook.net; img-src 'self' data: blob: https://www.facebook.com https://*.facebook.com; connect-src 'self' https://www.facebook.com https://*.facebook.com https://connect.facebook.net; frame-src 'self' https://*.razorpay.com https://www.youtube.com;",
          },
        ],
      },
    ];
  },
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
