<script setup>
import FrontpageHeader from "../components/FrontpageHeader.vue";
import { useEventsStore } from "../stores/events";
import { onBeforeMount } from "vue";
import EventCard from "../components/EventCard.vue";
const eventsStore = useEventsStore();

let events = [...eventsStore.events];
onBeforeMount(() => {
  eventsStore.getUsersOwnEvents();
});
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
    <!-- todo: v-if ejer er lig brugeren der er logget ind -->
    <div v-for="event in events" :key="event.id" class="my-events-container">
      <router-link :to="{ name: 'EventInfo', params: { id: event.id } }">
        <div class="event-details">
          <p>{{ event.id }}</p>
          <EventCard :event="event" />
        </div>
      </router-link>
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
