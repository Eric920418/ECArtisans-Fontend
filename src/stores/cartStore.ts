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
	userOrderNew, // 52 成立訂單
	userOrderPay, // 金流
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

// interface Order {
// 	_id: string;
// }

export const useCartStore = defineStore({
	id: 'cart',
	state: () => ({
		cart: [] as any,
		selectdata: {} as any,
		isLoading: false, // 請求狀態
		accountType: '',
	}),
	getters: {
    totalItems: (state) => {
      return state.cart.reduce((total: any, cartGroup: { items: string | any[]; }) => {
        return total + cartGroup.items.length;
      }, 0);
    },
    cartNum: (state) => {
      const totalItems = state.cart.reduce((total: any, cartGroup: { items: string | any[]; }) => {
        return total + cartGroup.items.length;
      }, 0);
      return totalItems > 100 ? '99+' : totalItems.toString();
    }
  },
	actions: {
		// 獲取購物車資料
		async getAllCart(): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;
			const accountType = authStore.accountType;
			// if (!token) {
			// 	alertStore.error('使用者未登入');
			// 	// router.push('/user-login');
			// 	return;
			// }

			if (accountType == 'user' && token) {
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
			} else {
				this.cart = [];
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
				selectItemsCart(JSON.stringify(data), token)
					.then(res => {
						this.selectdata = res.groupedItems;
						alertStore.success('商品送去確認訂單頁面');
						router.push({ name: 'CartCheck' });
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('商品送去確認訂單頁面失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async orderNew(data: any): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;

			if (!token) {
				alertStore.error('使用者未登入');
				router.push('/user-login');
				return;
			}

			try {
				console.log('資料結果:', data, token);
				const res = await userOrderNew(data, token);
				console.log(res);
				await this.orderPay({ orderId: res.order._id });
			} catch (err) {
				alertStore.error('訂單成立失敗');
			} finally {
				this.isLoading = false;
			}
		},
		async orderPay(data: any): Promise<void> {
			const authStore = useAuthStore();
			const token = authStore.token;
			try {
				await userOrderPay(data, token);
			} catch (err) {
				console.log(err);
			}
		},
	},
});
