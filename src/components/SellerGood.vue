<template>
	<div class="bg">
		<Title :data="{ textS: '成為', textE: '的好處' }" />
		<div class="row d-flex align-items-center justify-content-center">
			<div class="col-12 col-md-6 text-end p-5">
				<img
					src="/images/sellerHome/image 1.png"
					class="goodDiv px-2 m-0 py-0"
					alt="ECArtisans"
					title="ECArtisans"
				/>
			</div>
			<div
				class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-center justify-content-center justify-content-md-start"
			>
				<ul class="text-primary">
					<li
						v-for="(goodItme, goodIndex) in goodText"
						:key="goodIndex"
						class="mb-4"
					>
						<h5 class="m-0 gray">{{ goodItme.text }}</h5>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Title from './SellerTitle.vue';

const goodText = [
	{ text: '重視效能，載入快速' },
	{ text: '極易上手的後台管理' },
	{ text: '流量飆升也應付自如' },
	// { text: '銷售分析，輕鬆掌握財務狀況' },
];
</script>

<style lang="scss">
.bg {
	background-color: #e4e9f2;
}
</style>
