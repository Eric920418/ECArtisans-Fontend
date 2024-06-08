<template>
	<div>
		<h6>資料列表</h6>
		<ul>
			<li v-for="(item, index) in paginatedData" :key="index">{{ item }}</li>
		</ul>
		<!-- 使用 Pagenation 子組件來顯示分頁 -->
		<!-- 當 Pagenation 組件中的頁碼更新時，子組件傳遞"update:currentPage"事件並觸發 updatePage 方法 -->
		<Pagenation
			:currentPage="currentPage"
			:perPage="perPage"
			:totalRows="totalRows"
			@update:currentPage="updatePage"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Pagenation from '@/components/Pagenation.vue';

// 模擬的資料
const data = ref([
	'資料 1',
	'資料 2',
	'資料 3',
	'資料 4',
	'資料 5',
	'資料 6',
	'資料 7',
	'資料 8',
	'資料 9',
	'資料 10',
	'資料 11',
	'資料 12',
	'資料 13',
	'資料 14',
	'資料 15',
	'資料 16',
	'資料 17',
	'資料 18',
	'資料 19',
	'資料 20',
]);

// 設置初始變數
const currentPage = ref(1); // 當前頁碼，初始為1
const perPage = ref(2); // 一頁要顯示多少的項目數量
const totalRows = ref(data.value.length); // 總項目數量

// 當currentPage或perPage改變時重新計算當前頁的資料
const paginatedData = computed(() => {
	const start = (currentPage.value - 1) * perPage.value;
	const end = start + perPage.value;
	return data.value.slice(start, end);
});

// 更新頁碼
const updatePage = (page: number) => {
	currentPage.value = page;
};
</script>
