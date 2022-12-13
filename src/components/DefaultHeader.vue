<script setup></script>

<template>
  <div class="heading-wrapper">
    <div class="default-heading">
      <h1>{{ $route.meta.heading }}</h1>
    </div>
    <div class="svg-container">
      <svg fill="none" viewBox="0 0 390 25" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 19 V0 H390 V19 C195 -1 195 39 0 19Z" fill="#1B4755" />
      </svg>
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
