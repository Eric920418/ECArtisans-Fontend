import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VeeValidate from 'vee-validate';
import 'element-plus/dist/index.css';
import { $axios } from './api';

const app = createApp(App)

// 設定全域變數，但其實已經設在api裡面了
app.config.globalProperties.$axios = $axios;

app.use(createPinia());
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(VueCookies)
app.use(VeeValidate)

app.mount('#app')
