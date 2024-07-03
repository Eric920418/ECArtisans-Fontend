import axios, { type AxiosResponse } from 'axios';

// 登入相關的 handleApiResponse(api
const apiRequest = axios.create({
	baseURL: 'https://ecartisans-backend-backup.onrender.com',
});

function headers(token: string) {
	const headers = {
		headers: {
			'Content-Type': 'application/json', //此為預設，沒有放這個商品資訊無法更新
			Authorization: `Bearer ${token}`,
		},
	} as Object;

	return headers;
}

// 圖片專用
function FormHeaders(token: string) {
	const headers = {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		},
	} as Object;

	return headers;
}

// 定義一個函數，用於處理 handleApiResponse(api 請求並返回res.data部分
const handleApiResponse = async <T>(
	req: Promise<AxiosResponse<T>>
): Promise<T> => {
	try {
		const res = await req;
		return res.data;
	} catch (error) {
		console.error('發生錯誤:', error);
		throw error;
	}
};

// 注意!!!!  使用前請檢查需要使用的 handleApiResponse(api 規格是否正確。 名稱可自行調整
// 注意!!!!  使用前請檢查需要使用的 handleApiResponse(api 規格是否正確。 名稱可自行調整
// 注意!!!!  使用前請檢查需要使用的 handleApiResponse(api 規格是否正確。 名稱可自行調整

// 目前設定 買家資料一律加上user  賣家資料一律加上 seller賣方
// 買家區的商家資訊 shop 商店

// 範例：
// export const sellerActivityAll = ( seller_id: string, data: any) => handleApiResponse(apiRequest.get(`/${ seller_id}/activities`, { params: data });
// export const handleApiResponse(apiUserLogin = data => handleApiResponse(apiRequest.post('/login', data));
// export const handleApiResponse(apiArticleItem = () => handleApiResponse(apiRequest.get('/ArticleItem'));
// 範例網站：
// https://ithelp.ithome.com.tw/m/articles/10263166
// https://medium.com/i-am-mike/%E4%BD%BF%E7%94%A8axios%E6%99%82%E4%BD%A0%E7%9A%84api%E9%83%BD%E6%80%8E%E9%BA%BC%E7%AE%A1%E7%90%86-557d88365619

// 圖片上傳 ■
export const uploadImage = (data: any, token: string) =>
	handleApiResponse(apiRequest.post('/upload/file', data, FormHeaders(token)));

// 購物商城 ■ 購物商城 ■ 購物商城 ■

// 購物商城 ■ 首頁
// 26	get	 /home/activities	 	 首頁活動圖	 	買家端
export const home_activities = () =>
	handleApiResponse(apiRequest.get('/home/activities'));
// 27	get	 /home/popularProducts	 	 首頁熱銷商品	 	買家端
export const home_popularProducts = (page: number) =>
	handleApiResponse(apiRequest.get(`/home/popular-products?limit=${page}`));
// 28	get	 /home/recommendShops	 	 首頁推薦商家	 	 買家端
export const home_recommendShops = (page: number) =>
	handleApiResponse(apiRequest.get(`/home/recommend-shop?limit=${page}`));
// 29	get	 /home/newProducts	 	 首頁新品推薦	 	 買家端
export const home_newProducts = (page: number) =>
	handleApiResponse(apiRequest.get(`/home/latest-products?limit=${page}`));
// 30	get	 /home/follow-shops	 	 首頁關注商家	 	 買家端
export const home_followShops = (token: string) =>
	handleApiResponse(apiRequest.get('/home/follow-shops', headers(token)));

// 購物商城 ■ 商品總覽
// 54	get   /products/${category}	 	 商品總覽	 	 買家端
export const productAll = (category: string) =>
	handleApiResponse(apiRequest.get(`/products/${category}`));
// 55	get   /product/${product_id}	 	商品詳情	 	買家端
export const product = (product_id: string) =>
	handleApiResponse(apiRequest.get(`/products/detail/${product_id}`));
// 56	post  /products/search	 	 商品搜尋	 	買家端
export const productSearch = (keyword: string) =>
	handleApiResponse(apiRequest.get(`/search/products?keyword=${keyword}`));

// 購物商城 ■ 賣家資訊
// 58	get   /seller/${seller_id}	 	賣家資訊	 	 買家端
export const shop = (seller_id: string) =>
	handleApiResponse(apiRequest.get(`/sellers/${seller_id}`));
// 59	get   /seller/${seller_id}/products	 	 賣場商品	 	買家端
export const shopProducts = (seller_id: string) =>
	handleApiResponse(apiRequest.get(`/sellers/${seller_id}/products`));

// ■ 商家 ■ 商家 ■ 商家 ■

// 註冊登入 ■ 帳號相關 ■
// 3	post	  /auth/shop-login	 	 賣家登入	 	 賣家端
export const sellerLogin = async (data: any) =>
	handleApiResponse(apiRequest.post('/auth/shop-login', data));
// 4	post	  /auth/shop-signup	 	賣家註冊	 	 賣家端
export const sellerAuth = (data: any) =>
	handleApiResponse(apiRequest.post('/auth/shop-signup', data));
// 6	post	  /auth/shopForget	 	賣家忘記密碼	 	賣家端
export const sellerForget = (data: any) =>
	handleApiResponse(apiRequest.post('/auth/shopForget', data));
// 14 post	  /auth/forget-password	 	請求發送臨時密碼	 	買家端
export const userForget = (data: any) =>
	handleApiResponse(apiRequest.post('/auth/forget-password', data));

// 續約付款 ■
// 5	post  /shop/payment	 	賣家付款	 	賣家端
export const sellerPayment = () =>
	handleApiResponse(apiRequest.post(`/shop/payment`));

// 商家(會員)資訊	 ■
// 9	get   /shop/${seller_id}/information	 	 商家資訊	 	 賣家端
export const sellerAccount = (seller_id: string) =>
	handleApiResponse(
		apiRequest.get(
			`/shop/${seller_id}/information`
			// ,headers(token)
		)
	);
// 9.1(補)	put   /shop/${seller_id}/information	 	 修改商家資訊	 	 賣家端
export const sellerAccountEdit = (seller_id: string, data: any) =>
	handleApiResponse(apiRequest.put(`/shop/${seller_id}/information`, data));

// 商家 ■ 會員首頁 ■
// 8	get   /shop/${seller_id}/home	 	 商家導覽	 	賣家端
export const sellerHome = (seller_id: string) =>
	handleApiResponse(apiRequest.get(`/shop/${seller_id}/home`));

// 商家 ■ 商品管理 ■
// 31	get   /shop/${seller_id}/products/all	 	 賣家顯示所有商品管理	 	 賣家端
export const sellerProductAll = (token: string) =>
	handleApiResponse(apiRequest.get(`/shop/products/all`, headers(token)));
// 32	get   /shop/${seller_id}/products?page&qty&category	 	 賣家商品管理(數量)	 	賣家端
export const sellerProductData = (
	seller_id: string,
	page: number,
	qty: number,
	category: string,
	token: string
) =>
	handleApiResponse(
		apiRequest.get(
			`/shop/${seller_id}/products?page=${page}&qty=${qty}&category=${category}`,
			headers(token)
		)
	);
// 33	get   /shop/${seller_id}/product/${product_id}	 	賣家單一商品管理	 	賣家端
export const sellerProduct = (product_id: string, token: string) =>
	handleApiResponse(
		apiRequest.get(`/shop/product/${product_id}`, headers(token))
	);
// 34	post  /shop/product	 	 賣家新增單一商品	 	 賣家端
export const sellerProductNew = (data: any, token: string) =>
	handleApiResponse(apiRequest.post('/shop/product', data, headers(token)));
// 35	put   /shop/product/${product_id}	 	賣家修改(編輯)單一商品 	 	賣家端
export const sellerProductEdit = (
	product_id: string,
	data: any,
	token: string
) =>
	handleApiResponse(
		apiRequest.put(`/shop/product/${product_id}`, data, headers(token))
	);
// 36	delete  /shop/product/${product_id}	 	賣家刪除單一商品	 	賣家端
export const sellerProductDelete = (product_id: string, token: string) =>
	handleApiResponse(
		apiRequest.delete(`/shop/product/${product_id}`, headers(token))
	);

// 商家 ■ 優惠劵 ■
// 42	get 賣家顯示所有優惠劵	 	賣家端
export const sellerCouponAll = (token: string) =>
	handleApiResponse(apiRequest.get('/shop/coupons/all', headers(token)));
// 43	get 賣家顯示單一優惠劵	 	賣家端
export const sellerCoupon = (coupon_id: string, token: string) =>
	handleApiResponse(
		apiRequest.get(`/shop/coupon/${coupon_id}`, headers(token))
	);

// 44	post  賣家新增優惠劵	 	賣家端
export const sellerCouponNew = (data: any, token: string) =>
	handleApiResponse(apiRequest.post('/shop/coupon', data, headers(token)));

// 45	put 賣家修改優惠劵	 	賣家端
export const sellerCouponEdit = (coupon_id: string, data: any, token: string) =>
	handleApiResponse(
		apiRequest.put(`/shop/coupon/${coupon_id}`, data, headers(token))
	);

// 46	delete 賣家刪除單一優惠劵	 	賣家端
export const sellerCouponDelete = (coupon_id: string, token: string) =>
	handleApiResponse(
		apiRequest.delete(`/shop/coupon/${coupon_id}`, headers(token))
	);

// 商家 ■ 訂單管理 ■
// 12	get   /shop/${seller_id}/orders	 	 訂單管理	 	 賣家端
export const sellerOrderAll = (token: string) =>
	handleApiResponse(apiRequest.get(`/shop/orders`, headers(token)));
// 13	get   /shop/${seller_id}/order/${order_id}	 	 單一訂單管理	 	賣家端
// export const sellerOrder = (seller_id: string, order_id: string) => handleApiResponse(apiRequest.get(`/shop/${seller_id}/order/${order_id}`));
export const sellerOrder = (order_id: string, token: string) =>
	handleApiResponse(apiRequest.get(`/shop/order/${order_id}`, headers(token)));

// 商家 ■ 活動相關 ■
// 37	get	    /${seller_id}/activities	 	賣家顯示所有活動管理 	 	賣家端
export const sellerActivityAll = (seller_id: string) =>
	handleApiResponse(apiRequest.get(`/${seller_id}/activities`));
// 38	get	    /${seller_id}/activity/${activity_id}	 	 賣家顯示單一活動管理	 	 賣家端
export const sellerActivity = (seller_id: string, activity_id: string) =>
	handleApiResponse(apiRequest.get(`/${seller_id}/activity/${activity_id}`));
// 39	post    /activity	 	 賣家新增單一活動/公告	 	 賣家端
export const sellerActivityNew = (data: any) =>
	handleApiResponse(apiRequest.post('/activity', data));
// 40	put	    /activity/${activity_id}	 	賣家編輯單一活動/公告 	 	賣家端
export const sellerActivityEdit = (activity_id: string) =>
	handleApiResponse(apiRequest.put(`/activity/${activity_id}`));
// 41	delete  /activity/${activity_id}	 	賣家刪除單一活動/公告	 	賣家端
export const sellerActivityDelete = (activity_id: string) =>
	handleApiResponse(apiRequest.delete(`/activity/${activity_id}`));

// 7	post  /shop/orders/string X	 	新增貨運編號	 	 賣家端
// export const seller = (data: any) => handleApiResponse(apiRequest.post('/login', data));

// 10	get   /shop/${seller_id}/users  X	 	 顧客管理	 	 賣家端
// export const seller = (data: any) => handleApiResponse(apiRequest.get('/login', data));
// 11	put   /shop/${seller_id}/users  X	 	顧客管理－修改	 	賣家端
// export const seller = (data: any) => handleApiResponse(apiRequest.put('/login', data));

// ■ 未登入可以查看的資料 ■ 未登入可以查看的資料 ■ 未登入可以查看的資料 ■
// 57	get	    /activity/${activity_id}	 	活動詳情頁	 	買家端
export const activity = (activity_id: string) =>
	handleApiResponse(apiRequest.get(`/activities/${activity_id}`));

// ■ 買家 ■ 買家 ■ 買家 ■

// 註冊登入 ■ 帳號相關
// 1	post	  /auth/login	 	 買方登入	 	買家端
export const userLogin = (data: any) =>
	handleApiResponse(apiRequest.post('/auth/login', data));
// 2	post	  /auth/signUp	 	買方註冊 	 	買家端
export const userAuth = (data: any) =>
	handleApiResponse(apiRequest.post('/auth/signUp', data));

// 會員資料 ■
// 16	put   /users/${user_id}	 編輯會員資料	 	 買家端
export const userEdit = (user_id: string, data: any) =>
	handleApiResponse(apiRequest.put(`/users/${user_id}`, data));
// 15	get   /users/${user_id}	 	 查看會員資料	 	買家端
export const user = (user_id: string) =>
	handleApiResponse(apiRequest.get(`/users/${user_id}`));

// 購物車 ■
// 47	get	    /carts/${user_id}	 	買家顯示所有購物車	 	買家端
export const cartAll = (token: string) =>
	handleApiResponse(apiRequest.get(`/cart`, headers(token)));
// 48	post	  /cart	 	 買家新增購物車	 	 買家端
export const cartNew = (data: any) =>
	handleApiResponse(apiRequest.post('/cart', data));
// 49	put	    /cart/${cart_id}/${user_id}/ X	 	買家修改(編輯)購物車	 	買家端
// export const handleApiResponse(apiUserLogin = (data: any) => handleApiResponse(apiRequest.put('/cart', data));
// 51	delete	/cart/${user_id}	 	 買家刪除所有購物車	 	買家端
export const cartDeleteAll = (user_id: string) =>
	handleApiResponse(apiRequest.delete(`/cart/${user_id}`));
// 50	delete	/cart/${user_id}/${cart_id}	 	買家刪除單一購物車	 	買家端
export const cartDelete = (user_id: string, cart_id: string) =>
	handleApiResponse(apiRequest.delete(`/cart/${user_id}/${cart_id}`));

// 訂單相關 ■ 買家繳費至金流
// 17	get	  /order/${user_id}	 	 查看訂單紀錄	 	 買家端
export const userOrderAll = (token:string) =>
	handleApiResponse(apiRequest.get('/order', headers(token)));
// 18	get	  /order/${user_id}/${order_id}	查看訂單詳情	買家端
export const userOrder = (order_id: string, token: string) =>
	handleApiResponse(apiRequest.get(`/order/${order_id}`, headers(token)));
// 52	post	/order	 	 買家建立訂單(待討論)	 	 買家端
export const userOrderNew = (data: any) =>
	handleApiResponse(apiRequest.post('/order', data));
// 53	post	/order/${user_id}/pay/${order_id}	 	 買家繳費至金流(待討論)	 	買家端
export const userOrderPay = (user_id: string, order_id: string) =>
	handleApiResponse(apiRequest.post(`/order/${user_id}/pay/${order_id}`));

// 評價 ■
// 19	post	  /comment/${user_id}/${order_id}	 	商品評價	 	 買家端
export const rating = (user_id: string, order_id: string) =>
	handleApiResponse(apiRequest.post(`/comment/${user_id}/${order_id}`));

// 優惠劵 ■
// 20	get   /users/${user_id}/discounts	 	 優惠劵紀錄	 	 買家端
export const userCouponall = (user_id: string) =>
	handleApiResponse(apiRequest.get(`/users/${user_id}/discounts`));
// 21	get   /users/${user_id}/discounts/${discount_id}	 	優惠劵詳情	 	買家端
export const userCoupon = (user_id: string, coupon_id: string) =>
	handleApiResponse(apiRequest.get(`/users/${user_id}/discounts/${coupon_id}`));
// 211	post 買家取得優惠劵功能
export const addCoupon = (user_id: string, coupon_id: string) =>
	handleApiResponse(
		apiRequest.post(`/users/${user_id}/discounts/${coupon_id}`)
	);

// 22	get 會員收藏商品	 	買家端
export const userCollect = (user_id: string) =>
	handleApiResponse(
		apiRequest.get(`/users/${user_id}/collect`)
		// , headers(token)
	);
// 23	get     /users/${user_id}/collect-shop	 	 會員關注店家	 	 買家端
export const userFollowShops = (user_id: string) =>
	handleApiResponse(apiRequest.get(`/users/${user_id}/collect-shop`));
// 24	delete  /users/${user_id}/collect/${product_id}	 	會員取消收藏商品 	 	買家端
export const userCollectDelete = (user_id: string, product_id: string) =>
	handleApiResponse(
		apiRequest.delete(`/users/${user_id}/collect/${product_id}`)
	);
// 25	delete  /users/${user_id}/collect-shop/${seller_id}	 	 會員取消關注店家	 	買家端
export const userFollowShopsDelete = (user_id: string, seller_id: string) =>
	handleApiResponse(
		apiRequest.delete(`/users/${user_id}/collect-shop/${seller_id}`)
	);

interface PaymentData {
	email?: string;
	Amt: number;
	ItemDesc: string;
}

// 藍新金流API
export const paymentCreate = async (paymentData: PaymentData) =>
	handleApiResponse(apiRequest.post('/payment', paymentData));
