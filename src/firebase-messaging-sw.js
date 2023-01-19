import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import firebaseConfig from "./firebase-config.json";

const firebaseApp = initializeApp(firebaseConfig);
console.info("Firebase messaging service worker is set up");
// If we don't include a point to inject the manifest the plugin will fail.
// Using just a variable will not work because it is tree-shaked, we need to make it part of a side effect to prevent it from being removed
console.log(self.__WB_MANIFEST);

const messaging = getMessaging(firebaseApp);
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
