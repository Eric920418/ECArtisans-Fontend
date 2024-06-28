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
		<!-- <h2 class="fs-3 my-3 mt-4 px-3">購物車</h2> -->
		<div class="row px-3 m-0 mt-4">
			<div class="col-12">
				<div class="row">
					<CartCard
						v-for="(shopItme, shopIndex) in 1"
						:key="shopIndex"
						:data="shopItme"
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
									v-for="(sendItme, sendIndex) in send"
									:key="sendIndex"
									type="button"
									class="btn btn-primary rounded-3 mb-0 me-2"
								>
									{{ sendItme.text }}
								</button>
							</div>
						</div>
						<div
							class="col-12 col-md-8 col-lg-7 mt-4 d-flex justify-content-start justify-content-md-end align-items-center"
						>
							<div class="mb-3" style="min-width: 4rem">付款方式</div>
							<div class="mb-3 ps-3">
								<!-- payNow:是假資料，使用者所選的送出方法 -->
								<button
									v-for="(payItme, payIndex) in pay"
									:key="payIndex"
									type="button"
									class="btn rounded-3 mb-0 me-2 mb-2"
									:class="{
										'btn-outline-primary': payNow !== payItme.value,
										'btn-primary': payNow === payItme.value,
									}"
									@click="payNow = payItme.value"
								>
									{{ payItme.text }}
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
								placeholder="請輸入地址"
								autocomplete="street-address"
							></v-field>
							<error-message
								name="address"
								class="invalid-feedback"
							></error-message>
						</div>
						<div class="col-12 col-md-6 pe-3 mt-4" style="min-height: 100px">
							<!-- 依情況改輸入框 -->
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
							<!-- 如果要驗證可以再問我↓ 如果 優惠劵 改輸入框可先用這個替代 -->
							<!-- <input class="form-control" type="text" /> -->
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
										<span>-300</span>
									</div>
									<div class="mt-2">
										NT$&nbsp;
										<span>300</span>
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
									<span>5000</span>
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
				@click="
					() => {
						router.go(-1);
					}
				"
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
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VForm, VField, ErrorMessage } from '@/setup/vee-validate';

// 組件
import CartCard from '@/components/CartCard.vue';

const route = useRoute();
const router = useRouter();

// 宅配方式
const send = [{ text: '宅配', value: 1 }];

const payNow = ref<null | number>(null);

// 付款方式方式
const pay = [
	{ text: '信用卡付款', value: 1 },
	{ text: 'ATM匯款', value: 2 },
	{ text: '店到店付費', value: 3 },
];

//送出表單 --------------------
function onSubmit(value: any): any {
	console.log('資料填寫正常');
	console.log('資料', value);
}
onMounted(async () => {});
</script>

<style lang="scss" scoped></style>
