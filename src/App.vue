<template>
	<OneColumnLayout>
		<template #main>
			<RouterView />
		</template>
	</OneColumnLayout>
</template>

<script setup lang="ts">
import OneColumnLayout from '@/layouts/OneColumnLayout.vue';
</script>

<style scoped></style>
