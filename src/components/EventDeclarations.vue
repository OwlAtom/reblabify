<script setup>
defineProps({
  declarations: Number,
  invitedTotal: Number,
});
</script>

<template>
  <div class="flex align-items-center column-gap-1">
    <span class="material-icons"> group </span>
    <p class="p-smallest">{{ declarations }} af {{ invitedTotal }} deltager</p>
  </div>
</template>

<style lang="scss" scoped>
.material-icons {
  font-size: 20px;
}
p {
  margin: 5px 0;
}
</style>
