/** @type {import('next').NextConfig} */
const nextConfig = {
  /*React.StrictMode: true causes components to render twice
  in development mode to help detect potential issues in the code.*/
  reactStrictMode: false,
  compiler: {
    relay: {
      src: './src',
      artifactDirectory: './src/__generated__/relay',
      language: 'typescript',
    },
  },
}

module.exports = nextConfig
