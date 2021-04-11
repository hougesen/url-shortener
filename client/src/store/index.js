import Vue from "vue";
import Vuex from "vuex";

import UserService from "@/services/UserService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    userLinks: [],
  },
  mutations: {
    // Sync

    setUserId(state, payload) {
      state.userId = payload;
    },

    setUserLinks(state, payload) {
      state.userLinks = payload;
    },
  },
  actions: {
    // Async
    async setUserLinks(state, payload) {
      const links = await UserService.getLinks(payload);
      state.commit("setUserLinks", links);
    },
  },
  modules: {},
  getters: {
    getUserId: (state) => state.userId,
    getUserLinks: (state) => state.userLinks,
  },
});
