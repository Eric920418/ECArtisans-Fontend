<template>
	<div class="w-100 m-index-title">
		<Title :data="titleData" />
		<div class="m-0 p-0">
			<div class="container px-eca-12 px-sm-0">
				<!-- 当设置row>1时目前还不兼容loop模式（loop: true） -->
				<!-- 在Slide数量不足以填满的情况下可能会出现布局不理想（例如4行3列，但是只有10个Slide），建议使用空的Slide将数量补足。 -->
				<!-- slidesPerView:一次顯示 4 欄位 row: 2列  slidesPerGroup: 一次滑動 4 欄位-->
				<!-- :pagination 改 type: 'bullets' 才可以用按鈕 -->
				<!-- spaceBetween: SwiperSlide裡面的每個項目 間距 要多少 -->
				<swiper
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
						<Card
							:item="item"
							@click="$go({ name: 'ShopHome', params: { id: index } })"
						/>
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
import Card from '@/components/ProductCard.vue';
import { onMounted, onUnmounted, watch, computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
// 新增 Grid
import { Grid, Navigation, Pagination, Scrollbar } from 'swiper/modules';
// 新增 Grid.css
import 'swiper/css/grid';
// import 'swiper/css/navigation';

import { useResize } from '@/stores/index';
const { resize } = useResize();

interface ProductType {
	seller_id: string;
	avatar: string;
	comment: string;
	company: string;
	name: string;
	sold: number;
	price: number;
	stars: number;
}
// 請強制設訂為 12 的倍數 ...例如：12、24、48...
// 因為顯示為 4 、 3  避免有缺。
// 除非 每次顯示 改為 4 跟 8 的倍數。
const ProductList = ref<ProductType[]>([
	{
		seller_id: '12132132',
		avatar: 'images/shop/product1.png',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		seller_id: '12132132',
		avatar: 'images/shop/product2.png',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		seller_id: '2222222',

		avatar: 'images/shop/product3.png',
		comment: '【現貨秒出】卸妝水 日本雜誌 LDK 卸妝油 推薦',
		company: '生活小舖',
		name: 'HowBig',
		sold: 100,
		price: 500,
		stars: 1.2,
	},
	{
		seller_id: '1111111',
		avatar: 'images/shop/product4.png',
		comment: 'Solong 柔焦妝前精華 30ML 定裝神器',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 2700,
		stars: 5.0,
	},

	{
		seller_id: '33333',
		avatar: 'images/shop/product5.png',
		comment: '短袖男童重磅 T 恤印花 T 恤復古風寬鬆加大碼 Oversize',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 100,
		price: 2700,
		stars: 4.3,
	},
	{
		seller_id: '44444444',
		avatar: 'images/shop/product6.png',
		comment: '【古早蜜餞】台南 40 年老店 買十送一 雪梅',
		company: '生活小舖',
		name: 'HowBig',
		sold: 100,
		price: 500,
		stars: 3.6,
	},
	{
		seller_id: '557855555',
		avatar: 'images/shop/product7.png',
		comment: 'Lili 現貨秒出 學院風百褶裙 高腰修身',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 350,
		stars: 3.6,
	},
	{
		seller_id: '999778999999',
		avatar: 'images/shop/product8.png',
		comment: '奈米水離子 國際電壓 網美吹風機',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 2.2,
	},
	{
		seller_id: '12132132',
		avatar: 'images/shop/product1.png',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		seller_id: '12132132',
		avatar: 'images/shop/product2.png',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		seller_id: '2222222',

		avatar: 'images/shop/product3.png',
		comment: '【現貨秒出】卸妝水 日本雜誌 LDK 卸妝油 推薦',
		company: '生活小舖',
		name: 'HowBig',
		sold: 100,
		price: 500,
		stars: 1.2,
	},
	{
		seller_id: '1111111',
		avatar: 'images/shop/product4.png',
		comment: 'Solong 柔焦妝前精華 30ML 定裝神器',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 2700,
		stars: 5.0,
	},

	{
		seller_id: '33333',
		avatar: 'images/shop/product5.png',
		comment: '短袖男童重磅 T 恤印花 T 恤復古風寬鬆加大碼 Oversize',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 100,
		price: 2700,
		stars: 4.3,
	},
	{
		seller_id: '44444444',
		avatar: 'images/shop/product6.png',
		comment: '【古早蜜餞】台南 40 年老店 買十送一 雪梅',
		company: '生活小舖',
		name: 'HowBig',
		sold: 100,
		price: 500,
		stars: 3.6,
	},
	{
		seller_id: '557855555',
		avatar: 'images/shop/product7.png',
		comment: 'Lili 現貨秒出 學院風百褶裙 高腰修身',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 350,
		stars: 3.6,
	},
	{
		seller_id: '999778999999',
		avatar: 'images/shop/product8.png',
		comment: '奈米水離子 國際電壓 網美吹風機',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 2.2,
	},
	{
		seller_id: '12132132',
		avatar: 'images/shop/product1.png',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		seller_id: '12132132',
		avatar: 'images/shop/product2.png',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		seller_id: '2222222',

		avatar: 'images/shop/product3.png',
		comment: '【現貨秒出】卸妝水 日本雜誌 LDK 卸妝油 推薦',
		company: '生活小舖',
		name: 'HowBig',
		sold: 100,
		price: 500,
		stars: 1.2,
	},
	{
		seller_id: '1111111',
		avatar: 'images/shop/product4.png',
		comment: 'Solong 柔焦妝前精華 30ML 定裝神器',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 2700,
		stars: 5.0,
	},

	{
		seller_id: '33333',
		avatar: 'images/shop/product5.png',
		comment: '短袖男童重磅 T 恤印花 T 恤復古風寬鬆加大碼 Oversize',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 100,
		price: 2700,
		stars: 4.3,
	},
	{
		seller_id: '44444444',
		avatar: 'images/shop/product6.png',
		comment: '【古早蜜餞】台南 40 年老店 買十送一 雪梅',
		company: '生活小舖',
		name: 'HowBig',
		sold: 100,
		price: 500,
		stars: 3.6,
	},
	{
		seller_id: '557855555',
		avatar: 'images/shop/product7.png',
		comment: 'Lili 現貨秒出 學院風百褶裙 高腰修身',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 350,
		stars: 3.6,
	},
	{
		seller_id: '999778999999',
		avatar: 'images/shop/product8.png',
		comment: '奈米水離子 國際電壓 網美吹風機',
		company: '生活小舖',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 2.2,
	},
]);

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
</script>
<style lang="scss" scoped></style>
