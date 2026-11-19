import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  experimental: {
    viewTransition: true,
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion', 'gsap'],
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png|webp|avif|otf|woff2|mp4)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
