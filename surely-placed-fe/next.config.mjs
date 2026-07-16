const PAYMENTS_FLY_ORIGIN =
  process.env.PAYMENTS_FLY_ORIGIN || 'https://surelyplaced-payments.fly.dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.razorpay.com https://www.googletagmanager.com https://connect.facebook.net https://*.facebook.net https://accounts.google.com",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' http://localhost:8080 https://localhost:8080 https://surelyplaced-payments.fly.dev https://www.facebook.com https://*.facebook.com https://connect.facebook.net https://*.facebook.net https://*.razorpay.com https://checkout.razorpay.com https://www.googletagmanager.com https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com",
              "frame-src 'self' https://*.razorpay.com https://www.youtube.com https://www.facebook.com https://*.facebook.com https://accounts.google.com",
            ].join('; ') + ';',
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
  // Proxy same-origin /api/* (payments, webinars, admin, webhooks) to Fly backend
  async rewrites() {
    return [
      {
        source: '/api/payments/:path*',
        destination: `${PAYMENTS_FLY_ORIGIN}/api/payments/:path*`,
      },
      {
        source: '/api/webinars/:path*',
        destination: `${PAYMENTS_FLY_ORIGIN}/api/webinars/:path*`,
      },
      {
        source: '/api/admin/:path*',
        destination: `${PAYMENTS_FLY_ORIGIN}/api/admin/:path*`,
      },
      {
        source: '/api/webhooks/:path*',
        destination: `${PAYMENTS_FLY_ORIGIN}/api/webhooks/:path*`,
      },
    ];
  },
};

export default nextConfig;
