<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

let activetab = ref(0);
const route = useRoute();

if (route.path == "/all-events/mine") {
  activetab = ref(2);
}
</script>

<template>
  <div class="tabview-custom">
    <div class="button-group">
      <div class="button-group-item" :class="[activetab === 0 ? 'active' : '']" @click="activetab = 0">
        <p>Kommende</p>
      </div>
      <div class="button-group-item" :class="[activetab === 1 ? 'active' : '']" @click="activetab = 1">
        <p>Afholdte</p>
      </div>
      <div class="button-group-item" :class="[activetab === 2 ? 'active' : '']" @click="activetab = 2">
        <p>Mine</p>
      </div>
    </div>

    <TabView v-model:activeIndex="activetab">
      <TabPanel>
        <p>Liste over event, filtreret på dato og ejerskab (kommende)</p>
      </TabPanel>
      <TabPanel>
        <p>Liste over event, filtreret på dato og ejerskab (afholdte)</p>
      </TabPanel>
      <TabPanel>
        <p>Liste over event, filtreret på dato og ejerskab (mine)</p>
      </TabPanel>
    </TabView>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  .button-group-item {
    width: 33%;
  }
}

// tabview styles i _theme.scss
</style>
