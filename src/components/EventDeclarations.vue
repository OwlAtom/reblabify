<script setup>
defineProps({
  declarations: Number,
  invitedTotal: Number,
});
</script>

<template>
  <div class="flex align-items-center column-gap-1">
    <span class="material-icons"> group </span>
    <p>{{ declarations }} af {{ invitedTotal }} tilkendegivelser</p>
  </div>
</template>
