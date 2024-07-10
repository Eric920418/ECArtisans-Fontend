<template>
	<div class="m-0 p-0 row position-relative">
		<div
			class="col-12 shopHomeBanner bg-img-eca m-0 p-0 d-flex align-items-center justify-content-start"
			:style="{
				'background-image': `url(${shopHomeBanner})`,
			}"
		>
			<div class="container p-4 p-md-5">
				<H2 class="text-white text-shadow">花一次，省更多</H2>
				<p class="text-white text-shadow">
					免收上架費，免收商品抽成費
					<br />
					一次付省更多，輕鬆無負擔，盡情上架！
				</p>
				<button
					type="button"
					class="btn btn-primary px-5"
					@click="$go({ name: 'SellerSignUp' })"
				>
					立即申請開店
				</button>
			</div>
		</div>
		<div class="col-12 container">
			<!-- 為何加入 shopHomeDiv -->
			<Why class="shopHomeDiv" />
			<!-- 成為的好處 -->
			<Good class="shopHomeDiv" />
			<!-- 品牌背景歷程 -->
			<Background class="shopHomeDiv" />
			<!-- 的合作模式和收費方式 -->
			<Cost class="shopHomeDiv" />
			<!-- 的合作模式和收費方式 -->
			<!-- <Partner class="shopHomeDiv" /> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
import Why from '@/components/SellerWhy.vue';
import Good from '@/components/SellerGood.vue';
import Background from '@/components/SellerBackground.vue';
import Cost from '@/components/SellerCost.vue';
import Partner from '@/components/SellerPartner.vue';

const shopHomeBanner = '/public/images/sellerHome/Banner.png';
</script>
<style lang="scss">
.shopHomeBanner {
	height: 75vh;
}
.text-shadow {
	text-shadow: 0.1em 0.1em 0.2em black;
}

.shopHomeDiv {
	padding: 12px;
	padding-top: 60px;
	padding-bottom: 60px;
	@media (min-width: 768px) {
		// padding-top: 80px;
		// padding-bottom: 80px;
	}
	@media (min-width: 1200px) {
		// padding-top: 60px;
		// padding-bottom: 60px;
	}
}
</style>
