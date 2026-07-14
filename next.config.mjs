import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project. Without this, Next.js walks up and
  // finds an unrelated package-lock.json in the home directory and infers the
  // wrong root (which breaks `next lint` and prints a warning).
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  images: {
    unoptimized: true,
  },
}

export default nextConfig
