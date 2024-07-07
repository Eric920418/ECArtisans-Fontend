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
						<div
							class="d-flex align-items-center justify-content-center m-0 me-3 nav-search bg-white rounded rounded-pill px-2"
						>
							<input
								id="search"
								name="請輸入名稱"
								type="search"
								v-model="searchKeyword"
								class="form-control nav-search-input border-0"
								aria-label="請輸入名稱"
								placeholder="請輸入名稱..."
							/>
							<button
								class="btn btn-primary btn-search d-flex align-items-center justify-content-center ms-2"
								type="button"
								style="width: 36px; height: 36px"
							>
								<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
							</button>
						</div>
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
				<Card
					v-for="(tableItme, tableIndex) in filteredData"
					:key="tableIndex"
					:data="tableItme"
				/>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { alertStore } from '@/main'; // 導入實例
import { onMounted, ref, computed, watch } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useRoute, useRouter } from 'vue-router';

import Card from '../components/SellerProductCard.vue';
// 組件
import NavTabs from '../components/NavTabs.vue';
import router from '@/router';

// stores
import { useProduct, useAuthStore, useResize } from '@/stores/index';
import { table } from 'console';
import { type DetailedOrderProductType } from '@/type/orderType';

const { resize } = useResize();
const route = useRoute();

const authStore = useAuthStore();
const userStore = useProduct();

// 封裝分類邏輯的函數，想要入口統一，之後比較好撰寫內容
function categorized(
	allData: Array<DetailedOrderProductType>,
	keyword: string
) {
	let data = allData;
	// let filterText = navTabs.value.schedule; //固定篩選條件
	if (keyword && keyword !== null) {
		data = data.filter(item => item.productName.includes(keyword));
	}
	//如果要更多篩選條件 可寫在這裡

	if (data.length > 1) {
		data.sort((a, b) => {
			// 先按 isOnshelf 排序，true 在前
			if (a.isOnshelf && !b.isOnshelf) return -1;
			if (!a.isOnshelf && b.isOnshelf) return 1;

			// // 然后按 isOnshelf && $dayAndToDay(endDate, '<=') 排序，true 在前
			// const aEndDateValid = a.isOnshelf && dayAndToDay(a.endDate, '<=');
			// const bEndDateValid = b.isOnshelf && dayAndToDay(b.endDate, '<=');

			// if (aEndDateValid && !bEndDateValid) return -1;
			// if (!aEndDateValid && bEndDateValid) return 1;

			// // 最后按 isOnshelf && $dayAndToDay(startDate, '>=') 排序，true 在前
			// const aStartDateValid = a.isOnshelf && dayAndToDay(a.startDate, '>=');
			// const bStartDateValid = b.isOnshelf && dayAndToDay(b.startDate, '>=');

			// if (aStartDateValid && !bStartDateValid) return -1;
			// if (!aStartDateValid && bStartDateValid) return 1;

			// 如果都相同，保持原顺序
			return 0;
		});
	}

	return data;
}

// 接收篩選後的結果
const filteredData = computed(() =>
	categorized(userStore.allData, searchKeyword.value)
);

// // 基本
// const tableTbody = computed(() => userStore.allData);

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

const searchKeyword = ref('');

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

		await userStore.getProductsAll(authStore.token);
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
.border {
	border-radius: 50%;
}
</style>
