<template>
	<div class="">
		<Title :data="{ textS: '', textE: '品牌背景歷程' }" />
		<div class="p-2 p-md-5">
			<!-- container -->
			<!-- :autoplay="{ delay: 5000, disableOnInteraction: false }" -->
			<swiper
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
					v-for="(item, index) in data"
					:key="index"
					:virtualIndex="index"
					class="px-0 px-sm-6 px-md-7 px-lg-8 py-2"
				>
					<div class="card background p-0 overflow-hidde">
						<div class="d-lg-flex p-0 m-0 align-items-center">
							<div
								class="col-12 col-lg-7 p-0 m-0 ground"
								:style="{
									'background-image': `url(${item.src})`,
								}"
							>
								.
								<!-- <img :src="item.src" class="img-eca" /> -->
							</div>
							<div class="col-12 col-lg-5 p-3 p-md-5 m-0">
								<div class="white-space mb-3">{{ item.text }}</div>
								<div class="d-flex align-items-center text-neutral02 fw-medium">
									<div
										class="border-bottom border-3 w-25 me-2 m-0 p-0 pt-1"
									></div>
									{{ item.name }}
								</div>
							</div>
						</div>
					</div>
				</SwiperSlide>
				<div class="swiper-pagination swiper-page-bottom" />
				<!-- d-none d-sm-flex position-absolute top-50 start-0 translate-middle shadow-sm -->
				<div
					class="swiper-button-prev btn-eca-l d-none d-sm-flex position-absolute top-50 start-0 translate-middle-y"
					@click.stop="prevEl()"
				>
					<font-awesome-icon :icon="['fas', 'angle-left']" />
				</div>
				<!-- btn-eca-l d-none d-sm-flex position-absolute top-50 start-100 translate-middle shadow-sm -->
				<div
					class="swiper-button-next btn-eca-l d-none d-sm-flex position-absolute top-50 end-0 translate-middle-y"
					@click.stop="nextEl"
				>
					<font-awesome-icon :icon="['fas', 'angle-right']" />
				</div>
			</swiper>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Title from './SellerTitle.vue';
import { onMounted, ref, computed } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

// 接收傳入的值
const data = [
	{
		src: 'public/images/shop/banner1.png',
		text: '我們與ECArtisans合作已有一段時間了，他們專注於細節提供了出色的技術支持。\n\n確保我們的商品在其平台上獲得了充分的曝光。\n\n與ECArtisans的合作為我們的品牌帶來了許多正面的反饋和成功。',
		name: 'ArtCraft Furnishings',
	},
	{
		src: 'public/images/shop/banner2.png',
		text: '作為一個小型創業家,我一直在尋找一個方便且價格合理的電商平台。ECArtisans提供了一個完美的解決方案。\n\n他們的技術讓我輕鬆地建立和管理我的線上商店,而且月租制度讓我省去了大筆開支的煩惱。\n\n現在,我可以專注於我的產品和客戶,而不必擔心技術和財務的問題。',
		name: 'Architectural Product Ltd',
	},
	{
		src: 'public/images/shop/banner3.png',
		text: '作為一個注重安全的企業,我們對於選擇電商平台格外謹慎。\n\nECArtisans的企業級保安讓我們放心,我們的資料得到了最好的保護。\n\n我們在平台上的業務運作順暢,從未遇到安全性問題,這讓我們對這個平台的選擇感到非常滿意。',
		name: 'Artisanal Craft Co.',
	},
	{
		src: 'public/images/shop/banner3.png',
		text: '作為一個小型創業家,我一直在尋找一個方便且價格合理的電商平台。\n\nECArtisans提供了一個完美的解決方案。\n\n他們的技術讓我輕鬆地建立和管理我的線上商店,而且月租制度讓我省去了大筆開支的煩惱。\n現在,我可以專注於我的產品和客戶,而不必擔心技術和財務的問題。',
		name: '小創業家的最佳選擇',
	},
] as Array<backgroundType>;

interface backgroundType {
	src: string;
	text: string;
	name: string;
}

const navigation = ref({
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
});
const modules = [Autoplay, Pagination, Navigation, Scrollbar];

const prevEl = () => {};
const nextEl = () => {};
</script>
<style lang="scss" scoped>
.background {
	transition: all 1s ease-out;
	height: 351px;
	overflow: hidden;
	@media (min-width: 768px) {
		height: 424px;
	}
	.ground {
		transition: all 1s ease-out;
		height: calc(351px / 2);
		@media (min-width: 768px) {
			height: calc((351px / 3) * 2);
		}
		@media (min-width: 992px) {
			height: 424px;
		}
	}
}
.text-neutral02 {
	.border {
		border-color: initial !important;
	}
}
// .swiper-backface-hidden {
// 	overflow: initial !important;
// }

// .clickable:hover {
// 	cursor: pointer;
// }
</style>
