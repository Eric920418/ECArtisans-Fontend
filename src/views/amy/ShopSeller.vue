<template>
	<OneColumnLayout>
		<template #main>
			<div class="isClose container">
				<div class="row g-3 m-5">
					<div class="col-md-2">
						<p>這是預計的標題欄位</p>
					</div>
					<div class="col-12 col-md-10">
						<!-- 以上可以刪除 -->
						<v-form
							v-slot="{ errors }"
							@submit="onSubmit"
							class="row g-3 justify-content-end"
						>
							<!-- 商家頭像 ---------------------------- START -->
							<div class="col-sm-12 col-md-12 col-lg-4 col-xl-2 text-center">
								<img
									:src="img.url"
									class="card-img-top rounded-circle my-2"
									alt="形象圖"
									style="width: 100px; height: 100px"
								/>
								<div>
									<button
										type="button"
										class="btn btn-primary my-2"
										@click="uploadFile"
									>
										選擇圖片
									</button>
									<input
										class="form-control"
										type="file"
										id="formFile"
										ref="inputField"
										hidden
										autocomplete="photo"
									/>
									<div>
										<span class="form-text">
											檔案大小最大:1MB
											<br />
											檔案限制：JPG.PNG
										</span>
									</div>
								</div>
							</div>
							<!-- 商家頭像 ---------------------------- END -->

							<!-- 商家 基本資料 ---------------------------- START -->
							<div class="col-sm-12 col-md-12 col-lg-8 col-xl-5 ps-xl-4">
								<h2>主要聯絡人</h2>
								<div class="mb-3 row">
									<!-- 品牌名稱 START-->
									<div class="mb-2 d-flex col-sm-12">
										<div>
											<label
												for="shopName"
												class="me-2 col-form-label"
												style="width: 2.5em"
											>
												店名
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="shopName"
												name="店名"
												type="text"
												class="form-control"
												:class="{ 'is-invalid': errors['店名'] }"
												rules="shopName"
												v-model="shopData.name"
												aria-label="店名"
											></v-field>
											<error-message
												name="店名"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>
									<!-- 品牌名稱 END-->

									<!-- 地址 START-->
									<div class="mb-2 d-flex col-sm-12">
										<div>
											<label
												for="shopAdd"
												class="me-2 col-form-label"
												style="width: 2.5em"
											>
												地址
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="shopAdd"
												name="地址"
												type="text"
												class="form-control"
												:class="{ 'is-invalid': errors['地址'] }"
												rules="address"
												v-model="shopData.add"
												autocomplete="street-address"
												aria-label="地址"
											></v-field>
											<error-message
												name="地址"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>
									<!-- 地址 END-->

									<!-- 收款帳戶 START-->
									<div
										class="d-flex col-sm-12"
										:class="{
											'mb-1': isAccount(),
											'mb-2': !isAccount(),
										}"
									>
										<div>
											<label
												for="shopAccountStart"
												class="me-2 col-form-label"
												style="width: 2.5em"
											>
												帳戶
											</label>
										</div>
										<div
											class="w-100 d-flex align-items-center"
											:class="{
												'mb-0': isAccount(),
											}"
										>
											<input
												id="shopAccountStart"
												ref="shopAccountStartRef"
												type="text"
												class="form-control"
												:class="{
													'is-invalid': isAccount(),
												}"
												v-model="shopData.accountStart"
												@input="handleInputStart"
												autocomplete="off"
												style="
													width: calc(4.5rem + 6px);
													height: calc(1.5rem + (0.375rem * 2) + 2px);
												"
											/>
											<div class="mx-2">-</div>
											<input
												id="shopAccountEnd"
												name="帳戶"
												ref="shopAccountEndRef"
												type="text"
												class="form-control"
												:class="{
													'is-invalid': isAccount(),
												}"
												v-model="shopData.accountEnd"
												@input="handleInputEnd"
												style="height: calc(1.5rem + (0.375rem * 2) + 2px)"
												autocomplete="off"
												aria-label="帳戶"
											/>
										</div>
									</div>
									<span
										v-if="isAccount()"
										class="text-end"
										style="font-size: 14px; color: rgb(220, 53, 69)"
									>
										{{ isAccount() }}
									</span>
									<!-- 收款帳戶 END-->
								</div>
							</div>
							<!-- 商家 基本資料 ---------------------------- END -->

							<!-- 主要聯絡人資料 ---------------------------- START -->
							<div class="col-sm-12 col-md-12 col-lg-8 col-xl-5 ps-xl-4">
								<h2>主要聯絡人</h2>
								<div class="mb-3 row">
									<!-- 姓名 START-->
									<div class="mb-2 d-flex col-sm-12 col-md-6">
										<div>
											<label
												for="name"
												class="me-2 col-form-label"
												style="width: 3em"
											>
												姓名
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="name"
												name="姓名"
												type="text"
												class="form-control"
												:class="{ 'is-invalid': errors['姓名'] }"
												v-model="sellerData.name"
												autocomplete="name"
												rules="name"
												aria-label="姓名"
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
												class="me-2 col-form-label"
												style="width: 3em"
											>
												性別
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="gender"
												name="性別"
												class="form-select"
												:class="{ 'is-invalid': errors['性別'] }"
												placeholder="請選擇"
												rules="required"
												v-model="sellerData.gender"
												aria-label="性別"
												as="select"
											>
												<option value="" selected>請選擇</option>
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
												class="me-2 col-form-label"
												style="width: 3em"
											>
												密碼
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="password"
												name="password"
												type="password"
												ref="passwordRef"
												class="form-control"
												:class="{ 'is-invalid': errors.password }"
												placeholder="請輸入密碼"
												rules="password"
												v-model="sellerData.pw"
												autocomplete="password"
												:readonly="!sellerData.rePwShow"
												aria-label="密碼"
											></v-field>
											<error-message
												name="password"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>
									<!-- 密碼 END-->

									<!-- 確認 START-->
									<div class="mb-2 d-flex col-sm-12 col-md-6">
										<div
											v-if="!sellerData.rePwShow"
											class="text-sm-end text-md-start w-100"
										>
											<button
												type="button"
												class="btn btn-link px-md-0"
												@click="rePW()"
											>
												更改密碼
											</button>
										</div>
										<div v-if="sellerData.rePwShow">
											<label
												for="rePassword"
												class="me-2 col-form-label"
												style="width: 3em"
											>
												密碼
											</label>
										</div>
										<div v-if="sellerData.rePwShow" class="w-100">
											<v-field
												id="rePassword"
												name="確認密碼"
												type="password"
												ref="repasswordRef"
												class="form-control"
												:class="{ 'is-invalid': errors['確認密碼'] }"
												placeholder="請輸入密碼"
												rules="required|confirmed:password"
												v-model="sellerData.rePw"
												autocomplete="current-password"
												aria-label="確認密碼"
											></v-field>
											<error-message
												name="確認密碼"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>
									<!-- 確認 END-->

									<!-- 手機 START-->
									<div class="mb-2 d-flex col-sm-12">
										<div>
											<label
												for="call"
												class="me-2 col-form-label"
												style="width: 3em"
											>
												手機
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="call"
												name="電話"
												type="text"
												class="form-control"
												:class="{ 'is-invalid': errors['電話'] }"
												placeholder="請輸入電話"
												autocomplete="tel"
												rules="phone"
												v-model="sellerData.call"
												aria-label="電話"
											></v-field>
											<error-message
												name="電話"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>
									<!-- 手機 END-->

									<!-- 郵件 START-->
									<div class="mb-2 d-flex col-sm-12">
										<div>
											<label
												for="email"
												class="me-2 col-form-label"
												style="width: 3em"
											>
												郵件
											</label>
										</div>
										<div class="w-100">
											<v-field
												id="email"
												name="Email"
												type="text"
												class="form-control"
												:class="{ 'is-invalid': errors['Email'] }"
												v-model="sellerData.email"
												autocomplete="email"
												rules="email|required"
												aria-label="email"
											></v-field>
											<error-message
												name="Email"
												class="invalid-feedback"
											></error-message>
										</div>
									</div>
									<!-- 郵件 END-->
								</div>
							</div>
							<!-- 主要聯絡人資料 ---------------------------- END -->
							<div
								class="col-sm-12 col-md-12 text-center text-lg-end text-xl-center"
							>
								<button
									type="button"
									@click="notifyUser"
									class="btn btn-outline-primary me-2"
								>
									取消
								</button>
								<button type="submit" class="btn btn-primary">提交</button>
							</div>
						</v-form>
						<!-- 显示 Msg 组件，传递消息和自动关闭时间 -->
						<Msg v-if="showMsg" :message="msgContent" @close="handleClose" />
						<!-- 以下可以刪除 -->
					</div>
				</div>
			</div>
		</template>
	</OneColumnLayout>
</template>

<script setup lang="ts">
import OneColumnLayout from '../../layouts/OneColumnLayout.vue';
import { ref, reactive, onMounted, nextTick } from 'vue';
import axios from 'axios'; // 需要安裝 axios
import { VForm, VField, ErrorMessage, onSubmit } from '@/setup/vee-validate';
import {
	isPhone,
	isAddress,
	isPassword,
	isGender,
	isName,
	isConfirmed,
	isShopName,
} from '@/setup/vee-validate';
import Msg from '@/components/Message.vue';
import { useAuthStore } from '@/stores/index';

// 通知訊息組件 ------START
const showMsg = ref(false);
const msgContent = ref(0);

const notifyUser = () => {
	showMsg.value = true; // 確保顯示資料
	msgContent.value = 1; // 判斷呼叫第幾則訊息
};

// 在 Msg 關閉時，將 showMsg 設為 false
const handleClose = () => {
	showMsg.value = false;
};
// 通知訊息組件 ------END

// 會員圖片 ------START
const img = ref({
	url: 'https://picsum.photos/id/237/200/280',
});

// const inputField = ref(); // 需要初始化為 null

// 監聽檔案選擇輸入框的 change 事件
const inputField = ref<HTMLInputElement | null>(null); // 顯式聲明 ref 的類型
onMounted(() => {
	inputField.value!.addEventListener('change', () => {
		upFile();
	});
});

const uploadFile = () => {
	if (inputField.value) {
		inputField.value.click();
	}
};

const userStore = useAuthStore();

// 上傳檔案的函數
function upFile() {
	// 在這裡處理檔案上傳的邏輯
	console.log('檔案已選擇');
	if (inputField.value && inputField.value!.files) {
		const file = inputField.value.files[0];

		// 圖片限制邏輯處裡------START
		const validTypes = ['image/jpeg', 'image/png'];
		let checkSize = false;
		let checkType = false;
		if (file.size <= 1024 * 1024) checkSize = true;
		if (validTypes.includes(file.type)) checkType = true;
		// 圖片限制邏輯處裡------END

		if (checkSize && checkType) {
			let formData = new FormData();
			formData.append('file', file);
			console.log('檔案已選擇，準備上傳:', file);

			// 此處添加上傳檔案的程式碼，使用 formData 將檔案發送到後端
		} else {
			if (!checkType) alert('請選擇 .jpg 或 .png 格式上傳圖片。');
			else alert('請選擇圖片且大小需小於等於1MB。');
		}

		// let formData = new FormData();
		// formData.append('file', inputField.value.files[0]);
		// console.log(inputField.value.files[0]);
		// axios
		// 	.post('http://127.0.0.1:8000/api/store-files', formData)
		// 	.then(response => {
		// 		console.log('Upload success:', response);
		// 	})
		// 	.catch(error => {
		// 		console.error('Upload error:', error);
		// 	});
	}
	inputField.value = null;
}
// 會員圖片 ------END

// 會員資料------START
// 輸入帳戶用
const shopAccountStartRef = ref<HTMLInputElement | null>(null);
const shopAccountEndRef = ref<HTMLInputElement | null>(null);
// 每 4 個數字插入空格
const formatAccountEnd = (value: string) => {
	return value
		.replace(/\s/g, '')
		.replace(/(.{4})/g, '$1 ')
		.trim();
};

// 清空 shopAccountStartRef 的內容
const clearInput = () => {
	shopData.accountStart = '';
};

// 驗證 帳戶
function isAccount(): string | boolean {
	let start: string = shopData.accountStart;
	let end: string = shopData.accountEnd;
	if (
		start === null ||
		start === undefined ||
		start.trim() === '' ||
		end === null ||
		end === undefined ||
		end.trim() === ''
	) {
		return '帳戶為必填'; // 返回自定义消息
	}

	const startBoolean = /^\d+$/;
	const endBoolean = /^[\d\s]{12,20}$/;

	return startBoolean.test(start) && endBoolean.test(end)
		? false
		: '請輸入數字';
}

// 在點擊事件處理函數中調用 clearInput()
shopAccountStartRef.value?.addEventListener('click', clearInput);
shopAccountStartRef.value?.addEventListener('focus', clearInput);

// handleInputStart 輸入3碼後 focus 到 shopAccountEnd
const handleInputStart = () => {
	if (shopData.accountStart.length >= 4) {
		let aSdata = shopData.accountStart.slice(0, 3); // 取出前三個字符
		let aEdata = shopData.accountStart.charAt(3); // 取出第四個字符
		shopData.accountStart = aSdata;
		shopData.accountEnd = aEdata;
		shopAccountEndRef.value?.focus();
	}
};

const shopData = reactive({
	name: '杰倫商店',
	add: '100台北市中正區動物街20號',
	// 虛擬帳戶(14~16碼) 實體帳戶(10~12碼) 差2~3碼
	accountStart: '123',
	accountEnd: formatAccountEnd('1234567890123456'),
	contractDate: '2001-09-09',
});

// 輸入帳戶用
const handleInputEnd = () => {
	// 限制 shopAccountEnd 最多 19 個數字
	if (shopData.accountEnd.length > 19) {
		shopData.accountEnd = shopData.accountEnd.slice(0, 19);
	}
	// 每 4 個數字插入空格
	shopData.accountEnd = formatAccountEnd(shopData.accountEnd); // 套用格式化邏輯
};
// 確保在 Vue 組件加載後執行
onMounted(() => {
	// 確保 shopAccountStartRef 不是 null 或 undefined
	if (shopAccountStartRef.value) {
		// 添加點擊事件監聽器
		shopAccountStartRef.value.addEventListener('click', clearInput);
	}
});
// 會員資料------END

// 主要聯絡人資料------START

const sellerData = ref({
	name: '杰倫',
	gender: '男',
	call: '0912345678',
	email: 'aa@aa.com',
	pw: '1234aa56',
	rePw: null,
	rePwShow: false,
});

// 顯示 密碼確認
function rePW() {
	sellerData.value.rePwShow = true;
	sellerData.value.pw = '';
	document.getElementById('password')!.focus();
}

// 主要聯絡人資料------END
</script>

<style scoped></style>
