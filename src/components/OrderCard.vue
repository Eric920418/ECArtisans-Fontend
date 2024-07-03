<template>
	<div
		v-for="(order, index) in formattedData"
		:key="index"
		class="card card-hover"
		@click="order.go ? $go(order.go) : ''"
	>
		<div class="row m-0 p-0">
			<div v-if="order.img" class="productCard-img-100 p-0">
				<img :src="order.img" class="img-eca" />
				<div class="product_count neutral-05 text-center m-0 p-0">
					{{ order.product_count }}
				</div>
			</div>
			<div class="col p-0 m-0">
				<div class="border-bottom pb-1 mb-1 d-flex align-items-center">
					<h3
						class="card-title fs-5 m-0 neutral-01 p-0 me-2 flex-grow-1 card-text-hover"
					>
						{{ order.title }}
					</h3>
					<div>
						<p class="text-enable neutral-02 mb-0 text-nowrap">
							{{ order.state === 0 ? '未付' : '已付' }}
						</p>
					</div>
				</div>

				<p v-if="order.date" class="text-date mb-0 mt-1">
					交易日期： {{ $getDate(order.date.sDate) }}
				</p>
				<p class="mb-0" v-if="order.delivery !== undefined">
					<span class="text-card-coupon btn-Bg-active rounded-1 text-primary">
						{{ getDeliveryMethod(order.delivery) }}
					</span>
				</p>
				<div class="d-flex justify-content-end align-items-center">
					<div class="text-enable-total mb-0 text-nowrap">總計：</div>
					<div class="d-flex">
						<p class="fs-5 m-0 neutral-01 p-0">NT$</p>
						<p v-if="order.price" class="fs-5 m-0 neutral-01 p-0 price-block">
							{{ formatPrice(order.price) }}
						</p>
					</div>
				</div>
				<div
					v-if="order.btn"
					class="d-flex p-0 d-flex justify-content-end mt-2"
				>
					<button
						v-for="(btnItem, btnIndex) in order.btn"
						:key="btnIndex"
						class="btn btn-outline-primary px-4 flex-shrink"
						:class="{ 'me-2': btnIndex + 1 !== order.btn.length }"
						@click="btnItem.go ? $go(btnItem.go) : ''"
					>
						{{ btnItem.title }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import router from '@/router';

export interface BtnType {
	title: string;
	go: Object;
}

export interface OrderCardType {
	_id: string;
	products: { format: { image: string } }[];
	state: number;
	totalPrice: number;
	createdAt: string;
	delivery?: number;
}

export interface FormattedOrderCardType {
	btn: BtnType[];
	go: { name: string; params: { id: string } };
	img: string;
	title: string;
	state: number;
	price: number;
	product_count: number;
	delivery: number | undefined;
	date: { sDate: string };
}

const props = defineProps<{
	data: OrderCardType;
}>();

const formattedData = ref<FormattedOrderCardType[]>([]);

const formatCardData = (orderItem: OrderCardType): FormattedOrderCardType => {
	const commonData = {
		img:
			orderItem.products.length > 0 ? orderItem.products[0].format.image : '',
		title: orderItem._id,
		state: orderItem.state,
		price: orderItem.totalPrice,
		product_count: orderItem.products.length,
		delivery: orderItem.delivery,
		date: { sDate: orderItem.createdAt },
	};

	const getButtons = (routePath: string) => {
		const userButtons = [
			{
				title: '已收到貨',
				go: { name: 'UserOrderCheck', params: { id: orderItem._id } },
				showInStates: [1], // 待填符合的狀態值
			},
			{
				title: '立即評價',
				go: { name: 'UserOrderCheck', params: { id: orderItem._id } },
				showInStates: [2], // 待填符合的狀態值
			},
			{
				title: '查看評價',
				go: { name: 'UserOrderCheck', params: { id: orderItem._id } },
				showInStates: [3], // 待填符合的狀態值
			},
			{
				title: '查看訂單',
				go: { name: 'UserOrderCheck', params: { id: orderItem._id } },
				showInStates: [0, 1, 2, 3], // 一定要出現，包含各種狀態
			},
			{
				title: '聯絡賣家',
				go: { name: 'BuyerOrderCheck', params: { id: orderItem._id } },
				showInStates: [0, 1, 2, 3], // 一定要出現，包含各種狀態
			},
		];

		const sellerButtons = [
			{
				title: '查看訂單',
				go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
			},
			{
				title: '聯絡買家',
				go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
			},
		];

		if (routePath === '/seller') {
			return sellerButtons;
		} else {
			return userButtons.filter(
				btn => btn.showInStates.includes(orderItem.state) // 如果有被包含在上述的狀況就篩選出對應的按鈕
			);
		}
	};

	const routePath = router.currentRoute.value.matched[0].path;
	const buttons = getButtons(routePath);

	if (routePath === '/seller') {
		return {
			...commonData,
			go: { name: 'SellerOrderCheck', params: { id: orderItem._id } },
			btn: buttons,
		};
	} else {
		return {
			...commonData,
			go: { name: 'UserOrderCheck', params: { id: orderItem._id } },
			btn: buttons,
		};
	}
};

watch(
	() => props.data,
	newValue => {
		if (Array.isArray(newValue)) {
			formattedData.value = newValue.map(formatCardData);
		}
	},
	{ immediate: true, deep: true }
);

const getDeliveryMethod = (delivery: number | undefined): string => {
	switch (delivery) {
		case 1:
			return '宅配';
		case 2:
			return '黑貓宅急便';
		case 3:
			return '店到店';
		default:
			return '未填寫';
	}
};

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
