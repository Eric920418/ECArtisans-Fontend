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
				<a class="mt-2 mx-1" @click.prevent="change">註冊</a>
				<a class="mt-2 ms-5" @click.prevent="change">忘記密碼</a>
			</div>
		</div>
	</div>
</template>

<script>
import OneColumnLayout from '../../layouts/OneColumnLayout.vue';
export default {
	data() {
		return {
			mail: '',
			password: '',
		};
	},

	methods: {
		login() {
			this.$axios
				.post('/auth/shop-login', { mail: this.mail, password: this.password })
				.then(res => {
					console.log(res);
				});
			this.mail = '';
			this.password = '';
		},
		change() {
			this.$emit('sigin');
		},
	},
};
</script>

<style scoped>
.login {
	width: 500px;
}
</style>
