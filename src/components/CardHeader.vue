<script>
export default {
  props: { title: String, icon: String },
};
</script>

<template>
  <div
    class="flex flex-initial flex-row align-items-center justify-content-center column-gap-1"
  >
    <div class="material-icons" v-if="icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
}
</style>
