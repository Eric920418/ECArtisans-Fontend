import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import './assets/all.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as VeeValidate from './setup/vee-validate';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { LoadingPlugin } from 'vue-loading-overlay';

import { useAlertStore } from '@/stores';

// 翻譯插件: 全域 t 、 to 兩種功能
import global from '@/setup/globalFunction';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	FontAwesomeIcon,
	FontAwesomeLayers,
	FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';
import { createBootstrap } from 'bootstrap-vue-next';

library.add(fab);
library.add(fas);

const app = createApp(App);
app.component('font-awesome-layers', FontAwesomeLayers);
app.component('font-awesome-layers-text', FontAwesomeLayersText);
app.component('font-awesome-icon', FontAwesomeIcon);

app.config.globalProperties.$axios = axios.create({
	baseURL: 'https://ecartisans-backend.onrender.com',
});

const pinia = createPinia();
export const alertStore = useAlertStore(pinia);

// Pini 使用localStorage儲存狀態
pinia.use(piniaPluginPersistedstate);

app.use(global);
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.use(ElementPlus);
app.use(VueCookies);
app.use(LoadingPlugin);
app.use(createBootstrap({ components: true, directives: true })); // Change this line

app.mount('#app');
