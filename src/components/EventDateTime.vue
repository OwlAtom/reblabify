<script setup>
const props = defineProps({
  date: String,
  startTime: String,
  endTime: String,
});
const month = new Date(props.date).toLocaleString("default", { month: "long" });
const dayOfMonth = new Date(props.date).getDate();
</script>

<template>
  <div class="flex align-items-center column-gap-1">
    <span class="pi pi-clock"></span>

    <p class="p-smallest">{{ dayOfMonth }}</p>
    <p class="p-smallest">{{ month }} |</p>

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
