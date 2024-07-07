<template>
	<div class="row m-index-title">
		<Title :data="titleData" />
		<!-- <div class="col-12">
			<h1>待調整 寬度變化</h1>
			<h3>{{ resize }}</h3>
		</div> -->
		<div
			v-for="(funItem, funIndex) in data"
			:key="funIndex"
			class="m-0"
			:class="`col-${funItem.cols} col-sm-${funItem.cols_sm} col-md-${
				funItem.cols_md
			} col-lg-${funItem.cols_lg} ${funItem.data ? `p-0` : 'funCard'}`"
		>
			<div
				v-if="!funItem.data"
				class="card shadow-sm h-100 m-0 p-0 bg-transparent"
			>
				<div
					class="card-body p-0 position-relative d-flex justify-content-center"
					@click="navigate(funItem.name)"
				>
					<img
						:src="`${funItem.url}`"
						class="card-img-top"
						alt="..."
						:class="{
							clean: funItem.name === '清潔用品',
						}"
					/>
					<p
						class="card-title text-center w-100 mb-3 position-absolute bottom-0 fw-medium"
					>
						{{ funItem.name }}
					</p>
				</div>
			</div>

			<div class="row h-100 p-0 m-0">
				<div
					v-for="(fun_2_Item, fun_2_Index) in funItem.data"
					:key="fun_2_Index"
					class="funCard m-0"
					:class="`col-${fun_2_Item.cols} col-sm-${fun_2_Item.cols_sm} col-md-${fun_2_Item.cols_md} col-lg-${fun_2_Item.cols_lg}`"
				>
					<div class="card shadow-sm h-100 m-0 p-0 bg-transparent">
						<div
							class="card-body p-0 position-relative d-flex justify-content-center"
							@click="navigate(fun_2_Item.name)"
						>
							<img :src="`${fun_2_Item.url}`" class="card-img-top" alt="..." />
							<p
								class="card-title text-center w-100 mb-3 position-absolute bottom-0 fw-medium"
							>
								{{ fun_2_Item.name }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import Title from './IndexTitle.vue';
import { useResize } from '@/stores/index';
const { resize } = useResize();
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
// 偵測 螢幕寬、高
const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navigate = async (item: string) => {
	await router.push({
		name: 'ProductOverview',
		query: { category: item, page: 1 },
		replace: true,
	});

	scrollToTop();
};
// 傳遞方法，一定要在最後面
const titleData = {
	title: '為生活加點樂趣',
	titleEn: 'Fun',
};
// 接收傳入的值
const props = defineProps<{
	data: any; // 消息内容
}>();
</script>
<style lang="scss" scoped>
// fun區
.funCard {
	overflow: hidden;
	padding: 12px;
	img {
		width: fit-content;
		max-width: 100%;
		height: fit-content;
		transform: scale(1, 1);
		transition: all 1s ease-out;
	}
	&:hover img {
		transform: scale(1.2, 1.2);
	}
	.clean {
		width: fit-content;
		max-width: 100%;
		height: fit-content;
		@media (min-width: 768px) {
			max-width: 200%;
		}
		@media (min-width: 992px) {
			max-width: 200%;
		}
	}
}
.card-body {
	background-color: #fff;
	border-radius: 8px;
}
</style>
