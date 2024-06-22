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
						123
					</div>
				</div>
				<div class="text-end">
					<router-link
						:to="{ name: 'SellerProductNew' }"
						class="btn btn-outline-primary px-4 me-3"
					>
						SellerProductNew
					</router-link>
				</div>
			</div>
			<div class="p-4">
				<table class="table">
					<thead>
						<tr class="tr-only-hide text-canter">
							<th
								v-for="(thItme, thIndex) in tableThead"
								:key="thIndex"
								:class="thItme.class"
							>
								{{ thItme.text }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(tdItme, tdIndex) in tableTbody" :key="tdIndex">
							<th :data-th="tableThead[0].text" :class="tableThead[0].class">
								{{ tdIndex + 1 }}
							</th>
							<td
								:data-th="tableThead[1].text"
								:class="tableThead[1].class"
								class="d-flex align-items-center justify-content-center"
							>
								<div class="product-img p-0">
									<img
										src="https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/f4e6bbf2-eb85-4343-acad-c4b537c36356.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756675200&Signature=CruKUkjAnFhe9fnpj5ibWwYu7ApqDm7RgDyYKYlHPh36dgeOi%2BClu6neh2%2Fz51mp4C9c9RjAtzlTsRpXCRcXMBV1xQ7RtoyU2fIQHTQNy3me%2FILbbVF%2B2pA6D47Dcr%2BtA1ztvMZZ6Dn%2FhSrv%2FC%2F35bOunhzc5rMJjUoObpGVa%2Fqhg4dxOwjiupa%2B8F6OSmr9GshRDYoUnuYe49gMuhoSSBUxDvDvZsuGtcCfvTRak2eKZAPl2KK9u1mqY%2FXkwxyY4AkCxUFA92i354XZAMjMluQ9iJJ0bRHx7ncYeXBRjxUcwI%2BSdiRKwqCelYP25IFk74nefHxs6WLrTInn87Ilnw%3D%3D"
										class="img-eca"
									/>
								</div>
							</td>
							<td :data-th="tableThead[2].text" :class="tableThead[2].class">
								{{ tdItme.isOnshelf }}
							</td>
							<td :data-th="tableThead[3].text" :class="tableThead[3].class">
								{{ tdItme.sellerCategory }}
							</td>
							<td :data-th="tableThead[4].text" :class="tableThead[4].class">
								{{ tdItme.productName }}
							</td>
							<td :data-th="tableThead[5].text" :class="tableThead[5].class">
								{{ tdItme._id }}
							</td>
							<td :data-th="tableThead[6].text" :class="tableThead[6].class">
								{{ tdItme.format[0].cost }}
							</td>
							<td :data-th="tableThead[7].text" :class="tableThead[7].class">
								{{ tdItme.format[0].price - tdItme.format[0].cost }}
							</td>
							<td :data-th="tableThead[8].text" :class="tableThead[8].class">
								{{ tdItme.format[0].price }}
							</td>
							<td :data-th="tableThead[9].text" :class="tableThead[9].class">
								{{ tdItme.format[0].stock }}
							</td>
							<td :data-th="tableThead[10].text" :class="tableThead[10].class">
								<a
									href=""
									class="hover-icon"
									@click="
										$go({
											name: 'SellerProductCheck',
											params: { id: tdItme._id },
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
									v-for="(thItme, thIndex) in tableThead"
									:key="thIndex"
								>
									{{ thItme }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(tdItme, tdIndex) in tableTbody"
								:key="tdIndex"
								@click="
									$go({
										name: 'SellerProductCheck',
										params: { id: tdItme._id },
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

// 資料完成後送出
function onSubmit(isValue: any | void) {
	if (route.matched[0].path === '/seller') {
		if (route.name === 'SellerCouponNew') {
			// 新增狀態
			if (isValue.productType === 1 && isValue.productChoose?.length === 0) {
				alertStore.error('請選擇商品');
			} else {
				if (isValue.productType === 0) isValue.productChoose = [];
				userStore.newCoupon(isValue);
			}
		} else if (route.name === 'SellerCouponCheck') {
			// 修改/查看狀態
			if (isValue.productType === 1 && isValue.productChoose?.length === 0) {
				alertStore.error('請選擇商品');
			} else {
				if (isValue.productType === 0) isValue.productChoose = [];
				userStore.getCouponEdit(isValue);
			}
		}
	}
}

function trytry() {
	alertStore.success('couponDelete');
	alertStore.error('請選擇商品');
}

function onStop() {
	console.log('停止');
}

function onDelete() {
	userStore.deleteCoupon();
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
function updateEndDateMin() {
	const endDateInput = document.getElementById(
		'end_date'
	) as HTMLInputElement | null;
	if (endDateInput) {
		if (data.value.startDate instanceof Date) {
			endDateInput.min = data.value.startDate.toISOString().split('T')[0];
		} else if (typeof data.value.startDate === 'string') {
			endDateInput.min = data.value.startDate;
		} else {
			endDateInput.min = '';
		}
	}
}

onMounted(() => {
	updateStartDateMin();
	updateEndDateMin();
});

watch(
	() => data.value.startDate,
	() => {
		updateEndDateMin();
	}
);

// 下拉篩選 Tabs 功能
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

const addNum = ref(false);
function add() {
	if (addNum.value === false) addNum.value = true;
	else addNum.value = false;
}

// // 刪除，待檢查
function inputBadgeClose(id: string) {
	data.value.productChoose = data.value.productChoose?.filter(
		item => item !== id
	);
}

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
		routeName: 'SellerCouponNew',
		title: [
			{
				title: '優惠劵',
				path: { name: 'SellerCoupon', query: { page: 1, type: '1' } },
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
		routeName: 'SellerCouponCheck',
		title: [
			{
				title: '優惠劵',
				path: { name: 'SellerCoupon', query: { page: 1, type: '1' } },
			},
			{
				title: '修改優惠劵',
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

onMounted(() => {
	if (route.matched[0].path === '/seller') {
		if (route.name === 'SellerCouponNew') {
			// 新增狀態
			init.value = sellerTitleNewData.init;
			navTabs.value = sellerTitleNewData.navTabs;
		} else if (route.name === 'SellerCouponCheck') {
			// 修改/查看狀態
			init.value = sellerTitleData.init;
			navTabs.value = sellerTitleData.navTabs;
			userStore.getCoupon(route.params.id as string, authStore.token);
		}
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
	max-width: 60px;
	max-height: 60px;
}

@media (max-width: 736px) {
	// .table-rwd {
	// 	min-width: 100%;
	// }
	// /*針對tr去做隱藏*/
	// tr.tr-only-hide {
	// 	display: none !important;
	// }
	// /*讓tr變成區塊主要讓他有個區塊*/
	// .table-rwd tr {
	// 	display: block;
	// 	// border: 1px solid #f7f7f7;
	// 	margin-top: 5px;
	// }
	// .table-rwd td {
	// 	text-align: left;
	// 	font-size: 15px;
	// 	overflow: hidden;
	// 	width: 100%;
	// 	display: block;
	// }
	// .table-rwd td:before {
	// 	/*最重要的就是這串*/
	// 	content: attr(data-th) ' : ';
	// 	/*最重要的就是這串*/
	// 	display: inline-block;
	// 	text-transform: uppercase;
	// 	font-weight: bold;
	// 	margin-right: 10px;
	// 	// color: #d20b2a;
	// }

	// /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
	// .table-rwd.table-bordered td,
	// .table-rwd.table-bordered th,
	// .table-rwd.table-bordered {
	// 	border: 0;
	// }
}
</style>
