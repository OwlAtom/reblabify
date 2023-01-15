<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navigation from "./components/MainNavigation.vue";
</script>

<template>
  <router-view></router-view>
  <Navigation v-if="$route.path !== '/add-event'" />
</template>

<style lang="scss" scoped></style>
