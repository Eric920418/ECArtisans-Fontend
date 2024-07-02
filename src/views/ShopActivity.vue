<template>
	<div class="container" v-if="data">
		<div
			class="banner bg-img-eca"
			:style="{
				'background-image': `url(${data.activity_image})`,
			}"
		></div>
		<!-- <div v-if="data.activity_image" class="banner">
			<img :src="data.activity_image.toString()" class="img-eca" />
		</div> -->
		<div class="card p-5 pb-8 rounded-0">
			<h2 class="text-primary fw-medium border-bottom border-primary pb-2 mb-4">
				{{ data.activity_name }}
			</h2>
			<p v-if="data.start_date || data.end_date" class="fs-14">
				活動日期：&ensp;{{ $getDate(data.start_date.toString()) }}
				<span v-if="data.end_date">&ensp;-&ensp;</span>
				{{ $getDate(data.end_date.toString()) }}
			</p>
			<P class="" v-if="data.activity_info">{{ data.activity_info }}</P>
			<div class="d-flex">
				<button
					type="button"
					class="btn btn-primary px-5 m-0"
					@click="getCoupon"
				>
					點我領取折價劵
				</button>
			</div>

			<div class="text-center my-5">
				<button
					type="button"
					class="btn btn-outline-primary px-5 mx-1 mx-sm-2 me-md-4"
					@click="$go({ name: 'Index' })"
				>
					返回首頁
				</button>
				<router-link
					v-if="data.seller_id"
					type="button"
					class="btn btn-primary px-5 m-0 mx-1 mx-sm-2"
					:to="{ name: 'ShopHome', params: { id: `${data.seller_id}` } }"
				>
					前往賣場
				</router-link>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, defineComponent, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { alertStore } from '@/main'; // 導入實例
import { useActivity, useAuthStore, go } from '@/stores/index';
import { type activityType } from '../type/activityType';

const store = useActivity();
const authStore = useAuthStore();

const data = computed(() => store.shopData);
let routeGo = ref<boolean>(true);
const isUser = computed(() => {
	return authStore.accountType === 'user';
});
const isSeller = computed(() => {
	return authStore.accountType === 'seller';
});
const isLoggedIn = computed(() => {
	return authStore.isLoggedIn;
});
function getCoupon() {
	if (isLoggedIn.value && isUser.value) {
		let coupon_id = store.shopData.coupon_id as string;
		store.addCoupon(authStore.id, coupon_id);
	} else {
		alertStore.error('請先登入會員');
		go({ name: 'UserLogin' });
	}
}

onMounted(async () => {
	const paramsId = route.params.id as string;
	if (route.params.id) store.getShopActivity(paramsId);
	// 想判斷由哪一頁過來，決定是否要返回上一頁 或 返回首頁
	// watch(
	// 	() => route.path,
	// 	async (to, from) => {
	// 		console.log('to', to);
	// 		console.log('from', from);
	// 		if (from === undefined) {
	// 			routeGo.value = false;
	// 		}
	// 	},
	// 	{ immediate: true, deep: true }
	// );
});
</script>

<style lang="scss">
.banner {
	height: 52.609vh;
	@media (min-width: 768px) {
		height: 60vh;
	}
}
</style>
