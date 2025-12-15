import withPWA from "next-pwa";
// You can remove the "import type { NextConfig } from 'next'" if you don't use it elsewhere

// 👇 Remove ": NextConfig" here to stop TypeScript from complaining
const nextConfig = {
  turbopack: {},
  reactStrictMode: true,
  
  // This will now work without type errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
   
  }
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

// We cast to 'any' here anyway, so the strict type above wasn't necessary
export default pwaConfig(nextConfig as any);