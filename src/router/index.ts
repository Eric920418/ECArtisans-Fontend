import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// 前台商場頁面(非會員中心) ---------------------------------START
import Index from '../views/PageIndex.vue';
import TestPage from '../views/TestPage.vue';
// import FAQ from '../views/eric/IndexFAQ.vue';
// 前台商場頁面(非會員中心) ---------------------------------END

// 登入註冊相關頁面 ---------------------------------START
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
// 登入註冊相關頁面 ---------------------------------END

// seller 商家所有頁面 ---------------------------------START
import SellerOverview from '../views/SellerOverview.vue';
import SellerHome from '../views/SellerHome.vue';
import SellerOrder from '../views/SellerOrderList.vue';
import SellerOneOrder from '../views/SellerOneOrder.vue';
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

// 會員所有頁面 ---------------------------------END

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/test-page', name: 'TestPage', component: TestPage },
	// { path: '/faq', name: 'FAQ', component: FAQ },

	{ path: '/user-login', name: 'UserLogin', component: Login },
	{ path: '/seller-login', name: 'SellerLogin', component: Login },
	{ path: '/user-sign-up', name: 'UserSignUp', component: SignUp },
	{ path: '/seller-sign-up', name: 'SellerSignUp', component: SignUp },

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
				meta: { requiresSellerAuth: true }, // 商家身份登入後才能訪問
			},
			{
				path: 'overview', // 商家總覽
				name: 'SellerOverview',
				component: SellerOverview,
				meta: { requiresSellerAuth: true }, // 商家身份登入後才能訪問
			},
			{
				path: 'order', // 訂單管理
				name: 'SellerOrder',
				component: SellerOrder,
				meta: { requiresSellerAuth: true }, // 商家身份登入後才能訪問
			},
			{
				path: 'order/:orderId', // 單筆訂單管理
				name: 'SellerOneOrder',
				component: SellerOneOrder,
				meta: { requiresSellerAuth: true }, // 商家身份登入後才能訪問
				props: true, // 將orderID參數作為'props'傳遞給其他組件
			},
			{
				path: 'chat', // 單筆訂單管理
				name: 'SellerChat',
				component: SellerChat,
				meta: { requiresSellerAuth: true }, // 商家身份登入後才能訪問
				props: true, // 將orderID參數作為'props'傳遞給其他組件
			},
			{
				path: 'coupon', // 優惠劵
				name: 'SellerCoupon',
				component: UserCoupon,
				meta: { requiresSellerAuth: true },
			},
			{
				path: 'coupon-new', // 新增優惠劵
				name: 'SellerCouponNew',
				component: UserCouponNew,
				meta: { requiresSellerAuth: true },
			},
			{
				path: 'coupon/:id', // 修改/查看優惠劵
				name: 'SellerCouponCheck',
				component: UserCouponNew,
				meta: { requiresSellerAuth: true },
				props: true,
			},
			{
				path: 'activity', // 活動管理
				name: 'SellerActivity',
				component: SellerActivity,
				meta: { requiresSellerAuth: true },
			},
			{
				path: 'activity-new', // 新增活動
				name: 'SellerActivityNew',
				component: SellerActivityNew,
				meta: { requiresSellerAuth: true },
			},
			{
				path: 'activity/:id', // 修改/查看活動
				name: 'SellerActivityCheck',
				component: SellerActivityNew,
				meta: { requiresSellerAuth: true },
				props: true,
			},
			{
				path: 'product', // 商品總覽
				name: 'SellerProduct',
				component: SellerProduct,
				meta: { requiresSellerAuth: true },
			},
			{
				path: 'product-new', // 新增商品
				name: 'SellerProductNew',
				component: SellerProductNew,
				meta: { requiresSellerAuth: true },
			},
			{
				path: 'product/:id', // 修改/查看商品
				name: 'SellerProductCheck',
				component: SellerProductNew,
				meta: { requiresSellerAuth: true },
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
		children: [
			// {
			//   path: 'home', //
			//   component: UserHome,
			// },
			{
				path: 'profile', // 會員中心
				name: 'UserProfile',
				component: UserProfile,
				meta: { requiresUserAuth: true }, // 買家身份登入後才能訪問
			},
			{
				path: 'collect', // 收藏商品
				name: 'UserCollect',
				component: UserCollect,
				meta: { requiresUserAuth: true }, // 買家身份登入後才能訪問
			},
		],
	},
	// user 買家所有頁面 ------------------------- user 買家所有頁面 --------END
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

// 設置路由守衛
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const loggedIn = authStore.isLoggedIn;
	const accountType = authStore.accountType;
	const requiresSellerAuth = to.matched.some(
		record => record.meta.requiresSellerAuth
	);
	const requiresUserAuth = to.matched.some(
		record => record.meta.requiresUserAuth
	);

	if ((requiresSellerAuth || requiresUserAuth) && !loggedIn) {
		// 如果需要商家或買家身份驗證但未登入，讓用戶返回指定頁面登入
		if (requiresSellerAuth) {
			alert('商家尚未登入！');
			next({ name: 'Sellerlogin' }); // 導向商家登入頁面
		} else if (requiresUserAuth) {
			alert('買家尚未登入！');
			next({ name: 'Userlogin' }); // 導向買家登入頁面
		}
	} else if (requiresSellerAuth && loggedIn && accountType !== 'seller') {
		// 如果需要商家身份驗證且已登入，但登入的角色不是商家，則重新回到商家登入頁面
		alert('沒有商家權限，重新登入！');
		next({ name: 'Sellerlogin' }); // 導向買家登入頁面
	} else if (requiresUserAuth && loggedIn && accountType !== 'user') {
		// 如果需要買家身份驗證且已登入，但登入的角色不是買家，則重新回到買家登入頁面
		alert('沒有買家權限，重新登入！');
		next({ name: 'Userlogin' }); // 導向買家登入頁面
	} else {
		next(); // 否則繼續導航
	}
});

// 設置路由守衛
router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();
	const loggedIn = authStore.isLoggedIn;
	const accountType = authStore.accountType;
	const requiresSellerAuth = to.matched.some(
		record => record.meta.requiresSellerAuth
	);
	const requiresUserAuth = to.matched.some(
		record => record.meta.requiresUserAuth
	);

	if ((requiresSellerAuth || requiresUserAuth) && !loggedIn) {
		// 如果需要商家或買家身份驗證但未登入，讓用戶返回指定頁面登入
		if (requiresSellerAuth) {
			alert('商家尚未登入！');
			next({ name: 'Sellerlogin' }); // 導向商家登入頁面
		} else if (requiresUserAuth) {
			alert('買家尚未登入！');
			next({ name: 'Userlogin' }); // 導向買家登入頁面
		}
	} else if (requiresSellerAuth && loggedIn && accountType !== 'seller') {
		// 如果需要商家身份驗證且已登入，但登入的角色不是商家，則重新回到商家登入頁面
		alert('沒有商家權限，重新登入！');
		next({ name: 'Sellerlogin' }); // 導向買家登入頁面
	} else if (requiresUserAuth && loggedIn && accountType !== 'user') {
		// 如果需要買家身份驗證且已登入，但登入的角色不是買家，則重新回到買家登入頁面
		alert('沒有買家權限，重新登入！');
		next({ name: 'Userlogin' }); // 導向買家登入頁面
	} else {
		next(); // 否則繼續導航
	}
});

export default router;
