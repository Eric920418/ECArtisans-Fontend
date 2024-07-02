<template>
	<div class="col-12 card mb-4 p-4 py-5">
		<div class="row m-0 p-0 table-responsive overflow-visible">
			<!-- PS.手機板切的沒有很好看，我先放棄www -->
			<!-- 以下為商品修改 -->
			<div class="d-flex align-items-center justify-content-center">
				<div class="pe-3">
					<input type="checkbox" />
				</div>
				<div class="flex-grow-1">
					<div class="row m-0 p-0">
						<div
							class="col-12 col-md-7 m-0 p-0 d-flex align-items-center justify-content-start"
						>
							<h3 class="mb-0 fs-4 text-line-1">{{ seller.brand }}</h3>
						</div>
						<div
							class="col-12 col-md-5 mt-3 mt-md-0 px-0 d-flex align-items-center justify-content-center"
						>
							<div class="pe-3 d-none d-md-block col-3 m-0 p-0">單價</div>
							<div class="pe-3 d-none d-md-block col-6 m-0 p-0 text-center">
								數量
							</div>
							<div class="pe-3 d-none d-md-block col-3 m-0 p-0">價格</div>
						</div>
					</div>
				</div>
				<div class="" style="visibility: hidden">
					<button type="button" class="btn-close" aria-label="Close"></button>
				</div>
			</div>
			<div
				v-for="a in 3"
				:key="a"
				class="mt-4 mt-md-5 d-flex align-items-center justify-content-center"
			>
				<div class="pe-3">
					<input type="checkbox" />
				</div>
				<div class="flex-grow-1">
					<div class="row m-0 p-0">
						<div
							class="col-12 col-md-7 m-0 p-0 d-flex align-items-center justify-content-center"
						>
							<div class="col-2 flex-shrink-0 cartImg">
								<img
									:src="'images/shop/product1.png'"
									alt="..."
									class="img-eca"
								/>
							</div>
							<div class="px-3 flex-grow-1">
								<h4 class="text-line-2 fs-5 fw-bold">
									{{ items.product.productName }}
								</h4>
								<p class="text-line-2 mb-1">{{ items.format.title }}</p>
							</div>
						</div>
						<div
							class="col-12 col-md-5 mt-3 mt-md-0 px-0 d-flex align-items-center justify-content-center"
						>
							<div class="row m-0 p-0 w-100">
								<div class="pe-3 col-4 col-md-3 m-0 p-0" data-th="單價">
									${{ item.format.price }}
								</div>
								<div class="pe-3 col-4 col-md-6 m-0 p-0" data-th="數量">
									<!-- 當此商品數量不足 10 時 -->
									<!-- changeInput 實際使用請改為陣列，儲存該商品的數字狀態 -->
									<div class="dropdown" v-if="!changeInput">
										<button
											class="form-select form-select-sm d-flex align-items-center justify-content-center dropdown-toggle px-3"
											type="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<p class="text-start flex-fill mb-0">
												{{ item.quantity }}
											</p>
										</button>
										<ul class="dropdown-menu z-3">
											<li v-for="n in 10" :key="n">
												<a
													class="dropdown-item"
													@click="changeQuantity(n, item._id)"
												>
													{{ n === 10 ? '10+' : n }}
												</a>
											</li>
										</ul>
									</div>
									<!-- 當此商品數量為 10 時，改為輸入數字，且不再改變 -->
									<div v-else>
										<input
											class="form-control form-control-sm text-end me-0 hide-arrows"
											type="number"
											v-model="item.quantity"
										/>
									</div>
								</div>
								<div class="pe-3 col-4 col-md-3 m-0 p-0" data-th="價格">
									${{ item.format.price * item.quantity }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="">
					<button type="button" class="btn-close" aria-label="Close"></button>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const props = defineProps<{
	seller: {
		brand: string;
	};
	items: Array<{
		_id: string;
		product: {
			productName: string;
			image: string[];
		};
		format: {
			title: string;
			price: number;
		};
		quantity: number;
	}>;
}>();

// 假資料
// const fakeNum = ref<number>(1);

//判定是否切換的開關
const changeInput = ref<boolean>(false);

// 交換目前該商品的數量
// function changeQuantity(num: number) {
// 	console.log(num);
// 	fakeNum.value = num;
// 	if (num === 10) {
// 		changeInput.value = true;
// 	}
// }

function changeQuantity(num: number, itemId: string) {
	const item = props.items.find(item => item._id === itemId);
	if (item) {
		if (num === 10) {
			changeInput.value = true;
		} else {
			changeInput.value = false;
		}
		item.quantity = num;
	}
}

// const props = defineProps<{
// 	data: any;
// }>();
</script>
<style lang="scss">
.cartImg {
	width: 80px;
	height: 80px;
}

@media (max-width: 768px) {
	.fs-5 {
		font-size: 1em !important;
	}
	.table-responsive {
		font-size: 0.75em;
	}
	.table-responsive [data-th]::before {
		content: attr(data-th) ': ';
		font-weight: bold;
		// display: inline-block;
		// width: 100px; /* 這裡可以根據需要調整 */
	}

	.table-responsive .row > div {
		display: block;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 10px; /* 為了在小屏幕上有一些間距 */
	}
}
</style>
