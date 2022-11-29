<script setup>
// ...
</script>
<template>
  <nav>
    <router-link :to="{ name: 'Home' }"><span class="material-icons-outlined">home</span></router-link>
    <router-link :to="{ name: 'Add' }"><span class="material-icons-outlined addBtn">add</span></router-link>
    <router-link :to="{ name: 'Chat' }"><span class="material-icons-outlined">chat</span></router-link>

  </nav>
</template>

<style lang="scss" scoped>
nav{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 4em;
  border-radius: 8px;
  background-color: #1B4755; //husk farvevariabler
  a{
    color: #F9D6BC; //husk farvevariabler
    &:hover{
      color: $red;
    }
    .addBtn{
      background-color: #F9D6BC;
      border-radius: 100%;
      aspect-ratio: 1/1;
      color: #0D232A;
    }
  }
}

</style>
