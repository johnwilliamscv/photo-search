<template>
  <div :class="isLoading ? 'isLoading' : null">
    <h1>Photo search</h1>
    <div class="searchBar">
      <input
        v-model="searchText"
        @change="search"
        @input="clearResults"
        type="text"
        autofocus
        placeholder="Search for something..."
        aria-label="Search for something"
      />
      <button type="button" title="Search" :disabled="!searchText"></button>
    </div>
    <div v-if="isLoading">Searching...</div>
  </div>
</template>

<script>
export default {
  name: "Search",

  data() {
    return {
      searchText: ""
    };
  },

  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },

  methods: {
    search() {
      this.$store.commit("set", ["searchText", this.searchText]);
      this.$store.commit("set", ["page", 1]);
      this.$store.dispatch("search");
    },

    clearResults() {
      this.$store.commit("set", ["results", null]);
      this.$store.commit("set", ["pages", 0]);
    }
  }
};
</script>

<style scoped lang="scss">
// We're using native html search input and button, so there
// is a bit of styling to make them look nice...

$primary: #16407d;
$secondary: #28aeea;

.searchBar {
  display: inline-flex;
  align-items: start;
  width: 100%;
  max-width: 400px;
}

input {
  flex: 1;
  font-size: 1.3em;
  padding: 0.5em 0;
  margin-left: 2em;
  border: 0 solid;
  width: 100%;
  border-bottom: 3px solid $secondary;
  outline: none; // Prevents default focus ring
}

button {
  background-image: url(../assets/search.png);
  background-color: $secondary;
  color: white;
  font-size: 1.5em;
  border: 0;
  height: 2em;
  width: 2em;
  background-size: 1em;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  vertical-align: top;
  margin: 0 0 1em 0.5em;
  outline: 0; // Prevents default focus ring. Instead we change background color when focused (see below)

  &:disabled {
    opacity: 0.2;
    cursor: auto;
  }
  &:not(:disabled) {
    &:focus,
    &:hover {
      background-color: $primary;
    }
  }
}

.isLoading {
  input,
  button {
    opacity: 0.25; // Fade search controls during search
  }
}
</style>
