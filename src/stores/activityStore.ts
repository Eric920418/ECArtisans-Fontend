import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import {
	sellerCouponAll, // 42	get  賣家顯示所有優惠劵 (seller_id: string, page: number)
	sellerCoupon, // 43	get 賣家顯示單一優惠劵 (seller_id: string, coupon_id: string)
	sellerCouponNew, // 44	post 	賣家新增優惠劵 (data: any)
	sellerCouponEdit, // 45	put  	賣家修改優惠劵 (coupon_id: string)
	sellerCouponDelete, // 46	delete 賣家刪除單一優惠劵 (coupon_id: string)
} from './api';

// /:order_id
// 單一訂單用這隻
// 頁面要先呈現
// /:seller_id/orders

// 指定賣家的所有訂單

// interface ApiResponse {
// 	status: string;
// 	thisShop: Order;
// }
// https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__

export const useActivity = defineStore({
	id: 'Activity',
	state: () => ({
		allData: [
			{
				activity_id: '20240318-00028',
				activity_name: '滿千折百,最高折$500!',
				activity_images:
					'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
				activity_type: '活動',
				activity_info:
					'親愛的食客們, 隨著春風拂面,我們迎來了一場美食盛宴!2024年春日美食嘉年華即將於4月10日至4月15日盛大開幕!這將是一場讓您的味蕾狂歡的盛宴,一個讓您品味各國美食的絕佳機會! 我們的網上商城將為您帶來來自世界各地的頂級美食,從濃郁的義大利意粉到清新的日式壽司,從香辣的泰式料理到精緻的法式點心,應有盡有!我們的食品來源於最優質的供應商,保證新鮮、美味、安全! 在春日美食嘉年華期間,您還可以參加各種精彩的活動!我們將舉辦線上烹飪課程,讓您學習到各種國家的美食烹飪技巧;我們還有抽獎活動,豐富的獎品等您拿!無論您是美食愛好者還是廚藝高手,這都是您不容錯過的一次盛會! 請即訪問我們的網上商城,準備好迎接一場美食之旅!記得在4月10日至4月15日期間蒞臨,與我們一同共享春日美食嘉年華的樂趣! 期待與您共度美好時光!',
				start_date: '202401200000',
				end_date: '202402202359',
				discount: '滿千折百',
			},
		], // 賣家所有訂單
		pagination: {}, // 賣家所有訂單
		// oneData: null as Order | null, // 賣家單筆訂單詳情
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
		// // 一個通用的 API 處理所有請求
		// async handleApiCall<T>(
		// 	apiFunction: () => Promise<T>,
		// 	successMessage: string = '操作成功',
		// 	errorMessage: string = '操作失敗'
		// ): Promise<T | undefined> {
		// 	this.isLoading = true;
		// 	try {
		// 		const res = await apiFunction(); // 發送 API 請求
		// 		alertStore.success(successMessage); // 請求成功，顯示成功訊息
		// 		return res; // 返回請求結果
		// 	} catch (error) {
		// 		this.handleError(error, errorMessage); // 處理錯誤
		// 	} finally {
		// 		this.isLoading = false; // 請求結束，取消加載狀態
		// 	}
		// },
		async setAccountType(): Promise<void> {
			const currentPagePath = window.location.hash;
			if (currentPagePath.includes('/seller')) {
				this.accountType = 'seller';
			} else if (currentPagePath.includes('/user')) {
				this.accountType = 'user';
			}
		},
		// 獲取所有優惠劵
		async getCouponAll(id: string, page: string, token: string): Promise<void> {
			try {
				let res;
				if (id && this.accountType === 'seller') {
					// await sellerCouponAll(id, page, token)
					// 	.then(res => {
					// 		this.allData = res.coupons;
					// 		this.pagination = res.pagination;
					// 		console.log(res);
					// 	})
					// 	.catch(err => {
					// 		console.log(err);
					// 		alertStore.error(err.response.data.message);
					// 	});
				} else if (id && this.accountType === 'user') {
					// await user(id)
					// 	.then(res => {
					// 		this.user = res.data;
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
