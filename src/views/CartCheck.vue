<template>
	<v-form class="container" @submit="onSubmit" v-slot="{ errors }">
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
						<div class="progress-bar" style="width: 50%"></div>
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
						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-circle"
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
		<div class="row px-3 m-0 mt-4">
			<div class="col-12">
				<div class="row">
					<CartCard
						v-for="(shopItem, shopIndex) in orderData"
						:key="shopIndex"
						:data="shopItem"
						:check="true"
					/>
				</div>
			</div>
			<div class="col-12 p-0 mb-5">
				<div class="card p-3">
					<div class="row m-0 p-0 p-2 p-sm-3 p-md-4">
						<div class="col-12">
							<h3 class="p-0 neutral-01 fs-5">訂單資訊</h3>
						</div>
						<div
							class="col-12 col-md-4 col-lg-5 mt-4 d-flex justify-content-start align-items-center"
						>
							<div class="mb-3 pe-3">寄送方式</div>
							<div class="mb-3">
								<button
									v-for="(sendItem, sendIndex) in send"
									:key="sendIndex"
									type="button"
									class="btn rounded-3 mb-0 me-2"
									:class="{
										'btn-outline-primary': sendNow !== sendItem.value,
										'btn-primary': sendNow === sendItem.value,
									}"
									@click="sendNow = sendItem.value"
								>
									{{ sendItem.text }}
								</button>
							</div>
						</div>
						<div
							class="col-12 col-md-8 col-lg-7 mt-4 d-flex justify-content-start justify-content-md-end align-items-center"
						>
							<div class="mb-3" style="min-width: 4rem">付款方式</div>
							<div class="mb-3 ps-3">
								<button
									v-for="(payItem, payIndex) in pay"
									:key="payIndex"
									type="button"
									class="btn rounded-3 mb-0 me-2 mb-2"
									:class="{
										'btn-outline-primary': payNow !== payItem.value,
										'btn-primary': payNow === payItem.value,
									}"
									@click="payNow = payItem.value"
								>
									{{ payItem.text }}
								</button>
							</div>
						</div>
						<div class="col-12 col-md-6 pe-3 mt-4" style="min-height: 100px">
							<label for="address" class="mb-1">
								寄送地址
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="address"
								name="address"
								type="text"
								class="form-control"
								v-model="address"
								:class="{ 'is-invalid': errors['address'] }"
								rules="address|need:地址"
								placeholder="請輸入地址..."
								autocomplete="street-address"
							></v-field>
							<error-message
								name="address"
								class="invalid-feedback"
							></error-message>
						</div>
						<div class="col-12 col-md-6 pe-3 mt-4" style="min-height: 100px">
							<label for="coupon" class="mb-1">優惠劵</label>
							<v-field
								class="my-auto form-select"
								id="gender"
								aria-label="優惠劵"
								name="優惠劵"
								:class="{
									'is-invalid': errors['優惠劵'],
								}"
								as="select"
							>
								<option value="" disabled>請選擇優惠劵</option>
							</v-field>
						</div>
						<div class="col-12 text-end pe-3 mt-0">
							<div class="d-flex">
								<div class="pe-4 flex-grow-1">
									<div>運費</div>
									<div class="mt-2">優惠折扣</div>
								</div>
								<div>
									<div>
										NT$&nbsp;
										<span>{{ getTotal('fare') }}</span>
										<!-- <span>{{ orderData }}</span> -->
									</div>
									<div class="mt-2">
										NT$&nbsp;
										<span>-300</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12 text-end pe-3 mt-0">
							<hr />
							<div
								class="d-flex justify-content-center align-items-center fs-5"
							>
								<div class="pe-4 flex-grow-1 fw-bold">訂單總金額</div>
								<div>
									NT$&nbsp;
									<!-- <span>{{ orderData.totalPrice }}</span> -->
									<span>
										{{ getTotal('totalPrice') + getTotal('fare') }} 未減優惠折扣
									</span>
								</div>
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
				@click="router.go(-1)"
			>
				返回
			</button>
			<button type="submit" class="btn btn-primary px-5 m-0 mx-1 mx-sm-2">
				前往結帳
			</button>
		</div>
	</v-form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';
import { useCartStore, go } from '@/stores/index';
const store = useCartStore();
// 组件
import CartCard from '@/components/CartCard.vue';
import { alertStore } from '@/main';

const route = useRoute();
const router = useRouter();

// 解析 orderData
const orderData = computed(() => store.selectdata);
// const orderData = ref([
// 	{
// 		seller: { _id: '66768265b72f97fbc2b555c1', brand: 'SkyMart' },
// 		items: [
// 			{
// 				product: {
// 					_id: '66768eb5b72f97fbc2b555f5',
// 					sellerOwned: { _id: '66768265b72f97fbc2b555c1', brand: 'SkyMart' },
// 					productName: '舒適寵物床墊',
// 					fare: 50,
// 					pay: [1, 2, 3],
// 					image: [
// 						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/3ed636cb-2123-49f4-8e0d-01bd9f687cc0.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=StBnszPcIyTOr8yoqYD%2FLmEBcnJN9%2Bcg2ih%2FNVulE3Q2UFtD806UGSpH4eNKZoqomNA%2F%2B%2Bg1d3SKcn47W3Q0Mp8zuwZH0js9Q84TOF7golA3L1SuQzfkmiFFM2ld0n1E9KAjUjwe2%2BWD7zd8IUxnX5S2uZ8l%2FrCcv83dvaAND9Pocf8Pu%2BLUdded0WW4f6t0R1ALiQ98ybncmywEdUg%2BeIOO3vnCuelLWu3dHcmQO9fDTXw%2FuyuZpRtK1ErYgjcEr8BUoKjnF7yVuPSahTlaH2lTy0L%2BsjlPqa%2BUd2mSKRZkmBNJrcatToLr3RMxco5RO1a7bryUbYYMI9e60QWMEg%3D%3D',
// 					],
// 				},
// 				format: {
// 					title: '中型',
// 					price: 350,
// 					cost: 150,
// 					stock: 500,
// 					image:
// 						'https://storage.googleapis.com/ecartisans-50b32.appspot.com/images/3ed636cb-2123-49f4-8e0d-01bd9f687cc0.jpg?GoogleAccessId=firebase-adminsdk-nhwq8%40ecartisans-50b32.iam.gserviceaccount.com&Expires=16756646400&Signature=StBnszPcIyTOr8yoqYD%2FLmEBcnJN9%2Bcg2ih%2FNVulE3Q2UFtD806UGSpH4eNKZoqomNA%2F%2B%2Bg1d3SKcn47W3Q0Mp8zuwZH0js9Q84TOF7golA3L1SuQzfkmiFFM2ld0n1E9KAjUjwe2%2BWD7zd8IUxnX5S2uZ8l%2FrCcv83dvaAND9Pocf8Pu%2BLUdded0WW4f6t0R1ALiQ98ybncmywEdUg%2BeIOO3vnCuelLWu3dHcmQO9fDTXw%2FuyuZpRtK1ErYgjcEr8BUoKjnF7yVuPSahTlaH2lTy0L%2BsjlPqa%2BUd2mSKRZkmBNJrcatToLr3RMxco5RO1a7bryUbYYMI9e60QWMEg%3D%3D',
// 					color: ['淺灰色'],
// 					_id: '66768eb5b72f97fbc2b555f6',
// 				},
// 				quantity: 1,
// 				price: 350,
// 				_id: '6685955a608fb17f931575d0',
// 				selected: false,
// 			},
// 		],
// 	},
// ]);

function getTotal(text: string): number {
	if (text === 'fare' && store.selectdata) {
		const maxFare = orderData.value.reduce(
			(max: number, order: { items: any[] }) => {
				const maxFareInOrder = order.items.reduce((maxFareInItems, item) => {
					return item.product.fare > maxFareInItems
						? item.product.fare
						: maxFareInItems;
				}, 0);
				return maxFareInOrder > max ? maxFareInOrder : max;
			},
			0
		);
		return maxFare;
	}
	if (text === 'totalPrice' && store.selectdata) {
		const total = orderData.value.reduce(
			(sum: any, order: { items: any[] }) => {
				return (
					sum +
					order.items.reduce((itemSum, item) => {
						return itemSum + item.quantity * item.format.price;
					}, 0)
				);
			},
			0
		);
		return total;
	}
	return 0;
}
function handleUpdateItems(shopIndex: number, updatedItems: any) {
	if (updatedItems && updatedItems.items) {
		orderData.value[shopIndex].items = updatedItems.items;
	}
}

function handleDeleteItem(shopIndex: number, itemIndex: number) {
	orderData.value[shopIndex].items.splice(itemIndex, 1);
}

// 宅配方式
// 未判定目前可以使用的宅配方式
const sendNow = ref<null | number>(null);
const send = [
	{ text: '宅配', value: 1 },
	// { text: '宅配', value: 1 },
	// { text: '宅配', value: 1 },
	// { text: '宅配', value: 1 },
];
const address = ref<null | string>(null);

// 付款方式
const payNow = ref<null | number>(null);
// 未判定目前可以使用的付款總類
const pay = [
	{ text: '信用卡付款', value: 1 },
	{ text: 'ATM匯款', value: 2 },
	{ text: '店到店付費', value: 3 },
];
// 計算選定商品
const selectedItems = orderData.value[0].items.map(
	(item: { product: { _id: any }; format: { _id: any } }) => ({
		productId: item.product._id,
		formatId: item.format._id,
	})
);

const form = computed(() => {
	return {
		selectedItems: selectedItems,
		pay: payNow.value,
		address: address.value,
		delivery: sendNow.value,
		fare: getTotal('fare'),
	};
});

// 送出表單
function onSubmit(): any {
	if (payNow.value && sendNow.value) {
		store.orderNew(form.value);
	} else {
		alertStore.error('請填寫訂單資訊');
	}
	// console.log('资料填写正常');
	// console.log('资料', value);
	// console.log('orderData', orderData);
}
if (!orderData) go({ name: 'Cart' });
</script>
