<template>
	<div>
		<Banner></Banner>
		<h1>首頁</h1>
		<div class="container">
			<button class="btn btn-primary">primary Button</button>
			<button class="btn btn-secondary">secondary Button</button>
			<button class="btn btn-success">success Button</button>
			<button class="btn btn-info">info Button</button>
			<button class="btn btn-danger">danger Button</button>
			<button class="btn btn-light">light Button</button>
			<button class="btn btn-dark">dark Button</button>
			<button class="btn btn-neutral01">neutral01 Button</button>
			<button class="btn btn-neutral02">neutral02 Button</button>
			<button class="btn btn-neutral03">neutral03 Button</button>
			<button class="btn btn-neutral04">neutral04 Button</button>
			<button class="btn btn-neutral05">neutral05 Button</button>
			<div class="row m-2 p-2">
				<router-link class="col-4 card-line" to="/">RRR123</router-link>
				<router-link class="col-4 card-line" to="/">RRR123</router-link>
			</div>
			123
			<div class="block" ref="block"></div>
			<div class="box" ref="box">一次</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Banner from '@/components/Banner.vue';
import { gsap } from 'gsap';

const block = ref();
const box = ref();

onMounted(() => {
	gsap.to(box.value, { rotation: '+=360' });
	gsap.to(block.value, { x: 300, repeat: -1, duration: 3 });
});
</script>

<style scoped>
.box {
	width: 100px;
	height: 100px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: #28a92b;
	font-weight: 600;
	color: #fff;
	margin: 0 auto;
}
.block {
	width: 100px;
	height: 100px;
	background-color: #000;
	border-radius: 10px;
}
</style>
