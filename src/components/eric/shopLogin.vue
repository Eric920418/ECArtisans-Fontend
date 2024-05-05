<template>
	<div class="login">
		<div class="position-relative">
			<i
				class="bi bi-envelope-fill position-absolute z-3 fs-5"
				style="top: 5px; right: 467px"
			></i>
			<input
				class="d-flex form-control mb-2 position-relative ps-5 w-50"
				type="text"
				placeholder="郵件"
				v-model="mail"
			/>
		</div>
		<div class="position-relative">
			<i
				class="bi bi-lock-fill position-absolute z-3 fs-5"
				style="top: 5px; right: 467px"
			></i>
			<input
				class="d-flex form-control mt-2 position-relative ps-5 w-50"
				type="password"
				placeholder="密碼"
				v-model="password"
				ref="pas"
			/>
			<i
				v-if="eye == false"
				class="bi bi-eye-fill position-absolute z-3 fs-5"
				style="top: 5px; right: 260px"
				@click="see"
			></i>
			<i
				v-else-if="eye == true"
				class="bi bi-eye-slash-fill position-absolute z-3 fs-5"
				style="top: 5px; right: 260px"
				@click="see"
			></i>
		</div>
		<div>
			<button class="btn btn-primary mt-2 w-50" @click="login">登入</button>
		</div>
		<div>
			<div class="d-flex mt-2">
				<p class="mt-2">還不是會員?</p>
				<router-link :to="{ name: 'SellerSigup' }" class="mt-2 mx-1">
					註冊
				</router-link>
				<a class="mt-2 ms-5" @click.prevent="change">忘記密碼</a>
			</div>
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/index';
import { useRouter } from 'vue-router'; // 引入Vue Router

export default {
	data() {
		return {
			mail: '',
			password: '',
			eye: false,
			token: '',
		};
	},
	created() {
		this.authStore = useAuthStore();
		this.router = useRouter();
	},

	methods: {
		login() {
			this.authStore.login({ mail: this.mail, password: this.password });

			this.$axios
				.post('/auth/shop-login', { mail: this.mail, password: this.password })
				.then(res => {
					this.token = res.data.user.token;
					localStorage.setItem('token', this.token);
				});
			this.mail = '';
			this.password = '';
			var storedToken = localStorage.getItem('token');
			if (storedToken) {
				const jwtParts = storedToken.split('.');
				const payload = JSON.parse(atob(jwtParts[1]));
				this.$cookies.set('id', payload.id);
			} else {
				console.log('No token stored in localStorage.');
			}
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

<style scoped>
.login {
	width: 500px;
}
</style>
