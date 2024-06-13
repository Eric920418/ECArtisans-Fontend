<template>
	<div class="m-0 p-0 d-sm-flex align-items-center justify-content-sm-between">
		<ul class="nav nav-tabs m-0" v-if="data.title">
			<li
				class="nav-item mb-0 p-0 d-flex align-items-center justify-content-center"
				v-for="(titleItem, titleIndex) in data.title"
				:key="titleIndex"
				@click="handleClick(titleItem)"
			>
				<a
					class="nav-link my-0"
					aria-current="page"
					:class="{
						'active text-primary':
							(typeof titleItem === 'string' && data.schedule === titleItem) ||
							(typeof titleItem !== 'string' &&
								data.schedule === titleItem.title),
						'neutral-02':
							(typeof titleItem === 'string' && data.schedule !== titleItem) ||
							(typeof titleItem !== 'string' &&
								data.schedule !== titleItem.title),
					}"
				>
					<h2 class="fs-4 mb-0 px-2" style="height: fit-content">
						{{ typeof titleItem === 'string' ? titleItem : titleItem.title }}
					</h2>
				</a>
				<font-awesome-icon
					:icon="['fas', 'angle-right']"
					v-if="titleIndex !== data.title.length - 1 && data.breadcrumb"
					class="neutral-01"
				/>
			</li>
		</ul>
		<div class="text-end">
			<router-link
				v-if="data.btn"
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
import { type navTabsTitle, type navTabs } from '@/type/navTabsTitle';

const route = useRoute();

const props = defineProps<{
	data: navTabs;
}>();

const emit = defineEmits(['update-schedule']);

const handleClick = (titleItem: navTabsTitle) => {
	if (Object.hasOwn(titleItem, 'goBack') && titleItem.goBack) router.go(-1);
	if (Object.hasOwn(titleItem, 'path') && titleItem.path) go(titleItem.path);

	emit('update-schedule', titleItem as navTabsTitle);
};
</script>
<style lang="scss" scoped></style>
