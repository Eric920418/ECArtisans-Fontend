<template>
	<div>
		<h1>商家訂單管理</h1>
		<div v-if="isLoading">加載中...</div>
		<div v-else>
			<p v-if="orders.length === 0">没有訂單</p>
			<ul v-else>
				<div v-for="order in orders" :key="order._id">
					<div v-for="product in order.products" :key="product._id">
						<div class="card mb-3 d-flex w-100" style="height: 50%">
							<div class="row g-3 mx-0 mb-0 pb-0">
								<div class="col-3">
									<img
										src="https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true"
										class="img-eca img-fluid h-100"
									/>
								</div>
								<div class="col-sm-9 col-md-9">
									<div class="card-body">
										<h5 class="card-title">交易日期: {{ order.date }}</h5>
										<h5 class="card-title">
											訂單編號: {{ order.orderNumber }}
										</h5>
										<h5 class="card-title">訂單狀態: {{ order.state }}</h5>
										<h5 class="card-title">總計: {{ order.price }}</h5>

										<p class="card-text">
											This is a wider card with supporting text below as a
											natural lead-in to additional content. This content is a
											little bit longer.
										</p>
										<p class="card-text">
											<small class="text-muted">Last updated 3 mins ago</small>
										</p>
									</div>
									<button
										type="button"
										class="btn btn-primary"
										@click="handleOrderClick(order._id)"
									>
										查看此筆訂單
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
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
// const orders = computed((): Order[] | [] => orderStore.gettingAllOrders); // 從 store 中獲取所有訂單
const handleOrderClick = (orderId: string) => {
	orderStore.getOneOrderByOrderID(orderId).then(() => {
		router.push({ name: 'SellerOneOrder', params: { orderId } });
	});
};

// 註冊一個提取所有訂單的方法，先寫死的資料測試
// onMounted(async () => {
// 	await orderStore.getAllOrders('661e0d13e8992a1bd4b86caf');
// });

const orders = [
	{
		_id: '6628b0217d9abcfe2fe8dd7c',
		orderNumber: '123',
		date: '2024/12/12',
		products: ['661e1795e8992a1bd4b86cb3', '661e1795e8992a1bd4b86cb2'],
		state: 1,
		price: 300,
		pay: 1,
	},
	{
		_id: '6628b0217d9abcfe2fe8dd7d',
		orderNumber: '124',
		date: '2024/12/13',
		products: ['661e1795e8992a1bd4b86cb4', '661e1795e8992a1bd4b86cb5'],
		state: 2,
		price: 400,
		pay: 2,
	},
	{
		_id: '6628b0217d9abcfe2fe8dd7e',
		orderNumber: '125',
		date: '2024/12/14',
		products: ['661e1795e8992a1bd4b86cb6', '661e1795e8992a1bd4b86cb7'],
		state: 3,
		price: 500,
		pay: 3,
	},
	{
		_id: '6628b0217d9abcfe2fe8dd7f',
		orderNumber: '126',
		date: '2024/12/15',
		products: ['661e1795e8992a1bd4b86cb8', '661e1795e8992a1bd4b86cb9'],
		state: 4,
		price: 600,
		pay: 4,
	},
	{
		_id: '6628b0217d9abcfe2fe8dd80',
		orderNumber: '127',
		date: '2024/12/16',
		products: ['661e1795e8992a1bd4b86cba', '661e1795e8992a1bd4b86cbb'],
		state: 5,
		price: 700,
		pay: 5,
	},
];
</script>
<style></style>
