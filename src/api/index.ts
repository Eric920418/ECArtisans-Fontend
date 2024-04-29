import axios from 'axios';
import { logIn, signUp } from './authApi';

// 後端API baseURL
const $axios = axios.create({
  baseURL: 'https://ecartisans-backend.onrender.com',
});

// 導出所有API
export {
  $axios,
  logIn,
  signUp
};
