/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ⭐ 핵심
  images: {
    unoptimized: true, // GitHub Pages 필수
  },
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
