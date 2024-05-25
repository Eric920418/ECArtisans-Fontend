<template>
	<div class="isClose container">
		<div class="row g-3 py-4 d-flex justify-content-center">
			<div class="col-12 my-3 text-center">
				<!-- d-flex justify-content-center -->
				<div class="fs-3 fw-bold">買家立即註冊</div>
				<div class="mt-1 d-flex justify-content-center">
					<div class="fw-bold d-flex">已經有帳號了?</div>
					<a class="ms-2" @click="goback">返回</a>
				</div>
			</div>
			<v-form
				class="col-12 mb-3 col-md-10 col-lg-8"
				v-slot="{ errors }"
				@submit="sigup"
			>
				<loading
					v-model:active="this.userStore.isLoading"
					:can-cancel="true"
					:color="color"
					:on-cancel="this.authStore.cancel"
					:is-full-page="fullPage"
				/>
				<div class="mb-3 row">
					<!-- 姓名 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="name"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 3em"
							>
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
								style="width: 3em"
							>
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
					<!-- 性別 END-->

					<!-- 密碼 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="password"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 3em"
							>
								*密碼
							</label>
						</div>
						<div class="w-100 position-relative">
							<v-field
								class="d-flex mx-auto form-control my-auto"
								id="password"
								:type="eye ? 'text' : 'password'"
								placeholder="密碼"
								v-model="data.password"
								name="密碼"
								rules="password"
								autocomplete="password"
								:class="{ 'is-invalid': errors['密碼'] }"
							></v-field>
							<i
								class="bi position-absolute z-3 fs-5"
								:class="{ 'bi-eye-fill': eye, 'bi-eye-slash-fill': !eye }"
								style="
									top: 0%;
									right: 10%;
									transform: translate(-12px, 4px);
									cursor: pointer;
								"
								@click="see"
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
								style="width: 5em"
							>
								*確認密碼
							</label>
						</div>
						<div class="w-100 position-relative">
							<v-field
								class="d-flex mx-auto form-control my-auto"
								id="confirmPassword"
								:type="eye ? 'text' : 'password'"
								placeholder="確認密碼"
								v-model="data.confirmPassword"
								name="確認密碼"
								autocomplete="current-password"
								:class="{ 'is-invalid': errors['確認密碼'] }"
								rules="required|confirmed:密碼"
							></v-field>
							<i
								class="bi position-absolute z-3 fs-5"
								:class="{ 'bi-eye-fill': eye, 'bi-eye-slash-fill': !eye }"
								style="
									top: 0%;
									right: 10%;
									transform: translate(-12px, 4px);
									cursor: pointer;
								"
								@click="see"
							></i>
							<error-message
								name="確認密碼"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 確認密碼 END-->

					<!-- 生日 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="birthday"
								class="col-form-label text-nowrap my-auto me-2"
								style="width: 3em"
							>
								*生日
							</label>
						</div>
						<div class="w-100">
							<v-field
								class="d-flex mx-auto form-control my-auto"
								id="birthday"
								name="生日"
								type="date"
								placeholder="生日"
								v-model="data.birthday"
								:class="{ 'is-invalid': errors['生日'] }"
								rules="required"
								:max="getToday()"
								required
							></v-field>
							<error-message
								name="生日"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 生日 END-->

					<!-- 手機 START-->
					<div class="mb-2 d-flex col-sm-12 col-md-6">
						<div>
							<label
								for="phone"
								class="col-form-label text-nowrap my-auto"
								style="width: 3.5em"
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
								autocomplete="tel"
								:class="{ 'is-invalid': errors['電話'] }"
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
								for="mail"
								class="col-form-label text-nowrap my-auto"
								style="width: 3.5em"
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
								autocomplete="email"
							></v-field>
							<error-message
								name="郵件"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 郵件 END-->
					<!-- 實體地址 START-->
					<div class="mb-2 d-flex col-sm-12">
						<div>
							<label
								for="address"
								class="col-form-label text-nowrap my-auto"
								style="width: 3.5em"
							>
								*地址
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
								rules="address|required"
								autocomplete="street-address"
							></v-field>
							<error-message
								name="地址"
								class="invalid-feedback"
							></error-message>
						</div>
					</div>
					<!-- 實體地址 END-->
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
								<a class="" @click.prevent="">隱私權政策</a>
							</span>
						</div>
					</div>
					<!-- 隱私權政策 checkbox END-->

					<div class="mb-2 d-flex col-sm-12 d-flex justify-content-center">
						<button class="btn btn-primary mt-2 w-50">註冊</button>
					</div>
				</div>
				{{ data }}
			</v-form>
		</div>
	</div>
</template>

<script>
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { isPhone, isAddress, isPolicy } from '@/setup/vee-validate';
import { useUserStore } from '@/stores/index';
import { useRouter } from 'vue-router';
import Loading from 'vue-loading-overlay';

export default {
	components: {
		VForm,
		VField,
		ErrorMessage,
		Loading,
	},
	data() {
		return {
			data: {
				name: '',
				gender: '請選擇',
				birthday: '',
				mail: '',
				brand: '',
				password: '',
				confirmPassword: '',
				address: '',
				phone: '',
			},
			policy: 'on',
			eye: false,
		};
	},
	created() {
		this.userStore = useUserStore();
		this.router = useRouter();
	},
	methods: {
		sigup() {
			console.log('User觸發成功');
			this.userStore.addUserAuth(this.router, this.data);
		},
		goback() {
			this.$router.go(-1);
		},
		see() {
			this.eye = !this.eye;
			this.$refs.pas.type = this.eye ? 'text' : 'password';
		},
		getToday() {
			return new Date().toISOString().split('T')[0];
		},
	},
};
</script>
