<script setup>
import DefaultHeader from "../components/DefaultHeader.vue";
import RecentChatMessage from "../components/RecentChatMessage.vue";
import BackButton from "../components/BackButton.vue";
</script>

<template>
  <DefaultHeader />
  <BackButton />
  <section class="wrapper">
    <RecentChatMessage />
  </section>
</template>

<style lang="scss" scoped></style>
