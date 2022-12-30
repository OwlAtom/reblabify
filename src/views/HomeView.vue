<script setup>
import FrontpageHeader from "../components/FrontpageHeader.vue";
import { useEventsStore } from "../stores/events";
import { onBeforeMount } from "vue";
const eventsStore = useEventsStore();

let events = [...eventsStore.events];
onBeforeMount(() => {
  eventsStore.getUsersOwnEvents();
});
function fetchEvents() {
  eventsStore.getInvitedEvents();
}
</script>

<template>
  <FrontpageHeader />

  <section class="wrapper">
    <div class="flex justify-content-between align-items-center">
      <h2>Kommende begivenheder</h2>
      <div class="see-more-link">
        <!-- send data med der fortæller hvilken sorteringen der skal være -->
        <router-link :to="{ name: 'AllEvents' }">
          <p>Se alle</p>
          <i class="pi pi-chevron-right"></i>
        </router-link>
      </div>
    </div>
    <div class="upcoming-events-container"></div>

    <div class="flex justify-content-between align-items-center">
      <h2>Mine begivenheder</h2>
      <div class="see-more-link">
        <!-- send data med der fortæller hvilken sorteringen der skal være -->
        <router-link :to="{ name: 'AllEventsMine' }">
          <p>Se alle</p>
          <i class="pi pi-chevron-right"></i>
        </router-link>
      </div>
    </div>
    <button @click="fetchEvents">Fetch events that im invited to</button>
    <div v-for="event in events" :key="event.id" class="my-events-container">
      <div class="event-details">
        <p>{{ event.title }}</p>
        <p>{{ event.id }}</p>
        <router-link :to="{ name: 'EventInfo', params: { id: event.id } }">
          <p>Se mere</p>
        </router-link>
      </div>
    </div>

    <h2>Grupper</h2>
    <div class="groups-display-container"></div>
  </section>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.see-more-link {
  a {
    text-decoration: none;
    display: flex;
    align-items: center;

    p {
      font-size: 12px;
    }
  }
}
</style>
