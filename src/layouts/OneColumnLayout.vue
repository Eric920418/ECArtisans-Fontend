<template>
	<div class="one-column-layout">
		<header class="position-sticky">
			<template v-if="isShopRoute">
				<NavigationBarShop />
			</template>
			<template v-else>
				<NavigationBar />
			</template>
		</header>
		<main>
			<slot name="main"></slot>
		</main>
		<footer>
			<Footer />
		</footer>
	</div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import NavigationBar from '../components/NavigationBar.vue';
import NavigationBarShop from '../components/NavigationBarShop.vue';
import Footer from '../components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isShopRoute = ref(false);

watchEffect(() => {
	isShopRoute.value = route.path.toLowerCase().startsWith('/seller');
});
</script>
<style scoped lang="scss">
.one-column-layout {
	//display: grid;
	grid-template-rows: auto 1fr auto; // 3 row，header footer自動填滿
}
</style>
