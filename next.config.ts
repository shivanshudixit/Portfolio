import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
