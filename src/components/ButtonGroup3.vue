<script setup>
import { ref } from "vue";

const activetab = ref(0);
</script>

<template>
  <div class="tabview-custom">
    <div class="button-group">
      <div class="button-group-item" :class="[activetab === 0 ? 'active' : '']" @click="activetab = 0">
        <p>Kommer</p>
      </div>
      <div class="button-group-item" :class="[activetab === 1 ? 'active' : '']" @click="activetab = 1">
        <p>Måske</p>
      </div>
      <div class="button-group-item" :class="[activetab === 2 ? 'active' : '']" @click="activetab = 2">
        <p>Afvist</p>
      </div>
    </div>

    <TabView v-model:activeIndex="activetab">
      <TabPanel>
        <p>Liste over personer, filtreret på svar (kommer)</p>
      </TabPanel>
      <TabPanel>
        <p>Liste over personer, filtreret på svar (måske)</p>
      </TabPanel>
      <TabPanel>
        <p>Liste over personer, filtreret på svar (afvist)</p>
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

// tabview styles i _theme.scss/shared
</style>
