<template>
	<!-- Use text in props -->
	<BPagination
		v-model="ex1CurrentPage"
		:total-rows="ex1Rows"
		:per-page="ex1PerPage"
		first-text="First"
		prev-text="Prev"
		next-text="Next"
		last-text="Last"
	/>

	<!-- Use emojis in props -->
	<BPagination
		v-model="ex1CurrentPage"
		:total-rows="ex1Rows"
		:per-page="ex1PerPage"
		first-text="⏮"
		prev-text="⏪"
		next-text="⏩"
		last-text="⏭"
		class="mt-4"
	/>

	<!-- Use HTML and sub-components in slots -->
	<BPagination
		v-model="ex1CurrentPage"
		:total-rows="ex1Rows"
		:per-page="ex1PerPage"
		class="mt-4"
	>
		<template #first-text><span class="text-success">First</span></template>
		<template #prev-text><span class="text-danger">Prev</span></template>
		<template #next-text><span class="text-warning">Next</span></template>
		<template #last-text><span class="text-info">Last</span></template>
		<template #ellipsis-text>
			<BSpinner small type="grow" />
			<BSpinner small type="grow" />
			<BSpinner small type="grow" />
		</template>
		<template #page="{ page, active }">
			<b v-if="active">{{ page }}</b>
			<i v-else>{{ page }}</i>
		</template>
	</BPagination>
	Current page : {{ ex1CurrentPage }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
const ex1CurrentPage = ref(1);
const ex1PerPage = ref(10);
const ex1Rows = ref(100);
</script>
