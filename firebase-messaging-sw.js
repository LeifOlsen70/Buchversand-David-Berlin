self.addEventListener('notificationclick',event=>{
 event.stopImmediatePropagation();event.notification.close();
 const target=new URL('./?view=pending',self.registration.scope);
 event.waitUntil((async()=>{const windows=await clients.matchAll({type:'window',includeUncontrolled:true});for(const client of windows){const u=new URL(client.url);if(u.origin===target.origin&&u.pathname.startsWith(new URL(self.registration.scope).pathname)){await client.focus();client.postMessage({type:'OPEN_ORDERS'});return}}await clients.openWindow(target.href)})());
});
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(clients.claim()));
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
const firebaseConfig = {
  apiKey: "AIzaSyCeRAcJQFOfnwb6AT2jsV_oKHeCR3ea-jY",
  authDomain: "buchversand-david-berlin.firebaseapp.com",
  projectId: "buchversand-david-berlin",
  storageBucket: "buchversand-david-berlin.firebasestorage.app",
  messagingSenderId: "884821744179",
  appId: "1:884821744179:web:8f887511ecc3c617ec2146"
};

firebase.initializeApp(firebaseConfig);
firebase.messaging();
// Notification payloads are displayed automatically by FCM in the background.
