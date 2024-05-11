import { defineStore } from 'pinia';
import { type SellerData } from '../type/sellerType';
import { sellerAccount, sellerAccountEdit, sellerAuth } from "./api"; 
// import { useRouter } from 'vue-router';

export const useSellerStore = defineStore({
  id: 'seller',
  // Date
  state: () => ({ 
    sellerInfo: {} as SellerData, // 初始商家信息
    imageError: 'public/images/user-img.svg',
    errorMessage: '',
    isLoading: false,
    updatePassword: false, //確認是否要傳送密碼修改
  }),
  // Methods
  actions: {
    // 查看 9 商家資訊
    async getSellerAccount(id:string) {
      try {
        const response = await sellerAccount(id); 
        this.sellerInfo = response.thisShop; // 存储商家信息
      } catch (error) {
        console.error('讀取訊息失敗');
      }
    },
    // 更新/編輯商家資訊
    async upSellerAccount(pwData:object) {
      try {
        let data:object = {};
        data = {
          "bossName": this.sellerInfo?.bossName,
          "phone": this.sellerInfo?.phone,
          "brand": this.sellerInfo?.brand,
          "address": this.sellerInfo?.address,
          "introduce": this.sellerInfo?.introduce,
        }
        if(this.updatePassword){ //更新包含密碼
          data = { ...data, ...pwData };
        }
        const id = this.sellerInfo?._id;
        await sellerAccountEdit(id, data)
        .then(res=> {
          alert('更新成功'); // 使用路由名称进行跳转
        })
        .catch(err=> {
          alert(err.response.data.message);
        })
      } catch (error) {
        console.error('更新失敗');
      }
    },
    // 註冊/新增 會員
    async addSellerAuth(router:any, data:any) {
      this.isLoading = true
      try {
        await sellerAuth(data)
        .then(res=> {
          alert('註冊成功，返回登入頁')
          router.push({ name: 'SellerLogin' }); // 使用路由器名稱跳轉

        })
        .catch(err=> {
          alert(err.response.data.message);
        })
      } catch (error:any) {
        console.log('Eerror:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
  }
});

