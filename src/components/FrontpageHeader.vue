<script setup>
import { ref } from 'vue';

import HeaderWave from "../assets/headerWave.svg"
import UserIcon from "../assets/icons/User.svg"
import NotificationBell from "../assets/icons/NotificationBell.svg"

import Dialog from 'primevue/dialog';

const displayModal = ref(false);
// const position = ref('center');
const openModal = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
}


let timeNow = new Date().getHours();
let greeting =
  timeNow >= 5 && timeNow < 12
    ? "Godmorgen"
    : timeNow >= 12 && timeNow < 18
    ? "God eftermiddag"
    : "God aften";

</script>

<template>
  <div class="heading-wrapper">
        <div  class="frontpage-heading wrapper">
            <div class="flex justify-content-between align-items-center">
                <h1>{{ greeting }},</h1>
                <div class="flex gap-4">
                    <div class="icon-wrapper" @click="openModal">
                        <NotificationBell v-bind:class="[ displayModal == true ? 'active' : '' ]"/>
                    </div>
                    <router-link :to="{ name: 'Chat' }" class="icon-wrapper"> <!--todo: create user store-->
                        <UserIcon />
                    </router-link>
                </div>
            </div>
            
            <div class="flex align-items-center">
                <div style="height:40px; width: 40px; border-radius:50%; background-color: #f3f3f3; margin-right: 10px;"></div> <!--todo: lave icon komponent-->
                <!-- todo: user store -->
                <p style="margin:0; color: #F9D6BC; font-size: 20px;">Navn Navnesen</p> 
            </div>
        </div>
        <div class="svg-container">
            <HeaderWave />
        </div>
    </div>

    <div class="notification-modal">
        <Dialog v-model:visible="displayModal" :modal="true" :dismissableMask="true" position="top" style="width:100%;border-radius: 40px; backdrop-filter: blur(10px);margin: 6em 0 0 0;">
            <template #header>
                <h3>Notifikationer</h3>
            </template>
            <p class="m-0">Notifikations komponent</p>
            <br>
            <p class="m-0">Notifikation komponent</p>
            <br>
            <p class="m-0">Notifikation komponent</p>

        </Dialog>
    </div>


</template>

<style lang="scss" scoped>
.heading-wrapper {
    margin-bottom: 1em;

    .frontpage-heading {
        background-color: rgb(27, 71, 85);
        padding-top: 3em;

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
