import { defineStore } from 'pinia';
import { type SellerData } from '../type/sellerType';
import { sellerAccount, sellerAccountEdit, sellerAuth } from "./api"; 
// import { useRouter } from 'vue-router';

export const useSellerStore = defineStore({
  id: 'seller',
  // Date
  state: () => ({ 
    sellerInfo: {} as SellerData | null, // 初始商家信息
    id: "661e0d13e8992a1bd4b86cae",
    imageError: './public/images/user-img.svg',
    auth: false,
    errorMessage: '',
  }),
  // Methods
  actions: {
    // 查看 9 商家資訊
    async getSellerAccount() {
      try {
        const response = await sellerAccount(this.id); 
        this.sellerInfo = response.thisShop; // 存储商家信息
      } catch (error) {
        console.error('讀取訊息失敗');
      }
    },
    // 更新/編輯商家資訊
    async upSellerAccount() {
      try {
        const data:any = {
          "bossName": this.sellerInfo?.bossName,
          "phone": this.sellerInfo?.phone,
          "brand": this.sellerInfo?.brand,
          "address": this.sellerInfo?.address,
          "introduce": this.sellerInfo?.introduce,
          "salesType": [
              5,
              9
          ],
          "collection": "123456789"
        }
        const reData:any = await sellerAccountEdit(this.id, data);
      } catch (error) {
        console.error('更新失敗');
      }
    },
    // 註冊/新增 會員
    async addSellerAuth(router:any, data:any) {
      try {
        await sellerAuth(data)
        .then(res=> {
          router.push({ name: 'ShopLogin' }); // 使用路由名称进行跳转
        })
        .catch(err=> {
          alert(err.response.data.message);
        })
      } catch (error:any) {
        console.log('Eerror:', error);
      }
    },
    
  }
});

