import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";

import { initializeApp } from "firebase/app";
// import { getPerformance } from "firebase/performance";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCkMeu0Y5iCwjENndtY-KujBB7txtLtLio",
  authDomain: "reblabify.firebaseapp.com",
  databaseURL: "https://reblabify-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reblabify",
  storageBucket: "reblabify.appspot.com",
  messagingSenderId: "342442064472",
  appId: "1:342442064472:web:fc5b690eb43deaf709e82d",
  measurementId: "G-GPNFV4ZWFF",
};
// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const firebase = initializeApp(firebaseConfig);
// const perf = getPerformance(firebase); // https://firebase.google.com/docs/perf-mon/get-started-web
// const analytics = getAnalytics(firebase); // https://firebase.google.com/docs/analytics/get-started?platform=web
// analytics.app.automaticDataCollectionEnabled = true;

import "normalize.css/normalize.css";

import PrimeVue from "primevue/config";
import router from "./router";

//importing components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import TabView from "primevue/tabview"; // brugt i ButtonGroup
import TabPanel from "primevue/tabpanel"; // brugt i ButtonGroup

//importing stylesheets
import "./style.css"; // evt. flyttes over i scss
// import "primevue/resources/themes/md-light-indigo/theme.css"; //theme | evt. slettes
import "./assets/_theme.scss";
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //prime icons
import "material-icons/iconfont/material-icons.css"; // Material icons

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(router);

//defining PrimeVue components
app.component("DefaultButton", Button);
app.component(InputText);
app.component(Toast);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);

app.mount("#app");
