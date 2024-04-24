<template>
	<div class="m-5 row">
		<h1>會員資料</h1>
		<div>
			商家 基本資料：{{ shopData }}
			<br />
			主要聯絡人資料：{{ sellerData }}
			<br />
			上傳：{{ inputField }}
		</div>
		<!-- 商家頭像 ---------------------------- START -->
		<div class="col-2"></div>
		<div class="col-2">
			<img
				:src="img.url"
				class="card-img-top rounded-circle"
				alt="..."
				style="width: 100px; height: 100px"
			/>
			<div>
				<button type="button" class="btn btn-primary" @click="uploadFile">
					選擇圖片
				</button>
				<input
					class="form-control"
					type="file"
					id="formFile"
					ref="inputField"
					hidden
				/>
				<p>檔案大小最大:1MB</p>
				<p>檔案限制：JPG.PNG</p>
			</div>
		</div>
		<!-- 商家頭像 ---------------------------- END -->
		<form>
			<!-- 商家 基本資料 ---------------------------- START -->
			<div class="col-sm-10 col-md-8">
				<div class="mb-3 row">
					<!-- 品牌名稱 START-->
					<div class="mb-2 d-flex col-sm-12 align-items-center">
						<label
							for="shopName"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							品牌名稱
						</label>
						<input
							id="shopName"
							type="text"
							class="form-control"
							v-model="shopData.name"
							style="height: calc(1.5rem + (0.375rem * 2) + 2px)"
						/>
					</div>
					<!-- 品牌名稱 END-->

					<!-- 地址 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label for="shopAdd" class="me-2 col-form-label" style="width: 3em">
							地址
						</label>
						<input
							id="shopAdd"
							type="text"
							class="form-control"
							v-model="shopData.add"
							autocomplete="off"
						/>
					</div>
					<!-- 地址 END-->
					{{ shopData.accountStart }} - {{ shopData.accountEnd }}
					<!-- 收款帳戶 START-->
					<div class="mb-2 d-flex col-sm-12 align-items-center">
						<label
							for="shopAccountStart"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							收款帳戶
						</label>
						<input
							id="shopAccountStart"
							ref="shopAccountStartRef"
							type="text"
							class="form-control"
							v-model="shopData.accountStart"
							@input="handleInputStart"
							autocomplete="off"
							style="
								width: calc(3rem + 6px);
								height: calc(1.5rem + (0.375rem * 2) + 2px);
							"
						/>
						<div class="mx-2">-</div>
						<input
							id="shopAccountEnd"
							ref="shopAccountEndRef"
							type="text"
							class="form-control"
							v-model="shopData.accountEnd"
							@input="handleInputEnd"
							style="height: calc(1.5rem + (0.375rem * 2) + 2px)"
							autocomplete="off"
						/>
					</div>
					<!-- 收款帳戶 END-->
				</div>
			</div>
			<!-- 商家 基本資料 ---------------------------- END -->

			<!-- 預設收件人資料 ---------------------------- START -->
			<div class="col-sm-10 col-md-8">
				<div class="mb-3 row">
					<!-- 姓名 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label
							for="sellerName"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							姓名
						</label>
						<input
							id="sellerName"
							type="text"
							class="form-control"
							v-model="sellerData.name"
						/>
					</div>
					<!-- 姓名 END-->

					<!-- 性別 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label
							for="sellerGender"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							性別
						</label>
						<select
							class="form-select"
							id="sellerGender"
							aria-label="請選擇性別"
							v-model="sellerData.gender"
						>
							<option selected>請選擇</option>
							<option value="男">男</option>
							<option value="女">女</option>
						</select>
					</div>
					<!-- 性別 END-->

					<!-- 密碼 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label
							for="sellerPw"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							密碼
						</label>
						<input
							:readonly="!sellerData.rePwShow"
							id="sellerPw"
							type="password"
							class="form-control"
							v-model="sellerData.pw"
							ref="pwInputRef"
							autocomplete="new-password"
						/>
					</div>
					<!-- 密碼 END-->

					<!-- 確認 START-->
					<div class="mb-2 d-flex col-sm-6">
						<div v-if="!sellerData.rePwShow" class="">
							<button type="button" class="btn btn-link" @click="rePW()">
								更改密碼
							</button>
						</div>
						<label
							v-if="sellerData.rePwShow"
							for="sellerRePw"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							確認
						</label>
						<input
							v-if="sellerData.rePwShow"
							id="sellerRePw"
							ref="rePwInput"
							type="password"
							class="form-control"
							v-model="sellerData.rePw"
							autocomplete="new-password"
						/>
					</div>
					<!-- 確認 END-->

					<!-- 手機 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label
							for="sellerCall"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							手機
						</label>
						<input
							id="sellerCall"
							type="text"
							class="form-control"
							v-model="sellerData.call"
							autocomplete="off"
						/>
					</div>
					<!-- 手機 END-->

					<!-- 郵件 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label
							for="sellerEmail"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							郵件
						</label>
						<input
							id="sellerEmail"
							type="text"
							class="form-control"
							v-model="sellerData.email"
							autocomplete="off"
						/>
					</div>
					<!-- 郵件 END-->
				</div>
			</div>
			<!-- 預設收件人資料 ---------------------------- END -->
			<button type="button" class="btn btn-outline-primary">取消</button>
			<button type="button" class="btn btn-primary">提交</button>
		</form>
		<div class="col-2"><p>會員資料已更新</p></div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios'; // 需要安裝 axios

// 補 取消 提交 兩個按鈕

// 會員圖片 ------ START

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
// 會員圖片 ------ END

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
	name: '杰倫',
	add: '100台北市中正區動物街20號',
	// 虛擬帳戶(14~16碼) 實體帳戶(10~12碼) 差2~3碼
	accountStart: '123',
	accountEnd: formatAccountEnd('1234567890123456'),
	contractDate: '2001-09-09',
});

// 輸入帳戶用
const handleInputEnd = () => {
	// 限制 shopAccountEnd 最多 16 個數字
	if (shopData.accountEnd.length > 17) {
		shopData.accountEnd = shopData.accountEnd.slice(0, 17);
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

// 預設收件人資料------START
const pwInputRef = ref<HTMLInputElement | null>(null); // 顯式聲明 ref 的類型

const sellerData = reactive({
	name: '杰倫',
	gender: '男',
	call: '0912345678',
	email: 'aa@aa.com',
	pw: '123456',
	rePw: null,
	rePwShow: false,
});

// 顯示 密碼確認
function rePW() {
	sellerData.rePwShow = true;
	sellerData.pw = '';
	pwInputRef.value!.focus();
}
// 預設收件人資料------END
</script>
