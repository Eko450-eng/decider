/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: false,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["images.clerk.dev", "www.gravatar.com", "gravatar.com"],
  },

  experimental: {
    serverComponentsExternalPackages: ["pg", "pg-native"],
    serverActions: true,
  },
});
