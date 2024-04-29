import { defineStore } from 'pinia';
import { type UserData } from '../type/userType';

import { logIn,signUp } from '@/api/authApi';


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


const useUserStore = defineStore({
  id: 'user',

  state: (): UserData => ({
    bossName: '',
    gender: '',
    phone: '',
    mail: '',
    brand: '',
    avatar: '',
    plan: 0,
    planPeriod: '',
    password: '',
    otherPassword: '',
    address: '',
    introduce: '',
    eye: false,
    isLoggedIn: false,
    id: '',
  }),

  getters: {
    hello: (state) => 'Hello!' + state.bossName,
  },

  actions: {
    async login(mail: string, password: string): Promise<void> {
      try {
        const { status, user } = await logIn(mail, password);

        if (status === 'success') {
          this.mail = user.mail;
          this.password = user.password;

          // 取得payload 也就是id
          this.id = JSON.parse(atob(user.token.split('.')[1]));
          this.isLoggedIn = true;

          // 待補function登入完要用id去抓資訊

          return status
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },

    async signup(userData: UserData): Promise<void> {
      console.log(userData)
      
      try {
          const res = await signUp(userData);
          console.log(res.data);
          if (status === 'success'){
            this.login(userData.mail, userData.password)
          }
      } catch (error) {
          console.error('Sign up error:', error);
      }
  },

    logout(): void {
      this.isLoggedIn = false;
      this.reset();
    },

    reset(): void {
      Object.assign(this, this.$state);
    },
  },
});

export default useUserStore;
