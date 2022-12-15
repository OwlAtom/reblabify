import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/LandingPage.vue"), //Login/signin ?
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/add-event",
    name: "AddEvent",
    component: () => import("../views/AddEvent.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/ChatOverview.vue"),
    meta: {
      heading: "Chatoversigt",
    },
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
    meta: {
      heading: "Begivenhedsoversigt",
    },
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("../views/GroupsOverview.vue"),
    meta: {
      heading: "Grupper",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
