<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<v-form @submit="onSubmit" class="m-0 p-0">
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 表格 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<!-- @submit="onSubmit" -->
						<div
							class="d-flex justify-content-between align-items-center mb-4 p-0"
						>
							<h3 class="fs-5 p-0 neutral-01 mb-0">{{ init.schedule }}</h3>
							<p>編號：{{ order?._id }}</p>

							<a class="mb-0" v-if="route.name === 'SellerCouponCheck'">
								立即停止
							</a>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">訂單編號</label>
							{{ order?.orderNumber }}
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="start_date" class="mb-1">使用期限</label>
							<div class="d-flex">
								{{ order?.date }}
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<p>支付方式</p>
							<div class="d-flex">
								{{ order?.pay }}
							</div>
						</div>
					</div>
				</div>
				<div
					class="col bg-white p-3 px-sm-5 mx-0 mx-md-3 rounded-0 sticky-bottom d-flex justify-content-end"
				>
					<button
						type="button"
						class="btn btn-outline-primary px-5 mx-1 mx-sm-2 me-md-4"
						@click="router.back()"
					>
						取消
					</button>
					<button type="submit" class="btn btn-primary px-5 m-0 ms-1 ms-sm-2">
						{{ init.btn }}
					</button>
				</div>

				<br />
				{{ order }}
			</v-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { alertStore } from '@/main'; // 導入實例

import NavTabs from '../components/NavTabs.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
import { storeToRefs } from 'pinia';
import { useOrder, useAuthStore, useResize } from '@/stores/index';
import { type DetailedOrderType } from '@/type/orderType';

const init = ref({}) as any;

// 接收'props'
const props = defineProps<{
	id: string;
}>();

const orderStore = useOrder();
const { resize } = useResize();
const authStore = useAuthStore();
const isLoading = computed(() => orderStore.isLoading); // 從 store 中獲取加載狀態
// const { gettingSingleOrder } = storeToRefs(orderStore);
const order = computed((): DetailedOrderType | null => null); // 將從computed gettingSingleOrder取出的值定義好型態

const navTabs = ref({}) as any;
// navTab + seller 畫面下所有資料
const sellerTitleData = {
	routeName: 'SellerOrderCheck',
	title: [
		{
			title: '訂單',
			path: { name: 'SellerOrder', query: { page: 1 } },
		},
		{
			title: '查看訂單',
		},
	],
	schedule: '查看訂單', //目前頁面
	btn: '修改',
};

// 完成後送出
function onSubmit(isValue: any | void) {
	// if (isValue.productType === 1 && isValue.productChoose?.length === 0) {
	// 	alertStore.error('請選擇商品');
	// } else {
	// 	if (isValue.productType === 0) isValue.productChoose = [];
	// 	userStore.getCouponEdit(isValue, authStore.token);
	// }
}

// Function to initialize data on component mount
const initData = () => {
	// 因為要設置路由守衛 會有抓資料的問題，判斷改在這裡獲取 navTabs 的資料
	if (route.matched[0].path === '/seller') {
		if (route.name === 'SellerOrderCheck') {
			// 修改/查看狀態
			init.value = sellerTitleData;
			navTabs.value = {
				title: sellerTitleData.title,
				schedule: sellerTitleData.schedule,
				breadcrumb: true,
			};
			// userStore.getCoupon(route.params.id as string, authStore.token);
		}
	} else if (route.matched[0].path === '/user') {
		// init.value = userTitleData;
	}
	// userStore.getCouponAll(id, page, token);
};

onMounted(async () => {
	// pinia沒有這筆資料，就重新呼叫function
	// if (!orderStore.oneOrder || orderStore.oneOrder._id !== props.id) {
	// 	await orderStore.getOneOrderByOrderID(props.id);
	// }
});

onMounted(() => {
	initData();
});
</script>
