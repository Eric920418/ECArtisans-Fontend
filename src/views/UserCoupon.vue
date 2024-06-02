<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs
				:data="{ title: init.title, schedule: init.schedule }"
				@update-schedule="updateSchedule"
			/>
			<div class="my-0">
				<!-- :class="{ card
					'nav-body': init.schedule === '未結束',
				}" -->
				<div class="row m-0 p-0">
					<div
						v-for="couponItem in data"
						:key="couponItem.id"
						class="col-6 p-3 m-0"
					>
						<div class="card">
							<div></div>
							<h3 class="prim text-primary border-primary border-bottom pb-2">
								{{ couponItem.discountName }}
							</h3>
							<div>{{ couponItem }}</div>
							<div>
								{{ couponItem.start_date + '-' + couponItem.due_date }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCoupon, useAuthStore } from '@/stores/index';
import NavTabs from '../components/NavTabs.vue';
const updateSchedule = (newSchedule: string) => {
	init.value.schedule = newSchedule;
};

const route = useRoute();
const authStore = useAuthStore();
const userStore = useCoupon();
const page = route.params.page as string;
const id = authStore.id;
const token = authStore.token;
const data = ref(userStore.allData) as any;

const userTitleData = {
	title: ['未結束', '結束', '停用'],
	schedule: '未結束', //目前頁面
};
const sellerTitleData = {
	title: ['未結束', '結束', '停用'],
	schedule: '未結束', //目前頁面
};

const init = ref({}) as any;
const getData = () => {
	if (route.matched[0].path === '/seller') {
		init.value = sellerTitleData;
	} else if (route.matched[0].path === '/user') {
		init.value = userTitleData;
	}
	// userStore.getCouponAll(id, page, token);
};
onMounted(() => {
	getData();
});
</script>

<style scoped></style>
