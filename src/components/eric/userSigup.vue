<template>
	<v-form
		class="login"
		style="width: 600px"
		v-slot="{ errors }"
		@submit="sigup"
	>
		買家測試
		<div class="fs-3 fw-bold d-flex justify-content-center mb-3">立即註冊</div>
		<div class="d-flex justify-content-center">
			<div class="fw-bold d-flex mb-3">已經有帳號了?</div>
			<a class="ms-2" @click.prevent="goback">返回</a>
		</div>
		<div class="row">
			<div class="col-6 row">
				<div class="d-flex">
					<div>
						<label for="name" class="col-form-label text-nowrap my-auto me-2">
							*姓名
						</label>
					</div>
					<div class="w-100">
						<v-field
							class="d-flex mx-auto form-control my-auto"
							id="name"
							name="姓名"
							type="text"
							placeholder="名稱"
							v-model="data.name"
							:class="{ 'is-invalid': errors['姓名'] }"
							rules="name"
						></v-field>
						<error-message name="姓名" class="invalid-feedback"></error-message>
					</div>
				</div>
				<div class="d-flex mt-1">
					<div>
						<label
							for="password"
							class="col-form-label text-nowrap my-auto me-2"
						>
							*密碼
						</label>
					</div>
					<div class="w-100">
						<v-field
							class="d-flex mx-auto form-control my-auto"
							id="password"
							type="password"
							placeholder="密碼"
							v-model="data.password"
							name="密碼"
							rules="password"
							:class="{ 'is-invalid': errors['密碼'] }"
						></v-field>
						<error-message name="密碼" class="invalid-feedback"></error-message>
					</div>
				</div>
			</div>
			<div class="col-6">
				<div class="d-flex">
					<div>
						<label for="gender" class="col-form-label text-nowrap my-auto me-2">
							*性別
						</label>
					</div>
					<div class="w-100">
						<v-field
							class="form-select my-auto"
							id="gender"
							aria-label="Default select example"
							v-model="data.gender"
							placeholder="請選擇"
							name="性別"
							:class="{ 'is-invalid': errors['性別'] }"
							rules="gender"
							as="select"
						>
							<option selected>請選擇</option>
							<option value="男">男</option>
							<option value="女">女</option>
						</v-field>
					</div>
				</div>
				<div class="d-flex mt-1">
					<div>
						<label
							for="confirmPassword"
							class="col-form-label text-nowrap my-auto me-2"
						>
							*確認密碼
						</label>
					</div>
					<div class="w-100">
						<v-field
							class="d-flex mx-auto form-control my-auto"
							id="confirmPassword"
							type="password"
							placeholder="確認密碼"
							v-model="data.confirmPassword"
							name="確認密碼"
							:class="{ 'is-invalid': errors['確認密碼'] }"
							rules="required|confirmed:密碼"
						></v-field>
						<error-message
							name="確認密碼"
							class="invalid-feedback"
						></error-message>
					</div>
				</div>
			</div>
		</div>
		<div class="d-flex mt-1">
			<div>
				<label
					for="brand"
					class="col-form-label text-nowrap my-auto"
					style="width: 5em"
				>
					生日
				</label>
			</div>
			<div class="w-100">
				<input
					id="birthday"
					type="date"
					class="form-control"
					v-model="data.birthday"
				/>
			</div>
		</div>
		<div class="d-flex mt-1">
			<div>
				<label
					for="phone"
					class="col-form-label text-nowrap my-auto"
					style="width: 5em"
				>
					*手機
				</label>
			</div>
			<div class="w-100">
				<v-field
					class="d-flex mx-auto form-control my-auto"
					id="phone"
					type="text"
					placeholder="手機"
					v-model="data.phone"
					rules="phone"
					name="電話"
					:class="{ 'is-invalid': errors['電話'] }"
				></v-field>
				<error-message name="電話" class="invalid-feedback"></error-message>
			</div>
		</div>
		<div class="d-flex mt-1">
			<div>
				<label
					for="mail"
					class="col-form-label text-nowrap my-auto"
					style="width: 5em"
				>
					*郵件
				</label>
			</div>
			<div class="w-100">
				<v-field
					class="d-flex mx-auto form-control my-auto"
					id="mail"
					type="text"
					placeholder="郵件"
					v-model="data.mail"
					:class="{ 'is-invalid': errors['郵件'] }"
					name="郵件"
					rules="email|required"
				></v-field>
				<error-message name="郵件" class="invalid-feedback"></error-message>
			</div>
		</div>
		<div class="d-flex mt-1">
			<div>
				<label
					for="address"
					class="col-form-label text-nowrap my-auto"
					style="width: 5em"
				>
					實體地址
				</label>
			</div>
			<div class="w-100">
				<v-field
					class="form-control"
					id="address"
					type="text"
					placeholder="地址"
					v-model="data.address"
					name="地址"
					:class="{ 'is-invalid': errors['地址'] }"
					rules="address"
				></v-field>
				<error-message name="地址" class="invalid-feedback"></error-message>
			</div>
		</div>
		<div class="text-center my-2">
			<div class="form-check d-flex justify-content-center">
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
				<label class="form-check-label" for="policy">
					點擊註冊, 即表示您同意我們的
				</label>
				<a class="" @click.prevent="">隱私權政策</a>
				{{ data }}
			</div>
		</div>
		<div class="d-flex justify-content-center">
			<button class="btn btn-primary mt-2 w-50">註冊</button>
		</div>
	</v-form>
</template>

<script>
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { isPhone, isAddress, isPolicy } from '@/setup/vee-validate';
import { useAuthStore } from '@/stores/index';

export default {
	components: {
		VForm,
		VField,
		ErrorMessage,
	},
	data() {
		return {
			data: {
				bossName: '',
				gender: '請選擇',
				phone: '',
				mail: '',
				brand: '',
				avatar: '',
				password: '',
				confirmPassword: '',
				address: '',
				birthday: '',
			},
			policy: 'on',
		};
	},
	created() {
		this.authStore = useAuthStore(); // 创建Pinia Store实例
	},
	methods: {
		sigup() {
			console.log('觸發成功');
			this.authStore.addUserAuth(); // 获取商家信息
		},
		goback() {
			this.$emit('goback');
		},
	},
};
</script>
