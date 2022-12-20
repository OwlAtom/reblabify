import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
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
import RadioButton from "primevue/radiobutton";

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
app.component("RadioButton", RadioButton);

app.mount("#app");
