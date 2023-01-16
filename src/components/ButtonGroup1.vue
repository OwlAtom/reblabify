<script setup>
import { ref, onBeforeMount } from "vue";
import ButtonGroup3 from "./ButtonGroup3.vue";
import RoundButtons from "./RoundButtons.vue";
import { useEventsStore } from "../stores/events";
import { useUsersStore } from "../stores/users";

import { useRouter } from "vue-router";
import eventChat from "./eventChat.vue";
import EventLocation from "./EventLocation.vue";
import UserByline from "./UserByline.vue";
import EventDateTime from "./EventDateTime.vue";
import EventDescription from "./EventDescription.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const eventsStore = useEventsStore();

const user = useUsersStore().users.self;

const eventID = router.currentRoute.value.params.id;
let event = eventsStore.findEventById(eventID);
onBeforeMount(() => {
  eventsStore.getEventById(eventID).then((currentEvent) => {
    event = currentEvent;
    // todo, fix at view ikke opdateres når event er loaded
  });
});

const confirm = useConfirm();
const toast = useToast();

const confirmDelete = (event) => {
  confirm.require({
    message: "Er du sikker på du vil slette begivenheden?",
    header: "Slet begivenhed",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Slet",
    rejectLabel: "Fortryd",
    accept: () => {
      router.push({ name: "Home" });
      eventsStore.deleteEvent(event);
      toast.add({ severity: "success", summary: "Slettet", detail: "Begivenheden blev slettet", life: 4000 });
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "Sletning annuleret",
        detail: "Du har annuleret sletning af begivenheden",
        life: 4000,
      });
    },
  });
};

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
function editEvent() {
  router.push({ name: "EditEvent", params: { id: eventID } });
}
</script>

<template>
  <!-- todo: v-if på host id -->
  <div v-if="event.host === user.uid">
    <DefaultButton icon="pi pi-pencil" class="mr-2 edit-btn" @click="editEvent"></DefaultButton>
    <DefaultButton icon="pi pi-trash" class="mr-2 delete-btn" @click="confirmDelete(event.id)"></DefaultButton>
    <ToastMsg position="bottom-center" />
    <ConfirmDialog class="confirmationBox"></ConfirmDialog>
  </div>

  <div class="add-cover">
    <!-- <p>Skal laves om til coverbilledet</p> -->
  </div>
  <div class="wrapper overlay">
    <div class="add-icon-circle">
      <span class="icon">{{ event.icon }}</span>
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
          <div class="event-details">
            <div>
              <h1>{{ event.title }}</h1>
              <EventDateTime :date="event.startDate" :start-time="event.startTime" :end-time="event.endTime" />
              <EventLocation :event-location="event.location" />
              <RoundButtons :event-id="eventID" />
            </div>
            <div>
              <h3>Vært(er)</h3>
              <UserByline :user-id="event.host" />
              <EventDescription :description="event.description" />
              <h3>Tilkendegivelser</h3>

              <!-- <div>
                <input ref="inviteFriendInput" placeholder="Invite some friends" />
                <button @click="inviteFriend">Invite</button>
              </div> -->
              <ButtonGroup3 :event="event" />
            </div>
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
.edit-btn {
  background: $middle-wave;
  position: absolute;
  top: 1.25rem;
  right: 5.25rem;
}
.delete-btn {
  background: $notification;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}
.p-button.delete-btn:enabled:hover {
  background: $notification;
}
.p-button.edit-btn:enabled:hover {
  background: $middle-wave;
}

// tabview styles i _theme.scss

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
  position: relative;
  min-height: calc(100vh - 11em);

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
