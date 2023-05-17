/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: false,
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
<<<<<<< HEAD
    domains: ["images.clerk.dev", "www.gravatar.com", "gravatar.com"],
=======
    domains: ["images.clerk.dev"],
>>>>>>> main
  },
  experimental: {
    serverActions: true,
  },
});
