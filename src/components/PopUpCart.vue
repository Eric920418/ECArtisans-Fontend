<template>
	<div class="row m-0 p-0">
		<div class="col-12 col-md-7 mb-4 mb-md-0 ps-md-0 m-0">
			<SwiperGallery
				class="SwiperGallery"
				:data="data.image"
				:selected-img="selectedImage"
			/>
		</div>

		<div class="col-12 col-md-5">
			<!-- 輪播 右側 商品資訊 -->
			<div class="row m-0 p-0">
				<div
					class="col-12 m-0 p-0 d-flex justify-content-between align-items-start"
				>
					<h3 class="pe-3 m-0 text-line-2" v-if="data.productName">
						{{ data.productName }}
					</h3>

					<!-- <div
						class="favorites bg-neutral03 flex-shrink"
						@click="addToFavorites(data.products_id)"
					>
						需命名 icon + 後面的 farHeart 才會有hover
						<svg
							class="icon"
							width="24"
							height="24"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="-30 -30 572 572"
						>
							fasHeart:填滿紅色 farHeart:未填滿:hover
							<path
								class="farHeart"
								v-if="!favorited"
								d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
							/>
							<path
								class="fasHeart"
								v-else
								d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
							/>
						</svg>
					</div> -->
				</div>
				<!-- <div class="col-12 m-0 p-0 mt-2">
					<div class="d-flex flex-wrap m-0 p-0">
						<div class="d-flex">
							<Star :stars="data.star" />
							<div class="vr mx-2"></div>
						</div>
						<div class="d-flex">
							<span class="neutral-02">已出售&ensp;</span>
							{{ data.total_sales }}&ensp;人
							<div class="vr mx-2"></div>
						</div>
						<div>
							<span class="neutral-02">收藏人數&ensp;</span>
							{{ data.total_collect }}&ensp;人
						</div>
					</div>
				</div> -->

				<div
					v-if="fakeNorm === '請選擇…' && data.format && data.format[0]"
					class="col-12 m-0 p-0 my-4 fs-2 fw-bold text-start"
				>
					NT$&ensp;{{ data.format[0].price }}
				</div>
				<div v-else class="col-12 m-0 p-0 my-4 fs-2 fw-bold text-start">
					NT$&ensp;{{ nowPrice }}
				</div>
				<!-- <div
					class="col-12 m-0 p-0 d-flex justify-content-start align-items-center"
				>
					<div class="pe-3 fw-bold" style="width: calc(3em + 16px)">優惠劵</div>
					<div
						class="text-card-coupon btn-Bg-active rounded-1 text-primary mb-0 me-2"
						v-for="(discountIime, discountIndex) in data.discount"
						:key="discountIndex"
					>
						{{ discountIime }}
					</div>
				</div> -->
				<div
					class="col-12 m-0 p-0 d-flex flex-wrap mt-3 justify-content-start align-items-center"
				>
					<div class="pe-3 fw-bold" style="width: calc(3em + 16px)">數量</div>
					<div class="col-5">
						<!-- 當此商品數量不足 10 時 changeInput -->
						<!-- 實際使用請改為陣列，儲存該商品的數字狀態 -->
						<div class="dropdown" v-if="!changeInput">
							<button
								class="form-select form-select-lg d-flex align-items-center justify-content-start dropdown-toggle px-3"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p class="text-start flex-fill mb-0 fs-6">
									{{ fakeNum }}
								</p>
							</button>
							<ul v-if="getStock() > 10" class="dropdown-menu z-3">
								<li v-for="n in 10" :key="n">
									<a class="dropdown-item" @click="changeQuantity(n)">
										{{ n === 10 ? '10+' : n }}
									</a>
								</li>
							</ul>
							<ul v-else-if="getStock() <= 10" class="dropdown-menu z-3">
								<li v-for="n in getStock()" :key="n">
									<a class="dropdown-item" @click="changeQuantity(n)">
										{{ n }}
									</a>
								</li>
							</ul>
						</div>
						<!-- 當此商品數量為 10 時，改為輸入數字，且不再改變 -->
						<div v-else>
							<input
								class="form-control form-control-lg text-end me-0 hide-arrows fs-6"
								type="number"
								v-model="fakeNum"
								@input="checkValue(fakeNum, getStock())"
							/>
						</div>
					</div>
					<!-- 當數量小於 15 時，顯示 -->
					<!-- <div v-if="data.stock" class="ps-6 ps-xl-3 mt-1 mb-2 mb-xl-0">
						部份商品剩最後 {{ data.stock }} 件
					</div> -->
				</div>
				<div
					class="col-12 m-0 p-0 d-flex mt-3 justify-content-start align-items-center"
				>
					<div class="pe-3 fw-bold" style="width: calc(3em + 16px)">規格</div>
					<div class="col-5">
						<div class="dropdown">
							<button
								class="form-select form-select-lg d-flex align-items-center justify-content-center dropdown-toggle px-3"
								type="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<p
									class="text-start flex-fill mb-0 fs-6"
									:class="{
										'text-placeholder': fakeNorm === '請選擇…',
									}"
								>
									{{ fakeNorm }}
								</p>
							</button>
							<ul class="dropdown-menu z-3">
								<li
									v-for="(formatItme, formatIndex) in data.format"
									:key="formatIndex"
								>
									<button
										class="dropdown-item"
										:class="{ disabled: formatItme.stock === 0 }"
										v-if="formatItme.title"
										@click="
											formatItme.stock !== 0 ? changeNorm(formatItme) : ''
										"
									>
										<p>{{ formatItme.title }}</p>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-12 m-0 p-0 d-flex mt-5">
					<button
						type="button"
						class="col btn btn-outline-primary"
						@click="addItemToCart"
					>
						加入購物車
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, createApp, ref } from 'vue';

import {
	useProduct,
	useAuthStore,
	useCartStore,
	useCollect,
	go,
} from '@/stores/index';
import { alertStore } from '@/main'; // 導入實例

import { type ShopFormatType } from '@/type/orderType';
import { type collectType, type collectFormatType } from '../type/collectType';
import PopUpCart from './PopUpCart.vue'; // 假设 PopUpCart 是你的组件

import Swal from 'sweetalert2';
import SwiperGallery from '@/components/SwiperGallery.vue';

const cartStore = useCartStore();
const authStore = useAuthStore();
const isUser = computed(() => {
	return authStore.accountType === 'user';
});

const isLoggedIn = computed(() => {
	return authStore.isLoggedIn;
});

const props = defineProps<{
	data: collectType;
}>();
// 規格下拉選單 假資料
const fakeNorm = ref('請選擇…');
const nowPrice = ref(0);

const selectedNormId = ref('');
const selectedImage = ref<string | null>(null);
const fakeNum = ref<number>(1); // 默認數量為 1
//判定是否切換的開關
const changeInput = ref<boolean>(false);

// 交換目前該商品的數量
function changeQuantity(num: number) {
	fakeNum.value = num;
	if (num === 10) {
		changeInput.value = true;
	}
}
// 商品規格
const changeNorm = (normItem: any) => {
	fakeNorm.value = normItem.title;
	selectedNormId.value = normItem._id;
	nowPrice.value = normItem.price;
	selectedImage.value = normItem.image;
};
// 目前選擇的商品數量
const getStock = () => {
	if (!selectedNormId.value) {
		const maxStock = props.data.format.reduce(
			(max, item) => (item.stock > max ? item.stock : max),
			-Infinity
		);
		return maxStock;
	} else {
		const stock = props.data.format.reduce(
			(max, item) => (item._id === selectedNormId.value ? item.stock : max),
			-Infinity
		);
		if (fakeNum.value > stock) {
			fakeNum.value = stock;
		}
		return stock;
	}
};

// 送出訂單：
const addItemToCart = () => {
	if (!selectedNormId.value) {
		Swal.fire({
			icon: 'error',
			text: '請選擇一個規格',
			confirmButtonText: '確定',
			customClass: {
				confirmButton: 'sweetalert2-btn-primary',
			},
		}).then(() => {
			// 在错误信息弹窗关闭后，重新显示原始的弹窗
			Swal.fire({
				width: '80vw',
				showCloseButton: true,
				showConfirmButton: false,
				html: '<div id="modal" data="props.item" ></div>',
				didOpen: () => {
					const app = createApp(PopUpCart, { data: props.data });
					app.mount('#modal');
				},
			});
		});
		return;
	}

	const cartItem = {
		productId: props.data._id,
		formatId: selectedNormId.value,
		quantity: fakeNum.value,
	};
	try {
		cartStore.addItemToCart(cartItem);
		Swal.close();
	} catch (error) {
		console.error('Failed to add item to cart', error);
	}
};

function checkValue(num: number, max: number) {
	if (num > max) {
		fakeNum.value = max;
		alertStore.error('最大庫存為' + fakeNum.value);
	} else if (num < 1) {
		fakeNum.value = 1;
	}
}
</script>
<style lang="scss"></style>
