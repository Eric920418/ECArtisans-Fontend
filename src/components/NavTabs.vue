<template>
	<div
		class="m-0 p-0 d-sm-flex align-items-center justify-content-sm-between"
		v-if="data"
	>
		<ul class="nav nav-tabs m-0" v-if="data.title">
			<li
				class="nav-item mb-0 p-0 d-flex align-items-center justify-content-center"
				v-for="(titleItem, titleIndex) in data.title"
				:key="titleIndex"
			>
				<div
					v-if="data.title.length === 1"
					class="px-3 py-2 my-0 text-primary"
					aria-current="page"
				>
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</div>
				<a
					v-else-if="titleItem.path && titleItem.path.query"
					class="nav-link my-0 neutral-02"
					aria-current="page"
					@click="handleClick(titleItem)"
					:class="{
						'text-primary': route.query.type
							? titleItem.path.query.type === route.query.type
							: false,
					}"
				>
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</a>
				<div v-else class="px-3 py-2 my-0 text-primary" aria-current="page">
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</div>
				<!-- <div
					v-if="data.title.length === 1"
					class="px-3 py-2 my-0 text-primary"
					aria-current="page"
				>
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</div>
				<a
					v-else-if="titleItem.path && titleItem.path.query"
					class="nav-link my-0 neutral-02"
					aria-current="page"
					:class="{
						'text-primary': route.query.type
							? titleItem.path.query.type === route.query.type
							: false,
					}"
				>
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</a>
				<div v-else class="nav-link my-0" aria-current="page">
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</div> -->
				<font-awesome-icon
					:icon="['fas', 'angle-right']"
					v-if="titleIndex !== data.title.length - 1 && data.breadcrumb"
					class="neutral-01"
				/>
			</li>
		</ul>
		<div class="text-end" v-if="data.btn">
			<router-link
				:to="data.btn.path"
				class="btn btn-outline-primary px-4 me-3"
			>
				{{ data.btn.title }}
			</router-link>
		</div>
	</div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { go } from '@/stores/index';
import { useRoute } from 'vue-router';
import { type NavTabsTitleType, type NavTabsType } from '@/type/navTabsTitle';

const route = useRoute();

const props = defineProps<{
	data: NavTabsType;
}>();

// const emit = defineEmits(['update-schedule']);

const handleClick = (titleItem: NavTabsTitleType) => {
	if (Object.hasOwn(titleItem, 'goBack') && titleItem.goBack) router.go(-1);
	if (Object.hasOwn(titleItem, 'path') && titleItem.path) go(titleItem.path);

	// emit('update-schedule', titleItem as navTabsTitle);
};
</script>
<style lang="scss" scoped></style>
