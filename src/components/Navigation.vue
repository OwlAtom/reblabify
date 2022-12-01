<script setup>
import HouseIcon from "../assets/icons/House.svg";
import PlusIcon from "../assets/icons/Plus.svg";
import ChatCircleDotsIcon from "../assets/icons/ChatCircleDots.svg";

const unreadMessages = true; // TODO: connect the notifications to this bool
</script>
<template>
  <nav v-bind:class="{ 'home-nav': $route.path == '/home' }">
    <router-link :to="{ name: 'Home' }">
      <HouseIcon />
    </router-link>
    <router-link :to="{ name: 'AddEvent' }" class="add-btn">
      <PlusIcon />
    </router-link>
    <router-link
      :to="{ name: 'Chat' }"
      v-bind:class="{ notification: unreadMessages }"
    >
      <div>
        <ChatCircleDotsIcon class="chat-btn" />
      </div>
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
$darkblue: #1b4755;
$lightTan: #f9d6bc;
$darkTan: #edb183;
$notificationRed: #be3334;

nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 65px;
  border-radius: 8px;
  background-color: $darkblue;
  margin-top: 48px;
  a {
    &.add-btn {
      width: 45px;
      height: 45px;
      background-color: $darkTan;
      border-radius: 100%;
      color: #0d232a;
      transition: all 0.4s ease-in-out;
      svg {
        transition: all 0.5s ease-in-out;
        stroke-width: 4;
        transform: scale(0.5);
      }
    }
    &.notification {
      position: relative;
      div::after {
        content: "";
        position: absolute;
        top: 4px;
        right: 4px;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background-color: $notificationRed;
        display: inline-block;
      }
    }
  }
  &.home-nav a.add-btn {
    transform: translate(0, -0.5em) scale(1.5);
    box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.251);
    svg {
      stroke-width: 3;
      transform: scale(0.8);
    }
  }
}
</style>
