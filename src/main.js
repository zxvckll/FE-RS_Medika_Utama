import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "@/router/index.js";
import store from "./store/index.js";
import VueMultiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



createApp(App).use(store).use(router).component('VueDatePicker', VueDatePicker).component('multiselect', VueMultiselect).mount("#app");
