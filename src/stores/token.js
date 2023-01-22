import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, where } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { useUsersStore } from "./users";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore(
  "token",
  () => {
    const db = getFirestore();

    const tokensRef = collection(db, "tokens");

    const token = ref(null);
    const unsubscribe = ref(null);

    function getUserId() {
      return useUsersStore().getUserId();
    }

    async function createToken(FCMToken) {
      // dont create token if it already exists
      const q = query(tokensRef, where("token", "==", FCMToken));

      await getDocs(q).then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          console.log("Token already exists");
          return;
        } else {
          console.log("Creating token");

          const tokenData = {
            token: FCMToken,
            user_ID: getUserId(),
            timestamp: serverTimestamp(),
            device: getDeviceName(),
            platform: getPlatformName(),
          };
          addDoc(tokensRef, tokenData)
            .then((docRef) => {
              console.log("Token written with ID: ", docRef.id);

              token.value = FCMToken;
            })
            .catch((error) => {
              console.error("Error adding token: ", error);
            });
        }
      });
    }

    function getDeviceName() {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "Tablet";
      }
      if (
        /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(
          ua
        )
      ) {
        return "Mobile";
      }
      return "Desktop";
    }

    function getPlatformName() {
      const ua = navigator.userAgent;
      // android, ios, windows, mac, linux, other
      if (/Android/i.test(ua)) {
        return "Android";
      }
      if (/iPhone|iPad|iPod/i.test(ua)) {
        return "iOS";
      }
      // check for desktop windows
      if (/Windows/i.test(ua)) {
        return "Windows";
      }
      if (/Macintosh/i.test(ua)) {
        return "Mac";
      }
      if (/Linux/i.test(ua)) {
        return "Linux";
      }
      return "Other";
    }
    // todo:  only initialize it after user is logged in / wants notifications
    async function initMessaging() {
      // dont init if already initialized
      if (unsubscribe.value) {
        console.log("Messaging already initialized!");
        return;
      }

      const messaging = getMessaging();

      const currentToken = await getToken(messaging, {
        vapidKey: "BKD6Xa0d7F0quqxu64icwiK9QKwrFn5R2qP3V9T1wvDCiB-SCkN6_IBqB_02yLWoyfW8c9iq3-jcrpKAjE2UFMc",
      }).catch((err) => {
        console.error("An error occurred while retrieving token. ", err);
      });

      if (currentToken) {
        //!! this token is updated VERY frequently, so the token we get here might look like the previous one, but it isn't. This was why we couldnt get firebase notifications to work, we were sending to the wrong "address"
        console.log("Got FCM token:", currentToken);
        createToken(currentToken);
      } else {
        // Show permission request.
        console.log("No registration token available. Request permission to generate one.");
        requestPermission();
        return;
      }

      console.log("Listening for messages");
      unsubscribe.value = onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
      });
    }

    function requestPermission() {
      // todo: see if we can check "site engagement score" before requesting permission (https://www.chromium.org/developers/design-documents/site-engagement/)
      // maybe just use this function to show a message to the user to enable notifications, and then they can click a button to enable them?
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          initMessaging();
        } else {
          console.error("Unable to get permission to notify.");
        }
      });
    }
    return {
      token,
      unsubscribe,
      createToken,
      initMessaging,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (state) => {
          return compressToUTF16(JSON.stringify(state));
        },
        deserialize: (state) => {
          delete state.unsubscribe;
          return JSON.parse(decompressFromUTF16(state));
        },
      },
    },
  }
);
