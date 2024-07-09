<template>
	<div class="row">
		<div class="col-12 text-center my-5">
			<img src="/images/no-data.svg" alt="no data" class="nodata" />
		</div>
		<div class="col-12 text-center mb-5 white-space">
			<h3>找不到資料</h3>
			<p class="white-space">{{ text }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	text: string;
}>();
</script>

<style lang="scss">
.white-space {
	white-space: pre-line;
}
.nodata {
	width: 60vw;
	@media (min-width: 576px) {
		width: 40vw;
	}
	@media (min-width: 992px) {
		width: 25vw;
	}
}
</style>
