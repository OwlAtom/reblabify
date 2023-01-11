<script setup>
import { ref, onMounted } from "vue";
const defineProps = defineProps({
  description: String,
});

const showMore = ref(false);

const boxHeight = ref();
onMounted(() => {
  console.log(boxHeight.value.offsetHeight);
  if (boxHeight.value.offsetHeight <= 24) {
    console.log(document.querySelector(".fade"));
    document.querySelector(".btnText").style.display = "none";
    document.querySelector(".fadeAfter").style.display = "none";
  }
});
</script>

<template>
  <div>
    <h3>Beskrivelse</h3>
    <div class="flex flex-column align-items-center">
      <div ref="boxHeight" class="description">
        <p :class="{ fade: !showMore }">{{ description }}</p>
        <div :class="{ fadeAfter: !showMore }"></div>
      </div>
      <span :class="{ btnTextMore: showMore }" class="btnText" @click="showMore = !showMore"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.description {
  overflow: hidden;
  position: relative;
  width: 100%;

  p {
    margin: 0;

    &.fade {
      position: relative;
      max-height: 3.5rem; /* exactly three lines */
    }

    // &.fade::after {
    //   content: "";
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 2rem;
    //   background: linear-gradient(rgba(255, 255, 255, 0), rgb(207 228 234) 100%);
    // }
  }
  .fadeAfter {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;
    background: linear-gradient(rgba(255, 255, 255, 0), rgb(207 228 234) 100%);
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
