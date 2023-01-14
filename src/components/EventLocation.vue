<script setup>
const props = defineProps({
  eventLocation: String,
});
const searchString = "https://www.google.com/maps/search/" + props.eventLocation;
</script>

<template>
  <div class="flex align-items-center column-gap-1">
    <span class="material-icons-outlined">place</span>

    <a :href="searchString" target="_blank" rel="noopener noreferrer">
      <p class="p-smallest">{{ eventLocation }}</p>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.material-icons-outlined {
  font-size: 20px;
}
p {
  margin: 5px 0;
}
</style>
