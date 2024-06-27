import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	type OrderFormatType,
	type DetailedOrderType,
	type OrderType,
} from '../type/orderType';
import { getDate } from '@/setup/globalFunction';

import {
	sellerOrderAll, // 12	get  訂單管理 
	sellerOrder, // 13	get  單一訂單管理	 
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';


export const useOrder = defineStore({
	id: 'order',
	state: () => ({
		allData: [ //陣列，包含一個或多個訂單的資訊
					{
							"_id": "666ed8ee4666041420f054a6", //訂單id
							"products": [
									{
											"format": { //商品規格
													"image": "https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/120d317c-e861-4846-a71b-22b79d021316.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=eT1wr94NsgKZNqAeHk0Np143ESO8pod8fWt8Y75GDSO0T5bws9Tp%2Fd7u6VSiCFxqSSRwqg6yuYIHchJldY3lySrlD3PTYXUSJWJJhjxYE%2BOZbtki9N0aU10GQ1IUDW7EkC9j4nwj3rnaT%2FaOY2GXlRQbyOc8m8%2BgQ82jhr9%2Fklj8ry5xZBZ82F9ECcli0JFWa1L6IIyron5QGyx0OrxpbdnACYypwc6lJFn8VKRPpZsNVckg2mkoK3%2FuICHErvTvlGxDweZl0f4T1thbfISlkJt7%2BCcOTQGFUe6MTvWhK%2Fw0A%2FInMMUgM0qDjz0e%2FzD6JbX8mYwj8t%2BltNZ7LDEDYg%3D%3D" //商品圖片
											}
									}
							],
							"state": 0,  //訂單狀態  0:未付, 1:已付
							"totalPrice": 800, //訂單總金額
							"createdAt": "2024-06-16T12:22:06.504Z", //訂單建立時間
							"updatedAt": "2024-06-16T12:22:06.504Z" // 訂單最後更新時間
					},
					{
							"_id": "666ee45fdf3a67628239d206",
							"products": [
									{
											"format": {
													"image": "https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/120d317c-e861-4846-a71b-22b79d021316.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=eT1wr94NsgKZNqAeHk0Np143ESO8pod8fWt8Y75GDSO0T5bws9Tp%2Fd7u6VSiCFxqSSRwqg6yuYIHchJldY3lySrlD3PTYXUSJWJJhjxYE%2BOZbtki9N0aU10GQ1IUDW7EkC9j4nwj3rnaT%2FaOY2GXlRQbyOc8m8%2BgQ82jhr9%2Fklj8ry5xZBZ82F9ECcli0JFWa1L6IIyron5QGyx0OrxpbdnACYypwc6lJFn8VKRPpZsNVckg2mkoK3%2FuICHErvTvlGxDweZl0f4T1thbfISlkJt7%2BCcOTQGFUe6MTvWhK%2Fw0A%2FInMMUgM0qDjz0e%2FzD6JbX8mYwj8t%2BltNZ7LDEDYg%3D%3D"
											}
									}
							],
							"state": 0,
							"totalPrice": 800,
							"createdAt": "2024-06-16T13:10:55.512Z",
							"updatedAt": "2024-06-16T13:10:55.512Z"
					}
			] as unknown as OrderType[],
		isLoading: false, // 請求狀態
		accountType: '',
	}),
	getters: {
		// // 獲取所有訂單
		// gettingAllOrders(state) {
		// 	return state.allOrders;
		// },
		// // 獲取單筆訂單
		// gettingSingleOrder(state) {
		// 	return state.oneOrder;
		// },
	},
	actions: {
		async setAccountType(): Promise<void> {
			const currentPagePath = window.location.hash;
			if (currentPagePath.includes('/seller')) {
				this.accountType = 'seller';
			} else if (currentPagePath.includes('/user')) {
				this.accountType = 'user';
			}
		},
		// 獲取所有訂單
		async gettingAllOrders(token: string): Promise<void> {
				try {
					await this.setAccountType();
					if (this.accountType === 'seller') {
						const authStore = useAuthStore();
						await sellerOrderAll(authStore.token)
							.then(res => {
								// 轉換 sellerCategory
								const processedOrders = res.orders.map((orderGroup: { order: OrderType[] }) => {
									return orderGroup.order.map((order: OrderType) => {
										return {
											...order,
											products: order.products.map((product: OrderFormatType) => ({
												...product,
												format: {
													...product.format,
													// 根据需要转换 format 内的其他字段
													image: product.format.image
												}
											}))
										};
									});
								});								// 更新狀態
								// this.allData = processedOrders;
								alertStore.success('訂單取得成功');
							})
							.catch(err => {
								alertStore.error(err.response.data.message);
							});
					}
				} catch (error) {
					alertStore.error('showError');
				}
			},
	},
});
