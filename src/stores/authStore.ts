import { defineStore } from 'pinia';

/* 待補賣家登入管理 */
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isLoggedIn: true
  }),
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    }
  }
});
