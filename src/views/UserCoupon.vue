<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" @update-schedule="updateSchedule" />
			<div class="my-0">
				<div class="row m-0 p-0">
					<div
						v-for="couponItem in data"
						:key="couponItem.id"
						class="col-12 col-md-6 p-3 m-0"
					>
						<div
							class="card card-hover"
							@click="
								go({ name: 'SellerCouponCheck', params: { id: couponItem.id } })
							"
						>
							<div class="border-bottom pb-1 mb-1 d-flex align-items-center">
								<h3
									class="fs-5 m-0 neutral-01 p-0 me-2 flex-grow-1 card-text-hover"
								>
									<!-- text-primary -->
									{{ couponItem.discountName }}
								</h3>

								<div>
									<p class="text-enable neutral-02 mb-0">啟用中</p>
								</div>
							</div>
							<div class="d-flex">
								<p
									class="text-card-coupon btn-Bg-active rounded-1 text-primary mb-0 me-2"
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
								<button class="btn btn-outline-primary px-4 me-2">修改</button>
								<button class="btn btn-outline-primary px-4">
									查看
									<!-- :to="{ name: 'SellerCouponNew' }"1 -->
								</button>
							</div>
						</div>
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
import { useCoupon, useAuthStore } from '@/stores/index';
import { getDate } from '../setup/getDate';
import NavTabs from '../components/NavTabs.vue';
import router from '@/router';
// import Page from '../components/pagination.vue';

const updateSchedule = (newSchedule: string) => {
	navTabs.value.schedule = newSchedule;
};

const route = useRoute();
const authStore = useAuthStore();
const userStore = useCoupon();
// 基本
const token = authStore.token;
const id = authStore.id;
const data = ref(userStore.allData) as any;

function go(path: Object) {
	router.push(path);
}

// 頁碼 準備要做成元件，未完成
const paginationData = ref({
	totalPages: 90, // 总页数
	currentPage: 1, // 当前页数
	hasPrev: false, // 是否有上一页
	hasNext: true, // 是否有下一页
});

const userTitleData = {
	routeName: 'UserCoupon',
	title: ['未結束', '結束', '停用'],
	schedule: '未結束', //目前頁面
};
const sellerTitleData = {
	routeName: 'SellerCoupon',
	title: ['未結束', '結束', '停用'],
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
			btn: { title: '新增優惠劵', path: { name: 'SellerCouponNew' } },
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

<style lang="scss" scoped>
.text-enable {
	padding: 2px 0px;
	flex-shrink: 0 !important; //禁止擠壓
	font-size: 0.75rem; //12
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 0.875rem; //14
	}
}
.text-no {
	font-size: 0.75em;
}
.text-date {
	font-size: 0.875em;
}
</style>
