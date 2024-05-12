import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore';

import index from '../views/PageIndex.vue'

// 前台商場頁面(非會員中心) ---------------------------------START

// 前台商場頁面(非會員中心) ---------------------------------END
import IndexFAQ from "../views/eric/IndexFAQ.vue"

// 登入註冊相關頁面 ---------------------------------START
import SellerLogin from "../views/eric/SellerLogin.vue"
import SellerSigup from "../views/eric/SellerSigup.vue"
import UserLogin from "../views/eric/UserLogin.vue"
import UserSigup from "../views/eric/UserSigup.vue"
// 登入註冊相關頁面 ---------------------------------END

// seller 商家所有頁面 ---------------------------------START
import SellerOverview from "../views/amy/SellerOverview.vue"
import SellerProfile from "../views/amy/SellerProfile.vue"
import SellerHome from "../views/eliza/SellerHome.vue"

// seller 商家所有頁面 ---------------------------------END


// user 買家所有頁面 ---------------------------------START
import UserProfile from "../views/amy/UserProfile.vue"
// user 買家所有頁面 ---------------------------------END


// import eric from '../router/eric'
// import eliza from '../router/eliza'
// import amy from '../router/amy'

const routes = [
  {path: '/',name: 'index',component: index},
  {path: '/FAQ', name: 'IndexFAQ', component: IndexFAQ},
  {path: '/SellerLogin', name: 'SellerLogin', component: SellerLogin},
  {path: '/SellerSigup', name: 'SellerSigup', component: SellerSigup},
  {path: "/UserLogin" , name: "UserLogin", component: UserLogin},
  {path: "/UserSigup" , name: "UserSigup", component: UserSigup},

  // seller 商家所有頁面 ------------------------- seller 商家所有頁面 --------START
  {
    path: '/seller',
    name: "Seller",
    component: () => import('../views/amy/Seller.vue'), 
    children: [
      {
        path: 'home', // 開店推薦主頁
        name: "SellerHome",
        component: SellerHome,
      },
      {
        path: 'profile', // 商家資訊
        name: "SellerProfile",
        component: SellerProfile,
        meta: { requiresSellerAuth: true } // 商家身份登入後才能訪問
      },
      {
        path: 'overview', // 商家總覽
        name: "SellerOverview",
        component: SellerOverview,
        meta: { requiresSellerAuth: true } // 商家身份登入後才能訪問
      },
    ],
  },
  // seller 商家所有頁面 ------------------------- seller 商家所有頁面 --------END

  // user 買家所有頁面 ------------------------- user 買家所有頁面 --------START
  {
    path: '/user',
    // component: UserBase, 
    children: [
      // {
      //   path: 'home', // 
      //   component: UserHome,
      // },
      {
        path: 'profile', // 會員中心
        name: 'UserProfile',
        component: UserProfile,
        meta: { requiresUserAuth: true } // 買家身份登入後才能訪問
      }
    ],
  },
  // user 買家所有頁面 ------------------------- user 買家所有頁面 --------END

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 設置路由守衛
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const loggedIn = authStore.isLoggedIn
  const accountType = authStore.accountType
  const requiresSellerAuth = to.matched.some(record => record.meta.requiresSellerAuth);
  const requiresUserAuth = to.matched.some(record => record.meta.requiresUserAuth);

  if ((requiresSellerAuth || requiresUserAuth) && !loggedIn) {
    // 如果需要商家或買家身份驗證但未登入，讓用戶返回指定頁面登入
    if (requiresSellerAuth) {
      alert('商家尚未登入！')
      next({ name: 'SellerLogin' }); // 導向商家登入頁面
    } else if (requiresUserAuth) {
      alert('買家尚未登入！')
      next({ name: 'UserLogin' }); // 導向買家登入頁面
    }
  } else if (requiresSellerAuth && loggedIn && accountType !== 'seller') {
    // 如果需要商家身份驗證且已登入，但登入的角色不是商家，則重新回到商家登入頁面
    alert('沒有商家權限，重新登入！')
    next({ name: 'SellerLogin' }); // 導向買家登入頁面
  } else if (requiresUserAuth && loggedIn && accountType !== 'user') {
    // 如果需要買家身份驗證且已登入，但登入的角色不是買家，則重新回到買家登入頁面
    alert('沒有買家權限，重新登入！')
    next({ name: 'UserLogin' }); // 導向買家登入頁面
  } else {
    next(); // 否則繼續導航
  }
});

export default router