<script setup>
// todo: Create store
// mock data:
let eventName = "Nytårsaften";
let messageSender = "Navn";
let newMessage = "Lorem ipsum dolor sit amet consectetur adipisicing.";
let timeSinceLastMessage = "Nu";

//todo: check if there is unread messages
let unread = true;
</script>

<template>
  <div class="recent-chat box-shadow flex justify-content-between align-items-center">
    <div class="chat-card-icon"></div>
    <div class="recent-chat-text">
      <div class="flex justify-content-between align-items-center">
        <h3>{{ eventName }}</h3>
        <!-- todo: dynamisk finde ud af hvornår sidste besked blev sendt -->
        <p v-if="newMessage" class="p-smallest">{{ timeSinceLastMessage }}</p>
      </div>
      <p v-if="newMessage" class="chat-text">{{ messageSender }}: {{ newMessage }}</p>
    </div>
    <div class="chat-status" :class="[unread == true ? 'unread-message' : '']"></div>
    <div v-if="!newMessage" class="inactive-chat-overlay"></div>
  </div>
</template>

<style lang="scss">
.recent-chat {
  position: relative;
  background-color: $cards;
  border-radius: 1em;
  padding: 0.3em;

  .chat-card-icon {
    width: 17%;
    height: 0; //Styling med height 0 og padding-bottom=width sikre at højden er det samme som bredden og virker derfor responsivt
    padding-bottom: 17%;
    background-color: $white;
    border-radius: 0.7em;
  }

  .recent-chat-text {
    width: 75%;
  }

  h3 {
    margin: 0;
  }
  p {
    margin: 0;
  }

  .chat-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat-status {
    width: 3%;
    height: 0;
    padding-bottom: calc(17% - (2 * 0.6em));
    border-radius: $border-radius8;

    &.unread-message {
      background-color: $active;
    }
  }
}

.inactive-chat-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $disabled;
  border-radius: 1em;
}
</style>
