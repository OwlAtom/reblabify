<script>
// import { ref } from "vue";

export default {
  data() {
    return {
      declaration: "",
    };
  },
};

// setup() {
//   const declaration = ref();

// return { declaration };
</script>

<template>
  <div>
    <RadioButton v-model="declaration" name="declaration" value="Attending" />
    <RadioButton v-model="declaration" name="declaration" value="Maybe Attending" />
    <RadioButton v-model="declaration" name="declaration" value="Not Attending" />
  </div>
</template>

<style lang="scss" scoped>
.green {
  background-color: yellow;
}
</style>
