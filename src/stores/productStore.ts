import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	type DetailedOrderProductType,
	type DetailedOrderType,
	type ShopProductsType,
} from '../type/orderType';

import { getDate } from '@/setup/globalFunction';

import {
	uploadImage,
	sellerProductAll, // 31	get  賣家顯示所有商品管理 (token: string)
	sellerProductOnShelf, // 32	get 賣家商品管理(數量)	 (	seller_id: string, page: number, qty: number, category: string, token: string)
	sellerProductData, // 32	get 賣家商品管理(數量)	 (	seller_id: string, page: number, qty: number, category: string, token: string)
	sellerProduct, // 33	get  賣家單一商品管理 (product_id: string, token: string)
	sellerProductNew, // 34	post  賣家新增單一商品 (token: string)
	sellerProductEdit, // 35	put 賣家刪除單一優惠劵 (product_id: string, token: string)
	sellerProductDelete, // 36  Delete 賣家刪除單一商品(product_id: string, token: string)
	product,
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

// interface ApiResponse {
// 	status: string;
// 	thisShop: Order;
// }
// https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__

// 定義類別
const categoryMapping: Record<number, string> = {
	1: '娛樂',
	2: '服飾',
	3: '3C產品',
	4: '食品',
	5: '家具',
	6: '運動用品',
	7: '寵物用品',
	8: '生活用品',
	9: '清潔用品',
	10: '其他',
};

// 從數字轉成對應類別
function convertCategoryNumbersToNames(categoryNumbers: Array<number>): string {
	const categories = categoryNumbers.map(number => categoryMapping[number]);
	return categories.length === 1 ? categories[0] : categories.join(', ');
}

export const useProduct = defineStore({
	id: 'product',
	state: () => ({
		allData: [] as Array<DetailedOrderProductType>, // 賣家所有商品
		shopData: {
			products_id: '',
			products_format: [],
			products_name: '',
			all_images: [],
			products_info: '',
			production_material: '',
			production_method: '',
			production_country: '',
			payment: '',
			freight: 0,
			discount: [],
			star: 0,
			stock: 0,
			total_sales: 0,
			total_collect: 0,
			seller_name: '',
			seller_id: '',
			shop_image: '',
		} as unknown as ShopProductsType,
		data: {
			_id: '',
			seller_id: '',
			sellerCategory: [], //商品主要類別
			category: [],
			isOnshelf: null,

			review: [],
			reviews: [],

			sold: null,
			productName: '',
			type: [],
			sellerType: [],
			origin: '',
			ingredient: '',
			introduction: '',
			format: [
				{
					_id: '',
					title: '',
					price: null,
					cost: null,
					stock: 0,
					color: [],
					image: '',
				},
			],
			introduce: '',
			production: '',
			state: null,
			evaluate: [],
			haveStore: '',
			fare: null,
			pay: [], //1:信用卡付款 2.ATM匯款 3.店到店付費

			keyword: [],
			keywords: [],
			createAt: '',
			updateAt: '',
			image: [],
		} as unknown as DetailedOrderProductType, // 賣家所有訂單
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
		// 獲取所有商品
		async getProductsAll(token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'seller') {
					const authStore = useAuthStore();
					await sellerProductAll(authStore.token)
						.then(res => {
							// 轉換 sellerCategory
							const processedProducts = res.products.map(
								(product: { sellerCategory: number[] }) => ({
									...product,
									sellerCategory: convertCategoryNumbersToNames(
										product.sellerCategory
									),
								})
							);
							// 更新狀態
							this.allData = processedProducts;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取單一商品
		async getProduct(product_id: string, token: string): Promise<void> {
			try {
				await this.setAccountType();
				let res;
				if (this.accountType === 'seller') {
					const authStore = useAuthStore();
					await sellerProduct(product_id, authStore.token)
						.then(res => {
							const isData = res.products[0];
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
		// 新增 單筆 商品
		async newProduct(): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				let res;
				const data = {
					productName: this.data.productName,
					sellerCategory: this.data.sellerCategory,
					category: this.data.category,
					origin: this.data.origin,
					ingredient: this.data.ingredient,
					format: this.data.format,
					introduction: this.data.introduction,
					production: this.data.production,
					fare: this.data.fare,
					pay: this.data.pay,
					image: this.data.image,
					isOnshelf: true,
				};
				if (this.accountType === 'seller') {
					await sellerProductNew(JSON.stringify(data), authStore.token)
						.then(res => {
							alertStore.success('newOK');
							router.go(-1);
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 更新 單筆 商品
		async getProductEdit(): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				let res;
				if (this.accountType === 'seller' && this.data._id) {
					console.log(this.data);
					await sellerProductEdit(
						this.data._id,
						JSON.stringify(this.data),
						authStore.token
					)
						.then(res => {
							alertStore.success('renewOK');
							router.go(-1);
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 修改訂單 狀態 上架 下架
		async onshelfEdit(onshelf: boolean): Promise<void> {
			try {
				const authStore = useAuthStore();
				let res;
				console.log(onshelf);
				await sellerProductOnShelf(
					this.data._id,
					JSON.stringify({ isOnshelf: onshelf }),
					authStore.token
				)
					.then(res => {
						console.log(res);
						alertStore.success('renewOK');
						router.go(-1);
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 刪除 單筆 商品
		async deleteProduct(): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				if (this.accountType === 'seller' && this.data._id) {
					await sellerProductDelete(this.data._id, authStore.token)
						.then(res => {
							alertStore.success('deleteOK');
							router.go(-1);
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 取得圖片
		async getImgUrl(data: any, token: string) {
			try {
				if (data && token && data !== null && token !== null) {
					this.isLoading = true;
					const formData = new FormData();
					formData.append('image', data);
					await uploadImage(formData, token)
						.then(res => {
							this.data.image.push(res.fileUrl);
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
		// 取得 (未登入) 單一商品詳情
		async getShopProduct(id: string) {
			try {
				await product(id)
					.then(res => {
						this.shopData = res.data;
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				this.isLoading = false;
				alertStore.error('renewError');
			}
		},
	},
});
