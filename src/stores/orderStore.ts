import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { sellerOrderAll, sellerOrder } from './api';
import { type OrderType, type DetailedOrderType } from '@/type/orderType';

// /:order_id
// 單一訂單用這隻
// 頁面要先呈現
// /:seller_id/orders

// 指定賣家的所有訂單

interface ApiResponse {
	status: string;
	thisShop: OrderType;
}

export const useOrderStore = defineStore({
	id: 'order',
	state: () => ({
		allOrders: [
			{
				_id: '6628b0217d9abcfe2fe8dd7c',
				orderNumber: '123',
				date: '2024/12/12',
				products: ['661e1795e8992a1bd4b86cb3', '661e1795e8992a1bd4b86cb2'],
				state: 1,
				price: 2300,
				pay: 1,
			},
			{
				_id: '6628b0217d9abcfe2fe8dd7d',
				orderNumber: '124',
				date: '2024/12/13',
				products: ['661e1795e8992a1bd4b86cb4', '661e1795e8992a1bd4b86cb5'],
				state: 2,
				price: 400,
				pay: 2,
			},
			{
				_id: '6628b0217d9abcfe2fe8dd7e',
				orderNumber: '125',
				date: '2024/12/14',
				products: ['661e1795e8992a1bd4b86cb6', '661e1795e8992a1bd4b86cb7'],
				state: 3,
				price: 500,
				pay: 3,
			},
			{
				_id: '6628b0217d9abcfe2fe8dd7f',
				orderNumber: '126',
				date: '2024/12/15',
				products: ['661e1795e8992a1bd4b86cb8', '661e1795e8992a1bd4b86cb9'],
				state: 4,
				price: 600,
				pay: 4,
			},
			{
				_id: '6628b0217d9abcfe2fe8dd80',
				orderNumber: '127',
				date: '2024/12/16',
				products: ['661e1795e8992a1bd4b86cba', '661e1795e8992a1bd4b86cbb'],
				state: 5,
				price: 700,
				pay: 5,
			},
		] as OrderType[], // 賣家所有訂單
		oneOrder: null as DetailedOrderType | null, // 賣家單筆訂單詳情
		isLoading: false, // 請求狀態
	}),
	getters: {
		// 獲取所有訂單
		gettingAllOrders(state) {
			return state.allOrders;
		},
		// 獲取單筆訂單
		gettingSingleOrder(state) {
			return state.oneOrder;
		},
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
				const res = await this.handleApiCall(
					() => sellerOrder(order_id),
					'單筆訂單取得成功',
					'單筆訂單取得失敗'
				);
				const data = res as ApiResponse;
				const { thisShop } = data as { thisShop: DetailedOrderType };
				this.oneOrder = JSON.parse(JSON.stringify(thisShop)); // 更新所有訂單數據
				// router.push({ name: 'SellerOneOrder', params: { orderId: order_id } });
			} catch (error) {
				// 錯誤已處理
			}
		},
		// 獲取賣家的所有訂單
		async getAllOrders(seller_id: string): Promise<void> {
			try {
				const res = await this.handleApiCall(
					() => sellerOrderAll(seller_id),
					'所有訂單取得成功'
				);
				const { thisShop } = res as { thisShop: any };
				this.allOrders = thisShop.flatMap((shop: { order: any }) => shop.order); // 提取商店所有訂單
			} catch (error) {
				// 錯誤已處理
			}
		},
		// 處理登入錯誤
		handleError(error: any, errorMessage: string): void {
			console.error('登入錯誤:', error);
			if (error.response && error.response.status === 500) {
				errorMessage = '伺服器錯誤，請稍後再試';
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				errorMessage = error.response.data.message;
			}
			alertStore.error(errorMessage); // 顯示錯誤訊息
		},
	},
});
