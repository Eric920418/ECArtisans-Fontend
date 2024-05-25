<template>
	<div class="w-100 overflow-x-hidden">
		<div class="container p-0 swiperBox">
			<swiper
				:autoplay="{ delay: 3000, disableOnInteraction: false }"
				:initialSlide="1"
				slidesPerView="auto"
				:watchSlidesProgress="true"
				:grabCursor="true"
				:loop="true"
				:loopAdditionalSlides="2"
				:navigation="{
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				}"
				:pagination="{
					el: '.swiper-pagination',
					dynamicBullets: false,
					clickable: true,
				}"
				:modules="modules"
				:centeredSlides="true"
				:freeMode="false"
				:mousewheel="false"
				:keyboard="{ enabled: true }"
				ref="swiper"
				class="h-100"
			>
				<SwiperSlide
					class="banner h-100"
					v-for="(item, index) in bannerList"
					:key="index"
					:virtualIndex="index"
				>
					<!-- <div class="banner"> -->
					<img class="swiper-slide" :src="item.src" alt="Swiper" />
					<!-- </div> -->
				</SwiperSlide>
				<div class="swiper-pagination" />
				<div class="swiper-button-prev btn-swiper" @click.stop="prevEl()">
					<font-awesome-icon :icon="['fas', 'angle-left']" />
				</div>
				<div class="swiper-button-next btn-swiper" @click.stop="nextEl">
					<font-awesome-icon :icon="['fas', 'angle-right']" />
				</div>
			</swiper>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const bannerList = ref([
	{ src: 'https://source.unsplash.com/1296x650/?animal' },
	{ src: 'https://source.unsplash.com/200x300/?nature' },
	{ src: 'https://source.unsplash.com/796x500/?people' },
	{ src: 'https://source.unsplash.com/1296x650/?flower' },
	{ src: 'https://source.unsplash.com/609x600/?travel' },
	{ src: 'https://source.unsplash.com/1296x650/?fruits' },
]);
const navigation = ref({
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
});
const modules = [Autoplay, Pagination, Navigation, Scrollbar];

const prevEl = () => {
	// console.log('上一张');
};
const nextEl = () => {
	// console.log('下一张');
};
// 更改当前活动swiper
const onSlideChange = (swiper: { activeIndex: any }) => {
	// swiper是当前轮播的对象，里面可以获取到当前swiper的所有信息，当前索引是activeIndex
	console.log(swiper.activeIndex);
};
</script>
<style lang="scss" scoped>
.swiper-button-next::after,
.swiper-button-prev::after {
	content: '';
}
.swiper-button-prev {
	display: none;
	top: 30vh;
	left: 0px;
	translate: (-50%, -50%);
	@media (min-width: 650px) {
		position: absolute;
		display: flex;
		left: -3%;
	}
}
.swiper-button-next {
	display: none;
	top: 30vh;
	right: 0px;
	translate: (-50%, -50%);
	@media (min-width: 650px) {
		position: absolute;
		display: flex;
		right: -5%;
	}
	@media (min-width: 768px) {
		right: -2%;
	}
}
.btn-swiper {
	background-color: white;
	border-radius: 99em;
	width: 64px;
	height: 64px;
	svg {
		width: 32px;
		height: 32px;
	}
}
.swiper-backface-hidden {
	overflow: initial !important;
}
.banner,
.swiperBox {
	width: 100%;
	height: 60vh;
}
.swiper-slide {
	object-fit: cover;
}
// 分頁設定
.swiper {
	--swiper-pagination-color: #fde48e;
	--swiper-pagination-bullet-inactive-color: #ffffff;
	--swiper-pagination-bullet-inactive-opacity: 1;
	--swiper-pagination-bullet-size: 12px;
	--swiper-pagination-bullet-horizontal-gap: 8px;
}
</style>
