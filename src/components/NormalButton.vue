<script setup>
defineProps({
  text: String,
  iconBefore: String,
  iconAfter: String,
});
</script>

<template>
  <button ref="theButton" class="btn">
    <span v-if="iconBefore" class="material-icons">{{ iconBefore }}</span>
    {{ text }}
    <span v-if="iconAfter" class="material-icons">{{ iconAfter }}</span>
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
  // font-family: $headings;

  font-family: "Maven Pro", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;

  background-color: $secondary;
  border: none;
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
