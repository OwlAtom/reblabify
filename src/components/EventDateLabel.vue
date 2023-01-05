<script setup>
const props = defineProps({
  date: String,
});
const month = new Date(props.date).toLocaleString("default", { month: "short" });
const dayOfMonth = new Date(props.date).getDate();
</script>

<template>
  <div class="flex align-items-center justify-content-center flex-column div">
    <h3 class="m-0">{{ month }}</h3>
    <h1 class="m-0">{{ dayOfMonth }}</h1>
  </div>
</template>

<style lang="scss" scoped>
div {
  background-color: $secondary;
  width: 57px;
  border-radius: 0.7em;
  h3 {
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  h1 {
    font-weight: 700;
  }
  p {
    margin: 5px 0;
  }
}
</style>
