import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type DetailedOrderType } from '../type/orderType';
import { getDate } from '@/setup/globalFunction';

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
// https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__

export const useProduct = defineStore({
	id: 'product',
	state: () => ({
		allData: [
			{
				_id: '11560165060adf',
				productName: '草莓醬',
				category: '果醬草',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 5050505050,
						price: 150150150150150,
						color: '紅色',
						stock: 2020,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
			{
				_id: '22560165060adf',
				productName: '22草莓醬',
				category: '果醬',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 50,
						price: 150,
						color: '紅色',
						stock: 20,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
			{
				_id: '33560165060adf',
				productName: '33草莓醬',
				category: '果醬',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 50,
						price: 150,
						color: '紅色',
						stock: 20,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
			{
				_id: '44560165060adf',
				productName: '44草莓醬',
				category: '果醬',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 50,
						price: 150,
						color: '紅色',
						stock: 20,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
		] as unknown as Array<DetailedOrderType>, // 賣家所有優惠劵
		data: {
			_id: '',
			orderNumber: '',
			date: '',
			products: [],
			state: 0,
			price: 0,
			pay: 0,
		} as DetailedOrderType, // 賣家所有優惠劵
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
		// 獲取所有優惠劵
		async getCouponAll(token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'seller') {
					await sellerCouponAll(token)
						.then(res => {
							this.allData = res.Coupons;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取所有優惠劵
		async getCoupon(coupon_id: string, token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'seller') {
					await sellerCoupon(coupon_id, token)
						.then(res => {
							const isData = res.Coupons[0];
							isData.startDate = getDate(isData.startDate);
							isData.endDate = getDate(isData.endDate);
							isData.type = parseInt(isData.type);
							isData.discountConditions = parseInt(isData.discountConditions);
							this.data = isData;
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
