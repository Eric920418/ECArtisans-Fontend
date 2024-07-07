<template>
	<v-form
		class="row g-3 mx-0 mb-0 pb-0 p-0"
		v-slot="{ errors }"
		@submit="onSubmit"
	>
		<!-- <Loading
			v-model:active="isLoading"
			:can-cancel="true"
			:is-full-page="true"
			v-if="data.name === undefined"
			@cancel="loadingClose"
		/> -->
		<div class="col-12 m-0 p-0">
			<NavTabs v-if="init.navTabs" :data="init.navTabs" />
			<div class="mb-0 m-3 px-4 px-sm-5 card shadow-sm">
				<div class="row">
					<div class="col-12 mb-4 p-eca-12 pt-0" v-if="init.title === '商家'">
						<div class="w-100 border-bottom pb-4" style="padding: 12px">
							<div
								class="d-flex flex-wrap m-0 p-0 justify-content-end align-items-center"
							>
								<div
									class="d-flex justify-content-center justify-content-md-end align-items-center m-0 py-2 pe-4"
								>
									<h3 class="fs-5 neutral-01 fw-medium me-4 my-0">
										合約到期日
									</h3>
									<p
										class="my-0"
										:class="{
											'text-danger': maturityDate(),
										}"
									>
										{{
											data.planPeriod
												? $getDate(data.planPeriod.toString())
												: '尚未購買'
										}}
									</p>
								</div>
								<div
									class="mt-md-0 p-0 d-flex justify-content-center justify-content-md-end flex-shrink"
								>
									<button
										type="button"
										class="btn btn-primary px-5"
										:class="{
											'btn-danger text-white': maturityDate(),
											'btn-primary': !maturityDate(),
										}"
										@click="showCustomAlert"
									>
										續約
									</button>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-3 col-xl-2 px-4 px-lg-2">
						<h3 class="fs-5 neutral-01 mb-4 fw-medium">{{ init.title }}頭像</h3>
						<div class="text-center w-fit">
							<img
								v-if="data.avatar"
								class="card-img-top rounded-circle my-2"
								:src="data.avatar"
								alt="頭像"
								style="width: 7em; height: 7em"
							/>
							<div>
								<button
									type="button"
									class="btn btn-primary mt-3 px-4"
									@click="uploadFile"
								>
									選擇圖片
								</button>
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
								<p class="form-text lh-sm mt-2" style="font-size: 12px">
									圖片限制
									<br />
									大小：3MB
									<br />
									類型：JPG.PNG
								</p>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-9 col-xl-10">
						<div class="row m-0 p-0">
							<!-- 商家資訊 -->
							<div
								v-if="init.title === '商家'"
								class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 m-0 mb-5 mb-xl-0 ps-xl-4"
							>
								<h3 class="fs-5 neutral-01 mb-4 fw-medium">商家資訊</h3>
								<div class="row m-0 p-0">
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<label for="brand" class="mb-1">
											商家名稱
											<span class="text-danger">*</span>
										</label>
										<v-field
											id="brand"
											name="商家名稱"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['商家名稱'] }"
											rules="text:商家名稱"
											v-model="data.brand"
											aria-label="商家名稱"
											placeholder="請輸入商家名稱"
										></v-field>
										<error-message
											name="商家名稱"
											class="invalid-feedback"
										></error-message>
									</div>
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<label for="address" class="mb-1">商家地址</label>
										<v-field
											id="address"
											name="商家地址"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['商家地址'] }"
											rules="address"
											aria-label="商家地址"
											v-model="data.address"
											placeholder="請輸入商家地址"
											autocomplete="street-address"
										></v-field>
										<error-message
											name="商家地址"
											class="invalid-feedback"
										></error-message>
									</div>
									<div
										v-if="data.salesType"
										class="col-12 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<label for="allType" class="mb-1">
											商家分類
											<span class="text-danger">*</span>
										</label>
										<div class="col-12 p-0 m-0 mb-2">
											<div class="dropdown">
												<button
													class="form-control py-0"
													:class="{
														'justify-content-between':
															data.salesType.length === 0,
														'justify-content-start':
															data.salesType.length !== 0,
													}"
													ref="dropdownBtn"
													type="button"
													data-bs-toggle="dropdown"
													data-bs-auto-close="outside"
												>
													<div
														v-if="data.salesType.length === 0"
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
													<div class="row m-0 p-0">
														<div
															v-for="(item, index) in data.salesType"
															:key="index"
															class="input-badge w-auto"
															:class="{
																'bg-neutral-02': addNum,
																white: addNum,
															}"
														>
															<p class="mb-0">
																{{ getBadgeText(item) }}
															</p>
															<button
																type="button"
																class="btn-close"
																aria-label="Close"
																@click="inputBadgeClose(item)"
															></button>
														</div>
													</div>
												</button>
												<ul
													class="dropdown-menu w-100 scrollbar"
													ref="dropdown"
												>
													<li
														v-for="(stt, sttIndex) in init2.shopTypeText"
														:key="sttIndex"
													>
														<div class="dropdown-item">
															<v-field
																class="form-check-input me-2"
																type="checkbox"
																v-model="data.salesType"
																:class="{
																	'is-invalid': errors['salesType'],
																}"
																:value="stt.value"
																:id="'salesType' + stt.value"
																name="salesType"
																as="input"
															></v-field>
															<label
																class="form-check-label"
																:for="'salesType' + stt.value"
																style="width: 100%"
															>
																{{ stt.text }}
															</label>
														</div>
													</li>
												</ul>
											</div>
											<span
												v-if="data.salesType.length === 0"
												role="alert"
												class="text-danger"
												style="margin-top: 0.25rem; font-size: 0.875em"
											>
												請最少選擇一項分類
											</span>
										</div>
									</div>

									<div
										class="col-12 p-0 m-0 mb-2"
										style="min-height: calc(6.5em + 55px)"
									>
										<label for="introduce" class="mb-1">
											商家介紹
											<span class="text-danger">*</span>
										</label>
										<textarea
											class="form-control scrollbar"
											placeholder="請輸入..."
											id="introduce"
											v-model="data.introduce"
											style="height: 6.5em; resize: none"
										></textarea>
									</div>
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<label for="collection" class="mb-1">
											收款帳戶
											<span class="text-danger">*</span>
										</label>
										<v-field
											id="collection"
											name="收款帳戶"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['收款帳戶'] }"
											v-model="data.collection"
											rules="collection"
											aria-label="收款帳戶"
											placeholder="請輸入商家名稱"
										></v-field>
										<error-message
											name="收款帳戶"
											class="invalid-feedback"
										></error-message>
									</div>
								</div>
							</div>
							<!-- 商家資訊 -->
							<div
								class="col-12 col-sm-12 col-md-12 col-lg-12 m-0 ps-xl-4"
								:class="{
									'col-xl-6': init.title === '商家',
									'col-xl-7 mb-5 mb-xl-0': init.title === '會員',
								}"
							>
								<h3 class="fs-5 neutral-01 mb-4 fw-medium">基本資料</h3>
								<div class="row m-0 p-0">
									<div
										v-if="init.title === '商家'"
										class="col-12 col-lg-6 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<label for="name" class="mb-1">
											姓名
											<span class="text-danger">*</span>
										</label>
										<v-field
											class="d-flex mx-auto form-control my-auto"
											id="name"
											name="姓名"
											type="text"
											placeholder="請輸入姓名"
											aria-label="姓名"
											v-model="data.bossName"
											:class="{ 'is-invalid': errors['姓名'] }"
											rules="name"
											autocomplete="name"
										></v-field>
										<error-message
											name="姓名"
											class="invalid-feedback"
										></error-message>
									</div>
									<div
										v-if="init.title === '會員'"
										class="col-12 col-lg-6 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<label for="name" class="mb-1">
											姓名
											<span class="text-danger">*</span>
										</label>
										<v-field
											class="d-flex mx-auto form-control my-auto"
											id="name"
											name="姓名"
											type="text"
											placeholder="請輸入姓名"
											aria-label="姓名"
											v-model="data.name"
											:class="{ 'is-invalid': errors['姓名'] }"
											rules="name"
											autocomplete="name"
										></v-field>
										<error-message
											name="姓名"
											class="invalid-feedback"
										></error-message>
									</div>
									<div
										class="col-12 col-lg-6 ps-lg-4 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<label for="gender" class="mb-1">
											性別
											<span class="text-danger">*</span>
										</label>
										<v-field
											class="my-auto form-select"
											id="gender"
											aria-label="性別"
											v-model="data.gender"
											name="性別"
											:class="{
												'is-invalid': errors['性別'],
												'form-disabled': !data.gender,
												'neutral-03': data.gender ? '' : 'neutral-03',
											}"
											rules="gender"
											as="select"
										>
											<option value="" disabled>請選擇性別</option>
											<option value="男">男</option>
											<option value="女">女</option>
										</v-field>
									</div>
									<div
										class="col-12 col-lg-6 p-0 m-0 position-relative mb-2"
										style="min-height: 100px"
									>
										<label for="password" class="mb-1">
											密碼
											<span class="text-danger">*</span>
										</label>
										<v-field
											id="password"
											name="密碼"
											:type="eye && updateStatus ? 'text' : 'password'"
											ref="passwordRef"
											class="form-control"
											:class="{ 'is-invalid': errors['密碼'] }"
											placeholder="請輸入密碼"
											rules="password"
											v-model="update.password"
											autocomplete="password"
											aria-label="密碼"
											:disabled="!updateStatus"
										></v-field>
										<!-- :readonly="!data.updatePassword" -->
										<font-awesome-icon
											:icon="['fas', eye ? 'eye' : 'eye-slash']"
											class="position-absolute z-3 fs-5 px-2"
											:class="{
												'neutral-03': !eye,
												'neutral-02': eye,
												'bg-white': updateStatus,
											}"
											style="
												top: 1em;
												right: 0px;
												transform: translate(-4px, 16px);
											"
											@click="updateStatus ? (eye = !eye) : ''"
										/>
										<error-message
											name="密碼"
											class="invalid-feedback"
										></error-message>
									</div>
									<div
										class="col-12 col-lg-6 ps-lg-4 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<div
											v-if="!updateStatus"
											class="d-flex justify-content-end align-items-center"
											style="max-height: 42.4px; margin-top: 28px"
										>
											<button
												type="button"
												class="btn btn-outline-primary"
												style="width: 129px"
												@click="showUpdate()"
											>
												更改密碼
											</button>
										</div>
										<div v-else>
											<label for="confirmPassword" class="mb-1">
												確認密碼
												<span class="text-danger">*</span>
											</label>
											<v-field
												class="d-flex mx-auto form-control my-auto"
												id="confirmPassword"
												type="password"
												placeholder="請再次輸入密碼"
												v-model="update.confirmPassword"
												name="確認密碼"
												autocomplete="current-password"
												:class="{ 'is-invalid': errors['確認密碼'] }"
												rules="required|confirmed:密碼"
											></v-field>
											<error-message
												name="確認密碼"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>

									<div
										v-if="init.title === '會員'"
										class="col-12 col-lg-6 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<!-- 會員 -->
										<label for="birthday" class="mb-1">
											生日
											<span class="text-danger">*</span>
										</label>
										<v-field
											id="birthday"
											type="date"
											name="生日"
											class="form-control"
											:class="{ 'is-invalid': errors['生日'] }"
											v-model="data.birthday"
											placeholder="請選擇生日"
											rules="birthday"
										></v-field>
										<error-message
											name="生日"
											class="invalid-feedback"
										></error-message>
									</div>
									<div
										class="col-12 p-0 m-0 mb-2"
										style="min-height: 100px"
										:class="{
											'col-lg-12': init.title === '商家',
											'col-lg-6': init.title === '會員',
											'ps-lg-4': init.title === '會員',
										}"
									>
										<p class="mb-1">
											手機
											<span class="text-danger">*</span>
										</p>
										<v-field
											id="phone"
											name="手機"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['手機'] }"
											placeholder="請輸入手機"
											autocomplete="tel"
											rules="phone"
											v-model="data.phone"
										></v-field>
										<error-message
											name="手機"
											class="invalid-feedback"
										></error-message>
									</div>
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<label for="email" class="mb-1">
											郵件
											<span class="text-danger">*</span>
										</label>
										<v-field
											id="email"
											name="郵件"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['郵件'] }"
											v-model="data.mail"
											autocomplete="email"
											placeholder="請輸入郵件"
											rules="email|required"
											disabled
										></v-field>
										<error-message
											name="郵件"
											class="invalid-feedback"
										></error-message>
									</div>
									<div
										v-if="init.title === '會員'"
										class="col-12 p-0 m-0 mb-2"
										style="min-height: 100px"
									>
										<!-- 會員 -->
										<label for="address" class="mb-1">
											地址
											<span class="text-danger">*</span>
										</label>
										<v-field
											id="address"
											name="地址"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['地址'] }"
											:rules="`address${init.type === 'user' ? '|required' : ''}`"
											v-model="data.address"
											:placeholder="
												init.type === 'user' ? '請輸入地址' : '請輸入商家地址'
											"
											autocomplete="street-address"
										></v-field>
										<error-message
											name="地址"
											class="invalid-feedback"
										></error-message>
									</div>
								</div>
							</div>
							<!-- 預設收件人 -->
							<!-- <div
								v-if="init.title === '會員'"
								class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 m-0 ps-xl-4"
							>
								<h3 class="fs-5 neutral-01 mb-4 fw-medium">預設收件人</h3>
								<div class="row m-0 p-0">
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<p class="mb-1">姓名</p>
									</div>
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<p class="mb-1">手機</p>
									</div>
									<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
										<p class="mb-1">地址</p>
									</div>
								</div>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
			class="col bg-white p-3 px-sm-5 mx-0 mx-md-3 rounded-0 sticky-bottom d-flex justify-content-end shadow-sm"
		>
			<button
				type="button"
				class="btn btn-outline-primary px-5 mx-1 mx-sm-2 me-md-4"
				@click="cancel()"
			>
				取消
			</button>
			<button type="submit" class="btn btn-primary px-5 m-0 mx-1 mx-sm-2">
				更改
			</button>
		</div>
	</v-form>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch, createApp } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useUserStore, useAuthStore } from '@/stores/index';
import { alertStore } from '@/main'; // 導入實例
import { useRoute } from 'vue-router';
import router from '@/router/index';
// import { type UserDataType } from '@/type/userType';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import Swal from 'sweetalert2';
import PlanList from '../components/PlanList.vue';
import NavTabs from '../components/NavTabs.vue';

const route = useRoute();
const authStore = useAuthStore();

const userStore = useUserStore();
const data = computed(() => userStore.user);
const updateStatus = computed(() => userStore.updateStatus);

function showCustomAlert() {
	Swal.fire({
		title: '合約方案',
		width: 900,
		padding: '0',
		showCloseButton: true,
		showConfirmButton: false,
		html: '<div id="modal" email:"data.mail" ></div>',
		didOpen: () => {
			const app = createApp(PlanList, { email: data.value.mail });
			app.mount('#modal');
		},
	});
}

// 同步資料 isLoading
const isLoading = ref(true);
const loadingClose = () => {
	if (window.history.length > 1) {
		router.go(-1);
	} else {
		router.push('/home');
	}
};

// 商家分類 --------------------
const addNum = ref(false);
function add() {
	if (addNum.value === false) addNum.value = true;
	else addNum.value = false;
}
// 取得文字
function getBadgeText(index: number): string {
	const text = init2.value.shopTypeText.find(
		(item: { value: number }) => item.value === index
	);
	return text.text;
}

// 刪除，待檢查
function inputBadgeClose(num: number) {
	const index = data.value.salesType.findIndex((item: number) => item === num);
	if (index !== -1) {
		data.value.salesType.splice(index, 1);
	}
}

const init2 = ref({
	shopTypeText: [
		{ text: '娛樂', value: 1 },
		{ text: '服飾', value: 2 },
		{ text: '3C產品', value: 3 },
		{ text: '食品', value: 4 },
		{ text: '家具', value: 5 },
		{ text: '運動用品', value: 6 },
		{ text: '寵物用品', value: 7 },
		{ text: '生活用品', value: 8 },
		{ text: '清潔用品', value: 9 },
		{ text: '其他', value: 10 },
	],
}) as any;

// 假資料 --------------------
type UpdateType = {
	password: string | null;
	confirmPassword: string | null;
};
const update = ref<UpdateType>({
	password: 'aa1234567',
	confirmPassword: 'aa1234567',
});

// 計算 續約是否快到期 --------------------
function maturityDate(): boolean {
	if (data.value.planPeriod && data.value.planPeriod !== null) {
		const contractDate = new Date(data.value.planPeriod);
		const today = new Date();
		contractDate.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);
		const daysUntilContract =
			(contractDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
		return daysUntilContract <= 7;
	}
	return false;
}
// 顯示 密碼確認 --------------------
const eye = ref(false);
function showUpdate() {
	userStore.updateStatus = true;
	update.value.password = '';
	update.value.confirmPassword = '';
	document.getElementById('password')!.focus();
}

//送出表單 --------------------
function onSubmit(): any {
	userStore.upUserAccount(update.value);
}

//清除 --------------------
function cancel(): any {
	userStore.updateStatus = false;
	eye.value = false;
	update.value.password = 'aa1234567';
	update.value.confirmPassword = 'aa1234567';
	userStore.getUserAccount();
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
		userStore.getImgUrl(file, authStore.token);
	}
}

const userTitleData = {
	title: '會員',
	navTabs: {
		routeName: 'UserProfile',
		title: [
			{
				title: '會員資訊',
				// path: { name: 'SellerCoupon', query: { page: 1, type: '1' } },
			},
		],
		schedule: '1',
	},
};

const sellerTitleData = {
	title: '商家',
	navTabs: {
		routeName: 'SellerProfile',
		title: [
			{
				title: '商家資訊',
				// path: { name: 'SellerCoupon', query: { page: 1, type: '1' } },
			},
		],
		schedule: '1',
	},
};

const init = ref({}) as any;

onMounted(() => {
	// 根據當前路由加載資料
	if (route && route.name === 'SellerProfile') {
		init.value = sellerTitleData;
	} else if (route && route.name === 'UserProfile') {
		init.value = userTitleData;
	}
	userStore.getUserAccount();
});
</script>
<style lang="scss" scoped>
.flex-shrink {
	flex-shrink: 0; //禁止擠壓
}
</style>
