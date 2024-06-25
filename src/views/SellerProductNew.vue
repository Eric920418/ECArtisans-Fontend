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
							<div
								v-if="data._id"
								class="d-flex justify-content-center align-items-center"
							>
								<!-- ↓之後會靠邏輯判斷只會出現一個 -->
								<!-- <a class="a me-3" @click="deleteProduct()">
									刪除商品
								</a> -->
								<button
									disabled
									class="btn btn-primary px-4"
									v-if="data.isOnshelf === false"
									@click="isOnshelf(true)"
								>
									商品上架
								</button>
								<button
									disabled
									class="btn btn-primary px-4"
									v-if="data.isOnshelf === true"
									@click="isOnshelf(false)"
								>
									立即下架
								</button>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-4" v-if="data._id">
							<p>編號：{{ data._id }}</p>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								上傳圖片
								<span class="text-danger">*</span>
							</label>
							<div class="row m-0" style="margin-bottom: 38px">
								<template v-if="data.image.length !== 0">
									<div
										v-for="(imageItme, imageIndex) in data.image"
										:key="imageIndex"
										class="card-newImg-delete me-3 my-2 p-0 d-flex align-items-center justify-content-center position-relative"
										:style="{
											'background-image': `url(${imageItme})`,
										}"
									>
										<!-- 刪除 手機板 右上角的刪除 -->
										<font-awesome-icon
											v-if="resize < 768"
											@click="closeItem('image', imageIndex)"
											:icon="['fas', 'circle-xmark']"
											class="fs-5 d-md-none position-absolute top-0 start-100 translate-middle gray p-2"
										/>

										<!-- 刪除 滑鼠移入時出現 -->
										<font-awesome-icon
											v-if="resize >= 768"
											:icon="['fas', 'trash-can']"
											class="fs-4 icon"
											@click="closeItem('image', imageIndex)"
										/>
									</div>
								</template>

								<div
									v-if="data.image.length < 4"
									class="card-newImg me-3 my-2"
									@click="uploadFile"
								>
									<font-awesome-icon
										:icon="['fas', 'image']"
										class="fa-image"
									/>
									<p>選擇圖片</p>
									<p>({{ data.image ? data.image.length : 0 }}/4)</p>
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
								<div class="card-directions w-fit py-3">
									<ul>
										<li>圖片大小：3MB 內</li>
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
							<div class="row m-0" style="margin-bottom: 38px">
								<!-- bg-img-eca-dack -->

								<div
									v-if="data.image.length !== 0"
									class="card-newImg-delete me-3 my-2 p-0 d-flex align-items-center justify-content-center position-relative"
									:style="{
										'background-image': `url(${data.image[0]})`,
									}"
								>
									<font-awesome-icon
										:icon="['fas', 'circle-xmark']"
										class="fs-5 d-md-none position-absolute top-0 start-100 translate-middle gray p-2"
									/>

									<font-awesome-icon
										v-if="resize >= 768"
										:icon="['fas', 'trash-can']"
										class="fs-4 icon"
									/>
								</div>

								<div
									v-if="data.image.length === 0"
									class="card-newImg-disabled me-3 my-2"
								>
									<font-awesome-icon
										:icon="['fas', 'image']"
										class="fa-image"
									/>
									<p>選擇圖片</p>
									<p>(0/1)</p>
								</div>

								<div class="card-directions w-fit py-3">
									<ul>
										<li>封面照片將自動顯示上方第一張商品圖片</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="productName" class="mb-1">
								名稱
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="productName"
								v-model="data.productName"
								name="優惠券名稱"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['優惠券名稱'] }"
								rules="required"
								aria-label="商品名稱"
								placeholder="請輸入商品名稱"
							></v-field>
							<error-message
								name="優惠券名稱"
								class="invalid-feedback"
							></error-message>
						</div>
						<div
							class="col-6 col-sm-6 ps-0 pe-3 m-0 mb-2"
							style="min-height: 100px"
						>
							<label for="allType" class="mb-1">
								全站分類
								<span class="text-danger">*</span>
							</label>
							<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
								<div class="dropdown">
									<button
										class="form-control py-0"
										:class="{
											'justify-content-between':
												data.sellerCategory.length === 0,
											'justify-content-start': data.sellerCategory.length !== 0,
										}"
										ref="dropdownBtn"
										type="button"
										data-bs-toggle="dropdown"
										data-bs-auto-close="outside"
									>
										<div
											v-if="data.sellerCategory.length === 0"
											class="text-start d-flex justify-content-between align-items-center"
										>
											<p class="mb-0 neutral-03" style="padding: 6px 0px">
												請選擇商品...
											</p>
											<font-awesome-icon
												:icon="['fas', 'caret-down']"
												class="neutral-02 d-flex justify-content-center align-items-center"
												style="width: 20; height: 20"
											/>
										</div>
										<div class="row m-0 p-0">
											<!-- :class="{ 'bg-neutral-01': addNum, 'd-block': addNum }" -->
											<div
												v-for="(item, index) in data.sellerCategory"
												:key="index"
												class="input-badge w-auto"
												:class="{ 'bg-neutral-02': addNum, white: addNum }"
											>
												<p class="mb-0">
													{{ getBadgeText(item) }}
												</p>
												<button
													type="button"
													class="btn-close"
													aria-label="Close"
													@click="inputBadgeClose(item)"
												></button>
											</div>
										</div>
									</button>
									<ul class="dropdown-menu w-100 scrollbar" ref="dropdown">
										<li
											v-for="(stt, sttIndex) in init2.shopTypeText"
											:key="sttIndex"
										>
											<div class="dropdown-item">
												<v-field
													class="form-check-input me-2"
													type="checkbox"
													v-model="data.sellerCategory"
													:class="{ 'is-invalid': errors['sellerCategory'] }"
													:value="stt.value"
													:id="'sellerCategory' + stt.value"
													name="sellerCategory"
													as="input"
												></v-field>
												<label
													class="form-check-label"
													:for="'sellerCategory' + stt.value"
													style="width: 100%"
												>
													{{ stt.text }}
												</label>
											</div>
										</li>
									</ul>
								</div>
								<span
									v-if="data.sellerCategory.length === 0"
									role="alert"
									class="text-danger"
									style="margin-top: 0.25rem; font-size: 0.875em"
								>
									請最少選擇一項分類
								</span>
							</div>
						</div>
						<div
							class="col-6 col-sm-6 ps-0 pe-0 m-0 mb-2"
							style="min-height: 100px"
						>
							<label for="shopType" class="mb-1">
								商家分類
								<span class="text-danger">*</span>
							</label>
							<v-field
								class="my-auto form-control"
								id="shopType"
								v-model="data.category[0]"
								aria-label="商家分類"
								name="商家分類"
								:class="{
									'is-invalid': errors['商家分類'],
								}"
								placeholder="請輸入商品名稱"
							></v-field>
							<error-message
								name="優惠券名稱"
								class="invalid-feedback"
							></error-message>
						</div>
						<div
							class="col-6 col-sm-6 ps-0 pe-3 m-0 mb-2"
							style="min-height: 100px"
						>
							<label for="origin" class="mb-1">產地</label>
							<v-field
								class="my-auto form-select"
								id="origin"
								v-model="data.origin"
								aria-label="商品產地"
								name="商品產地"
								as="select"
							>
								<option value="" disabled>請選擇...</option>
								<option
									:value="originItme"
									v-for="(originItme, originIndex) in init2.originText"
									:key="originIndex"
								>
									{{ originItme }}
								</option>
							</v-field>
						</div>
						<div
							class="col-6 col-sm-6 ps-0 pe-0 m-0 mb-2"
							style="min-height: 100px"
						>
							<label for="manufacture" class="mb-1">製造方式</label>
							<v-field
								id="manufacture"
								v-model="data.production"
								name="製造方式"
								type="text"
								class="form-control"
								aria-label="製造方式"
								placeholder="請輸入"
							></v-field>
						</div>

						<!-- 商品材質 -->
						<div class="col-12 col-md-8 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="material" class="mb-1">材質</label>
							<v-field
								id="material"
								v-model="data.ingredient"
								name="材質"
								type="text"
								class="form-control"
								aria-label="材質"
								placeholder="請輸入"
							></v-field>
						</div>

						<!-- 商品介紹 -->
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="introduce" class="mb-1">
								商品介紹
								<span class="text-danger">*</span>
							</label>
							<!-- rules: max:10 限制字數 -->
							<v-field
								v-slot="{ field, errors }"
								name="comment"
								rules="max:500|required"
								v-model="data.introduction"
							>
								<textarea
									id="introduce"
									v-bind="field"
									class="form-control"
									:class="{ 'is-invalid': errors[0] }"
									name="comment"
									maxlength="500"
								/>
								<p class="text-end fs-12">
									{{ data.introduction ? data.introduction.length : 0 }} / 500
								</p>
							</v-field>
						</div>
					</div>
				</div>
				<div class="m-3 card m-3 p-4 p-sm-5">
					<!-- 標題 銷售資訊 -->
					<div class="row mx-0 mb-0 pb-0 p-0">
						<div
							class="col-12 d-flex justify-content-between align-items-center mb-4 p-0"
						>
							<h3 class="fs-5 p-0 neutral-01 mb-0">銷售資訊</h3>
							<!-- 使用 v-field addFormatData 時會壞掉 -->
							<button
								type="button"
								class="btn px-4 ms-3"
								:class="{
									'btn-outline-primary': data.format.length !== 4,
									'btn-primary': data.format.length === 4,
								}"
								@click="data.format.length !== 4 ? addFormatData() : () => {}"
								:disabled="data.format.length === 4"
							>
								新增規格
							</button>
						</div>
						<!-- 單個規格 -->
						<div
							v-for="(formatItem, formatIndex) in data.format"
							:key="formatIndex"
							class="col-12 col-sm-12 p-0 mb-4 mb-md-5"
							style="min-height: 100px"
						>
							<div
								class="row m-0 bg-neutral05 p-4 pt-3 rounded"
								v-if="formatItem"
							>
								<div class="col-12 m-0 mb-1 p-0 text-end">
									<button
										@click="closeItem('format', formatIndex)"
										type="button"
										class="btn-close"
										aria-label="Close"
										:disabled="formatIndex === 0"
									></button>
								</div>
								<div class="col-12 ps-0 pe-0 pe-md-3">
									<label :for="'Specification_' + formatIndex" class="mb-1">
										規格
										<span class="text-danger">*</span>
									</label>

									<div class="d-flex form-control-end">
										<!-- rules: max:10 限制字數 -->
										<input
											:id="'Specification_' + formatIndex"
											name="規格"
											type="text"
											v-model="formatItem.title"
											class="form-control"
											aria-label="規格"
											placeholder="請輸入"
											maxlength="20"
											:class="{
												'is-invalid': formatItem.title === '',
											}"
										/>
										<span
											class="input-group-text ps-0"
											:class="{
												'is-invalid-text': formatItem.title === '',
											}"
										>
											<p class="m-0 p-0 ps-2 border-start border-start-1 fs-12">
												{{ formatItem.title ? formatItem.title.length : 0 }} /
												20
											</p>
										</span>
									</div>
								</div>
								<div
									class="col-6 col-md-3 ps-0 pe-3 mt-2"
									v-if="formatItem.color"
								>
									<label :for="'color_' + formatIndex" class="mb-1">顏色</label>
									<select
										class="my-auto form-select"
										:id="'color_' + formatIndex"
										aria-label="顏色"
										name="顏色"
										v-model="formatItem.color[0]"
									>
										<option value="" disabled>請選擇...</option>
										<option
											:value="colorItme"
											v-for="(colorItme, colorIndex) in init2.colorText"
											:key="colorIndex"
										>
											{{ colorItme }}
										</option>
									</select>
								</div>
								<div class="col-6 col-md-3 ps-0 pe-3 mt-2">
									<label :for="'inStock_' + formatIndex" class="mb-1">
										庫存
										<span class="text-danger">*</span>
									</label>
									<input
										:id="'inStock_' + formatIndex"
										name="庫存"
										v-model="formatItem.stock"
										@input="validateStock(formatIndex, 'stock')"
										type="number"
										class="form-control text-end me-0 hide-arrows"
										:class="{
											'is-invalid': formatItem.stock === null,
										}"
										aria-label="庫存"
										placeholder="請輸入"
										min="0"
									/>
								</div>
								<div class="col-6 col-md-3 ps-0 pe-3 mt-2">
									<label :for="'cost_' + formatIndex" class="mb-1">
										成本
										<span class="text-danger">*</span>
									</label>
									<input
										:id="'cost_' + formatIndex"
										name="成本"
										v-model="formatItem.cost"
										@input="validateStock(formatIndex, 'cost')"
										type="number"
										class="form-control text-end me-0 hide-arrows"
										:class="{
											'is-invalid': formatItem.stock === null,
										}"
										aria-label="成本"
										placeholder="請輸入"
										min="0"
									/>
								</div>

								<div class="col-6 col-md-3 ps-0 pe-0 mt-2">
									<label :for="'price_' + formatIndex" class="mb-1">
										售價
										<span class="text-danger">*</span>
									</label>
									<div class="d-flex form-control-start">
										<span
											class="input-group-text pe-0"
											:class="{ 'is-invalid-text': errors['售價'] }"
										>
											<p class="m-0 p-0 pe-2 border-end border-end-1 fs-12">
												NT$
											</p>
										</span>
										<!-- numeric:true 只能是數字 -->
										<input
											:id="'price_' + formatIndex"
											name="售價"
											v-model="formatItem.price"
											@input="validateStock(formatIndex, 'price')"
											type="number"
											class="form-control text-end me-0 hide-arrows"
											:class="{
												'is-invalid': formatItem.stock === null,
											}"
											aria-label="售價"
											placeholder="請輸入"
											min="0"
										/>
									</div>
								</div>
							</div>
						</div>

						<!-- 運費 -->
						<div class="col-12 col-md-3 p-0 m-0 pe-0 pe-md-4 mb-4 mb-md-5">
							<label for="fare" class="mb-1">
								運費
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex form-control-start">
								<span
									class="input-group-text pe-0"
									:class="{ 'is-invalid-text': errors['運費'] }"
								>
									<p class="m-0 p-0 pe-2 border-end border-end-1 fs-12">NT$</p>
								</span>
								<!-- numeric:true 只能是數字 -->
								<v-field
									v-if="data.format[0]"
									id="fare"
									name="運費"
									type="number"
									v-model="data.fare"
									class="form-control hide-arrows"
									:class="{ 'is-invalid': errors['運費'] }"
									rules="numeric:true|required"
									aria-label="運費"
									placeholder="請輸入"
								></v-field>
							</div>
						</div>
						<div class="col-12 col-md-6 ps-0 m-0 mb-2">
							<label class="mb-3">
								付款方式
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex">
								<div
									v-for="(pay, payIndex) in ['刷卡', '取貨付款', 'line pay']"
									:key="payIndex"
								>
									<div class="dropdown-item pe-2">
										<v-field
											class="form-check-input me-2"
											type="checkbox"
											v-model="data.pay"
											:value="payIndex + 1"
											:id="pay"
											rules="required"
											name="pay"
											:class="{ 'is-invalid': errors['pay'] }"
											as="input"
										></v-field>
										<label
											class="form-check-label"
											:for="pay"
											style="width: 100%"
										>
											{{ pay }}
										</label>
									</div>
								</div>
							</div>
						</div>
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
import { alertStore } from '@/main'; // 導入實例

import {
	type FormatType,
	type DetailedOrderProductType,
} from '@/type/orderType';

import NavTabs from '../components/NavTabs.vue';
import router from '@/router';

import { useProduct, useAuthStore, useResize, getDate } from '@/stores/index';

import { useRoute } from 'vue-router';
const route = useRoute();

const { resize } = useResize();
const authStore = useAuthStore();
const userStore = useProduct();

function closeItem(key: keyof DetailedOrderProductType, index: number) {
	const property = userStore.data[key];
	if (Array.isArray(property)) {
		property.splice(index, 1);
	}
}

const addFormatData = () => {
	// 新增資料 使用 vee-會出錯
	const newFormat = {
		title: '',
		price: 0,
		cost: 0,
		stock: 0,
		image: '',
		color: [],
	} as any;
	userStore.data.format.push(newFormat);
};

const validateStock = (index: number, text: 'price' | 'cost' | 'stock') => {
	if (
		userStore.data.format[index] &&
		typeof userStore.data.format[index][text] === 'number' &&
		userStore.data.format[index][text] > 0
	) {
	} else {
		userStore.data.format[index][text] = 0;
	}
};
interface BadgeItem {
	text: string;
	value: number;
}

const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

const inputBadge = ref<BadgeItem[]>([]);
const addNum = ref(false);

// 修改上下架的狀態
function isOnshelf(onshelf: boolean) {
	// userStore.onshelfEdit(onshelf);
}

// 刪除，待檢查
function inputBadgeClose(num: number) {
	const index = userStore.data.sellerCategory.findIndex(
		(item: number) => item === num
	);
	if (index !== -1) {
		userStore.data.sellerCategory.splice(index, 1);
	}
}

// 取得文字
function getBadgeText(index: number): string {
	const text = init2.value.shopTypeText.find(
		(item: { value: number }) => item.value === index
	);
	return text.text;
}

function add() {
	if (addNum.value === false) addNum.value = true;
	else addNum.value = false;
}
const hovered = ref([false]);

const data = computed(() => userStore.data);

// navTab + seller 畫面下所有資料
const sellerTitleNewData = {
	routeName: 'SellerProductNew',
	title: [
		{
			title: '商品管理',
			path: { name: 'SellerProduct', query: { page: 1, filter: '未結束' } },
		},
		{
			title: '新增商品',
		},
	],
	schedule: '新增商品', //目前頁面
	btn: '新增',
};

// navTab + seller 畫面下所有資料
const sellerTitleData = {
	routeName: 'SellerProductCheck',
	title: [
		{
			title: '商品管理',
			path: { name: 'SellerProduct', query: { page: 1 } },
		},
		{
			title: '修改商品',
		},
	],
	schedule: '修改商品', //目前頁面
	btn: '儲存',
};

const tryData = ref() as any;
const navTabs = ref({}) as any;
const init2 = ref({
	shopTypeText: [
		{ text: '娛樂', value: 1 },
		{ text: '服飾', value: 2 },
		{ text: '3C產品', value: 3 },
		{ text: '食品', value: 4 },
		{ text: '家具', value: 5 },
		{ text: '運動用品', value: 6 },
		{ text: '寵物用品', value: 7 },
		{ text: '生活用品', value: 8 },
		{ text: '清潔用品', value: 9 },
		{ text: '其他', value: 10 },
	],
	originText: [
		'台灣',
		'日本',
		'韓國',
		'德國',
		'美國',
		'中國',
		'加拿大',
		'印度',
		'英國',
		'越南',
		'義大利',
		'比利時',
		'未知',
	],
	colorText: [
		'黑色',
		'白色',
		'紅色',
		'橙色',
		'黃色',
		'綠色',
		'藍色',
		'紫色',
		'透明',
		'彩色',
	],
}) as any;
const init = ref({}) as any;

// 資料完成後送出
function onSubmit(isValue: any | void) {
	// true 為通過 format 該填的有寫。不包含 檢查顏色。
	let isCheck = userStore.data.format.every(formatItem => {
		return (
			formatItem.title.length > 0 &&
			(formatItem.stock === 0 || formatItem.stock > 0)
		);
	});
	if (userStore.data.sellerCategory.length === 0) {
		isCheck = false;
	}
	if (userStore.data.image.length === 0) isCheck = false;
	if (isCheck) {
		if (route.matched[0].path === '/seller') {
			if (route.name === 'SellerProductNew') {
				// 新增狀態
				userStore.newProduct();
			} else if (route.name === 'SellerProductCheck') {
				// 修改狀態
				userStore.getProductEdit();
			}
		}
	} else {
		alertStore.error('請輸入正確的資料');
	}
}
const getData = () => {
	if (route.matched[0].path === '/seller') {
		if (route.name === 'SellerProductNew') {
			// 新增狀態
			init.value = sellerTitleNewData;
			navTabs.value = {
				title: sellerTitleNewData.title,
				schedule: sellerTitleNewData.schedule,
				breadcrumb: true,
			};
			userStore.data = {
				_id: '',
				state: false,
				sellerCategory: [], //商品主要類別
				category: [],
				isOnshelf: true,
				sold: 0,
				productName: '',
				type: [],
				sellerType: [],
				origin: '',
				ingredient: '',
				introduction: '',
				format: [
					{
						title: '',
						price: 0,
						cost: 0,
						stock: 0,
						color: [],
					},
				],
				introduce: '',
				production: '',
				evaluate: [],
				haveStore: '',
				fare: 0,
				pay: [], //1:信用卡付款 2.ATM匯款 3.店到店付費
				image: [],
			};
		} else if (route.name === 'SellerProductCheck') {
			// 修改/查看狀態
			init.value = sellerTitleData;
			navTabs.value = {
				title: sellerTitleData.title,
				schedule: sellerTitleData.schedule,
				breadcrumb: true,
			};
			userStore.getProduct(route.params.id as string, authStore.token);
		}
	} else if (route.matched[0].path === '/user') {
		// init.value = userTitleData;
	}
	// userStore.getCouponAll(id, page, token);
};

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
		userStore.getImgUrl(file, authStore.token);
	}
}

const deleteProduct = async () => {
	await userStore.deleteProduct();
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
.img {
	width: 96px;
	height: 96px;
}

.form-control-end {
	.input-group-text {
		background-color: white;
		border-radius: 0 8px 8px 0;
		border-color: #f0f4f7;
		border-style: solid;
		border-right-width: 1px !important;
		border-top-width: 1px !important;
		border-bottom-width: 1px !important;
		border-left-width: 0px !important;
	}
	.form-control {
		border-radius: 8px 0px 0 8px;
		border-left-width: 1px !important;
		border-top-width: 1px !important;
		border-bottom-width: 1px !important;
		border-right-width: 0px !important;
	}
	.is-invalid-text {
		border: 1px solid #ff5959 !important;
		border-left-width: 0px !important;
	}
}
.form-control-start {
	.input-group-text {
		background-color: white;
		border-radius: 8px 0px 0px 8px;
		border-color: #f0f4f7;
		border-style: solid;
		border-left-width: 1px !important;
		border-top-width: 1px !important;
		border-bottom-width: 1px !important;
		border-right-width: 0px !important;
	}
	.form-control {
		border-radius: 0px 8px 8px 0px;
		border-right-width: 1px !important;
		border-top-width: 1px !important;
		border-bottom-width: 1px !important;
		border-left-width: 0px !important;
	}
	.is-invalid-text {
		border: 1px solid #ff5959 !important;
		border-right-width: 0px !important;
	}
}
</style>
