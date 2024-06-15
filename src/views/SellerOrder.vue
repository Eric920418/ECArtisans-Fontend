<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" @update-schedule="updateSchedule" />
			<div class="my-0">
				<div class="row m-0 p-0">
					<div
						v-for="orderItem in paginatedData"
						:key="orderItem._id"
						class="col-12 p-3 m-0"
					>
						<Card :data="formatCardData(orderItem)" />
					</div>
				</div>
				<div class="col-12">
					<!-- 使用 Pagenation 子組件來顯示分頁 -->
					<!-- 當 Pagenation 組件中的頁碼更新時，子組件傳遞"update:currentPage"事件並觸發 updatePage 方法 -->
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

import { useRoute } from 'vue-router';
import router from '@/router';
import { useOrderStore } from '@/stores/index';
import { type Order } from '@/type/orderType';
import { type navTabsTitle } from '@/type/navTabsTitle';
import { useAuthStore } from '@/stores/index';

const route = useRoute();
const orderStore = useOrderStore();

// Define navTabs structure
const navTabs = ref<{
	routeName: string;
	title: {
		title: string;
		path: { name: string; query: { page: number; filter: string } };
	}[];
	schedule: string;
}>({
	routeName: 'SellerOrder',
	title: [
		{
			title: '全部',
			path: { name: 'SellerOrder', query: { page: 1, filter: '未結束' } },
		},
		{
			title: '處理中',
			path: { name: 'SellerOrder', query: { page: 1, filter: '處理中' } },
		},
		{
			title: '運送中',
			path: { name: 'SellerOrder', query: { page: 1, filter: '運送中' } },
		},
		{
			title: '已完成',
			path: { name: 'SellerOrder', query: { page: 1, filter: '已完成' } },
		},
	],
	schedule: '全部', // 初始設定
});

// Fetch orders from the store
// 呼叫資料 (目前假資料)
const orders = computed((): Order[] | [] => orderStore.gettingAllOrders); // 從 store 中獲取所有訂單

// Categorize orders based on their status
const categorizedOrders = ref<{ [key: string]: Order[] }>({
	全部: orders.value,
	處理中: orders.value.filter(
		(order: Order) => order.state === 1 || order.state === 2
	),
	運送中: orders.value.filter(
		(order: Order) => order.state === 3 || order.state === 4
	),
	已完成: orders.value.filter((order: Order) => order.state === 5),
});

// Initialize filtered orders based on initial tab selection
const filteredOrders = ref<Order[]>(categorizedOrders.value['全部']);

// Function to initialize data on component mount
const initData = () => {
	if (route.matched[0].path === '/seller') {
		navTabs.value.schedule = '全部'; // Reset schedule on mount
	}
};

// 格式化 Card 的数据
const formatCardData = (orderItem: Order) => ({
	go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
	img: '', // 暂时没有商品图像信息
	title: orderItem.orderNumber,
	state: orderItem.state,
	price: orderItem.price,
	date: { sDate: orderItem.date },
	btn: [
		{
			title: '查看訂單',
			go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
		},
		{
			title: '聯絡買家',
			go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
		},
	],
});

// Function to update filtered orders based on selected tab
const updateSchedule = (newSchedule: navTabsTitle) => {
	if (newSchedule && newSchedule.title) {
		navTabs.value.schedule = newSchedule.title;
		filteredOrders.value = categorizedOrders.value[newSchedule.title];
	}
};

// 設置初始變數
const currentPage = ref(1); // 當前頁碼，初始為1
const perPage = ref(2); // 一頁要顯示多少的項目數量
const totalRows = ref(filteredOrders.value.length); // 總項目數量

// 當currentPage或perPage改變時重新計算當前頁的資料
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * perPage.value;
	const end = start + perPage.value;
	return filteredOrders.value.slice(start, end);
});

// 更新頁碼
const updatePage = (page: number) => {
	currentPage.value = page;
};
// Fetch data on component mount
onMounted(() => {
	initData();
});
</script>
