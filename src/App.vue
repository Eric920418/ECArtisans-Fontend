<template>
	<div class="wrapper">
		<Alert />
		<!-- 
			透過 對應 min-height: 100vh;
			position: sticky; 可以偵測高度 
		 -->
		<header class="header">
			<!-- <template v-if="isShopRoute"> -->
			<!--  -->
			<!-- </template> -->
			<!--<template v-else> -->
			<NavigationBar />
			<!-- <NavigationBarShop /> -->
			<!--</template> -->
		</header>
		<main class="main">
			<RouterView />
		</main>
		<footer>
			<FooterViews />
		</footer>
	</div>
</template>

<script setup lang="ts">
// import OneColumnLayout from '@/layouts/OneColumnLayout.vue';
import Alert from '@/components/Toast.vue';
// import PopUp from '@/components/PopUp.vue';
import { ref, watchEffect } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue';
import NavigationBarShop from '@/components/NavigationBarShop.vue';
import FooterViews from '@/components/Footer.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
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
</style>
