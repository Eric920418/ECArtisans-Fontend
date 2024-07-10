<template>
	<div class="">
		<Title :data="{ textS: '', textE: '的合作模式和收費方式' }" />
		<div class="row align-items-center justify-content-center">
			<div class="col-12 col-md-12 col-lg-9 col-xl-8 mb-5">
				<h3 class="p-2 p-sm-3 fw-bold">{{ title[0].title }}</h3>
				<div class="p-1 d-flex position-relative">
					<div
						v-for="(contentItme, contentIndex) in content"
						:key="contentIndex"
						class="card p-a-12 d-flex align-items-center text-start flex-grow-1"
						:class="{
							'bg-bg text-primary': contentIndex === 0,
							'text-neutral02': contentIndex === 1,
						}"
					>
						<h4 class="px-2 w-100 title fw-medium">{{ contentItme.title }}</h4>
						<ul class="text-primary">
							<li
								v-for="(textItme, textIndex) in contentItme.text"
								:key="textIndex"
								class="mb-4"
							>
								<h5 class="m-0 gray">{{ textItme }}</h5>
							</li>
						</ul>
					</div>

					<div
						class="icon-60 bg-primary d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle"
					>
						<font-awesome-icon
							:icon="['fas', 'handshake-simple']"
							class="fs-2"
						/>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-12 col-lg-9 col-xl-8">
				<div class="p-2 p-sm-3 pm-2">
					<h3 class="fw-bold mb-3">{{ title[1].title }}</h3>
					<p class="mb-0">{{ title[1].content }}</p>
				</div>
				<PlanList />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import Title from './SellerTitle.vue';
import PlanList from './PlanList.vue';
import { ref } from 'vue';
// d-flex align-items-center justify-content-center m-0 flex-wrap
const title = [
	{
		title: '品牌與 ECArtisans 合作模式',
	},
	{
		title: '具體收費方式',
		content:
			'為了能夠長期持續並穩定地提供良好的服務，ECArtisans 僅收取每月合約費用',
	},
];
const content = ref<Array<contentType>>([
	{
		title: 'ECArtisans 提供',
		text: [
			'免收上架費，免收商品抽成費',
			'各式活動宣傳資源',
			// '營收報表供隨時登入查詢',
			'營收匯款直接至指定帳戶',
		],
	},
	{
		title: '品牌需負責',
		text: [
			'自行架設設計館，上架商品',
			'自行出貨，管理庫存',
			'向消費者開具發票或購買憑證',
			'依規範處理客服及退換貨',
		],
	},
]);
interface contentType {
	title: string;
	text: Array<string>;
}
</script>

<style lang="scss">
.p-a-12 {
	margin: 12px;
	padding: 48px;
}
.title {
	margin-bottom: 36px;
}
.icon-60 {
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
</style>
