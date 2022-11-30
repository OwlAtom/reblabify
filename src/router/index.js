import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/add",
    name: "Add",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
