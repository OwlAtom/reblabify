<template>
  <div>
    <div class="field-radiobutton">
      <RadioButton v-model="declaration" input-id="declaration1" name="declaration" value="Attending" />
      <label for="event1">Chicago</label>
    </div>
    <div class="field-radiobutton">
      <RadioButton v-model="declaration" input-id="declaration2" name="declaration" value="Maybe attending" />
      <label for="event2">Los Angeles</label>
    </div>
    <div class="field-radiobutton">
      <RadioButton
        v-model="declaration"
        input-id="declaration3"
        input-class="custom"
        name="declaration"
        value="Not attending" />
      <label for="event3">New York</label>
    </div>

    <!-- <h5>Dynamic Values, Preselection, Value Binding and Disabled Option</h5>
    <div v-for="category of categories" :key="category.key" class="field-radiobutton">
      <RadioButton
        v-model="selectedCategory"
        :input-id="category.key"
        name="category"
        :value="category.name"
        :disabled="category.key === 'R'" />
      <label :for="category.key">{{ category.name }}</label>
    </div> -->
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const declaration = ref();
    const categories = ref([
      { name: "Accounting", key: "A" },
      { name: "Marketing", key: "M" },
      { name: "Production", key: "P" },
      { name: "Research", key: "R" },
    ]);
    const selectedCategory = ref(categories.value[1].name);

    return { declaration, categories, selectedCategory };
  },
};
</script>

<style lang="scss" scoped>
// .field-radiobutton {
//   width: 40px;
//   height: 40px;
// }
.custom {
  background: $secondary;
}

.p-radiobutton-box {
  background: $secondary;
}
</style>
