<template>
	<div class="m-0 p-0 overflow-x-hidden">
		<div class="container position-relative">
			<swiper
				:autoplay="{ delay: 5000, disableOnInteraction: false }"
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
				class=""
			>
				<SwiperSlide
					class=""
					v-for="(item, index) in bannerList"
					:key="index"
					:virtualIndex="index"
				>
					<div
						class="overflow-x-hidden banner"
						:style="{
							'background-image': `url(${item.src})`,
							'background-repeat': 'no-repeat',
							'background-attachment': 'fixed',
							'background-position': 'center',
							'background-size': 'cover',
							'background-color': 'rgba(0, 0, 0, .3)',
							'background-blend-mode': 'multiply',
						}"
					></div>
				</SwiperSlide>
				<div
					class="swiper-pagination position-absolute bottom-0 start-50 translate-middle-x pb-3"
				/>
				<div
					class="swiper-button-prev btn-eca-l d-none d-sm-flex position-absolute top-50 start-0 translate-middle"
					@click.stop="prevEl()"
				>
					<font-awesome-icon :icon="['fas', 'angle-left']" />
				</div>
				<div
					class="swiper-button-next btn-eca-l d-none d-sm-flex position-absolute top-50 start-100 translate-middle"
					@click.stop="nextEl"
				>
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
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

const bannerList = ref([
	{ src: 'https://picsum.photos/id/117/1296/650' },
	{ src: 'https://picsum.photos/id/49/200/300' },
	{ src: 'https://picsum.photos/id/18/796/500' },
	{ src: 'https://picsum.photos/id/20/1296/650' },
	{ src: 'https://picsum.photos/id/10/609/600' },
	{ src: 'https://picsum.photos/id/11/1296/650' },
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
// const onSlideChange = (swiper: { activeIndex: any }) => {
// 	console.log(swiper.activeIndex);
// };
</script>
<style lang="scss" scoped>
.banner {
	height: 52.609vh;
	// @media (min-width: 650px) {
	// 	height: 56vh;
	// }
	@media (min-width: 768px) {
		height: 60vh;
	}
}
// .swiper-button-next::after,
// .swiper-button-prev::after {
// 	content: '';
// }
// .swiper-button-prev {
// 	display: none;
// 	top: 30vh;
// 	left: 0px;
// 	translate: (-50%, -50%);
// 	@media (min-width: 650px) {
// 		position: absolute;
// 		display: flex;
// 		left: -5%;
// 	}
// 	@media (min-width: 768px) {
// 		left: -2%;
// 	}
// }
// .swiper-button-next {
// 	display: none;
// 	top: 30vh;
// 	right: 0px;
// 	translate: (-50%, -50%);
// 	@media (min-width: 650px) {
// 		position: absolute;
// 		display: flex;
// 		right: -5%;
// 	}
// 	@media (min-width: 768px) {
// 		right: -2%;
// 	}
// }
// .btn-swiper {
// 	background-color: white;
// 	border-radius: 99em;
// 	width: 64px;
// 	height: 64px;
// 	svg {
// 		width: 32px;
// 		height: 32px;
// 	}
// }
.swiper-backface-hidden {
	overflow: initial !important;
}
// .banner,
// .swiperBox {
// 	width: 100%;
// 	height: 60vh;
// }
// .swiper-slide {
// 	object-fit: cover;
// }
// // 分頁器設定
// .swiper {
// 	--swiper-pagination-color: #fde48e;
// 	--swiper-pagination-bullet-inactive-color: #ffffff;
// 	--swiper-pagination-bullet-inactive-opacity: 1;
// 	--swiper-pagination-bullet-size: 12px;
// 	--swiper-pagination-bullet-horizontal-gap: 8px;
// }
</style>
