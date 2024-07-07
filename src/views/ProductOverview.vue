<template>
	<div class="container">
		<div class="row mt-7">
			<!-- Sidebar for filters -->
			<div class="col-lg-2">
				<!-- Filter options -->
				<div class="card shadow-sm mb-4">
					<h3 class="fs-5 neutral-01 mb-0 me-3">篩選</h3>
					<div class="card-body">
						<!-- Discount Activities Dropdown -->
						<div class="mb-3">
							<label for="discountActivities" class="form-label">
								折價活動
							</label>
							<select
								v-model="filters.selectedDiscount"
								id="discountActivities"
								class="form-select"
							>
								<option value="">全部</option>
								<option value="折抵券">折抵券</option>
								<option value="免運券">免運券</option>
							</select>
						</div>

						<!-- Price Range Slider with vue-slider-component -->
						<div class="mb-3">
							<label for="priceRange" class="form-label">價格範圍</label>
							<vue-slider
								:min="minPrice"
								:max="maxPrice"
								v-model="filters.priceRange"
								:lazy="true"
								:dragging="true"
								:interval="100"
								tooltip="always"
								tooltip-placement="bottom"
								:enable-cross="false"
							></vue-slider>
						</div>
						<hr class="hr" />

						<!-- Origin Dropdown -->
						<div class="mb-3">
							<label for="origin" class="form-label">產地</label>
							<select
								v-model="filters.selectedOrigin"
								id="origin"
								class="form-select"
								multiple
							>
								<option
									v-for="origin in originOptions"
									:key="origin"
									:value="origin"
								>
									{{ origin }}
								</option>
							</select>
						</div>

						<!-- Color Dropdown -->
						<div class="mb-3">
							<label for="color" class="form-label">顏色</label>
							<select
								v-model="filters.selectedColor"
								id="color"
								class="form-select"
							>
								<option value="">全部</option>
								<option
									v-for="color in colorOptions"
									:key="color"
									:value="color"
								>
									{{ color }}
								</option>
							</select>
						</div>

						<!-- Reset Buttons -->
						<div class="d-grid gap-2">
							<button class="btn btn-secondary" @click="resetFilters">
								重設
							</button>
						</div>
					</div>
				</div>
				<!-- Sidebar for sorting  -->
				<!-- Sorting Options -->
				<div class="card shadow-sm mb-4">
					<h3 class="fs-5 neutral-01 mb-0 me-3">排序</h3>
					<div class="card-body">
						<select
							class="form-select mb-3"
							id="sortBy"
							v-model="filters.sortBy"
						>
							<option value="">預設排序</option>
							<option value="priceAsc">價格：低到高</option>
							<option value="priceDesc">價格：高到低</option>
						</select>
					</div>
				</div>
			</div>

			<!-- 商品卡 -->
			<div class="col-lg-10">
				<div class="row">
					<h3 class="fs-5 neutral-01 mb-0 me-3">
						共 {{ totalRows }} 樣關於
						<span :style="{ color: 'var(--bs-primary)' }">
							「 {{ $route.query.category || $route.query.keyword }} 」
						</span>
						的商品
					</h3>
					<!-- 上下間距加高 增加 z-1 把 card-line 推上來 如果不要 hover 就取消 z-1 -->
					<div
						v-for="(item, index) in paginatedData"
						:key="index"
						class="col-6 col-md-4 col-lg-4 col-xl-3 p-1 pb-4 m-0 z-1"
					>
						<Card :item="item" />
					</div>
					<div class="col-12 mt-5">
						<!-- 使用 Pagenation 子組件來顯示分頁 -->
						<!-- 當 Pagenation 組件中的頁碼更新時，子組件傳遞"update:currentPage"事件並觸發 updatePage 方法 -->
						<Pagenation
							:currentPage="currentPage"
							:perPage="perPage"
							:totalRows="totalRows"
							@update:currentPage="updatePage"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watchEffect, watch } from 'vue';
import Card from '@/components/ProductCardHome.vue';
import Pagenation from '@/components/Pagenation.vue';

import '../../node_modules/vue-slider-component/lib/theme/default.scss';
import { useRoute, useRouter } from 'vue-router';
// stores
import { useShop, useResize } from '@/stores/index';
const { resize } = useResize();

const route = useRoute();
const router = useRouter();

const shopStore = useShop();
const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};
const products = computed(() => {
	return shopStore.searchProductsData;
});

// Filter price slider default
const minPrice = ref(0);
const maxPrice = ref(10000);

// 計算所有產地選項
const originOptions = computed(() =>
	Array.from(
		new Set(
			products.value
				.map(product => product.origin) // 取得所有產地
				.filter(origin => origin) // 過濾空值
		)
	)
);

// 計算所有顏色選項
const colorOptions = computed(() =>
	Array.from(
		new Set(
			products.value.flatMap(product => product.color).filter(color => color)
		)
	)
);

const maxPriceF = computed(() => {
	const validPrices = products.value
		.map(product => product.price) // 取得所有價格
		.filter(price => typeof price === 'number'); // 過濾掉非數字的價格（假設價格為數字）

	if (validPrices.length === 0) {
		return 10000; // 如果沒有有效的價格，返回 null 或其他適合的默認值
	}

	// 使用 Math.max 方法找出最大的價格
	return Math.max(...validPrices);
});

// filter & sort condition
const filters = reactive({
	selectedDiscount: '',
	selectedOrigin: [] as string[],
	selectedColor: '',
	priceRange: [minPrice.value, maxPriceF.value],
	sortBy: '', // default sort
});
// Filtered products based on selected filters
const filteredProducts = computed(() => {
	let filteredData = products.value;
	// Apply filters based on selected options
	if (filters.selectedDiscount) {
		filteredData = filteredData.filter(product => {
			// Check if product.discount array includes the selected discount type
			return product.discount.includes(filters.selectedDiscount);
		});
	}

	if (filters.selectedOrigin.length > 0) {
		filteredData = filteredData.filter(product =>
			filters.selectedOrigin.includes(product.origin)
		);
	}
	if (filters.selectedColor) {
		filteredData = filteredData.filter(product => {
			// Check if product.discount array includes the selected discount type
			return product.color.some(item => filters.selectedColor.includes(item));
		});
	}

	// Filtering based on price range
	filteredData = filteredData.filter(
		product =>
			product.price >= filters.priceRange[0] &&
			product.price <= filters.priceRange[1]
	);

	// Sorting based on price
	if (filters.sortBy === 'priceAsc') {
		filteredData.sort((a, b) => a.price - b.price);
	} else if (filters.sortBy === 'priceDesc') {
		filteredData.sort((a, b) => b.price - a.price);
	}

	return filteredData;
});

// Reset filters function
const resetFilters = () => {
	filters.selectedDiscount = '';
	filters.selectedOrigin = [];
	filters.selectedColor = '';
	filters.priceRange = [minPrice.value, maxPrice.value];
	filters.sortBy = '';
};

const currentPage = computed(() => parseInt(route.query.page as string)) || 1;
const perPage = ref(8); // 一頁要顯示多少的項目數量
const totalRows = computed(() => filteredProducts.value.length); // 總項目數量
const maxPage = computed(() =>
	Math.ceil(filteredProducts.value.length / perPage.value)
);

// 當currentPage或perPage改變時重新計算當前頁的資料
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * perPage.value;
	const end = start + perPage.value;
	return filteredProducts.value.slice(start, end);
});

// 更新頁碼
const updatePage = (page: number) => {
	router.push({ query: { ...route.query, page: page.toString() } });
};

// 監聽 maxPage 的變化，如果小於當前頁碼，則重置為第一頁
watch(maxPage, newMaxPage => {
	if (currentPage.value > newMaxPage) {
		router.replace({ query: { ...route.query, page: '1' } });
		scrollToTop();
	}
});

// 轉換delivery為文字
const getCategoryID = (categoryName: string) => {
	switch (categoryName) {
		case '娛樂':
			return '1';
		case '服飾':
			return '2';
		case '3C產品':
			return '3';
		case '食品':
			return '4';
		case '家具':
			return '5';
		case '運動':
			return '6';
		case '寵物':
			return '7';
		case '生活用品':
			return '8';
		case '清潔用品':
			return '9';
		default:
			return '未知分類';
	}
};

onMounted(async () => {
	await fetchData(); // 初次加载时调用一次
	scrollToTop();
	resetFilters();
});

//监视路由的变化;
watch(
	() => route.query.category,
	async () => {
		await fetchData();
		scrollToTop();
		resetFilters();
	}
);

watch(
	() => route.query.keyword,
	async () => {
		await fetchData();
		scrollToTop();
		resetFilters();
	}
);

watch(
	() => route.query.page,
	newPage => {
		if (newPage === '0') {
			// 將 page 改为 1
			router.replace({ query: { ...route.query, page: '1' } });
		}
	}
);

async function fetchData() {
	if (route.query?.category as string) {
		const category = route.query.category as string;
		await shopStore.getAllProductsByCategoryID(getCategoryID(category));
	} else if (route.query?.keyword as string) {
		const keyword = route.query.keyword as string;
		await shopStore.getAllProductsByKeyword(keyword);
	} else {
		console.error(route.query);
	}
}
</script>

<style scoped>
/* Add custom styles as needed */
</style>
