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

const app = createApp(App)

app.config.globalProperties.$axios = axios.create({
  baseURL: 'https://ecartisans-backend.onrender.com',

})


app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.use(VueCookies)
app.use(VeeValidate)

app.mount('#app')
