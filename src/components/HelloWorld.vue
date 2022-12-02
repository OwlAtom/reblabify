<script setup>
import { useclickStore } from "../stores/click";
import NormalButtonVue from "./NormalButton.vue";

const store = useclickStore();

defineProps({
  msg: String,
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="store.increment()">
      count is <span v-html="store.clicks"></span>
    </button>

    <p class="p-smallest">heyo</p>
  </div>
  <normalButton
    class="outlined_"
    text="Login"
    IconBefore="chevron_left"
    IconAfter="chevron_right"
  />
</template>

<style lang="scss" scoped>
.p-smallest {
  color: $disabled;
}
</style>
