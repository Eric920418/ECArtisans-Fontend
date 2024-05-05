import { defineStore } from 'pinia';
import { sellerAuth, sellerAccount } from './api'
import { type UserData } from '../type/userType';
import { user, userEdit } from "./api"; 

// interface UserData {
//     [key: string]: any;
//   }

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {} as UserData | null, // 初始信息
    id: "66192dd5086e59cce8f7704d",
    imageError: './public/images/user-img.svg',
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
        const { thisShop } = await sellerAccount(id);
        this.$patch({ user: thisShop });
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    },
    // 获取商家信息
      async getUserAccount() {
      try {
        const response = await user(this.id); 
        this.user = response.data; // 存储商家信息
      } catch (error) {
        console.error('讀取訊息失敗');
      }
    },
    // 更新資料
    async upUserAccount() {
      try {
        const data:any ={
          "name": this.user?.name,
          "gender":  this.user?.gender,
          "avatar":  this.user?.avatar,
          "birthday":  this.user?.birthday,
          "phone":  this.user?.phone,
          "mail":  this.user?.mail,
          "address":  this.user?.address,
          "password":  this.user?.password
        };
        const response = await userEdit(this.id, data);
        const reData:any = response; // 存储商家信息
        console.log('更新成功');
      } catch (error) {
        console.error('更新失敗');
      }
    },
  }
});

export default useUserStore;