<script setup>
import { useRouter } from "vue-router";
import { useChatStore } from "../stores/chat";
import { ref, onBeforeUnmount } from "vue";

const router = useRouter();
const eventID = router.currentRoute.value.params.id;
const chatStore = useChatStore();

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
      <input id="message" ref="messageContent" type="text" placeholder="Skriv en besked" @keyup.enter="sendMessage()" />
      <button @click="sendMessage()">Send</button>
    </div>
  </div>
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
