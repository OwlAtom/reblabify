import { getFirestore, collection, addDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { useUsersStore } from "./users";
import { defineStore } from "pinia";
import { ref } from "vue";

const db = getFirestore();

function tokenIsExpired(token) {
  // if there is no token, it is expired
  if (!token) {
    return true;
  }
  // check if token.id exists in db
  const docRef = doc(db, "tokens", token.id);
  getDoc(docRef).then((doc) => {
    if (doc.exists()) {
      return false;
    } else {
      return true;
    }
  });
}

export const useTokenStore = defineStore(
  "token",
  () => {
    const tokensCollection = collection(db, "tokens");

    const token = ref({});

    function getUserId() {
      return useUsersStore().getUserId();
    }

    function updateToken(FCMToken) {
      // delete token if expired
      if (tokenIsExpired(token.value)) {
        token.value = null;
      }
      // check if token already exists locally
      if (token.value?.token === FCMToken) {
        return;
      }

      const tokenData = {
        token: FCMToken,
        user_ID: getUserId(),
        timestamp: serverTimestamp(),
        // device: "device_name_here", (optional)
        // platform: "ios" or "android", (optional)
      };

      addDoc(tokensCollection, tokenData)
        .then((docRef) => {
          console.log("Token written with ID: ", docRef.id);

          const newToken = {
            id: docRef.id,
            ...tokenData,
          };
          // get the doc to read the timestamp
          getDoc(docRef).then((doc) => {
            if (doc.exists()) {
              newToken.timestamp = doc.data().timestamp;
              token.value = newToken;
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          });
        })
        .catch((error) => {
          console.error("Error adding token: ", error);
        });
    }

    function clearToken() {
      token.value.token = null;
    }
    return {
      token,
      clearToken,
      updateToken,
      tokenIsExpired,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (state) => {
          return compressToUTF16(JSON.stringify(state));
        },
        deserialize: (state) => {
          const data = JSON.parse(decompressFromUTF16(state));
          // check if timestamp is expired
          if (tokenIsExpired(data.token)) {
            data.token = null;
          }

          return data;
        },
      },
    },
  }
);
