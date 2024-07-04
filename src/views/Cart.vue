<template>
	<div class="container">
		<!-- 进度条 -->
		<div class="row px-3 m-0 justify-content-center align-items-center">
			<div class="col-8 my-3">
				<div class="position-relative m-4">
					<div
						class="progress"
						role="progressbar"
						aria-label="Progress"
						:aria-valuenow="progress"
						aria-valuemin="0"
						aria-valuemax="100"
						style="height: 1px"
					>
						<div class="progress-bar" :style="{ width: progress + '%' }"></div>
					</div>
					<button
						type="button"
						class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						1
					</button>
					<button
						type="button"
						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						2
					</button>
					<button
						type="button"
						class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						3
					</button>
				</div>
			</div>
		</div>
		<!-- 商品列表 -->
		<div class="row px-3 m-0 mt-4">
			<div class="col-12 col-lg-9">
				<div class="row">
					<CartCard
						v-for="(shopItem, shopIndex) in cart"
						:key="shopItem.seller._id"
						:data="shopItem"
						@update-items="handleUpdateItems(shopIndex, $event)"
						@delete-item="handleDeleteItem(shopIndex, $event)"
					/>
				</div>
			</div>
			<!-- 订单摘要 -->
			<div class="col-6 col-lg-3 p-0 mb-5 ps-lg-5">
				<div class="card p-3">
					<h2 class="mb-3">訂單摘要</h2>
					<div>
						<p class="mb-2 fs-6">
							已選取
							<span>{{ totalItems }}</span>
							個商品
						</p>
					</div>
					<div>
						<p class="mb-2 fs-6 d-flex justify-content-between">
							運費總計
							<span>${{ highestFare }}</span>
						</p>
					</div>
					<hr />
					<p class="d-flex justify-content-between">
						訂單總金額
						<span>${{ totalPrice }}</span>
					</p>
				</div>
			</div>
		</div>
		<div
			class="col bg-white p-3 px-sm-5 mx-0 mx-md-3 rounded-0 sticky-bottom d-flex justify-content-end"
		>
			<button
				type="button"
				class="btn btn-primary px-5 m-0 mx-1 mx-sm-2"
				@click="checkout"
			>
				確認訂單
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CartCard from '@/components/CartCard.vue';
import { useCartStore } from '@/stores/index';

const route = useRoute();
const router = useRouter();
const store = useCartStore();

const cart = computed(() => store.cart); // 从 Pinia store 获取购物车数据

const progress = computed(() => {
	// 计算进度条的进度
	return 50;
});

const totalItems = computed(() => {
	// 计算总商品数量
	return cart.value.reduce((total, shop) => total + shop.items.length, 0);
});

const highestFare = computed(() => {
	const allFares = cart.value.flatMap(shop =>
		shop.items.map(item => item.product.fare)
	);
	return allFares.length > 0 ? Math.max(...allFares) : 0;
});

const totalPrice = computed(() => {
	// 计算订单总金额
	return cart.value.reduce(
		(total, shop) =>
			total +
			shop.items.reduce(
				(subTotal, item) => subTotal + item.quantity * item.format.price,
				0
			),
		0
	);
});

function handleUpdateItems(shopIndex: number, updatedItems: any) {
	if (updatedItems && updatedItems.items) {
		cart.value[shopIndex].items = updatedItems.items;
	}
}

function handleDeleteItem(shopIndex: number, itemIndex: number) {
	cart.value[shopIndex].items.splice(itemIndex, 1);
}

// 计算选定的商品

const selectedItems = computed(() => {
	return {
		selectedItems: cart.value.flatMap(shop =>
			shop.items
				.filter(item => item.selected)
				.map(item => ({
					productId: item.product._id,
					formatId: item.format._id,
				}))
		),
	};
});

async function checkout() {
	try {
		const responseData = await store.selectedCart(selectedItems.value);
		console.log(responseData);
		// router.push({
		// 	name: 'CartCheck',
		// 	params: {
		// 		orderData: JSON.stringify(responseData),
		// 	},
		// });
	} catch (error) {
		console.error('選擇商品失敗:', error);
	}
}

onMounted(async () => {
	await store.getAllCart(); // 从 Pinia 存储中获取所有购物车数据
});
</script>
