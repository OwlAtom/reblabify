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
    meta: {
      title: "Hjem",
    },
  },
  {
    path: "/add-event",
    name: "AddEvent",
    component: () => import("../views/AddEvent.vue"),
    meta: {
      title: "Opret",
    },
  },
  {
    path: "/chat",
    name: "Chat",
    component: () => import("../views/ChatOverview.vue"),
    meta: {
      title: "Chatoversigt",
    },
  },
  {
    path: "/event-info/:id",
    name: "EventInfo",
    component: () => import("../views/EventInfo.vue"),
    meta: {
      title: "Begivenhedsinfo",
    },
  },
  {
    path: "/all-events",
    name: "AllEvents",
    component: () => import("../views/AllEvents.vue"),
    meta: {
      title: "Begivenhedsoversigt",
    },
    children: [
      {
        path: "/all-events/mine",
        name: "AllEventsMine",
        component: () => import("../views/AllEvents.vue"),
      },
    ],
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("../views/GroupsOverview.vue"),
    meta: {
      title: "Grupper",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("../views/UserLogout.vue"),
  },
  {
    path: "/edit-event/:id",
    name: "EditEvent",
    component: () => import("../views/TheEditEvent.vue"),
    meta: {
      title: "Rediger",
    },
  },
];

import { useUsersStore } from "../stores/users";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  document.title = `Reblabify · ${to.meta.title}`;

  const usersStore = useUsersStore();
  usersStore.init();
  console.log("Route guarded: ", !usersStore.users.self.loggedIn);
  if (to.name !== "Login" && !usersStore.users.self.loggedIn) next({ name: "Login" });
  else next();
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
