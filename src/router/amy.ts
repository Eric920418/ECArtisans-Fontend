import ShopHome from "../views/amy/ShopHome.vue"
import ShopSeller from "../views/amy/ShopSeller.vue"
import user from "../views/amy/UserArea.vue"

export default [
    {path: '/ShopHome', name: 'ShopHome', component: ShopHome},
    {path: '/ShopSeller', name: 'ShopSeller', component: ShopSeller},
    {path: '/user', name: 'user', component: user},
]