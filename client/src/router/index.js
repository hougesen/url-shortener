import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import RedirectorService from "@/services/RedirectorService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/l/:shortCode",

    redirect: async (to) => {
      const { params } = to;
      if (params.shortCode) {
        let request = await RedirectorService.redirect(params.shortCode);
        window.location.href = request.to;
        return "/redirecting";
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
