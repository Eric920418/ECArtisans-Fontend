import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type CouponType } from '../type/couponType';
import { getDate, getISO } from '@/setup/globalFunction';

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

export const useCoupon = defineStore({
	id: 'coupon',
	state: () => ({
		allData: [] as Array<CouponType>, // 賣家所有優惠劵
		data: {
			_id: '',
			seller_id: '',
			couponName: '',
			startDate: null,
			endDate: null,
			type: null,
			discountConditions: null,
			percentage: null,
			productType: null,
			productChoose: [],
			isEnabled: true,
		} as CouponType, // 賣家所有優惠劵
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
					console.log('正在發送');
					await sellerCouponAll(token)
						.then(res => {
							console.log('發送');
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
		// 獲取 單筆 優惠劵
		async getCoupon(coupon_id: string, token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'seller') {
					await sellerCoupon(coupon_id, token)
						.then(res => {
							console.log(res);
							const isData = res.Coupons[0];
							isData.startDate = getDate(isData.startDate);
							isData.endDate = getDate(isData.endDate);
							isData.type = parseInt(isData.type);
							isData.discountConditions = parseInt(isData.discountConditions);
							isData.productType = parseInt(isData.productType);
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
		// 更新 單筆 優惠劵
		async getCouponEdit(data: CouponType, token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (
					Object.hasOwn(data, 'startDate') &&
					Object.hasOwn(data, 'endDate') &&
					typeof data.startDate === 'string' &&
					typeof data.endDate === 'string'
				) {
					data.startDate = getISO(data.startDate, 'start');
					data.endDate = getISO(data.endDate, 'end');
					data.startDate = data.startDate.toString();
					data.endDate = data.endDate.toString();
				}

				let coupon_id;
				if (this.data._id) {
					coupon_id = this.data._id;
					data.isEnabled = true;
				}
				console.log(data);
				if (this.accountType === 'seller' && coupon_id) {
					await sellerCouponEdit(coupon_id, JSON.stringify(data), token)
						.then(res => {
							console.log(res);
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
