import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {},
  async redirects() {
    return [
      { source: "/work", destination: "/deployments", permanent: true },
      { source: "/work/:slug", destination: "/deployments/:slug", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
