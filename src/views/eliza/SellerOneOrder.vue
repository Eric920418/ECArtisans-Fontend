<template>
	<div v-if="order">
		<div v-if="isLoading">加載中...</div>
		<div v-else>
			<h1>訂單詳情</h1>
			<p>資料庫編號: {{ order._id }}</p>
			<p>訂單編號: {{ order.orderNumber }}</p>
			<p>交易日期: {{ order.date }}</p>
			<p>金額: {{ order.price }}</p>
			<p>支付方式: {{ order.pay }}</p>
			<div>
				<h2>產品列表</h2>
				<div v-for="product in order.products" :key="product._id">
					<h3>產品名稱: {{ product.productName }}</h3>
					<p>產品 ID: {{ product._id }}</p>
					<p>介紹: {{ product.introduce }}</p>
					<p>原產地: {{ product.origin }}</p>
					<p>材質: {{ product.ingredient }}</p>
					<div v-for="format in product.format" :key="format._id">
						<p :style="{ fontWeight: 'bold' }">規格: {{ format.title }}</p>
						<p>價格: {{ format.price }}</p>
						<p>成本: {{ format.cost }}</p>
						<p>庫存: {{ format.stock }}</p>
						<p>顏色: {{ format.color.join(', ') }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/index';
import { type Order } from '@/type/orderType';

// 接收'props'
const props = defineProps<{
	orderId: string;
}>();

const orderStore = useOrderStore();
const isLoading = computed(() => orderStore.isLoading); // 從 store 中獲取加載狀態
const { gettingSingleOrder } = storeToRefs(orderStore);
const order = computed((): Order | null => gettingSingleOrder.value); // 將從computed gettingSingleOrder取出的值定義好型態

onMounted(async () => {
	// pinia沒有這筆資料，就重新呼叫function
	if (!orderStore.oneOrder || orderStore.oneOrder._id !== props.orderId) {
		console.log('再度使用方法');
		await orderStore.getOneOrderByOrderID(props.orderId);
	}
});
</script>
