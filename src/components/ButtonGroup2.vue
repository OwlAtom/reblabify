<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useEventsStore } from "../stores/events";
import { useUsersStore } from "../stores/users";
import EventCard from "../components/EventCard.vue";

const eventsStore = useEventsStore();

let events = [...eventsStore.events];
const user = useUsersStore().users.self;

let activetab = ref(0);
const route = useRoute();

if (route.path == "/all-events/mine") {
  activetab = ref(2);
}
</script>

<template>
  <div class="tabview-custom">
    <div class="button-group">
      <div class="button-group-item" :class="[activetab === 0 ? 'active' : '']" @click="activetab = 0">
        <p>Kommende</p>
      </div>
      <div class="button-group-item" :class="[activetab === 1 ? 'active' : '']" @click="activetab = 1">
        <p>Afholdte</p>
      </div>
      <div class="button-group-item" :class="[activetab === 2 ? 'active' : '']" @click="activetab = 2">
        <p>Mine</p>
      </div>
    </div>

    <TabView v-model:activeIndex="activetab">
      <TabPanel>
        <div v-for="event in events" :key="event.id" class="my-events-container">
          <div v-if="event.host !== user.uid" class="event-details">
            <EventCard :event="event" />
          </div>
        </div>
      </TabPanel>
      <TabPanel> </TabPanel>
      <TabPanel>
        <div v-for="event in events" :key="event.id" class="my-events-container">
          <div v-if="event.host === user.uid" class="event-details">
            <EventCard :event="event" />
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  .button-group-item {
    width: 33%;
  }
}
.my-events-container {
  margin-bottom: 0.5em;
}

// tabview styles i _theme.scss
</style>
