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
import * as VeeValidate from './setup/vee-validate'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


const app = createApp(App)

app.config.globalProperties.$axios = axios.create({
    baseURL: 'https://ecartisans-backend.onrender.com',
  
  })

// 
const pinia = createPinia();
// Pinia加上持久化插件取代直接使用localStorage儲存狀態
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(VueCookies)

app.mount('#app')
