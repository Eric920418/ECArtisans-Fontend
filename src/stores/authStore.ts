import { defineStore } from 'pinia';
// import { type UserData } from '../type/userType';
import router from '@/router/index';
// import { logIn,signUp } from '@/api/authApi';
import { sellerLogin } from './api'
// import { sellerAccount } from './sellerStore';  // 直接從 userStore 導入 useUserStore


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // userName: '',
    token: '',
    id: '',
    isLoggedIn: false,
    isLoading: false
  }),
  actions: {
    async login(data: { mail: string; password: string; }): Promise<void> {
      this.isLoading = true;
      try {
        await sellerLogin(data)
          .then(({ user }) => {
            // this.userName = user.name;
            this.token = user.token;
    
            // 取得payload 也就是id
            this.id = (JSON.parse(atob(this.token.split('.')[1]))).id;
            this.isLoggedIn = true;
            console.log('登入成功')
    
            // 登入成功就更新個人資料
            // const userStore = sellerAccount();
            // return userStore.updateUserData(this.id);
          })
          .then(() => {
            // 返回首頁，尚須判斷user身份為賣家還是買家
            router.push('/Seller/Profile');
          })
          .catch((error) => {
            console.error('Login error:', error);
            if (error.response && error.response.data && error.response.data.message) {
              alert(error.response.data.message);
            } else {
              alert('登入失敗');
            }
          });
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        this.isLoading = false; 
      }
    },
    logout(): void {
      this.isLoggedIn = false;
      this.reset();
      // 返回登入畫面，尚須判斷user身份為賣家還是買家
      const routerName = router.currentRoute.value.matched[0].name;
      let path = '/';
      if(routerName === 'Seller') path = '/SellerLogin';
      else if (routerName === 'User') path = '/UserLogin';
     
      router.push(path);
    },

    reset(): void {
      Object.assign(this, this.$state);
    },
  },
  // 持久化，讓用戶不會每次重登
  persist: true

});


