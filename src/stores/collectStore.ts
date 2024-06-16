import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例

import {
	userCollect, //22	get 會員收藏商品	 	買家端
	userFollowShops, // 23	get 會員關注店家
	userCollectDelete, // 24	delete 會員取消收藏商品
	userFollowShopsDelete, // 25	delete  會員取消關注店家
} from './api';
import { id } from 'element-plus/es/locale/index.mjs';

export const useCoupon = defineStore({
	id: 'coupon',
	state: () => ({
		allData: [] as any, // 賣家所有優惠劵
		data: {} as Object, // 賣家所有優惠劵
		isLoading: false, // 請求狀態
		accountType: '',
	}),
	getters: {},
	actions: {
		async setAccountType(): Promise<void> {
			const currentPagePath = window.location.hash;
			if (currentPagePath.includes('/seller')) {
				this.accountType = 'seller';
			} else if (currentPagePath.includes('/user')) {
				this.accountType = 'user';
			}
		},
		// 會員查看收藏商品
		async getCollect(_id: string, token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'user') {
					console.log('正在發送');
					// await userCollect(token)
					// 	.then(res => {
					// 		console.log(res);

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
