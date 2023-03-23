/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    relay: {
      src: "./src",
      artifactDirectory: "./src/__generated__/relay",
      language: "typescript",
    },
  },
}

module.exports = nextConfig
