import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { sellerOrderAll, sellerOrder } from './api'

// /:order_id 
// 單一訂單用這隻
// 頁面要先呈現
// /:seller_id/orders

// 指定賣家的所有訂單 

interface Product {
	_id: string;
	sellerCategory: any[];
	category: any[];
	isOnshelf: boolean;
	reviews: any[];
	sold: number;
	productName: string;
	type: number[];
	sellerType: any[];
	origin: string;
	ingredient: string;
	format: {
			_id: string;
			title: string;
			price: number;
			cost: number;
			stock: number;
			color: string[];
	}[];
	introduce: string;
	production: string;
	state: boolean;
	evaluate: any[];
	haveStore: string;
	fare: number;
	pay: string[];
	keyword: any[];
	image: string[];
}

interface Order {
	_id: string;
	orderNumber: string;
	date: string;
	products: Product[];
	state: number;
	price: number;
	pay: number;
}

interface ApiResponse {
	status: string;
	thisShop: Order;
}


export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
      allOrders: [], // 賣家所有訂單
      oneOrder: null, // 賣家單筆訂單詳情
      isLoading: false // 請求狀態
    }),
    getters: {
      // 獲取所有訂單
      gettingAllOrders(state) {
        return state.allOrders;
      },
      // 獲取單筆訂單
      gettingSingleOrder(state) {
				console.log('getting，被取資料')
        return state.oneOrder;
      }
    },
    actions: {
      // 一個通用的 API 處理所有請求
      async handleApiCall<T>(
        apiFunction: () => Promise<T>,
        successMessage: string = '操作成功',
        errorMessage: string = '操作失敗'
      ): Promise<T | undefined> {
        this.isLoading = true; 
        try {
          const res = await apiFunction(); // 發送 API 請求
          alertStore.success(successMessage); // 請求成功，顯示成功訊息
          return res; // 返回請求結果
        } catch (error) {
          this.handleError(error, errorMessage); // 處理錯誤
        } finally {
          this.isLoading = false; // 請求結束，取消加載狀態
        }
      },
      // 獲取單筆訂單
      async getOneOrderByOrderID(order_id: string): Promise<void> {
        try {
          const res = await this.handleApiCall(() => sellerOrder(order_id), '單筆訂單取得成功','單筆訂單取得失敗');
					const data = res as ApiResponse;
          const { thisShop } = data as { thisShop: Order };
          this.oneOrder = JSON.parse(JSON.stringify(thisShop)); // 更新所有訂單數據
					// router.push({ name: 'SellerOneOrder', params: { orderId: order_id } });
        } catch (error) {
          // 錯誤已處理
        }
      },
      // 獲取賣家的所有訂單
      async getAllOrders(seller_id: string): Promise<void> {
        try {
          const res = await this.handleApiCall(() => sellerOrderAll(seller_id), '所有訂單取得成功');
          const { thisShop } = res as { thisShop: any };
					this.allOrders = thisShop.flatMap((shop: { order: any; }) => shop.order); // 提取商店所有訂單
					console.log(this.allOrders)
        } catch (error) {
          // 錯誤已處理
        }
      },
      // 處理登入錯誤
      handleError(error: any, errorMessage: string): void {
        console.error('登入錯誤:', error);
        if (error.response && error.response.status === 500) {
          errorMessage = '伺服器錯誤，請稍後再試';
        } else if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        alertStore.error(errorMessage); // 顯示錯誤訊息
      }
    }
  });