import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import router from "./router";
//importing components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";


//importing stylesheets
import "./style.css";
// import "primevue/resources/themes/md-light-indigo/theme.css"; //theme
// import "./assets/_theme.scss";
// import "./assets/scss/shared.scss";
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import 'material-icons/iconfont/material-icons.css';


const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(router);

//defining components
app.component(Button);
app.component(InputText);
app.component(Toast);

app.mount("#app");
