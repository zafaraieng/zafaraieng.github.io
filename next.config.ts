import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files; it cannot run the Next.js Node server.
  output: "export",
  // Emit /readings/index.html so GitHub Pages serves the route cleanly.
  trailingSlash: true,
  // GitHub Pages has no Next.js image-optimization server.
  images: {
    unoptimized: true,
  },
  // Keep this enabled only if the project has known type issues that block
  // deployment; ideally remove it after running `bun run typecheck`.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
