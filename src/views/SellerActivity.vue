<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<div class="my-0">
				<NoData
					text="快建立活動增加曝光度!"
					v-if="paginatedData.length === 0"
				/>
				<div class="row m-0 p-0" v-else>
					<div
						v-for="(activityItem, activityIndex) in paginatedData"
						:key="activityIndex"
						class="col-12 col-md-6 p-3 m-0"
					>
						<ActivityCard :data="formatCardData(activityItem)" />
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
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 組件
import NavTabs from '@/components/NavTabs.vue';
import ActivityCard from '@/components/SellerActivityCard.vue';
import Pagenation from '@/components/Pagenation.vue';
import NoData from '@/components/NoData.vue';

import { useActivity, useAuthStore, dayAndToDay } from '@/stores/index';
import { type activityAllType } from '@/type/activityType';
import { type ActivityCardType } from '@/type/ActivityCardType';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const userStore = useActivity();
const navTabs = ref({}) as any;
// 封裝分類邏輯的函數，想要入口統一，之後比較好撰寫內容
function categorized(allData: activityAllType[]) {
	let data = allData;
	let filterText = navTabs.value.schedule; //固定篩選條件
	//如果要更多篩選條件 可寫在這裡
	if (filterText === '2') {
		data = data.filter(item => {
			const end_date = item.end_date as string; // 從 item 中取出 end_date 和 isEnabled
			if (end_date) {
				// 將 end_date 轉換為 Date 對象
				const end_dateObj = new Date(end_date);
				const today = new Date(); // 獲取當前日期
				return end_dateObj >= today; // 比較 end_date 是否早於當前日期
			}
			return false;
		});
	}
	if (filterText === '3') {
		data = data.filter(item => {
			const end_date = item.end_date as string; // 從 item 中取出 end_date 和 isEnabled
			if (end_date) {
				// 將 end_date 轉換為 Date 對象
				const end_dateObj = new Date(end_date);
				const today = new Date(); // 獲取當前日期
				return end_dateObj < today; // 比較 end_date 是否早於當前日期
			}
			return false;
		});
	}
	if (data.length > 1) {
		data.sort((a, b) => {
			// 先按 isEnabled 排序，true 在前
			if (a.end_date && !b.end_date) return -1;
			if (!a.start_date && b.start_date) return 1;

			// 如果都相同，保持原顺序
			return 0;
		});
	}
	return data;
}

// 接收篩選後的結果
const filteredData = computed(() => categorized(userStore.allData));

// 如果是 seller 的 navTabs 資料
const sellerTitleData = {
	routeName: 'SellerActivity',
	title: [
		{
			title: '全部',
			path: { name: 'SellerActivity', query: { page: 1, type: '1' } },
		},
		{
			title: '未結束',
			path: { name: 'SellerActivity', query: { page: 1, type: '2' } },
		},
		{
			title: '結束',
			path: { name: 'SellerActivity', query: { page: 1, type: '3' } },
		},
	],
	schedule: computed(() => {
		return (route.query.type as string) || '1';
	}),
};

// Card 資料
const formatCardData = (item: activityAllType) =>
	({
		img: item.activity_image as string,
		title: item.activity_name as string,
		id: item.activity_id as string,
		date: {
			sDate: item.start_date as string,
			eDate: item.end_date as string,
		},
		btn: [
			{
				title: '查看',
				go: { name: 'SellerActivityCheck', params: { id: item.activity_id } },
			},
			{
				title: '修改',
				go: { name: 'SellerActivityCheck', params: { id: item.activity_id } },
			},
		],
	}) as ActivityCardType;

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
	router.push({ query: { ...route.query, page: page } });
};

onMounted(async () => {
	// 因為要設置路由守衛 會有抓資料的問題，判斷改在這裡獲取 navTabs 的資料
	if (route.matched[0].path === '/seller') {
		navTabs.value = {
			title: sellerTitleData.title,
			schedule: sellerTitleData.schedule,
			btn: { title: '新增活動', path: { name: 'SellerActivityNew' } },
		};
		await userStore.getActivityAll();
	}
});
</script>

<style lang="scss" scoped></style>
