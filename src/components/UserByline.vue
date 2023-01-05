<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="profile">
    <img :src="user?.photoURL" alt="Billede af begivenhedens vært" />
    {{ user?.displayName }}
  </div>
</template>

<style lang="scss" scoped>
.profile {
  img {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
}
</style>
