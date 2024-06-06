import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	sellerCouponAll, // 42	get  賣家顯示所有優惠劵 (seller_id: string, page: number)
	sellerCoupon, // 43	get 賣家顯示單一優惠劵 (seller_id: string, coupon_id: string)
	sellerCouponNew, // 44	post 	賣家新增優惠劵 (data: any)
	sellerCouponEdit, // 45	put  	賣家修改優惠劵 (coupon_id: string)
	sellerCouponDelete, // 46	delete 賣家刪除單一優惠劵 (coupon_id: string)
} from './api';

// /:order_id
// 單一訂單用這隻
// 頁面要先呈現
// /:seller_id/orders

// 指定賣家的所有訂單

// interface ApiResponse {
// 	status: string;
// 	thisShop: Order;
// }

export const useCoupon = defineStore({
	id: 'coupon',
	state: () => ({
		allData: [
			{
				id: '560165060adf',
				seller_id: '5465461sda',
				discountName: '1節優惠',
				start_date: 1694705214,
				due_date: 1713705214,
				type: 0,
				priceOver: 300,
				percentage: 80,
				productType: 0,
				productChoose: [],
				isEnabled: true,
			},
			{
				id: '560165060adf',
				seller_id: '5465461sda',
				discountName: '2情人節優惠',
				start_date: 1694705214,
				due_date: 1713705214,
				type: 0,
				priceOver: 300,
				percentage: 80,
				productType: 0,
				productChoose: [],
				isEnabled: true,
			},
			{
				id: '560165060adf',
				seller_id: '5465461sda',
				discountName: '3情人節優惠',
				start_date: 1694705214,
				due_date: 1713705214,
				type: 0,
				priceOver: 300,
				percentage: 80,
				productType: 0,
				productChoose: [],
				isEnabled: true,
			},
			{
				id: '560165060adf',
				seller_id: '5465461sda',
				discountName: '4情人節優惠',
				start_date: 1694705214,
				due_date: 1713705214,
				type: 0,
				priceOver: 300,
				percentage: 80,
				productType: 0,
				productChoose: [],
				isEnabled: true,
			},
			{
				id: 'aaaadf',
				seller_id: '5465461sda',
				discountName: '5測試優惠劵',
				start_date: 1694705214,
				due_date: 1713705214,
				type: 0,
				priceOver: 300,
				percentage: 80,
				productType: 0,
				productChoose: [],
				isEnabled: true,
			},
			{
				id: '560165060adf',
				seller_id: '5465461sda',
				discountName: '6情人節優惠',
				start_date: 1694705214,
				due_date: 1713705214,
				type: 0,
				priceOver: 300,
				percentage: 80,
				productType: 0,
				productChoose: [],
				isEnabled: true,
			},
			// {
			// 	id: 'aaaadf',
			// 	seller_id: '5465461sda',
			// 	discountName: '7測試優惠劵',
			// 	start_date: 1694705214,
			// 	due_date: 1713705214,
			// 	type: 0,
			// 	priceOver: 300,
			// 	percentage: 80,
			// 	productType: 0,
			// 	productChoose: [],
			// 	isEnabled: true,
			// },
			// {
			// 	id: '560165060adf',
			// 	seller_id: '5465461sda',
			// 	discountName: '8情人節優惠',
			// 	start_date: 1694705214,
			// 	due_date: 1713705214,
			// 	type: 0,
			// 	priceOver: 300,
			// 	percentage: 80,
			// 	productType: 0,
			// 	productChoose: [],
			// 	isEnabled: true,
			// },
			// {
			// 	id: 'aaaadf',
			// 	seller_id: '5465461sda',
			// 	discountName: '9測試優惠劵',
			// 	start_date: 1694705214,
			// 	due_date: 1713705214,
			// 	type: 0,
			// 	priceOver: 300,
			// 	percentage: 80,
			// 	productType: 0,
			// 	productChoose: [],
			// 	isEnabled: true,
			// },
			// {
			// 	id: '560165060adf',
			// 	seller_id: '5465461sda',
			// 	discountName: '10情人節優惠',
			// 	start_date: 1694705214,
			// 	due_date: 1713705214,
			// 	type: 0,
			// 	priceOver: 300,
			// 	percentage: 80,
			// 	productType: 0,
			// 	productChoose: [],
			// 	isEnabled: true,
			// },
			// {
			// 	id: 'aaaadf',
			// 	seller_id: '5465461sda',
			// 	discountName: '11測試優惠劵',
			// 	start_date: 1694705214,
			// 	due_date: 1713705214,
			// 	type: 0,
			// 	priceOver: 300,
			// 	percentage: 80,
			// 	productType: 0,
			// 	productChoose: [],
			// 	isEnabled: true,
			// },
		], // 賣家所有訂單
		pagination: {}, // 賣家所有訂單
		// oneData: null as Order | null, // 賣家單筆訂單詳情
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
		// // 一個通用的 API 處理所有請求
		// async handleApiCall<T>(
		// 	apiFunction: () => Promise<T>,
		// 	successMessage: string = '操作成功',
		// 	errorMessage: string = '操作失敗'
		// ): Promise<T | undefined> {
		// 	this.isLoading = true;
		// 	try {
		// 		const res = await apiFunction(); // 發送 API 請求
		// 		alertStore.success(successMessage); // 請求成功，顯示成功訊息
		// 		return res; // 返回請求結果
		// 	} catch (error) {
		// 		this.handleError(error, errorMessage); // 處理錯誤
		// 	} finally {
		// 		this.isLoading = false; // 請求結束，取消加載狀態
		// 	}
		// },
		async setAccountType(): Promise<void> {
			const currentPagePath = window.location.hash;
			if (currentPagePath.includes('/seller')) {
				this.accountType = 'seller';
			} else if (currentPagePath.includes('/user')) {
				this.accountType = 'user';
			}
		},
		// 獲取所有優惠劵
		async getCouponAll(id: string, page: string, token: string): Promise<void> {
			try {
				let res;
				if (id && this.accountType === 'seller') {
					await sellerCouponAll(id, page, token)
						.then(res => {
							this.allData = res.coupons;
							this.pagination = res.pagination;
							console.log(res);
						})
						.catch(err => {
							console.log(err);
							alertStore.error(err.response.data.message);
						});
				} else if (id && this.accountType === 'user') {
					// await user(id)
					// 	.then(res => {
					// 		this.user = res.data;
					// 	})
					// 	.catch(err => {
					// 		alertStore.error(err.response.data.message);
					// 	});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
	},
});
