<template>
	<div class="row justify-content-center align-items-center m-0 p-0">
		<div class="col-12 m-0 p-0">
			<Banner :data="bannerList" />
		</div>
		<div
			class="col-12 d-md-flex justify-content-md-center align-items-md-center my-5 m-0 p-0"
		>
			<div class="container" :class="{ 'container d-flex': resize >= 576 }">
				<div class="flex-shrink-1" style="min-width: 200px">
					<div class="shop-img" :class="{ 'w-100': resize >= 576 }">
						<img :src="data.seller_image" class="img-eca" />
					</div>
					<div class="d-flex my-2">
						<!-- 開啟小鈴鐺?  -->
						<svg
							class="icon me-2"
							width="36"
							height="36"
							viewBox="0 0 36 36"
							fill="none"
							@click="addToFollow(data.seller_id)"
						>
							<!-- 背景↓ -->
							<rect width="36" height="36" rx="18" fill="#E4E9F2" />
							<path
								class="farBell"
								v-if="!follow"
								d="M10.8643 20.5665L10.8633 20.5677L10.3936 21.1479C10.393 21.1488 10.3923 21.1496 10.3917 21.1504C9.96095 21.6786 9.87934 22.406 10.1773 23.0147C10.474 23.6207 11.0915 24 11.7612 24H15.0787C15.0787 24.7993 15.3989 25.5654 15.9708 26.1283C16.5421 26.6906 17.3128 27 18.1104 27C18.908 27 19.6787 26.6906 20.25 26.1283C20.8219 25.5654 21.1421 24.7993 21.1421 24H24.4596C25.1293 24 25.7468 23.6207 26.0435 23.0147C26.3417 22.4056 26.2597 21.6776 25.8282 21.1493C25.8279 21.1488 25.8275 21.1484 25.8272 21.1479L25.3574 20.5707C25.3571 20.5704 25.3569 20.5701 25.3567 20.5698C24.6012 19.6366 24.1898 18.4804 24.1898 17.2938V16.5C24.1898 13.8722 22.4817 11.6523 20.1196 10.8357C20.0352 9.79496 19.1553 9 18.1104 9C17.0655 9 16.1856 9.79496 16.1012 10.8357C13.7391 11.6523 12.031 13.8722 12.031 16.5V17.2938C12.031 18.481 11.6192 19.6369 10.8643 20.5665Z"
							/>
							<path
								class="fasBell"
								v-else
								d="M10.8643 20.5665L10.8633 20.5677L10.3936 21.1479C10.393 21.1488 10.3923 21.1496 10.3917 21.1504C9.96095 21.6786 9.87934 22.406 10.1773 23.0147C10.474 23.6207 11.0915 24 11.7612 24H15.0787C15.0787 24.7993 15.3989 25.5654 15.9708 26.1283C16.5421 26.6906 17.3128 27 18.1104 27C18.908 27 19.6787 26.6906 20.25 26.1283C20.8219 25.5654 21.1421 24.7993 21.1421 24H24.4596C25.1293 24 25.7468 23.6207 26.0435 23.0147C26.3417 22.4056 26.2597 21.6776 25.8282 21.1493C25.8279 21.1488 25.8275 21.1484 25.8272 21.1479L25.3574 20.5707C25.3571 20.5704 25.3569 20.5701 25.3567 20.5698C24.6012 19.6366 24.1898 18.4804 24.1898 17.2938V16.5C24.1898 13.8722 22.4817 11.6523 20.1196 10.8357C20.0352 9.79496 19.1553 9 18.1104 9C17.0655 9 16.1856 9.79496 16.1012 10.8357C13.7391 11.6523 12.031 13.8722 12.031 16.5V17.2938C12.031 18.481 11.6192 19.6369 10.8643 20.5665Z"
							/>
						</svg>

						<!-- 聊聊?  -->
						<svg
							class="icon"
							width="36"
							height="36"
							viewBox="0 0 36 36"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<!-- 背景↓ -->
							<rect width="36" height="36" rx="18" fill="#E4E9F2" />
							<path
								class="farTalk"
								d="M13.4484 25.3137L13.4495 25.3132C14.0068 25.0708 14.5047 24.7955 14.9002 24.5443C15.869 24.8392 16.9132 24.9992 18.0005 24.9992C22.7672 24.9992 27 21.8264 27 17.4996C27 13.1729 22.7672 10 18.0005 10C13.2338 10 9.00093 13.1729 9.00093 17.4996C9.00093 19.0184 9.54096 20.4149 10.4393 21.5712C10.3489 21.9912 10.1704 22.3846 9.96733 22.722C9.81917 22.9651 9.67545 23.1577 9.57451 23.2808L9.57449 23.2808L9.56984 23.2865C9.52075 23.3473 9.48205 23.3905 9.45751 23.4173L9.44625 23.4295L9.44165 23.4349L9.43754 23.439L9.4375 23.439L9.42983 23.4468C9.01538 23.8705 8.87924 24.5078 9.11535 25.0744C9.34736 25.6313 9.89051 25.9992 10.5009 25.9992C11.5896 25.9992 12.6358 25.6657 13.4484 25.3137Z"
							/>
						</svg>
					</div>
				</div>
				<div class="p-3 flex-grow-1">
					<h2>{{ data.seller_name }}</h2>
					<div
						:class="{ 'multi-line-ellipsis': !isExpanded }"
						ref="textContainer"
						class="text-content"
					>
						<span>{{ data.seller_info }}</span>
					</div>
					<div v-if="showButton" class="mt-2">
						<button type="button" class="btn btn-link" @click="toggleExpand">
							{{ isExpanded ? '收起' : '展開' }}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center my-sm-3 my-md-5 p-0"
		>
			<div class="row container m-0 p-0 z-1">
				<div
					class="col-6 col-md-4 col-xl-3 px-2 py-3"
					v-for="(item, index) in paginatedData"
					:key="index"
				>
					<Card :item="item" />
				</div>
			</div>
		</div>
		<div class="col-12">
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
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Banner from '@/components/Banner.vue';
import Card from '@/components/ProductCardHome.vue';
import Pagenation from '@/components/Pagenation.vue';
import { alertStore } from '@/main'; // 導入實例
import {
	type SellerPageType,
	type SellerPageProductType,
	type RecommendShopType,
} from '../type/shopType';
import Swal from 'sweetalert2';
// stores
import {
	useShop,
	useProduct,
	useAuthStore,
	useResize,
	useCollect,
	go,
} from '@/stores/index';

const { resize } = useResize();
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const collectStore = useCollect();
const shopStore = useShop();

interface ProductType {
	avatar: string;
	comment: string;
	company: string;
	name: string;
	sold: number;
	price: number;
	stars: number;
}

const isUser = computed(() => {
	return authStore.accountType === 'user';
});

const isLoggedIn = computed(() => {
	return authStore.isLoggedIn;
});

const follow = ref(false); // 預設為未收藏 -> 待補完整資料

function goUserLogin() {
	Swal.fire({
		text: '請先加入會員',
		confirmButtonText: '確定',
		customClass: {
			confirmButton: 'sweetalert2-btn-primary',
		},
	}).then(result => {
		if (result.isConfirmed) {
			go({ name: 'UserLogin' });
		}
	});
}

const addToFollow = (shop_id: string) => {
	if (!isUser.value || !isLoggedIn.value) {
		goUserLogin();
	} else {
		follow.value = !follow.value;
		if (follow.value) {
			collectStore.addFollow(shop_id);
		} else {
			collectStore.deleteFollow(shop_id);
		}
	}
};

const isExpanded = ref(false);
const showButton = ref(false);
const textContainer = ref<HTMLElement | null>(null);

const toggleExpand = () => {
	isExpanded.value = !isExpanded.value;
};

const checkTextOverflow = () => {
	const el = textContainer.value;
	if (el) {
		// 實際內容高度與實際容器高度
		const actualHeight = el.scrollHeight;
		const containerHeight = el.clientHeight;
		// 比较高度决定是否顯示展開按鈕
		showButton.value = actualHeight > containerHeight;
	}
};

// 封裝分類邏輯的函數，想要入口統一，之後比較好撰寫內容
function categorized(allData: SellerPageProductType[]) {
	let data = allData;
	let filterText = navTabs.value.schedule; //固定篩選條件

	// //如果要更多篩選條件 可寫在這裡
	// if (filterText === '2') {
	// 	data = data.filter(item => {
	// 		const { endDate, isEnabled } = item; // 從 item 中取出 endDate 和 isEnabled
	// 		if (isEnabled && endDate) {
	// 			// 將 endDate 轉換為 Date 對象
	// 			const endDateObj = new Date(endDate);
	// 			const today = new Date(); // 獲取當前日期
	// 			return endDateObj >= today; // 比較 endDate 是否早於當前日期
	// 		}
	// 		return false;
	// 	});
	// }
	// if (filterText === '3') {
	// 	data = data.filter(item => {
	// 		const { endDate, isEnabled } = item; // 從 item 中取出 endDate 和 isEnabled
	// 		if (isEnabled && endDate) {
	// 			// 將 endDate 轉換為 Date 對象
	// 			const endDateObj = new Date(endDate);
	// 			const today = new Date(); // 獲取當前日期
	// 			return endDateObj < today; // 比較 endDate 是否早於當前日期
	// 		}
	// 		return false;
	// 	});
	// }
	// if (filterText === '4') data = data.filter(itme => itme.isEnabled === false);

	if (data.length > 1) {
		data.sort((a, b) => {
			// 先按 isEnabled 排序，true 在前
			// if (a.isEnabled && !b.isEnabled) return -1;
			// if (!a.isEnabled && b.isEnabled) return 1;

			// // 然后按 isEnabled && $dayAndToDay(endDate, '<=') 排序，true 在前
			// const aEndDateValid = a.isEnabled && dayAndToDay(a.endDate, '<=');
			// const bEndDateValid = b.isEnabled && dayAndToDay(b.endDate, '<=');

			// if (aEndDateValid && !bEndDateValid) return -1;
			// if (!aEndDateValid && bEndDateValid) return 1;

			// // 最后按 isEnabled && $dayAndToDay(startDate, '>=') 排序，true 在前
			// const aStartDateValid = a.isEnabled && dayAndToDay(a.startDate, '>=');
			// const bStartDateValid = b.isEnabled && dayAndToDay(b.startDate, '>=');

			// if (aStartDateValid && !bStartDateValid) return -1;
			// if (!aStartDateValid && bStartDateValid) return 1;

			// 如果都相同，保持原顺序
			return 0;
		});
	}
	return data;
}
const data = computed(() => shopStore.sellerHomeData);
// 接收篩選後的結果
const filteredData = computed(() => categorized(shopStore.sellerProductsData));

// 接收商家banner資料
const bannerList = computed(() => shopStore.bannerData);

// 如果是 seller 的 navTabs 資料
const sellerTitleData = {
	routeName: 'SellerCoupon',
	title: [
		{
			title: '全部',
			path: { name: 'SellerCoupon', query: { page: 1, type: '1' } },
		},
		{
			title: '未結束',
			path: { name: 'SellerCoupon', query: { page: 1, type: '2' } },
		},
		{
			title: '結束',
			path: { name: 'SellerCoupon', query: { page: 1, type: '3' } },
		},
		{
			title: '停止',
			path: { name: 'SellerCoupon', query: { page: 1, type: '4' } },
		},
	],
	schedule: computed(() => {
		return (route.query.type as string) || '1';
	}),
};
const navTabs = ref({}) as any;

const getCoupon = () => {
	alertStore.success('couponOK');
	// 待補新增邏輯
	// 待補不能重複領取的邏輯
};

const currentPage = computed(() => parseInt(route.query.page as string) || 1);
const perPage = ref(8); // 一頁要顯示多少的項目數量
const totalRows = computed(() => filteredData.value.length); // 總項目數量
const maxPage = computed(() =>
	Math.ceil(filteredData.value.length / perPage.value)
);

// 當currentPage或perPage改變時重新計算當前頁的資料
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * perPage.value;
	const end = start + perPage.value;
	return filteredData.value.slice(start, end);
});

// 更新頁碼
const updatePage = (page: number) => {
	const query = { ...route.query, page: page.toString() };
	router.push({ path: route.path, query });
};

// 全局的路由前置守衛，處理篩選條件不存在或資料為空的情況
router.beforeEach((to, from, next) => {
	const { query } = to;
	const page = parseInt(query.page as string) || 1;
	const filterType = (query.type as string) || '1';

	// 確保 navTabs.title 是一個有效的陣列
	if (Array.isArray(navTabs.value.title) && navTabs.value.title.length > 0) {
		// 判斷目標文字是否存在於 path.query.type 中
		const isInNavTabs = navTabs.value.title.some(
			(tab: any) => tab.path.query.type === filterType
		);

		// 篩選條件不存在的情況
		// if (!isInNavTabs) {
		// 	next({ path: to.path, query: { page: '1', type: '1' } });
		// 	return;
		// }
		if (page > maxPage.value) {
			// 判斷大於目前最大的頁數
			next({ path: to.path, query: { page: 1 } });
			return;
		}
	}

	next();
});

onMounted(async () => {
	await shopStore.getShop(route.params.id as string);
});

onMounted(async () => {
	await shopStore.getShopProducts(route.params.id as string);
});

onMounted(() => {
	checkTextOverflow();
});
</script>
<style lang="scss" scoped>
.shop-img {
	width: 100%;
	height: 200px;
	@media (min-width: 576px) {
		width: 200px;
	}
}

.multi-line-ellipsis {
	display: -webkit-box;
	-webkit-line-clamp: 3; /* 最多顯示幾行 */
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
