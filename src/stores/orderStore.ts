import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	type OrderDetailType,
	type OrderType,
	type UserOrderType,
} from '../type/orderType';
import { getDate } from '@/setup/globalFunction';

import {
	sellerOrderAll, // 12	get  商家訂單管理
	sellerOrder, // 13	get  商家單一訂單管理
	userOrderAll, // 17 get 買家訂單管理
	userOrder, //18 get 買家訂單詳情
	rating, // 19 post 買家評價
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

export const useOrder = defineStore({
	id: 'order',
	state: () => ({
		allData: [
			// {
			// 		"_id": "",
			// 		"products": [
			// 				{
			// 						"format": {
			// 								"image": ""
			// 						}
			// 				}
			// 		],
			// 		"state": 0,
			// 		"totalPrice": 0,
			// 		"createdAt": "",
			// 		"updatedAt": ""
			// }
		] as OrderType[],
		userData: [] as UserOrderType[],
		orderDetail: {} as OrderDetailType,
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
		// 獲取賣家所有訂單
		async gettingAllOrders(): Promise<void> {
			try {
				await this.setAccountType();
				if (this.accountType === 'seller') {
					const authStore = useAuthStore();
					await sellerOrderAll(authStore.token)
						.then(res => {
							console.log(res.orders);
							// 轉換 sellerCategory
							const processedOrders = res.orders.map(
								(orderGroup: { order: OrderType[] }) => {
									return orderGroup.order.map((order: OrderType) => {
										return {
											...order,
											products: order.products.map(product => ({
												...product,
												format: {
													...product.format,
													// 根据需要转换 format 内的其他字段
													image: product.format.image,
												},
											})),
										};
									});
								}
							);
							// 更新狀態
							this.allData = processedOrders[0];
							alertStore.success('訂單取得成功');
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				} else if (this.accountType === 'user') {
					const authStore = useAuthStore();
					await userOrderAll(authStore.token)
						.then(res => {
							console.log(res.orders);

							// 轉換 sellerCategory
							const processedOrders = res.orders.map(
								(order: {
									_id: any;
									products: any[];
									state: any;
									totalPrice: any;
									createdAt: any;
									updatedAt: any;
								}) => ({
									_id: order._id,
									products: order.products.map(product => ({
										format: {
											image: product.format.image, // 這裡根據需求設置空字符串或其他值
										},
									})),
									state: order.state,
									totalPrice: order.totalPrice,
									createdAt: order.createdAt,
									updatedAt: order.updatedAt,
								})
							);
							this.allData = processedOrders;
							console.log('Processed Orders:', this.allData); // 打印调试信息

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
		// 獲取單筆詳細訂單
		async gettingOneOrder(order_id: string): Promise<void> {
			try {
				await this.setAccountType();
				if (this.accountType === 'seller') {
					const authStore = useAuthStore();
					await sellerOrder(order_id, authStore.token)
						.then(res => {
							this.orderDetail = res.order;
							alertStore.success('詳細訂單取得成功');
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				} else {
					const authStore = useAuthStore();
					await userOrder(order_id, authStore.token)
						.then(res => {
							this.orderDetail = res.order;
							console.log(res.order);
							alertStore.success('詳細訂單取得成功');
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 新增買家評價
		async rating(order_id: string, product_id: string): Promise<void> {
			console.log(order_id, product_id)

			try {
				await this.setAccountType();
				if (this.accountType === 'user') {
					const authStore = useAuthStore();
					const rate = '5'
					await rating(order_id, product_id, authStore.token, {"rate":rate})
						.then(res => {
							console.log(res);
							alertStore.success('評價成功');
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
