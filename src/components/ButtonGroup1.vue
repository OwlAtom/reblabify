<script setup>
import { ref } from "vue";

import ButtonGroup3 from "./ButtonGroup3.vue";

const activetab = ref(0);
</script>

<template>
  <div class="tabview-custom">
    <div class="button-group">
      <div class="button-group-item" :class="[activetab === 0 ? 'active' : '']" @click="activetab = 0">
        <p>Detaljer</p>
      </div>
      <div class="button-group-item" :class="[activetab === 1 ? 'active' : '']" @click="activetab = 1">
        <p>Chat</p>
      </div>
    </div>

    <TabView v-model:activeIndex="activetab">
      <TabPanel>
        <p>Begivenheds detaljer komponent her</p>
        <ButtonGroup3 />
      </TabPanel>
      <TabPanel>
        <p>Chat komponent</p>
      </TabPanel>
    </TabView>
  </div>
</template>

<style lang="scss" scoped>
.button-group {
  .button-group-item {
    width: 50%;
  }
}

// tabview styles i _theme.scss
</style>
