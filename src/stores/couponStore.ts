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
				if (this.accountType === 'seller') {
					await sellerCouponNew(data, authStore.token)
						.then(res => {
							alertStore.success('newOK');
							router.go(-1);
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
							// alertStore.error('newError');
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
							// alertStore.error('renewError');
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
							// alertStore.error('deleteError');
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
	},
});
