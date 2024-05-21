import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type SellerData } from '../type/sellerType';
import { sellerAccount, sellerAccountEdit, sellerAuth } from "./api"; 


// import { useRouter } from 'vue-router';
export const useSellerStore = defineStore({
  id: 'seller',
  // Date
  state: () => ({ 
    sellerInfo: {} as SellerData, // 初始商家信息
    imageError: 'images/user-img.svg',
    isLoading: false,
    updatePassword: false, //確認是否要傳送密碼修改
    sellerMenu: [ //商家頁面的目錄
      {
        title: '商家中心',
        path: 'SellerOverview',
      },
      {
        title: '商家資訊',
        path: 'SellerProfile',
      },
      // {
      // 	title: '商品管理',
      // 	path: 'SellerProduct',
      // },
      // {
      // 	title: '活動管理',
      // 	path: 'SellerActivity',
      // },
      // {
      // 	title: '優惠劵',
      // 	path: 'SellerCoupon',
      // },
      // {
      // 	title: '業績分析',
      // 	path: 'SellerPerformance',
      // },
      {
      	title: '訂單管理',
      	path: 'SellerOrder',
      },
      // {
      // 	title: '聊聊',
      // 	path: 'SellerMessage',
      // },
    ],

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
          alertStore.success('renewOK');
        })
        .catch(err=> {
          alertStore.error(err.response.data.message);
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
          alertStore.success('registerOK'); 
          router.push('/SellerLogin'); // 使用路由器名稱跳轉

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

