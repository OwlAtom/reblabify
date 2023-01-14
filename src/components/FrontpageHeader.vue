<script setup>
import { ref } from "vue";

import HeaderWave from "../assets/headerWave.svg";
// import UserIcon from "../assets/icons/User.svg";
import NotificationBell from "../assets/icons/NotificationBell.svg";
import Dialog from "primevue/dialog";
import { useUsersStore } from "../stores/users";
import NotificationItem from "./NotificationItem.vue";

const user = useUsersStore().users.self;

const displayModal = ref(false);
// const position = ref('center');
const openModal = () => {
  displayModal.value = true;
};

let timeNow = new Date().getHours();
let greeting =
  timeNow >= 5 && timeNow < 12 ? "Godmorgen" : timeNow >= 12 && timeNow < 18 ? "God eftermiddag" : "Godaften";
</script>

<template>
  <div class="heading-wrapper">
    <div class="frontpage-heading wrapper">
      <div class="flex justify-content-between align-items-center">
        <h1>{{ greeting }},</h1>
        <div class="flex gap-4">
          <div class="icon-wrapper" @click="openModal">
            <NotificationBell :class="[displayModal == true ? 'active' : '']" />
          </div>
          <router-link :to="{ name: '' }" class="icon-wrapper">
            <span class="material-icons-round"> logout </span>
          </router-link>
        </div>
      </div>

      <div class="flex align-items-center">
        <!--todo: lave icon komponent der bruges istedet for nedenstående img-->
        <img :src="user.photoURL" :alt="'Profile Image for ' + user.displayName" class="profile-picture" />
        <p class="user-name-heading">{{ user.displayName }}</p>
      </div>
    </div>
    <div class="svg-container">
      <HeaderWave />
    </div>
  </div>

  <div class="notification-modal">
    <Dialog v-model:visible="displayModal" :modal="true" :dismissable-mask="true" position="top">
      <!--* ^ inline style for at det ikke overskrives ^-->
      <template #header>
        <h2>Notifikationer</h2>
      </template>
      <div class="flex flex-wrap gap-2">
        <NotificationItem text="Anna og 5 andre har accepteret din invitation" type="new-invite" />
        <NotificationItem text="Ny invitation: Allans fest" type="accepted-invite" />
        <NotificationItem text="'Allans fest' er blevet aflyst" type="cancellation" />
        <NotificationItem text="Bekræft email" type="important" />
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: $secondary-active;
}
.heading-wrapper {
  margin-bottom: 1em;

  .frontpage-heading {
    background-color: $tertiary;
    padding-top: 3em;
    .profile-picture {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-color: #f3f3f3;
      margin-right: 10px;
    }

    .user-name-heading {
      margin: 0;
      color: $secondary-active;
      font-size: 18px;
    }
  }
  .svg-container {
    width: 100%;

    svg {
      width: 100%;
    }
  }
}
.active {
  fill: $secondary-active;
}
</style>
