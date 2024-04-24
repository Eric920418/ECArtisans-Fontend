<template>
	<div class="m-5 row">
		<h1>會員資料</h1>
		<div>
			基本資料：{{ memberData }}
			<br />
			預設收件人資料：{{ send }}
			<br />
			上傳：{{ inputField }}
		</div>
		<!-- 會員頭像 ---------------------------- START -->
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
		<!-- 會員頭像 ---------------------------- END -->
		<form>
			<!-- 基本資料 ---------------------------- START -->
			<div class="col-sm-10 col-md-8">
				<div class="mb-3 row">
					<!-- 姓名 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label for="name" class="me-2 col-form-label" style="width: 3em">
							姓名
						</label>
						<input
							id="name"
							type="text"
							class="form-control"
							v-model="memberData.name"
						/>
					</div>
					<!-- 姓名 END-->

					<!-- 性別 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label for="gender" class="me-2 col-form-label" style="width: 3em">
							性別
						</label>
						<select
							class="form-select"
							id="gender"
							aria-label="請選擇性別"
							v-model="memberData.gender"
						>
							<option selected>請選擇</option>
							<option value="男">男</option>
							<option value="女">女</option>
						</select>
					</div>
					<!-- 性別 END-->

					<!-- 密碼 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label for="pw" class="me-2 col-form-label" style="width: 3em">
							密碼
						</label>
						<input
							:readonly="!memberData.rePwShow"
							id="pw"
							type="password"
							class="form-control"
							v-model="memberData.pw"
							ref="pwInput"
							autocomplete="new-password"
						/>
					</div>
					<!-- 密碼 END-->

					<!-- 確認 START-->
					<div class="mb-2 d-flex col-sm-6">
						<div v-if="!memberData.rePwShow" class="">
							<button type="button" class="btn btn-link" @click="rePW()">
								更改密碼
							</button>
						</div>
						<label
							v-if="memberData.rePwShow"
							for="rePw"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							確認
						</label>
						<input
							v-if="memberData.rePwShow"
							id="rePw"
							ref="rePwInput"
							type="password"
							class="form-control"
							v-model="memberData.rePw"
							autocomplete="new-password"
						/>
					</div>
					<!-- 確認 END-->

					<!-- 生日 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label for="date" class="me-2 col-form-label" style="width: 3em">
							生日
						</label>
						<input
							id="date"
							type="date"
							class="form-control"
							v-model="memberData.date"
						/>
					</div>
					<!-- 生日 END-->

					<!-- 手機 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label for="call" class="me-2 col-form-label" style="width: 3em">
							手機
						</label>
						<input
							id="call"
							type="text"
							class="form-control"
							v-model="memberData.call"
						/>
					</div>
					<!-- 手機 END-->

					<!-- 郵件 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label for="email" class="me-2 col-form-label" style="width: 3em">
							郵件
						</label>
						<input
							id="email"
							type="text"
							class="form-control"
							v-model="memberData.email"
							autocomplete="off"
						/>
					</div>
					<!-- 郵件 END-->

					<!-- 地址 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label for="add" class="me-2 col-form-label" style="width: 3em">
							地址
						</label>
						<input
							id="add"
							type="text"
							class="form-control"
							v-model="memberData.add"
						/>
					</div>
					<!-- 地址 END-->
				</div>
			</div>
			<!-- 基本資料 ---------------------------- END -->

			<!-- 預設收件人資料 ---------------------------- START -->
			<div class="col-sm-10 col-md-8">
				<div class="mb-3 row">
					<!-- 姓名 START-->
					<div class="mb-2 d-flex col-sm-6">
						<label
							for="sendName"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							姓名
						</label>
						<input
							id="sendName"
							type="text"
							class="form-control"
							v-model="send.name"
						/>
					</div>
					<!-- 姓名 END-->

					<!-- 手機 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label
							for="sendCall"
							class="me-2 col-form-label"
							style="width: 3em"
						>
							手機
						</label>
						<input
							id="sendCall"
							type="text"
							class="form-control"
							v-model="send.call"
						/>
					</div>
					<!-- 手機 END-->

					<!-- 地址 START-->
					<div class="mb-2 d-flex col-sm-12">
						<label for="sendAdd" class="me-2 col-form-label" style="width: 3em">
							地址
						</label>
						<input
							id="sendAdd"
							type="text"
							class="form-control"
							v-model="send.add"
						/>
					</div>
					<!-- 地址 END-->
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
const pwInput = ref<HTMLInputElement | null>(null); // 顯式聲明 ref 的類型

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
	pwInput.value!.focus();
}
// 會員資料------END

// 預設收件人資料------START

const send = reactive({
	name: '杰倫',
	call: '0912345678',
	add: '100台北市中正區動物街20號',
});

// 預設收件人資料------END
</script>
