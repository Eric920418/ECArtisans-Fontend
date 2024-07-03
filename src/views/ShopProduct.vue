<template>
	<div class="container">
		<div class="row m-0 p-0 mt-5 mb-6">
			<div class="col-12 m-0 p-0 mb-4 order-1 order-md-1">
				<div class="card p-4">
					<div class="row m-0 p-0">
						<div class="col-12 col-md-7 mb-4 mb-md-0 ps-md-0 m-0">
							<!-- 輪播 -->
							<SwiperGallery
								:data="data.products_images"
								v-if="data && data.products_images"
							/>
						</div>
						<div class="col-12 col-md-5" v-if="data">
							<!-- 輪播 右側 商品資訊 -->
							<div class="row m-0 p-0">
								<div
									class="col-12 m-0 p-0 d-flex justify-content-between align-items-start"
								>
									<h4 class="pe-3 m-0 text-line-2">{{ data.products_name }}</h4>

									<div
										class="favorites bg-neutral03 flex-shrink"
										@click="addToFavorites"
									>
										<!-- 需命名 icon + 後面的 farHeart 才會有hover -->
										<svg
											class="icon"
											width="24"
											height="24"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="-30 -30 572 572"
										>
											<!-- fasHeart:填滿紅色 farHeart:未填滿:hover -->
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
									</div>
								</div>
								<div class="col-12 m-0 p-0 mt-2">
									<div class="d-flex flex-wrap m-0 p-0">
										<div class="d-flex">
											<Star :stars="parseInt(data.star)" />
											<div class="vr mx-2"></div>
										</div>
										<div class="d-flex">
											<span class="neutral-02">已出售&ensp;</span>
											{{ data.total_sales }}&ensp;人
											<div class="vr mx-2"></div>
										</div>
										<div class="">
											<span class="neutral-02">收藏人數&ensp;</span>
											{{ data.total_collect }}&ensp;人
										</div>
									</div>
								</div>
								<div class="col-12 m-0 p-0 my-4 fs-2 fw-bold">
									NT$&ensp;{{ data.price }}
								</div>
								<div
									class="col-12 m-0 p-0 d-flex justify-content-start align-items-center"
								>
									<div class="pe-3 fw-bold" style="width: calc(3em + 16px)">
										優惠劵
									</div>
									<div
										class="text-card-coupon btn-Bg-active rounded-1 text-primary mb-0 me-2"
										v-for="(discountIime, discountIndex) in data.discount"
										:key="discountIndex"
									>
										{{ discountIime }}
									</div>
								</div>
								<div
									class="col-12 m-0 p-0 d-flex flex-wrap mt-3 justify-content-start align-items-center"
								>
									<div class="pe-3 fw-bold" style="width: calc(3em + 16px)">
										數量
									</div>
									<div class="col-5">
										<!-- 當此商品數量不足 10 時 -->
										<!-- changeInput 實際使用請改為陣列，儲存該商品的數字狀態 -->
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
											<ul v-if="data.stock > 10" class="dropdown-menu z-3">
												<li v-for="n in 10" :key="n">
													<a class="dropdown-item" @click="changeQuantity(n)">
														{{ n === 10 ? '10+' : n }}
													</a>
												</li>
											</ul>
											<ul
												v-else-if="data.stock <= 10"
												class="dropdown-menu z-3"
											>
												<li v-for="n in data.stock" :key="n">
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
												@input="checkValue(fakeNum, data.stock)"
											/>
										</div>
									</div>
									<!-- 當數量小於 15 時，顯示 -->
									<div class="ps-6 ps-xl-3 mt-1 mb-2 mb-xl-0">
										部份商品剩最後 {{ data.stock }} 件
									</div>
								</div>
								<div
									class="col-12 m-0 p-0 d-flex mt-3 justify-content-start align-items-center"
								>
									<div class="pe-3 fw-bold" style="width: calc(3em + 16px)">
										規格
									</div>
									<div class="col-5">
										<!-- 如果不好用在改一般的清單 -->
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
												<li v-for="normItem in fakeNormList" :key="normItem.id">
													<a
														class="dropdown-item"
														@click="changeNorm(normItem)"
													>
														<p>{{ normItem.name }}</p>
													</a>
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
									<hr style="margin: 0px 12px" />
									<button type="submit" class="col btn btn-primary">
										直接購買
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 商品介紹  -->
			<div
				class="col-12 col-md-8 m-0 p-0 mb-4 pe-md-4 order-3 order-md-2"
				v-if="data"
			>
				<div class="card p-5">
					<div class="mb-6">
						<div
							class="fs-5 text-primary fw-medium border-bottom border-primary pb-2 mb-4"
						>
							商品介紹
						</div>
						<!-- 不確定後端打出來的格式是否有換行符號  如果有 請找 white-space: pre-line //不確定值是否正確  -->
						<!-- white-space 可以完成換行，但前提是後端有提供換行符號，要找對應的CSS  -->
						<div class="" v-if="data.products_info">
							{{ data.products_info }}
						</div>
					</div>
					<div class="mb-6">
						<div
							class="fs-5 text-primary fw-medium border-bottom border-primary pb-2 mb-4"
						>
							商品資訊
						</div>

						<div class="">
							<div class="d-flex mb-2 mt-0">
								<div class="me-4 neutral-02" style="width: 4em">商品材質</div>
								<div class="me-4">{{ data.production_material }}</div>
							</div>
							<div class="d-flex mb-2 mt-3">
								<div class="me-4 neutral-02" style="width: 4em">製造方式</div>
								<div class="me-4">{{ data.production_method }}</div>
							</div>
							<div class="d-flex mb-2 mt-3">
								<div class="me-4 neutral-02" style="width: 4em">商品產地</div>
								<div class="me-4">{{ data.production_country }}</div>
							</div>
							<div class="d-flex mb-2 mt-3">
								<div class="me-4 neutral-02" style="width: 4em">庫存</div>
								<div class="me-4">{{ data.stock }}</div>
							</div>
							<div class="d-flex mb-0 mt-3">
								<div class="me-4 neutral-02" style="width: 4em">熱門度</div>
								<div class="me-4">
									共&ensp;{{ data.total_collect }}&ensp;人收藏
								</div>
							</div>
						</div>
					</div>
					<div class="mb-0">
						<div
							class="fs-5 text-primary fw-medium border-bottom border-primary pb-2 mb-4"
						>
							付款與運送資訊
						</div>

						<div class="">
							<div class="d-flex mb-2 mt-0">
								<div class="me-4 neutral-02" style="width: 4em">付款方式</div>
								<div class="me-4">{{ data.payment }}</div>
							</div>
							<div class="d-flex mb-2 mt-3">
								<div class="me-4 neutral-02" style="width: 4em">運費</div>
								<div class="me-4">NT$ {{ data.freight }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-4 m-0 p-0 mb-4 order-2 order-md-3">
				<div class="card p-0 overflow-hidden">
					<div
						class="w-100 d-flex align-items-end justify-content-start p-4 bg-img-eca-dack"
						style="height: 136px"
						:style="{
							'background-image': `url(images/shop/banner1.png)`,
						}"
					>
						<div class="text-white fw-medium">
							<div class="fs-5 text-line-1">
								星辰之耀 — 與你訂下幸福之約星辰之耀 — 與你訂下幸福之約
							</div>
							<div class="text-line-2">
								對戒系列限時優惠中 九折對戒系列限時優惠中 九折對戒系列限時優惠中
								九折對戒系列限時優惠中 九折對戒系列限時優惠中 九折
							</div>
						</div>
					</div>
					<div
						class="p-3 d-flex align-items-center justify-content-between border-bottom"
					>
						<div class="d-flex align-items-center justify-content-start">
							<div
								class="avatar"
								:style="{
									'background-image': `url(images/shop/banner1.png)`,
								}"
							></div>

							<div class="text-line-1 fw-medium">大夏製大夏製</div>
						</div>
						<div class="icon">
							<font-awesome-icon :icon="['fas', 'angle-right']" />
						</div>
					</div>
					<div class="p-3 d-flex">
						<button
							type="button"
							class="col btn btn-primary"
							style="visibility: hidden"
						>
							賣家聊聊
						</button>
						<hr style="margin: 0px 8px" />
						<button type="button" class="col btn btn-outline-primary">
							加入關注
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import SwiperGallery from '@/components/SwiperGallery.vue';
import Star from '@/components/Star.vue';
import { useProduct } from '@/stores/index';
// import router from '@/router';
import { useRoute, useRouter } from 'vue-router';
import { alertStore } from '@/main'; // 導入實例
import { useCartStore } from '@/stores/cartStore';
const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const store = useProduct();

const data = computed(() => store.shopData) as any;

//假圖片
const fakeImg = ref([
	{
		src: 'https://swiperjs.com/demos/images/nature-1.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-2.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-3.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-4.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-5.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-6.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-7.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-8.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-9.jpg',
	},
	{
		src: 'https://swiperjs.com/demos/images/nature-10.jpg',
	},
]);

const favorited = ref(false); // 預設為未收藏 -> 待補完整資料
const addToFavorites = () => {
	// 收藏用
	// favorited.value = !favorited.value;
	// if (favorited.value) {
	// 	// 待補新增邏輯
	// 	alertStore.success('focusProductOK');
	// } else {
	// 	// 待補刪除的邏輯
	// 	alertStore.success('focusProductFail');
	// }
};

const paramsId = route.params.id as string; // 從路由參數獲取 productId
// 數量下拉選單

// 假資料

//判定是否切換的開關
const changeInput = ref<boolean>(false);

// 交換目前該商品的數量
function changeQuantity(num: number) {
	console.log(num);
	fakeNum.value = num;
	if (num === 10) {
		changeInput.value = true;
	}
}

// 規格下拉選單 假資料
const fakeNorm = ref('請選擇…');

const fakeNormList = ref([
	{ id: '6676905db72f97fbc2b55616', name: '黑色，防水30米' },
	{ id: '667878fe90b7b2344f9ad486', name: 'asd' },
	// 其他規格
]);

const selectedNormId = ref('');
const fakeNum = ref<number>(1); // 默認數量為 1

// 交換目前該商品的數量
const changeNorm = (normItem: { id: string; name: string }) => {
	fakeNorm.value = normItem.name;
	selectedNormId.value = normItem.id;
};

const addItemToCart = () => {
	if (!selectedNormId.value) {
		alert('請選擇一個規格');
		return;
	}

	const cartItem = {
		productId: paramsId,
		formatId: selectedNormId.value,
		quantity: fakeNum.value,
	};
	console.log(cartItem);
	cartStore.addItemToCart(cartItem);
};

function checkValue(num: number, max: number) {
	if (num > max) {
		fakeNum.value = max;
		alertStore.error('最大庫存為' + fakeNum.value);
	} else if (num < 1) {
		fakeNum.value = 1;
	}
}
onMounted(() => {
	const paramsId = route.params.id as string;
	if (route.params.id) store.getShopProduct(paramsId);
});
</script>
<style lang="scss">
.favorites {
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 1px;
	border-radius: 50%;
	svg {
		width: 60%;
		height: 60%;
	}
}
</style>
