import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { cartAll, cartNew, cartPut, cartDeleteAll, cartDelete } from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

export const useCartStore = defineStore('cart', {
	state: () => ({
		cart: null as any,
		isLoading: false,
	}),
	actions: {
		async fetchCart() {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
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
		async addItemToCart(item: {
			productId: string;
			formatId: string;
			quantity: number;
		}) {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartNew(item, token);
				this.fetchCart();
				alertStore.success('商品加入購物車');
			} catch (error) {
				alertStore.error('商品加入購物車失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async updateItemInCart(item: {
			productId: string;
			formatId: string;
			quantity: number;
		}) {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartPut(item, token);
				this.fetchCart();
				alertStore.success('商品已被更新');
			} catch (error) {
				alertStore.error('商品更新失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async removeItemFromCart(cart_id: string) {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartDelete(token, cart_id);
				this.fetchCart();
				alertStore.success('商品加入購物車失敗');
			} catch (error) {
				alertStore.error('加入購物車失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async clearCart() {
			const authStore = useAuthStore();
			const token = authStore.token;
			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				this.isLoading = true;
				await cartDeleteAll(token);
				this.cart = null;
				alertStore.success('購物車清除成功');
			} catch (error) {
				alertStore.error('清購物車失敗');
			} finally {
				this.isLoading = false;
			}
		},
	},
});
