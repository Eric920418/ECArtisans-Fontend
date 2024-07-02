<template>
	<div class="container">
		<div class="row mt-7">
			<!-- Sidebar for filters -->
			<div class="col-lg-2">
				<!-- Filter options -->
				<div class="card mb-4">
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
								:dragging="true"
								:interval="10"
								tooltip="always"
								tooltip-placement="bottom"
								:enable-cross="false"
							></vue-slider>
						</div>

						<!-- Origin Dropdown -->
						<div class="mb-3">
							<label for="origin" class="form-label">產地</label>
							<select
								v-model="filters.selectedOrigin"
								id="origin"
								class="form-select"
							>
								<option value="">全部</option>
								<option value="taiwan">台灣</option>
								<option value="china">中國</option>
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
								<option value="red">紅色</option>
								<option value="blue">藍色</option>
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
				<div class="card mb-4">
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
					<div
						v-for="(item, index) in paginatedData"
						:key="index"
						class="col-6 col-md-4 col-lg-4 col-xl-3 p-1 m-0"
					>
						<Card
							:item="item"
							@click="
								$go({ name: 'ShopProduct', params: { id: item.products_id } })
							"
						/>
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

const products = computed(() => {
	return shopStore.sellerProductsData;
});

// 監聽 shopStore.sellerProductsData 的變化，重新計算 products
watchEffect(() => {
	// 在這裡可以添加一些邏輯處理，如果需要的話
	// 這裡只是簡單地重新計算 products
	products.value; // 這裡觸發 computed 重新計算
});

console.log(products.value);
// const products = ref([
// 	{
// 		products_id: '66769071b72f97fbc2b5561a',
// 		products_name: '專業運動耳機',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/5b170f7c-bbfe-4262-9b64-ceb19e887e54.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=XOgZt60Jve92Kqhf2TSnD%2BDnuF%2Fwpz2lHtZIXGgr5JTaoijKtstVtwricIZtL4EyKR4H7E5YPbpTuFhAKjwMeQIAJ0swcCfqDaoglsWbVpbCE4Th6ImyHgSNG8xVC1mnp1lMKrzM6U5GHSXqF1JtRT2zCUieTd%2BlkeboRZAXPGSRXmq%2B4hSyONxAcUvVbUzGGTma4d4oGQBVXF1lA5Rv2Bm6xSi0RcmSkr%2BJMp%2BpvZwcA%2FIvuWdis5C6Kk7GtX9iV4fKAFW4HEcvCGUOCrmqeLBqN%2BB%2B4yr3jWIARWonQX6pqfhpGP%2Fja2sgVq3sitRW5wog2r9tSJqn0bIPPZQ4WQ%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 120,
// 		total_sales: 301,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '6676905db72f97fbc2b55615',
// 		products_name: '智能運動手環',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/8cfcbb71-97f2-4945-9f1b-daf0f7fee42a.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=lqjXCZid%2FTa9gfchnBexeBFoR7Hq0zHp%2BTQDyokBWUv2OouHbzupvrb8ATEKCsqZ2v4%2BTWVcJFCVbOercpCG7yq%2B2bF83Br0yzCCOFfD6fdSTgWMGKC1JeJxe39gsV1g6xGDtNNUzNWxYndXJ3T%2BX0m%2FbhAuU0a7svZxpkR2ANTGl4gSCQ1w0dB7XvKKgu006UJ%2Fxe6F8Hzf2tW1jdzTvxq8L0HW7s0gTKQIo0NPUpBsH1K8aNd%2Foth6vfIgYCy1dHCyqrFrf61s7GimZXvQRey3vpAE%2F2jfEyGkCit07zTBCNIRRqIY3hxQOF07H9XIOQIvHksCn8NlmnZMSf9iZQ%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 350,
// 		total_sales: 199,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '6676939fb72f97fbc2b55656',
// 		products_name: '高效能運動飲水瓶',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/7e93e6ce-9f8e-4a24-a3ca-455e3d833fa1.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=bFl92lx1%2BT8YSSTUNU0odwP7xqEFwaRoNBgOc%2F7zqMxN72%2FFnYEIqPJt3bEHJKcZo%2F2ve5q%2BysF2zLLZ1lNcgnKXnktZ%2BHO%2BW4QKKKqQJVmfTndzoC4Vzuz4W%2Bhk1DBhOrlxlppwY8F4YfaM87NrtECb%2FTwiVPRbHOJBk1QViWriKWMtUxtwcQeowymHzXNNZMwHo%2BUKZagUrw6wrk8oI02AEgpVxyBx%2F8zgKlAJxbk6cFRe%2BxYi77lYUdmdCjM41Gch%2FBUJHyZW5EsaszAKbtu9L%2BnApV927dSTrRbYR5iRpIo3Wj%2FXzVmu%2FwWBDf8rxKEc2rRgoflIx8Nyefdkpg%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 100,
// 		total_sales: 185,
// 		discount: ['免運券', '折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '667693d4b72f97fbc2b5565b',
// 		products_name: '運動護膝',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/75ba21c7-601e-4a7b-bc33-02408ff0d139.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=lJTcDHHLdj%2FUKuGjgo8%2FyH%2BK0QJ1uKcJA5PXe36JJiLCxsfh8PFk460ZnW99BnkrOnO04D3fHDyco4hh%2FLMiOGLdh1vZL%2Fk6jT7gFht7jdcMsZY5kD5Z0Z0GCF78iJdbzhLpI8BvGONRVKvVfMrzMjmMKVpd5weHAV6RWo30T8fZdWtByVT66Bj%2BDf%2BaatzGT6A3ig0gH43MI6186nxsShZ6Kg6a%2F0rWfl3cDAfZUs%2B6AuyF8aYTXDFVQpF4hBEXJPq%2FQqcKy7gUlBdDeyGV9S%2BnIoAg%2BKkMRl12GMF7o1zPdOO20BnH%2BHppNroPkrq7J4Sx4svLY%2Fi7APRMsu1G8w%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 200,
// 		total_sales: 169,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66768eb5b72f97fbc2b555f5',
// 		products_name: '舒適寵物床墊',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/3ed636cb-2123-49f4-8e0d-01bd9f687cc0.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=StBnszPcIyTOr8yoqYD%2FLmEBcnJN9%2Bcg2ih%2FNVulE3Q2UFtD806UGSpH4eNKZoqomNA%2F%2B%2Bg1d3SKcn47W3Q0Mp8zuwZH0js9Q84TOF7golA3L1SuQzfkmiFFM2ld0n1E9KAjUjwe2%2BWD7zd8IUxnX5S2uZ8l%2FrCcv83dvaAND9Pocf8Pu%2BLUdded0WW4f6t0R1ALiQ98ybncmywEdUg%2BeIOO3vnCuelLWu3dHcmQO9fDTXw%2FuyuZpRtK1ErYgjcEr8BUoKjnF7yVuPSahTlaH2lTy0L%2BsjlPqa%2BUd2mSKRZkmBNJrcatToLr3RMxco5RO1a7bryUbYYMI9e60QWMEg%3D%3D',
// 		seller_name: 'SkyMart',
// 		price: 350,
// 		total_sales: 168,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769365b72f97fbc2b55638',
// 		products_name: '高效燃脂跳繩',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/cc47b453-8064-4599-9275-a2ddf5fae6f4.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=VAWUfbm5%2FFJn22JctWUvrfNupN69SzyD7nijawAZyn6or2zd0ChUQF%2FliWEgW6Q3f%2FnxPuYumI0HyXx7MD7s3gqa3mVi4PGR8g4T0NCW7we5O5y%2BKU8uomDOFcWlvIBg7mjJUg0dkQDsAk3x7iWtlMcxs7a9vwhSYIQN2t0rFhhSyIQU0zuosUKcVgBwMtuwMbCeQ4h1e7g86wHQzM6eyHRbDXrjH0alwg9cJ8T%2FzHln1lNj2yE10161q74slwlldoV5uauD%2BZroYEzN%2BANknxsuHfQeT4Pwa%2FmWfupSncWF6sGIerM9%2FD%2BnDZNmlxJC4XCZ49bkNXR9SxpxZcG7Cg%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 80,
// 		total_sales: 154,
// 		discount: ['免運券', '折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769087b72f97fbc2b55624',
// 		products_name: '智能計步器',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/615ff805-326a-4b63-b40c-5f725bf639b8.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=HDOKV0Kp329S%2FTXCZVDIwxrb67u0PoWm9uuN2K0q8seLItki3oEafCwlWpsw5rssW46rtE11DFGCYxa6DiV6%2FfJBLRecd2MBwZmCglU6czN2qQ5jJJ1r%2F4JJ5B4U%2BbDkT0xSCJdDBYcQFfjwW2qWi4zUOXFI6DmJxQfjD2RL4YAJPYpcbttfIEYHNGyfvoEbuEEEa2qX5TxHdg8SWo6N4wa%2FRXeuHqg%2FkJ%2F48ChtzGdRpX69JlBxAWnSigTv6MuchYrGuPjvBugCLs1uTKhZ7H%2FBZEscJy6NpKTCfVszJxd8rL4Pl%2BVt%2FU4vhfjUtJTatUW6SXz%2BQC5L3L4slJIDLA%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 25,
// 		total_sales: 124,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769411b72f97fbc2b55679',
// 		products_name: '運動手機腰包',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/541093c3-8e51-45f5-b84e-ce87443cce70.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=IG07rxPv2HAEzCd0%2BVlCLiSM8O2ksxoOUaUpTCts%2FOgnAyZNZUHrHzPyRko9lGO8iziJstfMB5TTEAsFaO0K%2BPK0Ci%2FCAYt43MQXUC7R2UfV6uL0%2FFywDeFl8SO3TB%2Fx0EL9zEPK5zEdzpZrySkeZ7i0MxvPJe5w196n2BKjpjCv0iUEcFNRKNcu%2BHp2QA5wnbD9B1ch6feuj8KhJNn%2BkL4VvKLVlKwpqPo14aVadrjm8ltRxaDT%2FPDpeN5S1co%2B0JfgJZGaWuaxxIWUZP4B48jOZ55sXSjJr007z1s7QTy7r3LEfULkoXfINlsDMo1WB7U2iFPnsatDADaXK5%2B2NQ%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 80,
// 		total_sales: 102,
// 		discount: ['免運券', '折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769359b72f97fbc2b55633',
// 		products_name: '多功能健身手套',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/0a89f996-5b94-4fb1-a2bf-6a4f11cabf9e.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=K5mvyoV5q8etURj%2FV%2FiLeuLB%2BTeK1C71fU2fDlJtiFpd90%2BdepcDX2KGVzWTEi0xZ%2F%2FNj8vf1Czhs7iSp3sWxJXlEmxJHY%2BDYGSPBRxFAULDAR8Wy%2FMs4e5fdJu0RdQp%2FLjaWCWQEdqS5b%2BnKWq4HcDaZHfx6VjbKJRqmdLiYpXdGc2Nzxnb%2Bs%2FQWisizOrWMkvo3BFCR7sBv7PTEFKgUuabKWDRT8iGL57uT5s9WzuT1zc4i9i%2F%2B704vfYscXkOhzAy2Rz9xldkcR4LknZb16FoLV%2Fbfoh0L8qLI%2BAn4oAai9Pl6a1wEIMp4FsPHBwryADpYi2MdiNRE6ajSAqB8Q%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 150,
// 		total_sales: 100,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769098b72f97fbc2b55629',
// 		products_name: '折疊式運動自行車',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/ea3d11b9-ee8c-4025-85c4-4ece42346eff.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=cjUS2im1PMqqKYxLJl3ZNeuvUtJrpMEdQ5CTGLNxBwv2AE1hUVe4p9GEGhMuIzeoSiuJXESTtwwMUTjws1zPpgjAYU8675almq4KiaH7eDyQHaB%2BTuXaCW2Dat%2FFfPmj49GXCDOCBbhqAzkDyszAVgo%2B4FTBEfJMVB79ONMXy9jmi0GADCF5wcr%2B%2BAMh3QW9yovuK4VpK5fmeu5t315OnToMidS25w2vADuVn2d89Yj7rLtferi%2FVCib28r%2F%2Fpr4pA8ofeDV6cg%2BxpyZQ6h%2FpaxMttFlfIGEVjQIgFqEhmbI8J2%2FQbcdFXr4dCaIeT86wdU1zKLnphUSEFTT1BErMg%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 500,
// 		total_sales: 89,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '667693feb72f97fbc2b5566f',
// 		products_name: '水上運動浮潛面鏡',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/58af9198-16ce-4de7-8be7-bea859f233d6.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=f3BXPgXttJnlP4bXOJglbQD9qy0LVhbPS7%2FeFbeQE1kIBja0fSlCyYQ44lTB8ORHw%2FoZQjsGzF34AMRDk4%2Fwlj6bq%2FCiRd1o%2BRajDdhLTBbz%2F3VNeTfvUGRByZJVUiL9yHmvfSCN9Cp%2FoLOzvGoWrpGZNqwUnPWCKZoswGcgMfYbdwJsyc19Ds6f0ceqiegr9a%2BNqCAxWIhx6zsJ4mj5Dbisl3tml6cMuy9fO3DMVHa%2Fbe2o%2FB8FDZGVEWsy9sFg4KSTZJLqvtlpyHHBespuM1iRYhhlXFpKnxXxW0O7m1GRdqu%2FqY6y6cD14SOUUt3eVoaMHS9oPpJBo%2Fr37HWzrA%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 300,
// 		total_sales: 75,
// 		discount: ['免運券', '折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769396b72f97fbc2b55651',
// 		products_name: '戶外運動手錶',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/2c3c7469-2103-4419-8b89-6fa300b53d22.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=oAHBddP6MPmF4jTvqlEGrGLX0T41lqvIYsDeuHKKesQQb4ejkp%2FjvjA4xcbYibKh6S%2FCVRU4lmgK8DVHaWLx8O6IOCt35txoqasesNyYtsiQxmbZlJhNb%2BIt1mtwkUAwHHQAZoYfn5WCQrC1gVTghCvuSqtHLfOGxY5lMlQ9LAFY9HT1xSbWpturbakBt0tFP5j32YA9nXuxKcIBDhd4B9kbPXHmomd2QAaD1tCHlo87Jz0w3hkjlId3b1NFyuiNA4gyWxaDe%2B1aCXwSogx6Th%2BfBHhLYCX%2Fg%2F1Bk0N6jon6GAMIHfhxBlIKqnPuvOwR3rVYd6pALNa5p5hIDsY8Dg%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 2000,
// 		total_sales: 70,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66769379b72f97fbc2b55642',
// 		products_name: '登山用戶外背包',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/dbbd0f99-fba0-4c2b-874a-5e8fccf8912f.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ZdMQOkH2CwVbuPc2HLbkYNSS69oSTIim%2BzeZRZygTcdLWxelQTFCC%2FNohH52WJfr2h16DDhVt47YzQETU87ibscXufYpquuVPqxwwln3dABavIl7%2FqU42ZjhZ2%2BaXeBjJqXnh87pMTcn%2FclScV5O%2FWQcCCUA5NcfK3hsN41srb1WBJqyaszRKlQtZ%2F%2Bo4SH7Aw5SgyqKJ%2BW%2BYzwXjGYYny9Qrj0aKWU6zRFapBNUmtwPW3AWTCnqsywoHwiP9xCo8A0rnpBB04aRnW3LkHu2z%2BGc8faOR2EdfwuAJi3CjMjM63JzoEFYtUniMw2Z0SdDGwwC%2FrA6VObN64%2BDpr7QtQ%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 1500,
// 		total_sales: 67,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '667693e9b72f97fbc2b55665',
// 		products_name: '專業攀岩鉤',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/94f77be8-67a2-40c0-b577-f6e0e02dde74.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=h1udlrEyul1a5RNSZRFCFXiQ0Ck21%2Fi1oqdQ5QhTjfJGkU0G3Bxbz21ZsCsY5faSZdH2y%2B0tjm65%2F6GM%2FhYFDyAo2fd1zrJG%2F4fW3iUstJGxrgeZSP2AxpUSKnAcMxknFtcISPeYYeD0f7GqgzJdjG19EJ4mwvTottrQGvHmURSwnjSGO7IiNA2GttScP5DLpkBYZuN3i262e12z3c7U2xVHkfNTpVFXWjs05H8y4xY4OhRYFdriG7Rc5yyy8%2F8MmER2JBHcb7z0B6ZsmH%2BE2Q637YNyH8fAtjBp%2FBsd%2BG96Q%2B23pR0R4kEmRw7ti%2BnH3HVUKGJOmaLNqe5SR4NI4g%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 300,
// 		total_sales: 62,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '66768eccb72f97fbc2b555ff',
// 		products_name: '防水寵物外出背包',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/10d6250a-8684-493a-9434-79b3a4a7cb45.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=LCZPi0eMPiuTkKkRL%2BLQrCDBj27xyNyKE2Ud%2Buq2QCrP%2BJGjECUR74r9GAmzej8hXvVTpmyzJ7lKGz%2BJOZR23Oh56k%2F3LXrIlKxzCaSaow612phj2erVtHFKDcmVtB9yOfEEBT7lYa%2BwozYciRJNOtwhQv4Cktpz5X3uJZcL3eB2eZbaLWlrSQvqfx7KaaC8%2FXsQAyl7KZe%2Btcg5r46AiPnLDHlDnamFHYXqRFbXvLytP7jJlZoNOY69Q%2BLQpuX9w%2BHXZZcGg5hdUmhzMgwgGooilMVhXqinTi22VyV5E%2Fo66hRb0SMClnFNUjju25NZ1EEyHmG8Its7Hywlm5UuRQ%3D%3D',
// 		seller_name: 'SkyMart',
// 		price: 550,
// 		total_sales: 54,
// 		discount: ['折抵券'],
// 		star: 0,
// 	},
// 	{
// 		products_id: '6676938db72f97fbc2b5564c',
// 		products_name: '便攜式瑜伽磚',
// 		products_images:
// 			'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/1db3be8f-c218-4a85-9f03-d116c68f826f.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ZHQoDcmTXEFMhyC66d43cd%2BxXtAzNRqIsIEI1t9fI1f3omIezb67kTb3RHF2Wxbc8qsMhlL29XntoQHIe4J8r99M24g5AibrVNH0y0Vvs5j30eQjp%2BCHMEZthjTuZpnSuyljzQLMEGA2uVyeOnQefNUZOU5sbGIZ5fEO%2B1uK6Iss6lXFOkdxHTLkRxh5i3xS9o21yd%2FCKmst8yIDHYg3zhzXyu1Ab7xovlxIkkoeZpkV01CMGYi59TjFHTy219ko43fOvp3jf3R9F8%2F0GwePXE6hCyzm4PrB0fJBM4QN5wluaz4KNq%2FRpPeVmefCeSNzS%2FpZjmS5fCcjilhMJzyBpA%3D%3D',
// 		seller_name: 'EcoShop',
// 		price: 50,
// 		total_sales: 51,
// 		discount: ['免運券', '折抵券'],
// 		star: 0,
// 	},
// ]);

// Filter price slider default
const minPrice = 0;
// Caculate max price from data
const maxPrice = products.value.reduce((max, product) => {
	return product.price > max ? product.price : max;
}, 0);

// filter & sort condition
const filters = reactive({
	selectedDiscount: '',
	selectedOrigin: '',
	selectedColor: '',
	priceRange: [minPrice, maxPrice],
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
	/*商品資料尚未有這些 */
	// if (filters.selectedOrigin) {
	// 	filteredData = filteredData.filter(
	// 		product => product.origin === filters.selectedOrigin
	// 	);
	// }
	// if (filters.selectedColor) {
	// 	filteredData = filteredData.filter(
	// 		product => product.color === filters.selectedColor
	// 	);
	// }

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
	filters.selectedOrigin = '';
	filters.selectedColor = '';
	filters.priceRange = [minPrice, maxPrice];
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
});

// 监视路由的变化
watch(
	() => route.query,
	async () => {
		await fetchData();
	}
);

async function fetchData() {
	const category = route.query.category as string; // 从路由的 query 中获取 categoryId，假设它是一个字符串
	const keyword = '運動'; // 从路由的 query 中获取 keyword，假设它是一个字符串

	if (category) {
		await shopStore.getAllProductsByCategoryID(getCategoryID(category)); // 将 categoryId 作为参数传递给函数
		console.log(products.value);
	} else if (keyword) {
		await shopStore.getAllProductsByKeyword(keyword);
		console.log(products.value);
	} else {
		// Handle case where categoryId or keyword is not provided
		console.error(route.query);
	}
}
</script>

<style scoped>
/* Add custom styles as needed */
</style>
