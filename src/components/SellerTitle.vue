<template>
	<div class="m-0 p-0 w-100">
		<h2
			class="p-0 m-0 d-flex align-items-center justify-content-center mb-5 mb-md-6 fw-bold text-center"
		>
			{{ data.textS }}
			<img
				src="/images/ECArtisans.svg"
				class="shopHomeLogo px-2 m-0 py-0"
				alt="ECArtisans"
				title="ECArtisans"
			/>
			{{ data.textE }}
		</h2>
	</div>
</template>
<script lang="ts" setup>
const props = defineProps<{
	data: {
		textS?: string;
		textE?: string;
	};
}>();
</script>
<style lang="scss">
.shopHomeBanner {
	height: 75vh;
}
.text-shadow {
	text-shadow: 0.1em 0.1em 0.2em black;
}
.shopHomeDiv {
	margin-top: 60px;
	margin-bottom: 60px;
	padding: 12px;
	@media (min-width: 768px) {
		margin-top: 80px;
		margin-bottom: 80px;
	}
	@media (min-width: 1200px) {
		margin-top: 120px;
		margin-bottom: 120px;
	}
}
.shopHomeLogo {
	height: 20px;
	@media (min-width: 768px) {
		height: 25px;
	}
	@media (min-width: 1200px) {
		height: 30px;
	}
}
.whyCard {
	width: 306px;
	img {
		width: 200px;
	}
}
.goodDiv {
	width: 100%;
	max-width: 640px;
}
</style>
