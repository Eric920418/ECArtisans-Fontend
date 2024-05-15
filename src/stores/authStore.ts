import { defineStore } from 'pinia';
// import { type UserData } from '../type/userType';
import router from '@/router/index';
// import { logIn,signUp } from '@/api/authApi';
import { sellerLogin, userLogin } from './api'
// import { sellerAccount } from './sellerStore';  // 直接從 userStore 導入 useUserStore
import { alertStore } from '@/main'; // 導入實例


interface UserData {
  mail: string;
  password: string;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: '',
    id: '',
    isLoggedIn: false,
    isLoading: false,
    accountType: ''
  }),
  actions: {
    async login(data: UserData): Promise<void> {
      this.isLoading = true;
      try {
        await this.setAccountType();
        // const { user } = await sellerLogin(data);
        let res;
        if (this.accountType === 'seller') {
          res  = await sellerLogin(data);
        } else if (this.accountType === 'user') {
          res  = await userLogin(data);
        }
        const { user } = res;
        await this.handleLoginSuccess(user);
      } catch (error) {
        console.log(error)
        await this.handleLoginError(error);
      } finally {
        this.isLoading = false;
      }
    },
    async setAccountType(): Promise<void> {
      const currentPagePath = window.location.href;
      if (currentPagePath.includes('/SellerLogin')) {
        this.accountType = 'seller';
      } else if (currentPagePath.includes('/UserLogin')) {
        this.accountType = 'user';
      }
    },
    async handleLoginSuccess(user: any): Promise<void> {
      // 如果已經有登入狀態代表可能是買家或商家身份進入沒有權限的頁面被router返回重新登入
      if (this.isLoggedIn && this.accountType !== '') {
        console.log(this.accountType)
        this.reset();
      } else {
        this.isLoggedIn = true;
        alertStore.success('logIn')
      }
      this.token = user.token;
      this.id = JSON.parse(atob(user.token.split('.')[1])).id;
      // 判斷account身份為商家還是買家，進入主頁
      const nextPage = this.accountType === 'seller' ? 'SellerOverview' : 'UserProfile';
      router.push({ name: nextPage });
    },
    async handleLoginError(error: any): Promise<void> {
      console.error('Login error:', error);
      let errorMessage = '登入失敗';
      if (error.response && error.response.status === 500) {
        errorMessage = '伺服器錯誤，請稍後再試;信箱不正確';
      } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alertStore.error(errorMessage);
    },
    logout(): void {
      this.isLoggedIn = false;
      this.reset();
      // 返回登入畫面，判斷account身份為商家還是買家
      const nextPage = this.accountType === 'seller' ? 'SellerHome' : 'index';
      router.push({ name: nextPage });
    },
    reset(): void {
      Object.assign(this, this.$state);
    },
  },
  persist: true
});
