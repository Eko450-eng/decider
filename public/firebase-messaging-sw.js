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
