<template>
	<div class="container" v-if="init">
		<!-- :on-cancel="()=>{}" 取消後做某事 -->
		<Loading
			v-model:active="isLoading"
			:can-cancel="true"
			:is-full-page="true"
		/>
		<div class="row g-3 py-4 justify-content-center">
			<div
				class="col-12 col-md-6 col-lg-6 col-xl-6 d-flex ps-5 pe-4 px-md-4 my-4 mt-md-6 justify-content-center align-items-center order-last order-sm-first"
			>
				<div
					class="card w-100 h-100 bg-login"
					:style="{
						'background-image': 'url(./images/imgLogin.svg)',
					}"
				>
					<div class="position-relativ" style="height: 60vh">
						<div
							class="position-absolute"
							:style="{
								transform:
									resize < 576
										? 'translate(0%, -15%)'
										: resize < 992
											? 'translate(-10%, 20%)'
											: 'translate(-50%, 30%)',
							}"
						>
							<h2 class="z-3 fw-bold display-3">
								<img
									src="/images/ECArtisans.svg"
									alt="ECArtisans"
									title="ECArtisans"
								/>
							</h2>
							<h3 class="z-3 fw-bold">{{ init.subtitle }}</h3>
						</div>
					</div>
				</div>
			</div>
			<div
				class="col-12 col-md-5 col-lg-4 col-xl-4 d-flex align-items-center px-4 px-md-2 px-lg-4 px-xl-5 text-center"
			>
				<div>
					<div class="fs-3 fw-bold mb-4">
						{{ init.loginTitle }}
					</div>
					<form @submit="login" class="row m-0 p-0">
						<div class="col-md-12 p-0 m-0 position-relative mb-3">
							<font-awesome-icon
								:icon="['fas', 'envelope']"
								class="text-primary position-absolute fs-5 z-3"
								style="top: 0px; left: 0px; transform: translate(12px, 9px)"
							/>
							<input
								class="d-flex form-control position-relative"
								type="text"
								placeholder="郵件"
								autocomplete="email"
								v-model="data.mail"
								style="padding-left: 2.5em"
							/>
						</div>
						<div class="col-12 p-0 mb-1 position-relative">
							<font-awesome-icon
								:icon="['fas', 'lock']"
								class="text-primary position-absolute fs-5 z-3"
								style="top: 0px; left: 0px; transform: translate(12px, 9px)"
							/>
							<input
								class="d-flex form-control position-relative"
								:type="eye ? 'text' : 'password'"
								placeholder="密碼"
								v-model="data.password"
								autocomplete="password"
								ref="pas"
								style="padding-left: 2.5em"
							/>
							<font-awesome-icon
								:icon="['fas', eye ? 'eye' : 'eye-slash']"
								class="position-absolute z-3 fs-5"
								:class="{
									'neutral-03': !eye,
									'neutral-02': eye,
								}"
								style="top: 0px; right: 0px; transform: translate(-12px, 9px)"
								@click="eye = !eye"
							/>
						</div>
						<div
							class="col-12 p-0 m-0 mb-3 text-end"
							style="font-size: 12px; height: fit-content !important"
						>
							<a class="m-0 p-0" style="font-size: 12px">忘記密碼</a>
						</div>
						<div class="col-12 p-0 m-0">
							<button class="btn btn-primary mb-3 w-100" type="submit">
								登入
							</button>
						</div>
						<div class="p-0 text-center">
							<p>
								還不是會員?
								<router-link :to="{ name: init.routerLink }" class="mx-2">
									註冊
								</router-link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { useAuthStore, useResize } from '@/stores/index';
const { resize } = useResize();
const route = useRoute();

// 頁面用到的資料
const authStore = useAuthStore();

// 同步資料
const storeLoading = computed(() => authStore.isLoading);
const isLoading = ref(authStore.isLoading);
watch(isLoading, newVal => {
	authStore.isLoading = newVal;
});
watch(storeLoading, newVal => {
	isLoading.value = newVal;
});

const eye = ref(false);

const userTitleData = {
	img: 'imgSrc',
	title: 'ECArtisans',
	subtitle: '探索無限的購物樂趣',
	loginTitle: '會員登入',
	routerLink: 'UserSignUp',
};

const sellerTitleData = {
	img: 'imgSrc',
	title: 'ECArtisans',
	subtitle: '實現銷售，即刻開始',
	loginTitle: '商家登入',
	routerLink: 'SellerSignUp',
};

const init = ref({}) as any;

// 登入
interface dataType {
	mail: string;
	password: string;
}

const data = ref<dataType>({
	mail: '',
	password: '',
});

function login() {
	authStore.login(data.value);
}

const getData = () => {
	const route = useRoute();
	// 根據當前路由加載資料
	if (route && route.name === 'SellerLogin') {
		init.value = sellerTitleData;
	} else if (route && route.name === 'UserLogin') {
		init.value = userTitleData;
	}
};
onMounted(() => {
	getData();
});
</script>

<style scoped>
.bg-login {
	background-repeat: no-repeat;
	/* background-attachment: fixed; */
	background-position: center;
	background-size: contain;
	background-color: inherit;
}
</style>
