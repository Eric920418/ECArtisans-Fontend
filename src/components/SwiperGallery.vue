<template>
	<div class="swiper-box position-relative d-sm-flex">
		<swiper
			direction="horizontal"
			:spaceBetween="0"
			:navigation="{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}"
			:a11y="{
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide',
			}"
			:keyboard="{
				enabled: true,
			}"
			:thumbs="{ swiper: thumbsSwiper }"
			:modules="modules"
			class="swiper-container gallery-top p-0 m-0 order-2"
		>
			<swiper-slide v-for="(swiperImg, swiperIndex) in data" :key="swiperIndex">
				<img :src="swiperImg" class="img-eca" />
			</swiper-slide>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
		</swiper>
		<swiper
			@swiper="setThumbsSwiper"
			:centeredSlides="true"
			:centeredSlidesBounds="true"
			direction="horizontal"
			:spaceBetween="24"
			:slidesPerView="3"
			:freeMode="false"
			:watchSlidesVisibility="true"
			:watchSlidesProgress="true"
			:watchOverflow="true"
			:modules="modules"
			:breakpoints="{
				576: {
					direction: 'vertical',
					slidesPerView: 4,
				},
			}"
			class="swiper-container gallery-thumbs p-0 m-0 order-1"
		>
			<swiper-slide
				v-for="(dataItmeaaa, dataIndexaaa) in data"
				:key="dataIndexaaa"
				class="m-0 pb-3 pe-3 pt-3 pt-md-0"
			>
				<img :src="dataItmeaaa" class="img-eca" />
			</swiper-slide>
		</swiper>
	</div>
</template>
<script lang="ts" setup>
import { useResize } from '@/stores/index';
import { Navigation, Scrollbar, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref, computed } from 'vue';
import { type shopProductsType } from '@/type/orderType';

const { resize } = useResize();
const modules = [FreeMode, Thumbs, Navigation, Scrollbar];
const prevEl = () => {};
const nextEl = () => {};
const thumbsSwiper = ref(null);

const nowData = computed(() => props.data) as any;
// 定義從父組件接收的props
const props = defineProps<{
	data: Array<string>;
}>();
const setThumbsSwiper = (swiper: any) => {
	thumbsSwiper.value = swiper;
};
</script>
<style lang="scss" scoped>
.swiper-box {
	width: 100%;
	height: fit-content;
	@media (min-width: 576px) {
		height: 526px;
	}
	.swiper-container {
		overflow: hidden;
		width: 100%;
		margin-left: 0px;
		margin-right: 0px;
		&-wrapper {
			display: flex;
			flex-flow: column nowrap;
			@media (min-width: 576px) {
				flex-flow: row nowrap;
			}
			// height: 100vh;
			width: 100vw;
		}
	}

	.swiper-button {
		&-next,
		&-prev {
			color: #000;
		}
	}

	.swiper-slide {
		text-align: center;
		background-size: cover;
		background-position: center;
		height: 100%;
		/* Center slide text vertically */
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}
	// 選單
	.gallery-top {
		// position: relative;
		position: relative;
		width: 100%;
		// height: 75vh;
		// height: 75vh;
		@media (min-width: 576px) {
			width: 100%;
			// height: 100vh;
			margin-right: 0px;
		}
	}

	// 選單
	.gallery-thumbs {
		width: 100%;
		// height: 25vh;
		padding-top: 10px;
		@media (min-width: 576px) {
			width: 112px;
			// height: 100vh;
			padding: 0;
		}
		.swiper-wrapper {
			flex-direction: row;
			@media (min-width: 576px) {
				flex-direction: column;
			}
		}
		.swiper-slide {
			width: 25%;
			height: 100%;
			flex-flow: row nowrap;
			@media (min-width: 576px) {
				flex-flow: column nowrap;
				width: 100%;
				height: 90px !important;
			}
			opacity: 0.75;
			cursor: pointer;
		}
		.swiper-slide-thumb-active {
			opacity: 1;
		}
	}
}
#thumbs img {
	opacity: 0.4;
}
.my-slide-thumb-active img {
	opacity: 1 !important;
}
</style>
