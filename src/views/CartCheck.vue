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
						v-for="(shopItem, shopIndex) in orderData.selectedItems"
						:key="shopItem._id"
						:data="shopItem"
					/>
				</div>
			</div>
			<div class="col-12 p-0 mb-5">
				<div class="card p-3">
					<div class="row m-0 p-0 p-2 p-sm-3 p-md-4">
						<div class="col-12">
							<h3 class="p-0 neutral-01 fs-5">订单信息</h3>
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
									class="btn btn-primary rounded-3 mb-0 me-2"
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
								地址
								<span class="text-danger">*</span>
							</label>
							<v-field
								id="address"
								name="address"
								type="text"
								class="form-control"
								:class="{ 'is-invalid': errors['address'] }"
								rules="address|need:地址"
								placeholder="请输入地址"
								autocomplete="street-address"
							></v-field>
							<error-message
								name="address"
								class="invalid-feedback"
							></error-message>
						</div>
						<div class="col-12 col-md-6 pe-3 mt-4" style="min-height: 100px">
							<label for="coupon" class="mb-1">优惠券</label>
							<v-field
								class="my-auto form-select"
								id="gender"
								aria-label="优惠券"
								name="优惠券"
								:class="{
									'is-invalid': errors['优惠券'],
								}"
								as="select"
							>
								<option value="" disabled>请选择优惠券</option>
							</v-field>
						</div>
						<div class="col-12 text-end pe-3 mt-0">
							<div class="d-flex">
								<div class="pe-4 flex-grow-1">
									<div>运费</div>
									<div class="mt-2">优惠折扣</div>
								</div>
								<div>
									<div>
										NT$&nbsp;
										<span>{{ orderData.fare }}</span>
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
								<div class="pe-4 flex-grow-1 fw-bold">订单总金额</div>
								<div>
									NT$&nbsp;
									<span>{{ orderData.totalPrice }}</span>
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
				前往结帐
			</button>
		</div>
	</v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';

// 组件
import CartCard from '@/components/CartCard.vue';

const route = useRoute();
const router = useRouter();

// 解析 orderData
let orderData;
try {
	orderData = JSON.parse(route.params.orderData);
	console.log('接收到的订单数据:', orderData);
} catch (e) {
	console.error('解析订单数据失败:', e);
	orderData = null;
}

// 宅配方式
const send = [{ text: '宅配', value: 1 }];

const payNow = ref<null | number>(null);

// 付款方式
const pay = [
	{ text: '信用卡付款', value: 1 },
	{ text: 'ATM汇款', value: 2 },
	{ text: '店到店付费', value: 3 },
];

// 送出表单
function onSubmit(value: any): any {
	console.log('资料填写正常');
	console.log('资料', value);
	console.log('orderData', orderData);
}

onMounted(() => {
	if (!orderData) {
		router.replace({ name: 'CartPage' });
	}
});
</script>
