import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@nimbus/catalog"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Resolve shared package from monorepo
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
