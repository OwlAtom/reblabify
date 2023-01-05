<script setup>
defineProps({
  startTime: String,
  endTime: String,
});
</script>

<template>
  <div class="flex align-items-center column-gap-1">
    <span class="pi pi-clock"></span>
    <p class="p-smallest">{{ startTime }} - {{ endTime }}</p>
  </div>
</template>

<style lang="scss" scoped>
.pi .pi-clock {
  font-size: 20px;
}
p {
  margin: 5px 0;
}
</style>
