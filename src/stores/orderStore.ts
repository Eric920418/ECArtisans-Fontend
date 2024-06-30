import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	type ProductFormatType,
	type OrderProductType,
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
			"_id": "666ee45fdf3a67628239d206", //訂單id
			"user": "666e9fb666bd265fbad38237", //買家id
			"seller": {
					"_id": "66668f5008649a808e8cc52b" //賣家id
			},
			"products": [
					{
							"product": {
									"_id": "66669d69dfd0bb2c45e6309e" //商品id
							},
							"format": { //商品規格
									"title": "白色120W", //規格名稱
									"price": 800, // 價錢
									"cost": 500, // 成本
									"stock": 300, // 庫存量
									"image": "https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/120d317c-e861-4846-a71b-22b79d021316.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=eT1wr94NsgKZNqAeHk0Np143ESO8pod8fWt8Y75GDSO0T5bws9Tp%2Fd7u6VSiCFxqSSRwqg6yuYIHchJldY3lySrlD3PTYXUSJWJJhjxYE%2BOZbtki9N0aU10GQ1IUDW7EkC9j4nwj3rnaT%2FaOY2GXlRQbyOc8m8%2BgQ82jhr9%2Fklj8ry5xZBZ82F9ECcli0JFWa1L6IIyron5QGyx0OrxpbdnACYypwc6lJFn8VKRPpZsNVckg2mkoK3%2FuICHErvTvlGxDweZl0f4T1thbfISlkJt7%2BCcOTQGFUe6MTvWhK%2Fw0A%2FInMMUgM0qDjz0e%2FzD6JbX8mYwj8t%2BltNZ7LDEDYg%3D%3D",
									"color": [
											"白色" //顏色
									],
									"_id": "66669d69dfd0bb2c45e6309f" // 規格的id
							},
							"quantity": 1, // 購買的數量
							"price": 800, // 此產品的總價（可能根據數量計算）
							"_id": "666ee45fdf3a67628239d207" // 此訂單產品的唯一id(這個 _id 可以用來追蹤訂單中的特定產品，例如，如果用戶想要修改訂單中的某個產品的數量，就可以使用這個 _id 來找到該產品)
					},
					{
						"product": {
								"_id": "66669d69dfd0bb2c45e6309e" //商品id
						},
						"format": { //商品規格
								"title": "白色100W", //規格名稱
								"price": 800, // 價錢
								"cost": 500, // 成本
								"stock": 300, // 庫存量
								"image": "https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/120d317c-e861-4846-a71b-22b79d021316.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=eT1wr94NsgKZNqAeHk0Np143ESO8pod8fWt8Y75GDSO0T5bws9Tp%2Fd7u6VSiCFxqSSRwqg6yuYIHchJldY3lySrlD3PTYXUSJWJJhjxYE%2BOZbtki9N0aU10GQ1IUDW7EkC9j4nwj3rnaT%2FaOY2GXlRQbyOc8m8%2BgQ82jhr9%2Fklj8ry5xZBZ82F9ECcli0JFWa1L6IIyron5QGyx0OrxpbdnACYypwc6lJFn8VKRPpZsNVckg2mkoK3%2FuICHErvTvlGxDweZl0f4T1thbfISlkJt7%2BCcOTQGFUe6MTvWhK%2Fw0A%2FInMMUgM0qDjz0e%2FzD6JbX8mYwj8t%2BltNZ7LDEDYg%3D%3D",
								"color": [
										"白色" //顏色
								],
								"_id": "66669d69dfd0bb2c45e6309i" // 規格的id
						},
						"quantity": 1, // 購買的數量
						"price": 800, // 此產品的總價（可能根據數量計算）
						"_id": "666ee45fdf3a67628239d207" // 此訂單產品的唯一id(這個 _id 可以用來追蹤訂單中的特定產品，例如，如果用戶想要修改訂單中的某個產品的數量，就可以使用這個 _id 來找到該產品)
				}
			],
			"state": 0, //訂單狀態  0:未付, 1:已付
			"totalPrice": 800, // 訂單總價
			"pay": 1, // 付款方式（目遣只會有1）  1:信用卡付款, 2:ATM匯款, 3:店到店付費 
			"address": "新店區中正路1號", // 地址
			"delivery": 1, //配送方式  1:宅配 2:黑貓宅急便 3:店到店
			"fare": 50, // 運費
			"createdAt": "2024-06-16T13:10:55.512Z", // 訂單建立時間
			"updatedAt": "2024-06-16T13:10:55.512Z" // 訂單最後更新時間
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
											products: order.products.map((product: OrderProductType) => ({
												...product,
												format: {
													...product.format,
													// 根据需要转换 format 内的其他字段
													image: product.format.image
												}
											}))
										};
									});
								});
								// 更新狀態
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
