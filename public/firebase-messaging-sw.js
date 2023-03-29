// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDkVb-WwbKtM0qPWIJkIag4Xt2WZsfpGVw",
  authDomain: "shouldi-3db33.firebaseapp.com",
  projectId: "shouldi-3db33",
  storageBucket: "shouldi-3db33.appspot.com",
  messagingSenderId: "1001532927236",
  appId: "1:1001532927236:web:c378b41cf063cb21543451",
});

const messaging = firebase.messaging();

// const body = {
//   body: payload.notification.body
// }

// messaging.onBackgroundMessage(payload => {
//   console.log(payload)
//   // self.registration.showNotification(payload.notification.title, body)
// })
