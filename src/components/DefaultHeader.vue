<script setup>
import headerWave from "../assets/headerWave.svg";
</script>

<template>
  <div class="heading-wrapper">
    <div class="default-heading">
      <h1>{{ $route.meta.title }}</h1>
    </div>
    <div class="svg-container">
      <headerWave />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.heading-wrapper {
  margin-bottom: 1em;

  .default-heading {
    background-color: rgb(27, 71, 85);
    padding: 3em 10px 10px 10px;
    text-align: center;

    h1 {
      margin-bottom: 0;
      color: $secondary-active;
    }
  }
  .svg-container {
    width: 100%;
    transform: translateY(-1px);

    svg {
      width: 100%;
    }
  }
}
</style>
