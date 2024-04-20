<template>
	<NavigationBarShop :isLoggedIn="isLoggedIn" />
	<header class="w-100 bg-primary" style="height: 100px">Header</header>
</template>

<script setup lang="ts">
import NavigationBarShop from '../../components/NavigationBarShop.vue';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();
const isLoggedIn = authStore.isLoggedIn;
</script>

<style scoped></style>
