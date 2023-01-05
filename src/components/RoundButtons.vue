<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// defineProps({
//   page: String,
// });

const router = useRouter();
const path = router.currentRoute.value.path;

console.log(path);

const picked = ref();
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

    <input id="rejected" v-model="picked" type="radio" value="rejected" />
    <label for="rejected" class="rejected-btn">
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
  &.rejected-btn {
    background-color: $not-coming;
  }
}
</style>
