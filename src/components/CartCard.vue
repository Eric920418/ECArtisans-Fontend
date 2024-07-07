<template>
	<div class="col-12 card shadow-sm mb-4 p-4 py-5">
		<div class="row m-0 p-0 table-responsive overflow-visible">
			<div class="d-flex align-items-center justify-content-center">
				<div class="pe-3" v-if="!check">
					<input type="checkbox" v-model="isAllSelected" />
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
				:key="item.product._id + '-' + item.format._id"
				class="mt-4 mt-md-5 d-flex align-items-center justify-content-center"
			>
				<div class="pe-3" v-if="!check">
					<input
						type="checkbox"
						v-model="item.selected"
						:disabled="item.format.stock === 0"
					/>
				</div>
				<div class="flex-grow-1">
					<div class="row m-0 p-0">
						<div
							class="col-12 col-md-7 m-0 p-0 d-flex align-items-center justify-content-center"
						>
							<div class="col-2 flex-shrink-0 cartImg">
								<img :src="item.format.image" alt="..." class="img-eca" />
							</div>
							<div class="px-3 flex-grow-1">
								<h4
									class="text-line-2 fs-5 fw-bold hover-icon"
									@click="
										$go({
											name: 'ShopProduct',
											params: { id: item.product._id },
										})
									"
								>
									{{ item.product.productName }}
								</h4>
								<div class="d-flex">
									<p
										v-if="item.format.color[0]"
										class="text-line-2 mb-1 neutral-02 me-3"
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
											:disabled="check"
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
											:disabled="check"
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

									<div v-else>
										<input
											class="form-control form-control-sm text-end me-0 hide-arrows"
											type="number"
											v-model="item.quantity"
											:disabled="check"
											@input="
												handleQuantityInput(
													index,
													$event,
													parseInt(item.format.stock.toString())
												)
											"
										/>
										<br />
									</div>
								</div>
								<div
									class="pe-3 col-4 col-md-3 m-0 p-0 text-end pe-5"
									data-th="價格"
								>
									{{
										item.format.stock === 0
											? '0'
											: parseInt(item.quantity.toString()) *
												parseInt(item.format.price.toString())
									}}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="!check && item.format._id">
					<button
						type="button"
						class="btn-close"
						aria-label="Close"
						@click="handleDeleteItem(item.product._id, item.format._id)"
					></button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/index';
import { type CartSellerType } from '@/type/orderType';
const props = defineProps<{
	data: CartSellerType;
	check: boolean;
}>();

const emit = defineEmits<{
	(event: 'update-items', data: any): void;
	(event: 'delete-item', index: any): void;
}>();

const changeInput = ref<boolean[]>(Array(props.data.items.length).fill(false));
const store = useCartStore();
const router = useRouter();

// 确保每个商品都有 selected 属性
props.data.items.forEach(item => {
	if (typeof item.selected === 'undefined') {
		item.selected = false;
	}
});

// 计算是否所有项目都被选中
const isAllSelected = computed({
	get() {
		return props.data.items.every(item => item.selected);
	},
	set(value) {
		props.data.items.forEach(item => {
			item.selected = value;
		});
	},
});

function toggleAll() {
	const allSelected = isAllSelected.value;
	props.data.items.forEach(item => {
		item.selected = !allSelected;
	});
}

function changeQuantity(index: number, num: number) {
	if (props.data.items[index].format.stock > 10 && num === 10) {
		changeInput.value[index] = true;
	}
	props.data.items[index].quantity = num;
	updateCartItem(index);
}

function handleQuantityInput(index: number, event: any, maxNum: number) {
	const inputValue = parseInt(event.target.value);
	if (inputValue > maxNum) {
		props.data.items[index].quantity = maxNum;
	} else if (inputValue === 0 || event.target.value === '') {
		props.data.items[index].quantity = 1;
	} else {
		props.data.items[index].quantity = inputValue;
	}
	updateCartItem(index);
}

function updateCartItem(index: number) {
	const item = props.data.items[index];
	const data = {
		quantity: item.quantity,
	};
	// 即時更新購物車 api 我清除，因為選取的項目會消失。
	// if (item.format._id) {
	// 	store.updateItemInCart(data, item.product._id, item.format._id);
	// }
	emit('update-items', props.data);
}

function handleDeleteItem(productId: string, formatId: string) {
	store.removeItemFromCart(productId, formatId);
	emit('delete-item', productId);
}
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
	}

	.table-responsive .row > div {
		display: block;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 10px;
	}
}
</style>
