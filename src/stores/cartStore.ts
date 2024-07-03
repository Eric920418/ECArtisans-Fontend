import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例

import {
	type SellerPageType,
	type SellerPageProductType,
	type RecommendShopType,
} from '../type/shopType';
import { getDate } from '@/setup/globalFunction';

import {
	cartAll, // 47 買家顯示所有購物車
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		allData: [] as any,
		isLoading: false, // 請求狀態
		accountType: '',
	}),

	actions: {
		// 獲取購物車資料
		async getAllCart(): Promise<void> {
			try {
				const authStore = useAuthStore();
				await cartAll(authStore.token)
					.then(res => {
						console.log(res);
						this.allData = res;
					})
					.catch(err => {
						// this.sellerProductsData = []
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		async addItemToCart(): Promise<void> {
			console.log('待修')
		}
	},
});
