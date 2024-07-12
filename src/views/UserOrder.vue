<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<!-- 再麻煩測試一下，目前有資料 -->
			<!-- 建議找不到訂單紀錄不要回傳404 -->
			<NoData
				text="快把錢變成喜歡的東西吧!"
				v-if="paginatedData.length === 0"
			/>
			<div class="my-0" v-else>
				<div class="row m-0 p-0">
					<div
						v-for="orderItem in paginatedData"
						:key="orderItem._id"
						class="col-12 col-md-6 p-3 m-0"
					>
						<Card :data="orderItem" />
					</div>
				</div>
				<div class="col-12">
					<Pagenation
						:currentPage="currentPage"
						:perPage="perPage"
						:totalRows="totalRows"
						@update:currentPage="updatePage"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import NavTabs from '@/components/NavTabs.vue';
import Card from '@/components/OrderCard.vue';
import Pagenation from '@/components/Pagenation.vue';
import NoData from '@/components/NoData.vue';
import { useRoute, useRouter } from 'vue-router';

import { useOrder } from '@/stores/index';
import { type OrderType } from '@/type/orderType';
import { type NavTabsTitleType } from '@/type/navTabsTitle';
import { useAuthStore } from '@/stores/index';

const route = useRoute();
const router = useRouter();
const orderStore = useOrder();
const authStore = useAuthStore();
// 呼叫資料 (目前假資料)
const orders = computed((): OrderType[] | [] => orderStore.allData); // 從 store 中獲取所有訂單

const navTabs = ref({}) as any;

// 如果是 seller 的 navTabs 資料
const sellerTitleData = {
	routeName: 'UserOrder',
	title: [
		{
			title: '全部',
			path: { name: 'UserOrder', query: { page: 1, type: '1' } },
		},
		{
			title: '處理中',
			path: { name: 'UserOrder', query: { page: 1, type: '2' } },
		},
		{
			title: '運送中',
			path: { name: 'UserOrder', query: { page: 1, type: '3' } },
		},
		{
			title: '已完成',
			path: { name: 'UserOrder', query: { page: 1, type: '4' } },
		},
	],
	schedule: computed(() => route.query.type || '1'),
};

// 封裝分類邏輯的函數，想要入口統一，之後比較好撰寫內容
function categorized(allData: OrderType[]) {
	let data = allData;
	let filterText = navTabs.value.schedule; //固定篩選條件

	if (filterText === '2') {
		data = data.filter(order => order.state === 1);
	} else if (filterText === '3') {
		data = data.filter(order => order.state === 2);
	} else if (filterText === '4') {
		data = data.filter(order => order.state === 3);
	}
	return data;
}

// Initialize filtered orders based on initial tab selection
// 接收篩選後的結果
const filteredData = computed(() => categorized(orders.value));

// // Function to initialize data on component mount
// const initData = () => {
// 	// 因為要設置路由守衛 會有抓資料的問題，判斷改在這裡獲取 navTabs 的資料
// 	if (route.matched[0].path === '/seller') {
// 		navTabs.value = {
// 			title: sellerTitleData.title,
// 			schedule: sellerTitleData.schedule,
// 		};

// 	}
// };

// 格式化card數據
// const formatCardData = (orderItem: OrderType) => {
// 	console.log(orderItem);
// 	const commonData = {
// 		go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 		img: '', // 取第一個產品的圖片，若無則為空字串
// 		title: orderItem._id,
// 		state: orderItem.state,
// 		price: orderItem.totalPrice,
// 		product_count: orderItem.products?.length,
// 		delivery: 1,
// 		// 如果有需要額外的資料，可以在這裡加入相應的欄位
// 		date: { sDate: orderItem.createdAt },
// 	};

// 	if (route.matched[0].path === '/seller') {
// 		return {
// 			...commonData,
// 			btn: [
// 				{
// 					title: '查看訂單',
// 					go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 				},
// 				{
// 					title: '聯絡買家',
// 					go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 				},
// 			],
// 		};
// 	} else {
// 		return {
// 			...commonData,
// 			btn: [
// 				{
// 					title: '已收到貨',
// 					go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 				},
// 				{
// 					title: '立即評價',
// 					go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 				},
// 				{
// 					title: '查看評價',
// 					go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 				},
// 				{
// 					title: '查看訂單',
// 					go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
// 				},
// 				{
// 					title: '聯絡賣家',
// 					go: { name: 'BuyerOrderCheck', params: { id: orderItem._id } },
// 				},
// 			],
// 		};
// 	}
// };

const currentPage = computed(() => parseInt(route.query.page as string) || 1);
const perPage = ref(6); // 一頁要顯示多少的項目數量
const totalRows = computed(() => filteredData.value.length); // 總項目數量
const maxPage = computed(() =>
	Math.ceil(filteredData.value.length / perPage.value)
);

// 當currentPage或perPage改變時重新計算當前頁的資料
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * perPage.value;
	const end = start + perPage.value;
	return filteredData.value.slice(start, end);
});

// 更新頁碼
const updatePage = (page: number) => {
	const query = { ...route.query, page: page.toString() };
	router.push({ path: route.path, query });
};

// 全局的路由前置守衛，處理篩選條件不存在或資料為空的情況
// router.beforeEach((to, from, next) => {
// 	const { query } = to;
// 	const page = parseInt(query.page as string) || 1;
// 	const filterType = (query.type as string) || '1';

// 	// 確保 navTabs.title 是一個有效的陣列
// 	if (Array.isArray(navTabs.value.title) && navTabs.value.title.length > 0) {
// 		// 判斷目標文字是否存在於 path.query.type 中
// 		const isInNavTabs = navTabs.value.title.some(
// 			(tab: any) => tab.path.query.type === filterType
// 		);

// 		// 篩選條件不存在的情況
// 		if (!isInNavTabs) {
// 			next({ path: to.path, query: { page: 1, type: '1' } });
// 			return;
// 		}
// 		if (page > maxPage.value) {
// 			// 判斷大於目前最大的頁數
// 			next({ path: to.path, query: { ...query, page: 1 } });
// 			return;
// 		}
// 	}

// 	next();
// });

// Fetch data on component mount
onMounted(async () => {
	// 因為要設置路由守衛 會有抓資料的問題，判斷改在這裡獲取 navTabs 的資料
	if (route.matched[0].path === '/user') {
		navTabs.value = {
			title: sellerTitleData.title,
			schedule: sellerTitleData.schedule,
		};
		await orderStore.gettingAllOrders();
	}
	console.log(paginatedData.value);
});

// 註冊一個提取所有訂單的方法，先寫死的資料測試
// onMounted(async () => {
// 	await orderStore.getAllOrders('661e0d13e8992a1bd4b86caf');
// });
</script>
