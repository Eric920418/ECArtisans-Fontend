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
							<p v-if="data._id">編號：{{ data._id }}</p>

							<!-- a class="mb-0" v-if="route.name === 'SellerCouponCheck'">
								立即停止<
							</a> -->
						</div>
						<!--  -->
						<div class="col-12 p-0 m-0 mb-2" style="min-height: 100px">
							<label for="couponName" class="mb-1">
								封面圖片
								<span class="text-danger">*</span>
							</label>
							<div class="d-flex" style="margin-bottom: 38px">
								<div class="card-newImg me-3">
									<font-awesome-icon
										:icon="['fas', 'image']"
										class="fa-image"
									/>
									<p>選擇圖片</p>
									<p>(n/n)</p>
								</div>

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
								名稱
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="couponName"
								name="優惠卷名稱"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['優惠卷名稱'] }"
								rules="phone|required"
								v-model="data.couponName"
								aria-label="優惠卷名稱"
								placeholder="請輸入優惠卷名稱"
							></v-field>
							<error-message
								name="優惠卷名稱"
								class="invalid-feedback"
							></error-message>
						</div>

						<!-- 性別 START-->
						<div class="p-0 mb-2 d-flex col-sm-12 col-md-6">
							<div>
								<label
									for="sellerCategory"
									class="col-form-label text-nowrap my-auto me-2"
									style="width: 5em; min-height: 65px"
								>
									全站分類
									<span class="text-danger">*</span>
								</label>
							</div>
							<div class="w-100 pe-md-5">
								<!-- <v-field
									class="my-auto form-select"
									id="sellerCategory"
									aria-label="Select gender"
									v-model="data.sellerCategory"
									name="全站分類"
									:class="{
										'is-invalid': errors['全站分類'],
										'form-disabled': !data.sellerCategory,
										'neutral-03': data.sellerCategory ? '' : 'neutral-03',
									}"
									rules="gender"
									as="select"
								>
									<option value="" disabled>請選擇性別</option>
									<option value="男">男</option>
									<option value="女">女</option>
								</v-field>
								<error-message
									name="全站分類"
									class="invalid-feedback"
								></error-message> -->
							</div>
						</div>

						<!-- 性別 END-->
						<!-- 性別 START-->
						<div class="p-0 mb-2 d-flex col-sm-12 col-md-6">
							<div>
								<label
									for="sellerCategory"
									class="col-form-label text-nowrap my-auto me-2"
									style="width: 5em; min-height: 65px"
								>
									全站分類
									<span class="text-danger">*</span>
								</label>
							</div>
							<div class="w-100">
								<!-- <v-field
									class="my-auto form-select"
									id="sellerCategory"
									aria-label="Select gender"
									v-model="data.sellerCategory"
									name="全站分類"
									:class="{
										'is-invalid': errors['全站分類'],
										'form-disabled': !data.sellerCategory,
										'neutral-03': data.sellerCategory ? '' : 'neutral-03',
									}"
									rules="gender"
									as="select"
								>
									<option value="" disabled>請選擇性別</option>
									<option value="男">男</option>
									<option value="女">女</option>
								</v-field>
								<error-message
									name="全站分類"
									class="invalid-feedback"
								></error-message> -->
							</div>
						</div>
						<!-- 性別 END-->
						123
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

// 刪除
// function inputBadgeClose(id: string) {
// 	data.value.productChoose = data.value.productChoose.filter(
// 		item => item !== id
// 	);
// }

// 刪除，待檢查
function inputBadgeClose(id: string) {
	data.value.productChoose = data.value.productChoose?.filter(
		item => item !== id
	);
}

const data = computed(() => userStore.data);

// navTab + seller 畫面下所有資料
const sellerTitleNewData = {
	routeName: 'SellerCouponNew',
	title: [
		{
			title: '優惠劵',
			path: { name: 'SellerCoupon', query: { page: 1, filter: '未結束' } },
		},
		{
			title: '新增優惠劵',
		},
	],
	schedule: '新增優惠劵', //目前頁面
	btn: '新增',
};

// navTab + seller 畫面下所有資料
const sellerTitleData = {
	routeName: 'SellerCouponNew',
	title: [
		{
			title: '優惠劵',
			path: { name: 'SellerCoupon', query: { page: 1 } },
		},
		{
			title: '修改優惠劵',
		},
	],
	schedule: '修改優惠劵', //目前頁面
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
		if (route.name === 'SellerCouponNew') {
			// 新增狀態
			init.value = sellerTitleNewData;
			navTabs.value = {
				title: sellerTitleNewData.title,
				schedule: sellerTitleNewData.schedule,
				breadcrumb: true,
			};
		} else if (route.name === 'SellerCouponCheck') {
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
</style>
