<template>
	<div class="w-100 m-index-title">
		<Title :data="titleData" />
		<div class="m-0 p-0">
			<div class="container px-eca-12 px-sm-0">
				<!-- 顯示 loading  -->
				<div v-if="loading" class="text-center my-5">
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
				<!-- 当设置row>1时目前还不兼容loop模式（loop: true） -->
				<!-- 在Slide数量不足以填满的情况下可能会出现布局不理想（例如4行3列，但是只有10个Slide），建议使用空的Slide将数量补足。 -->
				<!-- slidesPerView:一次顯示 4 欄位 row: 2列  slidesPerGroup: 一次滑動 4 欄位-->
				<!-- :pagination 改 type: 'bullets' 才可以用按鈕 -->
				<!-- spaceBetween: SwiperSlide裡面的每個項目 間距 要多少 -->
				<swiper
					v-else
					:slidesPerView="
						resize <= 576 ? 2 : resize <= 768 ? 2 : resize <= 1200 ? 2 : 4
					"
					:slidesPerGroup="
						resize <= 576 ? 2 : resize <= 768 ? 2 : resize <= 1200 ? 2 : 4
					"
					:freeMode="false"
					:loop="true"
					:grid="{
						fill: 'row',
						rows: resize <= 768 ? 2 : 1,
					}"
					:pagination="{
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
					}"
					:navigation="{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}"
					:modules="modules"
					:spaceBetween="resize <= 768 ? 12 : 16"
				>
					<SwiperSlide v-for="(item, index) in ProductList" :key="index">
						<Card class="shadow-sm" :item="item" />
					</SwiperSlide>
					<div
						class="swiper-pagination d-flex-column d-sm-none swiper-page-bottom"
					/>
					<div
						class="swiper-button-prev d-none"
						@click.stop="prevEl()"
						ref="btnPrevRef"
					></div>
					<div
						class="swiper-button-next d-none"
						@click.stop="nextEl()"
						ref="btnNextRef"
					></div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Title from '@/components/IndexTitle.vue';
import Card from '@/components/ProductCardHome.vue';
import { onMounted, computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
// 新增 Grid
import { Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// 新增 Grid.css
import 'swiper/css/grid';
// import 'swiper/css/navigation';

import { useShop, useResize } from '@/stores/index';
const { resize } = useResize();
const shopStore = useShop();

// 請強制設訂為 12 的倍數 ...例如：12、24、48...
// 因為顯示為 4 、 3  避免有缺。
// 除非 每次顯示 改為 4 跟 8 的倍數。
const ProductList = computed(() => shopStore.sellerProductsData);

const modules = [Grid, Pagination, Navigation, Scrollbar];
const prevEl = () => {};
const nextEl = () => {};

const btnPrevRef = ref<HTMLDivElement | null>(null);
const btnNextRef = ref<HTMLDivElement | null>(null);
const getPrev = () => {
	btnPrevRef.value?.click();
};
const getNext = () => {
	btnNextRef.value?.click();
};

// 傳遞方法，一定要在最後面
const titleData = {
	title: '新品上市',
	titleEn: 'new',
	openBtn: {
		prev: getPrev,
		next: getNext,
	},
};

// 增加 loading 狀態
const loading = ref(true);

onMounted(async () => {
	// await shopStore.getNewProducts(); //修改完api後要改這邊
	await shopStore.getPopularProducts(); //修改完api後要改這邊

	loading.value = false; // 當資料獲取完成後將 loading 設為 false
});
</script>
<style lang="scss" scoped></style>
