<template>
	<div class="row m-0 pb-4 p-0" ref="planList">
		<div
			class="col-6 col-md-3 p-2 p-sm-3 d-flex align-items-end m-0 p-0"
			v-for="(planItem, planIndex) in buyPlan"
			:key="planIndex"
			@click="subscribePayment(planItem)"
		>
			<div
				class="p-1 card w-100 m-0 p-0"
				:class="{
					'bg-secondary': planIndex + 1 === buyPlan.length,
					border: planIndex + 1 !== buyPlan.length,
				}"
			>
				<div
					class="fs-6 py-2 d-flex justify-content-center align-items-center m-0 p-0"
					v-if="planIndex + 1 === buyPlan.length"
				>
					最推薦
					<font-awesome-icon :icon="['fas', 'thumbs-up']" class="m-1" />
				</div>
				<div
					class="card row text-center p-2 p-sm-3 py-4 m-0 p-0"
					@click="
						() => {
							console.log(planIndex + '典籍成功');
						}
					"
				>
					<div
						class="col-12 fs-sm-3 fw-bold my-3 text-center"
						:class="{ 'fs-5': resize < 1200, 'fs-4': resize >= 1200 }"
					>
						{{ planItem.plan }}
					</div>
					<div class="col-12 d-flex w-100 justify-content-center my-1 px-0">
						<div
							class="px-0"
							:class="{ 'row m-0 p-0': resize < 350, 'd-flex': resize < 1200 }"
						>
							<div
								class="fs-5 text-primary d-flex align-items-start"
								:class="{
									'col-12 p-0': resize < 350,
									'fs-6': resize < 1200,
									'fs-5': resize >= 1200,
								}"
							>
								NT$
							</div>
							<div
								class="fs-1 text-primary fw-bold d-flex align-items-center my-0"
								:class="{
									'col-8 p-0 justify-content-end pe-1': resize < 350,
									'fs-2': resize < 1200,
									'fs-1': resize >= 1200,
								}"
							>
								{{ planItem.cost }}
							</div>
							<div
								class="fs-5 d-flex align-items-end"
								:class="{
									'col-4 p-0': resize < 350,
									'fs-6': resize < 1200,
									'fs-5': resize >= 1200,
								}"
							>
								/{{ planItem.unit }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { paymentCreate } from '../stores/api';
import { useResize } from '@/stores/index';
const { resize } = useResize();

interface Props {
	email: string;
}

const props = defineProps<Props>();

interface PlanItem {
	plan: string;
	cost: string;
	unit?: string;
}

const buyPlan: PlanItem[] = [
	{ plan: 'ECArtisans 單月訂費會員 1 個月', cost: '800', unit: '月' },
	{ plan: 'ECArtisans 單月訂費會員 3 個月', cost: '700', unit: '月' },
	{ plan: 'ECArtisans 單月訂費會員 6 個月', cost: '600', unit: '月' },
	{ plan: 'ECArtisans 單月訂費會員 1 個年', cost: '500', unit: '月' },
];
const subscribePayment = async (planItem: PlanItem) => {
	try {
		const email = props.email; // 後續看怎麼抓email資料
		const Amt = parseInt(planItem.cost, 10);
		const ItemDesc = planItem.plan;

		const paymentResponse: {
			status: boolean;
			message: string;
			paymentInfo: {};
		} = await paymentCreate({ email, Amt, ItemDesc });

		if (paymentResponse.status) {
			submitPayment(paymentResponse.paymentInfo);
		} else {
			console.error(paymentResponse.message);
		}
	} catch (error) {
		console.error('發生錯誤:', error);
	}
};

const submitPayment = (paymentInfo: any) => {
	const form = document.createElement('form');
	form.method = 'POST';
	// console.log(paymentInfo)
	form.action = paymentInfo.PayGateWay;

	Object.keys(paymentInfo).forEach(key => {
		if (key !== 'PayGateWay') {
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = key;
			input.value = paymentInfo[key];
			form.appendChild(input);
		}
	});

	document.body.appendChild(form);
	// console.log(form);
	form.submit();
};
</script>
<style scoped></style>
