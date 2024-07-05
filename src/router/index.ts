import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useRoute } from 'vue-router';

// 前台商場頁面(非會員中心) ---------------------------------START
import Index from '../views/PageIndex.vue';
import ShopHome from '../views/ShopHome.vue';
import ShopProduct from '../views/ShopProduct.vue';
import ProductOverview from '../views/ProductOverview.vue';
import PaymentSuccess from '../views/PaymentSuccess.vue';
import ShopActivity from '../views/ShopActivity.vue';
// import FAQ from '../views/eric/IndexFAQ.vue';
// 前台商場頁面(非會員中心) ---------------------------------END

// 購物車
import Cart from '../views/Cart.vue';
import CartCheck from '../views/CartCheck.vue';

// 登入註冊相關頁面 ---------------------------------START
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
// 登入註冊相關頁面 ---------------------------------END

// seller 商家所有頁面 ---------------------------------START
import SellerOverview from '../views/SellerOverview.vue';
import SellerHome from '../views/SellerHome.vue';
import SellerOrder from '../views/SellerOrder.vue';
import SellerOrderCheck from '../views/SellerOrderCheck.vue';
import SellerChat from '../views/SellerChat.vue';
import SellerActivity from '../views/SellerActivity.vue';
import SellerActivityNew from '../views/SellerActivityNew.vue';
import SellerProduct from '../views/SellerProduct.vue';
import SellerProductNew from '../views/SellerProductNew.vue';

// seller 商家所有頁面 ---------------------------------END

// user
import UserProfile from '../views/UserProfile.vue';
import UserCollect from '../views/UserCollect.vue';
import UserCoupon from '../views/UserCoupon.vue';
import UserCouponNew from '../views/UserCouponNew.vue';
import Component from 'vue-loading-overlay';
import { computed } from 'vue';

// 會員所有頁面 ---------------------------------END

const routes = [
	{ path: '/', name: 'Index', component: Index },
	// { path: '/faq', name: 'FAQ', component: FAQ },

	{ path: '/user-login', name: 'UserLogin', component: Login },
	{ path: '/seller-login', name: 'SellerLogin', component: Login },
	{ path: '/user-sign-up', name: 'UserSignUp', component: SignUp },
	{ path: '/seller-sign-up', name: 'SellerSignUp', component: SignUp },
	{
		path: '/shop/:id', // 前台商家頁面
		name: 'ShopHome',
		component: ShopHome,
	},
	{
		path: '/search', // 前台商品總覽
		name: 'ProductOverview',
		component: ProductOverview,
	},
	{
		path: '/product/:id', // 前台商品詳細頁面
		name: 'ShopProduct',
		component: ShopProduct,
	},
	{
		path: '/activity/:id', // 前台 活動詳細 頁面(可領取優惠劵)
		name: 'ShopActivity',
		component: ShopActivity,
	},
	// seller 商家所有頁面 ------------------------- seller 商家所有頁面 --------START
	{
		path: '/seller',
		name: 'Seller',
		component: () => import('../views/UserMenu.vue'),
		children: [
			{
				path: 'home', // 開店推薦主頁
				name: 'SellerHome',
				component: SellerHome,
			},
			{
				path: 'profile', // 商家資訊
				name: 'SellerProfile',
				component: UserProfile,
				meta: { requiresAuth: true, role: 'seller', seller: true }, // 商家身份登入後才能訪問
			},
			{
				path: 'overview', // 商家總覽
				name: 'SellerOverview',
				component: SellerOverview,
				meta: { requiresAuth: true, role: 'seller', seller: true }, // 商家身份登入後才能訪問
			},
			{
				path: 'order', // 訂單管理
				name: 'SellerOrder',
				component: SellerOrder,
				meta: { requiresAuth: true, role: 'seller', seller: true }, // 商家身份登入後才能訪問
			},
			{
				path: 'order/:id', // 單筆訂單管理
				name: 'SellerOrderCheck',
				component: SellerOrderCheck,
				meta: { requiresAuth: true, role: 'seller', seller: true }, // 商家身份登入後才能訪問
				props: true, // 將orderID參數作為'props'傳遞給其他組件
			},
			{
				path: 'chat', // 單筆訂單管理
				name: 'SellerChat',
				component: SellerChat,
				meta: { requiresAuth: true, role: 'seller', seller: true }, // 商家身份登入後才能訪問
				props: true, // 將orderID參數作為'props'傳遞給其他組件
			},
			{
				path: 'coupon', // 優惠劵
				name: 'SellerCoupon',
				component: UserCoupon,
				meta: { requiresAuth: true, role: 'seller', seller: true },
			},
			{
				path: 'coupon-new', // 新增優惠劵
				name: 'SellerCouponNew',
				component: UserCouponNew,
				meta: { requiresAuth: true, role: 'seller', seller: true },
			},
			{
				path: 'coupon/:id', // 修改/查看優惠劵
				name: 'SellerCouponCheck',
				component: UserCouponNew,
				meta: { requiresAuth: true, role: 'seller', seller: true },
				props: true,
			},
			{
				path: 'activity', // 活動管理
				name: 'SellerActivity',
				component: SellerActivity,
				meta: { requiresAuth: true, role: 'seller', seller: true },
			},
			{
				path: 'activity-new', // 新增活動
				name: 'SellerActivityNew',
				component: SellerActivityNew,
				meta: { requiresAuth: true, role: 'seller', seller: true },
			},
			{
				path: 'activity/:id', // 修改/查看活動
				name: 'SellerActivityCheck',
				component: SellerActivityNew,
				meta: { requiresAuth: true, role: 'seller', seller: true },
				props: true,
			},
			{
				path: 'product', // 商品總覽
				name: 'SellerProduct',
				component: SellerProduct,
				meta: { requiresAuth: true, role: 'seller', seller: true },
			},
			{
				path: 'product-new', // 新增商品
				name: 'SellerProductNew',
				component: SellerProductNew,
				meta: { requiresAuth: true, role: 'seller', seller: true },
			},
			{
				path: 'product/:id', // 修改/查看商品
				name: 'SellerProductCheck',
				component: SellerProductNew,
				meta: { requiresAuth: true, role: 'seller', seller: true },
				props: true,
			},
		],
	},
	// seller 商家所有頁面 ------------------------- seller 商家所有頁面 --------END

	// user 買家所有頁面 ------------------------- user 買家所有頁面 --------START
	{
		path: '/user',
		name: 'User',
		component: () => import('../views/UserMenu.vue'),
		meta: { requiresAuth: true, role: 'user', user: true }, // 買家身份登入後才能訪問
		children: [
			{
				path: 'profile', // 會員中心
				name: 'UserProfile',
				component: UserProfile,
				meta: { requiresAuth: true, role: 'user', user: true }, // 買家身份登入後才能訪問
			},
			{
				path: 'collect', // 收藏商品
				name: 'UserCollect',
				component: UserCollect,
				meta: { requiresAuth: true, role: 'user', user: true }, // 買家身份登入後才能訪問
			},
		],
	},
	{
		path: '/cart',
		name: 'Cart',
		component: Cart,
		// meta: { requiresAuth: true, role: 'user', user: true }, // 買家身份登入後才能訪問
	},
	{
		path: '/cart-check',
		name: 'CartCheck',
		component: CartCheck,
		props: (route: { params: { orderData: any; }; }) => ({ orderData: route.params.orderData }),
		// meta: { requiresAuth: true, role: 'user', user: true }, // 買家身份登入後才能訪問
	},

	// 以上需會員登入。

	// {
	// 	path: '/:pathMatch(.*)*',
	// 	component: () => import('../views/NotFound.vue'),
	// },
	// 重新導向
	{
		path: '/paymentSuccess',
		name: 'PaymentSuccess',
		component: PaymentSuccess,
	},
	// {
	// 	path: '/:pathMatch(.*)*',
	// 	redirect: {
	// 		name: 'Index',
	// 	},
	// },
	{
		path: '/newPage/:pathMatch(.*)*',
		redirect: {
			name: 'Index',
		},
	},
	// user 買家所有頁面 ------------------------- user 買家所有頁面 --------END
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

// 設置路由守衛
router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const loggedIn = authStore.isLoggedIn;
	const accountType = authStore.accountType;

	// 確認所有匹配的路由記錄中是否有 requiresAuth
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	const roles = to.matched.flatMap(record =>
		record.meta.role ? [record.meta.role] : []
	);
	const user = to.matched.some(record => record.meta.user);
	const seller = to.matched.some(record => record.meta.seller);
	// 每次路由切换时触发页面滚动到顶部
	window.scrollTo({ top: 0, behavior: 'smooth' });
	if (!loggedIn) {
		// 未登入的情況
		if (requiresAuth) {
			if (roles.includes('seller')) {
				alert('商家尚未登入！');
				next({ name: 'SellerLogin' });
			} else if (roles.includes('user')) {
				alert('買家尚未登入！');
				next({ name: 'UserLogin' });
			} else {
				next('/login');
			}
		} else {
			next();
		}
	} else {
		// 已登入的情況
		try {
			if (!authStore.token) {
				// 假設這裡需要手動設置 userInfo，例如從後端獲取
			}
			// 根據用戶角色進行權限判斷
			if (roles.includes('seller') && accountType !== 'seller') {
				alert('沒有商家權限，重新登入！');
				next({ name: 'SellerLogin' });
			} else if (roles.includes('user') && accountType !== 'user') {
				alert('沒有買家權限，重新登入！');
				next({ name: 'UserLogin' });
			} else {
				next(); // 繼續導航
			}
		} catch (err) {
			console.error('Error:', err);
			alert('token過期，請重新登入');
			await authStore.logout(); // 假設有一個 logout 方法來處理登出
			next({ name: 'Sellerlogin' });
		}
	}
});
export default router;
