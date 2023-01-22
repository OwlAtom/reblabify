import { initializeApp } from "firebase/app";
import { onBackgroundMessage, getMessaging } from "firebase/messaging/sw";
import firebaseConfig from "./firebase-config.json";

try {
  const firebaseApp = initializeApp(firebaseConfig);
  console.info("Firebase messaging service worker is set up");

  const messaging = getMessaging(firebaseApp, {
    serviceWorkerRegistration: self.registration,
  });

  onBackgroundMessage(messaging, (payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // firebase automatically displays the notification, so we don't need to do anything here
  });
} catch (error) {
  console.log("firebase-messaging-sw.js error: ", error);
}
