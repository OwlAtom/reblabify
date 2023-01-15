<script setup>
import { useUsersStore } from "../stores/users";
import { useRouter } from "vue-router";

const usersStore = useUsersStore();
const router = useRouter();

function logOut() {
  usersStore.logOut();
  router.push("/login");
}
</script>

<template>
  <button @click="logOut">Logout</button>
</template>

<style scoped></style>
