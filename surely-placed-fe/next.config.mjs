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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.razorpay.com https://www.googletagmanager.com https://connect.facebook.net https://*.facebook.net; img-src 'self' data: blob: https: http:; connect-src 'self' https://www.facebook.com https://*.facebook.com https://connect.facebook.net https://*.facebook.net https://*.razorpay.com https://checkout.razorpay.com https://www.googletagmanager.com; frame-src 'self' https://*.razorpay.com https://www.youtube.com https://www.facebook.com https://*.facebook.com;",
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
