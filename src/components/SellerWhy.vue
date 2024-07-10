<template>
	<div class="">
		<Title :data="{ textS: '為何加入', textE: '?' }" />
		<p class="white-space mb-6 text-sm-center">
			{{ whyText }}
		</p>
		<div class="d-flex align-items-center justify-content-center m-0 flex-wrap">
			<div
				v-for="(whyItme, whyIndex) in whyIcon"
				:key="whyIndex"
				class="whyCard card shadow-sm p-4 m-0 mx-4 d-flex align-items-center justify-content-center"
				:class="{
					'mb-5': whyIndex - 1 !== whyIcon.length,
				}"
			>
				<img
					:src="whyItme.src"
					class="whyItme px-2 m-0 mb-4 py-0"
					alt="ECArtisans"
					title="ECArtisans"
				/>
				<h5 class="m-0 p-0 text-primary">{{ whyItme.text }}</h5>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Title from './SellerTitle.vue';

const whyText =
	'ECArtisans 採用先進的技術和堅固的硬體配備，\n讓您鬆管理您的商店，關注於增加銷售和滿足客戶需求。\n\n透過 ECArtisans 您可以採用月租制度，無須承擔高昂的開支，即可請鬆啟動您的線上商店。\n這種固定的付款方式讓您更輕鬆地管理財務，並再業務成長時隨時調整您的月租計畫。\n\n讓 ECArtisans 成為您創業上的最佳夥伴。\n立即加入我們，開啟您事業的新篇章！';
const whyIcon = [
	{ src: 'images/sellerHome/imgWhy01.png', text: '會員人數超過 100 萬' },
	{ src: 'images/sellerHome/imgWhy02.png', text: '持續更新的技術' },
	{ src: 'images/sellerHome/imgWhy03.png', text: '深入亞洲市場' },
];
</script>

<style lang="scss"></style>
