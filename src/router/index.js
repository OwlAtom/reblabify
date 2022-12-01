import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/Landing.vue"), //Login/signin ?
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/add-event",
    name: "AddEvent",
    component: () => import("../views/AddEvent.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/Chat.vue"),
  },
  {
    path: "/event-info", //todo: :id
    name: "EventInfo",
    component: () => import("../views/EventInfo.vue"),
  },
  {
    path: "/all-events",
    name: "AllEvents",
    component: () => import("../views/AllEvents.vue"),
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("../views/Groups.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
