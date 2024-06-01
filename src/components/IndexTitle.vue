<template>
	<div
		v-if="data"
		class="container indexTitle d-flex justify-content-center align-items-end position-relative"
	>
		<h2 class="text-center mb-0">
			<span class="title-top">{{ data.titleEn }}</span>
			<div class="d-flex d-flex justify-content-center align-items-center">
				<div class="text-line"></div>
				<span class="mx-4">{{ data.title }}</span>
				<div class="text-line"></div>
			</div>
		</h2>
		<div class="d-flex position-absolute bottom-0 end-0" v-if="data.openBtn">
			<div
				class="prev btn-eca d-none d-sm-flex me-3"
				@click.stop="data.openBtn.prev()"
			>
				<font-awesome-icon :icon="['fas', 'angle-left']" />
			</div>
			<div
				class="next btn-eca d-none d-sm-flex"
				@click.stop="data.openBtn.next()"
			>
				<font-awesome-icon :icon="['fas', 'angle-right']" />
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
export interface indexTitle {
	title: string;
	titleEn: string;
	openBtn?: {
		prev: () => void; // Function type for prev
		next: () => void; // Function type for next
	};
}
// 接收傳入的值
const props = defineProps<{
	data: indexTitle; // 消息内容
}>();
</script>
<style lang="scss" scoped>
.indexTitle {
	margin-bottom: 32px;
	@media (min-width: 768px) {
		margin-bottom: 64px;
	}
}
</style>
