<template>
	<div class="swiper-test" style="height: 200px"></div>
	<div class="w-100">
		<div class="container card-grid">
			<div v-for="(item, index) in commentList" :key="index" class="card">
				<!-- <div class="banner"> -->
				<img :src="item.avatar" class="card-img-top img-frame" alt="..." />
				<div class="card-footer bg-transparent">
					<h5 class="card-product-name">{{ item.comment }}</h5>
					<div class="card-product-body">
						<p class="card-product-seller">{{ item.company }}</p>
						<p class="card-product-sold">已售出 {{ item.sold }}</p>
					</div>
					<div class="card-product-bottom">
						<p class="card-product-price">NT${{ item.price }}</p>
						<div class="d-flex justify-content-between">
							<div class="card-product-cupon">
								<div class="coupon-background"></div>
								<div class="coupon-text">免運券</div>
							</div>

							<ul class="list-unstyled d-flex lh-1">
								<li
									class="px-1"
									v-for="(star, index) in item.stars"
									:key="index"
								>
									<img
										src="https://raw.githubusercontent.com/hexschool/webLayoutTraining1st/f70f00178a7f0baa31e9c01634303d8562cfe93a/chatTalker_images/icon_star.svg"
										alt="評價星星"
									/>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- </div> -->
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const commentList = ref([
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: Array(5).fill(''),
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: Array(5).fill(''),
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: Array(5).fill(''),
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: Array(5).fill(''),
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user02.jpg?raw=true',
		comment: '讓我們一個月內提高10000個追踪者，客戶體驗反饋很正面！ ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 100,
		price: 100,
		stars: Array(5).fill(''),
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '可以用聊天機器人玩這麼豐富的行銷活動！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: Array(5).fill(''),
	},
]);
</script>
<style lang="scss" scoped>
.swiper-button-next::after,
.swiper-button-prev::after {
	content: '';
}

.swiper-button-prev {
	left: 63% !important;
	top: 0% !important;
	transform-origin: left center;
}
.swiper-button-next {
	left: 69% !important;
	top: 0% !important;
	transform-origin: left center;
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
.swiper-backface-hidden {
	overflow: initial !important;
}
// 分頁設定
.swiper {
	--swiper-pagination-color: #fde48e;
	--swiper-pagination-bullet-inactive-color: #ffffff;
	--swiper-pagination-bullet-inactive-opacity: 1;
	--swiper-pagination-bullet-size: 12px;
	--swiper-pagination-bullet-horizontal-gap: 8px;
}

.container {
	width: 1920px;
	height: 100%;
	gap: 24px;
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr); /* 每排4个卡片 */
	grid-gap: 24px; /* 设置卡片之间的间隔 */
}

.img-frame {
	object-fit: cover;
	width: 100%;
	height: 204px;
}

.card {
	padding: 0;
	width: 306px !important;
	height: 398px !important;
	border-radius: 8px;
	border: 0px 0px 0px 0px;
	background-color: #ffffff;
}
.card-product-body {
	/* layout */
	width: 282px;
	height: 24px;
	gap: 0px;
	justify-content: space-between;
	opacity: 0px;
	display: flex; /* 使用 Flexbox 布局 */
	align-items: center; /* 垂直居中对齐 */
}

.card-product-seller {
	/* layout */
	height: 24px;
	gap: 0px;
	opacity: 0px;
	width: 70%;

	/* typography */
	font-family: Noto Sans TC;
	font-size: 16px;
	font-weight: 400;
	line-height: 24px;
	text-align: left;
	/* Neutral 02 */
	color: #6b768c;
}

.card-product-sold {
	/* layout */
	height: 24px;
	gap: 0px;
	opacity: 0px;
	width: 30%;

	/* typography */
	font-family: Noto Sans TC;
	font-size: 16px;
	font-weight: 400;
	line-height: 24px;
	text-align: left;

	/* Neutral 02 */
	color: #6b768c;
}

.card-product-bottom {
	/* layout */
	width: 282px;
	height: 74px;
	gap: 16px;
	flex-direction: column; /* 垂直布局 */
}

.card-product-price {
	/* layout */
	width: 282px;
	height: 29px;
	gap: 8px;
	opacity: 0px;
	/* typography */
	font-family: Noto Sans TC;
	font-size: 24px;
	font-weight: 700;
	line-height: 28.8px;
	text-align: left;
	/* text */
	color: #454545;
}

.card-product-cupon {
	/* layout */
	position: relative; /* 讓子元素可以使用定位 */
}

.coupon-background {
	/* layout */
	position: relative;

	width: 58px;
	height: 29px;
	padding: 4px 8px 4px 8px;
	gap: 10px;
	border-radius: 4px 4px 4px 4px;
	opacity: 0px;
	/* text */
	background-color: #e3f6f8;
	/* 控制层叠顺序 */
	z-index: 1;
}

.coupon-text {
	/* layout */
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 42px;
	height: 29px;
	gap: 0px;
	opacity: 0px;
	/* typography */
	font-family: Noto Sans TC;
	font-size: 14px;
	font-weight: 400;
	line-height: 29px; /* 和 .coupon-background 的高度相同 */
	text-align: center; /* 讓文字居中 */
	/* text */
	color: #14b2be;
	/* 控制層疊順序 */
	z-index: 2;
}
.card-footer {
	height: 194px;
	padding: 12px 12px 20px 12px;
	gap: 8px;
}

.card-product-name {
	/* layout */
	width: 282px;
	height: 48px;
	gap: 0px;
	opacity: 0px;
	/* typography */
	font-family: 'Noto Sans TC', sans-serif;
	font-weight: 500;
	font-size: 20px;
	line-height: 24px;
	/* text */
	color: #454545;
}
</style>
