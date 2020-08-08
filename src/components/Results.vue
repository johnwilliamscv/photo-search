<template>
  <div v-if="results">
    <a
      v-for="photo in results"
      :key="photo.id"
      :style="`background-image:url(${photo.urls.small})`"
      :href="photo.urls.full"
      target="_blank"
      class="photo"
      :aria-label="photo.alt_description"
    />
    <div v-if="!results.length">No photos found</div>
    <div v-if="page < pages">
      <button class="more" :disabled="isLoading" type="button" @click="more">
        More...
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",

  computed: {
    results() {
      return this.$store.state.results;
    },
    page() {
      return this.$store.state.page;
    },
    pages() {
      return this.$store.state.pages;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },

  methods: {
    more() {
      this.$store.commit("set", ["page", this.page + 1]);
      this.$store.dispatch("search");
    }
  }
};
</script>

<style lang="scss" scoped>
.photo {
  /* 
    Keeping layout simple here without flex or grid. Just using inline-blocks with images
    cropped to squares and vw css units for easy scaling across all viewports. 
  */
  display: inline-block;
  width: 28vw;
  height: 28vw;
  margin: 2vw;
  background-size: cover;
  background-position: center;
  border-radius: 0.5em;
  transition: 0.25s transform;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1vw rgba(0, 0, 0, 0.25);
  }
}

.more {
  border: 0;
  font-size: 1.25em;
  background-color: #16407d;
  color: white;
  padding: 0.5em 1em;
  margin: 1em;
  border-radius: 0.2em;
  cursor: pointer;

  &:disabled {
    opacity: 0.25;
  }
}
</style>
