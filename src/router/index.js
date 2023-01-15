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
    path: "/event-info/:id",
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
      heading: "Grupper",
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
  },
];

import { useUsersStore } from "../stores/users";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
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
