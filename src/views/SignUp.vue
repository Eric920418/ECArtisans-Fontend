<template>
	<div class="container">
		<!-- 立即註冊 --------------------------------------------------------- START -->
		<button class="btn btn-primary px-5 mt-4" @click="showCustomAlert">
			快速合約方案的連結
		</button>
		<div
			v-if="init.schedule === 'info' && addUserStatus === false"
			class="row g-3 py-4 px-4 d-flex justify-content-center"
		>
			<div class="col-12 my-3 text-center">
				<h2 class="fs-3 fw-bold">{{ init.title }}註冊</h2>
				<div class="mt-1 d-flex justify-content-center">
					<div class="fw-bold d-flex">已經有帳號了?</div>
					<router-link class="ms-2" :to="{ name: init.goback }">
						返回
					</router-link>
				</div>
			</div>
			<v-form
				class="col-12 mb-3 col-md-10 col-lg-7 col-xl-6"
				v-slot="{ errors }"
				@submit="onSubmit1"
			>
				<div class="mb-3 row">
					<!-- 姓名 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="name"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 3em; min-height: 65px"
							>
								姓名
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
							<v-field
								class="d-flex mx-auto form-control my-auto"
								id="name"
								name="姓名"
								type="text"
								placeholder="請輸入姓名"
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
					</div>
					<!-- 姓名 END-->

					<!-- 性別 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="gender"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 3em; min-height: 65px"
							>
								性別
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
							<v-field
								class="my-auto form-select"
								id="gender"
								aria-label="Select gender"
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
					</div>
					<!-- 性別 END-->

					<!-- 密碼 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="password"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 3em; min-height: 65px"
							>
								密碼
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100 position-relative">
							<v-field
								class="d-flex mx-auto form-control my-auto"
								id="password"
								:type="eye ? 'text' : 'password'"
								placeholder="請輸入密碼"
								v-model="data.password"
								name="密碼"
								rules="password"
								autocomplete="password"
								:class="{ 'is-invalid': errors['密碼'] }"
							></v-field>
							<i
								class="bi position-absolute z-3 fs-5 px-2 bg-white"
								:class="{
									'bi-eye-fill': eye,
									'bi-eye-slash-fill': !eye,
									'neutral-03': !eye,
									'neutral-02': eye,
								}"
								style="
									top: 0%;
									right: 0%;
									transform: translate(-9px, 4px);
									cursor: pointer;
								"
								@click="eye = !eye"
							></i>
							<error-message
								name="密碼"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 密碼 END-->

					<!-- 確認密碼 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="confirmPassword"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 5em; min-height: 65px"
							>
								確認密碼
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100 position-relative">
							<v-field
								class="d-flex mx-auto form-control my-auto"
								id="confirmPassword"
								type="password"
								placeholder="請再次輸入密碼"
								v-model="data.confirmPassword"
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
					<!-- 確認密碼 END-->

					<!-- 生日 START-->
					<div v-if="init.type === 'user'" class="mb-2 d-flex col-sm-12">
						<div>
							<label
								for="birthday"
								class="me-2 col-form-label"
								style="width: 3em; min-height: 65px"
							>
								生日
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
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
					</div>
					<!-- 生日 END-->

					<!-- 手機 START-->
					<div
						class="mb-2 d-flex col-sm-12"
						:class="{
							'col-md-6': init.type === 'seller',
						}"
					>
						<div>
							<label
								for="phone"
								class="me-2 col-form-label"
								style="width: 3em; min-height: 65px"
							>
								手機
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
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
					</div>
					<!-- 手機 END-->

					<!-- 郵件 START-->
					<div
						class="mb-2 d-flex col-sm-12"
						:class="{
							'col-md-6': init.type === 'seller',
						}"
					>
						<div>
							<label
								for="email"
								class="me-2 col-form-label"
								style="width: 3em; min-height: 65px"
							>
								郵件
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
							<v-field
								id="email"
								name="Email"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['Email'] }"
								v-model="data.mail"
								autocomplete="email"
								placeholder="請輸入郵件"
								rules="email|required"
							></v-field>
							<error-message
								name="Email"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 郵件 END-->

					<!-- 店名 START-->
					<div v-if="init.title === '商家'" class="mb-2 d-flex col-sm-12">
						<div>
							<label
								for="brand"
								class="me-2 col-form-label"
								style="width: 5em; min-height: 65px"
							>
								商家名稱
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
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
					</div>
					<!-- 店名 END-->

					<!-- 收款帳戶 START-->
					<div v-if="init.title === '商家'" class="mb-2 d-flex col-sm-12">
						<div>
							<label
								for="collection"
								class="me-2 col-form-label"
								style="width: 5em; min-height: 65px"
							>
								收款帳戶
								<span class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
							<v-field
								id="collection"
								name="收款帳戶"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['收款帳戶'] }"
								v-model="data.collection"
								rules="collection"
								aria-label="收款帳戶"
								placeholder="請輸入收款帳戶"
							></v-field>
							<error-message
								name="收款帳戶"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 收款帳戶 END-->

					<!-- 地址 START-->
					<div class="mb-2 d-flex col-sm-12">
						<div>
							<label
								for="address"
								class="me-2 col-form-label"
								:style="{ width: init.type === 'user' ? '3em' : '5em' }"
							>
								{{ init.type === 'user' ? '地址' : '商家地址' }}
								<span v-if="init.type === 'user'" class="text-danger">*</span>
							</label>
						</div>
						<div class="w-100">
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
					<!-- 地址 END-->
				</div>
				<!-- 隱私權政策 checkbox START-->
				<div class="mb-2 d-flex col-sm-12 d-flex justify-content-center">
					<div class="form-check">
						<v-field
							class="form-check-input me-2"
							type="checkbox"
							v-model="policy"
							:class="{ 'is-invalid': errors['policy'] }"
							id="policy"
							name="policy"
							rules="policy"
							as="input"
						></v-field>
						<label class="form-check-label" for="policy">點擊註冊,</label>
						<span class="form-check-label">
							即表示您同意我們的
							<a class="">隱私權政策</a>
						</span>
					</div>
				</div>
				<!-- 隱私權政策 checkbox END-->
				<div class="col-sm-12 col-md-12 text-center">
					<button type="submit" class="btn btn-primary px-5">
						{{ init.submitText }}
					</button>
				</div>
			</v-form>
		</div>
		<!-- 立即註冊 --------------------------------------------------------- END -->

		<!-- 商店類別 --------------------------------------------------------- -->
		<div
			v-else-if="init.schedule === 'shopType' && addUserStatus === false"
			class="row g-3 py-4 px-4 d-flex justify-content-center"
		>
			<div class="col-12 my-3 text-center">
				<div class="fs-3 fw-bold">{{ init.title }}</div>
			</div>
			<v-form
				class="col-12 mb-3 col-md-10 col-lg-7 col-xl-6"
				@submit="onSubmit2"
			>
				<div class="row">
					<div class="col-sm-12 mb-3">
						<div class="d-flex fs-4 mb-2">
							<p class="lh-sm m-1">
								<span class="fw-bold">販售商品的類型</span>
								<span class="text-danger me-2">*</span>
								<span
									class="form-text text-danger m-0 py-0 fs-6 fst-normal"
									v-if="data && data.salesType.length === 0"
								>
									請最少選擇一項
								</span>
							</p>
						</div>
						<div class="row m-0 p-0">
							<div
								class="form-check col-4 col-sm-4 col-md-3 mb-2"
								v-for="(stt, sttIndex) in init.shopTypeText"
								:key="sttIndex"
							>
								<input
									class="form-check-input me-2"
									type="checkbox"
									v-model="data.salesType"
									:id="`shopType_${sttIndex}`"
									:name="stt"
									:value="stt"
								/>
								<label class="form-check-label" :for="stt">
									{{ stt }}
								</label>
							</div>
						</div>
					</div>
					<!-- 
					<div class="col-sm-12 mb-3">
					</div> -->

					<!-- 介紹 START-->
					<div class="col-sm-12 mb-3">
						<div>
							<label for="inputFieldRef" class="me-2 col-form-label">
								<p class="fs-4 m-0">
									<span class="fw-bold">商家介紹</span>
									<span class="text-danger">*</span>
								</p>
							</label>
						</div>
						<div class="w-100">
							<v-field
								v-slot="{ field, errors }"
								v-model="data.introduce"
								name="comment"
								rules="required"
							>
								<textarea
									v-bind="field"
									placeholder="請輸入..."
									id="introduce"
									class="form-control"
									style="height: 6.5em; resize: none"
									:class="{ 'is-invalid': errors[0] }"
									name="comment"
								/>
							</v-field>
							<!-- <textarea
								class="form-control"
								placeholder="請輸入..."
								id="introduce"
								v-model="data.introduce"
								style="height: 6.5em; resize: none"
							></textarea> -->
						</div>
					</div>
					<!-- 介紹 END-->
				</div>

				<div class="col-sm-12 col-md-12 d-flex justify-content-between">
					<button
						type="button"
						class="btn btn-outline-primary px-sm-5"
						@click="init.schedule = 'info'"
						style="padding-right: 2.5em; padding-left: 2.5em"
					>
						上一步
					</button>
					<button
						type="submit"
						class="btn btn-primary px-sm-5"
						style="padding-right: 2.5em; padding-left: 2.5em"
					>
						{{ init.submitText }}
					</button>
				</div>
			</v-form>
		</div>
		<!-- 商店類別 --------------------------------------------------------- -->
		<!-- 註冊完成 --------------------------------------------------------- -->
		<div
			v-if="addUserStatus === true"
			class="row g-3 py-4 d-flex justify-content-center"
		>
			<div class="col-12 my-3 text-center">
				<div class="fs-3 fw-bold">註冊完成</div>
			</div>
			<div class="col-12 text-center">
				<font-awesome-icon
					:icon="['fas', 'circle-check']"
					class="opacity-25 text-primary mb-2"
					style="font-size: 6.5em"
				/>
				<p>你已經完成註冊</p>
			</div>
			<div class="col-12 text-center">
				<a @click="onSubmitOK()">
					<button class="btn btn-primary px-5">前往登入</button>
				</a>
			</div>
		</div>
		<!-- 註冊完成 --------------------------------------------------------- -->
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, createApp } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore, useUserStore } from '@/stores/index';
import Loading from 'vue-loading-overlay';
import { type UserDataType } from '@/type/userType';
import Swal from 'sweetalert2';
import PlanList from '../components/PlanList.vue';

const planListRef = ref();

// 頁面用到的資料
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const isLoading = computed(() => authStore.isLoading);
const addUserStatus = computed(() => userStore.addUserStatus);
// const isLoading = authStore.isLoading;

// 驗證資料
const eye = ref(false);
const policy = ref('on');
const init = ref({}) as any;

const userTitleData = {
	type: 'user',
	schedule: 'info',
	title: '會員',
	submitText: '註冊',
	goback: 'UserLogin',
	privacyPolicy: '隱私權政策連結',
};

const sellerTitleData = {
	type: 'seller',
	schedule: 'info', //info shopType OK
	title: '商家',
	submitText: '下一步',
	goback: 'SellerLogin',
	privacyPolicy: '隱私權政策連結',
	shopType: [],
	shopTypeText: [
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
	],
};

const data = ref<UserDataType>({
	name: null,
	gender: null,
	phone: null,
	mail: null,
	password: null,
	confirmPassword: null,
	address: null,
	//會員
	birthday: null,
	//開店
	brand: null,
	introduce: null,
	collection: null,
	salesType: [],
});

// 為了製作方便先放這裡
function showCustomAlert() {
	Swal.fire({
		title: '合約方案',
		width: 900,
		padding: '0',
		showCloseButton: true,
		showConfirmButton: false,
		html: '<div id="modal"></div>',
		didOpen: () => {
			const app = createApp(PlanList, { email: data.value.mail });
			app.mount('#modal');
		},
	});
}

function onSubmit1(): any {
	// 發送
	if (init.value && init.value.type === 'seller') {
		init.value.schedule = 'shopType';
	} else if (init.value && init.value.type === 'user') {
		let getData = {
			// 會員註冊需要的資料
			name: data.value.name,
			gender: data.value.gender,
			phone: data.value.phone,
			mail: data.value.mail,
			password: data.value.password,
			confirmPassword: data.value.confirmPassword,
			address: data.value.address,
			birthday: data.value.birthday,
		};
		userStore.addUserAuth(getData);
	}
}

function onSubmit2(): any {
	if (
		data.value.introduce &&
		data.value.introduce.length > 0 &&
		data.value.salesType &&
		data.value.salesType.length > 0
	) {
		//第二步驟
		let getData = {
			// 商家註冊需要的資料
			bossName: data.value.name,
			gender: data.value.gender,
			phone: data.value.phone,
			mail: data.value.mail,
			password: data.value.password,
			confirmPassword: data.value.confirmPassword,
			brand: data.value.brand, //商家名稱
			address: data.value.address, //商家地址
			collection: data.value.collection, //收款帳戶
			salesType: data.value.salesType, //販賣類型
			introduce: data.value.introduce, //介紹
		};
		userStore.addUserAuth(getData);
	}
}

function onSubmitOK(): any {
	userStore.addUserStatus = false;
	init.value.schedule = 'info';
	router.push({ name: init.value.goback });
}

const getData = () => {
	const route = useRoute();
	// 根據當前路由加載資料
	if (route && route.name === 'SellerSignUp') {
		init.value = sellerTitleData;
	} else if (route && route.name === 'UserSignUp') {
		init.value = userTitleData;
	}
};

onMounted(() => {
	getData();
});
</script>
<style scoped>
.swal2-html-container,
div:where(.swal2-container) .swal2-html-container {
	margin: 0em 12px 1em !important;
	padding: 0px !important;
}
.swal2-html-container,
div:where(.swal2-container) button:where(.swal2-close):focus {
	box-shadow: none !important;
}
</style>
