<script setup>
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/users";
import { ref as vueRef } from "vue";
/* eslint-disable */
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  orderByKey,
  limitToLast,
  query,
  child,
  push,
  update,
} from "firebase/database";
/* eslint-enable */

const router = useRouter();
const eventID = router.currentRoute.value.params.id;

const db = getDatabase();
const chatRef = ref(db, `chats/${eventID}/chat`);

const usersStore = useUsersStore();
const user = usersStore.users.self;

const sendMessage = () => {
  const message = document.querySelector("#message").value;
  if (message) {
    const newMessage = {
      sender: user.displayName,
      message: message,
      posted: new Date().toISOString(),
      photoURL: user.photoURL,
    };
    push(chatRef, newMessage)
      .then(() => {
        document.querySelector("#message").value = "";
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

let messages = vueRef([]);

const handleSnapshot = (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const values = Object.values(data);
    values.forEach((message) => {
      message.posted = new Date(message.posted).toLocaleString();
      if (message.photoURL === user.photoURL) {
        message.isOwnMessage = true; // mark own messages
      }
    });
    // add the new messages
    messages.value = [...values];
  }
};
// listen for changes
onValue(chatRef, handleSnapshot);

// on first load, force get the messages
get(chatRef)
  .then((snapshot) => {
    handleSnapshot(snapshot);
  })
  .catch((error) => {
    console.error(error);
  });
</script>

<template>
  <div class="chat">
    <div class="chat-feed">
      <div
        v-for="message in messages"
        :key="message.sender"
        class="chat-message"
        :class="{ 'chat-message-self': message.isOwnMessage }">
        <img :src="message.photoURL" :alt="message.sender" />
        <div class="chat-message-content">
          <p class="message-content-sender">{{ message.sender }}</p>
          <p class="message-content-text">{{ message.message }}</p>
          <p class="timestamp">({{ message.posted }})</p>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input id="message" type="text" placeholder="Skriv en besked" @keyup.enter="sendMessage()" />
      <button @click="sendMessage()">Send</button>
    </div>
  </div>

  <div>Her er din chat for begivenhed {{ eventID }}</div>
  <div>og din bruger er {{ user.uid }}</div>
</template>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 0.25rem;
  .chat-feed {
    height: 100%;
    overflow-y: scroll;
    .chat-message {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1rem;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 0.5rem;
        align-self: center;
      }
      .chat-message-content {
        display: flex;
        flex-direction: column;
        height: min-content;
        p {
          margin: 0;
        }
        .message-content-sender {
          font-weight: bold;
        }
        .message-content-text {
          background-color: #ccc;
          padding: 0.5rem;
          border-radius: 0.25rem;
        }
        .timestamp {
          font-size: 0.75rem;
          color: #ccc;
        }
      }
    }
    .chat-message-self {
      flex-direction: row-reverse;
      .chat-message-content {
        align-items: flex-end;
        .message-content-text {
          background-color: #eee;
        }
      }
    }
  }
  .chat-input {
    display: flex;
    justify-content: space-between;
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
    }
    button {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      background-color: #ccc;
    }
  }
}
</style>
