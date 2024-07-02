<template>
	<div class="wrapper">
		<Alert />
		<!-- 
			透過 對應 min-height: 100vh;
			position: sticky; 可以偵測高度 
		 -->
		<header class="header">
			<NavigationBar />
		</header>
		<main class="main">
			<!-- 強制重新刷新 -->
			<RouterView :key="routekey" />
		</main>
		<!-- <div class="position"> -->
		<!-- container -->
		<button
			class="btn btn-secondary rounded-circle btn-headset d-flex align-items-center justify-content-center"
		>
			<i class="bi bi-headset fs-2"></i>
		</button>
		<!-- </div> -->
		<footer>
			<FooterViews />
		</footer>
	</div>
</template>

<script setup lang="ts">
// import OneColumnLayout from '@/layouts/OneColumnLayout.vue';
import Alert from '@/components/Toast.vue';
// import PopUp from '@/components/PopUp.vue';
import { computed, ref, watchEffect } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import NavigationBarShop from '@/components/NavigationBarShop.vue';
import FooterViews from '@/components/Footer.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const routekey = computed(() => route.path);
</script>

<style scoped lang="scss">
.header {
	position: sticky;
	top: 0px;
	z-index: 999; //最上方
}

.wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100vh; //最小尺寸
}

main {
	flex-grow: 1; //撐開
}
// 聊天室
.btn-headset {
	position: fixed;
	z-index: 10;
	bottom: 24px;
	right: 24px;
	width: 52px;
	height: 52px;

	@media (min-width: 1200px) {
		width: 60px;
		height: 60px;
	}
}
</style>
