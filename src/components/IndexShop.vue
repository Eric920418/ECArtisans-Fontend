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
									'background-image': `url(${item.seller_image})`,
								}"
							>
								<div
									class="d-flex justify-content-center align-items-center"
									@click="$go({ name: 'ShopHome', params: { id: index } })"
								>
									<div
										class="avatar-l avatar-border ma-12"
										:style="{
											'background-image': `url(${item.seller_image})`,
										}"
									></div>
									<div class="text-white ma-12">
										<h3 class="mb-2">{{ item.seller_name }}</h3>
										<Star :stars="item.star" />
									</div>
								</div>
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
import { onMounted, ref } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useResize } from '@/stores/index';
import Title from './IndexTitle.vue';
import Star from './Star.vue';
const { resize } = useResize();

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
const recommendSellerList = ref([
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
		star: 0.5,
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
	title: '商家推薦',
	titleEn: 'shop',
};
</script>
<style lang="scss" scoped>
.productCard {
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
