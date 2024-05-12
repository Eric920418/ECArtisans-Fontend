<template>
	<OneColumnLayout>
		<template #main>
			<Alert />
			<RouterView />
		</template>
	</OneColumnLayout>
</template>

<script setup lang="ts">
import OneColumnLayout from '@/layouts/OneColumnLayout.vue';
import Alert from '@/components/Toast.vue';
// import PopUp from '@/components/PopUp.vue';
</script>

<style scoped></style>
