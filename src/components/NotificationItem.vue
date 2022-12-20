<script setup>
defineProps({
  text: String,
  type: String,
});
</script>

<template>
  <div class="notification box-shadow">
    <div class="flex align-items-center">
      <p class="notification-type flex">
        <span v-if="type == 'new-invite'" class="green-check material-icons-sharp"> check_circle </span>
        <span v-if="type == 'accepted-invite'" class="yellow-star material-icons"> star </span>
        <span v-if="type == 'cancellation'" class="red-cross material-icons"> cancel </span>
        <span v-if="type == 'important'" class="blue-exclamation material-icons"> error </span>
      </p>
      <p class="chat-text">{{ text }}</p>
    </div>

    <span class="material-icons-round"> arrow_forward_ios </span>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1em;
  background-color: $white;
  padding: 0.8em 0.6em;
  width: 100%;
  user-select: none;
  cursor: pointer;

  p {
    margin: 0;
  }
  .notification-type span {
    font-size: 30px;
    margin-right: 10px;

    &.green-check {
      color: $accepted-invite;
    }
    &.yellow-star {
      color: $new-invite;
    }
    &.red-cross {
      color: $cancelled;
    }
    &.blue-exclamation {
      color: $important;
    }
  }
}
</style>
