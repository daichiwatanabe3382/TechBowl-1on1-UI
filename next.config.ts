import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techbowl.s3.ap-northeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "techbowl.s3-ap-northeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "techbowl-production.s3.ap-northeast-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "techbowl-production.s3-ap-northeast-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
