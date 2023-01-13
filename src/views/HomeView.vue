<script setup>
import FrontpageHeader from "../components/FrontpageHeader.vue";
import { useEventsStore } from "../stores/events";
import { useUsersStore } from "../stores/users";

import { ref, onBeforeMount } from "vue";
import EventCard from "../components/EventCard.vue";
const eventsStore = useEventsStore();

const events = ref(eventsStore.events);
onBeforeMount(() => {
  eventsStore.getUsersOwnEvents();
  eventsStore.getInvitedEvents();
  events.value = eventsStore.events;
});
// function fetchEvents() {
//   eventsStore.getInvitedEvents();
// }

const user = useUsersStore().users.self;
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
  </section>
  <div class="slider-container">
    <div v-for="event in events" :key="event.id" class="my-events-container">
      <div v-if="event.host !== user.uid" class="event-details">
        <EventCard :event="event" />
      </div>
    </div>
  </div>
  <section class="wrapper">
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
  </section>

  <div class="slider-container">
    <div v-for="event in events" :key="event.id" class="my-events-container">
      <div v-if="event.host === user.uid" class="event-details">
        <EventCard :event="event" />
      </div>
    </div>
  </div>

  <!-- <h2>Grupper</h2>
    <div class="groups-display-container"></div> -->
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

.slider-container {
  padding-left: 1.25rem;
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  // gap: 1.2em;
  overflow-y: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  .event-details {
    width: 20em;
    margin-right: 0.5em;
  }
}
.slider-container::-webkit-scrollbar {
  display: none;
}
</style>
