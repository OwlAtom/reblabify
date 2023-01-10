<script setup>
import { ref } from "vue";

const activetab = ref(0);
</script>

<template>
  <div class="tabview-custom">
    <div class="button-group">
      <div class="button-group-item" :class="[activetab === 0 ? 'active' : '']" @click="activetab = 0">
        <p class="p-smallest">Kommer</p>
        <!-- <div>{{ event?.accepted?.length }}</div> -->
        <div class="declaration-badge p-smallest">8</div>
      </div>
      <div class="button-group-item" :class="[activetab === 1 ? 'active' : '']" @click="activetab = 1">
        <p class="p-smallest">Måske</p>
        <div class="declaration-badge p-smallest">7</div>
      </div>
      <div class="button-group-item" :class="[activetab === 2 ? 'active' : '']" @click="activetab = 2">
        <p class="p-smallest">Afvist</p>
        <div class="declaration-badge p-smallest">28</div>
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

    p {
      margin-right: 2px;
    }
  }
}

.declaration-badge {
  // min-width: fit-content;
  position: absolute;
  right: 3px;
  min-width: 20px;
  height: 20px;
  padding: 2.5px;
  border-radius: $border-radius4;
  background-color: $cards;
  display: flex;
  align-items: center;
  justify-content: center;
}

// tabview styles i _theme.scss/shared
</style>
