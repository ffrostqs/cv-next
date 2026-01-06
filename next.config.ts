// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 генерує index.html
  images: {
    unoptimized: true, // 👈 обовʼязково для static
  },
};

export default nextConfig;
