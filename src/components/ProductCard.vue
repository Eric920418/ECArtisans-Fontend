<template>
	<div class="card card-line">
		<!-- overflow-hidden 雖然可以超出隱藏，但線條會不見，所以直接對圖片導圓角 -->
		<!-- 使用 圖片 的寫法 img-eca 是為了讓內容滿版置中，外層 card-top 限制圖片高度跟大小 -->
		<div class="card-top overflow-hidden">
			<img :src="item.avatar" class="img-eca" alt="..." />
		</div>
		<!-- 使用 背景圖 的寫法 img-eca 是為了讓內容滿版置中，外層 div 限制圖片高度跟大小 -->
		<!-- <div
				class="bg-img-eca card-top"
				:style="{
					'background-image': `url(${item.avatar})`,
				}"
			></div> -->
		<div class="card-body m-0">
			<h3 class="title mb-1">{{ item.comment }}</h3>
			<div
				class="d-flex align-items-center justify-content-between mb-1 p-0 neutral-02 text-card-shop"
			>
				<p class="text-shop mb-0">
					{{ item.company }}
				</p>
				<p class="text-sold mb-0">&emsp;已售出 {{ item.sold }}</p>
			</div>
			<p class="text-card-price">NT${{ item.price }}</p>
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
		</div>
	</div>
</template>

<script lang="ts" setup>
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
}>();
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
	padding: 8px 8px 12px 8px;
	height: 176px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		padding: 12px 12px 20px 12px;
		height: 196px;
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
.text-card-coupon {
	padding: 2px 4px;
	flex-shrink: 0; //禁止擠壓
	font-size: 0.75rem; //12
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 0.875rem; //14
	}
}
</style>
