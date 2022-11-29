<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navigation from "./components/Navigation.vue";
import { useNameStore } from "./stores/name";

const store = useNameStore();
</script>

<template>
  Hello {{ store.fullName }}!
  <router-view></router-view>
  <Navigation />
  <div class="nameStoreTest" style="margin: 30px">
    <div>Indtast dit navn:</div>
    <br />
    first:
    <input type="text" v-model="store.name.first" />
    <br />
    last:
    <input type="text" v-model="store.name.last" />
  </div>
</template>

<style scoped></style>
