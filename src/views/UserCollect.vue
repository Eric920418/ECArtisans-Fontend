<template>
	<div class="row g-3 mx-0 mb-0 pb-0">
		<div class="col-12 m-0 p-0">
			<NavTabs
				:data="{ title: init.title, schedule: init.schedule }"
				@update-schedule="updateSchedule"
			/>
			<div class="my-0 px-4 px-sm-5 card">
				<!-- :class="{
					'nav-body': init.schedule === '收藏商品',
				}" -->
				<div class="row">商品{{ init.title }}</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useUserStore, useAuthStore } from '@/stores/index';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavTabs from '../components/NavTabs.vue';

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();

const id = authStore.id;

const userTitleData = {
	title: ['收藏商品', '關注商家'],
	schedule: '收藏商品', //目前頁面
};
const sellerTitleData = {
	title: '商家',
};
const updateSchedule = (newSchedule: string) => {
	init.value.schedule = newSchedule;
};

const init = ref({}) as any;
const getData = () => {
	if (route.matched[0].path === '/seller') {
		init.value = sellerTitleData;
	} else if (route.matched[0].path === '/user') {
		init.value = userTitleData;
	}
};
onMounted(() => {
	getData();
});
</script>

<style scoped></style>
