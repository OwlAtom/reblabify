import { createApp } from "vue";
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
import "primevue/resources/themes/md-light-indigo/theme.css"; //theme
// import "./assets/_theme.scss";
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons

const app = createApp(App);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(router);

//defining components
app.component(Button);
app.component(InputText);
app.component(Toast);

app.mount("#app");
