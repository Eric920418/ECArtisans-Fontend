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
			>
				<SwiperSlide
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
							'background-color': 'rgba(0, 0, 0, .1)',
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

const bannerList = ref([
	{ src: 'images/shop/banner2.png' },
	{ src: 'images/shop/banner1.png' },
	{ src: 'images/shop/banner3.png' },
	{ src: 'https://picsum.photos/id/20/1296/650' },
	{ src: 'https://picsum.photos/id/10/609/600' },
	{ src: 'https://picsum.photos/id/11/1296/650' },
]);
const navigation = ref({
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
});
const modules = [Autoplay, Pagination, Navigation, Scrollbar];

const prevEl = () => {};
const nextEl = () => {};
</script>
<style lang="scss" scoped>
.banner {
	height: 52.609vh;
	@media (min-width: 768px) {
		height: 60vh;
	}
}

.swiper-backface-hidden {
	overflow: initial !important;
}
</style>
