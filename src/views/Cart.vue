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
						:check="false"
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
						<p class="mb-2 fs-6 d-flex justify-content-between">
							小記
							<span>${{ totalPrice }}</span>
						</p>
					</div>
					<hr />
					<p class="d-flex justify-content-between">
						訂單總金額
						<span>${{ totalPrice + highestFare }}</span>
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
import { useCartStore, useAuthStore } from '@/stores/index';
import { alertStore } from '@/main'; // 導入實例
import Swal from 'sweetalert2';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const store = useCartStore();

const cart = computed(() => store.cart); // 獲取選取物件

const progress = computed(() => {
	// 計算進度條
	return 50;
});

const totalItems = computed(() => {
	// 計算總數量
	return cart.value.reduce(
		(total: any, shop: { items: string | any[] }) => total + shop.items.length,
		0
	);
});

const highestFare = computed(() => {
	const maxFare = cart.value.reduce((max: number, order: { items: any[] }) => {
		const maxFareInOrder = order.items.reduce((maxFareInItems, item) => {
			return item.selected && item.product.fare > maxFareInItems
				? item.product.fare
				: maxFareInItems;
		}, 0);
		return maxFareInOrder > max ? maxFareInOrder : max;
	}, 0);
	return maxFare;
});

const totalPrice = computed(() => {
	// 訂單總金額，只計算 selected === true 的項目
	return cart.value.reduce(
		(total: any, shop: { items: any[] }) =>
			total +
			shop.items.reduce(
				(subTotal, item) =>
					subTotal + (item.selected ? item.quantity * item.format.price : 0),
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

// 計算選定商品
const selectedItems = computed(() => {
	return {
		selectedItems: cart.value.flatMap((shop: { items: any[] }) =>
			shop.items
				.filter((item: { selected: any }) => item.selected)
				.map((item: { product: { _id: any }; format: { _id: any } }) => ({
					productId: item.product._id,
					formatId: item.format._id,
				}))
		),
	};
});

async function checkout() {
	const uniqueSellers = new Set();

	cart.value.forEach(
		(sellerObj: { items: any[]; seller: { _id: unknown } }) => {
			const selectedItems = sellerObj.items.filter(item => item.selected);
			if (selectedItems.length > 0) {
				uniqueSellers.add(sellerObj.seller._id);
			}
		}
	);

	const uniqueSellersCount = uniqueSellers.size;

	try {
		if (uniqueSellersCount > 1) {
			Swal.fire({
				icon: 'error',
				text: '目前無法一次結帳您選擇的全部商品,可能是不支援跨店結帳。您可以嘗試分開結帳後再試一次',
				customClass: {
					confirmButton: 'sweetalert2-btn-primary',
				},
			});
		} else {
			await store.selectedCart(selectedItems.value);
		}
	} catch (error) {
		console.error('選擇商品失敗:', error);
	}
}

onMounted(async () => {
	await store.getAllCart();
});
</script>
