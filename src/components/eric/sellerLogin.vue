<template>
	<div class="row m-0 p-0">
		<loading
			v-model:active="this.authStore.isLoading"
			:can-cancel="true"
			:color="color"
			:on-cancel="onCancel"
			:is-full-page="fullPage"
		/>
		<div class="col-md-12 p-0 m-0 position-relative mb-3">
			<i
				class="bi bi-envelope-fill position-absolute z-3 fs-5"
				style="transform: translate(12px, 4px)"
			></i>
			<input
				class="d-flex form-control position-relative ps-5"
				type="text"
				placeholder="郵件"
				v-model="mail"
			/>
		</div>
		<div class="col-12 p-0 m-0 position-relative mb-3">
			<i
				class="bi bi-lock-fill position-absolute z-3 fs-5"
				style="transform: translate(12px, 4px)"
			></i>
			<input
				class="d-flex form-control position-relative ps-5"
				type="password"
				placeholder="密碼"
				v-model="password"
				ref="pas"
			/>
			<i
				v-if="eye == false"
				class="bi bi-eye-fill position-absolute z-3 fs-5"
				style="top: 0px; right: 0px; transform: translate(-12px, 4px)"
				@click="see"
			></i>
			<i
				v-else-if="eye == true"
				class="bi bi-eye-slash-fill position-absolute z-3 fs-5"
				style="top: 5px; right: 260px"
				@click="see"
			></i>
		</div>
		<div class="col-12 p-0 m-0">
			<button class="btn btn-primary mt-2 w-100" @click="login">登入</button>
		</div>
		<div class="mt-2 p-0 d-flex justify-content-between">
			<div class="mt-2 p-0 d-flex">
				<p>還不是會員?</p>
				<router-link :to="{ name: 'SellerSigup' }" class="mx-2">
					註冊
				</router-link>
			</div>
			<a class="mt-2 ms-5" @click.prevent="change">忘記密碼</a>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/index';
import { useRouter } from 'vue-router'; // 引入Vue Router
import Loading from 'vue-loading-overlay';

export default {
	data() {
		return {
			mail: '',
			password: '',
			eye: false,
			token: '',
		};
	},
	components: {
		Loading,
	},
	created() {
		this.authStore = useAuthStore();
		this.router = useRouter();
	},
	methods: {
		login() {
			this.authStore.login({ mail: this.mail, password: this.password });

			// this.$axios
			// 	.post('/auth/shop-login', { mail: this.mail, password: this.password })
			// 	.then(res => {
			// 		this.token = res.data.user.token;
			// 		localStorage.setItem('token', this.token);
			// 		this.isLoading = false
			// 	});
			// this.mail = '';
			// this.password = '';
			// var storedToken = localStorage.getItem('token');
			// if (storedToken) {
			// 	const jwtParts = storedToken.split('.');
			// 	const payload = JSON.parse(atob(jwtParts[1]));
			// 	this.$cookies.set('id', payload.id);
			// } else {
			// 	console.log('No token stored in localStorage.');
			// }
		},
		change() {
			this.$emit('sigin');
		},
		see() {
			this.eye = !this.eye;
			this.$refs.pas.type = this.eye ? 'text' : 'password';
		},
	},
};
</script>
