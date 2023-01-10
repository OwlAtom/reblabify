<script setup>
import { ref } from "vue";
const defineProps = defineProps({
  description: String,
});

const showMore = ref(false);
</script>

<template>
  <div>
    <h3>Beskrivelse</h3>
    <div class="flex flex-column align-items-center">
      <div class="description">
        <p :class="{ fade: !showMore }">{{ description }}</p>
      </div>
      <span :class="{ btnTextMore: showMore }" class="btnText" @click="showMore = !showMore"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  overflow: hidden;

  p {
    margin: 0;

    &.fade {
      position: relative;
      height: 4.5rem; /* exactly three lines */
    }

    &.fade::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2rem;
      background: linear-gradient(rgba(255, 255, 255, 0), rgb(207 228 234) 100%);
    }
  }
}

// .btnText {

// }
.btnText::after {
  content: "Vis mere";
}
.btnTextMore::after {
  content: "Vis mindre";
}
</style>
