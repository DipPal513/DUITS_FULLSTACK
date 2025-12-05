
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler:{
    removeConsole:process.env.NODE_ENV==="production",
  }
};

const pwaConfig= withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});


export default pwaConfig(nextConfig as any);
