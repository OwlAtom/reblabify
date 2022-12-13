<script setup>
import { useclickStore } from "../stores/click";

const store = useclickStore();

defineProps({
  msg: String,
});
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card wrapper">
    <button type="button" @click="store.increment()">count is <span v-html="store.clicks"></span></button>

    <p class="px-6">heyo</p>
  </div>

  <normalButton class="outlined" text="Login" icon-before="chevron_left" icon-after="chevron_right" />
</template>

<style lang="scss" scoped>
.p-smallest {
  color: $disabled;
}
</style>
