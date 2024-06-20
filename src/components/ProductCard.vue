<template>
	<div class="card card-line h-100">
		<!-- overflow-hidden 雖然可以超出隱藏，但線條會不見，所以直接對圖片導圓角 -->
		<!-- 使用 圖片 的寫法 img-eca 是為了讓內容滿版置中，外層 card-top 限制圖片高度跟大小 -->
		<div class="card-top overflow-hidden position-relative">
			<img :src="item.avatar" class="img-eca" alt="..." />
			<!-- SVG 更換顏色相關：
				https://uu9924079.medium.com/%E5%9C%A8-hover-%E6%99%82%E6%9B%B4%E6%94%B9-svg-%E9%A1%8F%E8%89%B2%E7%9A%84%E5%B9%BE%E7%A8%AE%E6%96%B9%E5%BC%8F-15eb425c4977 
				https://css-tricks.com/change-color-of-svg-on-hover/
				備註：因為有外框線，如要調整比較複雜，故這裡直接使用<svg>調整。	
			-->
			<div
				class="position-absolute top-0 end-0 p-1 me-1"
				@click="addToFavorites"
			>
				<!-- 需命名 icon + 後面的 farHeart 才會有hover -->
				<svg
					class="icon"
					width="24"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="-30 -30 572 572"
				>
					<!-- fasHeart:填滿紅色 farHeart:未填滿:hover -->
					<path
						class="farHeart"
						v-if="!favorited"
						d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
					/>
					<path
						class="fasHeart"
						v-else
						d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
					/>
				</svg>
			</div>
		</div>
		<!-- 使用 背景圖 的寫法 img-eca 是為了讓內容滿版置中，外層 div 限制圖片高度跟大小 -->
		<!-- <div
				class="bg-img-eca card-top"
				:style="{
					'background-image': `url(${item.avatar})`,
				}"
			></div> -->
		<div class="card-body m-0 row">
			<div class="mx-0 px-0">
				<h3 class="title mb-1 p-0">{{ item.comment }}</h3>
			</div>
			<div
				class="d-flex align-items-center justify-content-between mb-1 p-0 neutral-02 text-card-shop"
			>
				<p class="text-shop mb-0">
					{{ item.company }}
				</p>
				<p class="text-sold mb-0">&emsp;已售出 {{ item.sold }}</p>
			</div>
			<p class="text-card-price p-0">NT${{ item.price }}</p>
			<div class="row align-items-center justify-content-between m-0 p-0">
				<div class="col-12 col-sm-3 p-0 mb-1 mb-sm-0 d-flex">
					<p class="text-card-coupon btn-Bg-active rounded-1 text-primary mb-0">
						免運券
					</p>
				</div>
				<div class="col-12 col-sm-9 p-0 d-flex justify-content-sm-end">
					<Star :stars="item.stars" />
				</div>
			</div>
			<div class="mt-3 mb-1" v-if="goCart">
				<button class="btn btn-outline-primary w-100">加入購物車</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { alertStore } from '@/main';
import Star from './Star.vue';

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
	goCart?: boolean;
}>();

const favorited = ref(false); // 預設為未收藏 -> 待補完整資料

const addToFavorites = () => {
	favorited.value = !favorited.value;
	if (favorited.value) {
		// 待補新增邏輯
		alertStore.success('focusProductOK');
	} else {
		// 待補刪除的邏輯
		alertStore.success('focusProductFail');
	}
};
</script>

<style lang="scss" scoped>
.card-top {
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
	transition: all 1s ease-out; //效果滑順
	height: 120px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		height: 204px;
	}
}
.card-body {
	padding: 8px 8px 12px 8px !important;
	min-height: 176px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		padding: 12px 12px 12px 12px !important;
		min-height: 196px;
	}
}
.text-shop,
.title {
	display: -webkit-box;
	-webkit-line-clamp: 2; //超出兩行隱藏
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.text-shop {
	-webkit-line-clamp: 1; //超出兩行隱藏
}
.text-sold {
	flex-shrink: 0; //禁止擠壓
}

// 所有文字大小
.title {
	font-size: 1rem;
	font-weight: bold;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 1.25rem;
	}
}

.text-card-shop {
	font-size: 0.75rem;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 1rem;
	}
}
.text-card-price {
	font-size: 1.25rem;
	font-weight: bold;
	margin-bottom: 8px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 1.5rem;
	}
}
</style>
