import { getDatabase, ref as FirebaseRef, get, onValue, push } from "firebase/database";
import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import { useUsersStore } from "../stores/users";
import { ref as vueRef } from "vue";
import { defineStore } from "pinia";

export const useChatStore = defineStore(
  "chat",
  () => {
    const chats = vueRef({});
    const db = getDatabase();
    const usersStore = useUsersStore();
    const user = usersStore.users.self;

    function sendMessage(messageContent, eventID) {
      const chatRef = FirebaseRef(db, `chats/${eventID}/chat`);

      const newMessage = {
        sender: user.displayName,
        message: messageContent,
        posted: new Date().toISOString(),
        photoURL: user.photoURL,
        uid: user.uid,
      };

      push(chatRef, newMessage).catch((error) => {
        console.error(error);
        // hvordan laver vi toast efter beskeden er sendt/har en fejl?
      });
    }

    function fetchMessages(eventID) {
      const chatRef = FirebaseRef(db, `chats/${eventID}/chat`);

      get(chatRef)
        .then((snapshot) => {
          handleSnapshot(snapshot, eventID);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function handleSnapshot(snapshot, eventID) {
      const data = snapshot.val();
      if (data) {
        const values = Object.values(data);
        values.forEach((message) => {
          message.posted = new Date(message.posted).toLocaleString(undefined, {
            weekday: "short",
            // year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });

          if (message.uid === user.uid) {
            message.isOwnMessage = true;
          }
        });
        // add the new messages
        chats.value[eventID] = [...values];
      }
    }

    function subscribeToChat(eventID, callback) {
      const chatRef = FirebaseRef(db, `chats/${eventID}/chat`);
      // returns an unsubscribe function
      return onValue(chatRef, callback);
    }
    function getMessages(eventID) {
      // if undefined, fetchMessages will be called
      if (!chats.value[eventID]) {
        fetchMessages(eventID);
        chats.value[eventID] = [];
      }
      // returns a ref to the messages
      return chats.value[eventID];
    }
    return {
      chats,
      sendMessage,
      fetchMessages,
      subscribeToChat,
      getMessages,
      handleSnapshot,
    };
  },
  {
    persist: {
      serializer: {
        serialize: (state) => {
          return compressToUTF16(JSON.stringify(state));
        },
        deserialize: (state) => {
          return JSON.parse(decompressFromUTF16(state));
        },
      },
    },
  }
);
