import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type DetailedOrderProductType, type DetailedOrderType } from '../type/orderType';
import { getDate } from '@/setup/globalFunction';

import {
	sellerProductAll, // 31	get  賣家顯示所有商品管理 (token: string)
	sellerProductData, // 32	get 賣家商品管理(數量)	 (	seller_id: string, page: number, qty: number, category: string, token: string)
	sellerProduct, // 33	get  賣家單一商品管理 (product_id: string, token: string)
	sellerProductNew, // 34	post  賣家新增單一商品 (token: string)
	sellerProductEdit, // 35	put 賣家刪除單一優惠劵 (product_id: string, token: string)
	sellerProductDelete, // 36  Delete 賣家刪除單一商品(product_id: string, token: string)
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

// interface ApiResponse {
// 	status: string;
// 	thisShop: Order;
// }
// https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__



export const useProduct = defineStore({
	id: 'product',
	state: () => ({
		allData: [
			{
				_id: '11560165060adf',
				productName: '草莓醬',
				category: '果醬草',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 5050505050,
						price: 150150150150150,
						color: '紅色',
						stock: 2020,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
			{
				_id: '22560165060adf',
				productName: '22草莓醬',
				category: '果醬',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 50,
						price: 150,
						color: '紅色',
						stock: 20,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
			{
				_id: '33560165060adf',
				productName: '33草莓醬',
				category: '果醬',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 50,
						price: 150,
						color: '紅色',
						stock: 20,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
			{
				_id: '44560165060adf',
				productName: '44草莓醬',
				category: '果醬',
				sellerCategory: '食品',
				origin: '台灣',
				ingredient: '草莓、糖、檸檬汁',
				format: [
					{
						title: '草莓',
						cost: 50,
						price: 150,
						color: '紅色',
						stock: 20,
						image: 'url1',
					},
				],
				introduction: '好吃的草莓醬',
				production: '熬煮',
				isOnshelf: true,
				review: [
					{
						//還沒處理好 只有Schema
						userID: '456165',
						rate: 4,
						comment: '很讚',
						createAt: '2024-06-03T12:34:56.789Z',
						updateAt: '2024-06-03T12:34:56.789Z',
					},
				],
				fare: 50,
				pay: 1,
				keywords: ['罐', '果醬'],
				image: ['url1', 'url2', 'url3', 'url4'],
				sold: 0, //還沒處理好 等訂單處理好回頭處理
				createAt: '2024-06-03T12:34:56.789Z',
				updateAt: '2024-06-03T12:34:56.789Z', //日期正常不會顯示 有必要才會顯示(再跟我
			},
		] as unknown as Array<DetailedOrderProductType>, // 賣家所有商品
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
			format: {
				_id: '',
				title: '',
				price: null,
				cost: null,
				stock: null,
				color: [],
			},
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
	getters: {
		// // 獲取所有訂單
		// gettingAllOrders(state) {
		// 	return state.allOrders;
		// },
		// // 獲取單筆訂單
		// gettingSingleOrder(state) {
		// 	return state.oneOrder;
		// },
	},
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
							console.log(res.products)
							this.allData = res.products;
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
							// isData.startDate = getDate(isData.startDate);
							// isData.endDate = getDate(isData.endDate);
							// isData.type = parseInt(isData.type);
							// isData.discountConditions = parseInt(isData.discountConditions);
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
		async newProduct(data: any): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				let res;
				// data.startDate = getISO(data.startDate, 'start');
				// data.endDate = getISO(data.endDate, 'end');
				data.isEnabled = true;
				if (data.productType === 0) delete data.productChoose;
				if (data.type === 0) delete data.percentage;
				alertStore.success('productDelete');
				console.log('新增', data);
				console.log(this.accountType);
				if (this.accountType === 'seller') {
					await sellerProductNew(data, authStore.token)
						.then(res => {
							console.log(res);
						})
						.catch(err => {
							console.log(err);
							// alertStore.error(err.response.data.message);
						});
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 更新 單筆 商品
		async getProductEdit(data: any): Promise<void> {
			try {
				await this.setAccountType();
				const authStore = useAuthStore();
				console.log('更新前發送的authStore.token', authStore.token); //可以使用
				console.log('更新前發送的data._id', this.data._id); //可以使用
				let res;
				// data.startDate = getISO(data.startDate, 'start');
				// data.endDate = getISO(data.endDate, 'end');

				// if (data.productType === 0) delete data.productChoose;
				// if (data.type === 0) delete data.percentage;
				console.log('更新前發送的', data);
				if (this.accountType === 'seller' && this.data._id) {
					await sellerProductEdit(
						this.data._id,
						JSON.stringify(data),
						authStore.token
					)
						.then(res => {
							console.log(res);
							alertStore.success('renewOK');
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
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
							alertStore.success('productDelete');
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
	},
});
