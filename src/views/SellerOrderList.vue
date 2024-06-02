<template>
	<div>
		<h1>商家訂單管理</h1>
		<div v-if="isLoading">加載中...</div>
		<div v-else>
			<p v-if="orders.length === 0">没有訂單</p>
			<ul v-else>
				<li v-for="order in orders" :key="order._id">
					資料庫編號: {{ order._id }},訂單編號: {{ order.orderNumber }}, 金額:
					{{ order.price }}, 訂單狀態: {{ order.state }}, 支付方式:
					{{ order.pay }}, 交易日期: {{ order.date }}, 產品編號:
					<ul>
						<li v-for="product in order.products" :key="product._id">
							產品編號: {{ product }}
						</li>
					</ul>
					<button
						type="button"
						class="btn btn-primary"
						@click="handleOrderClick(order._id)"
					>
						查看此筆訂單
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useOrderStore } from '@/stores/index';
import router from '@/router/index';
import { type Order } from '@/type/orderType';

const orderStore = useOrderStore();

const isLoading = computed(() => orderStore.isLoading); // 從 store 中獲取加載狀態
const orders = computed((): Order[] | [] => orderStore.gettingAllOrders); // 從 store 中獲取所有訂單

const handleOrderClick = (orderId: string) => {
	orderStore.getOneOrderByOrderID(orderId).then(() => {
		router.push({ name: 'SellerOneOrder', params: { orderId } });
	});
};

// 註冊一個提取所有訂單的方法，先寫死的資料測試
onMounted(async () => {
	await orderStore.getAllOrders('661e0d13e8992a1bd4b86caf');
});
</script>
