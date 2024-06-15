<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs :data="navTabs" />
			<v-form @submit="onSubmit" v-slot="{ errors }" class="m-0 p-0">
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 表格 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<!-- @submit="onSubmit" -->
						<div
							class="d-flex justify-content-between align-items-center mb-4 p-0"
						>
							<h3 class="fs-5 p-0 neutral-01 mb-0">{{ init.schedule }}</h3>
							<a class="mb-0" v-if="route.name === 'SellerActivityCheck'">
								立即停止
							</a>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								封面圖片
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex" style="margin-bottom: 34px">
								<div class="card-newImg" @click="uploadFile">
									<font-awesome-icon :icon="['fas', 'image']" />
									<p>選擇圖片</p>
									<p>(n/n)</p>
								</div>
								<input
									class="form-control"
									type="file"
									id="formFile"
									ref="inputFieldRef"
									hidden
									@change="getFile"
									autocomplete="photo"
									accept="image/*"
								/>
								<div class="card-directions">
									<ul>
										<li>圖片大小：600 x 600</li>
										<li>檔案限制：JPEG, PNG</li>
										<li>拖拉商品圖片至第一張以設定封面圖片</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								封面圖片
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex" style="margin-bottom: 34px">
								<div class="card-newImg-disabled">
									<font-awesome-icon :icon="['fas', 'image']" />
									<p>選擇圖片</p>
									<p>(n/n)</p>
								</div>
								<div class="card-directions">
									<ul>
										<li>封面照片將自動顯示上方第一張商品圖片</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								名稱
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="couponName"
								name="名稱"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['名稱'] }"
								rules="required"
								v-model="newData.activity_name"
								aria-label="名稱"
								placeholder="請輸入活動/公告名稱"
							></v-field>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="start_date" class="mb-1">
								發布日期
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex">
								<div>
									<v-field
										id="start_date"
										name="起始日"
										type="date"
										class="form-control col-2"
										:class="{ 'is-invalid': errors['起始日'] }"
										rules="startDate|required"
										v-model="newData.start_date"
										aria-label="起始日"
										placeholder="請輸入優惠卷使用期限"
									></v-field>
									<p class="fs-12">* 開始於每日 00:00:00</p>
									<error-message
										name="起始日"
										class="invalid-feedback"
									></error-message>
								</div>
								<p class="mx-3 fs-3">~</p>
								<div>
									<v-field
										id="end_date"
										name="到期日"
										type="date"
										class="form-control col-2"
										:class="{ 'is-invalid': errors['到期日'] }"
										rules="endDate:起始日|required"
										v-model="newData.end_date"
										aria-label="到期日"
										placeholder="請輸入優惠卷使用期限"
									></v-field>
									<p class="fs-12">* 結束於每日 23:59:59</p>
									<error-message
										name="到期日"
										class="invalid-feedback"
									></error-message>
								</div>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<p>
								發布
								<span class="text-danger">*</span>
							</p>
							<div class="d-flex">
								<v-field
									class="form-check-input me-2"
									type="radio"
									v-model="newData.activity_type"
									:class="{ 'is-invalid': errors['type'] }"
									id="announcement"
									name="type"
									rules="policy|required"
									value="公告"
									as="input"
								></v-field>
								<label class="form-check-label me-4" for="announcement">
									公告
								</label>
								<v-field
									class="form-check-input me-2"
									type="radio"
									v-model="newData.activity_type"
									:class="{ 'is-invalid': errors['type'] }"
									id="activity"
									name="type"
									rules="policy|required"
									value="活動"
									as="input"
								></v-field>
								<label class="form-check-label" for="activity">活動</label>
							</div>
						</div>

						<div class="col-12 p-0 m-0 mb-2">
							<label class="mb-1 me-3">
								注意事項
								<span class="text-danger">*</span>
							</label>
							活動折扣金額以結算時為準,不可與其他優惠同時使用。
							<v-field
								v-slot="{ field, errors }"
								v-model="newData.activity_info"
								name="comment"
								rules="required"
							>
								<textarea
									v-bind="field"
									class="form-control"
									:class="{ 'is-invalid': errors[0] }"
									name="comment"
									style="height: 6.5em; resize: none"
								/>
							</v-field>
						</div>
						<p class="text-wrap">
							{{ newData }}
						</p>
					</div>
				</div>
				<div
					class="col bg-white p-3 px-sm-5 mx-0 mx-md-3 rounded-0 sticky-bottom d-flex justify-content-end"
				>
					<button
						type="button"
						class="btn btn-outline-primary px-5 mx-1 mx-sm-2 me-md-4"
						@click="router.back()"
					>
						取消
					</button>
					<button type="submit" class="btn btn-primary px-5 m-0 ms-1 ms-sm-2">
						{{ init.btn }}
					</button>
				</div>
			</v-form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useCoupon, useAuthStore, getDate, useResize } from '@/stores/index';
import NavTabs from '../components/NavTabs.vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const { resize } = useResize();

const route = useRoute();
const authStore = useAuthStore();
const userStore = useCoupon();

// 完成後送出
function onSubmit() {
	console.log('成功');
}

// 基本
const token = authStore.token;
const id = authStore.id;
// const data = ref(userStore.allData) as any;
const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

// 刪除
// function inputBadgeClose(id: string) {
// 	newData.value.productChoose?.filter(item => item !== id);
// 	// newData.value.productChoose = newData.value.productChoose?.filter(
// 	// 	item => item !== id
// 	// );
// }

// 回傳的假資料格式
export interface CouponNewDataType {
	activity_id: string | null;
	activity_name: string | null;
	activity_images: string | null;
	activity_type: string | null;
	activity_info: string | null;
	start_date: number | null;
	end_date: number | null;
	discount: string | null;
}
const data = ref({
	introduce: '',
});

// 回傳的假資料
const newData = ref<CouponNewDataType>({
	activity_id: '',
	activity_name: '',
	activity_images: '',
	activity_type: '',
	activity_info: '',
	start_date: null,
	end_date: null,
	discount: '',
	// activity_id: '20240318-00028',
	// activity_name: '滿千折百,最高折$500!',
	// activity_images:
	// 	'YWZkZmRnZmRnYXNkaGZhO2RzamdmZGxrZ2pma2wnZ2p3ZXBvaWZ3J29la0pSRmpmJ2RzZmY=',
	// activity_type: '活動',
	// activity_info:
	// 	'親愛的食客們, 隨著春風拂面,我們迎來了一場美食盛宴!2024年春日美食嘉年華即將於4月10日至4月15日盛大開幕!這將是一場讓您的味蕾狂歡的盛宴,一個讓您品味各國美食的絕佳機會! 我們的網上商城將為您帶來來自世界各地的頂級美食,從濃郁的義大利意粉到清新的日式壽司,從香辣的泰式料理到精緻的法式點心,應有盡有!我們的食品來源於最優質的供應商,保證新鮮、美味、安全! 在春日美食嘉年華期間,您還可以參加各種精彩的活動!我們將舉辦線上烹飪課程,讓您學習到各種國家的美食烹飪技巧;我們還有抽獎活動,豐富的獎品等您拿!無論您是美食愛好者還是廚藝高手,這都是您不容錯過的一次盛會! 請即訪問我們的網上商城,準備好迎接一場美食之旅!記得在4月10日至4月15日期間蒞臨,與我們一同共享春日美食嘉年華的樂趣! 期待與您共度美好時光!',
	// start_date: 202401200000,
	// end_date: 202402202359,
	// discount: '滿千折百',
});

// 會員頭像 --------------------
const inputFieldRef = ref<HTMLInputElement | null>(null); //上傳用的input

function uploadFile() {
	if (inputFieldRef.value) {
		inputFieldRef.value.click();
	}
}
function getFile() {
	let inputField = inputFieldRef.value;
	// 在這裡處理檔案上傳的邏輯
	if (inputField && inputField!.files) {
		let file = inputField.files[0];
		// 發api 傳回去 +token
		// userStore.getImgUrl(file, authStore.token);
	}
}

// navTab + seller 畫面下所有資料
const sellerTitleNewData = {
	routeName: 'SellerActivityNew',
	title: [
		{
			title: '活動管理',
			path: { name: 'SellerActivity', query: { page: 1 } },
		},
		{
			title: '新增活動/公告',
		},
	],
	schedule: '新增活動/公告', //目前頁面
	btn: '新增',
};

// navTab + seller 畫面下所有資料
const sellerTitleData = {
	routeName: 'SellerActivityNew',
	title: [
		{
			title: '活動管理',
			path: { name: 'SellerActivity', query: { page: 1 } },
		},
		{
			title: '修改活動',
		},
	],
	schedule: '修改活動', //目前頁面
	btn: '新增',
};

const navTabs = ref({}) as any;
const init2 = ref({
	shopTypeText: [
		'娛樂',
		'服飾',
		'3C產品',
		'食品',
		'家具',
		'運動',
		'寵物',
		'生活用品',
		'清潔用品',
		'其他',
	],
}) as any;
const init = ref({}) as any;
const getData = () => {
	if (route.matched[0].path === '/seller') {
		if (route.name === 'SellerActivityNew') {
			// 新增狀態
			init.value = sellerTitleNewData;
			navTabs.value = {
				title: sellerTitleNewData.title,
				schedule: sellerTitleNewData.schedule,
				breadcrumb: true,
			};
		} else if (route.name === 'SellerActivityCheck') {
			// 修改/查看狀態
			init.value = sellerTitleData;
			navTabs.value = {
				title: sellerTitleData.title,
				schedule: sellerTitleData.schedule,
				breadcrumb: true,
			};
		}
	} else if (route.matched[0].path === '/user') {
		// init.value = userTitleData;
	}
	// userStore.getActivityAll(id, page, token);
};
onMounted(() => {
	getData();
});
</script>

<style lang="scss" scoped>
.text-no {
	font-size: 0.75em;
}
.text-date {
	font-size: 0.875em;
}
.text-date {
	flex-shrink: 0; //禁止擠壓
}
.dropdown-menu {
	height: 250px;
	overflow-y: scroll;
	overflow-x: hidden;
	z-index: 10;
	position: sticky;
	@media (min-width: 768px) {
		height: 200px;
	}
}
</style>
