<template>
	<div class="row justify-content-center align-items-center m-0 p-0">
		<div class="col-12 m-0 p-0">
			<Banner :data="funData" />
		</div>
		<div
			class="col-12 d-md-flex justify-content-md-center align-items-md-center my-5 m-0 p-0"
		>
			<div class="container" :class="{ 'container d-flex': resize >= 576 }">
				<div class="flex-shrink-1">
					<div class="shop-img" :class="{ 'w-100': resize >= 576 }">
						<img src="https://picsum.photos/id/117/1296/650" class="img-eca" />
					</div>
					<div>
						<font-awesome-icon
							:icon="['fas', 'circle-plus']"
							class="p-2 fs-3"
						/>
						<font-awesome-icon
							:icon="['fas', 'comment-dots']"
							class="p-2 fs-3"
						/>
					</div>
				</div>
				<div class="p-3 flex-grow-1">
					<h2>商家店名</h2>
					<p>最新公告 2023/02/12</p>
					<div>
						<p>最新消息</p>
					</div>
					<button type="button" class="btn btn-primary" @click="getCoupon">
						點我領取優惠卷
					</button>
				</div>
			</div>
		</div>
		<div
			class="col-12 d-flex justify-content-center align-items-center my-sm-3 my-md-5 p-0"
		>
			<div class="row container m-0 p-0">
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
import Card from '@/components/ProductCard.vue';
import Pagenation from '@/components/Pagenation.vue';
import { useResize } from '@/stores/index';
import { alertStore } from '@/main'; // 導入實例

const route = useRoute();
const router = useRouter();

const resize = useResize().resize;
interface ProductType {
	avatar: string;
	comment: string;
	company: string;
	name: string;
	sold: number;
	price: number;
	stars: number;
}
const ProductList = ref<ProductType[]>([
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 1.2,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},

	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user02.jpg?raw=true',
		comment: '讓我們一個月內提高10000個追踪者，客戶體驗反饋很正面！ ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 100,
		price: 100,
		stars: 2.3,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '可以用聊天機器人玩這麼豐富的行銷活動！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 1220,
		price: 100,
		stars: 3.6,
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 2.6,
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 2.2,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 130,
		price: 100,
		stars: 3.6,
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/40ae/f695/e5547364fad7cdc20181105b21f13ca9?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E5lf~SCzrEZPaG8NHjip5RNEiifTHGBN~JK-e6Akpy3KdYbeQdVTzPSBCZ5pgk96escSZlka2~dLIGum8ZNcupC9Pg70q2DH5V6NiLR9ZnuC5LaHt-7DmR91Xim~X2U2ujDuYX67GqihFFCUFO2rhGwwPeSWdTXoGcOy-A3RQivFQkS5G0SQIQ5yY9c3-8tSwWqcb6RGdlAnEtDnJas~r3ph-WivS53TdEFzV870EjOgEOcmLX8uz6JPr-U~vt3TAWeW26JLQexAi6v5UgXCFDHuUAch6WuTYzoicvcihnohmCALU6Xa7R4y8xD~wLSva-UAInZ8Phjf1tj1dw-dtQ__',
		comment: '【當日出貨】鞋子防水收納袋 加厚 升級版',
		company: '生活小舖',
		name: 'Lina執行長',
		sold: 5000,
		price: 100,
		stars: 5.0,
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 1.2,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
	{
		avatar:
			'https://s3-alpha-sig.figma.com/img/f443/14cb/95829dd257c8bbdc7bad432a3950f897?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NL6Zl40xRyI2F-B8kMnTb00FjuousDku2R182mh7DOyVFd6s6ugPN4fIG8TNJa0MFnKkD2q6Q6I1MFGI1wJu7loxezMpt-gcDfIMSG7N1c1jcSJK-WJVA8YgkwVQmYYnQVUWhfSywrr6jHezYHGcpbezAav-grhBYvHFDHZ8FDlDN73iCq0NX1CkrSwMYkAP8iYRcz8TH2VX~RFllrL6zM6NzlETuW0ab7T-c7rJvM6U1A-meiKRPe5NDz-cIbovJTLvUoWVl0oZRT8~vr7sQ6-JCy-pwDQ~zqFogelcqfIRQdHWB834y0xI0X5MvUJdkf4EBGgH6eaiWffkQK2Ecg__',
		comment: '【招財轉運】純銀 六字箴言 戒指 女生 ',
		company: 'subwhat行銷公司',
		name: 'Zoe活動長',
		sold: 20,
		price: 2000,
		stars: 4.3,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user03.jpg?raw=true',
		comment: '經營了好久的IG，一直無法提升粉絲數！ 太贊拉～',
		company: '油土伯',
		name: 'HowBig',
		sold: 100,
		price: 100,
		stars: 1.2,
	},
	{
		avatar:
			'https://github.com/hexschool/webLayoutTraining1st/blob/master/chatTalker_images/user01.jpg?raw=true',
		comment: '讓我們公司的產品以更活潑的方式讓使用者認識。 ',
		company: '清心寡欲設計公司',
		name: 'Lina執行長',
		sold: 100,
		price: 100,
		stars: 5.0,
	},
]);

const funData = ref([
	{
		cols: 6,
		cols_sm: 6,
		cols_md: 3,
		cols_lg: 2,
		name: '娛樂',
		url: 'images/index/01-clothing.png',
	},
	{
		cols: 6,
		cols_sm: 6,
		cols_md: 3,
		cols_lg: 2,
		name: '運動',
		url: 'images/index/02-sports.png',
	},
	{
		cols: 12,
		cols_sm: 12,
		cols_md: 6,
		cols_lg: 3,
		data: [
			{
				cols: 4,
				cols_sm: 4,
				cols_md: 4,
				cols_lg: 4,
				name: '食品',
				url: 'images/index/03-food.png',
			},
			{
				cols: 4,
				cols_sm: 4,
				cols_md: 4,
				cols_lg: 4,
				name: '生活用品',
				url: 'images/index/04-DailyNecessities.png',
			},
			{
				cols: 4,
				cols_sm: 4,
				cols_md: 4,
				cols_lg: 4,
				name: '娛樂',
				url: 'images/index/05-entertainment.png',
			},
			{
				cols: 12,
				cols_sm: 12,
				cols_md: 12,
				cols_lg: 12,
				name: '家具',
				url: 'images/index/06-furniture.png',
			},
		],
	},
	{
		cols: 4,
		cols_sm: 4,
		cols_md: 4,
		cols_lg: 2,
		name: '3C電器',
		url: 'images/index/07-3C.png',
	},
	{
		cols: 4,
		cols_sm: 4,
		cols_md: 4,
		cols_lg: 2,
		name: '寵物',
		url: 'images/index/08-pet.png',
	},
	{
		cols: 4,
		cols_sm: 4,
		cols_md: 4,
		cols_lg: 1,
		name: '清潔用品',
		url: 'images/index/09-clean.png',
	},
]);

// 封裝分類邏輯的函數，想要入口統一，之後比較好撰寫內容
function categorized(allData: ProductType[]) {
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
	console.log(data.length);
	return data;
}

// 接收篩選後的結果
const filteredData = computed(() => categorized(ProductList.value));

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
	console.log(query);
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

onMounted(() => {
	// // 因為要設置路由守衛 會有抓資料的問題，判斷改在這裡獲取 navTabs 的資料
	// if (route.matched[0].path === '/seller') {
	// 	navTabs.value = {
	// 		title: sellerTitleData.title,
	// 		schedule: sellerTitleData.schedule,
	// 		btn: { title: '新增優惠劵', path: { name: 'SellerCouponNew' } },
	// 	};
	// 	userStore.getCouponAll();
	// }
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
</style>
