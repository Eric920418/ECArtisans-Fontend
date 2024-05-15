<template>
	<div>
		<h1>商家訂單管理</h1>
		<p>{{ OrderStore.data }}</p>
	</div>
</template>

<script lang="ts" setup>
import { useOrderStore } from '@/stores/index';
const OrderStore = useOrderStore();

// 在 setup 函式中不能使用 async/await，可以將異步邏輯移至生命週期鉤子中
import { onMounted } from 'vue';
onMounted(async () => {
	await OrderStore.getAllOrders('661e0d13e8992a1bd4b86caf');
});
</script>
