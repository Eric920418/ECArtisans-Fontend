<template>
	<div class="container">
		<!-- PS.之後會補其他頁面的進度條，如果你有空補也可以補一下 -->
		<div class="row px-3 m-0 justify-content-center align-items-center">
			<div class="col-8 my-3">
				<div class="position-relative m-4">
					<div
						class="progress"
						role="progressbar"
						aria-label="Progress"
						aria-valuenow="50"
						aria-valuemin="0"
						aria-valuemax="100"
						style="height: 1px"
					>
						<div class="progress-bar" style="width: 0%"></div>
					</div>
					<button
						type="button"
						class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						1
					</button>
					<button
						type="button"
						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-secondary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						2
					</button>
					<button
						type="button"
						class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						3
					</button>
				</div>
			</div>
		</div>
		<!-- <h2 class="fs-3 my-3 mt-4 px-3">購物車</h2> -->
		<div class="row px-3 m-0 mt-4">
			<div class="col-12 col-lg-9">
				<div class="row">
					<CartCard

						v-for="(shopItme, shopIndex) in fakeData"
						:key="shopIndex"
						:data="shopItme"
						@update-items="handleUpdateItems(shopIndex, $event)"
						@delete-item="handleDeleteItem(shopIndex, $event)"
					/>
				</div>
			</div>
			<div class="col-6 col-lg-3 p-0 mb-5 ps-lg-5">
				<div class="card p-3">
					<!-- 如果無法計算，或不方便，感覺可以只留下【選取商品數量】 -->
					<h2 class="mb-3">訂單摘要</h2>
					<div>
						<!-- 選取商品數量，以 商品名稱 計算數量 -->
						<p class="mb-2 fs-6">
							已選取
							<span>{{ totalItems }}</span>
							個商品
						</p>
					</div>
					<div>
						<p class="mb-2 fs-6 d-flex justify-content-between">
							運費總計
							<span>${{ totalFare }}</span>
						</p>
					</div>
					<hr />
					<p class="d-flex justify-content-between">
						訂單總金額
						<span>${{ totalPrice }}</span>
					</p>
				</div>
			</div>
		</div>
		<div
			class="col bg-white p-3 px-sm-5 mx-0 mx-md-3 rounded-0 sticky-bottom d-flex justify-content-end"
		>
			<button
				type="button"
				class="btn btn-primary px-5 m-0 mx-1 mx-sm-2"
				@click="$go({ name: 'CartCheck' })"
			>
				確認訂單
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 組件
import CartCard from '@/components/CartCard.vue';

import { useCart } from '@/stores/index';
const store = useCart();

const fakeData = ref([
	{
		seller: {
			_id: '66768f98b72f97fbc2b55610',
			brand: 'EcoShop',
		},
		items: [
			{
				product: {
					_id: '6676905db72f97fbc2b55615',
					sellerOwned: {
						_id: '66768f98b72f97fbc2b55610',
						brand: 'EcoShop',
					},
					productName: '智能運動手環',
					fare: 50,
					pay: [1, 2, 3],
					image: [
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/8cfcbb71-97f2-4945-9f1b-daf0f7fee42a.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=lqjXCZid%2FTa9gfchnBexeBFoR7Hq0zHp%2BTQDyokBWUv2OouHbzupvrb8ATEKCsqZ2v4%2BTWVcJFCVbOercpCG7yq%2B2bF83Br0yzCCOFfD6fdSTgWMGKC1JeJxe39gsV1g6xGDtNNUzNWxYndXJ3T%2BX0m%2FbhAuU0a7svZxpkR2ANTGl4gSCQ1w0dB7XvKKgu006UJ%2Fxe6F8Hzf2tW1jdzTvxq8L0HW7s0gTKQIo0NPUpBsH1K8aNd%2Foth6vfIgYCy1dHCyqrFrf61s7GimZXvQRey3vpAE%2F2jfEyGkCit07zTBCNIRRqIY3hxQOF07H9XIOQIvHksCn8NlmnZMSf9iZQ%3D%3D',
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/76634046-e2a8-49d2-a278-801966e12626.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ulA3TWoQCX0S2ZyK3E6o%2F1D2U04CyqinS4efHRnSRCM4TCwumOGSTfihPqF58j8XW2reWrg6IAmegarz7r4xZfdqtUnMgXUnNzdYUD5BvIeK7qeXpRuJfMI%2FpMZXneNWZeyt9vmHVcW%2FI8Vtm62b85uusUvVaX2KHw23yjMhyIe4qt83U63I31SnGYZ45Mf%2BkQzeh3rd4e6Bz2RRFUtFViss%2B8xcB3EkH5OFrS1B8S2pnGsPN8VBSYE0tbfshv3MmmetdnBGuhEdQ7noQpTzl4AF%2B%2FXcfHak3ejn3WUGnbnOSSZCv0dkm0vbsqfwWm2EtvnwgpJt0Gvsc2sdm0BGKQ%3D%3D',
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/c968f8ba-aac1-4682-af54-afdc1ecbb647.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ZZzJ3lrx88kPUbO5bcoK1ZHaeTJv1HP6jADwR2jZHgi90EfArzV1Hxj33zLQSzLZhNdb3blI9zwoRNQ1%2Bo2QD5pwcH1yJK%2BqQOMb3If25QcAh7hOrWf7xRGRi5odZMicBsxtevfG%2BvGNlEHkLKc4pLXteF8F026ySkvZiCQPeCOBXQaUGrMOr22gCcQgRaxTXaRwPyDK%2FoYx3VDAt%2FruMvM%2BOx2u85d9Q0EHIjcjxN82tKHah1fJ5o8do%2B1bJhKgX9mNw%2FrnGrHBl%2BFxxBCqZInn%2FK0q%2FqjO8nTy936jLHXqFO5DpsYTOjv5gcCtZbaGkSgfAaurj8h%2F8ouV%2BEyDfw%3D%3D',
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/b77dc5b9-390d-4aa9-a276-a188c57b84ae.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=I3224zq4GBlgwurP2t5xrCZRBjy06AmIK6aqTuuccbHOxPxeXuFO3d%2F%2FG6Rra3jhGhBZUTcO1NSbOFZG5rU9Dt%2Fl3N2TtnRjE3XyeCQqSkdme4G5fG%2FwIo9AhD2OZoznniyjgu1PESkpzZMWCjn8Iv9li9IcbkNDTVelAbFzuQPBdLUj%2BbWm9i3zxV1aXwAd7xP9xgx5ob2S5ZLE%2BKJ%2Fs4RiH1IyfhgfZSgpoe88%2BzFiWBbuSJM4k4fGM1l2aR8Z3%2B8G7sAZbV8wFW%2FAAQ0g9en7gVqLdacTCQPHNG1%2FDrEwLiobZ2zkXwpoJ8UuzVZQqxfwMerfJOxjkopSM%2BOPKA%3D%3D',
					],
				},
				format: {
					title: '黑色，防水30米',
					price: 350,
					cost: 200,
					stock: 500,
					image:
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/8cfcbb71-97f2-4945-9f1b-daf0f7fee42a.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=lqjXCZid%2FTa9gfchnBexeBFoR7Hq0zHp%2BTQDyokBWUv2OouHbzupvrb8ATEKCsqZ2v4%2BTWVcJFCVbOercpCG7yq%2B2bF83Br0yzCCOFfD6fdSTgWMGKC1JeJxe39gsV1g6xGDtNNUzNWxYndXJ3T%2BX0m%2FbhAuU0a7svZxpkR2ANTGl4gSCQ1w0dB7XvKKgu006UJ%2Fxe6F8Hzf2tW1jdzTvxq8L0HW7s0gTKQIo0NPUpBsH1K8aNd%2Foth6vfIgYCy1dHCyqrFrf61s7GimZXvQRey3vpAE%2F2jfEyGkCit07zTBCNIRRqIY3hxQOF07H9XIOQIvHksCn8NlmnZMSf9iZQ%3D%3D',
					color: ['黑色'],
					_id: '6676905db72f97fbc2b55616',
				},
				quantity: 1,
				price: 350,
				_id: '668472637330684c8cde9b3f',
			},
			{
				product: {
					_id: '6676905db72f97fbc2b55615',
					sellerOwned: {
						_id: '66768f98b72f97fbc2b55610',
						brand: 'EcoShop',
					},
					productName: '智能運動手環',
					fare: 50,
					pay: [1, 2, 3],
					image: [
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/8cfcbb71-97f2-4945-9f1b-daf0f7fee42a.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=lqjXCZid%2FTa9gfchnBexeBFoR7Hq0zHp%2BTQDyokBWUv2OouHbzupvrb8ATEKCsqZ2v4%2BTWVcJFCVbOercpCG7yq%2B2bF83Br0yzCCOFfD6fdSTgWMGKC1JeJxe39gsV1g6xGDtNNUzNWxYndXJ3T%2BX0m%2FbhAuU0a7svZxpkR2ANTGl4gSCQ1w0dB7XvKKgu006UJ%2Fxe6F8Hzf2tW1jdzTvxq8L0HW7s0gTKQIo0NPUpBsH1K8aNd%2Foth6vfIgYCy1dHCyqrFrf61s7GimZXvQRey3vpAE%2F2jfEyGkCit07zTBCNIRRqIY3hxQOF07H9XIOQIvHksCn8NlmnZMSf9iZQ%3D%3D',
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/76634046-e2a8-49d2-a278-801966e12626.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ulA3TWoQCX0S2ZyK3E6o%2F1D2U04CyqinS4efHRnSRCM4TCwumOGSTfihPqF58j8XW2reWrg6IAmegarz7r4xZfdqtUnMgXUnNzdYUD5BvIeK7qeXpRuJfMI%2FpMZXneNWZeyt9vmHVcW%2FI8Vtm62b85uusUvVaX2KHw23yjMhyIe4qt83U63I31SnGYZ45Mf%2BkQzeh3rd4e6Bz2RRFUtFViss%2B8xcB3EkH5OFrS1B8S2pnGsPN8VBSYE0tbfshv3MmmetdnBGuhEdQ7noQpTzl4AF%2B%2FXcfHak3ejn3WUGnbnOSSZCv0dkm0vbsqfwWm2EtvnwgpJt0Gvsc2sdm0BGKQ%3D%3D',
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/c968f8ba-aac1-4682-af54-afdc1ecbb647.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ZZzJ3lrx88kPUbO5bcoK1ZHaeTJv1HP6jADwR2jZHgi90EfArzV1Hxj33zLQSzLZhNdb3blI9zwoRNQ1%2Bo2QD5pwcH1yJK%2BqQOMb3If25QcAh7hOrWf7xRGRi5odZMicBsxtevfG%2BvGNlEHkLKc4pLXteF8F026ySkvZiCQPeCOBXQaUGrMOr22gCcQgRaxTXaRwPyDK%2FoYx3VDAt%2FruMvM%2BOx2u85d9Q0EHIjcjxN82tKHah1fJ5o8do%2B1bJhKgX9mNw%2FrnGrHBl%2BFxxBCqZInn%2FK0q%2FqjO8nTy936jLHXqFO5DpsYTOjv5gcCtZbaGkSgfAaurj8h%2F8ouV%2BEyDfw%3D%3D',
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/b77dc5b9-390d-4aa9-a276-a188c57b84ae.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=I3224zq4GBlgwurP2t5xrCZRBjy06AmIK6aqTuuccbHOxPxeXuFO3d%2F%2FG6Rra3jhGhBZUTcO1NSbOFZG5rU9Dt%2Fl3N2TtnRjE3XyeCQqSkdme4G5fG%2FwIo9AhD2OZoznniyjgu1PESkpzZMWCjn8Iv9li9IcbkNDTVelAbFzuQPBdLUj%2BbWm9i3zxV1aXwAd7xP9xgx5ob2S5ZLE%2BKJ%2Fs4RiH1IyfhgfZSgpoe88%2BzFiWBbuSJM4k4fGM1l2aR8Z3%2B8G7sAZbV8wFW%2FAAQ0g9en7gVqLdacTCQPHNG1%2FDrEwLiobZ2zkXwpoJ8UuzVZQqxfwMerfJOxjkopSM%2BOPKA%3D%3D',
					],
				},
				format: {
					title: 'asd',
					price: 350,
					cost: 200,
					stock: 0,
					image:
						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/76634046-e2a8-49d2-a278-801966e12626.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=ulA3TWoQCX0S2ZyK3E6o%2F1D2U04CyqinS4efHRnSRCM4TCwumOGSTfihPqF58j8XW2reWrg6IAmegarz7r4xZfdqtUnMgXUnNzdYUD5BvIeK7qeXpRuJfMI%2FpMZXneNWZeyt9vmHVcW%2FI8Vtm62b85uusUvVaX2KHw23yjMhyIe4qt83U63I31SnGYZ45Mf%2BkQzeh3rd4e6Bz2RRFUtFViss%2B8xcB3EkH5OFrS1B8S2pnGsPN8VBSYE0tbfshv3MmmetdnBGuhEdQ7noQpTzl4AF%2B%2FXcfHak3ejn3WUGnbnOSSZCv0dkm0vbsqfwWm2EtvnwgpJt0Gvsc2sdm0BGKQ%3D%3D',
					color: [''],
					_id: '667878fe90b7b2344f9ad486',
				},
				quantity: 1,
				price: 350,
				_id: '6684854b2554898593f12cbc',
			},
		],
	},
]);
function handleUpdateItems(shopIndex: number, updatedItems: any) {
	// 做一些額外的檢查以及更新處理
	if (updatedItems && updatedItems.items) {
		fakeData.value[shopIndex].items = updatedItems.items;
	}
}

const handleDeleteItem = (shopIndex: number, itemIndex: number) => {
	// 刪除對應的商品項目
	fakeData.value[shopIndex].items.splice(itemIndex, 1);
};
onMounted(async () => {
	// await store.getAllCart();
});
</script>

<style lang="scss" scoped></style>
