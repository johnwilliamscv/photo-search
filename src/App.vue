<template>
  <main id="app">
    <img alt="Photo search logo" src="./assets/icon.png" />
    <Search />
    <Results />
  </main>
</template>

<script>
import Search from "./components/Search.vue";
import Results from "./components/Results.vue";

export default {
  name: "App",
  components: {
    Search,
    Results
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
