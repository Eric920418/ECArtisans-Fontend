<template>
	<div class="one-column-layout">
		<header>
			<template v-if="isShopRoute">
				<NavigationBarShop />
			</template>
			<template v-else>
				<NavigationBar />
			</template>
		</header>
		<main>
			<slot />
		</main>
		<!-- <aside>
			<slot name="aside" />
			<Footer />
		</aside> -->
		<footer>
			<Footer />
		</footer>
	</div>
</template>
<script setup lang="ts">
import NavigationBar from '../components/NavigationBar.vue';
import NavigationBarShop from '../components/NavigationBarShop.vue';
import Footer from '../components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isShopRoute = route.path.startsWith('/Shop'); //
</script>
<style scoped lang="scss">
.one-column-layout {
	display: grid;
	grid-template-rows: auto 1fr auto; // 3 row，header footer自動填滿
}
</style>
