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
						class="overflow-x-hidden banner clickable"
						:style="{
							'background-image': `url(${item.activity_image})`,
							'background-repeat': 'no-repeat',
							'background-attachment': 'fixed',
							'background-position': 'center',
							'background-size': 'cover',
							'background-color': 'rgba(0, 0, 0, .1)',
							'background-blend-mode': 'multiply',
						}"
						@click="
							$go({ name: 'ShopActivity', params: { id: item.activity_id } })
						"
					></div>
				</SwiperSlide>
				<div
					class="swiper-pagination position-absolute bottom-0 start-50 translate-middle-x pb-3"
				/>
				<div
					class="swiper-button-prev btn-eca-l d-none d-sm-flex position-absolute top-50 start-0 translate-middle shadow-sm"
					@click.stop="prevEl()"
				>
					<font-awesome-icon :icon="['fas', 'angle-left']" />
				</div>
				<div
					class="swiper-button-next btn-eca-l d-none d-sm-flex position-absolute top-50 start-100 translate-middle shadow-sm"
					@click.stop="nextEl"
				>
					<font-awesome-icon :icon="['fas', 'angle-right']" />
				</div>
			</swiper>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { useShop } from '@/stores/index';
const shopStore = useShop();

const bannerList = computed(() => shopStore.bannerData);

const navigation = ref({
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
});
const modules = [Autoplay, Pagination, Navigation, Scrollbar];

const prevEl = () => {};
const nextEl = () => {};

// 增加 loading 狀態
const loading = ref(true);
onMounted(async () => {
	await shopStore.getActivityBanner();
	loading.value = false; // 當資料獲取完成後將 loading 設為 false
});
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

.clickable:hover {
	cursor: pointer;
}
</style>
