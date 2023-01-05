<script setup>
import EventDateLabel from "./EventDateLabel.vue";
import EventDeclarations from "./EventDeclarations.vue";
import CardHeader from "./CardHeader.vue";
</script>

<template>
  <div class="card">
    <EventDateLabel month="Jan" date="1" />

    <div class="content">
      <CardHeader title="Nytårsaften" icon="star" />
      <EventDeclarations declarations="13" invited-total="20" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: row;
  background-color: $cards;
  width: 350px;
  height: 154px;
  border-radius: 16px;

  .content {
    display: flex;
    flex-direction: column;
  }
}
</style>
