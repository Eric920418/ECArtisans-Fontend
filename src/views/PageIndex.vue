<template>
	<div>
		<Banner :data="bannerList" />
		<div class="bg-fun">
			<div class="container">
				<Fun :data="funData" />
			</div>
			<Hot :data="shopData" />
		</div>
		<Shop :data="shopData" />
		<div class="bg-focus">
			<New :data="shopData" />
			<Focus v-if="followList.length > 0" :data="followList" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import Focus from '@/components/IndexFocus.vue';
import Fun from '@/components/IndexFun.vue';
import Shop from '@/components/IndexShop.vue';
import Banner from '@/components/Banner.vue';
import Hot from '@/components/IndexHot.vue';
import New from '@/components/IndexNew.vue';
import { gsap } from 'gsap';
// const { proxy } = getCurrentInstance();
const block = ref();
const box = ref();
const shopData = ref([]);

import { useShop } from '@/stores/index';
const shopStore = useShop();

const bannerList = computed(() => shopStore.bannerData);
const followList = computed(() => shopStore.followShopData);

const funData = ref([
	{
		cols: 6,
		cols_sm: 6,
		cols_md: 3,
		cols_lg: 2,
		name: '服飾',
		url: 'images/index/01-clothing.png',
	},
	{
		cols: 6,
		cols_sm: 6,
		cols_md: 3,
		cols_lg: 2,
		name: '運動',
		url: 'images/index/02-sports.png',
	},
	{
		cols: 12,
		cols_sm: 12,
		cols_md: 6,
		cols_lg: 3,
		data: [
			{
				cols: 4,
				cols_sm: 4,
				cols_md: 4,
				cols_lg: 4,
				name: '食品',
				url: 'images/index/03-food.png',
			},
			{
				cols: 4,
				cols_sm: 4,
				cols_md: 4,
				cols_lg: 4,
				name: '生活用品',
				url: 'images/index/04-DailyNecessities.png',
			},
			{
				cols: 4,
				cols_sm: 4,
				cols_md: 4,
				cols_lg: 4,
				name: '娛樂',
				url: 'images/index/05-entertainment.png',
			},
			{
				cols: 12,
				cols_sm: 12,
				cols_md: 12,
				cols_lg: 12,
				name: '家具',
				url: 'images/index/06-furniture.png',
			},
		],
	},
	{
		cols: 4,
		cols_sm: 4,
		cols_md: 4,
		cols_lg: 2,
		name: '3C產品',
		url: 'images/index/07-3C.png',
	},
	{
		cols: 4,
		cols_sm: 4,
		cols_md: 4,
		cols_lg: 2,
		name: '寵物',
		url: 'images/index/08-pet.png',
	},
	{
		cols: 4,
		cols_sm: 4,
		cols_md: 4,
		cols_lg: 1,
		name: '清潔用品',
		url: 'images/index/09-clean.png',
	},
]);

const loading = ref(true);
onMounted(async () => {
	await shopStore.getActivityBanner();
	loading.value = false; // 當資料獲取完成後將 loading 設為 false
	await shopStore.getFollowShops();
});
onMounted(() => {
	gsap.to(box.value, { rotation: '+=360' });
	gsap.to(block.value, { x: 300, repeat: -1, duration: 3 });
});
</script>

<style scoped>
.box {
	width: 100px;
	height: 100px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: #28a92b;
	font-weight: 600;
	color: #fff;
	margin: 0 auto;
}
.block {
	width: 100px;
	height: 100px;
	background-color: #000;
	border-radius: 10px;
}
.bg-fun {
	background-image: url('/images/bg/bg-fun.svg');
	background-repeat: no-repeat;
	background-position: -6vw 35vh;
	background-size: 120vw;
}
.bg-focus {
	background-image: url('/images/bg/bg-focus.svg');
	background-repeat: no-repeat;
	background-position: -30% 60vh;
	background-size: 110%;
}
</style>
