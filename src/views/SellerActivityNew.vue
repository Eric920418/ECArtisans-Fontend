<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<v-form @submit="onSubmit" v-slot="{ errors }" class="m-0 p-0">
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 表格 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<div
							class="d-flex justify-content-between align-items-center mb-4 p-0"
						>
							<h3
								class="m-0 p-0 p-0 neutral-01 mb-3 mb-sm-0"
								:class="{
									'fs-6': isCheck,
									'fs-5': !isCheck,
								}"
							>
								{{ !isCheck ? '新增活動' : '編號：' + data.coupon_id }}
								<br />
							</h3>
							<a class="mb-0 text-neutral03" v-if="!isCheck" @click="demod()">
								Demod快速鍵
							</a>
							<a class="mb-0" v-if="isCheck" @click="deleteData()">立即刪除</a>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
								<label for="activityName" class="mb-1">
									封面圖片
									<span class="text-danger">*</span>
								</label>
								<div class="row m-0" style="margin-bottom: 38px" v-if="data">
									<div
										v-if="data.activity_image"
										class="card-newImg-delete me-3 my-2 p-0 d-flex align-items-center justify-content-center position-relative"
										:style="{
											'background-image': `url(${data.activity_image})`,
										}"
									>
										<!-- 刪除 手機板 右上角的刪除 -->
										<font-awesome-icon
											v-if="
												isCheck &&
												data.start_date &&
												$dayAndToDay(data.start_date.toString(), '<')
													? false
													: resize < 768
											"
											@click="closeItem()"
											:icon="['fas', 'circle-xmark']"
											class="fs-5 d-md-none position-absolute top-0 start-100 translate-middle gray p-2"
										/>

										<!-- 刪除 滑鼠移入時出現 -->
										<font-awesome-icon
											v-if="
												isCheck &&
												data.start_date &&
												$dayAndToDay(data.start_date.toString(), '<')
													? false
													: resize >= 768
											"
											:icon="['fas', 'trash-can']"
											class="fs-4 icon"
											@click="closeItem()"
										/>
									</div>
									<div v-else class="card-newImg me-3 my-2" @click="uploadFile">
										<font-awesome-icon
											:icon="['fas', 'image']"
											class="fa-image"
										/>
										<p>選擇圖片</p>
										<p>({{ data.activity_image ? 1 : 0 }}/1)</p>
									</div>
									<input
										class="form-control"
										type="file"
										id="formFile"
										ref="inputFieldRef"
										hidden
										@change="getFile"
										autocomplete="photo"
										accept="image/*"
									/>
									<div class="card-directions w-fit py-3">
										<ul>
											<li>圖片大小：3MB 內</li>
											<li>檔案限制：JPEG, PNG</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="activityName" class="mb-1">
								名稱
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="activityName"
								name="名稱"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['名稱'] }"
								rules="required"
								v-model="data.activity_name"
								:disabled="getDisabled()"
								aria-label="名稱"
								placeholder="請輸入活動名稱"
							></v-field>
						</div>
						<div class="col-12 col-xl-6 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="startDate" class="mb-1">
								發布日期

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
											!isCheck ||
											$dayAndToDay(data.start_date as string | Date | null, '<')
												? 'startDate|need:開始日期'
												: ''
										"
										v-model="data.start_date"
										:disabled="getDisabled()"
										aria-label="startDate"
										placeholder="請輸入活動開始日期"
									></v-field>
									<p class="fs-12">* 開始於每日 00:00:00</p>
									<error-message
										v-if="getDisabled()"
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
											!isCheck ||
											$dayAndToDay(data.start_date as string | Date | null, '<')
												? 'endDate:startDate|need:結束日期'
												: ''
										"
										v-model="data.end_date"
										:disabled="getDisabled()"
										aria-label="endDate"
										placeholder="請輸入優惠劵使用期限"
									></v-field>
									<p class="fs-12">* 結束於每日 23:59:59</p>
									<error-message
										name="endDate"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
						</div>
						<div class="col-12 col-xl-6 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="start_date" class="mb-1">
								優惠劵
								<span class="text-danger">*</span>
							</label>
							<div class="dropdown">
								<button
									class="form-select d-flex align-items-center justify-content-center dropdown-toggle px-3"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									:disabled="getDisabled()"
								>
									<p
										class="text-start flex-fill mb-0"
										:class="{
											'text-placeholder': !isCoupon,
										}"
									>
										{{
											isCoupon && isCoupon.couponName
												? isCoupon.couponName
												: '請選擇...'
										}}
									</p>
								</button>
								<ul class="dropdown-menu z-5">
									<li>
										<a
											@click="
												() => {
													isNewCoupon = null;
													data.coupon_id = null;
												}
											"
											class="dropdown-item"
										>
											請選擇...
										</a>
									</li>
									<li
										v-for="(couponItme, couponIndex) in coupon"
										:key="couponIndex"
									>
										<a class="dropdown-item" @click="changeCoupon(couponItme)">
											{{ couponItme.couponName }}
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2">
							<label class="mb-1 me-3">
								活動內容
								<span class="text-danger">*</span>
							</label>
							活動折扣金額以結算時為準,不可與其他優惠同時使用。
							<v-field
								v-slot="{ field, errors }"
								v-model="data.activity_info"
								name="comment"
								rules="required"
							>
								<textarea
									v-bind="field"
									class="form-control"
									:class="{ 'is-invalid': errors[0] }"
									name="comment"
									style="height: 6.5em; resize: none; whitespace: pre-wrap"
									:disabled="getDisabled()"
								/>
							</v-field>
						</div>
						<p class="text-wrap"></p>
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
					<button
						type="submit"
						class="btn btn-primary px-5 m-0 ms-1 ms-sm-2"
						:disabled="getDisabled()"
					>
						{{ init['end-bottom-btn'] }}
					</button>
				</div>
			</v-form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { alertStore } from '@/main'; // 導入實例
import { onMounted, ref, computed, watch } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { type CouponType } from '@/type/couponType';

// 組件
import NavTabs from '../components/NavTabs.vue';
import router from '@/router';

// stores
import {
	useActivity,
	useCoupon,
	useAuthStore,
	useResize,
	dayAndToDay,
} from '@/stores/index';

function getDisabled() {
	const startDate = data.value.start_date;
	return isCheck.value && startDate ? dayAndToDay(startDate, '>') : false;
}

const route = useRoute();
// const router = useRouter();
const { resize } = useResize();

const authStore = useAuthStore();
const userStore = useActivity();
const couponStore = useCoupon();

// 資料完成後送出
function onSubmit(isValue: any | void) {
	if (route.matched[0].path === '/seller') {
		let check = true;
		if (!data.value.activity_image || data.value.activity_image === '') {
			check = false;
			alertStore.error('請選擇封面圖片');
		}
		if (!isCoupon.value?._id) {
			check = false;
			alertStore.error('請選擇優惠劵');
		}
		if (route.name === 'SellerActivityNew') {
			if (check) {
				userStore.data.coupon_id = isCoupon.value?._id;
				userStore.newActivity();
			}
		} else if (route.name === 'SellerActivityCheck') {
			if (check) {
				userStore.data.coupon_id = isCoupon.value?._id;
				userStore.editActivity(route.params.id as string);
			}
		}
	}
}

function deleteData() {
	userStore.deleteActivity(route.params.id as string);
}

// 會員頭像 --------------------
const inputFieldRef = ref<HTMLInputElement | null>(null); //上傳用的input

function uploadFile() {
	if (inputFieldRef.value) {
		inputFieldRef.value.click();
	}
}
function getFile() {
	let inputField = inputFieldRef.value;
	// 在這裡處理檔案上傳的邏輯
	if (inputField && inputField!.files) {
		let file = inputField.files[0];
		// 發api 傳回去 +token
		userStore.getImgUrl(file);
	}
}

function onStop() {
	console.log('停止');
}

function onDelete() {
	if (route.params.id) {
		userStore.deleteActivity(route.params.id as string);
	}
}

const isCheck = computed(() => route.name === 'SellerActivityCheck');
// 選取
const isNewCoupon = ref<CouponType | null>(null);
const isCoupon = computed(() => {
	if (isCheck.value) {
		if (
			isNewCoupon.value === null &&
			userStore.data.coupon_id &&
			userStore.data.coupon_id !== null
		) {
			return couponStore.allData.find(
				item => item._id === data.value.coupon_id
			);
		}
	}
	if (isNewCoupon.value && isNewCoupon.value !== null) {
		return isNewCoupon.value;
	}
	return null;
});

// 交換
function changeCoupon(item: CouponType) {
	isNewCoupon.value = item;
}

const coupon = computed(() => {
	return couponStore.allData.filter(item => {
		if (!item.startDate || !item.endDate) {
			return false;
		}
		let today = new Date();
		const startDateISO = new Date(item.startDate);
		startDateISO.setHours(0, 0, 0, 0);
		return today < startDateISO;
	});
});
const data = computed(() => userStore.data);

function closeItem() {
	userStore.data.activity_image = null;
}

// 下拉篩選 Tabs 功能
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

const addNum = ref(false);
function add() {
	if (addNum.value === false) addNum.value = true;
	else addNum.value = false;
}

const sellerTitleNewData = {
	init: { 'end-bottom-btn': '儲存' },
	navTabs: {
		routeName: 'SellerActivityNew',
		title: [
			{
				title: '活動',
				path: { name: 'SellerActivity', query: { page: 1, type: '1' } },
			},
			{
				title: '新增活動',
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
		routeName: 'SellerActivityCheck',
		title: [
			{
				title: '活動',
				path: { name: 'SellerActivity', query: { page: 1, type: '1' } },
			},
			{
				title: '修改活動',
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

// 判斷起始日期 min
function updateStartDateMin() {
	const start_dateInput = document.getElementById(
		'startDate'
	) as HTMLInputElement | null;
	if (start_dateInput) {
		start_dateInput.min = getTomorrow();
	}
}

// 判斷結束日期 min
function updateEndDateMin() {
	const endDateInput = document.getElementById(
		'endDate'
	) as HTMLInputElement | null;
	if (endDateInput) {
		if (typeof data.value.start_date === 'string') {
			endDateInput.min = data.value.start_date;
		} else {
			endDateInput.min = getTomorrow();
		}
	}
}

function getTomorrow() {
	let today = new Date();
	const year = today.getFullYear();
	const month = (today.getMonth() + 1).toString().padStart(2, '0');
	const day = (today.getDate() + 1).toString().padStart(2, '0');
	const localDate = `${year}-${month}-${day}`;
	return localDate;
}
function demod() {
	userStore.data = {
		...data.value,
		activity_name: '寵物有理',
		activity_image:
			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/3cd9e58d-25b2-4b40-a331-e82e0919df81.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756675200&Signature=VftKG0A5N2dLuAjfPuSF%2FeMu84417KM8hMgYiTJ1uwRgJpL9GjPUei46knnUbAbXFEqW%2FOQk3%2BVRm7GiRLhPO19lDido7s8nSWMajq3QhjUrWO3Y64Kpj99nTKpAJsVUJYRBsUAb5HCbPA7W9wCeGLyMu6PViLCRmtPplG8IyFioiXJr9%2B0R1EzhuYElY%2BB35ig5Xl248IcL%2BLOqB6WXi%2FcCzTYzIqg16DK5b9Ua%2Bx3mrIwD2CWLkgmJ3CuaHvgxFrEm0Bck4gzDE09Aq2b7txbqGT8jeCaLOm%2BlsFdNnbkf%2Bao2VfnTZ4NeYbxIDyrhxGwhQJoBf50%2FWmWGrBw17A%3D%3D',
		start_date: '2024-07-15',
		end_date: '2024-07-31',
		activity_info:
			'貓貓罐罐限時優惠中：\n精選各種貓貓罐頭，滿足您家愛貓挑剔的味蕾。無論是營養豐富的肉泥罐頭，還是美味可口的海鮮罐頭，我們都應有盡有。參加活動即可享受超值優惠！',
		coupon_id: null,
	};
}

onMounted(() => {
	updateStartDateMin();
	updateEndDateMin();
});

watch(
	() => data.value.start_date,
	() => {
		updateEndDateMin();
	}
);
onMounted(() => {
	if (route.matched[0].path === '/seller') {
		if (route.name === 'SellerActivityNew') {
			// 新增狀態
			init.value = sellerTitleNewData.init;
			navTabs.value = sellerTitleNewData.navTabs;
			// 清空資料
			userStore.data = {
				activity_name: '',
				activity_image: '',
				start_date: null,
				end_date: null,
				activity_info: '',
				coupon_id: '',
			};
		} else if (route.name === 'SellerActivityCheck') {
			// 修改/查看狀態
			init.value = sellerTitleData.init;
			navTabs.value = sellerTitleData.navTabs;
			userStore.getActivity(route.params.id as string);
		}
	}
	couponStore.getCouponAll(authStore.token);
});
</script>

<style lang="scss" scoped>
.text-no {
	font-size: 0.75em;
}
.text-date {
	font-size: 0.875em;
}
.text-date {
	flex-shrink: 0; //禁止擠壓
}
</style>
