import { defineStore } from 'pinia';
import { sellerAuth, sellerAccount } from './api'

interface UserData {
    [key: string]: any;
  }

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // bossName: '',
    // gender: '',
    // phone: '',
    // mail: '',
    // brand: '',
    // avatar: '',
    // plan: 0,
    // planPeriod: '',
    // password: '',
    // otherPassword: '',
    // address: '',
    // introduce: '',
    // eye: false,
    // isLoggedIn: false,
    // id: '',
    user: {}
  }),

  getters: {
    // hello: (state) => 'Hello!' + state.user.bossName,
  },

  actions: {
    async register(userData: UserData): Promise<void> {
      console.log(userData)
      try {
        const res = await sellerAuth(userData);
        console.log(res.data);
      } catch (error) {
          console.error('Sign up error:', error);
      }
    },
    async updateUserData(id: string): Promise<void> {
        try {
            console.log(id)
            const { status, thisShop } = await sellerAccount(id);
            this.user = thisShop;
            console.log(this.user)
        } catch (error) {
            console.error('Error getting user data:', error);
        }

    }
    }
});

export default useUserStore;
