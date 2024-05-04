import { defineStore } from 'pinia';
import { type SellerData } from '../type/sellerType';
import { sellerAccount, sellerAccountEdit } from "./api"; 

export const useSellerStore = defineStore({
  id: 'seller',
  // Date
  state: () => ({ 
    sellerInfo: {} as SellerData | null, // 初始商家信息
    id: "661e0d13e8992a1bd4b86cae",
    imageError: './public/images/user-img.svg',
  }),
  // Methods
  actions: {
    // 获取商家信息
    async getSellerAccount() {
      try {
        const response = await sellerAccount(this.id); 
        this.sellerInfo = response.data.thisShop; // 存储商家信息
      } catch (error) {
        console.error('讀取訊息失敗');
      }
    },
    // 更新資料
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
        const response = await sellerAccountEdit(this.id, data);
        const reData:any = response.data; // 存储商家信息
        console.log(reData);
      } catch (error) {
        console.error('更新失敗');
      }
    },
    
  }
});

