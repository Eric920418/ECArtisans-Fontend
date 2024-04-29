<template>
	<div class="login">
		<input
			class="d-flex mx-auto form-control mb-2"
			type="text"
			placeholder="名稱"
			v-model="bossName"
		/>
		<select
			class="form-select"
			aria-label="Default select example"
			v-model="gender"
		>
			<option value="男">男</option>
			<option value="女">女</option>
		</select>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="text"
			placeholder="手機"
			v-model="phone"
		/>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="text"
			placeholder="郵件"
			v-model="mail"
		/>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="text"
			placeholder="賣場名稱"
			v-model="brand"
		/>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="text"
			placeholder="頭貼"
			v-model="avatar"
		/>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="password"
			placeholder="密碼"
			v-model="password"
		/>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="password"
			placeholder="確認密碼"
			v-model="confirmPassword"
		/>
		<input
			class="d-flex mx-auto form-control mt-2"
			type="text"
			placeholder="地址"
			v-model="address"
		/>

		<button class="btn btn-primary mt-2" @click="sigup">註冊</button>
		<button class="btn btn-primary mt-2 ms-2" @click="goback">返回</button>
	</div>
</template>

<script>
import useUserStore from '../../stores/authStore';
import { ref } from 'vue';

export default {
	emits: ['goback'],
	setup(_, { emit }) {
		const userStore = useUserStore();

		const bossName = ref('');
		const gender = ref('請選擇');
		const phone = ref('');
		const mail = ref('');
		const brand = ref('');
		const avatar = ref('');
		const password = ref('');
		const confirmPassword = ref('');
		const address = ref('');

		const sigup = () => {
			userStore.signup({
				bossName: bossName.value,
				gender: gender.value,
				phone: phone.value,
				mail: mail.value,
				brand: brand.value,
				avatar: avatar.value,
				password: password.value,
				confirmPassword: confirmPassword.value,
				address: address.value,
			});
		};

		const goback = () => {
			console.log('傳遞子組件');
			emit('goback');
		};

		return {
			bossName,
			gender,
			phone,
			mail,
			brand,
			avatar,
			password,
			confirmPassword,
			address,
			sigup,
			goback,
		};
	},
};
</script>
