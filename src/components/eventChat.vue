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
