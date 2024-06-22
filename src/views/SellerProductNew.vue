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

							<!-- ↓之後會靠邏輯判斷只會出現一個 -->
							<a href="">刪除商品</a>
							<a href="">立即下架</a>
						</div>
						<div class="col-12 p-0 m-0 mb-4">
							<p>編號：</p>
						</div>
						<!--  -->
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								上傳圖片
								<span class="text-danger">*</span>
							</label>
							<div class="row m-0" style="margin-bottom: 38px">
								<!-- bg-img-eca-dack -->

								<div
									class="card-newImg-delete me-3 my-2 p-0 d-flex align-items-center justify-content-center position-relative"
									:style="{
										'background-image': `url(https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/f4e6bbf2-eb85-4343-acad-c4b537c36356.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756675200&Signature=CruKUkjAnFhe9fnpj5ibWwYu7ApqDm7RgDyYKYlHPh36dgeOi%2BClu6neh2%2Fz51mp4C9c9RjAtzlTsRpXCRcXMBV1xQ7RtoyU2fIQHTQNy3me%2FILbbVF%2B2pA6D47Dcr%2BtA1ztvMZZ6Dn%2FhSrv%2FC%2F35bOunhzc5rMJjUoObpGVa%2Fqhg4dxOwjiupa%2B8F6OSmr9GshRDYoUnuYe49gMuhoSSBUxDvDvZsuGtcCfvTRak2eKZAPl2KK9u1mqY%2FXkwxyY4AkCxUFA92i354XZAMjMluQ9iJJ0bRHx7ncYeXBRjxUcwI%2BSdiRKwqCelYP25IFk74nefHxs6WLrTInn87Ilnw%3D%3D)`,
									}"
								>
									<!-- 刪除 手機板 右上角的刪除 -->
									<font-awesome-icon
										:icon="['fas', 'circle-xmark']"
										class="fs-5 d-md-none position-absolute top-0 start-100 translate-middle gray p-2"
									/>

									<!-- 刪除 滑鼠移入時出現 -->
									<font-awesome-icon
										v-if="resize >= 768"
										:icon="['fas', 'trash-can']"
										class="fs-4 icon"
									/>
								</div>

								<div class="card-newImg me-3 my-2">
									<font-awesome-icon
										:icon="['fas', 'image']"
										class="fa-image"
									/>
									<p>選擇圖片</p>
									<p>(n/n)</p>
								</div>

								<div class="card-directions w-fit py-3">
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
							<div class="row m-0" style="margin-bottom: 38px">
								<!-- bg-img-eca-dack -->

								<div
									class="card-newImg-delete me-3 my-2 p-0 d-flex align-items-center justify-content-center position-relative"
									:style="{
										'background-image': `url(https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/f4e6bbf2-eb85-4343-acad-c4b537c36356.png?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756675200&Signature=CruKUkjAnFhe9fnpj5ibWwYu7ApqDm7RgDyYKYlHPh36dgeOi%2BClu6neh2%2Fz51mp4C9c9RjAtzlTsRpXCRcXMBV1xQ7RtoyU2fIQHTQNy3me%2FILbbVF%2B2pA6D47Dcr%2BtA1ztvMZZ6Dn%2FhSrv%2FC%2F35bOunhzc5rMJjUoObpGVa%2Fqhg4dxOwjiupa%2B8F6OSmr9GshRDYoUnuYe49gMuhoSSBUxDvDvZsuGtcCfvTRak2eKZAPl2KK9u1mqY%2FXkwxyY4AkCxUFA92i354XZAMjMluQ9iJJ0bRHx7ncYeXBRjxUcwI%2BSdiRKwqCelYP25IFk74nefHxs6WLrTInn87Ilnw%3D%3D)`,
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

								<div class="card-newImg me-3 my-2">
									<font-awesome-icon
										:icon="['fas', 'image']"
										class="fa-image"
									/>
									<p>選擇圖片</p>
									<p>(n/n)</p>
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
								name="優惠卷名稱"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['優惠卷名稱'] }"
								rules="phone|required"
								aria-label="優惠卷名稱"
								placeholder="請輸入優惠卷名稱"
							></v-field>
							<error-message
								name="優惠卷名稱"
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
							<v-field
								class="my-auto form-select"
								id="allType"
								aria-label="全站分類"
								name="全站分類"
								:class="{
									'is-invalid': errors['全站分類'],
								}"
								rules="gender"
								as="select"
							>
								<option value="" disabled>請選擇...</option>
								<option
									:value="shopTypeItme"
									v-for="(shopTypeItme, shopTypeIndex) in init2.shopTypeText"
									:key="shopTypeIndex"
								>
									{{ shopTypeItme }}
								</option>
							</v-field>
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
								class="my-auto form-select"
								id="shopType"
								aria-label="商家分類"
								name="商家分類"
								:class="{
									'is-invalid': errors['商家分類'],
								}"
								rules="gender"
								as="select"
							>
								<option value="" disabled>請選擇...</option>
								<option value="男">男</option>
								<option value="女">女</option>
							</v-field>
						</div>
						<div
							class="col-6 col-sm-6 ps-0 pe-3 m-0 mb-2"
							style="min-height: 100px"
						>
							<label for="origin" class="mb-1">
								產地
								<span class="text-danger">*</span>
							</label>
							<v-field
								class="my-auto form-select"
								id="origin"
								aria-label="商家分類"
								name="商家分類"
								:class="{
									'is-invalid': errors['商家分類'],
								}"
								rules="gender"
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
							<label for="manufacture" class="mb-1">
								製造方式
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="manufacture"
								name="製造方式"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['製造方式'] }"
								rules="required"
								aria-label="製造方式"
								placeholder="請輸入"
							></v-field>
						</div>

						<!-- 商品材質 -->
						<div class="col-12 col-md-8 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="material" class="mb-1">
								材質
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="material"
								name="材質"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['材質'] }"
								rules="required"
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
							>
								<textarea
									id="introduce"
									v-bind="field"
									class="form-control"
									:class="{ 'is-invalid': errors[0] }"
									name="comment"
								/>
								<p class="text-end fs-12">n / 500</p>
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
							<button class="btn btn-outline-primary px-4 ms-3">
								新增規格
							</button>
						</div>

						<!-- 單個規格 -->
						<div
							class="col-12 col-sm-12 p-0 mb-4 mb-md-5"
							style="min-height: 100px"
						>
							<div class="row m-0 bg-neutral05 p-4 pt-3">
								<div class="col-12 m-0 mb-1 p-0 text-end">
									<button
										type="button"
										class="btn-close"
										aria-label="Close"
									></button>
								</div>
								<div class="col-12 col-md-6 ps-0 pe-0 pe-md-3">
									<label for="Specification" class="mb-1">
										規格
										<span class="text-danger">*</span>
									</label>
									<div class="d-flex form-control-end">
										<!-- rules: max:10 限制字數 -->
										<v-field
											id="Specification"
											name="規格"
											type="text"
											class="form-control"
											:class="{ 'is-invalid': errors['規格'] }"
											rules="max:10|required"
											aria-label="規格"
											placeholder="請輸入"
										></v-field>
										<span
											class="input-group-text ps-0"
											:class="{ 'is-invalid-text': errors['規格'] }"
										>
											<p class="m-0 p-0 ps-2 border-start border-start-1 fs-12">
												n / 10
											</p>
										</span>
									</div>
								</div>
								<div class="col-6 col-md-3 ps-0 pe-3 mt-2 mt-md-0">
									<label for="color" class="mb-1">
										顏色
										<span class="text-danger">*</span>
									</label>
									<v-field
										class="my-auto form-select"
										id="color"
										aria-label="顏色"
										name="顏色"
										:class="{
											'is-invalid': errors['顏色'],
										}"
										rules="gender"
										as="select"
									>
										<option value="" disabled>請選擇...</option>
										<option
											:value="colorItme"
											v-for="(colorItme, colorIndex) in init2.colorText"
											:key="colorIndex"
										>
											{{ colorItme }}
										</option>
									</v-field>
								</div>
								<div class="col-6 col-md-3 p-0 mt-2 mt-md-0">
									<label for="inStock" class="mb-1">
										庫存
										<span class="text-danger">*</span>
									</label>
									<v-field
										id="inStock"
										name="庫存"
										type="text"
										class="form-control"
										:class="{ 'is-invalid': errors['庫存'] }"
										rules="numeric:true|required"
										aria-label="庫存"
										placeholder="請輸入"
									></v-field>
								</div>
							</div>
						</div>

						<!-- 單價 -->
						<div class="col-12 col-md-4 ps-0 pe-0 pe-md-3 m-0 mb-4 mb-md-5">
							<label for="cost" class="mb-1">
								成本
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="cost"
								name="成本"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['成本'] }"
								rules="numeric:true|required"
								aria-label="成本"
								placeholder="請輸入"
							></v-field>
						</div>

						<div class="col-12 col-md-4 p-0 m-0 mb-4 mb-md-5">
							<label for="price" class="mb-1">
								售價
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex form-control-start">
								<span
									class="input-group-text pe-0"
									:class="{ 'is-invalid-text': errors['售價'] }"
								>
									<p class="m-0 p-0 pe-2 border-end border-end-1 fs-12">NT$</p>
								</span>
								<!-- numeric:true 只能是數字 -->
								<v-field
									id="price"
									name="售價"
									type="text"
									class="form-control"
									:class="{ 'is-invalid': errors['售價'] }"
									rules="numeric:true|required"
									aria-label="售價"
									placeholder="請輸入"
								></v-field>
							</div>
						</div>
						<div class="col-12 ps-0 m-0 mb-2">
							<label class="mb-3">
								付款方式
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex">
								<div
									v-for="(stt, sttIndex) in ['刷卡', '取貨付款']"
									:key="sttIndex"
								>
									<div class="dropdown-item pe-2">
										<v-field
											class="form-check-input me-2"
											type="checkbox"
											v-model="data.productChoose"
											:class="{ 'is-invalid': errors['productChoose'] }"
											:value="stt"
											:id="stt"
											name="productChoose"
											as="input"
										></v-field>
										<label
											class="form-check-label"
											:for="stt"
											style="width: 100%"
										>
											{{ stt }}
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
				<br />
				{{ userStore.data }}
			</v-form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';

// import { type couponType } from '@/type/couponType';

import NavTabs from '../components/NavTabs.vue';
import router from '@/router';

import { useCoupon, useAuthStore, useResize, getDate } from '@/stores/index';

import { useRoute } from 'vue-router';
const route = useRoute();

const { resize } = useResize();
const authStore = useAuthStore();
const userStore = useCoupon();

// 完成後送出
function onSubmit() {
	console.log('成功');
}

const dropdownBtn = ref<HTMLButtonElement | null>(null);
const dropdown = ref<HTMLDivElement | null>(null);

const hovered = ref([false]);

// 刪除，待檢查
function inputBadgeClose(id: string) {
	data.value.productChoose = data.value.productChoose?.filter(
		item => item !== id
	);
}

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
	originText: ['台灣', '中國', '美國', '日本', '澳洲', '韓國'],
	colorText: ['黑', '白', '紅', '橙', '黃', '綠', '藍', '紫', '透明', '彩色'],
}) as any;
const init = ref({}) as any;
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
		} else if (route.name === 'SellerProductCheck') {
			// 修改/查看狀態
			init.value = sellerTitleData;
			navTabs.value = {
				title: sellerTitleData.title,
				schedule: sellerTitleData.schedule,
				breadcrumb: true,
			};
			userStore.getCoupon(route.params.id as string, authStore.token);
		}
	} else if (route.matched[0].path === '/user') {
		// init.value = userTitleData;
	}
	// userStore.getCouponAll(id, page, token);
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
