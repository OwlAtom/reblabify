<script setup>
import { ref } from "vue";
const defineProps = defineProps({
  description: String,
});

const readMore = ref(false);
</script>

<template>
  <div>
    <h3>Beskrivelse</h3>
    <div :class="{ readLess: readMore == true }" class="description truncate-overflow">
      <p>{{ description }}</p>
    </div>
    <div v-if="readMore == true" class="read-more">
      <a @click="readMore = !readMore">Read More</a>
    </div>
    <div v-else class="read-less">
      <a @click="readMore = !readMore">Read Less</a>
    </div>
  </div>
</template>

<style scoped>
.description {
  --max-lines: 3;
  position: relative;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  padding-right: 1rem; /* space for ellipsis */
}

.readMore {
  --max-lines: var(--max-lines);
}
</style>
