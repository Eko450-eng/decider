if(!self.define){let s,e={};const n=(n,t)=>(n=new URL(n+".js",t).href,e[n]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=e,document.head.appendChild(s)}else s=n,importScripts(n),e()})).then((()=>{let s=e[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(t,a)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let c={};const r=s=>n(s,i),o={module:{uri:i},exports:c,require:r};e[i]=Promise.all(t.map((s=>o[s]||r(s)))).then((s=>(a(...s),c)))}}define(["./workbox-7028bf80"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/O2NSsHdsM7zEsmxH5kRzG/_buildManifest.js",revision:"565fb829ecc8862e1efff3b8b8f70053"},{url:"/_next/static/O2NSsHdsM7zEsmxH5kRzG/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/111-e143b8f51b113361.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/116-a878870f70576017.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/154-d0066ea98b229751.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/186-b66964e318e84e12.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/317-5acfeb103d13934b.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/624-1ea4e9ac170fcc8d.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/674-5a2ed08938d288b8.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/710-0d0586769bc56aa6.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/764-6f9825d1437d4b4a.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/901-677855da762d948f.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/906-db571a9c7f5c10db.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/921-1029f3860140fe20.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/932-3de85903b34e12fa.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/979-157c5c7b171905f0.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/CreateQuestion/page-41ae88d374b7e223.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/PushNotification/page-7de4eb65acc3813f.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/Signin/page-c0c7d9449fd63aa8.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/Signup/page-4745276bda478e6a.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/layout-84788ce0fb321da4.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/loading-140672234f934c25.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/page-8658095c1ed2f890.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/question/%5Bid%5D/page-7b698aad3e13f77c.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/app/user-profile/page-23989ac17ebc0a0c.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/fab348c4-07646fc392b08837.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/main-6c2ddf32cd6dd853.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/main-app-03c495a4e3a8520d.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/pages/_app-a5dc4133d697b343.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/pages/_error-03b622d96379b101.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-109c6638d26e8b34.js",revision:"O2NSsHdsM7zEsmxH5kRzG"},{url:"/_next/static/css/454213c3eac43acc.css",revision:"454213c3eac43acc"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:s})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),s.registerRoute(/\/_next\/static.+\.js$/i,new s.CacheFirst({cacheName:"next-static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s,url:{pathname:e}})=>!!s&&!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:n})=>"1"===s.headers.get("RSC")&&n&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:{pathname:s},sameOrigin:e})=>e&&!s.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({sameOrigin:s})=>!s),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
