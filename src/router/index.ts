import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// 前台商場頁面(非會員中心) ---------------------------------START
import Index from '../views/PageIndex.vue';
import FAQ from '../views/eric/IndexFAQ.vue';
// 前台商場頁面(非會員中心) ---------------------------------END

// 登入註冊相關頁面 ---------------------------------START
import Login from '../views/amy/Login.vue';
import SignUp from '../views/amy/SignUp.vue';
// 登入註冊相關頁面 ---------------------------------END

// 會員所有頁面 ---------------------------------START
// Seller
import SellerOverview from '../views/amy/SellerOverview.vue';
import SellerProfile from '../views/amy/SellerProfile.vue';
import SellerHome from '../views/eliza/SellerHome.vue';

// user
import UserProfile from '../views/amy/UserProfile.vue';

// 會員所有頁面 ---------------------------------END

const routes = [
	{ path: '/', name: 'Index', component: Index },
	{ path: '/faq', name: 'FAQ', component: FAQ },

	{ path: '/user-login', name: 'UserLogin', component: Login },
	{ path: '/seller-login', name: 'SellerLogin', component: Login },
	{ path: '/user-sign-up', name: 'UserSignUp', component: SignUp },
	{ path: '/seller-sign-up', name: 'SellerSignUp', component: SignUp },

	// seller 商家所有頁面 ------------------------- seller 商家所有頁面 --------START
	{
		path: '/seller',
		name: 'Seller',
		component: () => import('../views/amy/UserMenu.vue'),
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
		],
	},
	// seller 商家所有頁面 ------------------------- seller 商家所有頁面 --------END

	// user 買家所有頁面 ------------------------- user 買家所有頁面 --------START
	{
		path: '/user',
		name: 'User',
		component: () => import('../views/amy/UserMenu.vue'),
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
