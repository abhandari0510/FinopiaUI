import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
};

export default nextConfig;
