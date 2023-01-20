<script setup>
import { useRouter } from "vue-router";
import { useChatStore } from "../stores/chat";
import { ref, onBeforeUnmount } from "vue";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useTokenStore } from "../stores/token";

const router = useRouter();
const eventID = router.currentRoute.value.params.id;
const chatStore = useChatStore();
const tokenStore = useTokenStore();
const messaging = getMessaging();

//
getToken(messaging, {
  vapidKey: "BKD6Xa0d7F0quqxu64icwiK9QKwrFn5R2qP3V9T1wvDCiB-SCkN6_IBqB_02yLWoyfW8c9iq3-jcrpKAjE2UFMc",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("Got FCM token:", currentToken);
      tokenStore.updateToken(currentToken);
    } else {
      // Show permission request.
      console.log("No registration token available. Request permission to generate one.");
      // ...
    }
  })
  .catch((err) => {
    console.error("An error occurred while retrieving token. ", err);
    // ...
  });

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

/*
Cloud Function:
import { firestore } from 'firebase/app';

exports.cleanupTokens = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
    const now = new Date();
    const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const tokensRef = firestore().collection("tokens");
    const query = tokensRef.where("timestamp", "<", cutoff);
    const tokens = await query.get();
    tokens.forEach(token => {
        token.ref.delete();
    });
});
*/

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}
requestPermission;

const messageContent = ref();
const sendMessage = () => {
  chatStore.sendMessage(messageContent.value.value, eventID);
  messageContent.value = "";
};

const messages = ref([]);

function snapshotHandler(snapshot) {
  chatStore.handleSnapshot(snapshot, eventID);
  messages.value = chatStore.getMessages(eventID);
}

const unsubscribe = chatStore.subscribeToChat(eventID, snapshotHandler);
onBeforeUnmount(() => {
  unsubscribe(); // needed to prevent memory leaks
});

// to notify the user of new messages when on other views, we need to detect the last message
// and compare it to the last message in the store
// const lastMessage = ref();
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
          <p class="message-content-sender chat-text">{{ message.sender }}</p>
          <p class="message-content-text">{{ message.message }}</p>
          <p class="timestamp">{{ message.posted }}</p>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input id="message" ref="messageContent" type="text" placeholder="Skriv en besked" @keyup.enter="sendMessage()" />
      <button class="box-shadow" @click="sendMessage()"><span class="material-icons-round"> send </span></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  // margin: 1rem;
  // padding: 1rem;
  // background: #fff;
  // border-radius: 0.25rem;
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
          background-color: $white;
          padding: 0.5rem;
          border-radius: 10px;
          width: fit-content;
        }
        .timestamp {
          font-size: 0.75rem;
          color: $primary;
        }
      }
    }
    .chat-message-self {
      flex-direction: row-reverse;

      img {
        margin-left: 0.5rem;
        margin-right: 0;
      }
      .chat-message-content {
        align-items: flex-end;
        .message-content-text {
          background-color: $bottom-wave;
        }
      }
    }
  }
  .chat-input {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    // input {
    //   width: 100%;
    //   padding: 0.5rem;
    //   border: 1px solid #ccc;
    //   border-radius: 0.25rem;
    // }
    button {
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      background-color: $secondary;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: $primary;
        font-size: 2rem;
      }
    }
  }
}

input,
textarea {
  width: 100%;
  min-height: 2.5em;
  border: none;
  border-bottom: 2px solid gray;
  border-radius: 4px;
  background-color: rgba(white, 0.5);
  box-shadow: 0 2px 4px $box-shadow;
}
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-bottom: 2px solid $secondary;
  background-color: $white;
  box-shadow: 0 2px 4px rgba($secondary-active, 0.8);
}
</style>
