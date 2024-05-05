<template>
	<div class="isClose container">
		<div class="row g-3 m-5">
			<div class="col-md-2">
				<p>這是預計的標題欄位</p>
			</div>
			<div class="col-12 col-md-10">
				<!-- 以上可以刪除 -->
				<div v-if="!userInfo">
					<p>加载中...</p>
				</div>
				<v-form
					v-else
					v-slot="{ errors }"
					@submit="onSubmit"
					class="row g-3 justify-content-end"
				>
					<!-- 商家頭像 ---------------------------- START -->
					<div class="col-sm-12 col-md-12 col-lg-4 col-xl-2 text-center">
						<img
							:src="userInfo.avatar ? userInfo.avatar : imageError"
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
								@change="getFile"
								ref="inputFieldRef"
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

					<!-- 會員 基本資料 ---------------------------- START -->
					<div class="col-sm-12 col-md-12 col-lg-8 col-xl-5 ps-xl-4">
						<h2>基本資料</h2>
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
										v-model="userInfo.name"
										autocomplete="name"
										rules="name"
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
										v-model="userInfo.gender"
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
										class="form-control"
										:class="{ 'is-invalid': errors.password }"
										placeholder="請輸入密碼"
										rules="password"
										v-model="userInfo.password"
										ref="passwordRef"
										autocomplete="password"
										:readonly="!memberData.rePwShow"
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
									v-if="!memberData.rePwShow"
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
								<div v-if="memberData.rePwShow">
									<label
										for="rePassword"
										class="me-2 col-form-label"
										style="width: 3em"
									>
										密碼
									</label>
								</div>
								<div v-if="memberData.rePwShow" class="w-100">
									<v-field
										id="rePassword"
										name="確認密碼"
										type="password"
										ref="repasswordRef"
										class="form-control"
										:class="{ 'is-invalid': errors['確認密碼'] }"
										placeholder="請輸入密碼"
										rules="required|confirmed:password"
										v-model="memberData.rePw"
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

							<!-- 生日 START-->
							<div class="mb-2 d-flex col-sm-12">
								<div>
									<label
										for="date"
										class="me-2 col-form-label"
										style="width: 3em"
									>
										生日
									</label>
								</div>
								<div class="w-100">
									<input
										id="date"
										type="date"
										class="form-control"
										v-model="userInfo.birthday"
									/>
								</div>
							</div>
							<!-- 生日 END-->

							<!-- 手機 START-->
							<div class="mb-2 d-flex col-sm-12">
								<div>
									<label
										for="sellerCall"
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
										v-model="userInfo.phone"
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
										v-model="userInfo.mail"
										autocomplete="email"
										rules="email|required"
									></v-field>
									<error-message
										name="Email"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
							<!-- 郵件 END-->

							<!-- 地址 START-->
							<div class="mb-2 d-flex col-sm-12">
								<div>
									<label
										for="shopAdd"
										class="me-2 col-form-label"
										style="width: 3em"
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
										rules="address|required"
										v-model="userInfo.address"
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
					</div>
					<!-- 會員 基本資料 ---------------------------- END -->

					<!-- 預設收件人資料 ---------------------------- START -->
					<div class="col-sm-12 col-md-12 col-lg-8 col-xl-5 ps-xl-4">
						<h2>預設收件人資料</h2>
						<div class="mb-3 row">
							<!-- 姓名 START-->
							<div class="mb-2 d-flex col-sm-12 col-md-6">
								<div>
									<label
										for="sendName"
										class="me-2 col-form-label"
										style="width: 3em"
									>
										姓名
									</label>
								</div>
								<div class="w-100">
									<v-field
										id="sendName"
										name="收件人姓名"
										type="text"
										class="form-control"
										:class="{ 'is-invalid': errors['收件人姓名'] }"
										v-model="send.name"
										autocomplete="name"
										rules="name"
									></v-field>
									<error-message
										name="收件人姓名"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
							<!-- 姓名 END-->

							<!-- 手機 START-->
							<div class="mb-2 d-flex col-sm-12">
								<div>
									<label
										for="sellerCall"
										class="me-2 col-form-label"
										style="width: 3em"
									>
										手機
									</label>
								</div>
								<div class="w-100">
									<v-field
										id="sendCall"
										name="收件人電話"
										type="text"
										class="form-control"
										:class="{ 'is-invalid': errors['收件人電話'] }"
										placeholder="請輸入收件人電話"
										autocomplete="tel"
										rules="phone"
										v-model="send.call"
									></v-field>
									<error-message
										name="收件人電話"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
							<!-- 手機 END-->
							<!-- 地址 START-->
							<div class="mb-2 d-flex col-sm-12">
								<div>
									<label
										for="sendAdd"
										class="me-2 col-form-label"
										style="width: 3em"
									>
										地址
									</label>
								</div>
								<div class="w-100">
									<v-field
										id="sendAdd"
										name="收件人地址"
										type="text"
										class="form-control"
										:class="{ 'is-invalid': errors['收件人地址'] }"
										rules="address|required"
										v-model="send.add"
										autocomplete="street-address"
									></v-field>
									<error-message
										name="收件人地址"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
							<!-- 地址 END-->
						</div>
					</div>
					<!-- 預設收件人資料 ---------------------------- END -->
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

<script setup lang="ts">
import { ref, reactive, onMounted, provide, computed, watch } from 'vue';
import axios from 'axios'; // 需要安裝 axios
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { isPhone } from '@/setup/vee-validate';
import Msg from '@/components/Message.vue';
import { useUserStore } from '@/stores/index'; // 引用 Pinia Store

const userStore = useUserStore();
provide('userStore', userStore);
const id = userStore.id;
const imageError = userStore.imageError;
const userInfo = computed(() => userStore.user);

// 在组件挂载时调用
onMounted(() => {
	userStore.getUserAccount(); // 获取商家信息
});
// 提交
function onSubmit(values: any): any {
	console.log('觸發');
	userStore.upUserAccount(); // 获取商家信息
}
// 通知訊息組件 ------START
const showMsg = ref(false);
const msgContent = ref(0);

// 在 Msg 關閉時，將 showMsg 設為 false
const handleClose = () => {
	showMsg.value = false;
};
// 通知訊息組件 ------END

// 會員圖片 ------ START

const inputFieldRef = ref<HTMLInputElement | null>(null); //上傳用的input
const selectedFile = ref<File | null>(null); // 存储选择的文件

onMounted(() => {
	inputFieldRef.value!.addEventListener('change', () => {
		getFile();
	});
});

let uploadFile = () => {
	if (inputFieldRef.value) {
		inputFieldRef.value.click();
	}
};

// 上傳檔案的函數
function getFile() {
	let inputField = inputFieldRef.value;
	// 在這裡處理檔案上傳的邏輯
	if (inputField && inputField!.files) {
		let file = inputField.files[0];

		// 圖片限制邏輯處裡------START
		let validTypes = ['image/jpeg', 'image/png'];
		let checkSize = false;
		let checkType = false;
		if (file.size <= 1024 * 1024) checkSize = true;
		if (validTypes.includes(file.type)) checkType = true;
		// 圖片限制邏輯處裡------END

		if (checkSize && checkType) {
			selectedFile.value = file;
		} else {
			if (!checkType) alert('請選擇 .jpg 或 .png 格式上傳圖片。');
			else alert('請選擇圖片且大小需小於等於1MB。');
		}
	}
}

// 當文件被選定的時候，使用 FileReader 读取并转换为 Data URL
watch(selectedFile, newFile => {
	if (newFile) {
		const reader = new FileReader();
		reader.onload = e => {
			if (userInfo.value) {
				userInfo.value.avatar = e.target?.result as string; // 转换为 Data URL
			}
		};
		reader.readAsDataURL(newFile); // 讀取文件並轉換
	}
});

// 會員圖片 ------ END

// 會員資料------START

const memberData = reactive({
	name: '杰倫',
	gender: '男',
	pw: '123456',
	date: '2001-09-09',
	call: '0912345678',
	email: 'aa@aa.com',
	add: '100台北市中正區動物街20號',
	rePw: null,
	rePwShow: false,
});
// 顯示 密碼確認
function rePW() {
	memberData.rePwShow = true;
	memberData.pw = '';
	document.getElementById('password')!.focus();
}
// 會員資料------END

// 預設收件人資料------START

const send = reactive({
	name: '杰倫',
	call: '0912345678',
	add: '100台北市中正區動物街20號',
});

// 未定義
const notifyUser = () => {};

// 預設收件人資料------END
</script>
