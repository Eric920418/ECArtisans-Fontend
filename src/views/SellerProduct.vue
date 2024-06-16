<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" @update-schedule="updateSchedule" />
			<div class="my-0">
				<div class="row m-0 p-0" v-if="data">
					<div
						v-for="couponItem in data"
						:key="couponItem._id"
						class="col-12 col-md-6 p-3 m-0"
					>
						<!-- <Card
							:data="{
								title: couponItem.couponName,
								state: '啟用中', // 狀態：啟用中
								type: couponItem.type, //優惠劵 型態 Ex:免運劵、優惠劵
								percentage: couponItem.percentage, //優惠劵 型態 Ex:免運劵、優惠劵
								id: couponItem._id, //編號
								date: {
									//有效日期
									sDate: couponItem.startDate,
									eDate: couponItem.endDate,
								},
								btn: [
									{
										title: '查看',
										go: {
											name: 'SellerCouponCheck',
											params: { id: couponItem._id },
										},
									},
									{
										title: '修改',
										go: {
											name: 'SellerCouponCheck',
											params: { id: couponItem._id },
										},
									},
								],
							}"
						/> -->
					</div>
				</div>
				<div class="col-12">
					<p>
						{{ data }}
					</p>
					<!-- <Page :data="paginationData" :path="path" /> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

import { useProduct, useAuthStore, getDate } from '@/stores/index';
import { type NavTabsTitleType } from '@/type/navTabsTitle';

// 組件
import NavTabs from '../components/NavTabs.vue';
import Card from '../components/ActivityCard.vue';

const route = useRoute();
const authStore = useAuthStore();
const userStore = useProduct();
// 基本
const data = computed(() => userStore.allData);

// 頁碼 準備要做成元件，未完成

// 如果是 當我選中 navTabs資料後切換 的 navTabs 資料
const updateSchedule = (newSchedule: NavTabsTitleType) => {
	if (Object.hasOwn(newSchedule, 'title') && newSchedule.title) {
		navTabs.value.schedule = newSchedule.title;
	}
};
// 如果是 seller 的 navTabs 資料
const sellerTitleData = {
	routeName: 'SellerCoupon',
	title: [
		{
			title: '未結束',
			path: { name: 'SellerCoupon', query: { page: 1, filter: '未結束' } },
		},
		{
			title: '結束',
			path: { name: 'SellerCoupon', query: { page: 1, filter: '結束' } },
		},
		{
			title: '停止',
			path: { name: 'SellerCoupon', query: { page: 1, filter: '停止' } },
		},
	],
	schedule: '未結束', //目前頁面
};

const navTabs = ref({}) as any;
const getData = () => {
	if (route.matched[0].path === '/seller') {
		navTabs.value = {
			title: sellerTitleData.title,
			schedule: sellerTitleData.schedule,
			btn: { title: '新增優惠劵', path: { name: 'SellerProductNew' } },
		};
	}
	//  else if (route.matched[0].path === '/user') {
	// 	init.value = userTitleData;
	// 	navTabs.value = {
	// 		title: sellerTitleData.title,
	// 		schedule: sellerTitleData.schedule,
	// 	};
	// }
	// 呼叫資料 (目前假資料)
};
onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped></style>
