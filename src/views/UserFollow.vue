<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" title="" />
			<div class="my-0">
				<NoData text="快來關注商家吧!" v-if="filteredData.length === 0" />
				<div class="row m-0 p-2" v-else>
					<div
						class="col-6 col-md-4 col-lg-4 col-xl-3 p-1 pb-2 m-0 z-1"
						v-for="(item, index) in filteredData"
						:key="index"
					>
						<Card :item="item" @remove="removeItem" />
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
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 組件
import NavTabs from '@/components/NavTabs.vue';
import Card from '@/components/FollowCard.vue';
import Pagenation from '@/components/Pagenation.vue';
import NoData from '@/components/NoData.vue';

import { useCollect, useAuthStore, dayAndToDay } from '@/stores/index';
import { type collectType } from '../type/collectType';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const collect = useCollect();
const navTabs = ref({}) as any;

// 刪除
function removeItem(id: string) {
	collect.allDataF = collect.allDataF.filter(
		(item: { _id: string }) => item._id !== id
	);
}

// 封裝分類邏輯的函數，想要入口統一，之後比較好撰寫內容
function categorized(allData: Array<any>): Array<any> {
	let data = allData;
	// let filterText = navTabs.value.schedule; //固定篩選條件

	//如果要更多篩選條件 可寫在這裡
	// if (filterText === '2') {
	// 	data = data.filter(item => {
	// 		const { endDate, isEnabled } = item; // 從 item 中取出 endDate 和 isEnabled
	// 		if (isEnabled && endDate) {
	// 			// 將 endDate 轉換為 Date 對象
	// 			const endDateObj = new Date(endDate);
	// 			const today = new Date(); // 獲取當前日期
	// 			return endDateObj >= today; // 比較 endDate 是否早於當前日期
	// 		}
	// 		return false;
	// 	});
	// }
	// if (filterText === '3') {
	// 	data = data.filter(item => {
	// 		const { endDate, isEnabled } = item; // 從 item 中取出 endDate 和 isEnabled
	// 		if (isEnabled && endDate) {
	// 			// 將 endDate 轉換為 Date 對象
	// 			const endDateObj = new Date(endDate);
	// 			const today = new Date(); // 獲取當前日期
	// 			return endDateObj < today; // 比較 endDate 是否早於當前日期
	// 		}
	// 		return false;
	// 	});
	// }
	// if (filterText === '4') data = data.filter(itme => itme.isEnabled === false);

	if (data.length > 1) {
		data.sort((a, b) => {
			// 先按 isEnabled 排序，true 在前
			// if (a.isEnabled && !b.isEnabled) return -1;
			// if (!a.isEnabled && b.isEnabled) return 1;

			// // 然后按 isEnabled && $dayAndToDay(endDate, '<=') 排序，true 在前
			// const aEndDateValid = a.isEnabled && dayAndToDay(a.endDate, '<=');
			// const bEndDateValid = b.isEnabled && dayAndToDay(b.endDate, '<=');

			// if (aEndDateValid && !bEndDateValid) return -1;
			// if (!aEndDateValid && bEndDateValid) return 1;

			// // 最后按 isEnabled && $dayAndToDay(startDate, '>=') 排序，true 在前
			// const aStartDateValid = a.isEnabled && dayAndToDay(a.startDate, '>=');
			// const bStartDateValid = b.isEnabled && dayAndToDay(b.startDate, '>=');

			// if (aStartDateValid && !bStartDateValid) return -1;
			// if (!aStartDateValid && bStartDateValid) return 1;

			// 如果都相同，保持原顺序
			return 0;
		});
	}

	return data;
}

// 接收篩選後的結果
const filteredData = computed(() => categorized(collect.allDataF));

// 如果是 seller 的 navTabs 資料
const sellerTitleData = {
	routeName: 'UserCollect',
	title: [
		{
			title: '收藏商品',
			path: { name: 'UserCollect', query: { page: 1 } },
		},
		{
			title: '關注商家',
		},
	],
};

// Card 資料
// const formatCardData = (item: CouponType) =>
// 	({
// 		title: item.couponName,
// 		state: item.isEnabled as boolean, // 狀態：啟用中
// 		type: item.type as number, //優惠劵 型態 Ex:免運劵、優惠劵
// 		percentage: item.percentage as number, //優惠劵 型態 Ex:免運劵、優惠劵
// 		id: item._id as string,
// 		date: {
// 			sDate: item.startDate as string,
// 			eDate: item.endDate as string,
// 		},
// 		btn: [
// 			{
// 				title: '查看',
// 				go: { name: 'SellerCouponCheck', params: { id: item._id } },
// 			},
// 			{
// 				title: '修改',
// 				go: { name: 'SellerCouponCheck', params: { id: item._id } },
// 			},
// 		],
// 	}) as ActivityCardType;

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
	if (route.matched[0].path === '/user') {
		navTabs.value = {
			title: sellerTitleData.title,
		};
		await collect.getFollowAll();
	}
});
</script>

<style scoped></style>
