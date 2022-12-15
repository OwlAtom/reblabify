<script setup>
defineProps({
  month: String,
  date: Number,
});
</script>

<template>
  <div class="flex align-items-center justify-content-center flex-column div">
    <h3 class="m-0">{{ month }}</h3>
    <h1 class="m-0">{{ date }}</h1>
  </div>
</template>

<style lang="scss" scoped>
div {
  background-color: $secondary;
  height: 89px;
  width: 57px;
  border-radius: 16px;
  h3 {
    font-size: 1rem;
    font-weight: 700;
  }
  h1 {
    font-weight: 700;
  }
}
</style>
