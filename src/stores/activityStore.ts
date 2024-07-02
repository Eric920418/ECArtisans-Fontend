import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	activity, // 取得活動資料
	addCoupon, // 取得優惠劵
} from './api';
import { type activityType } from '../type/activityType';

export const useActivity = defineStore({
	id: 'Activity',
	state: () => ({
		allData: [], // 賣家所有優惠劵
		shopData: {
			activity_id: '',
			seller_id: '',
			activity_name: '',
			activity_image: '',
			start_date: '',
			end_date: '',
			activity_info: '',
			coupon_id: '',
		} as activityType, // 單一張優惠劵

		isLoading: false,
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
		async getCouponAll(
			id: string,
			page: string,
			token: string
		): Promise<void> {},
		// 取得 單筆 優惠劵
		async getShopActivity(id: string): Promise<void> {
			await activity(id)
				.then(res => {
					this.shopData = res.data[0];
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
		// 取得 單筆 優惠劵
		async addCoupon(id: string, coupon_id: string): Promise<void> {
			await addCoupon(id, coupon_id)
				.then(res => {
					console.log(res);
					alertStore.success('領取成功');
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
	},
});
