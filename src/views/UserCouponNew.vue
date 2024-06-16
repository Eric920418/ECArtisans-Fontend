<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<v-form @submit="onSubmit" v-slot="{ errors }" class="m-0 p-0">
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 表格 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<div
							class="row m-0 p-0 mb-4 flex-column-reverse flex-sm-row justify-content-between align-items-center"
							style="height: 60px"
						>
							<div class="col-12 col-sm-10 d-flex m-0 p-0 align-items-end">
								<h3
									class="m-0 p-0 p-0 neutral-01 mb-3 mb-sm-0"
									:class="{
										'fs-6': route.name !== 'SellerCouponNew',
										'fs-5': route.name === 'SellerCouponNew',
									}"
								>
									{{
										route.name === 'SellerCouponNew'
											? '新增優惠劵'
											: '編號：' + data._id
									}}
									<br />
								</h3>
							</div>
							<a
								v-if="
									route.name !== 'SellerCouponNew' &&
									data.isEnabled &&
									$dayAndToDay(data.endDate, '<')
										? true
										: false
								"
								class="col-12 col-sm-2 p-0 mb-0 text-end"
								@click="
									$dayAndToDay(data.startDate, '>') ? onStop() : onDelete()
								"
							>
								{{ $dayAndToDay(data.startDate, '>') ? '立即停止' : '刪除' }}
							</a>
							<div
								v-else-if="route.name !== 'SellerCouponNew'"
								class="col-12 col-sm-2 p-0 mb-0 text-end neutral-03"
							>
								立即停止
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								名稱
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="couponName"
								name="couponName"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['couponName'] }"
								rules="text:優惠劵名稱"
								v-model="data.couponName"
								aria-label="優惠卷名稱"
								placeholder="請輸入優惠卷名稱"
								:disabled="
									route.name === 'SellerCouponNew'
										? false
										: data.isEnabled && $dayAndToDay(data.startDate, '<')
											? false
											: true
								"
							></v-field>
							<error-message
								name="couponName"
								class="invalid-feedback"
							></error-message>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="startDate" class="mb-1">
								使用期限
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex">
								<div>
									<v-field
										id="startDate"
										name="startDate"
										type="date"
										class="form-control col-2"
										:class="{ 'is-invalid': errors['startDate'] }"
										:rules="
											route.name === 'SellerCouponNew' ||
											(data.isEnabled && $dayAndToDay(data.startDate, '<'))
												? 'startDate|need:開始日期'
												: ''
										"
										ref="document.getElementById('startDate')"
										v-model="data.startDate"
										aria-label="startDate"
										placeholder="請輸入優惠卷使用期限"
										:disabled="
											route.name === 'SellerCouponNew'
												? false
												: data.isEnabled && $dayAndToDay(data.startDate, '<')
													? false
													: true
										"
									></v-field>
									<error-message
										name="startDate"
										class="invalid-feedback"
									></error-message>
								</div>
								<p class="mx-3 fs-3">~</p>
								<div>
									<v-field
										id="endDate"
										name="endDate"
										type="date"
										class="form-control col-2"
										:class="{ 'is-invalid': errors['endDate'] }"
										:rules="
											route.name === 'SellerCouponNew' ||
											(data.isEnabled && $dayAndToDay(data.startDate, '<'))
												? 'endDate:startDate|need:結束日期'
												: ''
										"
										v-model="data.endDate"
										ref="document.getElementById('endDate')"
										aria-label="到期日"
										placeholder="請輸入優惠卷使用期限"
										:disabled="
											route.name === 'SellerCouponNew'
												? false
												: data.isEnabled && $dayAndToDay(data.startDate, '<')
													? false
													: true
										"
									></v-field>
									<error-message
										name="endDate"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<p>
								折扣方式
								<span class="text-danger">*</span>
							</p>
							<div class="d-flex">
								<v-field
									class="form-check-input me-2"
									type="radio"
									v-model="data.type"
									:class="{ 'is-invalid': errors['type'] }"
									id="delivery"
									name="type"
									rules="policy|required"
									:value="1"
									as="input"
									:disabled="
										route.name === 'SellerCouponNew'
											? false
											: data.isEnabled && $dayAndToDay(data.startDate, '<')
												? false
												: true
									"
								></v-field>
								<label class="form-check-label me-4" for="delivery">免運</label>
								<v-field
									class="form-check-input me-2"
									type="radio"
									v-model="data.type"
									:class="{ 'is-invalid': errors['type'] }"
									id="discount"
									name="type"
									rules="policy|required"
									:value="0"
									as="input"
									:disabled="
										route.name === 'SellerCouponNew'
											? false
											: data.isEnabled && $dayAndToDay(data.startDate, '<')
												? false
												: true
									"
								></v-field>
								<label class="form-check-label" for="discount">折扣</label>
							</div>
						</div>
						<div
							class="col-12 col-sm-6 col-md-5 col-xl-3 p-0 m-0 mb-2"
							:style="{
								'min-height': data.type === 0 ? '50px' : '100px',
							}"
						>
							<div
								class="d-flex align-items-center me-0 me-sm-4"
								style="min-height: 37.6px"
							>
								<label for="priceOver" class="mb-0 flex-shrink">
									滿
									<span class="text-danger">*</span>
									<span class="mx-2">NT$</span>
								</label>
								<v-field
									id="priceOver"
									name="discountConditions"
									type="number"
									class="form-control text-end me-0 hide-arrows"
									:class="{ 'is-invalid': errors['discountConditions'] }"
									rules="numeric|required"
									v-model="data.discountConditions"
									aria-label="discountConditions"
									placeholder="請輸入金額"
									:disabled="
										route.name === 'SellerCouponNew'
											? false
											: data.isEnabled && $dayAndToDay(data.startDate, '<')
												? false
												: true
									"
								></v-field>
							</div>
						</div>
						<div
							v-if="data.type === 0"
							class="col-12 col-sm-6 col-md-4 col-xl-3 p-0 m-0 mb-2"
							style="min-height: 100px"
						>
							<div class="text-end">
								<div class="d-flex align-items-center">
									<label for="percentage" class="mb-0 flex-shrink me-2">
										打
										<span class="text-danger">*</span>
									</label>
									<v-field
										id="percentage"
										name="percentage"
										type="text"
										class="form-control text-end me-2"
										:class="{ 'is-invalid': errors['percentage'] }"
										rules="numeric|required"
										v-model="data.percentage"
										aria-label="percentage"
										placeholder="請輸入折數"
										:disabled="
											route.name === 'SellerCouponNew'
												? false
												: data.isEnabled && $dayAndToDay(data.startDate, '<')
													? false
													: true
										"
									></v-field>
									<p class="mb-0 mr-2">折</p>
								</div>
								<p class="text-no" style="margin-right: calc(1em + 12px)">
									消費總金額 x ( 折數 ÷ 10 )
								</p>
							</div>
						</div>
						<div
							class="col-12 p-0 m-0 mb-2"
							:style="{
								'min-height':
									data.productType === 1 && data.productChoose
										? '60px'
										: '100px',
							}"
						>
							<p>
								活動範圍
								<span class="text-danger">*</span>
							</p>
							<v-field
								class="form-check-input me-2"
								type="radio"
								v-model="data.productType"
								:class="{ 'is-invalid': errors['productType'] }"
								id="all"
								name="productType"
								rules="policy|required"
								:value="0"
								as="input"
								:disabled="
									route.name === 'SellerCouponNew'
										? false
										: data.isEnabled && $dayAndToDay(data.startDate, '<')
											? false
											: true
								"
							></v-field>
							<label class="form-check-label me-4" for="all">所有商品</label>
							<v-field
								class="form-check-input me-2"
								type="radio"
								v-model="data.productType"
								:class="{ 'is-invalid': errors['productType'] }"
								id="part"
								name="productType"
								rules="policy|required"
								:value="1"
								as="input"
								:disabled="
									route.name === 'SellerCouponNew'
										? false
										: data.isEnabled && $dayAndToDay(data.startDate, '<')
											? false
											: true
								"
							></v-field>
							<label class="form-check-label" for="productType">部分商品</label>
						</div>

						<div
							class="col-12 p-0 m-0 mb-2"
							v-if="data.productType === 1 && data.productChoose"
							style="min-height: 100px"
						>
							<!-- <div class="dropdown">
							<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
								Dropdown form
							</button>
							<form class="dropdown-menu p-4">
								<div class="mb-3">
									<label for="exampleDropdownFormEmail2" class="form-label">Email address</label>
									<input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com">
								</div>
								<div class="mb-3">
									<label for="exampleDropdownFormPassword2" class="form-label">Password</label>
									<input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password">
								</div>
								<div class="mb-3">
									<div class="form-check">
										<input type="checkbox" class="form-check-input" id="dropdownCheck2">
										<label class="form-check-label" for="dropdownCheck2">
											Remember me
										</label>
									</div>
								</div>
								<button type="submit" class="btn btn-primary">Sign in</button>
							</form>
						</div> -->
							<div class="dropdown">
								<button
									class="form-control py-0"
									:class="{
										'justify-content-between': data.productChoose.length === 0,
										'justify-content-start': data.productChoose.length !== 0,
									}"
									ref="dropdownBtn"
									type="button"
									data-bs-toggle="dropdown"
									data-bs-auto-close="outside"
									:disabled="
										route.name === 'SellerCouponNew'
											? false
											: data.isEnabled && $dayAndToDay(data.startDate, '<')
												? false
												: true
									"
								>
									<div
										v-if="data.productChoose.length === 0"
										class="text-start d-flex justify-content-between align-items-center"
									>
										<p class="mb-0 neutral-03" style="padding: 6px 0px">
											請選擇商品...
										</p>
										<font-awesome-icon
											:icon="['fas', 'caret-down']"
											class="neutral-02 d-flex justify-content-center align-items-center"
											style="width: 20; height: 20"
										/>
									</div>
									<div v-else class="row m-0 p-0">
										<!-- :class="{ 'bg-neutral-01': addNum, 'd-block': addNum }" -->
										<div
											v-for="item in data.productChoose"
											:key="item"
											class="input-badge w-auto"
											:class="{ 'bg-neutral-02': addNum, white: addNum }"
										>
											<p class="mb-0">{{ item }}</p>
											<button
												type="button"
												class="btn-close"
												aria-label="Close"
												@click="inputBadgeClose(item)"
											></button>
										</div>
									</div>
								</button>
								<ul class="dropdown-menu w-100 scrollbar" ref="dropdown">
									<li
										v-for="(stt, sttIndex) in [
											'只是假資料',
											'娛樂',
											'服飾',
											'3C產品',
											'食品',
											'家具',
											'運動',
											'寵物',
											'生活用品',
											'清潔用品',
											'其他',
										]"
										:key="sttIndex"
									>
										<div class="dropdown-item">
											<v-field
												class="form-check-input me-2"
												type="checkbox"
												v-model="data.productChoose"
												:class="{ 'is-invalid': errors['productChoose'] }"
												:value="stt"
												:id="stt"
												name="productChoose"
												as="input"
											></v-field>
											<label
												class="form-check-label"
												:for="stt"
												style="width: 100%"
											>
												{{ stt }}
											</label>
										</div>
									</li>
								</ul>
							</div>
							<span
								role="alert"
								class="text-danger"
								style="margin-top: 0.25rem; font-size: 0.875em"
							>
								商品請最少選擇一項
							</span>
							<h1>待接商品api取得商品名稱+id</h1>
						</div>
						{{ data.productChoose }}
						<div class="col-12 p-0 m-0 mb-2">
							<label class="mb-1 me-3">
								注意事項
								<span class="text-danger">*</span>
							</label>
							活動折扣金額以結算時為準,不可與其他優惠同時使用。
							<!-- <v-field
								class="form-control"
								placeholder="請輸入..."
								id="precautions"
								v-model="data.introduce"
								name="precautions"
								rules="required"
								style="height: 6.5em; resize: none"
							></v-field> -->
							<!-- <v-field
								v-slot="{ field, errors }"
								v-model="data.introduce"
								name="comment"
								rules="required"
							>
								<textarea
									v-bind="field"
									class="form-control"
									:class="{ 'is-invalid': errors[0] }"
									name="comment"
								/>
							</v-field> -->
							<!-- <textarea
								class="form-control"
								placeholder="請輸入..."
								id="precautions"
								v-model="data.introduce"
								style="height: 6.5em; resize: none"
							></textarea> -->
						</div>
					</div>
				</div>
				<div
					class="col bg-white p-3 px-sm-5 mx-0 mx-md-3 rounded-0 sticky-bottom d-flex justify-content-end"
				>
					<button
						type="button"
						class="btn btn-outline-primary px-5 mx-1 mx-sm-2 me-md-4"
						@click="trytry"
					>
						aa
					</button>
					<button
						type="button"
						class="btn btn-outline-primary px-5 mx-1 mx-sm-2 me-md-4"
						@click="router.back()"
					>
						取消
					</button>
					<button
						:disabled="
							route.name === 'SellerCouponNew'
								? false
								: dayAndToDay(data.startDate, '>=')
						"
						type="submit"
						class="btn btn-primary px-5 m-0 ms-1 ms-sm-2"
					>
						{{ init['end-bottom-btn'] }}
					</button>
				</div>
				{{ authStore.token }}
			</v-form>
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
import {
	useCoupon,
	useAuthStore,
	useResize,
	dayAndToDay,
} from '@/stores/index';

const route = useRoute();
// const router = useRouter();

const authStore = useAuthStore();
const userStore = useCoupon();

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
</style>
