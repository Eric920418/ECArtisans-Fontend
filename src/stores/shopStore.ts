import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	type SellerPageType,
	type SellerPageProductType,
	type RecommendShopType,
	type Product,
	type SearchProduct,
	type BannerType,
} from '../type/shopType';
import { getDate } from '@/setup/globalFunction';

import {
	shop, // 58	get  賣家資訊 (seller_id: string)
	shopProducts, // 59	get  賣場商品	 (seller_id: string)
	home_popularProducts, // 27 get 首頁熱銷商品
	home_recommendShops, // 28 get 首頁推薦商家
	home_newProducts, // 29 get 首頁新品推薦
	home_followShops, // 30 get 首頁關注商家
	productAll, // 54	get 商品總覽
	productSearch, // 56 get 商品搜尋
	home_activities, // 26 get 首頁活動圖
} from './api';
import { useAuthStore } from './authStore';
import router from '@/router';

// interface ApiResponse {
// 	status: string;
// 	thisShop: Order;
// }
// https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__

/* 整理前端商品總覽、搜尋bar資料  */
function formatProduct(products: Product[]): SearchProduct[] {
	return products.map(product => {
		const lowestPrice = Math.min(...product.price);
		const starValue = product.star !== null ? product.star : 0;
		const colors = product.products_format.flatMap(
			format => format.format_color
		);

		return {
			products_id: product.products_id,
			products_name: product.products_name,
			products_images: product.products_image,
			shop_name: product.shop_name,
			price: lowestPrice,
			origin: product.origin,
			total_sales: product.total_sales,
			discount: product.discount,
			star: starValue,
			color: colors,
		};
	});
}
export const useShop = defineStore({
	id: 'shop',
	state: () => ({
		allData: [
			{
				seller_id: '1',
				activies_img: [
					'YWZkZmRnZmRnYXNkaGZhO2RzamdmZGxrZ2pma2wnZ2p3ZXBvaWZ3J29la0pSRmpmJ2RzZmY=',
					'ZHNnZG5iZ2ZuZ2gsbWpoLGdobmRobmhnbg==',
				],
				seller_image:
					'YWZkZmRnZmRnYXNkaGZhO2RzamdmZGxrZ2pma2wnZ2p3ZXBvaWZ3J29la0pSRmpmJ2RzZmY=',
				seller_name: 'lex jewelry',
				seller_info:
					'大家好! 追蹤本商場就送您20%折扣的優惠劵喔! 今後也多多支持lex jewelry!',
				seller_info_date: '20230912',
				discount: 'FIRSTSALE',
				products: [
					{
						products_id: '1',
						products_name: '當日出貨鞋子防水收納袋加厚升級版',
						products_images:
							'YWZkZmRnZmRnYXNkaGZhO2RzamdmZGxrZ2pma2wnZ2p3ZXBvaWZ3J29la0pSRmpmJ2RzZmY=',
						seller_name: '慢生活品味館',
						price: 100,
						total_sales: 25,
						discount: '免運券',
						star: 4.3,
					},
				],
			},
		] as unknown as SellerPageType[],
		sellerHomeData: {} as SellerPageType,
		sellerProductsData: [] as SellerPageProductType[],
		searchProductsData: [] as SearchProduct[],
		recommendShopData: [] as RecommendShopType[],
		followShopData: [] as RecommendShopType[],
		bannerData: [] as BannerType[],
		isLoading: false, // 請求狀態
		accountType: '',
	}),
	getters: {
		// 計算商品總覽所需的maxPrice
		maxPrice: (state): number => {
			if (state.searchProductsData.length === 0) return 50000; // 預設

			return state.searchProductsData.reduce((maxPrice, product) => {
				return Math.max(maxPrice, product.price);
			}, 0);
		},
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
		// 獲取首頁推薦商家
		async getRecommendShops(): Promise<void> {
			try {
				// 固定抓6 筆
				await home_recommendShops(16)
					.then(res => {
						// return(res.data)
						this.recommendShopData = res.data;
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取首頁熱銷商品
		async getPopularProducts(): Promise<void> {
			try {
				// 固定抓16 筆
				await home_popularProducts(16)
					.then(res => {
						// return(res.data)
						this.sellerProductsData = res.data;
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取首頁新品推薦
		async getNewProducts(): Promise<void> {
			try {
				// 固定抓8 筆
				await home_newProducts(8)
					.then(res => {
						this.sellerProductsData = res.data;
					})
					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取關注商家資訊
		async getFollowShops(): Promise<void> {
			try {
				const authStore = useAuthStore();
				if (authStore.accountType === 'user') {
					await home_followShops(authStore.token)
						.then(res => {
							this.followShopData = res.data;
						})
						.catch(err => {
							// alertStore.error(err.response.data.message);
							this.followShopData = [];
						});
				} else {
					console.log(authStore.accountType);
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取所有賣家頁面資訊
		async getShop(seller_id: string): Promise<void> {
			try {
				await shop(seller_id)
					.then(res => {
						this.sellerHomeData = res.data[0];
						// 整理資料取出banner data
						const transformActivities = (
							activities: any[],
							seller_id: string
						): BannerType[] => {
							return activities.map((activity: any) => ({
								activity_id: activity.activity_id,
								seller_id: seller_id,
								activity_image: activity.activity_image,
							}));
						};
						this.bannerData = transformActivities(
							this.sellerHomeData.activities,
							this.sellerHomeData.seller_id
						);
					})

					.catch(err => {
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取所有賣家頁面資訊
		async getShopProducts(seller_id: string): Promise<void> {
			this.sellerProductsData = [];
			try {
				await shopProducts(seller_id)
					.then(res => {
						this.sellerProductsData = res.data;
					})
					.catch(err => {
						this.sellerProductsData = []; //避免未覆蓋掉上一筆查的商品
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取商品分類的所有商品
		async getAllProductsByCategoryID(categoryID: string): Promise<void> {
			this.searchProductsData = [];
			try {
				// 固定抓8 筆
				await productAll(categoryID)
					.then(res => {
						this.searchProductsData = formatProduct(res.data);
					})
					.catch(err => {
						this.searchProductsData = [];
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取商品by 關鍵字
		async getAllProductsByKeyword(keyword: string): Promise<void> {
			this.searchProductsData = [];
			try {
				await productSearch(keyword)
					.then(res => {
						this.searchProductsData = formatProduct(res.data);
					})
					.catch(err => {
						this.sellerProductsData = [];
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 獲取Banner活動
		async getActivityBanner(): Promise<void> {
			this.bannerData = [];
			try {
				await home_activities()
					.then(res => {
						this.bannerData = res.data;
					})
					.catch(err => {
						this.bannerData = [];
						alertStore.error(err.response.data.message);
					});
			} catch (error) {
				alertStore.error('showError');
			}
		},
	},
});
