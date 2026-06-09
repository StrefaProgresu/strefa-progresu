/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dzięki temu pliki PDF z katalogu /content trafią do funkcji serverless na Vercel
  // i będą mogły być serwowane przez chronioną trasę /api/download.
  outputFileTracingIncludes: {
    "/api/download": ["./content/**/*"],
  },
};

module.exports = nextConfig;
