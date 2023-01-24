import { initializeApp } from "firebase/app";
import { onBackgroundMessage, getMessaging } from "firebase/messaging/sw";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import firebaseConfig from "./firebase-config.json";
const useEmulators = false;

try {
  if (useEmulators) {
    firebaseConfig.databaseURL = "http://localhost:9000/?ns=reblabify";
  }

  const firebaseApp = initializeApp(firebaseConfig);

  if (useEmulators) {
    const db = getFirestore(firebaseApp);
    connectFirestoreEmulator(db, "localhost", 8080);
  }

  const messaging = getMessaging(firebaseApp, {
    serviceWorkerRegistration: self.registration,
  });

  onBackgroundMessage(messaging, (payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // firebase automatically displays the notification, so we don't need to do anything here
  });

  console.info("Firebase messaging service worker is set up");
} catch (error) {
  console.log("firebase-messaging-sw.js error: ", error);
}
