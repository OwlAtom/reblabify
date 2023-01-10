<script setup>
import { ref, onBeforeMount } from "vue";
import ButtonGroup3 from "./ButtonGroup3.vue";
import RoundButtons from "./RoundButtons.vue";
import { useEventsStore } from "../stores/events";
import { useRouter } from "vue-router";
import eventChat from "./eventChat.vue";
import EventLocation from "./EventLocation.vue";
import UserByline from "./UserByline.vue";
import EventDateTime from "./EventDateTime.vue";
import EventDescription from "./EventDescription.vue";

const router = useRouter();
const eventsStore = useEventsStore();

const eventID = router.currentRoute.value.params.id;
let event = eventsStore.findEventById(eventID);
onBeforeMount(() => {
  eventsStore.getEventById(eventID).then((currentEvent) => {
    event = currentEvent;
    // todo, fix at view ikke opdateres når event er loaded
  });
});
const activeTab = ref(0);
// const inviteFriendInput = ref(null);

// function inviteFriend() {
//   const friendEmail = inviteFriendInput.value.value;
//   // Check that the input is a valid email address (null is not a valid email)
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(friendEmail)) {
//     console.log("invalid email");
//     return;
//   }

//   // If we've gotten this far, we have a valid email, so invite the friend
//   eventsStore.inviteFriendByEmail(eventID, friendEmail);
// }
</script>

<template>
  <div class="add-cover">
    <p>Skal laves om til coverbilledet</p>
  </div>
  <div class="wrapper overlay">
    <div class="add-icon-circle">
      <span class="icon">✨</span>
    </div>
    <div class="tabview-custom">
      <div class="button-group">
        <div class="button-group-item" :class="[activeTab === 0 ? 'active' : '']" @click="activeTab = 0">
          <p>Detaljer</p>
        </div>
        <div class="button-group-item" :class="[activeTab === 1 ? 'active' : '']" @click="activeTab = 1">
          <p>Chat</p>
        </div>
      </div>

      <TabView v-model:activeIndex="activeTab">
        <TabPanel>
          <div>
            <h1>{{ event.title }}</h1>
            <EventDateTime :date="event.startDate" :start-time="event.startTime" :end-time="event.endTime" />
            <EventLocation :event-location="event.location" />
            <RoundButtons page="event-page" />
          </div>
          <HorizontalDivider type="dashed" />
          <div>
            <h3>Vært(er)</h3>
            <UserByline :user="host" />
            <EventDescription :description="event.description" />
            <h3>Tilkendegivelser</h3>

            <!-- <div class="event-details">
            <p>{{ event.title }}</p>
            <p>{{ event.description }}</p>
            <p>{{ event.date }}</p>
            <p>{{ event.time }}</p>
            <p>{{ event.location }}</p>
            <h1>hej</h1>
            <div>
              <input ref="inviteFriendInput" placeholder="Invite some friends" />
              <button @click="inviteFriend">Invite</button>
            </div> -->
            <ButtonGroup3 />
            <!-- </div> -->
          </div>
        </TabPanel>
        <TabPanel>
          <eventChat />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  .button-group-item {
    width: 50%;
  }
}

// tabview styles i _theme.scss

.add-cover {
  height: 11em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.overlay {
  background-color: $overlay;
  border-radius: 40px;
  padding-top: 4em;
  padding-bottom: 4em;
  backdrop-filter: blur(10px);
  position: relative;
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

    .icon {
      font-size: 3.9em;
    }

    p {
      margin: 0;
    }
  }
}
.material-icons-round {
  font-size: 28px;
}
</style>
