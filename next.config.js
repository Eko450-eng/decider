/** @type {import('next').NextConfig} */

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public'
})


module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["images.clerk.dev", "www.gravatar.com", "gravatar.com"]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["pg", "pg-native"],
    enableUndici: true
  }
})
