/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Fail the build when TypeScript errors are present. CI should run `npx tsc --noEmit`.
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
