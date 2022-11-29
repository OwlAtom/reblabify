<script setup>
// ...
</script>
<template>
  <nav>
    <router-link to="/">Go to landing</router-link>
    <router-link to="/home">Go to home</router-link>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  max-width: 20em;
  margin: 0 auto;
}
nav a {
  padding: 0.5em 1em;
  border-radius: 0.5em;

  color: #42b883;
  background-color: #f5f5f5;
  box-shadow: -11px 12px 0px 0px #00000061;

  font-weight: bold;
  text-decoration: none;

  transition: all 0.2s ease-in-out;
}
nav a:hover {
  color: #f5f5f5;
  background-color: #42b883;
}
</style>
