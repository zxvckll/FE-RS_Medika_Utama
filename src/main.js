import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router/index.js";
import store from "./store/index.js";
import VueMultiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import GlobalVariablePlugin from "./GlobalVariablePlugin";

const app = createApp(App);


app.use(store).use(router).use(GlobalVariablePlugin).component('VueDatePicker', VueDatePicker).component('multiselect', VueMultiselect).mount("#app");
