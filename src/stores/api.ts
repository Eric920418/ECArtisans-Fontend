import axios, { type AxiosResponse } from 'axios';

// 登入相關的 api
const apiRequest = axios.create({
  baseURL: 'https://ecartisans-backend.onrender.com',
});

// 定義一個函數，用於處理 api 請求並返回res.data部分
const handleApiResponse = async <T>(req: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const res = await req;
    return res.data;
  } catch (error) {
    console.error('發生錯誤:', error);
    throw error;
  }
};

// 注意!!!!  使用前請檢查需要使用的 API 規格是否正確。 名稱可自行調整
// 注意!!!!  使用前請檢查需要使用的 API 規格是否正確。 名稱可自行調整
// 注意!!!!  使用前請檢查需要使用的 API 規格是否正確。 名稱可自行調整

// 目前設定 買家資料一律加上user  賣家資料一律加上 seller賣方
// 買家區的商家資訊 shop 商店

// 範例：
// export const sellerActivityAll = ( seller_id: string, data: any) => apiRequest.get(`/${ seller_id}/activities`, { params: data });
// export const apiUserLogin = data => apiRequest.post('/login', data);
// export const apiArticleItem = () => apiRequest.get('/ArticleItem');
// 範例網站：
// https://ithelp.ithome.com.tw/m/articles/10263166
// https://medium.com/i-am-mike/%E4%BD%BF%E7%94%A8axios%E6%99%82%E4%BD%A0%E7%9A%84api%E9%83%BD%E6%80%8E%E9%BA%BC%E7%AE%A1%E7%90%86-557d88365619

// activity活動相關 api
// 37	get	    /${seller_id}/activities	 	賣家顯示所有活動管理 	 	賣家端
export const sellerActivityAll = (seller_id: string) => apiRequest.get(`/${seller_id}/activities`);
// 38	get	    /${seller_id}/activity/${activity_id}	 	 賣家顯示單一活動管理	 	 賣家端	 
export const sellerActivity =  (seller_id: string, activity_id: string,) => apiRequest.get(`/${seller_id}/activity/${activity_id}`);
// 39	post    /activity	 	 賣家新增單一活動/公告	 	 賣家端	 
export const sellerActivityNew = (data: any) => apiRequest.post('/activity', data);
// 40	put	    /activity/${activity_id}	 	賣家編輯單一活動/公告 	 	賣家端 
export const sellerActivityEdit = (activity_id: string) => apiRequest.put(`/activity/${activity_id}`);
// 41	delete  /activity/${activity_id}	 	賣家刪除單一活動/公告	 	賣家端 
export const sellerActivityDelete = (activity_id: string) => apiRequest.delete(`/activity/${activity_id}`);
// 57	get	    /activity/${activity_id}	 	活動詳情頁	 	買家端 
export const activity = (activity_id: string) => apiRequest.get(`/activity/${activity_id}`);


// auth 授權/驗證相關 api				
// 1	post	  /auth/login	 	 買方登入	 	買家端
export const userLogin = (data: any) => apiRequest.post('/auth/login', data);
// 2	post	  /auth/signUp	 	買方註冊 	 	買家端 
export const userAuth = (data: any) => apiRequest.post('/auth/signUp', data);
// 14 post	  /auth/forget-password	 	請求發送臨時密碼	 	買家端	 
export const userForget = (data: any) => apiRequest.post('/auth/forget-password', data);
// 3	post	  /auth/shop-login	 	 賣家登入	 	 賣家端	 
export const sellerLogin = async(data: any) => handleApiResponse(apiRequest.post('/auth/shop-login', data));
// export const sellerLogin = async(data: any) => {
//   try {
//     const res = await apiRequest.post('/auth/shop-login', data);
//     // console.log(res)
//     return res.data;
//   }catch (error) {
//     console.error('登入錯誤:', error);
//     throw error; 
// }
// }

// 4	post	  /auth/shop-signup	 	賣家註冊	 	 賣家端	 
export const sellerAuth = (data: any) => apiRequest.post('/auth/shop-signup', data);
// 6	post	  /auth/shopForget	 	賣家忘記密碼	 	賣家端
export const sellerForget = (data: any) => apiRequest.post('/auth/shopForget', data);
				
// 47	get	    /carts/${user_id}	 	買家顯示所有購物車	 	買家端	 
export const cartAll = (user_id: string) => apiRequest.get(`/cart/${user_id}`);
// 48	post	  /cart	 	 買家新增購物車	 	 買家端	 
export const cartNew = (data: any) => apiRequest.post('/cart', data);
// 49	put	    /cart/${cart_id}/${user_id}/ X	 	買家修改(編輯)購物車	 	買家端	 
// export const apiUserLogin = (data: any) => apiRequest.put('/cart', data);
// 51	delete	/cart/${user_id}	 	 買家刪除所有購物車	 	買家端
export const cartDeleteAll = (user_id: string) => apiRequest.delete(`/cart/${user_id}`);
// 50	delete	/cart/${user_id}/${cart_id}	 	買家刪除單一購物車	 	買家端 
export const cartDelete = (user_id: string, cart_id: string) => apiRequest.delete(`/cart/${user_id}/${cart_id}`);
				
// 19	post	  /comment/${user_id}/${order_id}	 	商品評價	 	 買家端	 
export const rating = (user_id: string, order_id: string) => apiRequest.post(`/comment/${user_id}/${order_id}`);
				
// 26	get	 /home/activities	 	 首頁活動圖	 	買家端
export const home_activities = () => apiRequest.get('/home/activities');
// 27	get	 /home/popularProducts	 	 首頁熱銷商品	 	買家端
export const home_popularProducts = () => apiRequest.get('/home/popularProducts');
// 28	get	 /home/recommendShops	 	 首頁推薦商家	 	 買家端	 
export const home_recommendShops = () => apiRequest.get('/home/recommendShops');
// 29	get	 /home/newProducts	 	 首頁新品推薦	 	 買家端	 
export const home_newProducts = () => apiRequest.get('/home/newProducts');
// 30	get	 /home/follow-shops	 	 首頁關注商家	 	 買家端	 
export const home_followShops = (data: any) => apiRequest.get('/home/follow-shops', data);
				
// 17	get	  /order/${user_id}	 	 查看訂單紀錄	 	 買家端	 
export const userOrderAll = () => apiRequest.get('/order/${user_id}');
// 18	get	  /order/${user_id}/${order_id}	查看訂單詳情	買家端
export const userOrder = (user_id: string, order_id: string) => apiRequest.get(`/order/${user_id}/${order_id}`);
// 52	post	/order	 	 買家建立訂單(待討論)	 	 買家端	 
export const userOrderNew = (data: any) => apiRequest.post('/order', data);
// 53	post	/order/${user_id}/pay/${order_id}	 	 買家繳費至金流(待討論)	 	買家端
export const userOrderPay = (user_id: string, order_id: string) => apiRequest.post(`/order/${user_id}/pay/${order_id}`);
				
// 54	get   /products/${category}	 	 商品總覽	 	 買家端	 
export const productAll = (category: string) => apiRequest.get(`/products/${category}`);
// 55	get   /product/${product_id}	 	商品詳情	 	買家端
export const product = (product_id: string) => apiRequest.get(`/product/${product_id}`);
// 56	post  /products/search	 	 商品搜尋	 	買家端
export const productSearch = (data: any) => apiRequest.post('/products/search', data);
				
// 58	get   /seller/${seller_id}	 	賣家資訊	 	 買家端	 
export const shop = (seller_id: string) => apiRequest.get(`/seller/${seller_id}`);
// 59	get   /seller/${seller_id}/products	 	 賣場商品	 	買家端
export const shopProducts = (seller_id: string) => apiRequest.get(`/seller/${seller_id}/products`);

// 5	post  /shop/payment	 	賣家付款	 	賣家端	 
export const sellerPayment = () => apiRequest.post(`/shop/payment`);
// 7	post  /shop/orders/string X	 	新增貨運編號	 	 賣家端	 
// export const seller = (data: any) => apiRequest.post('/login', data);
// 8	get   /shop/${seller_id}/home	 	 商家導覽	 	賣家端
export const sellerHome = (seller_id: string) => apiRequest.get(`/shop/${seller_id}/home`);
// 9	get   /shop/${seller_id}/information	 	 商家資訊	 	 賣家端	 
export const sellerAccount = (seller_id: string) => handleApiResponse(apiRequest.get(`/shop/${seller_id}/information`));
// 9.1(補)	put   /shop/${seller_id}/information	 	 修改商家資訊	 	 賣家端	 
export const sellerAccountEdit = (seller_id: string, data: any) => apiRequest.put(`/shop/${seller_id}/information`, data);
// 10	get   /shop/${seller_id}/users  X	 	 顧客管理	 	 賣家端	 
// export const seller = (data: any) => apiRequest.get('/login', data);
// 11	put   /shop/${seller_id}/users  X	 	顧客管理－修改	 	賣家端 
// export const seller = (data: any) => apiRequest.put('/login', data);
// 12	get   /shop/${seller_id}/orders	 	 訂單管理	 	 賣家端	 
export const sellerOrderAll = (seller_id: string) => apiRequest.get(`/shop/${seller_id}/orders`);
// 13	get   /shop/${seller_id}/order/${order_id}	 	 單一訂單管理	 	賣家端
export const sellerOrder = (seller_id: string, order_id: string) => apiRequest.get(`/shop/${seller_id}/order/${order_id}`);
// 31	get   /shop/${seller_id}/products/all	 	 賣家顯示所有商品管理	 	 賣家端	 
export const sellerProductAll = (seller_id: string) => apiRequest.get(`/shop/${seller_id}/products/all`);
// 32	get   /shop/${seller_id}/products?page&qty&category	 	 賣家商品管理(數量)	 	賣家端
export const sellerProductData = (seller_id: string, page: number, qty: number, category: string) => apiRequest.get(`/shop/${seller_id}/products?page=${page}&qty=${qty}&category=${category}`);
// 33	get   /shop/${seller_id}/product/${product_id}	 	賣家單一商品管理	 	賣家端
export const sellerProduct = (seller_id: string, product_id: string) => apiRequest.get(`/shop/${seller_id}/product/${product_id}`);
// 34	post  /shop/product	 	 賣家新增單一商品	 	 賣家端	 
export const sellerProductNew = (data: any) => apiRequest.post('/shop/product', data);
// 35	put   /shop/product/${product_id}	 	賣家修改(編輯)單一商品 	 	賣家端 
export const sellerProductEdit = (product_id: string) => apiRequest.put(`/shop/product/${product_id}`);
// 36	delete  /shop/product/${product_id}	 	賣家刪除單一商品	 	賣家端 
export const sellerProductDelete = (product_id: string) => apiRequest.delete(`/shop/product/${product_id}`);
// 42	get   /shop/${seller_id}/coupons?page	 	賣家顯示所有折價券	 	賣家端
export const sellerCouponAll = (seller_id: string, page: number) => apiRequest.get(`/shop/${seller_id}/coupons?page=${page}`);
// 43	get   /shop/${seller_id}/coupon/${coupon_id}	 	賣家顯示單一折價券	 	賣家端
export const sellerCoupon = (seller_id: string, coupon_id: string) => apiRequest.get(`/shop/${seller_id}/coupon/${coupon_id}`);
// 44	post  /shop/coupon	 	賣家新增折價券	 	賣家端 
export const sellerCouponNew = (data: any) => apiRequest.post('/shop/coupon', data);
// 45	put   /shop/coupon/${coupon_id}	 	賣家修改折價券	 	賣家端
export const sellerCouponEdit = (coupon_id: string) => apiRequest.put(`/shop/coupon/${coupon_id}`);
// 46	delete  /shop/coupon/${coupon_id}	 	 賣家刪除單一折價券	 	賣家端
export const sellerCouponDelete = (coupon_id: string) => apiRequest.delete(`/shop/coupon/${coupon_id}`);
				
// 16	put   /users/${user_id}	 編輯會員資料	 	 買家端	 
export const userEdit = (user_id: string, data: any) => apiRequest.put(`/users/${user_id}`, data);
// 15	get   /users/${user_id}	 	 查看會員資料	 	買家端
export const user = (user_id: string) => apiRequest.get(`/users/${user_id}`);
// 20	get   /users/${user_id}/discounts	 	 折價券紀錄	 	 買家端	 
export const userCouponall = (user_id: string) => apiRequest.get(`/users/${user_id}/discounts`);
// 21	get   /users/${user_id}/discounts/${discount_id}	 	折價券詳情	 	買家端
export const userCoupon = (user_id: string, discount_id: string) => apiRequest.get(`/users/${user_id}/discounts/${discount_id}`);
// 22	get   /users/${user_id}/collect	 	 會員收藏商品	 	買家端
export const userCollect = (user_id: string) => apiRequest.get(`/users/${user_id}/collect`);
// 23	get     /users/${user_id}/collect-shop	 	 會員關注店家	 	 買家端	 
export const userFollowShops = (user_id: string) => apiRequest.get(`/users/${user_id}/collect-shop`);
// 24	delete  /users/${user_id}/collect/${product_id}	 	會員取消收藏商品 	 	買家端	
export const userCollectDelete = (user_id: string, product_id: string) => apiRequest.delete(`/users/${user_id}/collect/${product_id}`);
// 25	delete  /users/${user_id}/collect-shop/${seller_id}	 	 會員取消關注店家	 	買家端
export const userFollowShopsDelete = (user_id: string, seller_id: string) => apiRequest.delete(`/users/${user_id}/collect-shop/${seller_id}`);
