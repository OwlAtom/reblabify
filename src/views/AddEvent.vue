<script setup>
import { ref } from "vue";

import InviteIllustration from "../assets/illustrations/invite.svg";
import friendsIllustration from "../assets/illustrations/friendship.svg";
import { useEventsStore } from "../stores/events.js";
import DescriptionChips from "../components/DescriptionChips.vue";

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
// function test() {
//   eventStore.getEventsByUserId("HtqmhWclvxdoQX4KUnBc2AEfRNJ3").then(() => {
//     console.log(eventStore.returnFutureEvents());
//   });
// }

let showPopup = ref(false);
</script>
<template>
  <div class="add-cover">
    <span class="material-icons-round"> add </span>
    <p>Tilføj coverbillede/tema</p>
  </div>
  <div v-if="!showPopup" class="wrapper overlay">
    <div class="add-icon-circle">
      <span class="material-icons-round"> add </span>
      <p>Tilføj ikon</p>
    </div>
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
      <label for="title">Begivenhedsnavn</label>
      <input v-model="formData.title" type="text" placeholder="Titel" name="title" />

      <div class="set-time">
        <label for="startDate">
          Start dato
          <input v-model="formData.startDate" type="date" name="startDate" />
        </label>

        <label for="startTime">
          Start tidspunkt
          <input v-model="formData.startTime" type="time" name="startTime" />
        </label>
      </div>

      <div class="set-time">
        <label for="endDate">
          Slut dato
          <input v-model="formData.endDate" type="date" name="endDate" />
        </label>

        <label for="endDate">
          Slut tidspunkt
          <input v-model="formData.endTime" type="time" name="endTime" />
        </label>
      </div>

      <label for="description">Beskrivelse</label>
      <textarea v-model="formData.description" placeholder="Beskrivelse" name="description" rows="3"></textarea>

      <label for="loaction">Lokation</label>
      <input v-model="formData.location" type="text" placeholder="Lokation" name="location" />
      <!-- todo: 'normalButton'? + places i bunden derefter -->
      <button type="submit" @click="handleSubmit">Opret</button>
    </form>

    <p style="font-weight: 600; font-size: 18px; text-align: center">Tilføj flere detaljer</p>
    <div class="flex flex-wrap gap-2">
      <DescriptionChips text="Lokation" emoji="📍" class="added-chip" />
      <DescriptionChips text="Dresscode" emoji="👔" />
      <DescriptionChips text="Medorganisator" emoji="🤝" />
      <DescriptionChips text="Privathed" emoji="🔒" />
      <DescriptionChips text="Svar senest" emoji="🚩" />
    </div>

    <div class="invite-cards">
      <div class="invite-card" @click="showPopup = !showPopup">
        <h3>Invitér venner</h3>
        <InviteIllustration />
        <!-- <a href="https://storyset.com/email">Email illustrations by Storyset</a> -->
      </div>

      <div class="invite-card">
        <h3>Invitér gruppe</h3>
        <friendsIllustration />
        <!-- <a href="https://storyset.com/people">People illustrations by Storyset</a> -->
      </div>
    </div>
  </div>

  <div v-if="showPopup" class="invite-popup wrapper overlay">
    <span class="material-icons-round close-btn" @click="showPopup = !showPopup"> highlight_off </span>
    <h1>Tilføj venner</h1>
    <form @submit.prevent="submitForm">
      <label for="people">Søg</label>
      <input ref="inviteFriendInput" name="people" />

      <!-- todo: 'normalButton'? + places i bunden derefter -->
      <button @click="inviteFriend">Opret</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.add-cover {
  height: 11em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    margin: 0;
  }
}
.overlay {
  background-color: $overlay;
  border-radius: 40px;
  padding-top: 4em;
  padding-bottom: 4em;
  backdrop-filter: blur(10px);
  position: absolute;
  top: 11em;
  z-index: 10;

  .add-icon-circle {
    width: 7em;
    height: 7em;
    background-color: $white;
    border-radius: 50%;
    position: absolute;
    top: -3em;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      margin: 0;
    }
  }
}
.material-icons-round {
  font-size: 28px;
}

input,
textarea {
  width: 100%;
  min-height: 2.5em;
  border: none;
  border-bottom: 2px solid gray;
  border-radius: 4px;
  background-color: rgba(white, 0.5);
  box-shadow: 0 2px 4px $box-shadow;
  margin-bottom: 10px;
}
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-bottom: 2px solid $secondary;
  background-color: $white;
  box-shadow: 0 2px 4px rgba($secondary-active, 0.8);
}

.set-time {
  display: flex;
  gap: 15px;

  label {
    flex-basis: 50%;
  }
}
.added-chip {
  background-color: $secondary-active;
}
.invite-cards {
  display: flex;
  gap: 15px;
  padding: 2em 0;

  .invite-card {
    background-color: rgba(white, 0.5);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 50%;
    box-shadow: 0 2px 4px $box-shadow;

    h3 {
      margin-bottom: 0;
    }

    svg {
      width: 80%;
    }
  }
}

.invite-popup {
  width: 100%;
  height: calc(100% - 11em);

  .close-btn {
    font-size: 40px;
    position: absolute;
    top: 0;
    right: 0;
    margin: 1.25rem;
  }
}
</style>
