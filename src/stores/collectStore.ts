import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { useAuthStore } from '@/stores/index';
import {
	userCollect, //22	get 會員收藏商品	 	買家端
	userCollectDelete, // 24	delete 會員取消收藏商品
	addCollect, // 221	post  會員新增收藏商品
	userFollowShops, // 23	get 會員關注店家
	userFollowShopsDelete, // 25	delete  會員取消關注店家
	addFollowShops, // 231	posr  會員關注店家
} from './api';

import { type collectType } from '../type/collectType';

export const useCollect = defineStore({
	id: 'collect',
	state: () => ({
		allData: [] as Array<collectType>, // 所有收藏商品
		data: {} as collectType, // 單一收藏商品
		allDataF: [] as any, // 所有關注商家
		dataF: {} as collectType, // 單一關注商家
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
		// 會員 取得所有收藏商品
		async getCollectAll(): Promise<void> {
			try {
				await this.setAccountType();
				const { id } = useAuthStore();
				let res;
				if (this.accountType === 'user') {
					await userCollect(id)
						.then(res => {
							console.log(res);
							this.allData = res.data;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 會員查看收藏商品
		async getCollect(_id: string, token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'user') {
					// await userCollect(token)
					// 	.then(res => {
					// 	})
					// 	.catch(err => {
					// 		alertStore.error(err.response.data.message);
					// 	});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 會員 新增 收藏商品
		async addCollect(productId: string): Promise<void> {
			try {
				const { id } = useAuthStore();
				let res;
				let data = { productId: productId };
				await addCollect(id, data)
					.then(res => {
						alertStore.success('focusProductOK');
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 會員 刪除 收藏商品
		async deleteCollect(productId: string): Promise<void> {
			try {
				const { id } = useAuthStore();
				let res;
				await userCollectDelete(id, productId)
					.then(res => {
						alertStore.success('focusProductFail');
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 會員 取得所有關注商家
		async getFollowAll(): Promise<void> {
			try {
				await this.setAccountType();
				const { id } = useAuthStore();
				let res;
				if (this.accountType === 'user') {
					await userFollowShops(id)
						.then(res => {
							console.log(res);
							this.allDataF = res.data;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},

		// 會員 新增 關注商家
		async addFollow(shop_id: string): Promise<void> {
			try {
				const { id } = useAuthStore();
				let res;
				let data = { sellerId: shop_id };
				await addFollowShops(id, data)
					.then(res => {
						console.log(res);
						alertStore.success('focusShopOK');
					})
					.catch(err => {
						console.log(err);
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 會員 刪除 關注商家
		async deleteFollow(shop_id: string): Promise<void> {
			try {
				const { id } = useAuthStore();
				let res;
				await userFollowShopsDelete(id, shop_id)
					.then(res => {
						console.log(res);
						alertStore.success('focusShopFail');
					})
					.catch(err => {
						console.log(err);
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
	},
});
