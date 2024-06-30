<template>
	<div class="card card-hover" @click="data.go ? $go(data.go) : ''">
		<div class="row m-0 p-0">
			<div v-if="data.img" class="productCard-img-100 p-0">
				<img :src="`${data.img}`" class="img-eca" />
				<div class="product_count neutral-05 text-center m-0 p-0">
					{{ data.product_count }}
				</div>
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
				<p class="mb-0">
					<span class="text-card-coupon btn-Bg-active rounded-1 text-primary">
						{{ deliveryMethod }}
					</span>
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
	product_count: number; //商品類型數量
	delivery: number;
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

// 轉換delivery為文字
const deliveryMethod = computed(() => {
	switch (props.data.delivery) {
		case 1:
			return '宅配';
		case 2:
			return '黑貓宅急便';
		case 3:
			return '店到店';
		default:
			return '未填寫';
	}
});

// 將價格格式帶上千分位字串
const formatPrice = (price: number | undefined): string => {
	if (!price) return '';
	return price.toLocaleString('en-US');
};
</script>

<style lang="scss" scoped>
.product_count {
	position: absolute;
	bottom: 5px;
	right: 5px;
	width: 1.5rem;
	height: 1.5rem;
	background-color: var(--primary);
	border-radius: 50%;
	z-index: 1; /* 確保圓點在圖片上面 */
}
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
	position: relative;
}

.price-block {
	min-width: 80px; /* 设置一个最小宽度 */
	text-align: right; /* 文字右对齐 */
}
</style>
