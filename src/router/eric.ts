import IndexFAQ from "../views/eric/IndexFAQ.vue"
import SellerLogin from "../views/eric/SellerLogin.vue"
import SellerSigup from "../views/eric/SellerSigup.vue"
import UserLogin from "../views/eric/UserLogin.vue"

// 這邊本來有的寫FAQ有的寫FAQ,統一改成FAQ 
export default [
    {path: '/FAQ', name: 'IndexFAQ', component: IndexFAQ},
    {path: '/SellerLogin', name: 'SellerLogin',component: SellerLogin},
    {path: '/SellerSigup', name: 'SellerSigup',component: SellerSigup},
    {path: "/UserLogin" , name: "UserLogin", component: UserLogin}

]