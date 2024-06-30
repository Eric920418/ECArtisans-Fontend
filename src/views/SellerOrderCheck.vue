<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<v-form @submit="onSubmit" class="m-0 p-0">
				<div
					class="row px-3 m-0 justify-content-center align-items-center"
					style="padding-bottom: 2rem"
				>
					<div class="col-8 my-3">
						<div class="position-relative m-4">
							<div
								class="progress"
								role="progressbar"
								aria-label="Progress"
								aria-valuenow="50"
								aria-valuemin="0"
								aria-valuemax="100"
								style="height: 1px"
							>
								<div class="progress-bar" style="width: 50%"></div>
							</div>
							<div
								v-for="(state, index) in orderStates"
								:key="state.id"
								:class="[
									'position-absolute',
									'top-0',
									'text-center',
									'translate-middle',
									{
										'start-0': index === 0,
										'start-50': index === 1,
										'start-100': index === 2,
									},
								]"
							>
								<div style="position: relative">
									<button
										type="button"
										:class="buttonClass(state.id)"
										style="width: 2rem; height: 2rem"
									>
										{{ state.id }}
									</button>
									<div
										style="
											position: absolute;
											top: 2.5rem;
											left: 50%;
											transform: translateX(-50%);
											width: max-content;
										"
									>
										<div>
											<h6>{{ state.name }}</h6>
										</div>
										<div>{{ state.date }}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 配送方式 -->
				<div
					class="d-flex justify-content-between align-items-center m-3 p-4 p-sm-5"
				>
					<div class="d-flex align-items-center gap-3">
						<h3 class="fs-5 neutral-01 mb-0 me-3">配送方式</h3>
						<p class="mb-0">
							<span
								class="text-card-coupon btn-Bg-active rounded-1 text-primary"
							>
								{{ deliveryMethod }}
							</span>
						</p>
					</div>
					<div class="btn btn-primary">點我送貨</div>
				</div>
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 購買者資料 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<!-- @submit="onSubmit" -->
						<div class="d-flex flex-column align-items-start mb-4 p-0">
							<h3 class="fs-5 p-0 neutral-01 mb-0 mb-4 p-0">購買者資料</h3>
							<div class="d-flex align-items-start" style="width: 100%">
								<p class="mb-1 flex-grow-1">姓名：{{ '王小明' }}</p>
								<p class="mb-1 flex-grow-1">手機：{{ '09123456' }}</p>
								<p class="mb-1 flex-grow-1">
									地址：{{ order.address || '100 台北市中正區動物街20號' }}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 訂單資訊 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<!-- @submit="onSubmit" -->
						<div
							class="d-flex justify-content-between align-items-center mb-4 p-0"
						>
							<h3 class="fs-5 p-0 neutral-01 mb-0">{{ '訂單資訊' }}</h3>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<p class="fs-5 p-0 mb-0 mb-4 p-0" style="color: var(--primary)">
								訂單編號：{{ order._id }}
							</p>
						</div>
						<!-- 訂單詳細資訊 -->
						<!-- @submit="onSubmit" -->
						<table style="width: 100%; border-collapse: collapse">
							<thead>
								<tr>
									<th style="border: 1px solid #ddd; padding: 8px">
										{{ '店家名稱' }}
									</th>
									<th style="border: 1px solid #ddd; padding: 8px">商品名稱</th>
									<th style="border: 1px solid #ddd; padding: 8px">單價</th>
									<th
										style="
											border: 1px solid #ddd;
											padding: 8px;
											text-align: center;
										"
									>
										數量
									</th>
									<th
										style="
											border: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										價格
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(product, index) in order.products" :key="index">
									<td
										style="border: 1px solid #ddd; padding: 8px; width: 100px"
									>
										<img
											:src="product.format.image"
											alt="商品圖"
											style="width: 100%; height: 100%; object-fit: cover"
										/>
									</td>
									<td style="border: 1px solid #ddd; padding: 8px">
										{{ product.format.title }}
									</td>
									<td style="border: 1px solid #ddd; padding: 8px">
										$ {{ product.format.price }}
									</td>
									<td
										style="
											border: 1px solid #ddd;
											padding: 8px;
											text-align: center;
										"
									>
										{{ product.quantity }}
									</td>
									<td
										style="
											border: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										$ {{ formatPrice(product.price) }}
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td
										colspan="4"
										class="neutral-02"
										style="
											border-left: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										優惠折扣
									</td>
									<td
										class="neutral-02"
										style="
											border-right: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										-{{ formatPrice(1000) }}
									</td>
								</tr>
								<tr>
									<td
										class="neutral-02"
										colspan="4"
										style="
											border-left: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										運費
									</td>
									<td
										class="neutral-02"
										style="
											border-right: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										+{{ formatPrice(order.fare) }}
									</td>
								</tr>
								<tr>
									<td
										colspan="1"
										style="
											border-top: 1px solid #ddd;
											border-left: 1px solid #ddd;
											border-bottom: 1px solid #ddd;
											padding: 8px;
											text-align: left;
										"
									>
										付款方式：
									</td>
									<td
										style="
											border-bottom: 1px solid #ddd;
											border-top: 1px solid #ddd;
											padding: 8px;
											color: var(--primary);
											text-align: left;
										"
										class="fs-5 p-0 neutral-01 mb-0"
									>
										{{ payMethod || '信用卡' }}
									</td>
									<td
										class="fs-5 p-0 neutral-01 mb-0"
										colspan="2"
										style="
											border-top: 1px solid #ddd;
											border-bottom: 1px solid #ddd;
											padding: 8px;
											text-align: right;
										"
									>
										訂單金額
									</td>
									<td
										style="
											border-top: 1px solid #ddd;
											border-right: 1px solid #ddd;
											border-bottom: 1px solid #ddd;
											padding: 8px;
											color: var(--primary);
											text-align: right;
										"
										class="fs-5 p-0 neutral-01 mb-0"
									>
										NT$ {{ formatPrice(order.totalPrice) }}
									</td>
								</tr>
							</tfoot>
						</table>
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
import { getDate, getISO } from '@/setup/globalFunction';

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
// const order = computed((): DetailedOrderType | null => null); // 將從computed gettingSingleOrder取出的值定義好型態

const order = ref({
	_id: '666ee45fdf3a67628239d206', // 訂單id
	user: '666e9fb666bd265fbad38237', // user id
	seller: {
		_id: '66668f5008649a808e8cc52b', // 賣家id
	},
	products: [
		{
			product: {
				_id: '66669d69dfd0bb2c45e6309e', //商品id
			},
			format: {
				//商品規格
				title: '白色120W', //規格名稱
				price: 800, // 價錢
				cost: 500, // 成本
				stock: 300, // 庫存
				image:
					'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/120d317c-e861-4846-a71b-22b79d021316.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=eT1wr94NsgKZNqAeHk0Np143ESO8pod8fWt8Y75GDSO0T5bws9Tp%2Fd7u6VSiCFxqSSRwqg6yuYIHchJldY3lySrlD3PTYXUSJWJJhjxYE%2BOZbtki9N0aU10GQ1IUDW7EkC9j4nwj3rnaT%2FaOY2GXlRQbyOc8m8%2BgQ82jhr9%2Fklj8ry5xZBZ82F9ECcli0JFWa1L6IIyron5QGyx0OrxpbdnACYypwc6lJFn8VKRPpZsNVckg2mkoK3%2FuICHErvTvlGxDweZl0f4T1thbfISlkJt7%2BCcOTQGFUe6MTvWhK%2Fw0A%2FInMMUgM0qDjz0e%2FzD6JbX8mYwj8t%2BltNZ7LDEDYg%3D%3D',
				color: [
					'白色', // 顏色
				],
				_id: '66669d69dfd0bb2c45e6309f', // 規格的id
			},
			quantity: 1, //購買數量
			price: 800, // 此產品的總價（可能根據數量計算）
			_id: '666ee45fdf3a67628239d207', // 此訂單產品的唯一id(這個 _id 可以用來追蹤訂單中的特定產品，例如，如果用戶想要修改訂單中的某個產品的數量，就可以使用這個 _id 來找到該產品)
		},
		{
			product: {
				_id: '66669d69dfd0bb2c45e6309c', //商品id
			},
			format: {
				//商品規格
				title: '白色100W', //規格名稱
				price: 800, // 價錢
				cost: 500, // 成本
				stock: 300, // 庫存
				image:
					'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/120d317c-e861-4846-a71b-22b79d021316.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=eT1wr94NsgKZNqAeHk0Np143ESO8pod8fWt8Y75GDSO0T5bws9Tp%2Fd7u6VSiCFxqSSRwqg6yuYIHchJldY3lySrlD3PTYXUSJWJJhjxYE%2BOZbtki9N0aU10GQ1IUDW7EkC9j4nwj3rnaT%2FaOY2GXlRQbyOc8m8%2BgQ82jhr9%2Fklj8ry5xZBZ82F9ECcli0JFWa1L6IIyron5QGyx0OrxpbdnACYypwc6lJFn8VKRPpZsNVckg2mkoK3%2FuICHErvTvlGxDweZl0f4T1thbfISlkJt7%2BCcOTQGFUe6MTvWhK%2Fw0A%2FInMMUgM0qDjz0e%2FzD6JbX8mYwj8t%2BltNZ7LDEDYg%3D%3D',
				color: [
					'白色', // 顏色
				],
				_id: '66669d69dfd0bb2c45e6309f', // 規格的id
			},
			quantity: 1, //購買數量
			price: 800, // 此產品的總價（可能根據數量計算）
			_id: '666ee45fdf3a67628239d207', // 此訂單產品的唯一id(這個 _id 可以用來追蹤訂單中的特定產品，例如，如果用戶想要修改訂單中的某個產品的數量，就可以使用這個 _id 來找到該產品)
		},
	],
	state: 2, //訂單狀態  0:未付, 1:已付
	totalPrice: 800, // 訂單總價
	pay: 1, // 付款方式（目遣只會有1）  1:信用卡付款, 2:ATM匯款, 3:店到店付費
	address: '新店區中正路1號', //地址
	delivery: 1, //配送方式  1:宅配 2:黑貓宅急便 3:店到店
	fare: 50, // 運費
	createdAt: '2024-06-16T13:10:55.512Z', // 訂單建立時間
	updatedAt: '2024-06-17T10:20:30.000Z', // 訂單最後更新時間
	completedAt: '',
}); // 假設的訂單完成時間

const orderStates = [
	{ id: 1, name: '訂購日期', date: order.value.createdAt || '', state: 1 },
	{ id: 2, name: '運送日期', date: order.value.updatedAt || '', state: 2 },
	{ id: 3, name: '訂單完成', date: order.value.completedAt || '', state: 3 },
];

const buttonClass = (stateId: number) => {
	return order.value.state >= stateId
		? 'btn btn-sm btn-primary rounded-circle'
		: 'btn btn-sm btn-secondary rounded-circle';
};

const payMethod = computed(() => {
	switch (order.value.pay) {
		case 1:
			return '信用卡';
		case 2:
			return 'ATM匯款';
		case 3:
			return '店到店付款';
		default:
			return '未付款';
	}
});

const deliveryMethod = computed(() => {
	switch (order.value.delivery) {
		case 1:
			return '宅配';
		case 2:
			return '黑貓宅急便';
		case 3:
			return '店到店';
		default:
			return '未填寫';
	}
});

// 將價格格式帶上千分位字串
const formatPrice = (price: number | undefined): string => {
	if (!price) return '';
	return price.toLocaleString('en-US');
};

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
