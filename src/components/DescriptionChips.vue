<script setup>
defineProps({
  text: String,
  emoji: String,
});
</script>

<template>
  <div class="chip">
    <p class="emoji">{{ emoji }}</p>
    <p>{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.chip {
  display: flex;
  align-items: center;
  border-radius: 1em;
  background-color: $white;
  padding: 0.6em;
  width: max-content;

  p {
    padding-right: 10px;
    font-size: 12px;
    margin: 0;

    &.emoji {
      font-size: 18px;
    }
  }
}
</style>
