<template>
	<div class="wrapper">
		<Title :data="titleData" />
		<div
			id="carouselExampleIndicators"
			class="carousel slide carousel-container"
			data-bs-ride="carousel"
		>
			<div class="carousel-inner position-relative">
				<div
					v-for="(chunk, index) in chunkedProducts"
					:key="index"
					:class="['carousel-item', { active: index === 0 }]"
				>
					<div class="card-slide">
						<div v-for="(item, subIndex) in chunk" :key="subIndex">
							<Card :item="item" />
						</div>
					</div>
				</div>
			</div>
			<div class="carousel-indicators">
				<button
					v-for="(chunk, index) in chunkedProducts"
					:key="'indicator-' + index"
					type="button"
					:data-bs-target="'#carouselExampleIndicators'"
					:data-bs-slide-to="index"
					:class="['indicator-dot', { active: index === 0 }]"
					:aria-label="'Slide ' + (index + 1)"
				></button>
			</div>
			<div class="carousel-control-indicators">
				<div
					class="carousel-control-prev btn-swiper"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="prev"
				>
					<font-awesome-icon :icon="['fas', 'angle-left']" />
				</div>
				<div
					class="carousel-control-next btn-swiper"
					type="button"
					data-bs-target="#carouselExampleIndicators"
					data-bs-slide="next"
				>
					<font-awesome-icon :icon="['fas', 'angle-right']" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Title from '@/components/IndexTitle.vue';
import Card from '@/components/ProductCard.vue';
import { onMounted, onUnmounted, watch, computed, ref } from 'vue';

interface Product {
	avatar: string;
	comment: string;
	company: string;
	name: string;
	sold: number;
	price: number;
	stars: number;
}

const ProductList = ref<Product[]>([
	{
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
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 3.6,
	},
]);
const chunkSize = ref<number>(4); // 将 chunkSize 定义为 ref

const chunkedProducts = computed(() => {
	const chunks: Product[][] = [];
	for (let i = 0; i < ProductList.value.length; i += chunkSize.value) {
		chunks.push(ProductList.value.slice(i, i + chunkSize.value));
	}
	return chunks;
});

const updateChunkSize = () => {
	const cardGrid = document.querySelector('.card-grid');
	if (cardGrid) {
		const columns = window
			.getComputedStyle(cardGrid)
			.gridTemplateColumns.split(' ').length;
		chunkSize.value = columns * 2; // 每页显示的卡片数量为列数乘以2
	}
};

onMounted(() => {
	const carouselInner = document.querySelector('.carousel-inner');
	if (carouselInner) {
		const observer = new ResizeObserver(() => {
			updateChunkSize();
		});
		observer.observe(carouselInner);

		// 初始化 chunkSize
		updateChunkSize();

		// 清除观察器
		onUnmounted(() => {
			observer.disconnect();
		});
	}
});

// 傳遞方法，一定要在最後面
const titleData = {
	title: '新品上市',
	titleEn: 'new',
};
</script>
<style lang="scss" scoped>
.wrapper {
	width: 1920px;
	width: 100%;
	height: 1163px;
	margin: 120px 0px 120px 0px;
	gap: 64px;
	opacity: 0px;
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
}

.carousel-container {
	width: 100%;
	height: 450px; /* 保持固定高度 */
	gap: 24px;
	display: flex;
	flex-wrap: wrap;
	padding: 0%;
	margin: 0%;
	align-items: center;
	justify-content: center;
}
.carousel-inner {
	height: 100% !important;
	width: 1296px !important;
}
.carousel-indicators {
	position: absolute; /* 绝对定位，相对于包裹容器 */
	display: flex; /* 让圆点水平排列 */
	gap: 8px; /* 调整圆点之间的间距 */
	padding: 0%;
	height: 20px;
}
.carousel-indicators {
	position: absolute;
	display: flex;
	gap: 8px;
	bottom: -10%;
	transform: translateX(-50%, -50%);
}

.indicator-dot {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	background-color: #ffffff; /* 圆点的默认颜色 */
	border: none; /* 取消边框 */
	margin: 0 5px; /* 调整圆点之间的间距 */
	gap: 8px;
}

.indicator-dot.active {
	background-color: #fde48e; /* 激活状态下的圆点颜色 */
}

.carousel-indicators .indicator-dot.active {
	background-color: #fde48e !important;
}

.carousel-control-indicators {
	position: absolute;
	width: 112px;
	height: 48px;
	gap: 16px;
	opacity: 0px;
	display: flex;
	top: -15%;
	right: 10%;
}

@media (max-width: 960px) {
	.carousel-control-indicators {
		display: none; /* 隱藏元素 */
	}
}

.carousel-control-next,
.carousel-control-prev {
	position: relative;
	left: 0% !important;
	top: 0% !important;
	transform-origin: left center;
	color: #454545;
}
.carousel-control-next:hover,
.carousel-control-prev:hover {
	color: white;
}

.btn-swiper {
	background-color: white;
	border-radius: 40px;
	width: 48px;
	height: 48px;
	svg {
		width: 24px;
		height: 24px;
	}
}

.btn-swiper:hover {
	background-color: #14b2be;
}

.card-slide {
	width: 100%; /* 设置宽度为父容器的100% */
	gap: 24px;
	display: flex;
	flex-wrap: wrap;
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr); /* 每排4个卡片 */
	grid-gap: 24px; /* 设置卡片之间的间隔 */
}

@media (max-width: 960px) {
	.card-grid {
		grid-template-columns: repeat(2, 1fr); /* 每排2个卡片 */
		grid-gap: 16px; /* 设置卡片之间的间隔 */
	}
}
</style>
