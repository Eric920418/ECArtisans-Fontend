<template>
	<div class="card card-hover" @click="data.go ? $go(data.go) : ''">
		<div class="row m-0 p-0">
			<div v-if="data.img" class="productCard-img-100 p-0">
				<img :src="`${data.img}`" class="img-eca" />
			</div>
			<div class="col p-0 m-0">
				<div class="border-bottom pb-1 mb-1 d-flex align-items-center">
					<h3
						class="card-title fs-5 m-0 neutral-01 p-0 me-2 flex-grow-1 card-text-hover"
					>
						{{ data.title }}
					</h3>

					<div>
						<p class="text-enable neutral-02 mb-0 text-nowrap">
							{{ stateText }}
						</p>
					</div>
				</div>

				<p v-if="data.date" class="text-date mb-0 mt-1">
					交易日期： {{ $getDate(data.date.sDate) }}
				</p>
				<div class="d-flex justify-content-end align-items-center">
					<div class="text-enable-total mb-0 text-nowrap">總計：</div>
					<div class="d-flex">
						<p class="fs-5 m-0 neutral-01 p-0">NT$</p>
						<p v-if="data.price" class="fs-5 m-0 neutral-01 p-0 price-block">
							{{ formatPrice(data.price) }}
						</p>
					</div>
				</div>
				<div v-if="data.btn" class="d-flex p-0 d-flex justify-content-end mt-2">
					<button
						v-for="(btnItme, btnIndex) in data.btn"
						:key="btnIndex"
						class="btn btn-outline-primary px-4 flex-shrink"
						:class="{ 'me-2': btnIndex + 1 !== data.btn.length }"
						@click="btnItme.go ? $go(btnItme.go) : ''"
					>
						{{ btnItme.title }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { getDate } from '@/stores/index';
import { computed } from 'vue';
import router from '@/router';
import { getCoupon } from '@/stores/index';

export interface BtnType {
	title: String;
	go: Object; //轉跳 to 的內容
}

export interface OrderCardType {
	go?: Object; // Card 轉跳 to 的內容
	img?: String;
	title: string;
	state?: number; // 狀態：處理中
	id?: string; //編號
	price?: number; // 訂單價格
	pay?: number; // 支付方式
	date?: {
		//交易日期
		sDate: string;
	};
	btn?: Array<BtnType>;
}

const props = defineProps<{
	data: OrderCardType;
}>();

// 轉換state為文字
const stateText = computed(() => {
	return props.data.state === 0 ? '未付' : '已付';
});

// 將價格格式帶上千分位字串
const formatPrice = (price: number | undefined): string => {
	if (!price) return '';
	return price.toLocaleString('en-US');
};
</script>

<style lang="scss" scoped>
.text-enable {
	padding: 2px 0px;
	flex-shrink: 0 !important; //禁止擠壓
	font-size: 0.75rem; //12
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 0.875rem; //14
	}
}

.text-enable-total {
	padding: 2px 0px;
	flex-shrink: 0 !important; //禁止擠壓
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 0.875rem; //14
	}
}

.text-no {
	font-size: 0.75em;
}
.text-date {
	font-size: 0.875em;
}
.card-title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.productCard-img-100 {
	width: 8rem;
	height: 8rem;
	margin-right: 12px;
}

.price-block {
	min-width: 80px; /* 设置一个最小宽度 */
	text-align: right; /* 文字右对齐 */
}
</style>
