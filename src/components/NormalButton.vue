<script setup>
const props = defineProps({
  text: String,
  IconBefore: String,
  IconAfter: String,
});
</script>

<template>
  <button ref="theButton" class="btn">
    <span v-if="IconBefore" class="material-icons">{{ IconBefore }}</span>
    {{ text }}
    <span v-if="IconAfter" class="material-icons">{{ IconAfter }}</span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem 1rem;
  border-radius: 0.5em;
  width: 100%;

  font-family: "Maven Pro", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 31px;

  background-color: $secondary;
  &.outlined {
    background-color: transparent;
    border: 2px solid $secondary;
    color: $secondary;
  }
}
.material-icons {
  font-size: 1.5em;
}
</style>
