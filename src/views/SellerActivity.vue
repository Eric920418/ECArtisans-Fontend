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
						<Card
							:data="{
								go: {
									name: 'SellerActivityCheck',
									params: { id: couponItem.id },
								}, // Card 轉跳 to 的內容
								img: 'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
								title: couponItem.discountName,
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
						/>
						<!-- <div
							class="card card-hover"
							@click="
								go({
									name: 'SellerActivityCheck',
									params: { id: couponItem.id },
								})
							"
						>
							<div class="row m-0 p-0">
								<div class="productCard-img-100 p-0">
									<img
										src="https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__"
										class="img-eca"
									/>
								</div>
								<div class="col p-0 m-0">
									<div
										class="border-bottom pb-1 mb-1 d-flex align-items-center"
									>
										<h3
											class="card-title fs-5 m-0 neutral-01 p-0 me-2 flex-grow-1 card-text-hover"
										>
											{{ couponItem.discountName }}
										</h3>

										<div>
											<p class="text-enable neutral-02 mb-0 text-nowrap">
												啟用中
											</p>
										</div>
									</div>
									<div class="d-flex">
										 <p
									class="text-card-Activity btn-Bg-active rounded-1 text-primary mb-0 me-2"
								>
									免運券
								</p>
										<p class="mb-0 mt-1 text-no neutral-02">
											編號：{{ couponItem.id }}
										</p>
									</div>
									<p class="text-date mb-0 mt-1">
										有效日期：
										{{
											getDate(couponItem.start_date) +
											' ~ ' +
											getDate(couponItem.due_date)
										}}
									</p>
									<div class="d-flex p-0 d-flex justify-content-end mt-2">
										<button
											class="btn btn-outline-primary px-4 me-2 flex-shrink"
										>
											修改
										</button>
										<button class="btn btn-outline-primary px-4 flex-shrink">
											查看
										</button>
									</div>
								</div>
							</div>
						</div> -->
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
import { useRoute } from 'vue-router';
import { useCoupon, useAuthStore } from '@/stores/index'; //之後要改為 use活動
import { getDate } from '../setup/getDate';
import NavTabs from '../components/NavTabs.vue';
import router from '@/router';
import Card from '../components/ActivityCard.vue';

const updateSchedule = (newSchedule: string) => {
	navTabs.value.schedule = newSchedule;
};

const route = useRoute();
const authStore = useAuthStore();
const userStore = useCoupon(); //之後要改為 use活動
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
