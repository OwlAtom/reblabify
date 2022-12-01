<script setup>
import NormalButton from "./NormalButtonn.vue";
import { useclickStore } from "../stores/click";

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
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <NormalButton
    class="outlined_"
    text="Login"
    IconBefore="chevron_left"
    IconAfter="chevron_right"
  />

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
