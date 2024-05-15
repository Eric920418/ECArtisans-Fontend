import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { sellerOrderAll, sellerOrder } from './api'

// /:order_id 
// 單一訂單用這隻
// 頁面要先呈現
// /:seller_id/orders

// 指定賣家的所有訂單 

export const useOrderStore = defineStore({
    id: 'order',
    state: ()=> ({
        data: {},
        isLoading: false
    }),
    actions: {
        async getOneOrderByOrderID(seller_id: string, order_id: string): Promise<void>{
            console.log('API施工中，待補')
        },
        async handleApiCall<T>(
            apiFunction: () => Promise<T>, 
            successMessage: string = '操作成功', 
            errorMessage: string = '操作失敗'
        ): Promise<T | undefined> {
            this.isLoading = true;
            try {
                const res = await apiFunction();
                const { thisShop } = res as { thisShop: object };
                this.data = JSON.parse(JSON.stringify(thisShop)); // 將被代理的物件轉換為原始的 JavaScript 物件
                console.log(thisShop)
                console.log(this.data)
                alertStore.success(successMessage);
                return res;
            } catch (error) {
                this.handleLoginError(error, errorMessage)
            } finally {
                this.isLoading = false;
            }
        },
        
        
        // 使用範例
        async getAllOrders(seller_id: string): Promise<void> {
            try {
                await this.handleApiCall(() => sellerOrderAll('661e0d13e8992a1bd4b86caf'), '訂單取得成功');
            } catch (error) {
                // 錯誤已處理
            }
        },
        async handleLoginError(error: any,errorMessage: string): Promise<void> {
            console.error('Login error:', error);
            if (error.response && error.response.status === 500) {
              errorMessage = '伺服器錯誤，請稍後再試'
            } else if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            alertStore.error(errorMessage);
          },
    }
})