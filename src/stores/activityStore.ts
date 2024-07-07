import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { getDate, getISO } from '@/setup/globalFunction';
import {
	uploadImage, //取得圖片
	sellerActivityAll, // 商家取得活動所有資料
	sellerActivity, // 商家取得 單筆 活動資料
	sellerActivityNew, // 商家 新增 活動資料
	sellerActivityEdit, // 商家 修改 活動資料
	sellerActivityDelete, // 商家 刪除 活動資料
	activity, // 取得活動資料
	addCoupon, // 取得優惠劵
} from './api';
import { type activityType, type activityAllType } from '../type/activityType';
import { useAuthStore } from './authStore';
import router from '@/router';

export const useActivity = defineStore({
	id: 'Activity',
	state: () => ({
		allData: [] as Array<activityAllType>, // 賣家所有活動
		data: {} as activityAllType, // 賣家 單筆 活動
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
		// 取得 前台(未登入) 活動詳情
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

		// 商家取得活動所有資料
		async getActivityAll(): Promise<void> {
			const auth = useAuthStore();
			await sellerActivityAll(auth.token)
				.then(res => {
					console.log('活動所有資料', res);
					this.allData = res.data;
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
		// 商家取得 單筆 活動資料
		async getActivity(activity_id: string): Promise<void> {
			const auth = useAuthStore();
			await sellerActivity(activity_id, auth.token)
				.then(res => {
					let data = res;
					data.start_date = getDate(data.start_date);
					data.end_date = getDate(data.end_date);

					this.data = data;
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
		// 商家 新增 活動資料
		async newActivity(): Promise<void> {
			const auth = useAuthStore();
			let data = this.data;
			if (data.start_date && data.end_date) {
				data.start_date = getISO(data.start_date.toString(), 'start');
				data.end_date = getISO(data.end_date.toString(), 'end');
			}
			await sellerActivityNew(data, auth.token)
				.then(res => {
					alertStore.success('新增成功');
					router.go(-1);
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
		// 商家 修改 活動資料
		async editActivity(activity_id: string): Promise<void> {
			const auth = useAuthStore();
			let data = this.data;
			if (data.start_date && data.end_date) {
				data.start_date = getISO(data.start_date.toString(), 'start');
				data.end_date = getISO(data.end_date.toString(), 'end');
			}
			await sellerActivityEdit(activity_id, data, auth.token)
				.then(res => {
					alertStore.success('修改成功');
					router.go(-1);
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
		// 商家 刪除 活動資料
		async deleteActivity(activity_id: string): Promise<void> {
			const auth = useAuthStore();
			await sellerActivityDelete(activity_id, auth.token)
				.then(res => {
					alertStore.success('刪除成功');
					router.go(-1);
				})
				.catch(err => {
					alertStore.error(err.response.data.message);
				});
		},
		// 取得圖片
		async getImgUrl(data: any) {
			try {
				const auth = useAuthStore();
				if (data && auth.token && data !== null && auth.token !== null) {
					this.isLoading = true;
					const formData = new FormData();
					formData.append('image', data);
					await uploadImage(formData, auth.token)
						.then(res => {
							this.data.activity_image = res.fileUrl;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
					this.isLoading = false;
				} else {
					alertStore.error('找不到資料或登入過期');
				}
			} catch (error) {
				this.isLoading = false;
				alertStore.error('renewError');
			}
		},
	},
});
