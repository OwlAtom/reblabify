<script setup>
defineProps({
  eventTitle: String,
  icon: String,
});
</script>

<template>
  <div class="flex flex-grow-0 align-items-center column-gap-1">
    <span v-if="icon" class="material-icons">{{ icon }}</span>
    <h3 class="flex-grow-0">{{ eventTitle }}</h3>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 1.5em;
}
h3 {
  margin: 5px 0;
}
</style>
