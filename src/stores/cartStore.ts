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
	cartNew, // 48 新增購物車
	cartPut,
	cartDeleteAll,
	cartDelete,
	selectItemsCart,
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		cart: [] as any,
		isLoading: false, // 請求狀態
		accountType: '',
	}),

	actions: {
		// 獲取購物車資料
		async getAllCart(): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				// router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				const response = await cartAll(token);
				console.log(response);
				this.cart = response.cart;
			} catch (error) {
				alertStore.error('取資料失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async addItemToCart(data: any): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartNew(data, token);
				this.getAllCart();
				alertStore.success('商品加入購物車');
			} catch (error) {
				alertStore.error('商品加入購物車失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async updateItemInCart(
			data: any,
			productId: string,
			formatId: string
		): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartPut(data, token, productId, formatId);
				this.getAllCart();
				alertStore.success('購物車更新成功');
			} catch (error) {
				alertStore.error('更新購物車失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async removeItemFromCart(
			productId: string,
			formatId: string
		): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartDelete(token, productId, formatId);
				this.getAllCart();
				alertStore.success('商品移除成功');
			} catch (error) {
				alertStore.error('移除商品失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async selectedCart(data: any): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;

			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await selectItemsCart(data, token);
				alertStore.success('商品送去確認訂單頁面');
			} catch (error) {
				alertStore.error('商品送去確認訂單頁面失敗');
			} finally {
				this.isLoading = false;
			}
		},
	},
});
