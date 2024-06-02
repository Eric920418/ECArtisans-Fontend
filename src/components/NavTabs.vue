<template>
	<ul class="nav nav-tabs m-0">
		<li
			class="nav-item mb-0 p-0"
			v-for="(titleItem, titleIndex) in data.title"
			:key="titleIndex"
			@click="handleClick(titleItem)"
		>
			<a
				class="nav-link my-0"
				aria-current="page"
				:class="{
					'active text-primary': data.schedule === titleItem,
					'neutral-02': data.schedule !== titleItem,
				}"
			>
				<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
					{{ titleItem }}
				</h2>
			</a>
		</li>
	</ul>
</template>
<script lang="ts" setup>
export interface navTabs {
	title: Array<string>;
	schedule: string;
}

const props = defineProps<{
	data: navTabs;
}>();

const emit = defineEmits(['update-schedule']);

const handleClick = (titleItem: string) => {
	emit('update-schedule', titleItem);
};
</script>
<style lang="scss" scoped></style>
