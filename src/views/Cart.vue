<template>
	<div class="container">
		<!-- PS.之後會補其他頁面的進度條，如果你有空補也可以補一下 -->
		<div class="row px-3 m-0 justify-content-center align-items-center">
			<div class="col-8 my-3">
				<div class="position-relative m-4">
					<div
						class="progress"
						role="progressbar"
						aria-label="Progress"
						aria-valuenow="50"
						aria-valuemin="0"
						aria-valuemax="100"
						style="height: 1px"
					>
						<div class="progress-bar" style="width: 0%"></div>
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
		<!-- <h2 class="fs-3 my-3 mt-4 px-3">購物車</h2> -->
		<div class="row px-3 m-0 mt-4">
			<div class="col-12 col-lg-9">
				<div class="row">
					<CartCard
						v-for="(cart, index) in cartGroups"
						:key="index"
						:seller="cart.seller"
						:items="cart.items"
					/>
				</div>
			</div>
			<div class="col-6 col-lg-3 p-0 mb-5 ps-lg-5">
				<div class="card p-3">
					<!-- 如果無法計算，或不方便，感覺可以只留下【選取商品數量】 -->
					<h2 class="mb-3">訂單摘要</h2>
					<div>
						<!-- 選取商品數量，以 商品名稱 計算數量 -->
						<p class="mb-2 fs-6">
							已選取
							<span>{{ totalItems }}</span>
							個商品
						</p>
					</div>
					<div>
						<p class="mb-2 fs-6 d-flex justify-content-between">
							運費總計
							<span>${{ totalFare }}</span>
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
				@click="$go({ name: 'CartCheck' })"
			>
				確認訂單
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';
// 組件
import CartCard from '@/components/CartCard.vue';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
// const fakeDate = {
// 	carts: [
// 		{
// 			id: '-LATwxc_bIJu-AR4AlNj',
// 			product: {
// 				product_id: '560165060adf',
// 				seller_id: '5465461sda',
// 				productName: '草莓醬',
// 				category: '果醬',
// 				sellerCategory: '食品',
// 				format: [
// 					{
// 						title: '草莓',
// 						cost: 50,
// 						price: 150,
// 						color: '紅色',
// 						qty: 2,
// 					},
// 				],
// 				introduce: '好吃的草莓醬',
// 				fare: 50,
// 				pay: 1,
// 				image: ['url1', 'url2', 'url3', 'url4'],
// 			},
// 			coupon: {
// 				title: '超級特惠價格',
// 				coupon_id: '546sdf1sda',
// 				seller_id: '5465461sda',
// 				start_date: 1694705214,
// 				due_date: 6547658,
// 				priceOver: 300,
// 				productType: 0,
// 				is_enabled: 1,
// 				percentage: 80,
// 			},
// 			total: 300,
// 			finalTotal: 240,
// 		},
// 		{
// 			id: '-LATwxc_bIJu-AR4AlNj',
// 			product: {
// 				product_id: '560165060adf',
// 				seller_id: '5465461sda',
// 				productName: '草莓醬333333',
// 				category: '果醬',
// 				sellerCategory: '食品',
// 				format: [
// 					{
// 						title: '草莓',
// 						cost: 50,
// 						price: 150,
// 						color: '紅色',
// 						qty: 2,
// 					},
// 				],
// 				introduce: '好吃的草莓醬',
// 				fare: 50,
// 				pay: 1,
// 				image: ['url1', 'url2', 'url3', 'url4'],
// 			},
// 			total: 300,
// 			finalTotal: 240,
// 		},
// 		{
// 			id: '-LATwxc_bIJu-AR4AlNj',
// 			product: {
// 				product_id: '560165060adf',
// 				seller_id: '5465461sda',
// 				productName: '草莓醬2222222222',
// 				category: '果醬',
// 				sellerCategory: '食品',
// 				format: [
// 					{
// 						title: '草莓',
// 						cost: 50,
// 						price: 150,
// 						color: '紅色',
// 						qty: 2,
// 					},
// 				],
// 				introduce: '好吃的草莓醬',
// 				fare: 50,
// 				pay: 1,
// 				image: ['url1', 'url2', 'url3', 'url4'],
// 			},
// 			coupon: {
// 				title: '超級特惠價格',
// 				coupon_id: '546sdf1sda',
// 				seller_id: '5465461sda',
// 				start_date: 1694705214,
// 				due_date: 6547658,
// 				priceOver: 300,
// 				productType: 0,
// 				is_enabled: 1,
// 				percentage: 80,
// 			},
// 			total: 300,
// 			finalTotal: 240,
// 		},
// 	],
// 	totalAll: 300,
// 	finalTotalAll: 240,
// };

onMounted(() => {
	cartStore.fetchCart();
});

const cartGroups = computed(() => cartStore.cart || []);
// const totalItems = computed(() =>
// 	cartGroups.value.reduce((sum, group) => sum + group.items.length, 0)
// );
// const totalFare = computed(() => {
// 	return cartGroups.value.reduce((sum, group) => {
// 		return (
// 			sum +
// 			group.items.reduce((itemSum, item) => itemSum + item.product.fare, 0)
// 		);
// 	}, 0);
// });
// const totalPrice = computed(() => {
// 	return cartGroups.value.reduce((sum, group) => {
// 		return (
// 			sum +
// 			group.items.reduce(
// 				(itemSum, item) => itemSum + item.format.price * item.quantity,
// 				0
// 			)
// 		);
// 	}, 0);
// });
</script>

<style lang="scss" scoped></style>
