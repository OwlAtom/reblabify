<script setup>
import { ref, onBeforeMount } from "vue";
import ButtonGroup3 from "./ButtonGroup3.vue";
import { useEventsStore } from "../stores/events";
import { useRouter } from "vue-router";
import eventChat from "./eventChat.vue";

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
const inviteFriendInput = ref(null);

function inviteFriend() {
  const friendEmail = inviteFriendInput.value.value;
  // Check that the input is a valid email address (null is not a valid email)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(friendEmail)) {
    console.log("invalid email");
    return;
  }

  // If we've gotten this far, we have a valid email, so invite the friend
  eventsStore.inviteFriendByEmail(eventID, friendEmail);
}
</script>

<template>
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
        <p>Begivenheds detaljer komponent her</p>
        <div class="event-details">
          <p>{{ event.title }}</p>
          <p>{{ event.description }}</p>
          <p>{{ event.date }}</p>
          <p>{{ event.time }}</p>
          <p>{{ event.location }}</p>
          <div>
            <input ref="inviteFriendInput" placeholder="Invite some friends" />
            <button @click="inviteFriend">Invite</button>
          </div>
          <ButtonGroup3 />
        </div>
      </TabPanel>
      <TabPanel>
        <eventChat />
      </TabPanel>
    </TabView>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  .button-group-item {
    width: 50%;
  }
}

// tabview styles i _theme.scss
</style>
