import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://woo-dev-log.github.io/turtlelist/"
      : "",
};

export default nextConfig;
