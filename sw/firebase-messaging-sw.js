import { initializeApp } from "firebase/app";
import { onBackgroundMessage, getMessaging } from "firebase/messaging/sw";
import firebaseConfig from "./firebase-config.json";

const firebaseApp = initializeApp(firebaseConfig);
console.info("Firebase messaging service worker is set up");

const messaging = getMessaging(firebaseApp, {
  vapidKey: "BKD6Xa0d7F0quqxu64icwiK9QKwrFn5R2qP3V9T1wvDCiB-SCkN6_IBqB_02yLWoyfW8c9iq3-jcrpKAjE2UFMc",
});
onBackgroundMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// https://stackoverflow.com/questions/73355783/proper-way-to-setup-firebase-messaging-service-worker-with-vite

/*
other links:
https://stackoverflow.com/questions/41144151/firebaseerror-we-are-unable-to-register-the-default-service-worker


https://firebase.google.com/docs/cloud-messaging/js/client?authuser=0#configure_web_credentials_in_your_app 

https://firebase.google.com/docs/cloud-messaging/js/receive?authuser=0#setting_notification_options_in_the_service_worker

https://firebase.google.com/docs/cloud-messaging/js/first-message?hl=en&authuser=0#send_a_test_notification_message

https://console.firebase.google.com/project/reblabify/notification/compose
*/
