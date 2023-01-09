<script setup>
const defineProps = defineProps({
  description: String,
});
</script>

<template>
  <div>
    <h3>Beskrivelse</h3>
    <p>{{ description }}</p>
  </div>
</template>
