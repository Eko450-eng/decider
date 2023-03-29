/** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
// }

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public'
})


module.exports = withPWA({
  env: {
    NEXT_PUBLIC_FIREBASE_APIKEY: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECTID: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    NEXT_PUBLIC_FIREBASE_SB: process.env.NEXT_PUBLIC_FIREBASE_SB,
    NEXT_PUBLIC_FIREBASE_MESSAGESENDERID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGESENDERID,
    NEXT_PUBLIC_FIREBASE_APPID: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    NEXT_PUBLIC_AUTHORIZATIONKEY: process.env.NEXT_PUBLIC_AUTHORIZATIONKEY,
  },
  reactStrictMode: true,
  images: {
    domains: ["documentinatordb.ddns.net", "shouldi.fly.dev", "localhost", "192.168.0.161", "pbdb.shouldi.online"]
  },
  experimental: {
    appDir: true,
    enableUndici: true
  }
})


// module.exports = nextConfig
