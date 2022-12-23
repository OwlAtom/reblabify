<script setup>
import InviteIllustration from "../assets/illustrations/invite.svg";
import friendsIllustration from "../assets/illustrations/friendship.svg";
import welcomeIllustration from "../assets/illustrations/welcome.svg";
import { useEventsStore } from "../stores/events.js";
const eventStore = useEventsStore();

const formData = {
  title: "Nyårsfesten 2022",
  startDate: "2022-12-31",
  startTime: "20:00",
  endDate: "2023-01-01",
  endTime: "04:00",
  description: "Vi fejrer det nye år med et brag af en fest!",
  location: "København",
};
function handleSubmit(e) {
  e.preventDefault();
  try {
    validateFormData(formData);
    eventStore.addEvent(formData);
  } catch (errors) {
    console.error(errors);
    // todo: display errors to user
  }
}

function validateFormData(formData) {
  const errors = {};

  // check if required fields are present
  if (!formData.title) {
    errors.title = "Title is required";
  }
  if (!formData.startDate) {
    errors.startDate = "Start date is required";
  }
  if (!formData.startTime) {
    errors.startTime = "Start time is required";
  }
  if (!formData.location) {
    errors.location = "Location is required";
  }
  // we dont need to check the format because inputs
  // throw an error if there are any validation errors
  if (Object.keys(errors).length > 0) {
    throw errors;
  }
}
function test() {
  eventStore.getEventsByUserId("HtqmhWclvxdoQX4KUnBc2AEfRNJ3").then(() => {
    console.log(eventStore.returnFutureEvents());
  });
}
</script>
<template>
  <h1>Opret begivenhed</h1>
  <button @click="test">Test</button>
  <div v-for="event in eventStore.events" :key="event.id">
    {{ event.title }}
    {{ event.startDate }}
    {{ event.startTime }}
    {{ event.endDate }}
    {{ event.endTime }}
    {{ event.description }}
  </div>
  <form @submit.prevent="submitForm">
    <input v-model="formData.title" type="text" placeholder="Titel" />
    <input v-model="formData.startDate" type="date" />
    <input v-model="formData.startTime" type="time" />
    <input v-model="formData.endDate" type="date" />
    <input v-model="formData.endTime" type="time" />
    <textarea v-model="formData.description" placeholder="Beskrivelse"></textarea>
    <input v-model="formData.location" type="text" placeholder="Lokation" />
    <button type="submit" @click="handleSubmit">Opret</button>
  </form>

  <InviteIllustration />
  <a href="https://storyset.com/email">Email illustrations by Storyset</a>
  <friendsIllustration />
  <a href="https://storyset.com/people">People illustrations by Storyset</a>
  <welcomeIllustration />
  <a href="https://storyset.com/event">Event illustrations by Storyset</a>
</template>

<style lang="scss" scoped></style>
