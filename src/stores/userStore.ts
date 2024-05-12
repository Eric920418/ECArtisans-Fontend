import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type UserData } from '../type/userType';
import { user, userEdit, userAuth } from "./api"; 

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {} as UserData, // 初始信息
    imageError: 'images/user-img.svg',
    isLoading: false,
    updatePassword: false, //確認是否要傳送密碼修改
    userMenu: [ //會員頁面的目錄
      {
        title: '會員資訊',
        path: 'UserProfile',
      }
    ],
  }),

  getters: {
    // hello: (state) => 'Hello!' + state.user.bossName,
  },
  // Methods
  actions: {
    // 查看 買家資訊
      async getUserAccount(id:string) {
      try {
        const response = await user(id); 
        this.user = response.data; // 儲存使用者資訊
      } catch (error) {
        alertStore.error('讀取訊息失敗');
      }
    },
    // 更新/編輯 買家 資料
    async upUserAccount(pwData:object) {
      try {
        console.log('pwData',pwData);
        let data:object = {};
        data = {
          "name": this.user?.name,
          "gender": this.user?.gender,
          "avatar": this.user?.avatar,
          "birthday": this.user?.birthday,
          "phone": this.user?.phone,
          "mail": this.user?.mail,
          "address": this.user?.address,
        }
        if(this.updatePassword){ //更新包含密碼
          data = { ...data, ...pwData };
        }
        const id = this.user?._id;
        await userEdit(id, data)
        .then(res=> {
          console.log(res);
          alertStore.success('renewOK');
        })
        .catch(err=> {
          alertStore.error(err.response.data.message);
        })
      } catch (error) {
        alertStore.error('renewError');
      }
    },
    // 註冊/新增 會員
    async addUserAuth(router:any, data:any) {
      this.isLoading = true
      try {
        await userAuth(data)
        .then(res=> {
          alertStore.success('registerOK'); 
          router.push('/UserLogin'); 
        })
        .catch(err=> {
          alertStore.error(err.response.data.message);
        })
      } catch (error:any) {
        alertStore.error(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },
  }
});

export default useUserStore;