import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type CouponType } from '../type/couponType';
import { getDate, getISO } from '@/setup/globalFunction';
import { useAuthStore } from './authStore';

import {
	sellerCouponAll, // 42	get  賣家顯示所有優惠劵 (seller_id: string, page: number)
	sellerCoupon, // 43	get 賣家顯示單一優惠劵 (seller_id: string, coupon_id: string)
	sellerCouponNew, // 44	post 	賣家新增優惠劵 (data: any)
	sellerCouponEdit, // 45	put  	賣家修改優惠劵 (coupon_id: string)
	sellerCouponDelete, // 46	delete 賣家刪除單一優惠劵 (coupon_id: string)
} from './api';
import router from '@/router';

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
		// 獲取 單筆 優惠劵
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
		// 新增 單筆 優惠劵
		async newCoupon(data: any): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				let res;
				data.startDate = getISO(data.startDate, 'start');
				data.endDate = getISO(data.endDate, 'end');
				data.isEnabled = true;
				if (data.productType === 0) delete data.productChoose;
				if (data.type === 0) delete data.percentage;
				alertStore.success('couponDelete');
				if (this.accountType === 'seller') {
					await sellerCouponNew(data, authStore.token)
						.then(res => {})
						.catch(err => {
							// alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 更新 單筆 優惠劵
		async getCouponEdit(data: any): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				let res;
				data.startDate = getISO(data.startDate, 'start');
				data.endDate = getISO(data.endDate, 'end');

				// if (data.productType === 0) delete data.productChoose;
				// if (data.type === 0) delete data.percentage;
				if (this.accountType === 'seller' && this.data._id) {
					await sellerCouponEdit(
						this.data._id,
						JSON.stringify(data),
						authStore.token
					)
						.then(res => {
							alertStore.success('renewOK');
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 刪除 單筆 優惠劵
		async deleteCoupon(): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				if (this.accountType === 'seller' && this.data._id) {
					await sellerCouponDelete(this.data._id, authStore.token)
						.then(res => {
							alertStore.success('couponDelete');
							router.go(-1);
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
