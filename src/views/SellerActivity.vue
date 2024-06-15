<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" @update-schedule="updateSchedule" />
			<div class="my-0">
				<div class="row m-0 p-0">
					<div
						v-for="couponItem in data"
						:key="couponItem.id"
						class="col-12 col-lg-6 p-3 m-0"
					>
						{{ couponItem }}
						<!-- <Card
							:data="{
								go: {
									name: 'SellerActivityCheck',
									params: { id: couponItem.id },
								}, // Card 轉跳 to 的內容
								img: couponItem.activity_images,
								title: couponItem.activity_name,
								state: '啟用中', // 狀態：啟用中
								type: '免運劵', //優惠劵 型態 Ex:免運劵、優惠劵
								id: couponItem.id, //編號
								date: {
									//有效日期
									sDate: couponItem.start_date,
									eDate: couponItem.due_date,
								},
								btn: [
									{
										title: '查看',
										go: {
											name: 'SellerActivityCheck',
											params: { id: couponItem.id },
										},
									},
									{
										title: '修改',
										go: {
											name: 'SellerActivityCheck',
											params: { id: couponItem.id },
										},
									},
								],
							}"
						/> -->
					</div>
				</div>
				<div class="col-12">
					<!-- <Page :data="paginationData" :path="path" /> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import NavTabs from '../components/NavTabs.vue';
import Card from '../components/ActivityCard.vue';

import { useRoute } from 'vue-router';
import router from '@/router';

import { useActivity, useAuthStore, getDate } from '@/stores/index'; //之後要改為 use活動

const updateSchedule = (newSchedule: string) => {
	navTabs.value.schedule = newSchedule;
};

const route = useRoute();
const authStore = useAuthStore();
const userStore = useActivity(); //之後要改為 use活動
// 基本
const token = authStore.token;
const id = authStore.id;
const data = ref(userStore.allData) as any;

// 頁碼 準備要做成元件，未完成
const paginationData = ref({
	totalPages: 90, // 总页数
	currentPage: 1, // 当前页数
	hasPrev: false, // 是否有上一页
	hasNext: true, // 是否有下一页
});

const userTitleData = {
	routeName: 'UserActivity',
	title: ['未結束', '結束', '停止'],
	schedule: '未結束', //目前頁面
};
const sellerTitleData = {
	routeName: 'SellerActivity',
	title: ['未結束', '結束', '停止'],
	schedule: '未結束', //目前頁面
};

const init = ref({}) as any;
const navTabs = ref({}) as any;
const getData = () => {
	if (route.matched[0].path === '/seller') {
		init.value = sellerTitleData;
		navTabs.value = {
			title: sellerTitleData.title,
			schedule: sellerTitleData.schedule,
			btn: { title: '新增活動/公告', path: { name: 'SellerActivityNew' } },
		};
	} else if (route.matched[0].path === '/user') {
		init.value = userTitleData;
		navTabs.value = {
			title: sellerTitleData.title,
			schedule: sellerTitleData.schedule,
		};
	}
	// 呼叫資料 (目前假資料)
};
onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped></style>
