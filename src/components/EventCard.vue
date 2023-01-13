<script setup>
import EventDateLabel from "./EventDateLabel.vue";
import EventDeclarations from "./EventDeclarations.vue";
import CardHeader from "./CardHeader.vue";
import EventTime from "./EventTime.vue";
import EventLocation from "./EventLocation.vue";
// import RoundButtons from "./RoundButtons.vue";
import UserByline from "./UserByline.vue";
import { useUsersStore } from "../stores/users";
const usersStore = useUsersStore();

const props = defineProps({
  event: { type: Object, required: true },
});

/*
event: {
    "invited": [
        "1IWv49gQz6fO3IgIdCbC",
    ],
    "endDate": "2023-01-01",
    "description": "Vi fejrer det nye år med et brag af en fest!",
    "title": "Nyårsfesten 2023",
    "location": "København",
    "startDate": "2022-12-31",
    "endTime": "04:00",
    "startTime": "20:00",
    "id": "AagMVmNThhJ9QjmDaD2H"
    todo: icon
    todo: invited, accepted, declined, maybe
}
*/
const host = usersStore.getUserById(props.event.host);
</script>

<template>
  <router-link :to="{ name: 'EventInfo', params: { id: event.id } }">
    <div class="card">
      <EventDateLabel :date="event.startDate" />

      <div class="content">
        <UserByline :user="host" />
        <CardHeader :event-title="event.title" :icon="event.icon" />
        <EventTime :start-time="event.startTime" :end-time="event.endTime" />
        <EventLocation v-if="event.location" :event-location="event.location" />
        <EventDeclarations :declarations="0" :invited-total="event?.invited?.length" />
      </div>
      <!-- <div class="buttons">
        <RoundButtons :event-id="event.id" />
      </div> -->
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: $cards;
  // width: 350px;
  // height: 154px;
  border-radius: 1em;
  padding: 0.3em;

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .buttons {
    display: flex;
  }
}
</style>
