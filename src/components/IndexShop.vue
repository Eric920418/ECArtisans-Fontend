<template>
	<div class="w-100 m-index-title bg-bg">
		<Title :data="titleData" />
		<div class="m-0 p-0 overflow-x-hidden">
			<div class="container indexShop position-relative p-0">
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
						v-for="(item, index) in recommendSellerList"
						:key="index"
						:virtualIndex="index"
					>
						<div
							class="card p-0 indexShopCard overflow-x-hidden mx-eca-12 mx-sm-2 d-flex"
						>
							<div
								class="indexShopCard-top col-12 d-flex justify-content-center align-items-center bg-img-eca-dack"
								:style="{
									'background-image': `url(${item.shop_image})`,
								}"
							>
								<div
									class="d-flex justify-content-center align-items-center"
									@click="
										$go({ name: 'ShopHome', params: { id: item.seller_id } })
									"
								>
									<div
										class="avatar-l avatar-border ma-12"
										:style="{
											'background-image': `url(${item.shop_image})`,
										}"
									></div>
									<div class="text-white ma-12">
										<h3 class="mb-2">{{ item.shop_name }}</h3>
										<Star :stars="item.star" />
									</div>
								</div>
							</div>
							<div class="row m-0 p-2">
								<div
									class="col m-2 p-0 rounded-3 overflow-x-hidden product_imagesCard"
									v-for="(
										product_imagesItem, product_imagesIndex
									) in item.product_images"
									:key="product_imagesIndex"
									@click="
										$go({
											name: 'ShopHome',
											params: { id: item.seller_id },
										})
									"
								>
									<img :src="product_imagesItem" class="img-eca" />
								</div>
							</div>
						</div>
					</SwiperSlide>
					<div
						class="swiper-pagination d-flex-column d-sm-none swiper-page-bottom"
					/>
					<div
						class="swiper-button-prev btn-eca d-none d-sm-flex start-0 translate-middle + 6px"
						@click.stop="prevEl()"
					>
						<font-awesome-icon :icon="['fas', 'angle-left']" />
					</div>
					<div
						class="swiper-button-next btn-eca d-none d-sm-flex start-100 translate-middle"
						@click.stop="nextEl"
					>
						<font-awesome-icon :icon="['fas', 'angle-right']" />
					</div>
				</swiper>
			</div>
		</div>
		<div
			class="d-flex justify-content-center align-items-center mt-4 mt-md-5 mt-xl-6 mx-eca-12 mx-sm-0 mx-md-5"
		>
			<div class="container px-0 m-0 position-relative">
				<swiper
					:slidesPerView="
						resize <= 576 ? 3 : resize <= 768 ? 4 : resize <= 1200 ? 6 : 8
					"
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
				>
					<SwiperSlide
						v-for="(item, index) in shopList"
						:key="index"
						:virtualIndex="index"
						class="indexShopSwiperSlide"
					>
						<div
							class="row m-0 p-0 justify-content-center indexShopHover"
							@click="$go({ name: 'ShopHome', params: { id: index } })"
						>
							<div
								class="avatar-l"
								:style="{
									'background-image': `url(${item.src})`,
								}"
							></div>
							<p class="indexShopTitle text-center mb-0">
								{{ item.name }}
							</p>
						</div>
					</SwiperSlide>
					<div
						class="swiper-pagination d-flex-column d-md-none swiper-page-bottom"
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
						@click.stop="nextEl"
					>
						<font-awesome-icon :icon="['fas', 'angle-right']" />
					</div>
				</swiper>
				<div
					class="prev btn-eca-s position-absolute d-none d-md-flex top-40 translate-middle"
					@click.stop="getPrev()"
				>
					<font-awesome-icon :icon="['fas', 'angle-left']" />
				</div>
				<div
					class="next btn-eca-s position-absolute d-none d-md-flex top-40 translate-middle"
					@click.stop="getNext()"
				>
					<font-awesome-icon :icon="['fas', 'angle-right']" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useResize } from '@/stores/index';
import Title from './IndexTitle.vue';
import Star from './Star.vue';
import { type RecommendShopType } from '../type/shopType';

const { resize } = useResize();
// stores
import { useShop } from '@/stores/index';
const userStore = useShop();

const shopList = ref([
	{ name: '古早味蜜餞', src: 'https://picsum.photos/id/117/1296/650' },
	{
		name: 'Solong 官方商城官方商城官',
		src: 'https://picsum.photos/id/49/200/300',
	},
	{ name: '商店名稱', src: 'https://picsum.photos/id/18/796/500' },
	{ name: '大研生醫', src: 'https://picsum.photos/id/20/1296/650' },
	{ name: '古早味蜜餞', src: 'https://picsum.photos/id/10/609/600' },
	{ name: 'Solong 官方商城', src: 'https://picsum.photos/id/11/1296/650' },
	{ name: '古早味蜜餞', src: 'https://picsum.photos/id/117/1296/650' },
	{ name: '魔法能量商店', src: 'https://picsum.photos/id/49/200/300' },
	{ name: 'Solong 官方商城', src: 'https://picsum.photos/id/18/796/500' },
	{ name: '大研生醫', src: 'https://picsum.photos/id/20/1296/650' },
	{ name: '古早味蜜餞', src: 'https://picsum.photos/id/10/609/600' },
	{ name: '魔法能量商店', src: 'https://picsum.photos/id/11/1296/650' },
	{ name: 'Solong 官方商城', src: 'https://picsum.photos/id/117/1296/650' },
	{ name: '大研生醫', src: 'https://picsum.photos/id/49/200/300' },
	{ name: '古早味蜜餞', src: 'https://picsum.photos/id/18/796/500' },
	{ name: 'Solong 官方商城', src: 'https://picsum.photos/id/20/1296/650' },
	{ name: '魔法能量商店', src: 'https://picsum.photos/id/10/609/600' },
	{ name: 'Solong 官方商城', src: 'https://picsum.photos/id/11/1296/650' },
]);

// const recommendSellerList = ref([
// 	{
// 		seller_id: 1,
// 		seller_name: 'Solong 官方商城',
// 		seller_portrait: 'images/shop/sellerPortrait1.png',
// 		seller_image: 'images/shop/sellerbackground1.png',
// 		product: [
// 			{
// 				src: 'images/shop/sellerbackground1-1.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground1-2.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground1-3.png',
// 			},
// 		],
// 		star: 4.5,
// 		total_comments: 0,
// 	},
// 	{
// 		seller_id: 2,
// 		seller_name: '魔法能量商店',
// 		seller_portrait: 'images/shop/sellerPortrait2.png',
// 		seller_image: 'images/shop/sellerbackground2.png',
// 		product: [
// 			{
// 				src: 'images/shop/sellerbackground1-1.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground2-2.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground2-3.png',
// 			},
// 		],
// 		star: 4.0,
// 		total_comments: 25,
// 	},
// 	{
// 		seller_id: 3,
// 		seller_name: '古早蜜餞',
// 		seller_portrait: 'images/shop/sellerPortrait3.png',
// 		seller_image: 'images/shop/sellerbackground3.png',
// 		product: [
// 			{
// 				src: 'images/shop/sellerbackground3-1.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground3-2.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground2-3.png',
// 			},
// 		],
// 		star: 4.7,
// 		total_comments: 10,
// 	},
// 	{
// 		seller_id: 4,
// 		seller_name: '大夏製',
// 		seller_portrait: 'images/shop/focus2.png',
// 		seller_image: 'images/shop/sellerPortrait1.png',
// 		product: [
// 			{
// 				src: 'images/shop/focus2-1.png',
// 			},
// 			{
// 				src: 'images/shop/focus2-2.png',
// 			},
// 			{
// 				src: 'images/shop/focus2-3.png',
// 			},
// 		],
// 		star: 4.5,
// 		total_comments: 0,
// 	},
// 	{
// 		seller_id: 5,
// 		seller_name: '廖老師算命館',
// 		seller_portrait: 'images/shop/focus3.png',
// 		seller_image: 'images/shop/focus3.png',
// 		product: [
// 			{
// 				src: 'images/shop/focus3-1.png',
// 			},
// 			{
// 				src: 'images/shop/focus3-2.png',
// 			},
// 			{
// 				src: 'images/shop/focus3-3.png',
// 			},
// 		],
// 		star: 4.0,
// 		total_comments: 25,
// 	},
// 	{
// 		seller_id: 6,
// 		seller_name: '古早蜜餞',
// 		seller_portrait: 'images/shop/sellerPortrait3.png',
// 		seller_image: 'images/shop/sellerbackground3.png',
// 		product: [
// 			{
// 				src: 'images/shop/sellerbackground3-1.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground3-2.png',
// 			},
// 			{
// 				src: 'images/shop/sellerbackground3-3.png',
// 			},
// 		],
// 		star: 4.7,
// 		total_comments: 10,
// 	},
// ]);

const recommendSellerList = computed(() => userStore.recommendShopData);

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
	title: '商家推薦',
	titleEn: 'shop',
};

onMounted(async () => {
	await userStore.getRecommendShops();
});
</script>
<style lang="scss" scoped>
.product_imagesCard {
	transition: all 1s ease-out;
	height: 90px;
	@media (min-width: 1200px) {
		height: 120px;
	}
}

.indexShop {
	width: 100vw;
	@media (min-width: 576px) {
		width: 81vw;
	}
	@media (min-width: 768px) {
		width: 62.5vw;
	}
	@media (min-width: 992px) {
		width: 44.5vw;
	}
}

.indexShopCard {
	// padding: 0px !important;
	// overflow: hidden;
	// transition: all 1s ease-out;
	height: 298px;
	@media (min-width: 1200px) {
		height: 392px; //392px
	}
}
.btn-eca {
	position: absolute;
	top: 25%;
	@media (min-width: 576px) {
		top: calc(53% / 2 + 6px);
	}
	@media (min-width: 768px) {
		top: calc(55% / 2 + 6px);
	}
	@media (min-width: 992px) {
		top: calc(60% / 2 + 6px);
	}
}
.indexShopCard-top {
	// padding: 0px;
	height: 176px;
	// transition: all 1s ease-out;
	@media (min-width: 1200px) {
		height: 240px;
	}
}

.ma-12 {
	margin: 12px;
}
.swiper-backface-hidden {
	overflow: initial !important;
}

.indexShopSwiperSlide {
	display: flex;
	align-items: center;
	justify-content: center;
}
.indexShopTitle {
	text-decoration: none !important;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.indexShopHover {
	transform: translate(0%, 0%);
	transition: all 1s ease-out;
	&:hover {
		transform: translate(0%, -8px);
	}
}
.top-40 {
	top: 40% !important;
}
.prev {
	left: -20px;
}
.next {
	right: calc(-20px - 40px);
}

.indexShopContainer {
	width: unset !important;
}
</style>
