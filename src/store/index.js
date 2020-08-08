import Vue from "vue";
import Vuex from "vuex";
import { getSearchResults } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    searchText: "",
    results: null,
    pages: 0,
    page: 1,
    isLoading: false
  },

  mutations: {
    set(state, [key, value]) {
      // Generally I prefer to have a single state setter instead of
      // repeating mutations for each state field.
      state[key] = value;
    }
  },

  actions: {
    search({ commit, state }) {
      if (state.searchText) {
        commit("set", ["isLoading", true]);
        getSearchResults(state.searchText, state.page)
          .then(response => {
            let results = state.page > 1 ? state.results : [];
            commit("set", ["results", results.concat(response.data.results)]);
            commit("set", ["pages", response.data.total_pages]);
          })

          .catch(() => {
            commit("set", ["results", []]); // Setting an empty array allows the "No photos found" message to display
            commit("set", ["pages", 0]);
          })

          .finally(() => {
            commit("set", ["isLoading", false]);
          });
      }
    }
  }
});
