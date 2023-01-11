<template>
  <div class="flex align-items-center column-gap-1 tilbage" @click="$router.back()">
    <span class="pi pi-chevron-left"></span>
    <p>Tilbage</p>
  </div>
</template>

<style lang="scss" scoped>
.tilbage {
  position: relative;
  top: 20px;
  left: 10px;
}
.pi .pi-chevron-left {
  font-size: 20px;
}
p {
  margin: 5px 0;
}
</style>
