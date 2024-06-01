<template>
	<div class="outer">
		<div class="inner">
			<div class="card-content">
				<img :src="item.avatar" class="card-img-top img-frame" alt="..." />

				<div class="card-footer bg-transparent">
					<h5 class="card-product-name">{{ item.comment }}</h5>
					<div class="card-product-body">
						<p class="card-product-seller">{{ item.company }}</p>
						<p class="card-product-sold">已售出 {{ item.sold }}</p>
					</div>
					<div class="card-product-bottom">
						<p class="card-product-price">NT${{ item.price }}</p>
						<div class="d-flex justify-content-between card-others">
							<div class="card-product-cupon">
								<div class="coupon-background"></div>
								<div class="coupon-text">免運券</div>
							</div>
							<div class="card-rate">
								<div class="card-rate-number">
									{{ item.stars.toFixed(1) }}
								</div>
								<ul class="list-unstyled d-flex lh-1 icon-star-group">
									<li
										class="px-1"
										v-for="(star, starIndex) in filledStars"
										:key="'filled-' + starIndex"
									>
										<img :src="starIcon" alt="Filled Star" class="icon-star" />
									</li>
									<li
										class="px-1"
										v-for="(star, starIndex) in emptyStars"
										:key="'emptied-' + starIndex"
									>
										<img
											:src="emptyStarIcon"
											alt="Emptied Star"
											class="icon-star"
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import starIcon from '@/assets/icons/iconStar.svg';
import emptyStarIcon from '@/assets/icons/iconStarOutline.svg';

// 定義從父組件接收的props
const props = defineProps<{
	item: {
		avatar: string;
		comment: string;
		company: string;
		sold: number;
		price: number;
		stars: number;
	};
}>();

const filledStars = Math.floor(props.item.stars);
const emptyStars = 5 - filledStars; // 計算空星數量
</script>

<style scoped>
.card-content {
	position: relative;
	width: 306px;
	height: 403px; /* 加上边框的高度 */
	border-radius: 8px; /* 底部边框是圆弧形状 */
	background: white;
	overflow: hidden;
}

.outer {
	position: relative;
	display: flex;
	justify-content: center;
}

.inner::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 5px;
	background: linear-gradient(90deg, #fde48e 9.5%, #14b2be 100%);
	border-radius: 0 0 8px 8px; /* 底部左右圆角 */
	transition: height 0.3s ease; /* 添加过渡效果 */
}

.outer:hover {
	box-shadow: 0px 4px 40px 0px #0000000d;
}
.img-frame {
	object-fit: cover;
	width: 100%;
	height: 204px;
}

.card-product-body {
	/* layout */
	width: 282px;
	height: 24px;
	gap: 0px;
	justify-content: space-between;
	opacity: 0px;
	display: flex;
	align-items: center;
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
	flex-direction: column;
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

.card-others {
	width: 82px;
	height: 29px;
	gap: 70%;
	justify-content: space-between;
	opacity: 0px;
}

.card-rate {
	width: 127px;
	height: 4px;
	gap: 8px;
	opacity: 0px;
	display: flex;
}

.card-rate-number {
	/* typography */
	font-family: Noto Sans TC;
	font-size: 16px;
	font-weight: 400;
	line-height: 24px;
	text-align: left;
}

.icon-star-group {
	width: 96px;
	height: 16px;
	gap: 4px;
	opacity: 0px;
}
.icon-star {
	width: 16px;
	height: 16px;
}
</style>
