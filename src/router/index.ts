import { createRouter, createWebHashHistory } from 'vue-router'
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
// import Seller from "../views/amy/Seller.vue"
import SellerOverview from "../views/amy/SellerOverview.vue"
import SellerProfile from "../views/amy/SellerProfile.vue"


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
        path: 'profile', // 商家資訊
        name: "SellerProfile",
        component: SellerProfile,
      },
      {
        path: 'overview', // 商家總覽
        name: "SellerOverview",
        component: SellerOverview,
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
        component: UserProfile,
      }
    ],
  },
  // user 買家所有頁面 ------------------------- user 買家所有頁面 --------END

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
