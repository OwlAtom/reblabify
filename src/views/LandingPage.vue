<script setup>
import Button from "primevue/button"; // Import the PrimeVue buttons.
import "primeflex/primeflex.css"; // Import the PrimeVue layout utility library.
import EventDeclarations from "../components/EventDeclarations.vue";
import CardHeader from "../components/CardHeader.vue";

import EventDateLabel from "../components/EventDateLabel.vue";
defineProps({
  msg: String,
});
</script>

<template>
  <div>
    <CardHeader title="Fødselsdagsinvitation" icon="flag" />

    <!-- Dynamically assign the value of a variable -->
    <!--<BlogPost :title="post.title" /> https://vuejs.org/guide/components/props.html#prop-passing-details-->
    <EventDateLabel month="Nov" date="20" />
    <EventDeclarations :declarations="5" :invited-total="12" />
  </div>
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
