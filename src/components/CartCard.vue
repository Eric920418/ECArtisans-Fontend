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
							<h3 class="mb-0 fs-4 text-line-1">{{ data.seller.brand }}</h3>
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
				v-for="(item, index) in data.items"
				:key="index"
				class="mt-4 mt-md-5 d-flex align-items-center justify-content-center"
			>
				<div class="pe-3">
					<input type="checkbox" :disabled="item.format.stock === 0" />
				</div>
				<div class="flex-grow-1">
					<div class="row m-0 p-0">
						<div
							class="col-12 col-md-7 m-0 p-0 d-flex align-items-center justify-content-center"
							@click="
								$go({ name: 'ShopProduct', params: { id: item.product._id } })
							"
						>
							<div class="col-2 flex-shrink-0 cartImg">
								<img :src="item.format.image" alt="..." class="img-eca" />
							</div>
							<div class="px-3 flex-grow-1">
								<h4 class="text-line-2 fs-5 fw-bold">
									{{ item.product.productName }}
								</h4>
								<div class="d-flex">
									<p
										v-if="item.format.color[0]"
										class="text-line-2 mb-1 neutral-02"
										style="width: 3em"
									>
										{{ item.format.color[0] }}
									</p>
									<p class="text-line-2 mb-1">{{ item.format.title }}</p>
								</div>
							</div>
						</div>

						<div
							class="col-12 col-md-5 mt-3 mt-md-0 px-0 d-flex align-items-center justify-content-center"
						>
							<div class="row m-0 p-0 w-100">
								<div class="pe-3 col-4 col-md-3 m-0 p-0" data-th="單價">
									{{ item.format.price }}
								</div>
								<div class="pe-3 col-4 col-md-6 m-0 p-0" data-th="數量">
									<!-- 當此商品數量不足 10 時 -->
									<!-- changeInput 實際使用請改為陣列，儲存該商品的數字狀態 -->
									<div class="dropdown" v-if="item.format.stock === 0">
										<button
											class="form-select form-select-sm d-flex align-items-center justify-content-center px-3"
											type="button"
											disabled
										>
											<p class="text-start flex-fill mb-0">缺貨中</p>
										</button>
									</div>
									<div
										class="dropdown"
										v-else-if="!changeInput[index] && item.format.stock <= 10"
									>
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
										<ul class="dropdown-menu z-5">
											<li v-for="num in item.format.stock" :key="num">
												<a
													class="dropdown-item"
													@click="changeQuantity(index, num)"
												>
													{{ num }}
												</a>
											</li>
										</ul>
									</div>
									<div class="dropdown" v-else-if="!changeInput[index]">
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
										<ul class="dropdown-menu z-5">
											<li v-for="num in 10" :key="num">
												<a
													class="dropdown-item"
													@click="changeQuantity(index, num)"
												>
													{{ num === 10 ? '10+' : num }}
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
											@input="
												handleQuantityInput(index, $event, item.format.stock)
											"
										/>
										<br />
									</div>
								</div>
								<!-- {{ item.format.stock }} -->
								<div
									class="pe-3 col-4 col-md-3 m-0 p-0 text-end pe-5"
									data-th="價格"
								>
									{{
										item.format.stock === 0
											? 0
											: item.quantity * item.format.price
									}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="">
					<button
						type="button"
						class="btn-close"
						aria-label="Close"
						@click="handleDeleteItem(index)"
					></button>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { defineProps, defineEmits } from 'vue';

interface Seller {
	_id: string;
	brand: string;
}

interface Product {
	_id: string;
	sellerOwned: Seller;
	productName: string;
	fare: number;
	pay: number[];
	image: string[];
}

interface Format {
	title: string;
	price: number;
	cost: number;
	stock: number;
	image: string;
	color: string[];
	_id: string;
}

interface Item {
	product: Product;
	format: Format;
	quantity: number;
	price: number;
	_id: string;
}

interface Data {
	seller: Seller;
	items: Item[];
}

const props = defineProps<{
	data: Data;
}>();

const emit = defineEmits(['update-items', 'delete-item']);

// 使用 ref 创建本地状态
const localData = ref(props.data);

const changeInput = ref<boolean[]>(
	new Array(props.data.items.length).fill(false)
);

const handleQuantityInput = (index: number, event: any, maxNum: number) => {
	const inputValue = parseInt(event.target.value, 10);

	if (isNaN(inputValue) || inputValue <= 0 || inputValue > maxNum) {
		localData.value.items[index].quantity = 1;
	} else {
		localData.value.items[index].quantity = inputValue;
	}

	emit('update-items', localData.value);
};

function changeQuantity(index: number, num: number) {
	localData.value.items[index].quantity = num;
	if (num === 10) {
		changeInput.value[index] = true;
	}
	emit('update-items', props.data);
}

const updateQuantity = (index: number) => {
	if (localData.value.items[index].quantity < 10) {
		changeInput.value[index] = false;
	}
	emit('update-items', localData.value);
};

const handleDeleteItem = (itemIndex: number) => {
	emit('delete-item', itemIndex);
};
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
