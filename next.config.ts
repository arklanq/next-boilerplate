import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: import.meta.dirname,
  turbopack: {
    root: import.meta.dirname
  }
};

export default nextConfig;
