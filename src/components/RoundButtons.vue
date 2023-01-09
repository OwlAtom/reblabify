<script setup>
import { ref, watch, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useEventsStore } from "../stores/events";

const eventsStore = useEventsStore();

const router = useRouter();
const path = router.currentRoute.value.path;

const picked = ref();

const props = defineProps({
  eventId: String,
});
// get event id from props or router.currentRoute.value.params.id;
const eventId = props.eventId || router.currentRoute.value.params.id;

onBeforeMount(() => {
  // set picked to the current status
  picked.value = eventsStore.getAttendanceStatus(eventId);

  // watch to see if picked changes
  watch(
    () => picked.value,
    (newValue) => {
      console.log("picked changed to", newValue);
      console.log("eventId", eventId);
      eventsStore.changeAttendanceStatus(eventId, newValue);
    }
  );
});
</script>

<template>
  <div v-if="!path.includes('/home')" :class="path.includes('/event-info/') ? 'horisontal' : 'vertical'">
    <input id="accepted" v-model="picked" type="radio" value="accepted" />
    <label for="accepted" class="accepted-btn">
      <i class="pi pi-check-circle"></i>
    </label>

    <input id="maybe" v-model="picked" type="radio" value="maybe" />
    <label for="maybe" class="maybe-btn">
      <i class="pi pi-question-circle"></i>
    </label>

    <input id="declined" v-model="picked" type="radio" value="declined" />
    <label for="declined" class="declined-btn">
      <i class="pi pi-times-circle"></i>
    </label>
  </div>
</template>

<style lang="scss" scoped>
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none; //evt. tjekke for browser kompatibilitet
  display: none;
}
label {
  border-radius: 50%;
  background-color: $white;
  display: flex;
  width: fit-content;
  transition: 0.3s;
}
.pi {
  color: $primary;
}
.horisontal {
  display: flex;
  justify-content: center;

  label {
    margin: 1em 1.4em;
    padding: 13px;

    .pi {
      font-size: 24px;
    }
  }
}
.vertical {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    padding: 10px;

    .pi {
      font-size: 18px;
    }
  }
}

input[type="radio"]:checked + label {
  box-shadow: 0 2px 4px $box-shadow;

  &.accepted-btn {
    background-color: $coming;
  }
  &.maybe-btn {
    background-color: $maybe;
  }
  &.declined-btn {
    background-color: $not-coming;
  }
}
</style>
