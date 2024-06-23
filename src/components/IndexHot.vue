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
						resize <= 576 ? 2 : resize <= 768 ? 2 : resize <= 1200 ? 3 : 4
					"
					:slidesPerGroup="
						resize <= 576 ? 2 : resize <= 768 ? 2 : resize <= 1200 ? 3 : 4
					"
					:freeMode="false"
					:loop="true"
					:grid="{
						fill: 'row',
						rows: 2,
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
					:spaceBetween="12"
					ref="swiperContainerRef"
				>
					<SwiperSlide v-for="(item, index) in ProductList" :key="index">
						<Card
							:item="item"
							@click="$go({ name: 'ShopHome', params: { id: item.seller_id } })"
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
// 請強制設訂為 24 的倍數 ...例如：24、48...
// 因為顯示為 4 、 6 、 8 避免有缺。
// 除非 每次顯示 改為 4 跟 8 的倍數。
const ProductList = ref<ProductType[]>([
	{
		seller_id: '12132132',
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		seller_id: '12132132',

		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		seller_id: '2222222',

		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 1.2,
	},
	{
		seller_id: '1111111',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},

	{
		seller_id: '33333',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user02.jpg?raw=true',
		comment: '讓我們一個月內提高10000個追踪者，客戶體驗反饋很正面！ ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 100,
		price: 100,
		stars: 2.3,
	},
	{
		seller_id: '44444444',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '可以用聊天機器人玩這麼豐富的行銷活動！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 3.6,
	},
	{
		seller_id: '557855555',
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 3.6,
	},
	{
		seller_id: '999778999999',
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 2.2,
	},
	{
		seller_id: '889777888',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 3.6,
	},
	{
		seller_id: '7777787777',
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		seller_id: '7787745646',
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		seller_id: '7777884545',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 1.2,
	},
	{
		seller_id: '7777777877',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		seller_id: '66666664567666',
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		seller_id: '99997897899999',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 1.2,
	},
	{
		seller_id: '4545564',
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
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
	title: '熱銷商品',
	titleEn: 'Hot',
	openBtn: {
		prev: getPrev,
		next: getNext,
	},
};
</script>
