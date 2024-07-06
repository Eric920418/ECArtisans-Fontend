import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { useAuthStore } from '@/stores/index';
import {
	userCollect, //22	get 會員收藏商品	 	買家端
	userFollowShops, // 23	get 會員關注店家
	userCollectDelete, // 24	delete 會員取消收藏商品
	userFollowShopsDelete, // 25	delete  會員取消關注店家
	addCollect, // 221	post  會員新增收藏商品
} from './api';

export const useCollect = defineStore({
	id: 'collect',
	state: () => ({
		allData: [] as any, // 所有關注
		data: {} as Object, // 單一關注
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
		// 會員查看收藏商品
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
		// 會員刪除收藏商品 /users/{user_id}/collect/{product_id}
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
	},
});
