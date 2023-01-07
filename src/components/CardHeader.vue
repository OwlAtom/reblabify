<script>
export default {
  props: { title: String, icon: String },
};
</script>

<template>
  <div class="flex flex-grow-0 align-items-center column-gap-1">
    <span v-if="icon" class="material-icons">{{ icon }}</span>
    <h3 class="flex-grow-0 my-0">{{ title }}</h3>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 1.5em;
}
</style>
