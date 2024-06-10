<template>
	<div class="w-100 m-index-title mb-7">
		<Title :data="titleData" />
		<div class="m-0 p-0">
			<div class="container px-eca-12 px-sm-0">
				<swiper
					:slidesPerView="resize && resize >= 992 ? 3 : 1"
					:watchSlidesProgress="true"
					:centeredSlides="false"
					:grabCursor="true"
					:loopAdditionalSlides="2"
					:loop="true"
					:navigation="{
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}"
					:pagination="{
						el: '.swiper-pagination',
						type: 'bullets',
						clickable: true,
					}"
					:modules="modules"
					:freeMode="false"
					:mousewheel="false"
					:keyboard="{ enabled: true }"
					:spaceBetween="24"
				>
					<!-- class="indexShopSwiper" -->
					<SwiperSlide
						v-for="(item, index) in focusShopList"
						:key="index"
						:virtualIndex="index"
						class="indexShopSwiperSlide"
					>
						<!-- focusShopList shopName shopAvatar product -->
						<div class="card p-0">
							<div
								class="card-top d-flex justify-content-center align-items-center p-3 border-bottom"
							>
								<div
									class="avatar"
									:style="{
										'background-image': `url(${item.seller_image})`,
									}"
								></div>
								<p class="m-0 flex-grow-1">{{ item.seller_name }}</p>
								<font-awesome-icon class="btn" :icon="['fas', 'angle-right']" />
							</div>
							<div class="row m-0 p-2">
								<div
									class="col m-2 p-0 rounded-3 overflow-x-hidden productCard"
									v-for="(productItem, productIndex) in item.product"
									:key="productIndex"
								>
									<img :src="productItem.src" class="img-eca" />
								</div>
							</div>
						</div>
						<div class="row m-0 p-0 justify-content-center"></div>
					</SwiperSlide>
					<div
						class="swiper-pagination d-flex-column d-sm-none swiper-page-bottom"
					/>
					<div
						class="swiper-button-prev btn-eca-s btn-eca-s-prev d-none"
						ref="btnPrevRef"
						@click.stop="prevEl()"
					>
						<font-awesome-icon :icon="['fas', 'angle-left']" />
					</div>
					<div
						class="swiper-button-next btn-eca-s btn-eca-s-next d-none"
						ref="btnNextRef"
						@click.stop="nextEl()"
					>
						<font-awesome-icon :icon="['fas', 'angle-right']" />
					</div>
				</swiper>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Title from './IndexTitle.vue';
import { useResize } from './../setup/useResize';
const { resize } = useResize();

const focusShopList = ref([
	{
		seller_id: 1,
		seller_name: '古早味蜜餞',
		seller_image: 'images/shop/1-banner.png',
		product: [
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
		],
		star: 0,
		total_comments: 0,
	},
	{
		seller_id: 2,
		seller_name: '魔法能量商店',
		seller_image: 'images/shop/2-banner.png',
		product: [
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
		],
		star: 1,
		total_comments: 25,
	},
	{
		seller_id: 3,
		seller_name: '333',
		seller_image: 'images/shop/3-banner.png',
		product: [
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
		],
		star: 4.3,
		total_comments: 10,
	},
	{
		seller_id: 4,
		seller_name: 'lex jewelry',
		seller_image: 'images/shop/2-2-product.png',
		product: [
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
		],
		star: 4.3,
		total_comments: 2,
	},
	{
		seller_id: 5,
		seller_name: '444',
		seller_image: 'images/shop/2-2-product.png',
		product: [
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
		],
		star: 2.5,
		total_comments: 30,
	},
	{
		seller_id: 6,
		seller_name: '555',
		seller_image: 'images/shop/2-2-product.png',
		product: [
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
			{
				src: 'images/shop/2-2-product.png',
			},
		],
		star: 4.3,
		total_comments: 50,
	},
]);
const navigation = ref({
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
});
const modules = [Autoplay, Pagination, Navigation, Scrollbar];
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
	title: '關注商家',
	titleEn: 'Focus',
	openBtn: {
		prev: getPrev,
		next: getNext,
	},
};
</script>

<style lang="scss" scoped>
.card-bottom {
	margin: 10px;
}
.productCard {
	height: 81px;
}
</style>
