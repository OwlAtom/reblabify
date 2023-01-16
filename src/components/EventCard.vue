<script setup>
import EventDateLabel from "./EventDateLabel.vue";
import EventDeclarations from "./EventDeclarations.vue";
import CardHeader from "./CardHeader.vue";
import EventTime from "./EventTime.vue";
import EventLocation from "./EventLocation.vue";
// import RoundButtons from "./RoundButtons.vue";
import UserByline from "./UserByline.vue";
import { useUsersStore } from "../stores/users";
import { onBeforeMount, ref } from "vue";

const usersStore = useUsersStore();

const props = defineProps({
  event: { type: Object, required: true },
});

const host = ref(null);
const renderByline = ref(false);
onBeforeMount(async () => {
  host.value = await usersStore.getUserById(props.event.host).catch((error) => {
    console.error(error);
  });
  renderByline.value = true;
});

// const totalPeopleInvited =
//   props.event?.accepted?.length +
//   props.event?.mayby?.length +
//   props.event?.declined?.length +
//   props.event?.invited?.length;
</script>

<template>
  <router-link :to="{ name: 'EventInfo', params: { id: event.id } }">
    <div class="card">
      <EventDateLabel :date="event.startDate" />

      <div class="content">
        <UserByline v-if="renderByline" :user="host" />
        <CardHeader :event-title="event.title" :icon="event.icon" />
        <EventTime :start-time="event.startTime" :end-time="event.endTime" />
        <EventLocation v-if="event.location" :event-location="event.location" />
        <EventDeclarations :declarations="event?.accepted?.length" :invited-total="event?.invited?.length" />
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
