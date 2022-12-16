<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from "../components/HelloWorld.vue";
import FrontpageHeader from "../components/FrontpageHeader.vue";
</script>

<template>
  <FrontpageHeader />

  <section class="wrapper">
    <div class="flex justify-content-between align-items-center">
      <h2>Kommende begivenheder</h2>
      <div class="see-more-link">
        <!-- send data med der fortæller hvilken sorteringen der skal være -->
        <router-link :to="{ name: 'AllEvents' }">
          <p>Se alle</p>
          <i class="pi pi-chevron-right"></i>
        </router-link>
      </div>
    </div>
    <div class="upcoming-events-container"></div>

    <div class="flex justify-content-between align-items-center">
      <h2>Mine begivenheder</h2>
      <div class="see-more-link">
        <!-- send data med der fortæller hvilken sorteringen der skal være -->
        <router-link :to="{ name: 'AllEvents' }">
          <p>Se alle</p>
          <i class="pi pi-chevron-right"></i>
        </router-link>
      </div>
    </div>
    <div class="my-events-container"></div>

    <h2>Grupper</h2>
    <div class="groups-display-container"></div>
  </section>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.see-more-link {
  a {
    text-decoration: none;
    display: flex;
    align-items: center;

    p {
      font-size: 12px;
    }
  }
}
</style>
