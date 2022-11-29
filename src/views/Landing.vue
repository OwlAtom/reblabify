<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
  </div>
  <HelloWorld msg="Welcome to the landing page!" />
  <div>
    <h3>PrimeVue Buttons</h3>
    <!-- Start of PrimeVue buttons. -->
    <Button label="Primary" />
    <Button label="Secondary" class="p-button-secondary" />
    <Button label="Success" class="p-button-success" />
    <Button label="Info" class="p-button-info" />
    <Button label="Warning" class="p-button-warning" />
    <Button label="Warning" class="p-button-help" />
    <Button label="Danger" class="p-button-danger" />
    <!-- End of PrimeVue buttons. -->
  </div>
</template>

<script>
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.

export default {
  name: "Landing",
  components: {
    Button, // The PrimeVue button will be used in the HTML section.
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
</style>
