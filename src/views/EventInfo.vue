<script setup>
import ButtonGroup1 from "../components/ButtonGroup1.vue";
</script>

<template>
  <div>
    <ButtonGroup1 />
  </div>
</template>

<style lang="scss" scoped>
.add-cover {
  height: 11em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  p {
    margin: 0;
  }
}
.overlay {
  background-color: $overlay;
  border-radius: 40px;
  padding-top: 4em;
  padding-bottom: 4em;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 10;

  .add-icon-circle {
    width: 7em;
    height: 7em;
    background-color: $white;
    border-radius: 50%;
    position: absolute;
    top: -3em;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      margin: 0;
    }
  }
}
.material-icons-round {
  font-size: 28px;
}
</style>
