<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<!-- Navber -->
			<div
				class="m-0 px-4 py-0 d-sm-flex align-items-center justify-content-sm-between"
			>
				<div class="nav nav-tabs m-0">
					<div
						class="nav-item mb-0 d-flex align-items-center justify-content-center"
					>
						<div>狀態</div>
						<div>分類</div>
						<div>搜尋</div>
					</div>
				</div>
				<div class="text-end">
					<router-link
						:to="{ name: 'SellerProductNew' }"
						class="btn btn-outline-primary px-4 me-3"
					>
						新增商品
					</router-link>
				</div>
			</div>

			<div class="p-4 table table-responsive">
				<!-- table table-striped table-bordered table-rwd -->
				<table class="table-bordered">
					<!-- :class="{
						'table align-middle table-hover': resize >= 768,
					}" -->
					<!-- 'table-rwd w-100': resize < 768, -->
					<thead v-if="resize >= 768">
						<tr
							:class="{
								'tr-only-hide text-canter': resize >= 768,
							}"
						>
							<th
								v-for="(thItem, thIndex) in tableThead"
								:key="thIndex"
								:class="thItem.class"
							>
								{{ thItem.text }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="(tdItem, tdIndex) in tableTbody"
							:key="tdIndex"
							:class="{
								card: resize < 768,
							}"
						>
							<!-- d-flex flex-nowrap -->
							<!-- :class="tableThead[0].class" -->
							<th
								:data-th="tableThead[0].text"
								:class="{
									'order-1 no': resize < 768,
								}"
							>
								{{ tdIndex + 1 }}
							</th>
							<!-- :class="tableThead[1].class" -->
							<td
								:data-th="tableThead[1].text"
								:class="{
									'order-0 img  p-0': resize < 768,
									'product-img p-3': resize >= 768,
								}"
							>
								<!-- <div
									:class="{
										'product-img p-0': resize >= 768,
									}"
								> -->
								<img :src="tdItem.image[0]" class="img-eca" />
								<!-- </div> -->
							</td>
							<!-- :class="tableThead[2].class" -->
							<td
								:data-th="tableThead[2].text"
								:class="{
									'order-1 isOnshelf': resize < 768,
								}"
							>
								<p class="m-0">{{ tdItem.isOnshelf }}</p>
							</td>
							<!-- :class="tableThead[3].class" -->
							<td
								:data-th="tableThead[3].text"
								:class="{
									'category order-1 ': resize < 768,
								}"
							>
								<p class="m-0 categoryIcon">{{ tdItem.sellerCategory }}</p>
							</td>
							<!-- :class="tableThead[4].class" -->
							<td
								:data-th="tableThead[4].text"
								:class="{
									'order-0 itle ': resize < 768,
								}"
								class=""
							>
								<h3 class="m-0 text-hidden">{{ tdItem.productName }}</h3>
							</td>
							<!-- :class="tableThead[5].class" -->
							<td
								:data-th="tableThead[5].text"
								:class="{
									'order-0  id': resize < 768,
								}"
							>
								{{ tdItem._id }}
							</td>
							<td
								:data-th="tableThead[6].text"
								:class="{
									'order-0  cost': resize < 768,
								}"
							>
								<!-- class="order-1"
								:class="tableThead[6].class" -->
								{{ tdItem.format[0].cost }}
							</td>
							<td
								:data-th="tableThead[7].text"
								:class="{
									'order-1 profit': resize < 768,
								}"
							>
								<!-- :class="tableThead[7].class" -->
								{{ tdItem.format[0].price - tdItem.format[0].cost }}
							</td>
							<td
								:data-th="tableThead[8].text"
								:class="{
									'order-1 price': resize < 768,
								}"
							>
								<p
									class="m-0"
									:class="{
										'fs-5 fw-bold text-end ': resize < 768,
									}"
								>
									{{ tdItem.format[0].price }}
								</p>
							</td>
							<td
								:data-th="tableThead[9].text"
								:class="{
									'order-1 stock': resize < 768,
								}"
							>
								{{ tdItem.format[0].stock }}
							</td>
							<td
								:data-th="tableThead[10].text"
								:class="{
									'order-1 icon': resize < 768,
								}"
							>
								<a
									class="hover-icon"
									@click="
										$go({
											name: 'SellerProductCheck',
											params: { id: tdItem._id },
										})
									"
								>
									<font-awesome-icon
										:icon="['fas', 'pen-to-square']"
										class="fs-5 p-2"
									/>
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 商品 清單 table -->
			<!-- <div class="my-0 row m-0 p-3">
				<div class="col-12">
					<table class="table">
						<thead class="table-light">
							<tr>
								<th scope="col-12">#</th>
								<th
									scope="col-12"
									v-for="(thItem, thIndex) in tableThead"
									:key="thIndex"
								>
									{{ thItem }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(tdItem, tdIndex) in tableTbody"
								:key="tdIndex"
								@click="
									$go({
										name: 'SellerProductCheck',
										params: { id: tdItem._id },
									})
								"
							>
								<th scope="row">{{ tdIndex + 1 }}</th>
		
							</tr>
						</tbody>
					</table>
				</div>

				<div class="row m-0 p-0" v-if="data"></div>
				<div class="col-12">
					<p>
						{{ data }}
					</p>
					<Page :data="paginationData" :path="path" />
				</div>
			</div> -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { alertStore } from '@/main'; // 導入實例
import { onMounted, ref, computed, watch } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useRoute, useRouter } from 'vue-router';

// 組件
import NavTabs from '../components/NavTabs.vue';
import router from '@/router';

// stores
import { useProduct, useAuthStore, useResize } from '@/stores/index';

const { resize } = useResize();
const route = useRoute();

const authStore = useAuthStore();
const userStore = useProduct();
// table
const tableThead = [
	{ text: '排序', class: 'text-center' },
	{ text: '預覽', class: 'text-center' },
	{ text: '狀態', class: 'text-center' },
	{ text: '分類', class: 'text-center' },
	{ text: '商品名稱', class: 'ps-2 text-start' },
	{ text: '商品編號', class: 'ps-2 text-start' },
	{ text: '成本', class: 'text-center' },
	{ text: '毛利', class: 'text-center' },
	{ text: '售價', class: 'text-center' },
	{ text: '庫存', class: 'text-center' },
	{ text: '管理', class: 'text-center' },
];

const tableBody = [
	{ text: '排序', class: 'text-center' },
	{ text: '預覽', class: 'text-center' },
	{ text: '狀態', class: 'text-center' },
	{ text: '分類', class: 'text-center' },
	{ text: '商品名稱', class: 'ps-2 text-start' },
	{ text: '商品編號', class: 'ps-2 text-start' },
	{ text: '成本', class: 'text-center' },
	{ text: '毛利', class: 'text-center' },
	{ text: '售價', class: 'text-center' },
	{ text: '庫存', class: 'text-center' },
	{ text: '管理', class: 'text-center' },
];

// 基本
const tableTbody = computed(() => userStore.allData);

function trytry() {
	alertStore.success('couponDelete');
	alertStore.error('請選擇商品');
}

function onStop() {
	console.log('停止');
}

function onDelete() {
	userStore.deleteProduct();
}
const data = computed(() => userStore.data);

// 判斷起始日期 min
function updateStartDateMin() {
	const startDateInput = document.getElementById(
		'startDate'
	) as HTMLInputElement | null;
	if (startDateInput) {
		const today = new Date();
		today.setDate(today.getDate() + 1); // 明天
		startDateInput.min = today.toISOString().split('T')[0];
	}
}
// 判斷結束日期 min
// function updateEndDateMin() {
// 	const endDateInput = document.getElementById(
// 		'end_date'
// 	) as HTMLInputElement | null;
// 	if (endDateInput) {
// 		if (data.value.startDate instanceof Date) {
// 			endDateInput.min = data.value.startDate.toISOString().split('T')[0];
// 		} else if (typeof data.value.startDate === 'string') {
// 			endDateInput.min = data.value.startDate;
// 		} else {
// 			endDateInput.min = '';
// 		}
// 	}
// }

// onMounted(() => {
// 	updateStartDateMin();
// 	updateEndDateMin();
// });

// watch(
// 	() => data.value.startDate,
// 	() => {
// 		updateEndDateMin();
// 	}
// );

// 下拉篩選 Tabs 功能
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

const addNum = ref(false);
function add() {
	if (addNum.value === false) addNum.value = true;
	else addNum.value = false;
}

// // 刪除，待檢查
// function inputBadgeClose(id: string) {
// 	data.value.productChoose = data.value.productChoose?.filter(
// 		item => item !== id
// 	);
// }

// // navTab + seller 畫面下所有資料

// // navTab + seller 畫面下所有資料
// const sellerTitleData = {
// 	routeName: 'SellerCouponNew',
// 	title: [
// 		{
// 			title: '優惠劵',
// 			path: { name: 'SellerCoupon', query: { page: 1 } },
// 		},
// 		{
// 			title: '修改優惠劵',
// 		},
// 	],
// 	schedule: '修改優惠劵', //目前頁面
// 	btn: '修改',
// };

// const navTabs = ref({}) as any;
// const init2 = ref({
// 	shopTypeText: ,
// }) as any;

const sellerTitleNewData = {
	init: { 'end-bottom-btn': '儲存' },
	navTabs: {
		routeName: 'SellerProductNew',
		title: [
			{
				title: '商品管理',
				path: { name: 'SellerProduct', query: { page: 1 } },
			},
			{
				title: '新增優惠劵',
			},
		],
		schedule: '', //目前頁面
		breadcrumb: true,
	},
};

// 如果是 seller 的 navTabs 資料
const sellerTitleData = {
	init: { 'end-bottom-btn': '修改' },
	navTabs: {
		routeName: 'SellerProductCheck',
		title: [
			{
				title: '商品管理',
				path: { name: 'SellerProduct', query: { page: 1 } },
			},
			{
				title: '修改商品',
			},
		],
		breadcrumb: true,
		schedule: '',
	},
};
const navTabs = ref({}) as any;
const init = ref({}) as any;

// 全局的路由前置守衛，處理篩選條件不存在或資料為空的情況
router.beforeEach((to, from, next) => {
	next();
});

onMounted(async () => {
	if (route.matched[0].path === '/seller') {
		// if (route.name === 'SellerProductNew') {
		// 	// 新增狀態
		// 	init.value = sellerTitleNewData.init;
		// 	navTabs.value = sellerTitleNewData.navTabs;
		// } else if (route.name === 'SellerCouponCheck') {
		// 	// 修改/查看狀態
		// 	init.value = sellerTitleData.init;
		// 	navTabs.value = sellerTitleData.navTabs;
		// 	userStore.getCoupon(route.params.id as string, authStore.token);
		// }
		console.log('哈囉');
		await userStore.getProductsAll(authStore.token);
		console.log('哈囉');
	} else if (route.matched[0].path === '/user') {
		// init.value = userTitleData;
	}
	// userStore.getCouponAll(id, page, token);
});
</script>

<style lang="scss" scoped>
.dropdown-menu {
	height: 250px;
	overflow-y: scroll;
	overflow-x: hidden;
	z-index: 10;
	position: sticky;
	@media (min-width: 768px) {
		height: 200px;
	}
}
.product-img {
	max-width: 100px;
	max-height: 100px;
}

.table-rwd tr {
	display: grid;
	grid-template-columns: [line_1] 30% [line2] 17.5% [column-3] 17.5% [line4] 17.5% [column-5] 17.5% [line6];
	grid-template-rows: [row-1] 20% [row-2] 25% [row-3] 18% [row-4] 37% [row-5];
	// border: 1px solid #cb0909;
	width: 100%;
	margin-bottom: 25px;
}
.text-hidden {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: auto;
}
.table-rwd td {
	border: 1px solid #cb0909;
	padding: 0px 8px;
}
.no {
	display: flex;
	justify-content: start;
	align-items: center;
	padding: 0px 8px;
	grid-column-start: 2;
	grid-column-end: 4;
	grid-row-start: 1;
	grid-row-end: 2;
}
.img {
	width: 100%;
	height: 100%;
	grid-column-start: 1;
	grid-column-end: 2;
	grid-row-start: 1;
	grid-row-end: 5;
}
.isOnshelf {
	display: flex;
	justify-content: end;
	align-items: center;
	width: 100%;
	grid-column-start: 4;
	grid-column-end: 6;
	grid-row-start: 1;
	grid-row-end: 2;
}
.category {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 3;
	grid-row-end: 4;
	font-size: 0.85em;
}
.categoryIcon {
	padding: 0px 8px;
	background-color: rgb(196, 231, 244);
	border-radius: 8px;
	text-align: center;
}
.title {
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;
	grid-column-start: 2;
	grid-column-end: 6;
	grid-row-start: 2;
	grid-row-end: 3;
}
.id {
	display: flex;
	justify-content: start;
	align-items: center;
	width: 100%;
	grid-column-start: 3;
	grid-column-end: 6;
	grid-row-start: 3;
	grid-row-end: 4;
	font-size: 0.85em;
}
.cost {
	width: 100%;
	grid-column-start: 2;
	grid-column-end: 3;
	grid-row-start: 4;
	grid-row-end: 5;
}
.profit {
	width: 100%;
	grid-column-start: 3;
	grid-column-end: 4;
	grid-row-start: 4;
	grid-row-end: 5;
}

.price {
	display: inline-block;
	line-height: 1.25em;
	justify-content: start;
	align-items: center;

	grid-column-start: 4;
	grid-column-end: 5;
	grid-row-start: 4;
	grid-row-end: 5;
}
.stock {
	width: 100%;
	grid-column-start: 5;
	grid-column-end: 6;
	grid-row-start: 4;
	grid-row-end: 5;
}
.icon {
	display: none;
}

.table-rwd .id:before,
// .table-rwd .category:before,
.table-rwd .cost:before,
.table-rwd .profit:before,
.table-rwd .price:before,
.table-rwd .stock:before {
	/*最重要的就是這串*/
	content: attr(data-th) ' : ';
	/*最重要的就是這串*/
	display: inline-block;
	text-transform: uppercase;
	font-weight: 400;
	margin-right: 10px;
	font-size: 0.85em;
	// color: #d20b2a;
}
// @media (max-width: 736px) {
// 	.table-rwd {
// 		min-width: 100%;
// 	}
// 	/*針對tr去做隱藏*/
// 	tr.tr-only-hide {
// 		display: none !important;
// 	}
// 	/*讓tr變成區塊主要讓他有個區塊*/
// 	.table-rwd tr {
// 		display: block;
// 		// border: 1px solid #f7f7f7;
// 		margin-top: 5px;
// 	}
// 	.table-rwd td {
// 		text-align: left;
// 		font-size: 15px;
// 		overflow: hidden;
// 		width: 100%;
// 		display: block;
// 	}
// 	.table-rwd td:before {
// 		/*最重要的就是這串*/
// 		content: attr(data-th) ' : ';
// 		/*最重要的就是這串*/
// 		display: inline-block;
// 		text-transform: uppercase;
// 		font-weight: bold;
// 		margin-right: 10px;
// 		// color: #d20b2a;
// 	}

// 	/*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
// 	.table-rwd.table-bordered td,
// 	.table-rwd.table-bordered th,
// 	.table-rwd.table-bordered {
// 		border: 0;
// 	}
// }
</style>
